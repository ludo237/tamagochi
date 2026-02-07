import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ActionButtonsProps {
  onFeed: () => void;
  onToggleSleep: () => void;
  isSleeping: boolean;
}

export default function ActionButtons({ onFeed, onToggleSleep, isSleeping }: ActionButtonsProps) {
  if (isSleeping) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onToggleSleep}>
          <Text style={styles.buttonIcon}>☀️</Text>
          <Text style={styles.buttonText}>Wake Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onFeed}>
        <Text style={styles.buttonIcon}>🍖</Text>
        <Text style={styles.buttonText}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onToggleSleep}>
        <Text style={styles.buttonIcon}>💤</Text>
        <Text style={styles.buttonText}>Sleep</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    backgroundColor: '#4a4a6a',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonIcon: {
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
