import { Progress } from '../storage/progressStorage';
import { PrayerRequest } from '../types/prayer';
import { AchievementWithStatus, getAchievementsWithStatus } from './achievementService';
import { getSeenAchievementIds, markAchievementIdsSeen } from '../storage/achievementStorage';

export async function checkAndMarkNewAchievements(progress: Progress, requests: PrayerRequest[]): Promise<AchievementWithStatus[]> {
  const seenIds = await getSeenAchievementIds();
  const achievements = getAchievementsWithStatus(progress, requests);
  const newlyUnlocked = achievements.filter((achievement) => achievement.unlocked && !seenIds.includes(achievement.id));

  if (newlyUnlocked.length > 0) {
    await markAchievementIdsSeen(newlyUnlocked.map((achievement) => achievement.id));
  }

  return newlyUnlocked;
}
