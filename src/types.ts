export interface Pet {
  id: number;
  name: string;
  birth_date: string;
  hunger: number;
  sleep: number;
  is_sleeping: number;
  activity_bonus: number;
  last_updated: string;
  created_at: string;
}

export interface Activity {
  id: string;
  name: string;
  icon: string;
  happinessBonus: number;
  hungerCost: number;
  sleepCost: number;
}

export interface TamagotchiStorage {
  getPet(): Pet | null | Promise<Pet | null>;
  createPet(name: string): Pet | Promise<Pet>;
  updateHunger(id: number, hunger: number): number | Promise<number>;
  updateSleep(id: number, sleep: number): number | Promise<number>;
  updateSleepingState(id: number, isSleeping: boolean): number | Promise<number>;
  updateActivityBonus(id: number, bonus: number): number | Promise<number>;
}
