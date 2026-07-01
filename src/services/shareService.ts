import { Share } from 'react-native';
import { Devotion } from '../types/devotion';

const APP_SIGNATURE = 'Shared from WORDUP — Daily Scripture, Prayer and Growth.';

export async function shareVerse(reference: string, text: string) {
  await Share.share({
    title: `WORDUP Verse - ${reference}`,
    message: `${reference}\n\n${text}\n\n${APP_SIGNATURE}`
  });
}

export async function shareDevotion(devotion: Devotion) {
  await Share.share({
    title: `WORDUP Devotion - ${devotion.title}`,
    message: `WORDUP Today\n\n${devotion.title}\n${devotion.reference}\n\n${devotion.verse}\n\nReflection: ${devotion.reflectionQuestion}\n\nPrayer: ${devotion.prayer}\n\n${APP_SIGNATURE}`
  });
}

export async function shareDevotionSummary(devotion: Devotion) {
  await Share.share({
    title: `WORDUP - ${devotion.reference}`,
    message: `${devotion.reference}\n\n${devotion.verse}\n\nToday's WORDUP: ${devotion.title}\n\n${APP_SIGNATURE}`
  });
}
