import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = 'wordup:progress';

export type Progress = {
  completedDevotionIds: string[];
  memorizedVerseIds: string[];
  prayersPrayed: number;
  quizPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
};

export const defaultProgress: Progress = {
  completedDevotionIds: [],
  memorizedVerseIds: [],
  prayersPrayed: 0,
  quizPoints: 0,
  currentStreak: 0,
  longestStreak: 0
};

export async function getProgress(): Promise<Progress> {
  const raw = await AsyncStorage.getItem(PROGRESS_KEY);
  return raw ? { ...defaultProgress, ...JSON.parse(raw) } : defaultProgress;
}

export async function saveProgress(progress: Progress) {
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export async function markDevotionCompleted(devotionId: string) {
  const progress = await getProgress();
  const today = new Date().toISOString().slice(0, 10);

  if (!progress.completedDevotionIds.includes(devotionId)) {
    progress.completedDevotionIds.push(devotionId);
  }

  if (progress.lastCompletedDate !== today) {
    progress.currentStreak += 1;
    progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
    progress.lastCompletedDate = today;
  }

  await saveProgress(progress);
  return progress;
}
