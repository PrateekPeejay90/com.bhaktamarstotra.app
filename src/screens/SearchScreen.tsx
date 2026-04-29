import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { ScreenHeader } from '../components/ScreenHeader';
import { Verse } from '../types';
import { useVerseSearch } from '../hooks/useVerseSearch';

interface SearchScreenProps {
  onBack: () => void;
  onVerseSelect: (verse: Verse) => void;
  onOpenDrawer: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onBack,
  onVerseSelect,
  onOpenDrawer
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { scaleFontSize } = useFontSize();
  const {
    query,
    setQuery,
    searchResults,
    activeSearchTerm,
    isSearching,
    hasSearched,
    handleSearch,
    clearSearch,
  } = useVerseSearch();

  const renderContent = () => {
    if (!hasSearched && !isSearching) {
      return (
        <View style={styles.welcomeContainer}>
          <Text style={[styles.welcomeTitle, { color: colors.spiritual, fontSize: scaleFontSize(24) }]}>
            {t.search.searchTitle}
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.text, fontSize: scaleFontSize(16), lineHeight: scaleFontSize(16) * 1.5 }]}>
            {t.search.searchSubtitle}
          </Text>
          
          <View style={styles.searchTips}>
            <Text style={[styles.tipsTitle, { color: colors.text, fontSize: scaleFontSize(18) }]}>{t.search.tips}</Text>
            <Text style={[styles.tipItem, { color: colors.textSecondary, fontSize: scaleFontSize(14), lineHeight: scaleFontSize(14) * 1.45 }]}>
              {t.search.tip1}
            </Text>
            <Text style={[styles.tipItem, { color: colors.textSecondary, fontSize: scaleFontSize(14), lineHeight: scaleFontSize(14) * 1.45 }]}>
              {t.search.tip2}
            </Text>
            <Text style={[styles.tipItem, { color: colors.textSecondary, fontSize: scaleFontSize(14), lineHeight: scaleFontSize(14) * 1.45 }]}>
              {t.search.tip3}
            </Text>
            <Text style={[styles.tipItem, { color: colors.textSecondary, fontSize: scaleFontSize(14), lineHeight: scaleFontSize(14) * 1.45 }]}>
              {t.search.tip4}
            </Text>
          </View>
        </View>
      );
    }

    return (
        <SearchResults
          results={searchResults}
          onVerseSelect={onVerseSelect}
          searchTerm={activeSearchTerm}
          loading={isSearching}
        />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={t.search.title}
        onBack={onBack}
        onOpenDrawer={onOpenDrawer}
        titleFontSize={scaleFontSize(20)}
        titleColor={colors.text}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          onSearch={handleSearch}
          onClear={clearSearch}
          placeholder={t.search.placeholder}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  searchTips: {
    width: '100%',
    maxWidth: 300,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});
