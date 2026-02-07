import type { SQLiteDatabase } from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tamagotchi (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      birth_date TEXT NOT NULL,
      hunger INTEGER NOT NULL DEFAULT 50,
      sleep INTEGER NOT NULL DEFAULT 50,
      is_sleeping INTEGER NOT NULL DEFAULT 0,
      activity_bonus INTEGER NOT NULL DEFAULT 0,
      last_updated TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // Migration: Add is_sleeping column if it doesn't exist
  const tableInfo = await db.getAllAsync<{ name: string }>("PRAGMA table_info(tamagotchi)");
  const hasIsSleeping = tableInfo.some(col => col.name === 'is_sleeping');
  if (!hasIsSleeping) {
    await db.execAsync('ALTER TABLE tamagotchi ADD COLUMN is_sleeping INTEGER NOT NULL DEFAULT 0');
  }

  // Migration: Add activity_bonus column if it doesn't exist
  const hasActivityBonus = tableInfo.some(col => col.name === 'activity_bonus');
  if (!hasActivityBonus) {
    await db.execAsync('ALTER TABLE tamagotchi ADD COLUMN activity_bonus INTEGER NOT NULL DEFAULT 0');
  }
}
