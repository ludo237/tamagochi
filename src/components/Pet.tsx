import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface PetProps {
  hunger: number;
  sleep: number;
  isSleeping: boolean;
  isEating: boolean;
}

function getHealthColor(hunger: number, sleep: number): string {
  const avg = (hunger + sleep) / 2;
  if (avg > 60) return '#4CAF50'; // green
  if (avg >= 30) return '#FFC107'; // yellow
  return '#F44336'; // red
}

export default function Pet({ hunger, sleep, isSleeping, isEating }: PetProps) {
  const color = getHealthColor(hunger, sleep);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Unified animation effect for all states
  useEffect(() => {
    // Reset values
    scaleAnim.setValue(1);
    bounceAnim.setValue(0);

    let animation: Animated.CompositeAnimation;

    if (isEating) {
      // Bouncy eating animation
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
        ])
      );
    } else {
      // Breathing animation (slower/deeper when sleeping)
      const toValue = isSleeping ? 1.08 : 1.05;
      const duration = isSleeping ? 1500 : 1000;
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue, duration, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration, useNativeDriver: true }),
        ])
      );
    }

    animation.start();
    return () => animation.stop();
  }, [isSleeping, isEating]);

  return (
    <Animated.View
      style={[
        styles.pet,
        {
          backgroundColor: color,
          transform: [{ scale: scaleAnim }, { translateY: bounceAnim }],
        },
        isSleeping && styles.petSleeping,
      ]}
    >
      <View style={styles.eyesContainer}>
        {isSleeping ? (
          <>
            <View style={styles.closedEye} />
            <View style={styles.closedEye} />
          </>
        ) : (
          <>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pet: {
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  petSleeping: {
    opacity: 0.7,
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  eye: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  closedEye: {
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
});
