import type { Activity } from '../types';

export const ACTIVITIES: Activity[] = [
  { id: 'play', name: 'Play', icon: '🎾', happinessBonus: 15, hungerCost: 5, sleepCost: 8 },
  { id: 'walk', name: 'Walk', icon: '🚶', happinessBonus: 10, hungerCost: 3, sleepCost: 5 },
  { id: 'dance', name: 'Dance', icon: '💃', happinessBonus: 25, hungerCost: 8, sleepCost: 12 },
];
