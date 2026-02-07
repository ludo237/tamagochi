import type { SQLiteDatabase } from 'expo-sqlite';
import type { Pet } from '../types';

export async function getPet(db: SQLiteDatabase): Promise<Pet | null> {
  const result = await db.getFirstAsync<Pet>('SELECT * FROM tamagotchi LIMIT 1');
  return result;
}

export async function createPet(db: SQLiteDatabase, name: string): Promise<Pet> {
  const now = new Date().toISOString();
  const result = await db.runAsync(
    'INSERT INTO tamagotchi (name, birth_date, hunger, sleep, is_sleeping, activity_bonus, last_updated, created_at) VALUES (?, ?, 50, 50, 0, 0, ?, ?)',
    [name, now, now, now]
  );
  return {
    id: result.lastInsertRowId,
    name,
    birth_date: now,
    hunger: 50,
    sleep: 50,
    is_sleeping: 0,
    activity_bonus: 0,
    last_updated: now,
    created_at: now,
  };
}

export async function updateHunger(db: SQLiteDatabase, id: number, hunger: number): Promise<number> {
  const clampedHunger = Math.max(0, Math.min(100, hunger));
  const now = new Date().toISOString();
  await db.runAsync(
    'UPDATE tamagotchi SET hunger = ?, last_updated = ? WHERE id = ?',
    [clampedHunger, now, id]
  );
  return clampedHunger;
}

export async function updateSleep(db: SQLiteDatabase, id: number, sleep: number): Promise<number> {
  const clampedSleep = Math.max(0, Math.min(100, sleep));
  const now = new Date().toISOString();
  await db.runAsync(
    'UPDATE tamagotchi SET sleep = ?, last_updated = ? WHERE id = ?',
    [clampedSleep, now, id]
  );
  return clampedSleep;
}

export async function updateSleepingState(db: SQLiteDatabase, id: number, isSleeping: boolean): Promise<number> {
  const now = new Date().toISOString();
  await db.runAsync(
    'UPDATE tamagotchi SET is_sleeping = ?, last_updated = ? WHERE id = ?',
    [isSleeping ? 1 : 0, now, id]
  );
  return isSleeping ? 1 : 0;
}

export async function updateActivityBonus(db: SQLiteDatabase, id: number, bonus: number): Promise<number> {
  const clampedBonus = Math.max(0, Math.min(100, bonus));
  const now = new Date().toISOString();
  await db.runAsync(
    'UPDATE tamagotchi SET activity_bonus = ?, last_updated = ? WHERE id = ?',
    [clampedBonus, now, id]
  );
  return clampedBonus;
}
