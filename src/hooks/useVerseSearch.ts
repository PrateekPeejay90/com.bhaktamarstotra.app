import { useCallback, useState } from 'react';
import {
  DEFAULT_SEARCH_OPTIONS,
  SearchOptions,
  SearchResult,
  searchService,
} from '../services/searchService';

interface UseVerseSearchConfig {
  delayMs?: number;
  errorLabel?: string;
}

export const useVerseSearch = ({
  delayMs = 300,
  errorLabel = 'Search error',
}: UseVerseSearchConfig = {}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (
    searchTerm: string,
    options: SearchOptions = DEFAULT_SEARCH_OPTIONS,
  ) => {
    setIsSearching(true);
    setActiveSearchTerm(searchTerm);
    setQuery(searchTerm);

    try {
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      const results = searchService.searchVerses(searchTerm, options);
      setSearchResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error(`${errorLabel}:`, error);
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  }, [delayMs, errorLabel]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSearchResults([]);
    setActiveSearchTerm('');
    setHasSearched(false);
  }, []);

  return {
    query,
    setQuery,
    searchResults,
    activeSearchTerm,
    isSearching,
    hasSearched,
    handleSearch,
    clearSearch,
  };
};
