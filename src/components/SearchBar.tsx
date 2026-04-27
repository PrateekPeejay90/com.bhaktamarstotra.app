import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import { Faders } from 'phosphor-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { searchService, SearchOptions } from '../services/searchService';

interface SearchBarProps {
  onSearch: (searchTerm: string, options: SearchOptions) => void;
  onClear: () => void;
  placeholder?: string;
  showAdvancedOptions?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  placeholder = "Search verses...",
  showAdvancedOptions = false
}) => {
  const { colors } = useTheme();
  const { scaleFontSize } = useFontSize();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    includeSanskrit: true,
    includeTransliteration: true,
    includeHindi: true,
    includeEnglish: true,
    includeVerseNumbers: true,
    caseSensitive: false,
    exactMatch: false,
  });

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const newSuggestions = searchService.getSearchSuggestions(searchTerm, 5);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (term?: string) => {
    const finalTerm = term || searchTerm;
    if (finalTerm.trim()) {
      onSearch(finalTerm.trim(), searchOptions);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const toggleOption = (option: keyof SearchOptions) => {
    setSearchOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={[styles.searchInputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.text, fontSize: scaleFontSize(16) }]}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          onSubmitEditing={() => handleSearch()}
          returnKeyType="search"
        />
        
        {searchTerm.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
          >
            <Text style={[styles.clearButtonText, { color: colors.textSecondary, fontSize: scaleFontSize(16) }]}>✕</Text>
          </TouchableOpacity>
        )}
        
        {showAdvancedOptions && (
          <TouchableOpacity
            style={[styles.filterButton, showOptions && { backgroundColor: colors.accent }]}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Faders size={20} color={colors.spiritual} weight="bold" />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.spiritual }]}
          onPress={() => handleSearch()}
        >
          <Text style={[styles.searchButtonText, { color: colors.buttonText, fontSize: scaleFontSize(16) }]}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Advanced Options Panel */}
      {showOptions && (
        <View style={[styles.optionsPanel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.optionsSectionTitle, { color: colors.text, fontSize: scaleFontSize(16) }]}>Search In:</Text>
          
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[styles.optionButton, searchOptions.includeSanskrit && { backgroundColor: colors.accent }]}
              onPress={() => toggleOption('includeSanskrit')}
            >
              <Text style={[styles.optionButtonText, { color: searchOptions.includeSanskrit ? colors.spiritual : colors.textSecondary, fontSize: scaleFontSize(14) }]}>
                Sanskrit
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.optionButton, searchOptions.includeTransliteration && { backgroundColor: colors.accent }]}
              onPress={() => toggleOption('includeTransliteration')}
            >
              <Text style={[styles.optionButtonText, { color: searchOptions.includeTransliteration ? colors.spiritual : colors.textSecondary, fontSize: scaleFontSize(14) }]}>
                Transliteration
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[styles.optionButton, searchOptions.includeHindi && { backgroundColor: colors.accent }]}
              onPress={() => toggleOption('includeHindi')}
            >
              <Text style={[styles.optionButtonText, { color: searchOptions.includeHindi ? colors.spiritual : colors.textSecondary, fontSize: scaleFontSize(14) }]}>
                Hindi
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.optionButton, searchOptions.includeEnglish && { backgroundColor: colors.accent }]}
              onPress={() => toggleOption('includeEnglish')}
            >
              <Text style={[styles.optionButtonText, { color: searchOptions.includeEnglish ? colors.spiritual : colors.textSecondary, fontSize: scaleFontSize(14) }]}>
                English
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[styles.optionButton, searchOptions.caseSensitive && { backgroundColor: colors.accent }]}
              onPress={() => toggleOption('caseSensitive')}
            >
              <Text style={[styles.optionButtonText, { color: searchOptions.caseSensitive ? colors.spiritual : colors.textSecondary, fontSize: scaleFontSize(14) }]}>
                Case Sensitive
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.optionButton, searchOptions.exactMatch && { backgroundColor: colors.accent }]}
              onPress={() => toggleOption('exactMatch')}
            >
              <Text style={[styles.optionButtonText, { color: searchOptions.exactMatch ? colors.spiritual : colors.textSecondary, fontSize: scaleFontSize(14) }]}>
                Exact Match
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Search Suggestions */}
      {showSuggestions && (
        <View style={[styles.suggestionsContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.suggestionItem, { borderBottomColor: colors.border }]}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text style={[styles.suggestionText, { color: colors.text, fontSize: scaleFontSize(14) }]}>🔍 {item}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 1000,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 8,
    marginRight: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  optionsPanel: {
    marginTop: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
  optionsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionButton: {
    flex: 0.48,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1001,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
  },
});
