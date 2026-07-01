export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Devotion = {
  id: string;
  day: number;
  title: string;
  theme: string;
  reference: string;
  verse: string;
  devotion: string;
  reflectionQuestion: string;
  familyQuestion: string;
  prayer: string;
  challenge: string;
  memoryVerse: string;
  quiz: QuizQuestion[];
};
