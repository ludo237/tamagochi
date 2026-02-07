import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ACTIVITIES } from '../constants/activities';
import type { Activity } from '../types';

interface ActivityButtonsProps {
  onPerformActivity: (activity: Activity) => void;
  isSleeping: boolean;
  hunger: number;
  sleep: number;
}

export default function ActivityButtons({ onPerformActivity, isSleeping, hunger, sleep }: ActivityButtonsProps) {
  const [expanded, setExpanded] = useState(false);

  if (isSleeping) {
    return null;
  }

  const canPerform = (activity: Activity) => {
    return hunger >= activity.hungerCost && sleep >= activity.sleepCost;
  };

  const handleActivityPress = (activity: Activity) => {
    onPerformActivity(activity);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.toggleIcon}>{expanded ? '▼' : '▶'}</Text>
        <Text style={styles.toggleText}>Activities</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.activitiesRow}>
          {ACTIVITIES.map((activity) => {
            const disabled = !canPerform(activity);
            return (
              <TouchableOpacity
                key={activity.id}
                style={[styles.button, disabled && styles.buttonDisabled]}
                onPress={() => handleActivityPress(activity)}
                disabled={disabled}
              >
                <Text style={styles.buttonIcon}>{activity.icon}</Text>
                <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{activity.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toggleIcon: {
    fontSize: 12,
    color: '#4a4a6a',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a4a6a',
  },
  activitiesRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4a4a6a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonIcon: {
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#ccc',
  },
});
