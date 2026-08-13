import { achievements } from '../data/achievements';
import { Achievement } from '../types/achievement';
import { Progress } from '../storage/progressStorage';
import { PrayerRequest } from '../types/prayer';

export type AchievementWithStatus = Achievement & {
  unlocked: boolean;
};

export function getAchievementsWithStatus(progress: Progress, requests: PrayerRequest[]): AchievementWithStatus[] {
  const requestCount = requests.length;
  const answeredCount = requests.filter((request) => request.status === 'answered').length;

  const unlockedMap: Record<string, boolean> = {
    'first-wordup': progress.completedDevotionIds.length >= 1,
    'three-day-streak': progress.currentStreak >= 3 || progress.longestStreak >= 3,
    'seven-day-streak': progress.currentStreak >= 7 || progress.longestStreak >= 7,
    'fourteen-day-streak': progress.currentStreak >= 14 || progress.longestStreak >= 14,
    'thirty-day-streak': progress.currentStreak >= 30 || progress.longestStreak >= 30,
    'first-prayer-request': requestCount >= 1,
    'answered-prayer': answeredCount >= 1,
    'memory-starter': progress.memorizedVerseIds.length >= 1,
    'quiz-starter': progress.quizPoints >= 1,
    'hundred-points': progress.quizPoints >= 100
  };

  return achievements.map((achievement) => ({
    ...achievement,
    unlocked: Boolean(unlockedMap[achievement.id])
  }));
}
