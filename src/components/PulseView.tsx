import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  active?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export default function PulseView({ children, active = true, style }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 700,
          useNativeDriver: true
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true
        })
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [active, scale]);

  return <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>;
}
