import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGHLIGHTS_KEY = 'wordup:verseHighlights';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'orange' | 'purple';

export const highlightColors: Record<HighlightColor, string> = {
  yellow: '#FFF176',
  green: '#A7F3D0',
  blue: '#93C5FD',
  pink: '#F9A8D4',
  orange: '#FDBA74',
  purple: '#C4B5FD'
};

export type VerseHighlightMap = Record<string, HighlightColor>;

export async function getVerseHighlights(): Promise<VerseHighlightMap> {
  const raw = await AsyncStorage.getItem(HIGHLIGHTS_KEY);
  return raw ? JSON.parse(raw) : {};
}

export async function saveVerseHighlights(highlights: VerseHighlightMap) {
  await AsyncStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(highlights));
}

export async function setVerseHighlight(reference: string, color?: HighlightColor) {
  const highlights = await getVerseHighlights();

  if (color) {
    highlights[reference] = color;
  } else {
    delete highlights[reference];
  }

  await saveVerseHighlights(highlights);
  return highlights;
}
