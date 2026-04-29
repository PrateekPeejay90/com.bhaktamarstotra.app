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
import { ArrowLeft, ArrowRight } from 'phosphor-react-native';
import { dataService } from '../services/dataService';
import { Verse } from '../types';
import { useFontSize } from '../contexts/FontSizeContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { CollapsibleSection } from '../components/CollapsibleSection';

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
    setCurrentIndex(0);
  };

  const currentItem = samputSequence[currentIndex];
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < samputSequence.length - 1;
  const previousNavColor = canGoPrevious ? colors.buttonText : colors.textSecondary;
  const nextNavColor = canGoNext ? colors.buttonText : colors.textSecondary;

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
      <ScreenHeader
        title={t.samputt.title}
        subtitle={`${t.samputt.with} ${samputVerseNumber}`}
        onBack={onBack}
        onOpenDrawer={onOpenDrawer}
        titleFontSize={scaleFontSize(18)}
        subtitleFontSize={scaleFontSize(12)}
      />

      {/* Verse Content */}
      <View style={styles.contentArea}>
        <PanGestureHandler
          activeOffsetX={[-36, 36]}
          failOffsetY={[-18, 18]}
          onHandlerStateChange={onSwipeGesture}
        >
          <ScrollView
            style={[styles.contentContainer, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.contentScrollContent}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
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
            </View>

            <View style={styles.collapsibleSections}>
              <CollapsibleSection title={t.verseDetail.transliteration} titleFontSize={fontSizes.labels}>
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
              </CollapsibleSection>

              <CollapsibleSection title={t.verseDetail.hindiMeaning} titleFontSize={fontSizes.labels}>
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
              </CollapsibleSection>

              <CollapsibleSection title={t.verseDetail.englishMeaning} titleFontSize={fontSizes.labels}>
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
              </CollapsibleSection>
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
          <View style={styles.navButtonContent}>
            <ArrowLeft size={18} color={previousNavColor} weight="bold" />
            <Text style={[
              styles.navButtonText,
              { color: previousNavColor, fontSize: scaleFontSize(16) },
              !canGoPrevious && styles.disabledNavButtonText
            ]}>
              {t.navigation.previous}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: colors.text, fontSize: scaleFontSize(14) }]}>
            {currentIndex + 1} / {samputSequence.length}
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
          <View style={styles.navButtonContent}>
            <Text style={[
              styles.navButtonText,
              { color: nextNavColor, fontSize: scaleFontSize(16) },
              !canGoNext && styles.disabledNavButtonText
            ]}>
              {t.navigation.next}
            </Text>
            <ArrowRight size={18} color={nextNavColor} weight="bold" />
          </View>
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
  contentArea: {
    flex: 1,
    minHeight: 0,
  },
  contentContainer: {
    flex: 1,
    minHeight: 0,
  },
  contentScrollContent: {
    paddingBottom: 16,
  },
  verseContent: {
    backgroundColor: '#ffffff',
    marginTop: 12,
    marginHorizontal: 12,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  collapsibleSections: {
    gap: 16,
    paddingHorizontal: 12,
  },
  sanskritContainer: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sanskritText: {
    color: '#2F4F4F',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 4,
  },
  transliterationText: {
    color: '#696969',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 2,
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
  navButtonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
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
