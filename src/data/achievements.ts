import { Achievement } from '../types/achievement';

export const achievements: Achievement[] = [
  {
    id: 'first-wordup',
    title: 'First WORDUP',
    description: 'Complete your first daily devotion.',
    emoji: '📖',
    color: '#6D3FD1',
    accent: '#F5A623',
    requirement: 'Complete 1 devotion'
  },
  {
    id: 'three-day-streak',
    title: '3-Day Flame',
    description: 'Keep a 3-day WORDUP streak.',
    emoji: '🔥',
    color: '#F97316',
    accent: '#FFD166',
    requirement: 'Reach a 3-day streak'
  },
  {
    id: 'seven-day-streak',
    title: 'Weekly Warrior',
    description: 'Complete WORDUP for 7 days.',
    emoji: '🏅',
    color: '#2563EB',
    accent: '#FACC15',
    requirement: 'Reach a 7-day streak'
  },
  {
    id: 'fourteen-day-streak',
    title: 'Faith Builder',
    description: 'Build a 14-day consistency habit.',
    emoji: '💪',
    color: '#16A34A',
    accent: '#BBF7D0',
    requirement: 'Reach a 14-day streak'
  },
  {
    id: 'thirty-day-streak',
    title: '30-Day Champion',
    description: 'Complete the full first WORDUP journey.',
    emoji: '👑',
    color: '#7C3AED',
    accent: '#FDE68A',
    requirement: 'Reach a 30-day streak'
  },
  {
    id: 'first-prayer-request',
    title: 'Prayer Starter',
    description: 'Save your first private prayer request.',
    emoji: '🙏',
    color: '#0EA5E9',
    accent: '#BAE6FD',
    requirement: 'Add 1 prayer request'
  },
  {
    id: 'answered-prayer',
    title: 'Testimony Medal',
    description: 'Mark a prayer request as answered.',
    emoji: '✨',
    color: '#059669',
    accent: '#FDE68A',
    requirement: 'Mark 1 answered prayer'
  },
  {
    id: 'memory-starter',
    title: 'Verse Keeper',
    description: 'Practice your first memory verse.',
    emoji: '💙',
    color: '#1D4ED8',
    accent: '#93C5FD',
    requirement: 'Practice 1 memory verse'
  },
  {
    id: 'quiz-starter',
    title: 'Truth Seeker',
    description: 'Earn your first quiz points.',
    emoji: '🧠',
    color: '#DB2777',
    accent: '#FBCFE8',
    requirement: 'Earn quiz points'
  },
  {
    id: 'hundred-points',
    title: 'Word Scholar',
    description: 'Reach 100 quiz points.',
    emoji: '🎓',
    color: '#9333EA',
    accent: '#DDD6FE',
    requirement: 'Earn 100 quiz points'
  }
];
