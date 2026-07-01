import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedEntrance from './AnimatedEntrance';
import PulseView from './PulseView';
import { AchievementWithStatus } from '../services/achievementService';
import { colors } from '../theme/colors';

export default function AchievementMedal({ achievement }: { achievement: AchievementWithStatus }) {
  const unlocked = achievement.unlocked;

  return (
    <AnimatedEntrance style={[styles.wrap, !unlocked && styles.lockedWrap]} fromY={20} scaleFrom={0.92}>
      <View style={styles.ribbonRow}>
        <View style={[styles.ribbon, { backgroundColor: unlocked ? achievement.color : '#C9C2D6' }, styles.ribbonLeft]} />
        <View style={[styles.ribbon, { backgroundColor: unlocked ? achievement.accent : '#E2DDEA' }, styles.ribbonRight]} />
      </View>

      <PulseView active={unlocked} style={[styles.medalOuter, { backgroundColor: unlocked ? achievement.accent : '#D8D2E2' }]}>
        <View style={[styles.medalInner, { backgroundColor: unlocked ? achievement.color : '#AFA8BC' }]}>
          <Text style={styles.emoji}>{unlocked ? achievement.emoji : '🔒'}</Text>
        </View>
      </PulseView>

      <Text style={[styles.title, !unlocked && styles.lockedText]}>{achievement.title}</Text>
      <Text style={[styles.description, !unlocked && styles.lockedText]}>{unlocked ? achievement.description : achievement.requirement}</Text>
      <View style={[styles.statusPill, { backgroundColor: unlocked ? colors.softGreen : '#EEEAF4' }]}>
        <Text style={[styles.statusText, { color: unlocked ? colors.success : colors.mutedText }]}>{unlocked ? 'Unlocked' : 'Locked'}</Text>
      </View>
    </AnimatedEntrance>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 210,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  lockedWrap: {
    opacity: 0.75
  },
  ribbonRow: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    height: 58
  },
  ribbon: {
    width: 28,
    height: 70
  },
  ribbonLeft: {
    transform: [{ rotate: '-12deg' }],
    marginRight: -2
  },
  ribbonRight: {
    transform: [{ rotate: '12deg' }],
    marginLeft: -2
  },
  medalOuter: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 34,
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  medalInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)'
  },
  emoji: {
    fontSize: 29
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10
  },
  description: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 5,
    minHeight: 36
  },
  lockedText: {
    color: colors.mutedText
  },
  statusPill: {
    marginTop: 9,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999
  },
  statusText: {
    fontSize: 11,
    fontWeight: '900'
  }
});
