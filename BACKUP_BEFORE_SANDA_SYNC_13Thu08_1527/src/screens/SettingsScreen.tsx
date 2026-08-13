import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { defaultSettings, getSettings, saveSettings } from '../storage/settingsStorage';
import { ReminderSettings } from '../types/settings';
import { colors } from '../theme/colors';
import { scheduleDailyWordReminder } from '../services/notificationService';
import { getTodayDevotion, buildSpokenGreeting } from '../services/devotionService';
import { speak } from '../services/speechService';

type TimeOption = {
  label: string;
  value: string;
  hour: number;
  minute: number;
};

const quickTimeOptions: TimeOption[] = [
  { label: 'Early Morning — 5:00 AM', value: '05:00', hour: 5, minute: 0 },
  { label: 'Morning — 6:00 AM', value: '06:00', hour: 6, minute: 0 },
  { label: 'Morning — 7:00 AM', value: '07:00', hour: 7, minute: 0 },
  { label: 'Morning — 8:00 AM', value: '08:00', hour: 8, minute: 0 },
  { label: 'Before School/Work — 8:30 AM', value: '08:30', hour: 8, minute: 30 },
  { label: 'Midday — 12:00 PM', value: '12:00', hour: 12, minute: 0 },
  { label: 'Afternoon — 3:00 PM', value: '15:00', hour: 15, minute: 0 },
  { label: 'After School/Work — 5:00 PM', value: '17:00', hour: 17, minute: 0 },
  { label: 'Evening — 7:00 PM', value: '19:00', hour: 19, minute: 0 },
  { label: 'Family Time — 8:00 PM', value: '20:00', hour: 20, minute: 0 },
  { label: 'Night — 9:00 PM', value: '21:00', hour: 21, minute: 0 },
  { label: 'Before Bed — 10:00 PM', value: '22:00', hour: 22, minute: 0 }
];

function formatDisplayTime(hour: number, minute: number) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${String(minute).padStart(2, '0')} ${suffix}`;
}

function formatValue(hour: number, minute: number) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState<ReminderSettings>(defaultSettings);
  const [time, setTime] = useState('07:00');
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const [customTimeOpen, setCustomTimeOpen] = useState(false);

  const selectedTimeLabel = useMemo(() => {
    const match = quickTimeOptions.find((option) => option.value === time);
    if (match) return match.label;

    const [hourText, minuteText] = time.split(':');
    const hour = Number(hourText);
    const minute = Number(minuteText);
    if (!Number.isNaN(hour) && !Number.isNaN(minute)) {
      return `Custom — ${formatDisplayTime(hour, minute)}`;
    }
    return 'Choose reminder time';
  }, [time]);

  useFocusEffect(
    useCallback(() => {
      getSettings().then((saved) => {
        setSettings(saved);
        setTime(formatValue(saved.hour, saved.minute));
      });
    }, [])
  );

  const saveReminder = async (selectedTime = time) => {
    const [hourText, minuteText] = selectedTime.split(':');
    const hour = Number(hourText);
    const minute = Number(minuteText);

    if (Number.isNaN(hour) || Number.isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      Alert.alert('Invalid Time', 'Please enter time as HH:MM, for example 07:30 or 20:00.');
      return;
    }

    const next = { ...settings, hour, minute, enabled: true };
    await saveSettings(next);
    setSettings(next);
    setTime(formatValue(hour, minute));
    const scheduled = await scheduleDailyWordReminder(hour, minute);
    Alert.alert(
      scheduled ? 'Reminder Set' : 'Permission Needed',
      scheduled ? `WORDUP reminder set for ${formatDisplayTime(hour, minute)}.` : 'Please allow notifications to set reminders.'
    );
  };

  const chooseQuickTime = async (option: TimeOption) => {
    setTimeMenuOpen(false);
    setTime(option.value);
    await saveReminder(option.value);
  };

  const updateSetting = async (patch: Partial<ReminderSettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    await saveSettings(next);
  };

  return (
    <Screen>
      <SectionTitle title="Settings" subtitle="Choose how WORDUP reminds and encourages you." />

      <Card>
        <Text style={styles.cardTitle}>Daily Reminder</Text>
        <Text style={styles.body}>Choose when you want WORDUP to remind you with Scripture, prayer, and growth.</Text>

        <Pressable onPress={() => setTimeMenuOpen(true)} style={styles.dropdownButton}>
          <View>
            <Text style={styles.dropdownLabel}>Reminder Time</Text>
            <Text style={styles.dropdownValue}>{selectedTimeLabel}</Text>
          </View>
          <Text style={styles.dropdownArrow}>⌄</Text>
        </Pressable>

        <PrimaryButton title="Choose from Drop-down" onPress={() => setTimeMenuOpen(true)} />
        <PrimaryButton title={customTimeOpen ? 'Hide Custom Time' : 'Use Custom Time'} variant="outline" onPress={() => setCustomTimeOpen(!customTimeOpen)} />

        {customTimeOpen ? (
          <View style={styles.customBox}>
            <Text style={styles.customHelp}>Enter time in 24-hour format, e.g. 07:30 or 20:00.</Text>
            <TextInput value={time} onChangeText={setTime} style={styles.input} placeholder="07:00" keyboardType="numbers-and-punctuation" />
            <PrimaryButton title="Save Custom Reminder" variant="gold" onPress={() => saveReminder()} />
          </View>
        ) : null}
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Spoken Greeting</Text>
        <View style={styles.row}>
          <Text style={styles.body}>Speak greeting and verse when opened from reminder</Text>
          <Switch
            value={settings.spokenGreetingEnabled}
            onValueChange={(value) => updateSetting({ spokenGreetingEnabled: value })}
            thumbColor={settings.spokenGreetingEnabled ? colors.primary : '#f4f3f4'}
          />
        </View>
        <PrimaryButton title="Test Spoken Greeting" variant="outline" onPress={() => speak(buildSpokenGreeting(getTodayDevotion()))} />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Mode</Text>
        <Text style={styles.body}>WORDUP can be used personally or as a family devotional guide.</Text>
        <View style={styles.modeRow}>
          <PrimaryButton title="Individual" variant={settings.appMode === 'individual' ? 'primary' : 'outline'} onPress={() => updateSetting({ appMode: 'individual' })} style={styles.modeButton} />
          <PrimaryButton title="Family" variant={settings.appMode === 'family' ? 'primary' : 'outline'} onPress={() => updateSetting({ appMode: 'family' })} style={styles.modeButton} />
        </View>
      </Card>

      <Card style={styles.aboutCard}>
        <View style={styles.aboutHeader}>
          <Image source={require('../../assets/icon_sword_heart_transparent.png')} style={styles.aboutLogo} resizeMode="contain" />
          <Text style={styles.aboutTitle}>WORDUP</Text>
          <Text style={styles.aboutTagline}>Daily Scripture. Prayer and Growth.</Text>
        </View>

        <Text style={styles.body}>WORDUP helps families, teens, young adults and individuals discover, develop and deploy their faith through Daily Scripture, Prayer and Growth.</Text>

        <View style={styles.logoMeaningBox}>
          <Text style={styles.logoMeaningTitle}>Inspired by Psalm 119:11</Text>
          <Text style={styles.logoMeaningVerse}>“Thy word have I hid in mine heart, that I might not sin against thee.”</Text>
          <Text style={styles.logoMeaningText}>The golden sword represents God’s Word, the sword of the Spirit. The blue heart represents a life growing in love with Jesus. Together, they remind us to hide God’s Word in our hearts.</Text>
        </View>

        <Text style={styles.developerCredit}>Developed by Bishop Dr. David Sanda for the glory of Jesus.</Text>
      </Card>

      <Modal visible={timeMenuOpen} transparent animationType="fade" onRequestClose={() => setTimeMenuOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setTimeMenuOpen(false)}>
          <Pressable style={styles.modalCard} onPress={() => null}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Choose Reminder Time</Text>
                <Text style={styles.modalSubtitle}>Pick the time that fits your rhythm.</Text>
              </View>
              <Pressable onPress={() => setTimeMenuOpen(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            <ScrollView style={styles.timeList} showsVerticalScrollIndicator={false}>
              {quickTimeOptions.map((option) => {
                const active = option.value === time;
                return (
                  <Pressable key={option.value} onPress={() => chooseQuickTime(option)} style={[styles.timeOption, active && styles.activeTimeOption]}>
                    <View>
                      <Text style={[styles.timeOptionLabel, active && styles.activeTimeOptionLabel]}>{option.label}</Text>
                      <Text style={[styles.timeOptionValue, active && styles.activeTimeOptionValue]}>{formatDisplayTime(option.hour, option.minute)}</Text>
                    </View>
                    {active ? <Text style={styles.checkmark}>✓</Text> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 8
  },
  body: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    flex: 1
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 15,
    backgroundColor: '#FFFCF6',
    marginTop: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdownLabel: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  dropdownValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 4
  },
  dropdownArrow: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900'
  },
  customBox: {
    backgroundColor: colors.softGold,
    borderRadius: 16,
    padding: 12,
    marginTop: 10
  },
  customHelp: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '700',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    backgroundColor: '#FFFFFF'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  modeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12
  },
  modeButton: {
    flex: 1
  },
  aboutCard: {
    backgroundColor: colors.softPurple
  },
  aboutHeader: {
    alignItems: 'center',
    marginBottom: 16
  },
  aboutLogo: {
    width: 118,
    height: 118,
    marginBottom: 4
  },
  aboutTitle: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 1
  },
  aboutTagline: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 2,
    textAlign: 'center'
  },
  logoMeaningBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.border
  },
  logoMeaningTitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6
  },
  logoMeaningVerse: {
    color: colors.primaryDark,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '800',
    fontStyle: 'italic',
    marginBottom: 8
  },
  logoMeaningText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700'
  },
  developerCredit: {
    color: colors.primaryDark,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '900',
    marginTop: 14,
    textAlign: 'center'
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
    maxHeight: '78%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14
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
  timeList: {
    marginBottom: 10
  },
  timeOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  activeTimeOption: {
    backgroundColor: colors.softPurple,
    borderColor: colors.primary
  },
  timeOptionLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900'
  },
  activeTimeOptionLabel: {
    color: colors.primaryDark
  },
  timeOptionValue: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3
  },
  activeTimeOptionValue: {
    color: colors.primary
  },
  checkmark: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '900'
  }
});
