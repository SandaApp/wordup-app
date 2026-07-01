// MVP red-letter support. These ranges mark verses that are traditionally printed
// as the spoken words of Jesus in many red-letter KJV editions. Some verses may
// include short narrative introductions depending on edition formatting.

type Range = { start: number; end: number };
type ChapterRanges = Record<number, Range[]>;

const redLetterRanges: Record<string, ChapterRanges> = {
  Matthew: {
    3: [{ start: 15, end: 15 }],
    4: [{ start: 4, end: 10 }, { start: 17, end: 19 }],
    5: [{ start: 3, end: 48 }],
    6: [{ start: 1, end: 34 }],
    7: [{ start: 1, end: 27 }],
    8: [{ start: 3, end: 3 }, { start: 7, end: 13 }, { start: 20, end: 22 }, { start: 26, end: 26 }, { start: 32, end: 32 }],
    9: [{ start: 2, end: 6 }, { start: 9, end: 9 }, { start: 12, end: 17 }, { start: 22, end: 22 }, { start: 24, end: 24 }, { start: 28, end: 30 }, { start: 37, end: 38 }],
    10: [{ start: 5, end: 42 }],
    11: [{ start: 4, end: 30 }],
    12: [{ start: 3, end: 8 }, { start: 11, end: 13 }, { start: 25, end: 45 }, { start: 48, end: 50 }],
    13: [{ start: 3, end: 52 }, { start: 57, end: 57 }],
    14: [{ start: 16, end: 18 }, { start: 27, end: 31 }],
    15: [{ start: 3, end: 20 }, { start: 24, end: 28 }, { start: 32, end: 34 }],
    16: [{ start: 2, end: 4 }, { start: 6, end: 11 }, { start: 13, end: 28 }],
    17: [{ start: 7, end: 7 }, { start: 11, end: 12 }, { start: 17, end: 21 }, { start: 25, end: 27 }],
    18: [{ start: 3, end: 35 }],
    19: [{ start: 4, end: 30 }],
    20: [{ start: 1, end: 28 }, { start: 32, end: 34 }],
    21: [{ start: 2, end: 3 }, { start: 13, end: 13 }, { start: 16, end: 16 }, { start: 19, end: 22 }, { start: 24, end: 44 }],
    22: [{ start: 2, end: 14 }, { start: 18, end: 21 }, { start: 29, end: 45 }],
    23: [{ start: 2, end: 39 }],
    24: [{ start: 2, end: 51 }],
    25: [{ start: 1, end: 46 }],
    26: [{ start: 2, end: 2 }, { start: 10, end: 13 }, { start: 18, end: 29 }, { start: 31, end: 32 }, { start: 34, end: 42 }, { start: 45, end: 46 }, { start: 50, end: 56 }, { start: 64, end: 64 }],
    27: [{ start: 11, end: 11 }, { start: 46, end: 46 }],
    28: [{ start: 9, end: 10 }, { start: 18, end: 20 }]
  },
  Mark: {
    1: [{ start: 15, end: 17 }, { start: 25, end: 25 }, { start: 38, end: 38 }, { start: 41, end: 44 }],
    2: [{ start: 5, end: 11 }, { start: 14, end: 17 }, { start: 19, end: 22 }, { start: 25, end: 28 }],
    3: [{ start: 3, end: 5 }, { start: 23, end: 29 }, { start: 33, end: 35 }],
    4: [{ start: 3, end: 32 }, { start: 35, end: 41 }],
    5: [{ start: 8, end: 9 }, { start: 19, end: 19 }, { start: 30, end: 34 }, { start: 36, end: 41 }],
    6: [{ start: 4, end: 4 }, { start: 10, end: 11 }, { start: 31, end: 31 }, { start: 37, end: 38 }, { start: 50, end: 50 }],
    7: [{ start: 6, end: 23 }, { start: 27, end: 29 }, { start: 34, end: 34 }],
    8: [{ start: 2, end: 12 }, { start: 15, end: 21 }, { start: 26, end: 38 }],
    9: [{ start: 12, end: 13 }, { start: 16, end: 19 }, { start: 21, end: 23 }, { start: 25, end: 25 }, { start: 29, end: 50 }],
    10: [{ start: 3, end: 31 }, { start: 33, end: 34 }, { start: 36, end: 40 }, { start: 42, end: 45 }, { start: 49, end: 52 }],
    11: [{ start: 2, end: 3 }, { start: 14, end: 14 }, { start: 17, end: 17 }, { start: 22, end: 33 }],
    12: [{ start: 1, end: 11 }, { start: 15, end: 17 }, { start: 24, end: 27 }, { start: 29, end: 40 }, { start: 43, end: 44 }],
    13: [{ start: 2, end: 37 }],
    14: [{ start: 6, end: 9 }, { start: 13, end: 25 }, { start: 27, end: 28 }, { start: 30, end: 31 }, { start: 36, end: 42 }, { start: 48, end: 49 }, { start: 62, end: 62 }],
    15: [{ start: 2, end: 2 }, { start: 34, end: 34 }],
    16: [{ start: 15, end: 18 }]
  },
  Luke: {
    2: [{ start: 49, end: 49 }],
    4: [{ start: 4, end: 12 }, { start: 18, end: 21 }, { start: 23, end: 27 }, { start: 35, end: 35 }, { start: 43, end: 43 }],
    5: [{ start: 4, end: 10 }, { start: 13, end: 14 }, { start: 20, end: 24 }, { start: 27, end: 39 }],
    6: [{ start: 3, end: 49 }],
    7: [{ start: 9, end: 9 }, { start: 13, end: 14 }, { start: 22, end: 50 }],
    8: [{ start: 5, end: 18 }, { start: 21, end: 21 }, { start: 22, end: 25 }, { start: 30, end: 30 }, { start: 39, end: 39 }, { start: 45, end: 56 }],
    9: [{ start: 3, end: 5 }, { start: 13, end: 14 }, { start: 18, end: 27 }, { start: 41, end: 44 }, { start: 48, end: 50 }, { start: 55, end: 62 }],
    10: [{ start: 2, end: 24 }, { start: 26, end: 37 }, { start: 41, end: 42 }],
    11: [{ start: 2, end: 13 }, { start: 17, end: 36 }, { start: 39, end: 52 }],
    12: [{ start: 1, end: 59 }],
    13: [{ start: 2, end: 35 }],
    14: [{ start: 3, end: 35 }],
    15: [{ start: 3, end: 32 }],
    16: [{ start: 1, end: 31 }],
    17: [{ start: 1, end: 37 }],
    18: [{ start: 1, end: 43 }],
    19: [{ start: 5, end: 27 }, { start: 30, end: 31 }, { start: 40, end: 46 }],
    20: [{ start: 3, end: 8 }, { start: 9, end: 18 }, { start: 23, end: 25 }, { start: 34, end: 47 }],
    21: [{ start: 3, end: 36 }],
    22: [{ start: 8, end: 12 }, { start: 15, end: 20 }, { start: 25, end: 38 }, { start: 40, end: 42 }, { start: 46, end: 46 }, { start: 48, end: 53 }, { start: 67, end: 70 }],
    23: [{ start: 3, end: 3 }, { start: 28, end: 31 }, { start: 34, end: 34 }, { start: 43, end: 46 }],
    24: [{ start: 17, end: 19 }, { start: 25, end: 26 }, { start: 36, end: 49 }]
  },
  John: {
    1: [{ start: 38, end: 39 }, { start: 42, end: 42 }, { start: 43, end: 43 }, { start: 47, end: 51 }],
    2: [{ start: 4, end: 4 }, { start: 7, end: 8 }, { start: 16, end: 16 }, { start: 19, end: 19 }],
    3: [{ start: 3, end: 21 }, { start: 36, end: 36 }],
    4: [{ start: 7, end: 26 }, { start: 32, end: 38 }, { start: 48, end: 50 }],
    5: [{ start: 6, end: 47 }],
    6: [{ start: 5, end: 70 }],
    7: [{ start: 6, end: 8 }, { start: 16, end: 24 }, { start: 28, end: 29 }, { start: 33, end: 38 }],
    8: [{ start: 7, end: 58 }],
    9: [{ start: 3, end: 5 }, { start: 7, end: 7 }, { start: 35, end: 41 }],
    10: [{ start: 1, end: 38 }],
    11: [{ start: 4, end: 44 }],
    12: [{ start: 7, end: 8 }, { start: 23, end: 50 }],
    13: [{ start: 7, end: 38 }],
    14: [{ start: 1, end: 31 }],
    15: [{ start: 1, end: 27 }],
    16: [{ start: 1, end: 33 }],
    17: [{ start: 1, end: 26 }],
    18: [{ start: 4, end: 11 }, { start: 20, end: 23 }, { start: 34, end: 37 }],
    19: [{ start: 11, end: 11 }, { start: 26, end: 30 }],
    20: [{ start: 15, end: 17 }, { start: 19, end: 23 }, { start: 26, end: 29 }],
    21: [{ start: 5, end: 6 }, { start: 10, end: 22 }]
  },
  Acts: { 1: [{ start: 4, end: 8 }] },
  Revelation: {
    1: [{ start: 8, end: 8 }, { start: 11, end: 11 }, { start: 17, end: 20 }],
    2: [{ start: 1, end: 29 }],
    3: [{ start: 1, end: 22 }],
    16: [{ start: 15, end: 15 }],
    21: [{ start: 5, end: 8 }],
    22: [{ start: 7, end: 20 }]
  }
};

export function isWordsOfChrist(book: string, chapter: number, verse: number) {
  const chapterRanges = redLetterRanges[book]?.[chapter];
  if (!chapterRanges) return false;
  return chapterRanges.some((range) => verse >= range.start && verse <= range.end);
}
