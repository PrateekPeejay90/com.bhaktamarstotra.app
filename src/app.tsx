import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './screens/HomeScreen';
import { VerseListScreen } from './screens/VerseListScreen';
import { VerseDetailScreen } from './screens/VerseDetailScreen';
import { SamputSelectionScreen } from './screens/SamputSelectionScreen';
import { SamputReadingScreen } from './screens/SamputReadingScreen';
import { Verse } from './types';
import { dataService } from './services/dataService';
import { FontSizeProvider } from './contexts/FontSizeContext';

type Screen = 'home' | 'verseList' | 'verseDetail' | 'samputSelection' | 'samputReading';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [samputVerseNumber, setSamputVerseNumber] = useState<number | null>(null);

  const navigateToHome = () => {
    setCurrentScreen('home');
    setSelectedVerse(null);
  };

  const navigateToVerseList = () => {
    setCurrentScreen('verseList');
  };

  const navigateToVerseDetail = (verse: Verse) => {
    setSelectedVerse(verse);
    setCurrentScreen('verseDetail');
  };

  const navigateToSamputSelection = () => {
    setCurrentScreen('samputSelection');
  };

  const handleStartSamputt = (verseNumber: number) => {
    setSamputVerseNumber(verseNumber);
    setCurrentScreen('samputReading');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onStartReading={() => {
              // Navigate to first verse - load actual data
              const firstVerse = dataService.getVerseByNumber(1);
              if (firstVerse) {
                navigateToVerseDetail(firstVerse);
              }
            }}
            onBrowseVerses={navigateToVerseList}
            onSamputt={navigateToSamputSelection}
          />
        );
      case 'verseList':
        return (
          <VerseListScreen 
            onVerseSelect={navigateToVerseDetail}
            onBack={navigateToHome}
          />
        );
      case 'verseDetail':
        return selectedVerse ? (
          <VerseDetailScreen 
            verse={selectedVerse}
            onBack={() => setCurrentScreen('verseList')}
            onVerseChange={setSelectedVerse}
          />
        ) : null;
      case 'samputSelection':
        return (
          <SamputSelectionScreen
            onBack={navigateToHome}
            onStartSamputt={handleStartSamputt}
          />
        );
      case 'samputReading':
        return samputVerseNumber ? (
          <SamputReadingScreen
            samputVerseNumber={samputVerseNumber}
            onBack={navigateToHome}
          />
        ) : null;
      default:
        return (
          <HomeScreen 
            onStartReading={() => {}} 
            onBrowseVerses={navigateToVerseList} 
            onSamputt={navigateToSamputSelection}
          />
        );
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FontSizeProvider>
        <SafeAreaView style={styles.container}>
          {renderCurrentScreen()}
        </SafeAreaView>
      </FontSizeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
});
