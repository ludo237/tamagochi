import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateAge } from '../utils/ageCalculator';

interface StatItemProps {
  icon: string;
  value: number;
}

function StatItem({ icon, value }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

interface StatsDisplayProps {
  hunger: number;
  sleep: number;
  happiness: number;
  birthDate: string;
}

export default function StatsDisplay({ hunger, sleep, happiness, birthDate }: StatsDisplayProps) {
  const age = calculateAge(birthDate);

  return (
    <View style={styles.container}>
      <StatItem icon="🍖" value={hunger} />
      <StatItem icon="💤" value={sleep} />
      <StatItem icon="😊" value={happiness} />
      <StatItem icon="📅" value={age} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 18,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
