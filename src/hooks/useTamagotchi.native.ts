import { useSQLiteContext } from 'expo-sqlite';
import { useMemo } from 'react';
import { createMobileStorage } from '../database/createMobileStorage';
import { useTamagotchiCore } from './useTamagotchiCore';

export function useTamagotchi() {
  const db = useSQLiteContext();
  const storage = useMemo(() => createMobileStorage(db), [db]);
  return useTamagotchiCore(storage);
}
