import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FontSizeLevel = 'small' | 'medium' | 'large' | 'extra-large';

interface FontSizeSettings {
  sanskrit: number;
  transliteration: number;
  hindi: number;
  english: number;
  labels: number;
}

interface FontSizeContextType {
  currentLevel: FontSizeLevel;
  fontSizes: FontSizeSettings;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setFontSizeLevel: (level: FontSizeLevel) => void;
}

const fontSizePresets: Record<FontSizeLevel, FontSizeSettings> = {
  'small': {
    sanskrit: 16,
    transliteration: 14,
    hindi: 14,
    english: 14,
    labels: 12,
  },
  'medium': {
    sanskrit: 18,
    transliteration: 16,
    hindi: 16,
    english: 16,
    labels: 14,
  },
  'large': {
    sanskrit: 20,
    transliteration: 18,
    hindi: 18,
    english: 18,
    labels: 16,
  },
  'extra-large': {
    sanskrit: 24,
    transliteration: 20,
    hindi: 20,
    english: 20,
    labels: 18,
  },
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface FontSizeProviderProps {
  children: ReactNode;
}

const FONT_SIZE_STORAGE_KEY = '@bhaktamar_font_size';

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState<FontSizeLevel>('medium');

  useEffect(() => {
    loadFontSize();
  }, []);

  const loadFontSize = async () => {
    try {
      const savedFontSize = await AsyncStorage.getItem(FONT_SIZE_STORAGE_KEY);
      if (savedFontSize && ['small', 'medium', 'large', 'extra-large'].includes(savedFontSize)) {
        setCurrentLevel(savedFontSize as FontSizeLevel);
      }
    } catch (error) {
      console.log('Error loading font size:', error);
    }
  };

  const saveFontSize = async (level: FontSizeLevel) => {
    try {
      await AsyncStorage.setItem(FONT_SIZE_STORAGE_KEY, level);
    } catch (error) {
      console.log('Error saving font size:', error);
    }
  };

  const fontSizes = fontSizePresets[currentLevel];

  const increaseFontSize = () => {
    const levels: FontSizeLevel[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(currentLevel);
    if (currentIndex < levels.length - 1) {
      const newLevel = levels[currentIndex + 1];
      setCurrentLevel(newLevel);
      saveFontSize(newLevel);
    }
  };

  const decreaseFontSize = () => {
    const levels: FontSizeLevel[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(currentLevel);
    if (currentIndex > 0) {
      const newLevel = levels[currentIndex - 1];
      setCurrentLevel(newLevel);
      saveFontSize(newLevel);
    }
  };

  const setFontSizeLevel = (level: FontSizeLevel) => {
    setCurrentLevel(level);
    saveFontSize(level);
  };

  const value: FontSizeContextType = {
    currentLevel,
    fontSizes,
    increaseFontSize,
    decreaseFontSize,
    setFontSizeLevel,
  };

  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};
