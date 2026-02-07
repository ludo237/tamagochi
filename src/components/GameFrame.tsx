import React, { type ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const WEB_FRAME_WIDTH = 400;
const WEB_FRAME_HEIGHT = 650;

interface GameFrameProps {
  children: ReactNode;
}

export default function GameFrame({ children }: GameFrameProps) {
  const isWeb = Platform.OS === 'web';

  // Mobile: fill the screen, Web: centered frame
  if (!isWeb) {
    return (
      <View style={styles.mobileContainer}>
        {children}
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.frame}>
        <View style={styles.screen}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    backgroundColor: '#c4cfa3',
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  frame: {
    width: WEB_FRAME_WIDTH + 24,
    height: WEB_FRAME_HEIGHT + 24,
    backgroundColor: '#4a4a6a',
    borderRadius: 24,
    padding: 12,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  screen: {
    flex: 1,
    backgroundColor: '#c4cfa3',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
