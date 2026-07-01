import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';
import { configureNotificationHandlers, listenForOpenedVerseReminder } from './src/services/notificationService';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SplashIntroScreen from './src/screens/SplashIntroScreen';
import { completeOnboarding, hasCompletedOnboarding } from './src/storage/onboardingStorage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    hasCompletedOnboarding().then((done) => {
      setOnboardingDone(done);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    configureNotificationHandlers();
    const subscription = listenForOpenedVerseReminder();
    return () => subscription.remove();
  }, []);

  const finishOnboarding = async () => {
    await completeOnboarding();
    setOnboardingDone(true);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!introDone) {
    return <SplashIntroScreen onFinish={() => setIntroDone(true)} />;
  }

  if (!onboardingDone) {
    return <OnboardingScreen onComplete={finishOnboarding} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <AppNavigator />
    </NavigationContainer>
  );
}
