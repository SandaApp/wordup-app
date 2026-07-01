import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';

export type EntranceVariant = 'fadeUp' | 'zoom' | 'float' | 'slideLeft' | 'slideRight' | 'pop';

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  fromY?: number;
  scaleFrom?: number;
  variant?: EntranceVariant;
  style?: ViewStyle | ViewStyle[];
};

export default function AnimatedEntrance({
  children,
  delay = 0,
  duration = 460,
  fromY = 16,
  scaleFrom = 0.98,
  variant = 'fadeUp',
  style
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(variant === 'float' ? 28 : fromY)).current;
  const translateX = useRef(new Animated.Value(variant === 'slideLeft' ? 26 : variant === 'slideRight' ? -26 : 0)).current;
  const scale = useRef(new Animated.Value(variant === 'zoom' || variant === 'pop' ? 0.86 : scaleFrom)).current;

  useEffect(() => {
    const baseAnimations = [
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ];

    if (variant === 'pop') {
      baseAnimations.push(
        Animated.spring(scale, {
          toValue: 1,
          delay,
          friction: 5,
          tension: 110,
          useNativeDriver: true
        })
      );
    } else {
      baseAnimations.push(
        Animated.spring(scale, {
          toValue: 1,
          delay,
          friction: 8,
          tension: 55,
          useNativeDriver: true
        })
      );
    }

    baseAnimations.push(
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        friction: variant === 'float' ? 10 : 8,
        tension: variant === 'float' ? 36 : 55,
        useNativeDriver: true
      })
    );

    baseAnimations.push(
      Animated.spring(translateX, {
        toValue: 0,
        delay,
        friction: 8,
        tension: 55,
        useNativeDriver: true
      })
    );

    Animated.parallel(baseAnimations).start();
  }, [delay, duration, fromY, opacity, scale, scaleFrom, translateX, translateY, variant]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateY }, { translateX }, { scale }]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
}
