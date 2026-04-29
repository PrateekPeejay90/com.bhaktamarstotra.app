import { Verse } from '../types';
import { dataService } from './dataService';

export interface SearchResult {
  verse: Verse;
  matchedFields: string[];
  matchedText: string[];
}

export interface SearchOptions {
  includeVerseNumbers?: boolean;
  includeSanskrit?: boolean;
  includeTransliteration?: boolean;
  includeHindi?: boolean;
  includeEnglish?: boolean;
  caseSensitive?: boolean;
  exactMatch?: boolean;
}

export const DEFAULT_SEARCH_OPTIONS: Required<SearchOptions> = {
  includeVerseNumbers: true,
  includeSanskrit: true,
  includeTransliteration: true,
  includeHindi: true,
  includeEnglish: true,
  caseSensitive: false,
  exactMatch: false,
};

class SearchService {
  private readonly verseNumberQueryPattern = /^(?:verse|shlok|श्लोक)?\s*(\d{1,2})$/i;

  private parseVerseNumberQuery(searchTerm: string): string | null {
    const trimmedTerm = searchTerm.trim();
    const match = trimmedTerm.match(this.verseNumberQueryPattern);

    if (!match) {
      return null;
    }

    const parsedNumber = Number(match[1]);
    if (!Number.isFinite(parsedNumber) || parsedNumber <= 0) {
      return null;
    }

    return parsedNumber.toString();
  }

  private searchByVerseNumber(searchDigits: string): SearchResult[] {
    const verseMatches = dataService
      .getAllVerses()
      .filter((verse) => verse.verse_number !== undefined)
      .filter((verse) => verse.verse_number!.toString().includes(searchDigits))
      .sort((leftVerse, rightVerse) => leftVerse.verse_number! - rightVerse.verse_number!);

    return verseMatches.map((verse) => ({
      verse,
      matchedFields: ['verse_number'],
      matchedText: [`Verse ${verse.verse_number}`],
    }));
  }

  private normalizeText(text: string, caseSensitive: boolean = false): string {
    let normalized = text.trim();
    if (!caseSensitive) {
      normalized = normalized.toLowerCase();
    }
    // Remove extra whitespace
    normalized = normalized.replace(/\s+/g, ' ');
    return normalized;
  }

  private searchInField(
    verse: Verse,
    fieldName: keyof Verse,
    searchTerm: string,
    options: SearchOptions
  ): { matched: boolean; text: string } {
    const fieldValue = verse[fieldName];
    if (!fieldValue || typeof fieldValue !== 'string') {
      return { matched: false, text: '' };
    }

    const normalizedField = this.normalizeText(fieldValue, options.caseSensitive);
    const normalizedTerm = this.normalizeText(searchTerm, options.caseSensitive);

    let matched = false;
    if (options.exactMatch) {
      matched = normalizedField === normalizedTerm;
    } else {
      matched = normalizedField.includes(normalizedTerm);
    }

    return { matched, text: fieldValue };
  }

  public searchVerses(
    searchTerm: string,
    options: SearchOptions = {}
  ): SearchResult[] {
    if (!searchTerm.trim()) {
      return [];
    }

    // Default options
    const searchOptions: SearchOptions = {
      ...DEFAULT_SEARCH_OPTIONS,
      ...options,
    };

    const directVerseNumberQuery = searchOptions.includeVerseNumbers
      ? this.parseVerseNumberQuery(searchTerm)
      : null;

    if (directVerseNumberQuery) {
      return this.searchByVerseNumber(directVerseNumberQuery);
    }

    const allVerses = dataService.getAllVerses();
    const results: SearchResult[] = [];

    for (const verse of allVerses) {
      const matchedFields: string[] = [];
      const matchedText: string[] = [];

      // Search in verse number
      if (searchOptions.includeVerseNumbers && verse.verse_number) {
        const verseNumStr = verse.verse_number.toString();
        if (verseNumStr.includes(searchTerm.trim())) {
          matchedFields.push('verse_number');
          matchedText.push(`Verse ${verseNumStr}`);
        }
      }

      // Search in Sanskrit text (content field)
      if (searchOptions.includeSanskrit && verse.content) {
        const result = this.searchInField(verse, 'content', searchTerm, searchOptions);
        if (result.matched) {
          matchedFields.push('content');
          matchedText.push(result.text);
        }
      }

      // Search in transliteration
      if (searchOptions.includeTransliteration && verse.transliteration) {
        const result = this.searchInField(verse, 'transliteration', searchTerm, searchOptions);
        if (result.matched) {
          matchedFields.push('transliteration');
          matchedText.push(result.text);
        }
      }

      // Search in Hindi meaning
      if (searchOptions.includeHindi && verse.hindi_meaning) {
        const result = this.searchInField(verse, 'hindi_meaning', searchTerm, searchOptions);
        if (result.matched) {
          matchedFields.push('hindi_meaning');
          matchedText.push(result.text);
        }
      }

      // Search in English meaning
      if (searchOptions.includeEnglish && verse.english_meaning) {
        const result = this.searchInField(verse, 'english_meaning', searchTerm, searchOptions);
        if (result.matched) {
          matchedFields.push('english_meaning');
          matchedText.push(result.text);
        }
      }

      // If any matches found, add to results
      if (matchedFields.length > 0) {
        results.push({
          verse,
          matchedFields,
          matchedText,
        });
      }
    }

    return results.sort(
      (leftResult, rightResult) =>
        (leftResult.verse.verse_number ?? Number.MAX_SAFE_INTEGER) -
        (rightResult.verse.verse_number ?? Number.MAX_SAFE_INTEGER),
    );
  }

  public getSearchSuggestions(partialTerm: string, limit: number = 5): string[] {
    if (partialTerm.length < 2) {
      return [];
    }

    const allVerses = dataService.getAllVerses();
    const suggestions = new Set<string>();

    for (const verse of allVerses) {
      const texts = [
        verse.content,
        verse.transliteration,
        verse.hindi_meaning,
        verse.english_meaning
      ].filter(Boolean) as string[];

      for (const text of texts) {
        const words = text.toLowerCase().split(/\s+/);
        for (const word of words) {
          if (word.startsWith(partialTerm.toLowerCase()) && word.length > partialTerm.length) {
            suggestions.add(word);
            if (suggestions.size >= limit) {
              return Array.from(suggestions);
            }
          }
        }
      }
    }

    return Array.from(suggestions);
  }
}

export const searchService = new SearchService();
