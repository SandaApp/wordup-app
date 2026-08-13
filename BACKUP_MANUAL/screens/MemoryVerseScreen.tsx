import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { getTodayDevotion } from '../services/devotionService';
import { speak } from '../services/speechService';
import { getProgress, saveProgress } from '../storage/progressStorage';
import { getPrayerRequests } from '../storage/prayerStorage';
import { checkAndMarkNewAchievements } from '../services/achievementUnlockService';
import { colors } from '../theme/colors';

export default function MemoryVerseScreen() {
  const devotion = getTodayDevotion();
  const [hideWords, setHideWords] = useState(false);

  const practiceVerse = useMemo(() => {
    if (!hideWords) return devotion.verse;
    return devotion.verse
      .split(' ')
      .map((word, index) => (index % 4 === 1 ? '_____' : word))
      .join(' ');
  }, [hideWords, devotion.verse]);

  const markMemorized = async () => {
    const progress = await getProgress();
    if (!progress.memorizedVerseIds.includes(devotion.id)) {
      progress.memorizedVerseIds.push(devotion.id);
      await saveProgress(progress);
    }
    const requests = await getPrayerRequests();
    const badges = await checkAndMarkNewAchievements(progress, requests);
    Alert.alert('Great job!', `Memory verse marked as practiced.${badges.length > 0 ? `\n\nNew Badge Unlocked: ${badges[0].emoji} ${badges[0].title}` : ''}`);
  };

  return (
    <Screen>
      <SectionTitle title="Memory Verse" subtitle="Practice today’s verse by reading, hearing, hiding words, and repeating." />

      <Card style={styles.card}>
        <Text style={styles.reference}>{devotion.reference}</Text>
        <Text style={styles.verse}>“{practiceVerse}”</Text>
        <PrimaryButton title="Hear Full Verse" onPress={() => speak(`${devotion.reference}. ${devotion.verse}`)} />
        <PrimaryButton title={hideWords ? 'Show Full Verse' : 'Hide Some Words'} variant="outline" onPress={() => setHideWords(!hideWords)} />
        <PrimaryButton title="Mark Practiced" variant="gold" onPress={markMemorized} />
      </Card>

      <Card>
        <Text style={styles.tipTitle}>Practice Tip</Text>
        <Text style={styles.tip}>Read the verse aloud three times. Then hide some words and try to say it from memory. Families can take turns helping one another.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.softPurple
  },
  reference: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12
  },
  verse: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 34,
    fontWeight: '800',
    marginBottom: 18
  },
  tipTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8
  },
  tip: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 25
  }
});
