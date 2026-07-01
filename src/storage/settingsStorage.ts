import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReminderSettings } from '../types/settings';

const SETTINGS_KEY = 'wordup:settings';

export const defaultSettings: ReminderSettings = {
  enabled: false,
  hour: 7,
  minute: 0,
  spokenGreetingEnabled: true,
  speechRate: 0.9,
  appMode: 'individual'
};

export async function getSettings(): Promise<ReminderSettings> {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
}

export async function saveSettings(settings: ReminderSettings) {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
