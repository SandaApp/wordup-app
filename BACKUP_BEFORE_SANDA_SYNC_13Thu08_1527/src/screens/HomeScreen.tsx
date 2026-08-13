import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { getTodayDevotion } from '../services/devotionService';
import { getProgress, Progress, defaultProgress } from '../storage/progressStorage';
import { speak } from '../services/speechService';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const devotion = getTodayDevotion();
  const [progress, setProgress] = useState<Progress>(defaultProgress);

  useFocusEffect(
    useCallback(() => {
      getProgress().then(setProgress);
    }, [])
  );

  return (
    <Screen>
      <View style={styles.hero}>
        <Image source={require('../../assets/icon_sword_heart_transparent.png')} style={styles.heroLogo} resizeMode="contain" />
        <View style={styles.heroTextWrap}>
          <Text style={styles.logo}>WORDUP</Text>
          <Text style={styles.tagline}>Daily Scripture. Prayer & Growth.</Text>
        </View>
      </View>

      <Card style={styles.todayCard}>
        <Text style={styles.kicker}>Today’s Word</Text>
        <Text style={styles.title}>{devotion.title}</Text>
        <Text style={styles.reference}>{devotion.reference}</Text>
        <Text style={styles.verse}>“{devotion.verse}”</Text>
        <PrimaryButton title="Open Today’s Devotion" onPress={() => navigation.navigate('Today')} />
        <PrimaryButton title="Hear Verse" variant="outline" onPress={() => speak(`${devotion.reference}. ${devotion.verse}`)} />
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{progress.currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{progress.quizPoints}</Text>
          <Text style={styles.statLabel}>Quiz Points</Text>
        </Card>
      </View>

      <Card>
        <Text style={styles.quickTitle}>Quick Actions</Text>
        <PrimaryButton title="Open Bible Reader" variant="secondary" onPress={() => navigation.navigate('Bible')} />
        <PrimaryButton title="Saved Verses" variant="outline" onPress={() => navigation.navigate('Saved')} />
        <PrimaryButton title="Pray Now" variant="secondary" onPress={() => navigation.navigate('Prayer')} />
        <PrimaryButton title="Practice Memory Verse" variant="gold" onPress={() => navigation.navigate('Memory')} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 8,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  heroLogo: {
    width: 72,
    height: 72
  },
  heroTextWrap: {
    flex: 1
  },
  logo: {
    color: colors.primary,
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 1
  },
  tagline: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2
  },
  todayCard: {
    backgroundColor: colors.softPurple
  },
  kicker: {
    color: colors.primary,
    fontWeight: '900',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900'
  },
  reference: {
    color: colors.primaryDark,
    fontWeight: '800',
    marginTop: 6,
    fontSize: 16
  },
  verse: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 25,
    marginVertical: 15
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12
  },
  statCard: {
    flex: 1,
    alignItems: 'center'
  },
  statNumber: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '900'
  },
  statLabel: {
    color: colors.mutedText,
    fontWeight: '700'
  },
  quickTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 10
  }
});
