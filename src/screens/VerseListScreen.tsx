import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView 
} from 'react-native';
import { List } from 'phosphor-react-native';
import { dataService } from '../services/dataService';
import { Verse } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BackIconButton } from '../components/BackIconButton';

interface VerseListScreenProps {
  onVerseSelect: (verse: Verse) => void;
  onBack: () => void;
  onOpenDrawer: () => void;
}

export const VerseListScreen: React.FC<VerseListScreenProps> = ({ onVerseSelect, onBack, onOpenDrawer }) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [filteredVerses, setFilteredVerses] = useState<Verse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const allVerses = dataService.getAllVerses();
    setVerses(allVerses);
    setFilteredVerses(allVerses);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVerses(verses);
    } else {
      const filtered = dataService.searchVerses(searchQuery);
      setFilteredVerses(filtered.filter(v => v.type === 'verse'));
    }
  }, [searchQuery, verses]);

  const renderVerseItem = ({ item }: { item: Verse }) => (
    <TouchableOpacity 
      style={[styles.verseItem, { backgroundColor: colors.surface }]}
      onPress={() => onVerseSelect(item)}
    >
      <View style={styles.verseHeader}>
        <Text style={[styles.verseNumber, { color: colors.spiritual }]}>Verse {item.verse_number}</Text>
        <Text style={[styles.pageNumber, { color: colors.textSecondary }]}>Page {item.page_number}</Text>
      </View>
      
      <Text style={[styles.sanskritPreview, { color: colors.text }]} numberOfLines={2}>
        {item.content}
      </Text>
      
      <Text style={[styles.transliterationPreview, { color: colors.textSecondary }]} numberOfLines={1}>
        {item.transliteration}
      </Text>
      
      <Text style={[styles.meaningPreview, { color: colors.text }]} numberOfLines={2}>
        {item.hindi_meaning}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <BackIconButton onPress={onBack} />
        <Text style={[styles.headerTitle, { color: colors.spiritual }]}>{t.verseList.title}</Text>
        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={onOpenDrawer}
        >
          <List size={20} color={colors.spiritual} weight="bold" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
          placeholder={t.verseList.searchPlaceholder}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Results Count */}
      <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
        {filteredVerses.length} {filteredVerses.length === 1 ? t.verseList.verse : t.verseList.verses} {t.verseList.versesFound}
      </Text>

      {/* Verse List */}
      <FlatList
        data={filteredVerses}
        renderItem={renderVerseItem}
        keyExtractor={(item) => `verse-${item.verse_number}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resultsCount: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 14,
    color: '#666666',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  verseItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  pageNumber: {
    fontSize: 12,
    color: '#999999',
  },
  sanskritPreview: {
    fontSize: 16,
    color: '#2F4F4F',
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: 'serif',
  },
  transliterationPreview: {
    fontSize: 14,
    color: '#696969',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  meaningPreview: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
});
