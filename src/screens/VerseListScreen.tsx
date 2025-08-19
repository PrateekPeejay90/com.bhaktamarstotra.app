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
import { dataService } from '../services/dataService';
import { Verse } from '../types';

interface VerseListScreenProps {
  onVerseSelect: (verse: Verse) => void;
  onBack: () => void;
}

export const VerseListScreen: React.FC<VerseListScreenProps> = ({ onVerseSelect, onBack }) => {
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
      style={styles.verseItem}
      onPress={() => onVerseSelect(item)}
    >
      <View style={styles.verseHeader}>
        <Text style={styles.verseNumber}>Verse {item.verse_number}</Text>
        <Text style={styles.pageNumber}>Page {item.page_number}</Text>
      </View>
      
      <Text style={styles.sanskritPreview} numberOfLines={2}>
        {item.content}
      </Text>
      
      <Text style={styles.transliterationPreview} numberOfLines={1}>
        {item.transliteration}
      </Text>
      
      <Text style={styles.meaningPreview} numberOfLines={2}>
        {item.hindi_meaning}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Verses</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search verses..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {filteredVerses.length} verse{filteredVerses.length !== 1 ? 's' : ''} found
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
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  placeholder: {
    width: 60, // Same width as back button for centering
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
