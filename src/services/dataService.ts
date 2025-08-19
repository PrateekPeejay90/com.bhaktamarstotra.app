import { BhaktamarData, Verse } from '../types';
import bhaktamarData from '../../assets/data.json';

class DataService {
  private data: BhaktamarData;

  constructor() {
    this.data = bhaktamarData as BhaktamarData;
  }

  // Get all app data
  getAllData(): BhaktamarData {
    return this.data;
  }

  // Get all verses (excluding introduction)
  getAllVerses(): Verse[] {
    return this.data.pages.filter(page => page.type === 'verse');
  }

  // Get introduction page
  getIntroduction(): Verse | undefined {
    return this.data.pages.find(page => page.type === 'introduction');
  }

  // Get verse by verse number
  getVerseByNumber(verseNumber: number): Verse | undefined {
    return this.data.pages.find(page => page.verse_number === verseNumber);
  }

  // Get verse by page number
  getVerseByPage(pageNumber: number): Verse | undefined {
    return this.data.pages.find(page => page.page_number === pageNumber);
  }

  // Search verses by content (Sanskrit, Hindi, or English)
  searchVerses(query: string): Verse[] {
    const searchTerm = query.toLowerCase();
    return this.data.pages.filter(page => 
      page.content.toLowerCase().includes(searchTerm) ||
      page.hindi_meaning.toLowerCase().includes(searchTerm) ||
      page.english_meaning.toLowerCase().includes(searchTerm) ||
      page.transliteration.toLowerCase().includes(searchTerm)
    );
  }

  // Get total verse count
  getTotalVerses(): number {
    return this.getAllVerses().length;
  }

  // Get app metadata
  getAppInfo() {
    return {
      title: this.data.title,
      subtitle: this.data.subtitle,
      description: this.data.description,
      author: this.data.author,
      totalPages: this.data.total_pages
    };
  }
}

export const dataService = new DataService();
