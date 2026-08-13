import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { guidedPrayers } from '../data/prayers';
import { speak, stopSpeaking } from '../services/speechService';
import { addPrayerRequest, getPrayerRequests, updatePrayerRequestStatus } from '../storage/prayerStorage';
import { PrayerRequest } from '../types/prayer';
import { getProgress } from '../storage/progressStorage';
import { checkAndMarkNewAchievements } from '../services/achievementUnlockService';
import { colors } from '../theme/colors';
import AnimatedEntrance from '../components/AnimatedEntrance';

type PrayerTab = 'guided' | 'requests';
type RequestFilter = 'all' | 'active' | 'answered' | 'archived';

export default function PrayerScreen() {
  const [activeTab, setActiveTab] = useState<PrayerTab>('guided');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [requestFilter, setRequestFilter] = useState<RequestFilter>('all');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [requests, setRequests] = useState<PrayerRequest[]>([]);

  const loadRequests = useCallback(() => {
    getPrayerRequests().then(setRequests);
  }, []);

  useFocusEffect(loadRequests);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(guidedPrayers.map((prayer) => prayer.category)));
    return ['All', ...unique];
  }, []);

  const filteredPrayers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return guidedPrayers.filter((prayer) => {
      const matchesCategory = selectedCategory === 'All' || prayer.category === selectedCategory;
      const matchesSearch =
        !query ||
        prayer.title.toLowerCase().includes(query) ||
        prayer.category.toLowerCase().includes(query) ||
        prayer.text.toLowerCase().includes(query) ||
        prayer.reference?.toLowerCase().includes(query) ||
        prayer.scripture?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesStatus = requestFilter === 'all' || request.status === requestFilter;
      const matchesSearch =
        !query ||
        request.title.toLowerCase().includes(query) ||
        request.details.toLowerCase().includes(query) ||
        request.category.toLowerCase().includes(query) ||
        request.status.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [requests, requestFilter, search]);

  const submitRequest = async () => {
    if (!title.trim()) {
      Alert.alert('Prayer Request', 'Please add a short title.');
      return;
    }
    await addPrayerRequest(title.trim(), details.trim());
    setTitle('');
    setDetails('');
    const updatedRequests = await getPrayerRequests();
    setRequests(updatedRequests);
    const progress = await getProgress();
    const badges = await checkAndMarkNewAchievements(progress, updatedRequests);
    Alert.alert('Saved', `Your prayer request has been saved privately on this device.${badges.length > 0 ? `\n\nNew Badge Unlocked: ${badges[0].emoji} ${badges[0].title}` : ''}`);
  };

  const updateStatus = async (id: string, status: PrayerRequest['status']) => {
    const next = await updatePrayerRequestStatus(id, status);
    setRequests(next);
    const progress = await getProgress();
    const badges = await checkAndMarkNewAchievements(progress, next);
    if (badges.length > 0) {
      Alert.alert('New Badge Unlocked!', `${badges[0].emoji} ${badges[0].title}\n${badges[0].description}`);
    }
  };

  const activeCount = requests.filter((request) => request.status === 'active').length;
  const answeredCount = requests.filter((request) => request.status === 'answered').length;

  return (
    <Screen>
      <SectionTitle title="Prayer" subtitle="Pray guided prayers, save private requests, and remember what God is doing." />

      <View style={styles.tabRow}>
        <TabButton
          title={`Guided Prayers (${guidedPrayers.length})`}
          active={activeTab === 'guided'}
          onPress={() => {
            setActiveTab('guided');
            setSearch('');
          }}
        />
        <TabButton
          title={`My Requests (${requests.length})`}
          active={activeTab === 'requests'}
          onPress={() => {
            setActiveTab('requests');
            setSearch('');
          }}
        />
      </View>

      <TextInput
        placeholder={activeTab === 'guided' ? 'Search prayers, topics, or scripture...' : 'Search my prayer requests...'}
        placeholderTextColor={colors.mutedText}
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {activeTab === 'guided' ? (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {categories.map((category) => (
              <Chip key={category} label={category} active={selectedCategory === category} onPress={() => setSelectedCategory(category)} />
            ))}
          </ScrollView>

          <Text style={styles.resultText}>{filteredPrayers.length} guided prayer{filteredPrayers.length === 1 ? '' : 's'} found</Text>

          {filteredPrayers.map((prayer, index) => (
            <AnimatedEntrance key={prayer.id} delay={Math.min(index * 35, 250)}>
              <Card style={styles.prayerCard}>
              <Text style={styles.category}>{prayer.category}</Text>
              <Text style={styles.title}>{prayer.title}</Text>
              {prayer.reference ? <Text style={styles.reference}>{prayer.reference}</Text> : null}
              {prayer.scripture ? <Text style={styles.scripture}>“{prayer.scripture}”</Text> : null}
              <Text style={styles.body}>{prayer.text}</Text>
              <PrimaryButton title="Pray Aloud" onPress={() => speak(prayer.text)} />
              <PrimaryButton title="Stop Voice" variant="outline" onPress={stopSpeaking} />
              </Card>
            </AnimatedEntrance>
          ))}

          {filteredPrayers.length === 0 ? (
            <Card>
              <Text style={styles.empty}>No guided prayers matched your search.</Text>
            </Card>
          ) : null}
        </>
      ) : (
        <>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <SummaryStat label="Active" value={activeCount} />
              <SummaryStat label="Answered" value={answeredCount} />
              <SummaryStat label="Total" value={requests.length} />
            </View>
          </Card>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {(['all', 'active', 'answered', 'archived'] as RequestFilter[]).map((status) => (
              <Chip key={status} label={status[0].toUpperCase() + status.slice(1)} active={requestFilter === status} onPress={() => setRequestFilter(status)} />
            ))}
          </ScrollView>

          <Text style={styles.sectionHeader}>Add Private Prayer Request</Text>
          <Card>
            <TextInput
              placeholder="Title, e.g. Exams, family, direction..."
              placeholderTextColor={colors.mutedText}
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Write the request here..."
              placeholderTextColor={colors.mutedText}
              value={details}
              onChangeText={setDetails}
              style={[styles.input, styles.textArea]}
              multiline
            />
            <PrimaryButton title="Save Prayer Request" onPress={submitRequest} />
          </Card>

          <Text style={styles.sectionHeader}>My Requests</Text>
          <Text style={styles.resultText}>{filteredRequests.length} request{filteredRequests.length === 1 ? '' : 's'} shown</Text>

          {filteredRequests.length === 0 ? (
            <Card>
              <Text style={styles.empty}>No prayer requests found. Add one above or change your filter.</Text>
            </Card>
          ) : (
            filteredRequests.map((request, index) => (
              <AnimatedEntrance key={request.id} delay={Math.min(index * 35, 250)}>
                <Card style={request.status === 'answered' ? styles.answered : request.status === 'archived' ? styles.archived : undefined}>
                <Text style={styles.requestStatus}>{request.status.toUpperCase()}</Text>
                <Text style={styles.title}>{request.title}</Text>
                {request.details ? <Text style={styles.body}>{request.details}</Text> : null}
                <Text style={styles.dateText}>Saved {new Date(request.createdAt).toLocaleDateString()}</Text>

                <View style={styles.requestActions}>
                  {request.status !== 'active' ? (
                    <PrimaryButton title="Set Active" variant="outline" onPress={() => updateStatus(request.id, 'active')} style={styles.actionButton} />
                  ) : null}
                  {request.status !== 'answered' ? (
                    <PrimaryButton title="Answered" variant="gold" onPress={() => updateStatus(request.id, 'answered')} style={styles.actionButton} />
                  ) : null}
                  {request.status !== 'archived' ? (
                    <PrimaryButton title="Archive" variant="outline" onPress={() => updateStatus(request.id, 'archived')} style={styles.actionButton} />
                  ) : null}
                </View>
                </Card>
              </AnimatedEntrance>
            ))
          )}
        </>
      )}
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

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.activeChip]}>
      <Text style={[styles.chipText, active && styles.activeChipText]}>{label}</Text>
    </Pressable>
  );
}

function SummaryStat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.summaryStat}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
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
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: 'center'
  },
  activeTabButton: {
    backgroundColor: colors.primary
  },
  tabText: {
    color: colors.mutedText,
    fontWeight: '900',
    fontSize: 13
  },
  activeTabText: {
    color: '#FFFFFF'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    color: colors.text,
    fontSize: 15,
    marginBottom: 12,
    backgroundColor: '#FFFFFF'
  },
  chipRow: {
    gap: 8,
    paddingBottom: 12
  },
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border
  },
  activeChip: {
    backgroundColor: colors.softPurple,
    borderColor: colors.primary
  },
  chipText: {
    color: colors.mutedText,
    fontWeight: '800',
    fontSize: 13
  },
  activeChipText: {
    color: colors.primaryDark
  },
  resultText: {
    color: colors.mutedText,
    fontWeight: '800',
    marginBottom: 10
  },
  sectionHeader: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 12
  },
  prayerCard: {
    backgroundColor: colors.softGold
  },
  category: {
    color: colors.primary,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 5
  },
  reference: {
    color: colors.primaryDark,
    fontWeight: '800',
    marginTop: 5
  },
  scripture: {
    color: colors.text,
    fontStyle: 'italic',
    marginTop: 10,
    lineHeight: 23
  },
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    color: colors.text,
    fontSize: 15,
    marginBottom: 12,
    backgroundColor: '#FFFCF6'
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top'
  },
  empty: {
    color: colors.mutedText,
    fontWeight: '700',
    lineHeight: 22
  },
  requestStatus: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 12
  },
  answered: {
    backgroundColor: colors.softGreen
  },
  archived: {
    opacity: 0.72
  },
  dateText: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10
  },
  requestActions: {
    marginTop: 12,
    gap: 6
  },
  actionButton: {
    width: '100%'
  },
  summaryCard: {
    backgroundColor: colors.softPurple
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  summaryStat: {
    alignItems: 'center',
    flex: 1
  },
  summaryValue: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900'
  },
  summaryLabel: {
    color: colors.primaryDark,
    fontWeight: '800',
    fontSize: 12
  }
});
