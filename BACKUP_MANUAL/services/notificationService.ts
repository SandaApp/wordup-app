import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getTodayDevotion, buildSpokenGreeting } from './devotionService';
import { speak } from './speechService';

export function configureNotificationHandlers() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
  });
}

export async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();
  let finalStatus = current.status;

  if (current.status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    finalStatus = requested.status;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-wordup', {
      name: 'WORDUP Daily Reminder',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#6D3FD1'
    });
  }

  return finalStatus === 'granted';
}

export async function scheduleDailyWordReminder(hour: number, minute: number) {
  const granted = await requestNotificationPermission();
  if (!granted) return false;

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'WORDUP',
      body: 'It’s time for today’s Scripture, prayer, and growth.',
      data: { type: 'daily-wordup' },
      sound: true
    },
    trigger: {
      hour,
      minute,
      repeats: true,
      channelId: 'daily-wordup'
    }
  });

  return true;
}

export function listenForOpenedVerseReminder() {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const type = response.notification.request.content.data?.type;
    if (type === 'daily-wordup') {
      const devotion = getTodayDevotion();
      speak(buildSpokenGreeting(devotion));
    }
  });
}
