import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import { defaultProgress, getProgress, Progress } from '../storage/progressStorage';
import { getPrayerRequests } from '../storage/prayerStorage';
import { colors } from '../theme/colors';
import { getAchievementsWithStatus, AchievementWithStatus } from '../services/achievementService';
import AchievementMedal from '../components/AchievementMedal';

export default function ProgressScreen() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [requestCount, setRequestCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [badges, setBadges] = useState<AchievementWithStatus[]>([]);

  useFocusEffect(
    useCallback(() => {
      Promise.all([getProgress(), getPrayerRequests()]).then(([savedProgress, requests]) => {
        setProgress(savedProgress);
        setRequestCount(requests.length);
        setAnsweredCount(requests.filter((request) => request.status === 'answered').length);
        setBadges(getAchievementsWithStatus(savedProgress, requests));
      });
    }, [])
  );

  return (
    <Screen>
      <SectionTitle title="Progress" subtitle="Celebrate consistency, prayer, memory, and growth." />
      <View style={styles.grid}>
        <Stat label="Current Streak" value={progress.currentStreak} />
        <Stat label="Longest Streak" value={progress.longestStreak} />
        <Stat label="Devotions" value={progress.completedDevotionIds.length} />
        <Stat label="Verses Practiced" value={progress.memorizedVerseIds.length} />
        <Stat label="Quiz Points" value={progress.quizPoints} />
        <Stat label="Prayer Requests" value={requestCount} />
        <Stat label="Answered Prayers" value={answeredCount} />
      </View>

      <Text style={styles.badgeHeader}>Medals & Badges</Text>
      <Text style={styles.badgeSubtitle}>Colourful achievements to celebrate Scripture, prayer, memory, and consistency.</Text>
      <View style={styles.badgeGrid}>
        {badges.map((badge) => (
          <AchievementMedal key={badge.id} achievement={badge} />
        ))}
      </View>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card style={styles.statCard}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  statCard: {
    width: '47%',
    minHeight: 116,
    justifyContent: 'center',
    alignItems: 'center'
  },
  value: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '900'
  },
  label: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 5
  },
  badgeHeader: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 5
  },
  badgeSubtitle: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    marginBottom: 14
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
