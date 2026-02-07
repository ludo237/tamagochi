import type { SQLiteDatabase } from 'expo-sqlite';
import type { TamagotchiStorage } from '../types';
import { getPet, createPet, updateHunger, updateSleep, updateSleepingState, updateActivityBonus } from './tamagotchiService';

export function createMobileStorage(db: SQLiteDatabase): TamagotchiStorage {
  return {
    getPet: () => getPet(db),
    createPet: (name) => createPet(db, name),
    updateHunger: (id, hunger) => updateHunger(db, id, hunger),
    updateSleep: (id, sleep) => updateSleep(db, id, sleep),
    updateSleepingState: (id, isSleeping) => updateSleepingState(db, id, isSleeping),
    updateActivityBonus: (id, bonus) => updateActivityBonus(db, id, bonus),
  };
}
