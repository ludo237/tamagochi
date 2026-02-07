import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from './src/database/init';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      }
    >
      <SQLiteProvider databaseName="tamagotchi.db" onInit={migrateDbIfNeeded}>
        <HomeScreen />
        <StatusBar style="auto" />
      </SQLiteProvider>
    </Suspense>
  );
}
