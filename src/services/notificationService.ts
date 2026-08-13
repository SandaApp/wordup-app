import { Platform } from 'react-native';
import { getTodayDevotion, buildSpokenGreeting } from './devotionService';
import { speak } from './speechService';
import { APP_DISPLAY_NAME } from '../constants/brand';

// Lazy-load expo-notifications so Expo Go SDK 53+ push limitations don't crash startup.
let Notifications: typeof import('expo-notifications') | null = null;

function getNotifications() {
  if (Notifications) return Notifications;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Notifications = require('expo-notifications');
    return Notifications;
  } catch {
    return null;
  }
}

export function configureNotificationHandlers() {
  const N = getNotifications();
  if (!N) return;

  try {
    N.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true
      })
    });
  } catch {
    // Expo Go may log a warning about remote push; local reminders still often work in dev builds.
  }
}

export async function requestNotificationPermission() {
  const N = getNotifications();
  if (!N) return false;

  try {
    const current = await N.getPermissionsAsync();
    let finalStatus = current.status;

    if (current.status !== 'granted') {
      const requested = await N.requestPermissionsAsync();
      finalStatus = requested.status;
    }

    if (Platform.OS === 'android') {
      await N.setNotificationChannelAsync('daily-wordup', {
        name: `${APP_DISPLAY_NAME} Daily Reminder`,
        importance: N.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#6D3FD1'
      });
    }

    return finalStatus === 'granted';
  } catch {
    return false;
  }
}

export async function scheduleDailyWordReminder(hour: number, minute: number) {
  const N = getNotifications();
  if (!N) return false;

  const granted = await requestNotificationPermission();
  if (!granted) return false;

  try {
    await N.cancelAllScheduledNotificationsAsync();

    await N.scheduleNotificationAsync({
      content: {
        title: APP_DISPLAY_NAME,
        body: 'It’s time for today’s Scripture, prayer, and growth.',
        data: { type: 'daily-wordup' },
        sound: true
      },
      trigger: {
        type: N.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: 'daily-wordup'
      }
    });

    return true;
  } catch {
    // In Expo Go, some notification paths are limited — full support in EAS/dev builds & Play release.
    return false;
  }
}

export function listenForOpenedVerseReminder() {
  const N = getNotifications();
  if (!N) {
    return { remove() {} };
  }

  try {
    return N.addNotificationResponseReceivedListener((response) => {
      const type = response.notification.request.content.data?.type;
      if (type === 'daily-wordup') {
        const devotion = getTodayDevotion();
        speak(buildSpokenGreeting(devotion));
      }
    });
  } catch {
    return { remove() {} };
  }
}
