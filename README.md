# Tamagochi

A cross-platform virtual pet app built with React Native and Expo. Take care of your digital companion by feeding it, putting it to sleep, and keeping it entertained with activities.

Runs on **Android**, **iOS**, and **Web** from a single codebase.

## Features

- **Create & name** your pet
- **Feed** your pet to keep hunger at bay
- **Manage sleep** -- put your pet to bed or wake it up (it will auto-sleep when exhausted)
- **Activities** -- play, walk, or dance with your pet to boost happiness (each costs hunger and energy)
- **Live stats** -- hunger, sleep, happiness, and age are always visible
- **Stat decay** -- stats decrease over time, so you need to check in regularly
- **Visual feedback** -- pet changes color based on health (green/yellow/red), animates when eating or sleeping

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Expo SDK 54 |
| UI | React Native 0.81 + React 19 |
| Web | React Native Web |
| Language | TypeScript (strict) |
| Storage (mobile) | expo-sqlite |
| Storage (web) | localStorage |
| Package manager | Bun |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Bun](https://bun.sh/) (or npm/yarn)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For mobile: Android Studio or Xcode

### Install

```bash
bun install
```

### Run

```bash
# Web
bun web

# Android
bun android

# iOS
bun ios

# Dev client (all platforms)
bun start
```

## Project Structure

```
src/
  screens/
    HomeScreen.tsx          # Main game screen
  hooks/
    useTamagotchi.ts        # Barrel file (TS resolution)
    useTamagotchi.native.ts # Mobile hook (SQLite)
    useTamagotchi.web.ts    # Web hook (localStorage)
    useTamagotchiCore.ts    # Shared game logic
  components/
    GameFrame.tsx           # Platform-aware frame wrapper
    Pet.tsx                 # Animated pet visual
    StatsDisplay.tsx        # Hunger / sleep / happiness / age bars
    ActionButtons.tsx       # Feed & sleep controls
    ActivityButtons.tsx     # Play / walk / dance
  database/
    init.ts                 # SQLite schema & migrations
    tamagotchiService.ts    # SQLite queries
    createMobileStorage.ts  # Mobile storage adapter
    webStorage.ts           # Web storage adapter
  types.ts                  # Pet, Activity, Storage interfaces
  constants/
    activities.ts           # Activity definitions
  utils/
    calculateHappiness.ts   # Happiness formula
    ageCalculator.ts        # Age in days
```

### Platform resolution

The app uses Expo's file extension convention (`.native.ts` / `.web.ts`) so Metro automatically picks the right storage backend at build time. A base `.ts` barrel file exists for TypeScript to resolve imports.

## How it Works

Stats run on a **10-second tick**:

- **Hunger** decreases by 1 while awake
- **Sleep** decreases by 1 while awake, increases by 2 while sleeping
- **Activity bonus** decays by 2 while awake

**Happiness** is calculated from hunger, sleep, and recent activity:

```
happiness = (hunger + sleep) / 2 + (activity_bonus / 100) * 30
```

When sleep hits 0, the pet auto-sleeps. All stats are clamped to 0--100.

### Activities

| Activity | Happiness | Hunger cost | Sleep cost |
|----------|-----------|-------------|------------|
| Play     | +15       | -5          | -8         |
| Walk     | +10       | -3          | -5         |
| Dance    | +25       | -8          | -12        |

Activities are disabled when the pet is sleeping or lacks the required stats.
