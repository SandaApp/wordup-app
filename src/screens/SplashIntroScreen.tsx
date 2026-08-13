import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { APP_DISPLAY_NAME, APP_TAGLINE } from '../constants/brand';

export default function SplashIntroScreen({ onFinish }: { onFinish: () => void }) {
  const heartScale = useRef(new Animated.Value(0.72)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;
  const swordY = useRef(new Animated.Value(-260)).current;
  const swordOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.5)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const verseOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heartOpacity, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.spring(heartScale, {
          toValue: 1,
          friction: 7,
          tension: 70,
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        Animated.timing(swordOpacity, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true
        }),
        Animated.spring(swordY, {
          toValue: 0,
          friction: 7,
          tension: 55,
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        Animated.sequence([
          Animated.timing(glowOpacity, { toValue: 1, duration: 180, useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 0.18, duration: 520, useNativeDriver: true })
        ]),
        Animated.spring(glowScale, {
          toValue: 1.35,
          friction: 9,
          tension: 45,
          useNativeDriver: true
        }),
        Animated.sequence([
          Animated.timing(textOpacity, { toValue: 1, duration: 420, useNativeDriver: true }),
          Animated.timing(verseOpacity, { toValue: 1, duration: 420, useNativeDriver: true })
        ])
      ]),
      Animated.delay(900)
    ]).start(onFinish);
  }, [glowOpacity, glowScale, heartOpacity, heartScale, onFinish, swordOpacity, swordY, textOpacity, verseOpacity]);

  return (
    <View style={styles.container}>
      <View style={styles.symbolWrap}>
        <Animated.View style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]} />
        <Animated.Image source={require('../../assets/intro-heart.png')} style={[styles.heart, { opacity: heartOpacity, transform: [{ scale: heartScale }] }]} resizeMode="contain" />
        <Animated.Image source={require('../../assets/intro-sword.png')} style={[styles.sword, { opacity: swordOpacity, transform: [{ translateY: swordY }] }]} resizeMode="contain" />
      </View>

      <Animated.Text style={[styles.logo, { opacity: textOpacity }]}>{APP_DISPLAY_NAME}</Animated.Text>
      <Animated.Text style={[styles.tagline, { opacity: textOpacity }]}>{APP_TAGLINE}</Animated.Text>
      <Animated.Text style={[styles.verse, { opacity: verseOpacity }]}>“Thy word have I hid in mine heart...”</Animated.Text>
      <Animated.Text style={[styles.reference, { opacity: verseOpacity }]}>Psalm 119:11</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  symbolWrap: {
    width: 260,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  glow: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#F5A623'
  },
  heart: {
    position: 'absolute',
    width: 210,
    height: 210,
    bottom: 6
  },
  sword: {
    position: 'absolute',
    width: 150,
    height: 240,
    top: 0
  },
  logo: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.5,
    textAlign: 'center',
    paddingHorizontal: 12
  },
  tagline: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
    textAlign: 'center'
  },
  verse: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 22,
    fontStyle: 'italic'
  },
  reference: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 5
  }
});
