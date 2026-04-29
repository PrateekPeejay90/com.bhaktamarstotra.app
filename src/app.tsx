import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from './screens/HomeScreen';
import { VerseListScreen } from './screens/VerseListScreen';
import { VerseDetailScreen } from './screens/VerseDetailScreen';
import { SamputSelectionScreen } from './screens/SamputSelectionScreen';
import { SamputReadingScreen } from './screens/SamputReadingScreen';
import { SearchScreen } from './screens/SearchScreen';
import { HistoryScreen } from './screens/HistoryScreen';
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
  | 'search'
  | 'history';

type NonHistoryScreen = Exclude<Screen, 'history'>;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [samputVerseNumber, setSamputVerseNumber] = useState<number | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [historyBackScreen, setHistoryBackScreen] = useState<NonHistoryScreen>('home');

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

  const navigateToHistory = () => {
    if (currentScreen !== 'history') {
      setHistoryBackScreen(currentScreen);
    }

    setCurrentScreen('history');
    closeDrawer();
  };

  const navigateBackFromHistory = () => {
    setCurrentScreen(historyBackScreen);
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
            onHistory={navigateToHistory}
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
      case 'history':
        return (
          <HistoryScreen
            onBack={navigateBackFromHistory}
            onOpenDrawer={openDrawer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <FontSizeProvider>
              <AppContent renderCurrentScreen={renderCurrentScreen} />
              <MenuDrawer
                visible={drawerVisible}
                activeScreen={currentScreen}
                onClose={closeDrawer}
                onNavigateHome={navigateToHome}
                onNavigateHistory={navigateToHistory}
              />
            </FontSizeProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const AppContent: React.FC<{
  renderCurrentScreen: () => React.ReactNode;
}> = ({ renderCurrentScreen }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: Platform.OS === 'android' ? insets.top : 0,
          paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {renderCurrentScreen()}
    </View>
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
