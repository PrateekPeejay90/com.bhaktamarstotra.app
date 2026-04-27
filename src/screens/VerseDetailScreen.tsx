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
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Use font size context and theme
  const { fontSizes, scaleFontSize } = useFontSize();
  const { colors } = useTheme();
  const { t } = useLanguage();

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <BackIconButton onPress={onBack} />
        
        <View style={styles.headerCenter}>
          <Text style={[styles.verseTitle, { color: colors.spiritual, fontSize: scaleFontSize(18) }]}>{t.verseDetail.verse} {currentVerse.verse_number}</Text>
          <Text style={[styles.pageInfo, { color: colors.textSecondary, fontSize: scaleFontSize(12) }]}>{t.verseDetail.page} {currentVerse.page_number}</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.bookmarkButton, { backgroundColor: colors.accent }]} onPress={toggleBookmark}>
            <Text style={[styles.bookmarkText, { color: colors.spiritual, fontSize: scaleFontSize(24) }]}>{isBookmarked ? '★' : '☆'}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={onOpenDrawer}
          >
            <List size={20} color={colors.spiritual} weight="bold" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Verse Content */}
      <View style={styles.contentArea}>
        <PanGestureHandler onGestureEvent={onSwipeGesture}>
          <ScrollView
            style={[styles.contentContainer, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.contentScrollContent}
            showsVerticalScrollIndicator={false}
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
              <View style={styles.translationSection}>
                <Text style={[styles.translationLabel, { fontSize: fontSizes.labels, color: colors.spiritual }]}>
                  Transliteration:
                </Text>
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
              </View>
              
              <View style={styles.translationSection}>
                <Text style={[styles.translationLabel, { fontSize: fontSizes.labels, color: colors.spiritual }]}>
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
                  {currentVerse.hindi_meaning}
                </Text>
              </View>
              
              <View style={styles.translationSection}>
                <Text style={[styles.translationLabel, { fontSize: fontSizes.labels, color: colors.spiritual }]}>
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
                  {currentVerse.english_meaning}
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
          onPress={() => navigateToVerse('previous')}
          disabled={!canGoPrevious}
        >
          <Text style={[
            styles.navButtonText,
            { color: canGoPrevious ? colors.buttonText : colors.textSecondary, fontSize: scaleFontSize(16) },
            !canGoPrevious && styles.disabledNavButtonText
          ]}>
            ← Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: colors.text, fontSize: scaleFontSize(14) }]}>
            {currentVerse.verse_number} of {totalVerses}
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
          <Text style={[
            styles.navButtonText,
            { color: canGoNext ? colors.buttonText : colors.textSecondary, fontSize: scaleFontSize(16) },
            !canGoNext && styles.disabledNavButtonText
          ]}>
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
  headerCenter: {
    alignItems: 'center',
    flex: 1,
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
  bookmarkButton: {
    padding: 8,
  },
  bookmarkText: {
    fontSize: 24,
    color: '#8B4513',
  },
  menuButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
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
});
