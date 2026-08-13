import { Share } from 'react-native';
import { Devotion } from '../types/devotion';
import { APP_DISPLAY_NAME, APP_SIGNATURE } from '../constants/brand';

export async function shareVerse(reference: string, text: string) {
  await Share.share({
    title: `${APP_DISPLAY_NAME} Verse - ${reference}`,
    message: `${reference}\n\n${text}\n\n${APP_SIGNATURE}`
  });
}

export async function shareDevotion(devotion: Devotion) {
  await Share.share({
    title: `${APP_DISPLAY_NAME} Devotion - ${devotion.title}`,
    message: `${APP_DISPLAY_NAME} Today\n\n${devotion.title}\n${devotion.reference}\n\n${devotion.verse}\n\nReflection: ${devotion.reflectionQuestion}\n\nPrayer: ${devotion.prayer}\n\n${APP_SIGNATURE}`
  });
}

export async function shareDevotionSummary(devotion: Devotion) {
  await Share.share({
    title: `${APP_DISPLAY_NAME} - ${devotion.reference}`,
    message: `${devotion.reference}\n\n${devotion.verse}\n\nToday's ${APP_DISPLAY_NAME}: ${devotion.title}\n\n${APP_SIGNATURE}`
  });
}
