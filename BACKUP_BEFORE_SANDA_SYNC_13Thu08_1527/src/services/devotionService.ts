import { devotions } from '../data/devotions';
import { Devotion } from '../types/devotion';

export function getTodayDevotion(date = new Date()): Devotion {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  const index = (dayOfYear - 1) % devotions.length;
  return devotions[index];
}

export function buildSpokenGreeting(devotion: Devotion, hour = new Date().getHours()): string {
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${greeting}. This is your WORDUP reminder. Today’s verse is ${devotion.reference}: ${devotion.verse} Take a moment to reflect, pray, and grow today.`;
}
