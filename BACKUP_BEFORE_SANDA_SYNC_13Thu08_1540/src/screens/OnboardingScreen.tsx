import React, { useState } from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import AnimatedEntrance from '../components/AnimatedEntrance';
import PulseView from '../components/PulseView';

const slides = [
  {
    title: "Welcome to Sanda's WordUp",
    subtitle: 'Daily Scripture. Prayer & Growth.',
    body: 'Build a simple habit of hearing God’s Word, reflecting, praying, and growing one day at a time.'
  },
  {
    title: 'For You and Your Family',
    subtitle: 'Personal or family mode',
    body: "Use Sanda's WordUp alone, with friends, or as a family devotional guide with discussion questions and daily challenges."
  },
  {
    title: 'Prayer That Stays With You',
    subtitle: 'Guided prayers and private requests',
    body: 'Pray through guided prayers, save private prayer requests, and mark answered prayers as testimonies of God’s faithfulness.'
  },
  {
    title: 'A Timely Word',
    subtitle: 'Verse reminders with voice',
    body: "Choose your reminder time. Sanda's WordUp will remind you, and when opened, speak today’s greeting and Scripture aloud."
  }
];

export default function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const goNext = () => {
    if (isLast) {
      onComplete();
      return;
    }
    setIndex((current) => current + 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.brandArea}>
          <PulseView>
            <Image source={require('../../assets/logo-ui.png')} style={styles.icon} resizeMode="contain" />
          </PulseView>
          <Text style={styles.logo}>Sanda's WordUp</Text>
          <Text style={styles.tagline}>Daily Scripture. Prayer & Growth.</Text>
        </View>

        <AnimatedEntrance fromY={20} scaleFrom={0.95}>
          <Card style={styles.card}>
            <Text style={styles.step}>STEP {index + 1} OF {slides.length}</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
            <Text style={styles.body}>{slide.body}</Text>

            <View style={styles.dots}>
              {slides.map((_, dotIndex) => (
                <View key={dotIndex} style={[styles.dot, dotIndex === index && styles.activeDot]} />
              ))}
            </View>
          </Card>
        </AnimatedEntrance>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title={isLast ? "Start Sanda's WordUp" : 'Next'} onPress={goNext} />
        {!isLast ? <PrimaryButton title="Skip" variant="outline" onPress={onComplete} /> : null}
      </View>
    </SafeAreaView>
  );
}

const androidTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 6 : 8;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: androidTopPadding
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 18
  },
  brandArea: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 10
  },
  icon: {
    width: 112,
    height: 112
  },
  logo: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1
  },
  tagline: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 0
  },
  step: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 5
  },
  subtitle: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 10
  },
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23
  },
  dots: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 18,
    marginBottom: 2
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: colors.border
  },
  activeDot: {
    width: 26,
    backgroundColor: colors.primary
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 18 : 24,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border
  }
});
