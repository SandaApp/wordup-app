import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'wordup:favoriteVerses';

export type FavoriteVerse = {
  reference: string;
  text: string;
  createdAt: string;
};

export async function getFavoriteVerses(): Promise<FavoriteVerse[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavoriteVerses(favorites: FavoriteVerse[]) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function toggleFavoriteVerse(reference: string, text: string) {
  const favorites = await getFavoriteVerses();
  const exists = favorites.some((item) => item.reference === reference);

  const next = exists
    ? favorites.filter((item) => item.reference !== reference)
    : [{ reference, text, createdAt: new Date().toISOString() }, ...favorites];

  await saveFavoriteVerses(next);
  return next;
}
