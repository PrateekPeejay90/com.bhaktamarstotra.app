import React, { createContext, useContext, ReactNode } from 'react';
import { usePersistedStringState } from '../hooks/usePersistedStringState';
import { LanguageCode, Translations, translations } from '../i18n/translations';

interface LanguageContextType {
  language: LanguageCode;
  t: Translations;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LANGUAGE_STORAGE_KEY = '@bhaktamar_language';
const SUPPORTED_LANGUAGES = ['en', 'hi'] as const;

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = usePersistedStringState<LanguageCode>(
    LANGUAGE_STORAGE_KEY,
    'en',
    SUPPORTED_LANGUAGES,
    'language',
  );

  const value: LanguageContextType = {
    language,
    t: translations[language],
    setLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export type { LanguageCode, Translations } from '../i18n/translations';
