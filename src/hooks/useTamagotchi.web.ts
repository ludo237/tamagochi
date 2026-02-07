import * as storage from '../database/webStorage';
import { useTamagotchiCore } from './useTamagotchiCore';

export function useTamagotchi() {
  return useTamagotchiCore(storage);
}
