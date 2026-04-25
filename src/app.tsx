import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { HomeScreen } from './screens/HomeScreen';
import { VerseListScreen } from './screens/VerseListScreen';
import { VerseDetailScreen } from './screens/VerseDetailScreen';
import { SamputSelectionScreen } from './screens/SamputSelectionScreen';
import { SamputReadingScreen } from './screens/SamputReadingScreen';
import { SearchScreen } from './screens/SearchScreen';
import { MenuDrawer } from './components/MenuDrawer';
import { Verse } from './types';
import { dataService } from './services/dataService';
import { FontSizeProvider } from './contexts/FontSizeContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

type Screen =
  | 'home'
  | 'verseList'
  | 'verseDetail'
  | 'samputSelection'
  | 'samputReading'
  | 'search';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [samputVerseNumber, setSamputVerseNumber] = useState<number | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const navigateToHome = () => {
    setCurrentScreen('home');
    setSelectedVerse(null);
    closeDrawer();
  };

  const navigateToVerseList = () => {
    setCurrentScreen('verseList');
    closeDrawer();
  };

  const navigateToVerseDetail = (verse: Verse) => {
    setSelectedVerse(verse);
    setCurrentScreen('verseDetail');
    closeDrawer();
  };

  const navigateToSamputSelection = () => {
    setCurrentScreen('samputSelection');
    closeDrawer();
  };

  const navigateToSearch = () => {
    setCurrentScreen('search');
    closeDrawer();
  };

  const handleStartSamputt = (verseNumber: number) => {
    setSamputVerseNumber(verseNumber);
    setCurrentScreen('samputReading');
    closeDrawer();
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onStartReading={() => {
              const firstVerse = dataService.getVerseByNumber(1);
              if (firstVerse) {
                navigateToVerseDetail(firstVerse);
              }
            }}
            onBrowseVerses={navigateToVerseList}
            onSamputt={navigateToSamputSelection}
            onSearch={navigateToSearch}
            onOpenDrawer={openDrawer}
          />
        );
      case 'verseList':
        return (
          <VerseListScreen
            onVerseSelect={navigateToVerseDetail}
            onBack={navigateToHome}
            onOpenDrawer={openDrawer}
          />
        );
      case 'verseDetail':
        return selectedVerse ? (
          <VerseDetailScreen
            verse={selectedVerse}
            onBack={() => setCurrentScreen('verseList')}
            onVerseChange={setSelectedVerse}
            onOpenDrawer={openDrawer}
          />
        ) : null;
      case 'samputSelection':
        return (
          <SamputSelectionScreen
            onBack={navigateToHome}
            onStartSamputt={handleStartSamputt}
            onOpenDrawer={openDrawer}
          />
        );
      case 'samputReading':
        return samputVerseNumber ? (
          <SamputReadingScreen
            samputVerseNumber={samputVerseNumber}
            onBack={navigateToHome}
            onOpenDrawer={openDrawer}
          />
        ) : null;
      case 'search':
        return (
          <SearchScreen
            onBack={navigateToHome}
            onVerseSelect={navigateToVerseDetail}
            onOpenDrawer={openDrawer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider>
        <LanguageProvider>
          <FontSizeProvider>
            <AppContent renderCurrentScreen={renderCurrentScreen} />
            <MenuDrawer
              visible={drawerVisible}
              activeScreen={currentScreen}
              onClose={closeDrawer}
              onNavigateHome={navigateToHome}
            />
          </FontSizeProvider>
        </LanguageProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const AppContent: React.FC<{
  renderCurrentScreen: () => React.ReactNode;
}> = ({ renderCurrentScreen }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {renderCurrentScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
