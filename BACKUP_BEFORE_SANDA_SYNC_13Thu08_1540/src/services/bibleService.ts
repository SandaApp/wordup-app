import { bibleBooks } from '../data/bibleBooks';

declare const require: any;

export type BibleVerse = {
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
};

/** Nested compact KJV: book -> chapter string -> verse texts (index 0 = verse 1). */
type CompactBible = Record<string, Record<string, string[]>>;

const refPattern = /^(.*?) (\d+):(\d+)$/;
const userRefPattern = /^\s*([1-3]?\s?[A-Za-z ]+?)\s+(\d{1,3})(?::(\d{1,3}))?\s*$/;

let compactBibleCache: CompactBible | null = null;
let allVersesCache: BibleVerse[] | null = null;
const chapterCache = new Map<string, BibleVerse[]>();
const normalizedBookMap = new Map<string, string>();

function getCompactBible(): CompactBible {
  if (!compactBibleCache) {
    // Lazy-load the full KJV only when the Bible feature is used.
    // Nested JSON is smaller than flat "Book C:V" keys and keeps every verse.
    compactBibleCache = require('../data/kjvVerses.json') as CompactBible;
  }
  return compactBibleCache;
}

function getAllVersesCache(): BibleVerse[] {
  if (!allVersesCache) {
    const bible = getCompactBible();
    const verses: BibleVerse[] = [];

    for (const book of Object.keys(bible)) {
      const chapters = bible[book];
      for (const chapterKey of Object.keys(chapters)) {
        const chapter = Number(chapterKey);
        const texts = chapters[chapterKey] || [];
        texts.forEach((text, index) => {
          if (!text) return;
          const verse = index + 1;
          verses.push({
            reference: `${book} ${chapter}:${verse}`,
            book,
            chapter,
            verse,
            text: cleanVerseText(text)
          });
        });
      }
    }

    allVersesCache = verses;
  }
  return allVersesCache;
}

for (const book of bibleBooks) {
  normalizedBookMap.set(normalizeBookName(book.name), book.name);
  normalizedBookMap.set(book.name.toLowerCase(), book.name);
}

const bookAliases: Record<string, string> = {
  gen: 'Genesis', exo: 'Exodus', exod: 'Exodus', lev: 'Leviticus', num: 'Numbers', deut: 'Deuteronomy', jos: 'Joshua', josh: 'Joshua', judg: 'Judges', ruth: 'Ruth',
  '1 sam': '1 Samuel', '2 sam': '2 Samuel', '1 kings': '1 Kings', '2 kings': '2 Kings', '1 chr': '1 Chronicles', '2 chr': '2 Chronicles', ezra: 'Ezra', neh: 'Nehemiah', est: 'Esther', job: 'Job', ps: 'Psalms', psa: 'Psalms', psalm: 'Psalms', psalms: 'Psalms', prov: 'Proverbs', ecc: 'Ecclesiastes', song: 'Song of Solomon', isa: 'Isaiah', jer: 'Jeremiah', lam: 'Lamentations', ezek: 'Ezekiel', dan: 'Daniel', hos: 'Hosea', joel: 'Joel', amos: 'Amos', obad: 'Obadiah', jon: 'Jonah', mic: 'Micah', nah: 'Nahum', hab: 'Habakkuk', zeph: 'Zephaniah', hag: 'Haggai', zech: 'Zechariah', mal: 'Malachi',
  matt: 'Matthew', mat: 'Matthew', mark: 'Mark', mk: 'Mark', luke: 'Luke', lk: 'Luke', john: 'John', jn: 'John', acts: 'Acts', rom: 'Romans', '1 cor': '1 Corinthians', '2 cor': '2 Corinthians', gal: 'Galatians', eph: 'Ephesians', phil: 'Philippians', col: 'Colossians', '1 thess': '1 Thessalonians', '2 thess': '2 Thessalonians', '1 tim': '1 Timothy', '2 tim': '2 Timothy', titus: 'Titus', philem: 'Philemon', heb: 'Hebrews', james: 'James', jas: 'James', '1 pet': '1 Peter', '2 pet': '2 Peter', '1 john': '1 John', '2 john': '2 John', '3 john': '3 John', jude: 'Jude', rev: 'Revelation', revelation: 'Revelation'
};

for (const [alias, book] of Object.entries(bookAliases)) {
  normalizedBookMap.set(normalizeBookName(alias), book);
}

function normalizeBookName(book: string) {
  return book.toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ').trim();
}

export function cleanVerseText(text: string) {
  return text.replace(/^#\s*/, '').replace(/\s+/g, ' ').trim();
}

export function parseReference(reference: string): Omit<BibleVerse, 'text'> | null {
  const match = reference.match(refPattern);
  if (!match) return null;
  return {
    reference,
    book: match[1],
    chapter: Number(match[2]),
    verse: Number(match[3])
  };
}

export function parseUserBibleReference(input: string): { book: string; chapter: number; verse?: number } | null {
  const match = input.match(userRefPattern);
  if (!match) return null;

  const rawBook = normalizeBookName(match[1]);
  const book = normalizedBookMap.get(rawBook);
  if (!book) return null;

  return {
    book,
    chapter: Number(match[2]),
    verse: match[3] ? Number(match[3]) : undefined
  };
}

export function getChapterVerses(book: string, chapter: number): BibleVerse[] {
  const key = `${book}:${chapter}`;
  const cached = chapterCache.get(key);
  if (cached) return cached;

  const bible = getCompactBible();
  const texts = bible[book]?.[String(chapter)] || [];
  const verses: BibleVerse[] = [];

  texts.forEach((text, index) => {
    if (!text) return;
    const verse = index + 1;
    verses.push({
      reference: `${book} ${chapter}:${verse}`,
      book,
      chapter,
      verse,
      text: cleanVerseText(text)
    });
  });

  chapterCache.set(key, verses);
  return verses;
}

export function getVerse(reference: string): BibleVerse | null {
  const parsed = parseReference(reference);
  if (!parsed) return null;

  const bible = getCompactBible();
  const texts = bible[parsed.book]?.[String(parsed.chapter)];
  if (!texts) return null;

  const text = texts[parsed.verse - 1];
  if (!text) return null;

  return { ...parsed, text: cleanVerseText(text) };
}

export function searchBible(query: string, limit = 35): BibleVerse[] {
  const trimmed = query.trim();
  const normalized = trimmed.toLowerCase();
  if (normalized.length < 3) return [];

  const parsedRef = parseUserBibleReference(trimmed);

  if (parsedRef?.verse) {
    const exact = getVerse(`${parsedRef.book} ${parsedRef.chapter}:${parsedRef.verse}`);
    return exact ? [exact] : [];
  }

  if (parsedRef?.chapter) {
    return getChapterVerses(parsedRef.book, parsedRef.chapter).slice(0, limit);
  }

  const results: BibleVerse[] = [];

  for (const verse of getAllVersesCache()) {
    if (verse.reference.toLowerCase().includes(normalized) || verse.text.toLowerCase().includes(normalized)) {
      results.push(verse);
    }
    if (results.length >= limit) break;
  }

  return results;
}

export function buildChapterSpeech(book: string, chapter: number) {
  const verses = getChapterVerses(book, chapter);
  return `${book} chapter ${chapter}. ` + verses.map((verse) => `Verse ${verse.verse}. ${verse.text}`).join(' ');
}

export function getDefaultBibleBook() {
  return bibleBooks.find((book) => book.name === 'John') ?? bibleBooks[0];
}

export function getAllVersesCount() {
  return getAllVersesCache().length;
}
