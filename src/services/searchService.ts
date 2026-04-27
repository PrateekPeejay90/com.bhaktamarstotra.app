import { Verse } from '../types';
import { dataService } from './dataService';

export interface SearchResult {
  verse: Verse;
  matchedFields: string[];
  matchedText: string[];
  relevanceScore: number;
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

class SearchService {
  private readonly fieldWeightMap: Partial<Record<keyof Verse, number>> = {
    content: 10,
    english_meaning: 8,
    hindi_meaning: 6,
    transliteration: 4,
  };

  private normalizeText(text: string, caseSensitive: boolean = false): string {
    let normalized = text.trim();
    if (!caseSensitive) {
      normalized = normalized.toLowerCase();
    }
    // Remove extra whitespace
    normalized = normalized.replace(/\s+/g, ' ');
    return normalized;
  }

  private calculateRelevanceScore(
    searchTerm: string,
    matchedText: string,
    fieldName: keyof Verse
  ): number {
    const term = searchTerm.toLowerCase();
    const text = matchedText.toLowerCase();
    
    let score = 0;
    
    // Exact match gets highest score
    if (text === term) {
      score += 100;
    }
    // Word boundary match
    else if (text.includes(` ${term} `) || text.startsWith(`${term} `) || text.endsWith(` ${term}`)) {
      score += 80;
    }
    // Partial match
    else if (text.includes(term)) {
      score += 50;
    }
    
    score += this.fieldWeightMap[fieldName] ?? 0;
    
    // Boost score for shorter matches (more specific)
    const lengthRatio = term.length / text.length;
    score += lengthRatio * 20;
    
    return score;
  }

  private searchInField(
    verse: Verse,
    fieldName: keyof Verse,
    searchTerm: string,
    options: SearchOptions
  ): { matched: boolean; text: string; score: number } {
    const fieldValue = verse[fieldName];
    if (!fieldValue || typeof fieldValue !== 'string') {
      return { matched: false, text: '', score: 0 };
    }

    const normalizedField = this.normalizeText(fieldValue, options.caseSensitive);
    const normalizedTerm = this.normalizeText(searchTerm, options.caseSensitive);

    let matched = false;
    if (options.exactMatch) {
      matched = normalizedField === normalizedTerm;
    } else {
      matched = normalizedField.includes(normalizedTerm);
    }

    const score = matched 
      ? this.calculateRelevanceScore(normalizedTerm, normalizedField, fieldName)
      : 0;

    return { matched, text: fieldValue, score };
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
      includeVerseNumbers: true,
      includeSanskrit: true,
      includeTransliteration: true,
      includeHindi: true,
      includeEnglish: true,
      caseSensitive: false,
      exactMatch: false,
      ...options
    };

    const allVerses = dataService.getAllVerses();
    const results: SearchResult[] = [];

    for (const verse of allVerses) {
      const matchedFields: string[] = [];
      const matchedText: string[] = [];
      let totalScore = 0;

      // Search in verse number
      if (searchOptions.includeVerseNumbers && verse.verse_number) {
        const verseNumStr = verse.verse_number.toString();
        if (verseNumStr.includes(searchTerm.trim())) {
          matchedFields.push('verse_number');
          matchedText.push(`Verse ${verseNumStr}`);
          totalScore += 90; // High score for verse number matches
        }
      }

      // Search in Sanskrit text (content field)
      if (searchOptions.includeSanskrit && verse.content) {
        const result = this.searchInField(verse, 'content', searchTerm, searchOptions);
        if (result.matched) {
          matchedFields.push('content');
          matchedText.push(result.text);
          totalScore += result.score;
        }
      }

      // Search in transliteration
      if (searchOptions.includeTransliteration && verse.transliteration) {
        const result = this.searchInField(verse, 'transliteration', searchTerm, searchOptions);
        if (result.matched) {
          matchedFields.push('transliteration');
          matchedText.push(result.text);
          totalScore += result.score;
        }
      }

      // Search in Hindi meaning
      if (searchOptions.includeHindi && verse.hindi_meaning) {
        const result = this.searchInField(verse, 'hindi_meaning', searchTerm, searchOptions);
        if (result.matched) {
          matchedFields.push('hindi_meaning');
          matchedText.push(result.text);
          totalScore += result.score;
        }
      }

      // Search in English meaning
      if (searchOptions.includeEnglish && verse.english_meaning) {
        const result = this.searchInField(verse, 'english_meaning', searchTerm, searchOptions);
        if (result.matched) {
          matchedFields.push('english_meaning');
          matchedText.push(result.text);
          totalScore += result.score;
        }
      }

      // If any matches found, add to results
      if (matchedFields.length > 0) {
        results.push({
          verse,
          matchedFields,
          matchedText,
          relevanceScore: totalScore
        });
      }
    }

    // Sort by relevance score (highest first)
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
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
