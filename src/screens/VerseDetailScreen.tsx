import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { dataService } from '../services/dataService';
import { Verse, Language } from '../types';
import { useFontSize } from '../contexts/FontSizeContext';
import { FontSizeControls } from '../components/FontSizeControls';

interface VerseDetailScreenProps {
  verse: Verse;
  onBack: () => void;
  onVerseChange?: (verse: Verse) => void;
}

export const VerseDetailScreen: React.FC<VerseDetailScreenProps> = ({ 
  verse, 
  onBack, 
  onVerseChange 
}) => {
  const [currentVerse, setCurrentVerse] = useState<Verse>(verse);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('sanskrit');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFontControls, setShowFontControls] = useState(false);
  
  // Use font size context
  const { fontSizes } = useFontSize();

  const totalVerses = dataService.getTotalVerses();
  const canGoPrevious = currentVerse.verse_number! > 1;
  const canGoNext = currentVerse.verse_number! < totalVerses;

  useEffect(() => {
    setCurrentVerse(verse);
  }, [verse]);

  const navigateToVerse = (direction: 'previous' | 'next') => {
    const currentVerseNumber = currentVerse.verse_number!;
    const targetVerseNumber = direction === 'previous' 
      ? currentVerseNumber - 1 
      : currentVerseNumber + 1;
    
    const targetVerse = dataService.getVerseByNumber(targetVerseNumber);
    if (targetVerse) {
      setCurrentVerse(targetVerse);
      onVerseChange?.(targetVerse);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark persistence
  };

  // Swipe gesture handler
  const onSwipeGesture = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    
    if (state === State.END) {
      const swipeThreshold = 50; // Minimum distance for swipe
      
      if (translationX > swipeThreshold && canGoPrevious) {
        // Swipe right - go to previous verse
        navigateToVerse('previous');
      } else if (translationX < -swipeThreshold && canGoNext) {
        // Swipe left - go to next verse
        navigateToVerse('next');
      }
    }
  };

  const getDisplayText = () => {
    switch (selectedLanguage) {
      case 'sanskrit':
        return currentVerse.content;
      case 'transliteration':
        return currentVerse.transliteration;
      case 'hindi':
        return currentVerse.hindi_meaning;
      case 'english':
        return currentVerse.english_meaning;
      default:
        return currentVerse.content;
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      lineHeight: undefined as number | undefined,
    };
    
    switch (selectedLanguage) {
      case 'sanskrit':
        return [
          styles.sanskritText, 
          { 
            fontSize: fontSizes.sanskrit,
            lineHeight: fontSizes.sanskrit * 1.5
          }
        ];
      case 'transliteration':
        return [
          styles.transliterationText, 
          { 
            fontSize: fontSizes.transliteration,
            lineHeight: fontSizes.transliteration * 1.5
          }
        ];
      case 'hindi':
        return [
          styles.hindiText, 
          { 
            fontSize: fontSizes.hindi,
            lineHeight: fontSizes.hindi * 1.5
          }
        ];
      case 'english':
        return [
          styles.englishText, 
          { 
            fontSize: fontSizes.english,
            lineHeight: fontSizes.english * 1.5
          }
        ];
      default:
        return [
          styles.sanskritText, 
          { 
            fontSize: fontSizes.sanskrit,
            lineHeight: fontSizes.sanskrit * 1.5
          }
        ];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.verseTitle}>Verse {currentVerse.verse_number}</Text>
          <Text style={styles.pageInfo}>Page {currentVerse.page_number}</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.fontSizeButton} 
            onPress={() => setShowFontControls(!showFontControls)}
          >
            <Text style={styles.fontSizeButtonText}>Aa</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bookmarkButton} onPress={toggleBookmark}>
            <Text style={styles.bookmarkText}>{isBookmarked ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Selector */}
      <View style={styles.languageSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(['sanskrit', 'transliteration', 'hindi', 'english'] as Language[]).map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.languageButton,
                selectedLanguage === lang && styles.activeLanguageButton
              ]}
              onPress={() => setSelectedLanguage(lang)}
            >
              <Text style={[
                styles.languageButtonText,
                selectedLanguage === lang && styles.activeLanguageButtonText
              ]}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Font Size Controls */}
      {showFontControls && (
        <View style={styles.fontControlsContainer}>
          <FontSizeControls style={styles.fontControls} />
        </View>
      )}

      {/* Verse Content */}
      <PanGestureHandler onGestureEvent={onSwipeGesture}>
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.verseContent}>
          {selectedLanguage === 'sanskrit' ? (
            // Handle Sanskrit text with line breaks
            <View>
              {getDisplayText().split('\n').map((line, index) => (
                <Text key={index} style={getTextStyle()}>
                  {line}
                </Text>
              ))}
            </View>
          ) : (
            // Regular text for other languages
            <Text style={getTextStyle()}>
              {getDisplayText()}
            </Text>
          )}
        </View>

        {/* Show all translations when in Sanskrit mode */}
        {selectedLanguage === 'sanskrit' && (
          <View style={styles.translationsContainer}>
            <View style={styles.translationSection}>
              <Text style={[styles.translationLabel, { fontSize: fontSizes.labels }]}>Transliteration:</Text>
              <View>
                {currentVerse.transliteration.split('\n').map((line, index) => (
                  <Text 
                    key={index} 
                    style={[
                      styles.transliterationText, 
                      { 
                        fontSize: fontSizes.transliteration,
                        lineHeight: fontSizes.transliteration * 1.5
                      }
                    ]}
                  >
                    {line}
                  </Text>
                ))}
              </View>
            </View>
            
            <View style={styles.translationSection}>
              <Text style={[styles.translationLabel, { fontSize: fontSizes.labels }]}>Hindi Meaning:</Text>
              <Text 
                style={[
                  styles.hindiText, 
                  { 
                    fontSize: fontSizes.hindi,
                    lineHeight: fontSizes.hindi * 1.5
                  }
                ]}
              >
                {currentVerse.hindi_meaning}
              </Text>
            </View>
            
            <View style={styles.translationSection}>
              <Text style={[styles.translationLabel, { fontSize: fontSizes.labels }]}>English Meaning:</Text>
              <Text 
                style={[
                  styles.englishText, 
                  { 
                    fontSize: fontSizes.english,
                    lineHeight: fontSizes.english * 1.5
                  }
                ]}
              >
                {currentVerse.english_meaning}
              </Text>
            </View>
          </View>
        )}
        </ScrollView>
      </PanGestureHandler>

      {/* Navigation Controls */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, !canGoPrevious && styles.disabledNavButton]}
          onPress={() => navigateToVerse('previous')}
          disabled={!canGoPrevious}
        >
          <Text style={[styles.navButtonText, !canGoPrevious && styles.disabledNavButtonText]}>
            ← Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentVerse.verse_number} of {totalVerses}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.navButton, !canGoNext && styles.disabledNavButton]}
          onPress={() => navigateToVerse('next')}
          disabled={!canGoNext}
        >
          <Text style={[styles.navButtonText, !canGoNext && styles.disabledNavButtonText]}>
            Next →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: '600',
  },
  headerCenter: {
    alignItems: 'center',
  },
  verseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  pageInfo: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fontSizeButton: {
    padding: 8,
    backgroundColor: '#F5DEB3',
    borderRadius: 16,
    minWidth: 32,
    alignItems: 'center',
  },
  fontSizeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  bookmarkButton: {
    padding: 8,
  },
  bookmarkText: {
    fontSize: 24,
    color: '#8B4513',
  },
  fontControlsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f6f0',
  },
  fontControls: {
    marginBottom: 0,
  },
  languageSelector: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeLanguageButton: {
    backgroundColor: '#8B4513',
  },
  languageButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeLanguageButtonText: {
    color: '#ffffff',
  },
  contentContainer: {
    flex: 1,
  },
  verseContent: {
    padding: 20,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sanskritText: {
    fontSize: 18,
    color: '#2F4F4F',
    lineHeight: 28,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  transliterationText: {
    fontSize: 16,
    color: '#696969',
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  hindiText: {
    fontSize: 16,
    color: '#444444',
    lineHeight: 24,
    textAlign: 'justify',
  },
  englishText: {
    fontSize: 16,
    color: '#444444',
    lineHeight: 24,
    textAlign: 'justify',
  },
  translationsContainer: {
    margin: 16,
    gap: 16,
  },
  translationSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  translationLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#8B4513',
    minWidth: 100,
    alignItems: 'center',
  },
  disabledNavButton: {
    backgroundColor: '#cccccc',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledNavButtonText: {
    color: '#999999',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
});
