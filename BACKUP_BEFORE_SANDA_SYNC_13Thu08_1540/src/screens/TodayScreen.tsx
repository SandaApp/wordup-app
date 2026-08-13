import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { colors } from '../theme/colors';
import AnimatedEntrance from '../components/AnimatedEntrance';
import PulseView from '../components/PulseView';
import { getTodayDevotion, buildSpokenGreeting } from '../services/devotionService';
import { speak, stopSpeaking } from '../services/speechService';
import { markDevotionCompleted, getProgress, saveProgress } from '../storage/progressStorage';
import { useNavigation } from '@react-navigation/native';
import { getPrayerRequests } from '../storage/prayerStorage';
import { checkAndMarkNewAchievements } from '../services/achievementUnlockService';
import { AchievementWithStatus } from '../services/achievementService';
import { shareDevotion, shareDevotionSummary } from '../services/shareService';

export default function TodayScreen() {
  const navigation = useNavigation<any>();
  const devotion = getTodayDevotion();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completionOpen, setCompletionOpen] = useState(false);
  const [completionStreak, setCompletionStreak] = useState<number | null>(null);
  const [newBadges, setNewBadges] = useState<AchievementWithStatus[]>([]);

  const submitQuiz = async () => {
    const correct = devotion.quiz.reduce((total, question) => total + (selectedAnswers[question.id] === question.answerIndex ? 1 : 0), 0);
    const progress = await getProgress();
    progress.quizPoints += correct;
    await saveProgress(progress);
    const requests = await getPrayerRequests();
    const badges = await checkAndMarkNewAchievements(progress, requests);
    if (badges.length > 0) {
      setNewBadges(badges);
    }
    setQuizSubmitted(true);
    Alert.alert('Quiz Complete', `You scored ${correct}/${devotion.quiz.length}. Great job!${badges.length > 0 ? ' New badge unlocked!' : ''}`);
  };

  const completeDevotion = async () => {
    const updated = await markDevotionCompleted(devotion.id);
    const requests = await getPrayerRequests();
    const badges = await checkAndMarkNewAchievements(updated, requests);
    setNewBadges(badges);
    setCompletionStreak(updated.currentStreak);
    setCompletionOpen(true);
  };

  const closeCompletionAndGo = (screen?: string) => {
    setCompletionOpen(false);
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <Screen>
      <SectionTitle title="Today’s WordUp" subtitle="Read, listen, reflect, pray, and take one step of growth." />

      <Card style={styles.verseCard}>
        <Text style={styles.theme}>{devotion.theme}</Text>
        <Text style={styles.title}>{devotion.title}</Text>
        <Text style={styles.reference}>{devotion.reference}</Text>
        <Text style={styles.verse}>“{devotion.verse}”</Text>
        <PrimaryButton title="Speak Greeting + Verse" onPress={() => speak(buildSpokenGreeting(devotion))} />
        <PrimaryButton title="Share Today's Verse" variant="gold" onPress={() => shareDevotionSummary(devotion)} />
        <PrimaryButton title="Stop Voice" variant="outline" onPress={stopSpeaking} />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Devotion</Text>
        <Text style={styles.body}>{devotion.devotion}</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Reflect</Text>
        <Text style={styles.prompt}>{devotion.reflectionQuestion}</Text>
        <Text style={styles.familyTitle}>For family discussion</Text>
        <Text style={styles.prompt}>{devotion.familyQuestion}</Text>
      </Card>

      <Card style={styles.prayerCard}>
        <Text style={styles.cardTitle}>Prayer</Text>
        <Text style={styles.body}>{devotion.prayer}</Text>
        <PrimaryButton title="Pray Aloud" variant="secondary" onPress={() => speak(devotion.prayer)} />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Today’s Challenge</Text>
        <Text style={styles.body}>{devotion.challenge}</Text>
        <PrimaryButton title="Share Full Devotion" variant="outline" onPress={() => shareDevotion(devotion)} />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Quick Quiz</Text>
        {devotion.quiz.map((question, index) => (
          <View key={question.id} style={styles.questionBlock}>
            <Text style={styles.question}>{index + 1}. {question.question}</Text>
            {question.options.map((option, optionIndex) => {
              const selected = selectedAnswers[question.id] === optionIndex;
              const correct = quizSubmitted && optionIndex === question.answerIndex;
              const wrong = quizSubmitted && selected && optionIndex !== question.answerIndex;
              return (
                <PrimaryButton
                  key={option}
                  title={option}
                  variant={correct ? 'gold' : selected ? 'secondary' : wrong ? 'outline' : 'outline'}
                  onPress={() => !quizSubmitted && setSelectedAnswers({ ...selectedAnswers, [question.id]: optionIndex })}
                />
              );
            })}
            {quizSubmitted ? <Text style={styles.explanation}>{question.explanation}</Text> : null}
          </View>
        ))}
        <PrimaryButton title="Submit Quiz" onPress={submitQuiz} />
      </Card>

      <PrimaryButton title="Mark Today Complete" variant="gold" onPress={completeDevotion} />


      <Modal visible={completionOpen} transparent animationType="fade" onRequestClose={() => setCompletionOpen(false)}>
        <View style={styles.modalOverlay}>
          <AnimatedEntrance style={styles.completionCard} fromY={0} scaleFrom={0.86}>
            <PulseView>
              <Text style={styles.celebrationEmoji}>🎉</Text>
            </PulseView>
            <Text style={styles.completionTitle}>WordUp Complete</Text>
            <Text style={styles.completionSubtitle}>You spent time in Scripture, prayer, and growth today.</Text>

            <View style={styles.rewardRow}>
              <View style={styles.rewardPill}>
                <Text style={styles.rewardNumber}>{completionStreak ?? 0}</Text>
                <Text style={styles.rewardLabel}>Day Streak</Text>
              </View>
              <View style={styles.rewardPill}>
                <Text style={styles.rewardNumber}>+1</Text>
                <Text style={styles.rewardLabel}>Devotion</Text>
              </View>
            </View>

            {newBadges.length > 0 ? (
              <View style={styles.badgeUnlockBox}>
                <Text style={styles.badgeUnlockKicker}>New Badge Unlocked</Text>
                {newBadges.slice(0, 3).map((badge) => (
                  <AnimatedEntrance key={badge.id} style={styles.badgeUnlockRow} fromY={10} scaleFrom={0.94}>
                    <View style={[styles.badgeUnlockIcon, { backgroundColor: badge.color }]}> 
                      <Text style={styles.badgeUnlockEmoji}>{badge.emoji}</Text>
                    </View>
                    <View style={styles.badgeUnlockTextWrap}>
                      <Text style={styles.badgeUnlockTitle}>{badge.title}</Text>
                      <Text style={styles.badgeUnlockDescription}>{badge.description}</Text>
                    </View>
                  </AnimatedEntrance>
                ))}
                {newBadges.length > 3 ? <Text style={styles.moreBadgesText}>+{newBadges.length - 3} more badge(s)</Text> : null}
              </View>
            ) : null}

            <View style={styles.growthBox}>
              <Text style={styles.growthTitle}>Today’s Growth Step</Text>
              <Text style={styles.growthText}>{devotion.challenge}</Text>
            </View>

            <PrimaryButton title="Pray Now" variant="secondary" onPress={() => closeCompletionAndGo('Prayer')} />
            <PrimaryButton title="Practice Memory Verse" variant="gold" onPress={() => closeCompletionAndGo('Memory')} />
            <PrimaryButton title="Back to Today" variant="outline" onPress={() => closeCompletionAndGo()} />
          </AnimatedEntrance>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  verseCard: {
    backgroundColor: colors.softPurple
  },
  theme: {
    color: colors.primary,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 6
  },
  reference: {
    color: colors.primaryDark,
    fontWeight: '800',
    marginTop: 6
  },
  verse: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 27,
    marginVertical: 14
  },
  cardTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 8
  },
  body: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 25
  },
  prompt: {
    color: colors.primaryDark,
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '700'
  },
  familyTitle: {
    color: colors.mutedText,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 5
  },
  prayerCard: {
    backgroundColor: colors.softGold
  },
  questionBlock: {
    marginBottom: 18
  },
  question: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 7
  },
  explanation: {
    color: colors.success,
    fontWeight: '700',
    marginTop: 5,
    lineHeight: 21
  }
,
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(33, 26, 50, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22
  },
  completionCard: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6
  },
  celebrationEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8
  },
  completionTitle: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center'
  },
  completionSubtitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
    fontWeight: '700'
  },
  rewardRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16
  },
  rewardPill: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center'
  },
  rewardNumber: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900'
  },
  rewardLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 2
  },
  growthBox: {
    backgroundColor: colors.softGold,
    borderRadius: 18,
    padding: 15,
    marginBottom: 14
  },
  growthTitle: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 6
  },
  growthText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700'
  },
  badgeUnlockBox: {
    backgroundColor: colors.softPurple,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.primary
  },
  badgeUnlockKicker: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 10,
    textAlign: 'center'
  },
  badgeUnlockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  badgeUnlockIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF'
  },
  badgeUnlockEmoji: {
    fontSize: 24
  },
  badgeUnlockTextWrap: {
    flex: 1
  },
  badgeUnlockTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900'
  },
  badgeUnlockDescription: {
    color: colors.mutedText,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    marginTop: 2
  },
  moreBadgesText: {
    color: colors.primaryDark,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 2
  }

});
