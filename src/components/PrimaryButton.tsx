import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  style?: ViewStyle;
};

export default function PrimaryButton({ title, onPress, variant = 'primary', style }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}>
      <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.primaryDark
  },
  gold: {
    backgroundColor: colors.accent
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }]
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15
  },
  outlineText: {
    color: colors.primary
  }
});
