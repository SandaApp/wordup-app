import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '900',
    marginBottom: 5
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18
  }
});
