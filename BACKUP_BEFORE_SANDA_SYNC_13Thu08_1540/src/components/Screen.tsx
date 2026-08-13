import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

export default function Screen({ children, scroll = true, style }: { children: React.ReactNode; scroll?: boolean; style?: ViewStyle }) {
  if (!scroll) {
    return (
      <SafeAreaView style={[styles.safe, style]}>
        <View style={styles.nonScrollContent}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, style]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const androidTopPadding = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 26 : 14;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 20,
    paddingTop: 20 + androidTopPadding,
    paddingBottom: 40
  },
  nonScrollContent: {
    flex: 1,
    paddingTop: androidTopPadding
  }
});
