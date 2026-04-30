import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { searchService } from '../services/searchService';
import { uiPrimitives } from '../styles/uiPrimitives';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  placeholder,
  value,
  onChangeText,
}) => {
  const { colors } = useTheme();
  const { scaleFontSize } = useFontSize();
  const { t } = useLanguage();
  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const lastEmittedSearchTermRef = useRef('');
  const searchTerm = value ?? internalSearchTerm;

  const setSearchTerm = (nextValue: string) => {
    if (onChangeText) {
      onChangeText(nextValue);
      return;
    }

    setInternalSearchTerm(nextValue);
  };

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

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      lastEmittedSearchTermRef.current = '';
      onClear();
      return;
    }

    const timeoutId = setTimeout(() => {
      if (lastEmittedSearchTermRef.current === trimmedSearchTerm) {
        return;
      }

      lastEmittedSearchTermRef.current = trimmedSearchTerm;
      onSearch(trimmedSearchTerm);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [onClear, onSearch, searchTerm]);

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View
        style={[
          uiPrimitives.elevatedCard,
          styles.searchInputContainer,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <TextInput
          style={[styles.searchInput, { color: colors.text, fontSize: scaleFontSize(16) }]}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder={placeholder ?? t.search.placeholder}
          placeholderTextColor={colors.textSecondary}
          returnKeyType="done"
        />
        
        {searchTerm.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
          >
            <Text style={[styles.clearButtonText, { color: colors.textSecondary, fontSize: scaleFontSize(16) }]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

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
    paddingHorizontal: 12,
    paddingVertical: 8,
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
