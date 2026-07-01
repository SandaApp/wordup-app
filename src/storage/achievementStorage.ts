import AsyncStorage from '@react-native-async-storage/async-storage';

const SEEN_ACHIEVEMENTS_KEY = 'wordup:seenAchievements';

export async function getSeenAchievementIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(SEEN_ACHIEVEMENTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function markAchievementIdsSeen(ids: string[]) {
  const existing = await getSeenAchievementIds();
  const merged = Array.from(new Set([...existing, ...ids]));
  await AsyncStorage.setItem(SEEN_ACHIEVEMENTS_KEY, JSON.stringify(merged));
}

export async function resetSeenAchievements() {
  await AsyncStorage.removeItem(SEEN_ACHIEVEMENTS_KEY);
}
