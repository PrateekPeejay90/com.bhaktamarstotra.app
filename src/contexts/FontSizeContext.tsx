import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState<FontSizeLevel>('medium');

  const fontSizes = fontSizePresets[currentLevel];

  const increaseFontSize = () => {
    const levels: FontSizeLevel[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(currentLevel);
    if (currentIndex < levels.length - 1) {
      setCurrentLevel(levels[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const levels: FontSizeLevel[] = ['small', 'medium', 'large', 'extra-large'];
    const currentIndex = levels.indexOf(currentLevel);
    if (currentIndex > 0) {
      setCurrentLevel(levels[currentIndex - 1]);
    }
  };

  const setFontSizeLevel = (level: FontSizeLevel) => {
    setCurrentLevel(level);
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
