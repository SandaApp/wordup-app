import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
};

export default function Screen({ children, scroll = true, style }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Math.max(insets.top, Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0) + 12;
  // Extra room above Android nav buttons + app tab bar so last buttons stay tappable
  const bottomPad = Math.max(insets.bottom, 12) + 88;

  if (!scroll) {
    return (
      <View style={[styles.safe, style, { paddingTop: topPad, paddingBottom: Math.max(insets.bottom, 8) }]}>
        <View style={styles.nonScrollContent}>{children}</View>
      </View>
    );
  }

  return (
    <View style={[styles.safe, style]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: topPad + 8, paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingHorizontal: 20
  },
  nonScrollContent: {
    flex: 1
  }
});
