import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTamagotchi } from '../hooks/useTamagotchi';
import GameFrame from '../components/GameFrame';
import Pet from '../components/Pet';
import StatsDisplay from '../components/StatsDisplay';
import ActionButtons from '../components/ActionButtons';
import ActivityButtons from '../components/ActivityButtons';
import type { Pet as PetType, Activity } from '../types';

interface CreatePetViewProps {
  onCreate: (name: string) => void;
}

function CreatePetView({ onCreate }: CreatePetViewProps) {
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name.trim());
    }
  };

  return (
    <View style={styles.createContainer}>
      <Text style={styles.title}>Create Your Pet</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet name"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        style={[styles.createButton, !name.trim() && styles.createButtonDisabled]}
        onPress={handleCreate}
        disabled={!name.trim()}
      >
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

interface GameContentProps {
  pet: PetType;
  feed: () => void;
  toggleSleep: () => void;
  isSleeping: boolean;
  isEating: boolean;
  happiness: number;
  performActivity: (activity: Activity) => void;
}

function GameContent({ pet, feed, toggleSleep, isSleeping, isEating, happiness, performActivity }: GameContentProps) {
  return (
    <View style={styles.gameContainer}>
      <View style={styles.statsRow}>
        <StatsDisplay hunger={pet.hunger} sleep={pet.sleep} happiness={happiness} birthDate={pet.birth_date} />
      </View>
      <View style={styles.petArea}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Pet hunger={pet.hunger} sleep={pet.sleep} isSleeping={isSleeping} isEating={isEating} />
      </View>
      <View style={styles.actionsRow}>
        <ActionButtons onFeed={feed} onToggleSleep={toggleSleep} isSleeping={isSleeping} />
      </View>
      <View style={styles.activitiesRow}>
        <ActivityButtons onPerformActivity={performActivity} isSleeping={isSleeping} hunger={pet.hunger} sleep={pet.sleep} />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { pet, loading, create, feed, toggleSleep, isSleeping, isEating, happiness, performActivity } = useTamagotchi();

  if (loading) {
    return (
      <GameFrame>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4a4a6a" />
        </View>
      </GameFrame>
    );
  }

  if (!pet) {
    return (
      <GameFrame>
        <CreatePetView onCreate={create} />
      </GameFrame>
    );
  }

  return (
    <GameFrame>
      <GameContent pet={pet} feed={feed} toggleSleep={toggleSleep} isSleeping={isSleeping} isEating={isEating} happiness={happiness} performActivity={performActivity} />
    </GameFrame>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    maxWidth: 250,
    height: 50,
    borderWidth: 2,
    borderColor: '#4a4a6a',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  createButton: {
    backgroundColor: '#4a4a6a',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#999',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  gameContainer: {
    flex: 1,
    padding: 12,
  },
  statsRow: {
    marginBottom: 12,
  },
  petArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  actionsRow: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  activitiesRow: {
    paddingBottom: 8,
    alignItems: 'center',
  },
});
