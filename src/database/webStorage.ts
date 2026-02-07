import type { Pet } from '../types';

const STORAGE_KEY = 'tamagotchi_pet';

export function getPet(): Pet | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  const pet: Pet = JSON.parse(data);
  // Handle existing pets that don't have activity_bonus
  if (pet.activity_bonus === undefined) {
    pet.activity_bonus = 0;
  }
  return pet;
}

export function createPet(name: string): Pet {
  const now = new Date().toISOString();
  const pet: Pet = {
    id: 1,
    name,
    birth_date: now,
    hunger: 50,
    sleep: 50,
    is_sleeping: 0,
    activity_bonus: 0,
    last_updated: now,
    created_at: now,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
  return pet;
}

export function updateHunger(id: number, hunger: number): number {
  const pet = getPet();
  if (!pet) return hunger;
  const clampedHunger = Math.max(0, Math.min(100, hunger));
  pet.hunger = clampedHunger;
  pet.last_updated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
  return clampedHunger;
}

export function updateSleep(id: number, sleep: number): number {
  const pet = getPet();
  if (!pet) return sleep;
  const clampedSleep = Math.max(0, Math.min(100, sleep));
  pet.sleep = clampedSleep;
  pet.last_updated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
  return clampedSleep;
}

export function updateSleepingState(id: number, isSleeping: boolean): number {
  const pet = getPet();
  if (!pet) return isSleeping ? 1 : 0;
  pet.is_sleeping = isSleeping ? 1 : 0;
  pet.last_updated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
  return pet.is_sleeping;
}

export function updateActivityBonus(id: number, bonus: number): number {
  const pet = getPet();
  if (!pet) return bonus;
  const clampedBonus = Math.max(0, Math.min(100, bonus));
  pet.activity_bonus = clampedBonus;
  pet.last_updated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
  return clampedBonus;
}
