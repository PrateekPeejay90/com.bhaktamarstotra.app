import React, { createContext, useContext, ReactNode } from 'react';
import { usePersistedStringState } from '../hooks/usePersistedStringState';

export type FontSizeLevel = 'small' | 'medium' | 'large' | 'extra-large';

interface FontSizeSettings {
  sanskrit: number;
  transliteration: number;
  hindi: number;
  english: number;
  labels: number;
  uiScale: number;
}

interface FontSizeContextType {
  currentLevel: FontSizeLevel;
  fontSizes: FontSizeSettings;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setFontSizeLevel: (level: FontSizeLevel) => void;
  scaleFontSize: (baseSize: number) => number;
}

const fontSizePresets: Record<FontSizeLevel, FontSizeSettings> = {
  'small': {
    sanskrit: 16,
    transliteration: 14,
    hindi: 14,
    english: 14,
    labels: 12,
    uiScale: 0.9,
  },
  'medium': {
    sanskrit: 18,
    transliteration: 16,
    hindi: 16,
    english: 16,
    labels: 14,
    uiScale: 1,
  },
  'large': {
    sanskrit: 20,
    transliteration: 18,
    hindi: 18,
    english: 18,
    labels: 16,
    uiScale: 1.12,
  },
  'extra-large': {
    sanskrit: 24,
    transliteration: 20,
    hindi: 20,
    english: 20,
    labels: 18,
    uiScale: 1.25,
  },
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface FontSizeProviderProps {
  children: ReactNode;
}

const FONT_SIZE_STORAGE_KEY = '@bhaktamar_font_size';
const FONT_SIZE_LEVELS = ['small', 'medium', 'large', 'extra-large'] as const;

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = usePersistedStringState<FontSizeLevel>(
    FONT_SIZE_STORAGE_KEY,
    'medium',
    FONT_SIZE_LEVELS,
    'font size',
  );

  const fontSizes = fontSizePresets[currentLevel];
  const scaleFontSize = (baseSize: number) => Math.round(baseSize * fontSizes.uiScale);

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
    scaleFontSize,
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
