import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'wordup:onboardingComplete';

export async function hasCompletedOnboarding(): Promise<boolean> {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value === 'true';
}

export async function completeOnboarding() {
  await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
}

export async function resetOnboarding() {
  await AsyncStorage.removeItem(ONBOARDING_KEY);
}
