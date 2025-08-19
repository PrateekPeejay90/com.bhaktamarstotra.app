export interface Verse {
  page_number: number;
  type: 'introduction' | 'verse';
  content: string;
  transliteration: string;
  hindi_meaning: string;
  english_meaning: string;
  verse_number: number | null;
}

export interface BhaktamarData {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  total_pages: number;
  pages: Verse[];
}

export type Language = 'sanskrit' | 'hindi' | 'english' | 'transliteration';

export interface AppState {
  currentVerse: number;
  selectedLanguage: Language;
  bookmarkedVerses: number[];
  searchQuery: string;
}
