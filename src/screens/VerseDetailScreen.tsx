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

interface VerseDetailScreenProps {
  verse: Verse;
  onBack: () => void;
  onVerseChange?: (verse: Verse) => void;
  onOpenDrawer: () => void;
}

export const VerseDetailScreen: React.FC<VerseDetailScreenProps> = ({ 
  verse, 
  onBack, 
  onVerseChange,
  onOpenDrawer 
}) => {
  const [currentVerse, setCurrentVerse] = useState<Verse>(verse);
  
  // Use font size context and theme
  const { fontSizes, scaleFontSize } = useFontSize();
  const { colors } = useTheme();
  const { t } = useLanguage();

  const totalVerses = dataService.getTotalVerses();
  const canGoPrevious = currentVerse.verse_number! > 1;
  const canGoNext = currentVerse.verse_number! < totalVerses;
  const previousNavColor = canGoPrevious ? colors.buttonText : colors.textSecondary;
  const nextNavColor = canGoNext ? colors.buttonText : colors.textSecondary;

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={`${t.verseDetail.verse} ${currentVerse.verse_number}`}
        subtitle={`${t.verseDetail.page} ${currentVerse.page_number}`}
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
            style={[styles.contentScrollView, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.contentScrollContent}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            <View style={[styles.verseContent, { backgroundColor: colors.surface }]}>
              <View>
                {currentVerse.content.split('\n').map((line, index) => (
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

            <View style={styles.translationsContainer}>
              <CollapsibleSection title={t.verseDetail.transliteration} titleFontSize={fontSizes.labels}>
                <View>
                  {currentVerse.transliteration.split('\n').map((line, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.transliterationText,
                        {
                          fontSize: fontSizes.transliteration,
                          lineHeight: fontSizes.transliteration * 1.5,
                          color: colors.text,
                        },
                      ]}
                    >
                      {line}
                    </Text>
                  ))}
                </View>
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
                  {currentVerse.hindi_meaning}
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
                  {currentVerse.english_meaning}
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
          onPress={() => navigateToVerse('previous')}
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
            {currentVerse.verse_number} / {totalVerses}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.navButton, 
            { backgroundColor: canGoNext ? colors.spiritual : colors.surface, borderColor: colors.border },
            !canGoNext && styles.disabledNavButton
          ]}
          onPress={() => navigateToVerse('next')}
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
  contentArea: {
    flex: 1,
    minHeight: 0,
  },
  contentScrollView: {
    flex: 1,
    minHeight: 0,
  },
  contentScrollContent: {
    paddingBottom: 16,
  },
  verseContent: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    marginTop: 12,
    marginBottom: 10,
    marginHorizontal: 12,
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
    paddingHorizontal: 12,
    gap: 16,
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
});
