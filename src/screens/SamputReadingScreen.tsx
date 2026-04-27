import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { List } from 'phosphor-react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { dataService } from '../services/dataService';
import { Verse } from '../types';
import { useFontSize } from '../contexts/FontSizeContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BackIconButton } from '../components/BackIconButton';

interface SamputReadingScreenProps {
  samputVerseNumber: number;
  onBack: () => void;
  onOpenDrawer: () => void;
}

interface SamputSequenceItem {
  verse: Verse;
  isSamputVerse: boolean;
  sequenceNumber: number;
}

export const SamputReadingScreen: React.FC<SamputReadingScreenProps> = ({
  samputVerseNumber,
  onBack,
  onOpenDrawer
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [samputSequence, setSamputSequence] = useState<SamputSequenceItem[]>([]);
  
  const { fontSizes, scaleFontSize } = useFontSize();
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

  const getVerseTypeLabel = () => {
    if (!currentItem) return '';
    return currentItem.isSamputVerse 
      ? t.samputt.title 
      : `${t.verseDetail.verse} ${currentItem.verse.verse_number}`;
  };

  if (samputSequence.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text, fontSize: scaleFontSize(18) }]}>{t.common.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <BackIconButton onPress={onBack} />
        
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.spiritual, fontSize: scaleFontSize(18) }]}>{t.samputt.title}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary, fontSize: scaleFontSize(12) }]}>{t.samputt.with} {samputVerseNumber}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={onOpenDrawer}
        >
          <List size={20} color={colors.spiritual} weight="bold" />
        </TouchableOpacity>
      </View>

      {/* Verse Type Indicator */}
      <View style={[
        styles.verseTypeContainer,
        { backgroundColor: currentItem.isSamputVerse ? colors.accent : colors.surface, borderBottomColor: colors.border },
        currentItem.isSamputVerse && styles.samputVerseTypeContainer
      ]}>
        <Text style={[
          styles.verseTypeText,
          { color: currentItem.isSamputVerse ? colors.spiritual : colors.text, fontSize: scaleFontSize(16) },
          currentItem.isSamputVerse && styles.samputVerseTypeText
        ]}>
          {currentItem.isSamputVerse ? t.samputt.title : `${t.verseDetail.verse} ${currentItem.verse.verse_number}`}
        </Text>
      </View>

      {/* Verse Content */}
      <View style={styles.contentArea}>
        <PanGestureHandler onGestureEvent={onSwipeGesture}>
          <ScrollView
            style={[styles.contentContainer, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.contentScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.verseContent,
                { backgroundColor: colors.surface },
                currentItem.isSamputVerse && { borderLeftColor: colors.spiritual, backgroundColor: colors.accent },
              ]}
            >
              <View style={[styles.sanskritContainer, { borderBottomColor: colors.border }]}>
                {currentItem.verse.content.split('\n').map((line, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.sanskritText,
                      {
                        fontSize: fontSizes.sanskrit,
                        lineHeight: fontSizes.sanskrit * 1.5,
                        color: colors.text,
                      },
                    ]}
                  >
                    {line}
                  </Text>
                ))}
              </View>

              <View style={[styles.transliterationContainer, { borderBottomColor: colors.border }]}>
                <Text style={[styles.sectionLabel, { fontSize: fontSizes.labels, color: colors.spiritual }]}>
                  {t.verseDetail.transliteration}:
                </Text>
                {currentItem.verse.transliteration.split('\n').map((line, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.transliterationText,
                      {
                        fontSize: fontSizes.transliteration,
                        lineHeight: fontSizes.transliteration * 1.5,
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {line}
                  </Text>
                ))}
              </View>

              <View style={styles.meaningContainer}>
                <Text style={[styles.sectionLabel, { fontSize: fontSizes.labels, color: colors.spiritual }]}>
                  Hindi Meaning:
                </Text>
                <Text
                  style={[
                    styles.hindiText,
                    {
                      fontSize: fontSizes.hindi,
                      lineHeight: fontSizes.hindi * 1.5,
                      color: colors.text,
                    },
                  ]}
                >
                  {currentItem.verse.hindi_meaning}
                </Text>
              </View>

              <View style={styles.meaningContainer}>
                <Text style={[styles.sectionLabel, { fontSize: fontSizes.labels, color: colors.spiritual }]}>
                  English Meaning:
                </Text>
                <Text
                  style={[
                    styles.englishText,
                    {
                      fontSize: fontSizes.english,
                      lineHeight: fontSizes.english * 1.5,
                      color: colors.text,
                    },
                  ]}
                >
                  {currentItem.verse.english_meaning}
                </Text>
              </View>
            </View>
          </ScrollView>
        </PanGestureHandler>
      </View>

      {/* Navigation Controls */}
      <View style={[styles.navigationContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.navButton, 
            { backgroundColor: canGoPrevious ? colors.spiritual : colors.surface, borderColor: colors.border },
            !canGoPrevious && styles.disabledNavButton
          ]}
          onPress={() => navigateToIndex('previous')}
          disabled={!canGoPrevious}
        >
          <Text style={[
            styles.navButtonText,
            { color: canGoPrevious ? colors.buttonText : colors.textSecondary, fontSize: scaleFontSize(16) },
            !canGoPrevious && styles.disabledNavButtonText
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: colors.text, fontSize: scaleFontSize(14) }]}>
            {currentIndex + 1} {t.samputt.of} {samputSequence.length}
          </Text>
          <Text style={[styles.progressSubtext, { color: colors.textSecondary, fontSize: scaleFontSize(12) }]}>
            {getVerseTypeLabel()}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.navButton, 
            { backgroundColor: canGoNext ? colors.spiritual : colors.surface, borderColor: colors.border },
            !canGoNext && styles.disabledNavButton
          ]}
          onPress={() => navigateToIndex('next')}
          disabled={!canGoNext}
        >
          <Text style={[
            styles.navButtonText,
            { color: canGoNext ? colors.buttonText : colors.textSecondary, fontSize: scaleFontSize(16) },
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
  menuButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
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
  contentArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  contentScrollContent: {
    paddingBottom: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
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
