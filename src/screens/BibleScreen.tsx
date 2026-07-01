import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import AnimatedEntrance from '../components/AnimatedEntrance';
import { bibleBooks, BibleBook } from '../data/bibleBooks';
import { BibleVerse, buildChapterSpeech, getChapterVerses, getDefaultBibleBook, searchBible } from '../services/bibleService';
import { speak, stopSpeaking } from '../services/speechService';
import { colors } from '../theme/colors';
import { isWordsOfChrist } from '../services/redLetterService';
import { toggleFavoriteVerse } from '../storage/favoriteVerseStorage';
import { shareVerse } from '../services/shareService';
import { getVerseHighlights, HighlightColor, highlightColors, setVerseHighlight, VerseHighlightMap } from '../storage/verseHighlightStorage';

type BibleMode = 'read' | 'search';

const highlightOptions: { label: string; value: HighlightColor }[] = [
  { label: 'Yellow', value: 'yellow' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Pink', value: 'pink' },
  { label: 'Orange', value: 'orange' },
  { label: 'Purple', value: 'purple' }
];

export default function BibleScreen() {
  const defaultBook = getDefaultBibleBook();
  const [mode, setMode] = useState<BibleMode>('read');
  const [selectedBook, setSelectedBook] = useState<BibleBook>(defaultBook);
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [bookMenuOpen, setBookMenuOpen] = useState(false);
  const [verseMenuOpen, setVerseMenuOpen] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [highlights, setHighlights] = useState<VerseHighlightMap>({});
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const chapterVerses = useMemo(() => getChapterVerses(selectedBook.name, selectedChapter), [selectedBook, selectedChapter]);
  const searchResults = useMemo(() => searchBible(debouncedQuery), [debouncedQuery]);

  useEffect(() => {
    getVerseHighlights().then(setHighlights);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(timer);
  }, [query]);

  const chooseBook = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setBookMenuOpen(false);
  };

  const openVerseOptions = (verse: BibleVerse) => {
    setSelectedVerse(verse);
    setVerseMenuOpen(true);
  };

  const saveVerse = async () => {
    if (!selectedVerse) return;
    await toggleFavoriteVerse(selectedVerse.reference, selectedVerse.text);
    setVerseMenuOpen(false);
    Alert.alert('Saved Verse', `${selectedVerse.reference} has been added to Saved Verses.`);
  };

  const speakSelectedVerse = () => {
    if (!selectedVerse) return;
    setVerseMenuOpen(false);
    speak(`${selectedVerse.reference}. ${selectedVerse.text}`);
  };

  const shareSelectedVerse = async () => {
    if (!selectedVerse) return;
    setVerseMenuOpen(false);
    await shareVerse(selectedVerse.reference, selectedVerse.text);
  };

  const highlightSelectedVerse = async (color: HighlightColor) => {
    if (!selectedVerse) return;
    const next = await setVerseHighlight(selectedVerse.reference, color);
    setHighlights(next);
    setVerseMenuOpen(false);
  };

  const clearSelectedHighlight = async () => {
    if (!selectedVerse) return;
    const next = await setVerseHighlight(selectedVerse.reference);
    setHighlights(next);
    setVerseMenuOpen(false);
  };

  const renderVerseLine = (verse: BibleVerse, index: number) => {
    const redLetter = isWordsOfChrist(verse.book, verse.chapter, verse.verse);
    const highlight = highlights[verse.reference];

    return (
      <AnimatedEntrance key={verse.reference} delay={Math.min(index * 16, 220)} variant={index % 4 === 0 ? 'float' : index % 4 === 1 ? 'fadeUp' : index % 4 === 2 ? 'slideLeft' : 'slideRight'}>
        <Pressable
          onLongPress={() => openVerseOptions(verse)}
          delayLongPress={280}
          style={({ pressed }) => [
            styles.verseLine,
            highlight && { backgroundColor: highlightColors[highlight] },
            pressed && styles.pressedVerseLine
          ]}
        >
          <Text style={[styles.inlineVerseNumber, redLetter && styles.redInlineVerseNumber]}>{verse.verse}</Text>
          <Text style={[styles.verseText, redLetter && styles.redLetterText]}>{verse.text}</Text>
        </Pressable>
      </AnimatedEntrance>
    );
  };

  return (
    <Screen>
      <SectionTitle title="Bible" subtitle="Read and search the King James Version offline. Long-press any verse to speak, save, or highlight it." />

      <View style={styles.tabRow}>
        <TabButton title="Read" active={mode === 'read'} onPress={() => setMode('read')} />
        <TabButton title="Search" active={mode === 'search'} onPress={() => setMode('search')} />
      </View>

      {mode === 'read' ? (
        <>
          <Card style={styles.readerControls}>
            <Text style={styles.label}>Book</Text>
            <Pressable style={styles.dropdownButton} onPress={() => setBookMenuOpen(true)}>
              <Text style={styles.dropdownValue}>{selectedBook.name}</Text>
              <Text style={styles.dropdownArrow}>⌄</Text>
            </Pressable>

            <Text style={styles.label}>Chapter</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chapterRow}>
              {Array.from({ length: selectedBook.chapters }, (_, index) => index + 1).map((chapter) => (
                <Pressable
                  key={chapter}
                  onPress={() => setSelectedChapter(chapter)}
                  style={[styles.chapterChip, chapter === selectedChapter && styles.activeChapterChip]}
                >
                  <Text style={[styles.chapterChipText, chapter === selectedChapter && styles.activeChapterChipText]}>{chapter}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.readerButtonRow}>
              <PrimaryButton title="Read Chapter Aloud" onPress={() => speak(buildChapterSpeech(selectedBook.name, selectedChapter), 0.78)} style={styles.readerButton} />
              <PrimaryButton title="Stop" variant="outline" onPress={stopSpeaking} style={styles.readerButton} />
            </View>
          </Card>

          <Text style={styles.chapterTitle}>{selectedBook.name} {selectedChapter}</Text>
          <Card style={styles.chapterCard}>
            <Text style={styles.longPressHint}>Long-press a verse for options</Text>
            {chapterVerses.map(renderVerseLine)}
          </Card>
        </>
      ) : (
        <>
          <Card>
            <Text style={styles.searchTitle}>Search KJV Bible</Text>
            <Text style={styles.searchHelp}>Search words, phrases, or references like John 3:16, Psalm 23, faith, peace, love, or fear not.</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search the Bible..."
              placeholderTextColor={colors.mutedText}
              style={styles.searchInput}
            />
          </Card>

          <Text style={styles.resultText}>{debouncedQuery.trim().length < 3 ? 'Type at least 3 characters, or enter a reference like John 3:16.' : `${searchResults.length} result${searchResults.length === 1 ? '' : 's'} shown`}</Text>

          {searchResults.map((verse, index) => {
            const redLetter = isWordsOfChrist(verse.book, verse.chapter, verse.verse);
            const highlight = highlights[verse.reference];
            return (
              <AnimatedEntrance key={verse.reference} delay={0} variant={index % 2 === 0 ? 'slideLeft' : 'slideRight'}>
                <Card style={[styles.searchResultCard, redLetter && styles.redLetterCard, highlight && { backgroundColor: highlightColors[highlight] }]}>
                  <Pressable onLongPress={() => openVerseOptions(verse)} delayLongPress={280}>
                    <Text style={styles.reference}>{verse.reference}</Text>
                    <Text style={[styles.verseText, redLetter && styles.redLetterText]}>{verse.text}</Text>
                    <Text style={styles.longPressHint}>Long-press for speak, save, or highlight options</Text>
                  </Pressable>
                  <PrimaryButton
                    title="Open Chapter"
                    variant="gold"
                    onPress={() => {
                      const book = bibleBooks.find((item) => item.name === verse.book);
                      if (book) {
                        setSelectedBook(book);
                        setSelectedChapter(verse.chapter);
                        setMode('read');
                      }
                    }}
                  />
                </Card>
              </AnimatedEntrance>
            );
          })}
        </>
      )}

      <Modal visible={bookMenuOpen} transparent animationType="fade" onRequestClose={() => setBookMenuOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setBookMenuOpen(false)}>
          <Pressable style={styles.modalCard} onPress={() => null}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Choose Book</Text>
                <Text style={styles.modalSubtitle}>King James Version</Text>
              </View>
              <Pressable onPress={() => setBookMenuOpen(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {bibleBooks.map((book) => {
                const active = book.name === selectedBook.name;
                return (
                  <Pressable key={book.name} onPress={() => chooseBook(book)} style={[styles.bookOption, active && styles.activeBookOption]}>
                    <Text style={[styles.bookName, active && styles.activeBookName]}>{book.name}</Text>
                    <Text style={styles.bookChapters}>{book.chapters} chapter{book.chapters === 1 ? '' : 's'}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={verseMenuOpen} transparent animationType="fade" onRequestClose={() => setVerseMenuOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setVerseMenuOpen(false)}>
          <Pressable style={styles.verseMenuCard} onPress={() => null}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleWrap}>
                <Text style={styles.modalTitle}>{selectedVerse?.reference}</Text>
                <Text style={styles.modalSubtitle}>Choose an action for this verse</Text>
              </View>
              <Pressable onPress={() => setVerseMenuOpen(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            {selectedVerse ? <Text style={[styles.menuVerseText, isWordsOfChrist(selectedVerse.book, selectedVerse.chapter, selectedVerse.verse) && styles.redLetterText]}>{selectedVerse.text}</Text> : null}

            <PrimaryButton title="Speak Verse" onPress={speakSelectedVerse} />
            <PrimaryButton title="Save Verse" variant="secondary" onPress={saveVerse} />
            <PrimaryButton title="Share Verse" variant="gold" onPress={shareSelectedVerse} />

            <Text style={styles.highlightTitle}>Highlight Colour</Text>
            <View style={styles.colorGrid}>
              {highlightOptions.map((option) => (
                <Pressable key={option.value} onPress={() => highlightSelectedVerse(option.value)} style={[styles.colorOption, { backgroundColor: highlightColors[option.value] }]}>
                  <Text style={styles.colorOptionText}>{option.label}</Text>
                </Pressable>
              ))}
            </View>

            <PrimaryButton title="Remove Highlight" variant="outline" onPress={clearSelectedHighlight} />
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

function TabButton({ title, active, onPress }: { title: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.tabButton, active && styles.activeTabButton]}>
      <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 5,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center'
  },
  activeTabButton: {
    backgroundColor: colors.primary
  },
  tabText: {
    color: colors.mutedText,
    fontWeight: '900'
  },
  activeTabText: {
    color: '#FFFFFF'
  },
  readerControls: {
    backgroundColor: colors.softPurple
  },
  label: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 7
  },
  dropdownButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dropdownValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  dropdownArrow: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: '900'
  },
  chapterRow: {
    gap: 8,
    paddingBottom: 12
  },
  chapterChip: {
    minWidth: 44,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeChapterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  chapterChipText: {
    color: colors.text,
    fontWeight: '900'
  },
  activeChapterChipText: {
    color: '#FFFFFF'
  },
  readerButtonRow: {
    flexDirection: 'row',
    gap: 10
  },
  readerButton: {
    flex: 1
  },
  chapterTitle: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '900',
    marginBottom: 12
  },
  chapterCard: {
    backgroundColor: '#FFFFFF'
  },
  verseLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 7,
    borderRadius: 12,
    marginBottom: 2
  },
  pressedVerseLine: {
    opacity: 0.75,
    transform: [{ scale: 0.995 }]
  },
  inlineVerseNumber: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    width: 28,
    marginTop: 4
  },
  redInlineVerseNumber: {
    color: '#B42318'
  },
  verseText: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    lineHeight: 26
  },
  redLetterText: {
    color: '#B42318',
    fontWeight: '700'
  },
  redLetterCard: {
    borderColor: '#D93025',
    backgroundColor: '#FFF7F5'
  },
  longPressHint: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 10
  },
  searchTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 7
  },
  searchHelp: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    marginBottom: 12
  },
  searchInput: {
    backgroundColor: '#FFFCF6',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    color: colors.text,
    fontSize: 16
  },
  resultText: {
    color: colors.mutedText,
    fontWeight: '800',
    marginBottom: 12
  },
  searchResultCard: {
    backgroundColor: '#FFFFFF'
  },
  reference: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 8
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(33, 26, 50, 0.45)',
    justifyContent: 'flex-end'
  },
  modalCard: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: '82%'
  },
  verseMenuCard: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: '86%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14
  },
  modalTitleWrap: {
    flex: 1,
    paddingRight: 12
  },
  modalTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900'
  },
  modalSubtitle: {
    color: colors.mutedText,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 3
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border
  },
  closeText: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 28,
    fontWeight: '700'
  },
  bookOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 9
  },
  activeBookOption: {
    backgroundColor: colors.softPurple,
    borderColor: colors.primary
  },
  bookName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900'
  },
  activeBookName: {
    color: colors.primary
  },
  bookChapters: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3
  },
  menuVerseText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  highlightTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 12,
    marginBottom: 10
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12
  },
  colorOption: {
    width: '31%',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(33, 26, 50, 0.18)'
  },
  colorOptionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900'
  }
});
