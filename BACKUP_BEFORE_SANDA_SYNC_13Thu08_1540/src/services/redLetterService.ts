/**
 * Words of Christ in red — refined KJV mapping for Sanda's WordUp.
 *
 * Scope: spoken words of Jesus Christ (Gospels + post-resurrection speech
 * in Acts, quoted Words of the Lord in the Epistles, and the risen Lord's
 * words in Revelation). This is NOT "words of God the Father in the OT".
 *
 * Method:
 * - Traditional KJV red-letter practice (Cambridge / Scofield-style editions)
 * - Verse-level ranges (a verse is red if it contains spoken words of Jesus)
 * - Narrative glue in the same verse is accepted (standard print practice)
 * - Speaker-careful exclusions (e.g. the devil's words in the Temptation;
 *   John the Baptist in John 3:27–36)
 *
 * Editions still differ slightly on a few borderline verses (e.g. how far
 * Jesus' discourse runs in John 3). This map aims for reverent, majority
 * red-letter KJV practice suitable for family reading.
 */

type Range = { start: number; end: number };
type ChapterRanges = Record<number, Range[]>;

/**
 * book -> chapter -> inclusive verse ranges that contain Words of Christ.
 * Keep ranges sorted and non-overlapping within each chapter.
 */
const redLetterRanges: Record<string, ChapterRanges> = {
  // ---------------------------------------------------------------------------
  // MATTHEW
  // ---------------------------------------------------------------------------
  Matthew: {
    3: [{ start: 15, end: 15 }],
    // Temptation: only Jesus' replies — not the devil (5–6, 8–9)
    4: [
      { start: 4, end: 4 },
      { start: 7, end: 7 },
      { start: 10, end: 10 },
      { start: 17, end: 17 },
      { start: 19, end: 19 }
    ],
    5: [{ start: 3, end: 48 }],
    6: [{ start: 1, end: 34 }],
    7: [{ start: 1, end: 27 }],
    8: [
      { start: 3, end: 4 },
      { start: 7, end: 7 },
      { start: 10, end: 13 },
      { start: 20, end: 22 },
      { start: 26, end: 26 },
      { start: 32, end: 32 }
    ],
    9: [
      { start: 2, end: 6 },
      { start: 9, end: 9 },
      { start: 12, end: 17 },
      { start: 22, end: 22 },
      { start: 24, end: 24 },
      { start: 28, end: 29 },
      { start: 37, end: 38 }
    ],
    10: [{ start: 5, end: 42 }],
    11: [
      { start: 4, end: 19 },
      { start: 21, end: 24 },
      { start: 25, end: 30 }
    ],
    12: [
      { start: 3, end: 8 },
      { start: 11, end: 13 },
      { start: 25, end: 37 },
      { start: 39, end: 45 },
      { start: 48, end: 50 }
    ],
    13: [
      { start: 3, end: 9 },
      { start: 11, end: 33 },
      { start: 37, end: 52 },
      { start: 57, end: 57 }
    ],
    14: [
      { start: 16, end: 18 },
      { start: 27, end: 29 },
      { start: 31, end: 31 }
    ],
    15: [
      { start: 3, end: 11 },
      { start: 13, end: 14 },
      { start: 16, end: 20 },
      { start: 24, end: 24 },
      { start: 26, end: 26 },
      { start: 28, end: 28 },
      { start: 32, end: 32 },
      { start: 34, end: 34 }
    ],
    16: [
      { start: 2, end: 4 },
      { start: 6, end: 6 },
      { start: 8, end: 11 },
      { start: 13, end: 13 },
      { start: 15, end: 19 },
      { start: 21, end: 21 },
      { start: 23, end: 28 }
    ],
    17: [
      { start: 7, end: 7 },
      { start: 9, end: 9 },
      { start: 11, end: 12 },
      { start: 17, end: 17 },
      { start: 20, end: 23 },
      { start: 25, end: 27 }
    ],
    18: [{ start: 3, end: 35 }],
    19: [
      { start: 4, end: 12 },
      { start: 14, end: 14 },
      { start: 17, end: 21 },
      { start: 23, end: 30 }
    ],
    20: [
      { start: 1, end: 16 },
      { start: 18, end: 19 },
      { start: 21, end: 23 },
      { start: 25, end: 28 },
      { start: 32, end: 32 }
    ],
    21: [
      { start: 2, end: 3 },
      { start: 13, end: 13 },
      { start: 16, end: 16 },
      { start: 19, end: 19 },
      { start: 21, end: 22 },
      { start: 24, end: 25 },
      { start: 27, end: 27 },
      { start: 28, end: 40 },
      { start: 42, end: 44 }
    ],
    22: [
      { start: 2, end: 14 },
      { start: 18, end: 21 },
      { start: 29, end: 32 },
      { start: 37, end: 40 },
      { start: 42, end: 45 }
    ],
    23: [{ start: 2, end: 39 }],
    24: [
      { start: 2, end: 2 },
      { start: 4, end: 51 }
    ],
    25: [{ start: 1, end: 46 }],
    26: [
      { start: 2, end: 2 },
      { start: 10, end: 13 },
      { start: 18, end: 18 },
      { start: 21, end: 21 },
      { start: 23, end: 24 },
      { start: 25, end: 25 },
      { start: 26, end: 29 },
      { start: 31, end: 32 },
      { start: 34, end: 34 },
      { start: 36, end: 36 },
      { start: 38, end: 42 },
      { start: 45, end: 46 },
      { start: 50, end: 50 },
      { start: 52, end: 56 },
      { start: 64, end: 64 }
    ],
    27: [
      { start: 11, end: 11 },
      { start: 46, end: 46 }
    ],
    28: [
      { start: 9, end: 10 },
      { start: 18, end: 20 }
    ]
  },

  // ---------------------------------------------------------------------------
  // MARK
  // ---------------------------------------------------------------------------
  Mark: {
    1: [
      { start: 15, end: 15 },
      { start: 17, end: 17 },
      { start: 25, end: 25 },
      { start: 38, end: 38 },
      { start: 41, end: 41 },
      { start: 44, end: 44 }
    ],
    2: [
      { start: 5, end: 5 },
      { start: 8, end: 11 },
      { start: 14, end: 14 },
      { start: 17, end: 17 },
      { start: 19, end: 22 },
      { start: 25, end: 28 }
    ],
    3: [
      { start: 3, end: 5 },
      { start: 23, end: 29 },
      { start: 33, end: 35 }
    ],
    4: [
      { start: 3, end: 9 },
      { start: 11, end: 32 },
      { start: 35, end: 35 },
      { start: 39, end: 40 }
    ],
    5: [
      { start: 8, end: 9 },
      { start: 19, end: 19 },
      { start: 30, end: 30 },
      { start: 34, end: 34 },
      { start: 36, end: 36 },
      { start: 39, end: 39 },
      { start: 41, end: 41 }
    ],
    6: [
      { start: 4, end: 4 },
      { start: 10, end: 11 },
      { start: 31, end: 31 },
      { start: 37, end: 38 },
      { start: 50, end: 50 }
    ],
    7: [
      { start: 6, end: 23 },
      { start: 27, end: 27 },
      { start: 29, end: 29 },
      { start: 34, end: 34 }
    ],
    8: [
      { start: 2, end: 3 },
      { start: 5, end: 5 },
      { start: 12, end: 12 },
      { start: 15, end: 15 },
      { start: 17, end: 21 },
      { start: 26, end: 26 },
      { start: 27, end: 27 },
      { start: 29, end: 29 },
      { start: 31, end: 33 },
      { start: 34, end: 38 }
    ],
    9: [
      { start: 1, end: 1 },
      { start: 12, end: 13 },
      { start: 16, end: 16 },
      { start: 19, end: 19 },
      { start: 21, end: 23 },
      { start: 25, end: 25 },
      { start: 29, end: 29 },
      { start: 31, end: 31 },
      { start: 33, end: 37 },
      { start: 39, end: 50 }
    ],
    10: [
      { start: 3, end: 9 },
      { start: 11, end: 12 },
      { start: 14, end: 15 },
      { start: 18, end: 21 },
      { start: 23, end: 31 },
      { start: 33, end: 34 },
      { start: 36, end: 40 },
      { start: 42, end: 45 },
      { start: 49, end: 49 },
      { start: 51, end: 52 }
    ],
    11: [
      { start: 2, end: 3 },
      { start: 14, end: 14 },
      { start: 17, end: 17 },
      { start: 22, end: 26 },
      { start: 29, end: 30 },
      { start: 33, end: 33 }
    ],
    12: [
      { start: 1, end: 11 },
      { start: 15, end: 17 },
      { start: 24, end: 27 },
      { start: 29, end: 31 },
      { start: 35, end: 37 },
      { start: 38, end: 40 },
      { start: 43, end: 44 }
    ],
    13: [
      { start: 2, end: 2 },
      { start: 5, end: 37 }
    ],
    14: [
      { start: 6, end: 9 },
      { start: 13, end: 15 },
      { start: 18, end: 21 },
      { start: 22, end: 25 },
      { start: 27, end: 28 },
      { start: 30, end: 30 },
      { start: 32, end: 32 },
      { start: 34, end: 38 },
      { start: 41, end: 42 },
      { start: 48, end: 49 },
      { start: 62, end: 62 }
    ],
    15: [
      { start: 2, end: 2 },
      { start: 34, end: 34 }
    ],
    16: [
      { start: 15, end: 18 }
    ]
  },

  // ---------------------------------------------------------------------------
  // LUKE
  // ---------------------------------------------------------------------------
  Luke: {
    2: [{ start: 49, end: 49 }],
    // Temptation: Jesus only — not the devil (3, 5–7, 9–11)
    4: [
      { start: 4, end: 4 },
      { start: 8, end: 8 },
      { start: 12, end: 12 },
      { start: 18, end: 21 },
      { start: 23, end: 27 },
      { start: 35, end: 35 },
      { start: 43, end: 43 }
    ],
    5: [
      { start: 4, end: 4 },
      { start: 10, end: 10 },
      { start: 13, end: 14 },
      { start: 20, end: 24 },
      { start: 27, end: 27 },
      { start: 31, end: 32 },
      { start: 34, end: 39 }
    ],
    6: [
      { start: 3, end: 5 },
      { start: 8, end: 10 },
      { start: 20, end: 49 }
    ],
    7: [
      { start: 9, end: 9 },
      { start: 13, end: 14 },
      { start: 22, end: 28 },
      { start: 31, end: 35 },
      { start: 40, end: 48 },
      { start: 50, end: 50 }
    ],
    8: [
      { start: 5, end: 8 },
      { start: 10, end: 18 },
      { start: 21, end: 22 },
      { start: 25, end: 25 },
      { start: 30, end: 30 },
      { start: 39, end: 39 },
      { start: 45, end: 46 },
      { start: 48, end: 50 },
      { start: 52, end: 52 },
      { start: 54, end: 54 }
    ],
    9: [
      { start: 3, end: 5 },
      { start: 13, end: 14 },
      { start: 18, end: 18 },
      { start: 20, end: 27 },
      { start: 41, end: 44 },
      { start: 48, end: 50 },
      { start: 55, end: 56 },
      { start: 58, end: 62 }
    ],
    10: [
      { start: 2, end: 16 },
      { start: 18, end: 24 },
      { start: 26, end: 28 },
      { start: 30, end: 37 },
      { start: 41, end: 42 }
    ],
    11: [
      { start: 2, end: 13 },
      { start: 17, end: 36 },
      { start: 39, end: 52 }
    ],
    12: [{ start: 1, end: 59 }],
    13: [
      { start: 2, end: 9 },
      { start: 12, end: 12 },
      { start: 15, end: 16 },
      { start: 18, end: 21 },
      { start: 24, end: 30 },
      { start: 32, end: 35 }
    ],
    14: [
      { start: 3, end: 5 },
      { start: 8, end: 14 },
      { start: 16, end: 24 },
      { start: 26, end: 35 }
    ],
    15: [{ start: 3, end: 32 }],
    16: [{ start: 1, end: 31 }],
    17: [
      { start: 1, end: 10 },
      { start: 14, end: 14 },
      { start: 17, end: 19 },
      { start: 20, end: 37 }
    ],
    18: [
      { start: 1, end: 8 },
      { start: 10, end: 14 },
      { start: 16, end: 17 },
      { start: 19, end: 22 },
      { start: 24, end: 30 },
      { start: 31, end: 33 },
      { start: 41, end: 42 }
    ],
    19: [
      { start: 5, end: 5 },
      { start: 9, end: 10 },
      { start: 12, end: 27 },
      { start: 30, end: 31 },
      { start: 40, end: 40 },
      { start: 42, end: 44 },
      { start: 46, end: 46 }
    ],
    20: [
      { start: 3, end: 8 },
      { start: 9, end: 18 },
      { start: 23, end: 25 },
      { start: 34, end: 38 },
      { start: 41, end: 44 },
      { start: 46, end: 47 }
    ],
    21: [
      { start: 3, end: 4 },
      { start: 6, end: 6 },
      { start: 8, end: 36 }
    ],
    22: [
      { start: 8, end: 12 },
      { start: 15, end: 22 },
      { start: 25, end: 38 },
      { start: 40, end: 42 },
      { start: 46, end: 46 },
      { start: 48, end: 48 },
      { start: 51, end: 53 },
      { start: 67, end: 70 }
    ],
    23: [
      { start: 3, end: 3 },
      { start: 28, end: 31 },
      { start: 34, end: 34 },
      { start: 43, end: 43 },
      { start: 46, end: 46 }
    ],
    24: [
      { start: 17, end: 17 },
      { start: 19, end: 19 },
      { start: 25, end: 26 },
      { start: 36, end: 39 },
      { start: 41, end: 49 }
    ]
  },

  // ---------------------------------------------------------------------------
  // JOHN
  // ---------------------------------------------------------------------------
  John: {
    1: [
      { start: 38, end: 39 },
      { start: 42, end: 43 },
      { start: 47, end: 48 },
      { start: 50, end: 51 }
    ],
    2: [
      { start: 4, end: 4 },
      { start: 7, end: 8 },
      { start: 16, end: 16 },
      { start: 19, end: 19 }
    ],
    // Nicodemus discourse: Jesus through 3:21.
    // John 3:22–36 includes John's narrative and the Baptist's testimony (not red).
    3: [{ start: 3, end: 21 }],
    4: [
      { start: 7, end: 7 },
      { start: 10, end: 14 },
      { start: 16, end: 18 },
      { start: 21, end: 26 },
      { start: 32, end: 38 },
      { start: 48, end: 48 },
      { start: 50, end: 50 }
    ],
    5: [
      { start: 6, end: 6 },
      { start: 8, end: 8 },
      { start: 14, end: 14 },
      { start: 17, end: 47 }
    ],
    6: [
      { start: 5, end: 5 },
      { start: 10, end: 10 },
      { start: 12, end: 12 },
      { start: 20, end: 20 },
      { start: 26, end: 27 },
      { start: 29, end: 29 },
      { start: 32, end: 33 },
      { start: 35, end: 40 },
      { start: 43, end: 58 },
      { start: 61, end: 65 },
      { start: 67, end: 67 },
      { start: 70, end: 70 }
    ],
    7: [
      { start: 6, end: 8 },
      { start: 16, end: 19 },
      { start: 21, end: 24 },
      { start: 28, end: 29 },
      { start: 33, end: 34 },
      { start: 37, end: 38 }
    ],
    // 8:1–11 pericope: Jesus in 7, 10–11; then Light of the world discourse
    8: [
      { start: 7, end: 7 },
      { start: 10, end: 12 },
      { start: 14, end: 19 },
      { start: 21, end: 21 },
      { start: 23, end: 26 },
      { start: 28, end: 29 },
      { start: 31, end: 32 },
      { start: 34, end: 38 },
      { start: 39, end: 47 },
      { start: 49, end: 51 },
      { start: 54, end: 56 },
      { start: 58, end: 58 }
    ],
    9: [
      { start: 3, end: 5 },
      { start: 7, end: 7 },
      { start: 35, end: 35 },
      { start: 37, end: 37 },
      { start: 39, end: 41 }
    ],
    10: [
      { start: 1, end: 18 },
      { start: 25, end: 30 },
      { start: 32, end: 38 }
    ],
    11: [
      { start: 4, end: 4 },
      { start: 7, end: 7 },
      { start: 9, end: 11 },
      { start: 14, end: 15 },
      { start: 23, end: 26 },
      { start: 34, end: 34 },
      { start: 39, end: 44 }
    ],
    12: [
      { start: 7, end: 8 },
      { start: 23, end: 28 },
      { start: 30, end: 36 },
      { start: 44, end: 50 }
    ],
    13: [
      { start: 7, end: 8 },
      { start: 10, end: 12 },
      { start: 13, end: 20 },
      { start: 21, end: 21 },
      { start: 26, end: 27 },
      { start: 31, end: 38 }
    ],
    14: [{ start: 1, end: 31 }],
    15: [{ start: 1, end: 27 }],
    16: [{ start: 1, end: 33 }],
    17: [{ start: 1, end: 26 }],
    18: [
      { start: 4, end: 9 },
      { start: 11, end: 11 },
      { start: 20, end: 21 },
      { start: 23, end: 23 },
      { start: 34, end: 37 }
    ],
    19: [
      { start: 11, end: 11 },
      { start: 26, end: 28 },
      { start: 30, end: 30 }
    ],
    20: [
      { start: 15, end: 17 },
      { start: 19, end: 23 },
      { start: 26, end: 29 }
    ],
    21: [
      { start: 5, end: 6 },
      { start: 10, end: 12 },
      { start: 15, end: 22 }
    ]
  },

  // ---------------------------------------------------------------------------
  // ACTS — risen Lord (and quoted words of the Lord Jesus)
  // ---------------------------------------------------------------------------
  Acts: {
    1: [
      { start: 4, end: 5 },
      { start: 7, end: 8 }
    ],
    9: [
      { start: 4, end: 6 },
      { start: 10, end: 12 },
      { start: 15, end: 16 }
    ],
    11: [{ start: 16, end: 16 }],
    18: [{ start: 9, end: 10 }],
    20: [{ start: 35, end: 35 }],
    22: [
      { start: 7, end: 8 },
      { start: 10, end: 10 },
      { start: 18, end: 18 },
      { start: 21, end: 21 }
    ],
    23: [{ start: 11, end: 11 }],
    26: [{ start: 14, end: 18 }]
  },

  // ---------------------------------------------------------------------------
  // EPISTLES — Words of the Lord quoted
  // ---------------------------------------------------------------------------
  '1 Corinthians': {
    11: [{ start: 24, end: 25 }]
  },
  '2 Corinthians': {
    12: [{ start: 9, end: 9 }]
  },

  // ---------------------------------------------------------------------------
  // REVELATION — the risen Lord / Alpha & Omega speech
  // ---------------------------------------------------------------------------
  Revelation: {
    1: [
      { start: 8, end: 8 },
      { start: 11, end: 11 },
      { start: 17, end: 20 }
    ],
    // Letters to the seven churches (dictated by Christ)
    2: [{ start: 1, end: 29 }],
    3: [{ start: 1, end: 22 }],
    16: [{ start: 15, end: 15 }],
    21: [{ start: 5, end: 8 }],
    // Precise sayings of Jesus — not the entire closing narrative
    22: [
      { start: 7, end: 7 },
      { start: 12, end: 13 },
      { start: 16, end: 16 },
      { start: 20, end: 20 }
    ]
  }
};

/** Flattened lookup: "Book|chapter|verse" -> true */
const redLetterLookup = new Set<string>();

function buildLookup() {
  if (redLetterLookup.size > 0) return;
  for (const [book, chapters] of Object.entries(redLetterRanges)) {
    for (const [chapterKey, ranges] of Object.entries(chapters)) {
      const chapter = Number(chapterKey);
      for (const range of ranges) {
        for (let verse = range.start; verse <= range.end; verse += 1) {
          redLetterLookup.add(`${book}|${chapter}|${verse}`);
        }
      }
    }
  }
}

buildLookup();

/** True when this verse is printed as Words of Christ in Sanda's WordUp. */
export function isWordsOfChrist(book: string, chapter: number, verse: number): boolean {
  return redLetterLookup.has(`${book}|${chapter}|${verse}`);
}

/** All books that contain red-letter verses. */
export function getRedLetterBooks(): string[] {
  return Object.keys(redLetterRanges);
}

/** Count of verse-slots marked red (for QA / About copy). */
export function getRedLetterVerseCount(): number {
  return redLetterLookup.size;
}

/** Debug / tests: raw range table. */
export function getRedLetterRanges(): Readonly<Record<string, ChapterRanges>> {
  return redLetterRanges;
}
