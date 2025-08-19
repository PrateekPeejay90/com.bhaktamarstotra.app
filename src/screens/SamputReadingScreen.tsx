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
import { Verse } from '../types';
import { useFontSize } from '../contexts/FontSizeContext';

interface SamputReadingScreenProps {
  samputVerseNumber: number;
  onBack: () => void;
}

interface SamputSequenceItem {
  verse: Verse;
  isSamputVerse: boolean;
  sequenceNumber: number;
}

export const SamputReadingScreen: React.FC<SamputReadingScreenProps> = ({
  samputVerseNumber,
  onBack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [samputSequence, setSamputSequence] = useState<SamputSequenceItem[]>([]);
  const [showFontControls, setShowFontControls] = useState(false);
  
  const { fontSizes } = useFontSize();
  const totalVerses = dataService.getTotalVerses();

  useEffect(() => {
    generateSamputSequence();
  }, [samputVerseNumber]);

  const generateSamputSequence = () => {
    const sequence: SamputSequenceItem[] = [];
    const samputVerse = dataService.getVerseByNumber(samputVerseNumber);
    
    if (!samputVerse) return;

    let sequenceNum = 1;
    
    // Generate the alternating pattern: Verse 1 → Samputt → Verse 2 → Samputt → ...
    for (let i = 1; i <= totalVerses; i++) {
      const regularVerse = dataService.getVerseByNumber(i);
      if (regularVerse) {
        // Add regular verse
        sequence.push({
          verse: regularVerse,
          isSamputVerse: false,
          sequenceNumber: sequenceNum++
        });
        
        // Add samputt verse after each regular verse (except after the last verse)
        if (i < totalVerses) {
          sequence.push({
            verse: samputVerse,
            isSamputVerse: true,
            sequenceNumber: sequenceNum++
          });
        }
      }
    }
    
    // Add final samputt verse at the end
    sequence.push({
      verse: samputVerse,
      isSamputVerse: true,
      sequenceNumber: sequenceNum++
    });

    setSamputSequence(sequence);
  };

  const currentItem = samputSequence[currentIndex];
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < samputSequence.length - 1;

  const navigateToIndex = (direction: 'previous' | 'next') => {
    if (direction === 'previous' && canGoPrevious) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && canGoNext) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Swipe gesture handler
  const onSwipeGesture = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    
    if (state === State.END) {
      const swipeThreshold = 50; // Minimum distance for swipe
      
      if (translationX > swipeThreshold && canGoPrevious) {
        // Swipe right - go to previous verse
        navigateToIndex('previous');
      } else if (translationX < -swipeThreshold && canGoNext) {
        // Swipe left - go to next verse
        navigateToIndex('next');
      }
    }
  };

  const getProgressText = () => {
    if (!currentItem) return '';
    return `${currentIndex + 1} of ${samputSequence.length}`;
  };

  const getVerseTypeLabel = () => {
    if (!currentItem) return '';
    return currentItem.isSamputVerse 
      ? `Samputt Verse ${samputVerseNumber}` 
      : `Verse ${currentItem.verse.verse_number}`;
  };

  if (!currentItem) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Samputt Reading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Samputt Reading</Text>
          <Text style={styles.headerSubtitle}>With Verse {samputVerseNumber}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.fontSizeButton} 
          onPress={() => setShowFontControls(!showFontControls)}
        >
          <Text style={styles.fontSizeButtonText}>Aa</Text>
        </TouchableOpacity>
      </View>

      {/* Font Size Controls */}
      {showFontControls && (
        <View style={styles.fontControlsContainer}>
          <Text style={styles.fontControlsNote}>
            Font size controls from previous implementation can be added here
          </Text>
        </View>
      )}

      {/* Verse Type Indicator */}
      <View style={[
        styles.verseTypeContainer,
        currentItem.isSamputVerse && styles.samputVerseTypeContainer
      ]}>
        <Text style={[
          styles.verseTypeText,
          currentItem.isSamputVerse && styles.samputVerseTypeText
        ]}>
          {currentItem.isSamputVerse ? '🕉️ ' : '📿 '}
          {getVerseTypeLabel()}
        </Text>
      </View>

      {/* Verse Content */}
      <PanGestureHandler onGestureEvent={onSwipeGesture}>
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={[
          styles.verseContent,
          currentItem.isSamputVerse && styles.samputVerseContent
        ]}>
          {/* Sanskrit Text */}
          <View style={styles.sanskritContainer}>
            {currentItem.verse.content.split('\n').map((line, index) => (
              <Text 
                key={index} 
                style={[
                  styles.sanskritText,
                  { 
                    fontSize: fontSizes.sanskrit,
                    lineHeight: fontSizes.sanskrit * 1.5
                  }
                ]}
              >
                {line}
              </Text>
            ))}
          </View>

          {/* Transliteration */}
          <View style={styles.transliterationContainer}>
            <Text style={[styles.sectionLabel, { fontSize: fontSizes.labels }]}>
              Transliteration:
            </Text>
            {currentItem.verse.transliteration.split('\n').map((line, index) => (
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

          {/* Hindi Meaning */}
          <View style={styles.meaningContainer}>
            <Text style={[styles.sectionLabel, { fontSize: fontSizes.labels }]}>
              Hindi Meaning:
            </Text>
            <Text 
              style={[
                styles.hindiText,
                { 
                  fontSize: fontSizes.hindi,
                  lineHeight: fontSizes.hindi * 1.5
                }
              ]}
            >
              {currentItem.verse.hindi_meaning}
            </Text>
          </View>

          {/* English Meaning */}
          <View style={styles.meaningContainer}>
            <Text style={[styles.sectionLabel, { fontSize: fontSizes.labels }]}>
              English Meaning:
            </Text>
            <Text 
              style={[
                styles.englishText,
                { 
                  fontSize: fontSizes.english,
                  lineHeight: fontSizes.english * 1.5
                }
              ]}
            >
              {currentItem.verse.english_meaning}
            </Text>
          </View>
        </View>
        </ScrollView>
      </PanGestureHandler>

      {/* Navigation Controls */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, !canGoPrevious && styles.disabledNavButton]}
          onPress={() => navigateToIndex('previous')}
          disabled={!canGoPrevious}
        >
          <Text style={[
            styles.navButtonText,
            !canGoPrevious && styles.disabledNavButtonText
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{getProgressText()}</Text>
          <Text style={styles.progressSubtext}>
            {currentItem.isSamputVerse ? 'Samputt' : 'Regular'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.navButton, !canGoNext && styles.disabledNavButton]}
          onPress={() => navigateToIndex('next')}
          disabled={!canGoNext}
        >
          <Text style={[
            styles.navButtonText,
            !canGoNext && styles.disabledNavButtonText
          ]}>
            Next
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#8B4513',
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
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
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
  fontControlsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f6f0',
  },
  fontControlsNote: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  verseTypeContainer: {
    backgroundColor: '#E6F3FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  samputVerseTypeContainer: {
    backgroundColor: '#FFF8DC',
  },
  verseTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E86AB',
    textAlign: 'center',
  },
  samputVerseTypeText: {
    color: '#8B4513',
  },
  contentContainer: {
    flex: 1,
  },
  verseContent: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  samputVerseContent: {
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
    backgroundColor: '#FFFEF7',
  },
  sanskritContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sanskritText: {
    color: '#2F4F4F',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 4,
  },
  transliterationContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionLabel: {
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  transliterationText: {
    color: '#696969',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 2,
  },
  meaningContainer: {
    padding: 20,
  },
  hindiText: {
    color: '#444444',
    textAlign: 'justify',
  },
  englishText: {
    color: '#444444',
    textAlign: 'justify',
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
  progressSubtext: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
});
