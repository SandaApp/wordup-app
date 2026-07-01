export type AppMode = 'individual' | 'family';

export type ReminderSettings = {
  enabled: boolean;
  hour: number;
  minute: number;
  spokenGreetingEnabled: boolean;
  speechRate: number;
  appMode: AppMode;
};
