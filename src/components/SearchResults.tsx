import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { SearchResult } from '../services/searchService';
import { Verse } from '../types';
import { uiPrimitives } from '../styles/uiPrimitives';

interface SearchResultsProps {
  results: SearchResult[];
  onVerseSelect: (verse: Verse) => void;
  searchTerm: string;
  loading?: boolean;
  embedded?: boolean;
  actionHint?: string;
}

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
  style: StyleProp<TextStyle>;
  highlightStyle: StyleProp<TextStyle>;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  searchTerm,
  style,
  highlightStyle
}) => {
  if (!searchTerm.trim()) {
    return <Text style={style}>{text}</Text>;
  }

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const escapedSearchTerm = searchTerm.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text style={style}>
      {parts.map((part, index) => {
        const isHighlight = part.toLowerCase() === normalizedSearchTerm;
        return (
          <Text
            key={index}
            style={isHighlight ? [style, highlightStyle] : style}
          >
            {part}
          </Text>
        );
      })}
    </Text>
  );
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onVerseSelect,
  searchTerm,
  loading = false,
  embedded = false,
  actionHint,
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { fontSizes, scaleFontSize } = useFontSize();
  const tapHint = actionHint ?? t.search.tapToView;

  const getFieldDisplayName = (fieldName: string): string => {
    switch (fieldName) {
      case 'content': return t.verseDetail.sanskrit;
      case 'transliteration': return t.verseDetail.transliteration;
      case 'hindi_meaning': return t.verseDetail.hindi;
      case 'english_meaning': return t.verseDetail.english;
      case 'verse_number': return t.verseDetail.verse;
      default: return fieldName;
    }
  };

  const renderSearchResultCard = (item: SearchResult) => {
    const { verse, matchedFields } = item;

    return (
      <TouchableOpacity
        key={`search-${verse.verse_number}`}
        style={[
          uiPrimitives.elevatedCard,
          styles.resultCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
        onPress={() => onVerseSelect(verse)}
      >
        {/* Verse Header */}
        <View style={styles.resultHeader}>
          <Text style={[styles.verseNumber, { color: colors.spiritual, fontSize: scaleFontSize(16) }]}>
            {t.verseDetail.verse} {verse.verse_number}
          </Text>
        </View>

        {/* Matched Fields Indicators */}
        {!embedded ? (
          <View style={styles.matchedFieldsContainer}>
            {matchedFields.map((field, index) => (
              <View
                key={index}
                style={[styles.fieldTag, { backgroundColor: colors.accent, borderColor: colors.spiritual }]}
              >
                <Text style={[styles.fieldTagText, { color: colors.spiritual, fontSize: scaleFontSize(11) }]}>
                  {getFieldDisplayName(field)}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Sanskrit Text (always show) */}
        {verse.content && (
          <View style={styles.textSection}>
            <HighlightedText
              text={verse.content}
              searchTerm={searchTerm}
              style={[styles.sanskritText, { color: colors.text, fontSize: fontSizes.sanskrit, lineHeight: fontSizes.sanskrit * 1.5 }]}
              highlightStyle={[styles.highlightText, { backgroundColor: colors.accent, color: colors.spiritual }]}
            />
          </View>
        )}

        {/* Transliteration (if matched or short) */}
        {verse.transliteration && (matchedFields.includes('transliteration') || verse.transliteration.length < 100) && (
          <View style={styles.textSection}>
            <HighlightedText
              text={verse.transliteration}
              searchTerm={searchTerm}
              style={[styles.transliterationText, { color: colors.textSecondary, fontSize: fontSizes.transliteration, lineHeight: fontSizes.transliteration * 1.45 }]}
              highlightStyle={[styles.highlightText, { backgroundColor: colors.accent, color: colors.spiritual }]}
            />
          </View>
        )}

        {/* English Meaning (if matched or preview) */}
        {verse.english_meaning && (
          <View style={styles.textSection}>
            <HighlightedText
              text={matchedFields.includes('english_meaning') 
                ? verse.english_meaning 
                : verse.english_meaning.substring(0, 120) + (verse.english_meaning.length > 120 ? '...' : '')
              }
              searchTerm={searchTerm}
              style={[styles.meaningText, { color: colors.text, fontSize: fontSizes.english, lineHeight: fontSizes.english * 1.45 }]}
              highlightStyle={[styles.highlightText, { backgroundColor: colors.accent, color: colors.spiritual }]}
            />
          </View>
        )}

        {/* Hindi Meaning (if matched) */}
        {verse.hindi_meaning && matchedFields.includes('hindi_meaning') && (
          <View style={styles.textSection}>
            <HighlightedText
              text={verse.hindi_meaning}
              searchTerm={searchTerm}
              style={[styles.meaningText, { color: colors.text, fontSize: fontSizes.hindi, lineHeight: fontSizes.hindi * 1.45 }]}
              highlightStyle={[styles.highlightText, { backgroundColor: colors.accent, color: colors.spiritual }]}
            />
          </View>
        )}

        {/* Tap to view indicator */}
        <Text style={[styles.tapToView, { color: colors.textSecondary, fontSize: scaleFontSize(12) }]}>
          {tapHint}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, embedded && styles.embeddedStateContainer]}>
        <Text style={[styles.loadingText, { color: colors.text, fontSize: scaleFontSize(16) }]}>{t.search.searching}</Text>
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View style={[styles.emptyContainer, embedded && styles.embeddedStateContainer]}>
        <Text style={[styles.emptyTitle, { color: colors.text, fontSize: scaleFontSize(18) }]}>{t.search.noResults}</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary, fontSize: scaleFontSize(14), lineHeight: scaleFontSize(14) * 1.45 }]}>
          {t.search.tip4}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, embedded && styles.embeddedContainer]}>
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: colors.text, fontSize: scaleFontSize(16) }]}>
          {results.length} {results.length === 1 ? t.verseList.verse : t.verseList.verses} {t.verseList.versesFound}
        </Text>
        <Text style={[styles.searchTerm, { color: colors.spiritual, fontSize: scaleFontSize(14) }]}>
          {t.search.resultsFor} "{searchTerm}"
        </Text>
      </View>

      {embedded ? (
        <View style={styles.resultsList}>
          {results.map(renderSearchResultCard)}
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => `search-${item.verse.verse_number}`}
          renderItem={({ item }) => renderSearchResultCard(item)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  embeddedContainer: {
    flex: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  embeddedStateContainer: {
    flex: 0,
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  resultsHeader: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  searchTerm: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultCard: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  matchedFieldsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  fieldTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  fieldTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  textSection: {
    marginBottom: 8,
  },
  sanskritText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'serif',
  },
  transliterationText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  meaningText: {
    fontSize: 14,
    lineHeight: 20,
  },
  highlightText: {
    fontWeight: '600',
    borderRadius: 4,
    paddingHorizontal: 2,
  },
  tapToView: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 8,
  },
});
