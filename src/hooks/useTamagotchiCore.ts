import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateHappiness } from '../utils/calculateHappiness';
import type { Pet, Activity, TamagotchiStorage } from '../types';

export function useTamagotchiCore(storage: TamagotchiStorage) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEating, setIsEating] = useState(false);
  const eatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const petRef = useRef<Pet | null>(null);

  // Keep ref in sync with state for use in interval callback
  useEffect(() => {
    petRef.current = pet;
  }, [pet]);

  const isSleeping = pet?.is_sleeping === 1;

  useEffect(() => {
    loadPet();
  }, []);

  // Stat decay/recovery timer - uses ref to avoid stale closures
  useEffect(() => {
    if (!pet) return;

    const interval = setInterval(async () => {
      const currentPet = petRef.current;
      if (!currentPet) return;

      const sleeping = currentPet.is_sleeping === 1;

      // Sleep: +2 when sleeping, -1 when awake
      const sleepDelta = sleeping ? 2 : -1;
      let newSleep = await Promise.resolve(storage.updateSleep(currentPet.id, currentPet.sleep + sleepDelta));

      // Auto-sleep when exhausted (sleep reaches 0)
      let newSleepingState = currentPet.is_sleeping;
      if (newSleep <= 0 && !sleeping) {
        newSleepingState = 1;
        await Promise.resolve(storage.updateSleepingState(currentPet.id, true));
      }

      // Hunger: -1 when awake, no change when sleeping
      let newHunger = currentPet.hunger;
      if (!sleeping) {
        newHunger = await Promise.resolve(storage.updateHunger(currentPet.id, currentPet.hunger - 1));
      }

      // Activity bonus: -2 when awake, no change when sleeping
      let newActivityBonus = currentPet.activity_bonus ?? 0;
      if (!sleeping && newActivityBonus > 0) {
        newActivityBonus = await Promise.resolve(storage.updateActivityBonus(currentPet.id, newActivityBonus - 2));
      }

      setPet((prev) => prev ? { ...prev, sleep: newSleep, hunger: newHunger, is_sleeping: newSleepingState, activity_bonus: newActivityBonus } : null);
    }, 10000);

    return () => clearInterval(interval);
  }, [storage, pet?.id]);

  async function loadPet() {
    setLoading(true);
    const existingPet = await Promise.resolve(storage.getPet());
    setPet(existingPet);
    setLoading(false);
  }

  const create = useCallback(async (name: string) => {
    const newPet = await Promise.resolve(storage.createPet(name));
    setPet(newPet);
    return newPet;
  }, [storage]);

  const feed = useCallback(async () => {
    if (!pet || isSleeping) return;
    const newHunger = await Promise.resolve(storage.updateHunger(pet.id, pet.hunger + 10));
    setPet((prev) => prev ? { ...prev, hunger: newHunger } : null);

    // Trigger eating animation
    if (eatingTimeoutRef.current) {
      clearTimeout(eatingTimeoutRef.current);
    }
    setIsEating(true);
    eatingTimeoutRef.current = setTimeout(() => {
      setIsEating(false);
    }, 800);
  }, [storage, pet, isSleeping]);

  const toggleSleep = useCallback(async () => {
    if (!pet) return;
    const newState = await Promise.resolve(storage.updateSleepingState(pet.id, !isSleeping));
    setPet((prev) => prev ? { ...prev, is_sleeping: newState } : null);
  }, [storage, pet, isSleeping]);

  const performActivity = useCallback(async (activity: Activity) => {
    if (!pet || isSleeping) return false;

    // Check if pet has enough stats
    if (pet.hunger < activity.hungerCost || pet.sleep < activity.sleepCost) {
      return false;
    }

    // Update stats
    const newHunger = await Promise.resolve(storage.updateHunger(pet.id, pet.hunger - activity.hungerCost));
    const newSleep = await Promise.resolve(storage.updateSleep(pet.id, pet.sleep - activity.sleepCost));
    const currentBonus = pet.activity_bonus ?? 0;
    const newBonus = await Promise.resolve(storage.updateActivityBonus(pet.id, currentBonus + activity.happinessBonus));

    setPet((prev) => prev ? { ...prev, hunger: newHunger, sleep: newSleep, activity_bonus: newBonus } : null);
    return true;
  }, [storage, pet, isSleeping]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (eatingTimeoutRef.current) {
        clearTimeout(eatingTimeoutRef.current);
      }
    };
  }, []);

  const happiness = calculateHappiness(pet?.hunger, pet?.sleep, pet?.activity_bonus);

  return { pet, loading, create, feed, toggleSleep, isSleeping, isEating, happiness, performActivity };
}
