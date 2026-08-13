import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import AnimatedEntrance from '../components/AnimatedEntrance';
import { FavoriteVerse, getFavoriteVerses, toggleFavoriteVerse } from '../storage/favoriteVerseStorage';
import { speak } from '../services/speechService';
import { shareVerse } from '../services/shareService';
import { colors } from '../theme/colors';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteVerse[]>([]);

  const load = useCallback(() => {
    getFavoriteVerses().then(setFavorites);
  }, []);

  useFocusEffect(load);

  const remove = async (reference: string, text: string) => {
    const next = await toggleFavoriteVerse(reference, text);
    setFavorites(next);
    Alert.alert('Removed', `${reference} removed from saved verses.`);
  };

  return (
    <Screen>
      <SectionTitle title="Saved Verses" subtitle="Keep meaningful Scriptures close for prayer, memory, and encouragement." />

      {favorites.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No saved verses yet</Text>
          <Text style={styles.emptyText}>Open the Bible tab and tap “Save Verse” on any Scripture you want to keep.</Text>
        </Card>
      ) : (
        favorites.map((verse, index) => (
          <AnimatedEntrance key={verse.reference} delay={Math.min(index * 40, 260)} variant={index % 2 === 0 ? 'slideLeft' : 'slideRight'}>
            <Card>
              <Text style={styles.reference}>{verse.reference}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
              <PrimaryButton title="Speak Verse" variant="outline" onPress={() => speak(`${verse.reference}. ${verse.text}`)} />
              <PrimaryButton title="Share Verse" variant="gold" onPress={() => shareVerse(verse.reference, verse.text)} />
              <PrimaryButton title="Remove" variant="outline" onPress={() => remove(verse.reference, verse.text)} />
            </Card>
          </AnimatedEntrance>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    backgroundColor: colors.softPurple
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24
  },
  reference: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8
  },
  verseText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 12
  }
});
