import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguageCode = 'en' | 'hi';

interface Translations {
  home: {
    title: string;
    startReading: string;
    browseVerses: string;
    samputReading: string;
    searchVerses: string;
    loading: string;
  };
  navigation: {
    back: string;
    menu: string;
    home: string;
    about: string;
  };
  verseList: {
    title: string;
    searchPlaceholder: string;
    versesFound: string;
    verse: string;
    verses: string;
  };
  verseDetail: {
    verse: string;
    page: string;
    sanskrit: string;
    transliteration: string;
    hindi: string;
    english: string;
  };
  samputt: {
    title: string;
    selection: string;
    whatIs: string;
    description: string;
    selectVerse: string;
    enterNumber: string;
    quickSelect: string;
    start: string;
    invalidNumber: string;
    pleaseSelect: string;
    with: string;
    of: string;
  };
  search: {
    title: string;
    placeholder: string;
    searchTitle: string;
    searchSubtitle: string;
    tips: string;
    tip1: string;
    tip2: string;
    tip3: string;
    tip4: string;
    resultsFor: string;
    noResults: string;
    searching: string;
    tapToView: string;
  };
  menu: {
    title: string;
    settings: string;
    navigate: string;
    fontSize: string;
    language: string;
    smaller: string;
    larger: string;
    preview: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
  about: {
    title: string;
    subtitle: string;
    appInfo: string;
    privacyTitle: string;
    localOnly: string;
    dataStored: string;
    noTracking: string;
    privacyPolicy: string;
    openPolicy: string;
    version: string;
    packageId: string;
    author: string;
    totalVerses: string;
    hostingHint: string;
    complianceTitle: string;
    playStoreReady: string;
    releaseNote: string;
  };
  common: {
    loading: string;
    error: string;
    cancel: string;
    ok: string;
    save: string;
  };
}

const translations: Record<LanguageCode, Translations> = {
  en: {
    home: {
      title: 'Bhaktamar Stotra',
      startReading: 'Start Reading',
      browseVerses: 'Browse All Verses',
      samputReading: 'Om Samputt Reading',
      searchVerses: 'Search Verses',
      loading: 'Loading Bhaktamar Stotra...',
    },
    navigation: {
      back: 'Back',
      menu: 'Menu',
      home: 'Home',
      about: 'About & Privacy',
    },
    verseList: {
      title: 'All Verses',
      searchPlaceholder: 'Search verses...',
      versesFound: 'verses found',
      verse: 'verse',
      verses: 'verses',
    },
    verseDetail: {
      verse: 'Verse',
      page: 'Page',
      sanskrit: 'Sanskrit',
      transliteration: 'Transliteration',
      hindi: 'Hindi',
      english: 'English',
    },
    samputt: {
      title: 'Samputt Reading',
      selection: 'Samputt Selection',
      whatIs: 'What is Samputt?',
      description: 'Samputt is a spiritual practice where a selected verse is repeated between each verse of the Bhaktamar Stotra. This creates a rhythmic pattern that enhances meditation and devotion.',
      selectVerse: 'Select Samputt Verse',
      enterNumber: 'Enter verse number (1-48)',
      quickSelect: 'Quick Select',
      start: 'Start Samputt Reading',
      invalidNumber: 'Invalid Number',
      pleaseSelect: 'Please select a verse number between 1 and 48',
      with: 'With Verse',
      of: 'of',
    },
    search: {
      title: 'Search Verses',
      placeholder: 'Search verses, meanings, or verse numbers...',
      searchTitle: 'Search Bhaktamar Stotra',
      searchSubtitle: 'Find verses by keywords in Sanskrit, Hindi, English, or transliteration',
      tips: 'Search Tips:',
      tip1: '- Try keywords like "devotion", "protection", "peace"',
      tip2: '- Search verse numbers directly (for example "5" or "verse 10")',
      tip3: '- Use Sanskrit terms like "भक्ति", "शांति", "मोक्ष"',
      tip4: '- Enable advanced options for precise searches',
      resultsFor: 'Results for',
      noResults: 'No verses found',
      searching: 'Searching...',
      tapToView: 'Tap to view full verse',
    },
    menu: {
      title: 'Menu',
      settings: 'Reading settings',
      navigate: 'Navigate',
      fontSize: 'Font Size',
      language: 'Language',
      smaller: 'Smaller',
      larger: 'Larger',
      preview: 'Preview:',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      extraLarge: 'Extra Large',
    },
    about: {
      title: 'About & Privacy',
      subtitle: 'Release readiness and data handling',
      appInfo: 'Application Info',
      privacyTitle: 'Privacy & Data Safety',
      localOnly: 'This app is designed to work offline and does not send devotional content or personal data to a backend service.',
      dataStored: 'Only your on-device reading preferences, such as language and font size, are stored locally using AsyncStorage.',
      noTracking: 'No analytics, ads, account creation, cloud sync, or sensitive runtime permissions are used in the current implementation.',
      privacyPolicy: 'Privacy policy URL',
      openPolicy: 'Open hosted privacy policy',
      version: 'Version',
      packageId: 'Package ID',
      author: 'Author',
      totalVerses: 'Total Verses',
      hostingHint: 'Host privacy-policy.html before store submission',
      complianceTitle: 'Android Release Notes',
      playStoreReady: 'Google Play submission still requires a hosted privacy-policy URL, final screenshots, a signed AAB, Play App Signing, and a completed Data safety declaration.',
      releaseNote: 'This screen is now the in-app privacy reference required by Play policy. Replace the placeholder contact details in privacy-policy.html before publishing.',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      cancel: 'Cancel',
      ok: 'OK',
      save: 'Save',
    },
  },
  hi: {
    home: {
      title: 'भक्तामर स्तोत्र',
      startReading: 'पढ़ना शुरू करें',
      browseVerses: 'सभी श्लोक देखें',
      samputReading: 'ओम् संपुट पाठ',
      searchVerses: 'श्लोक खोजें',
      loading: 'भक्तामर स्तोत्र लोड हो रहा है...',
    },
    navigation: {
      back: 'वापस',
      menu: 'मेनू',
      home: 'होम',
      about: 'जानकारी और गोपनीयता',
    },
    verseList: {
      title: 'सभी श्लोक',
      searchPlaceholder: 'श्लोक खोजें...',
      versesFound: 'श्लोक मिले',
      verse: 'श्लोक',
      verses: 'श्लोक',
    },
    verseDetail: {
      verse: 'श्लोक',
      page: 'पृष्ठ',
      sanskrit: 'संस्कृत',
      transliteration: 'लिप्यंतरण',
      hindi: 'हिंदी',
      english: 'अंग्रेज़ी',
    },
    samputt: {
      title: 'संपुट पाठ',
      selection: 'संपुट चयन',
      whatIs: 'संपुट क्या है?',
      description: 'संपुट एक आध्यात्मिक अभ्यास है जिसमें भक्तामर स्तोत्र के प्रत्येक श्लोक के बीच एक चयनित श्लोक दोहराया जाता है। यह ध्यान और भक्ति को गहरा करने वाला लयबद्ध पाठ बनाता है।',
      selectVerse: 'संपुट श्लोक चुनें',
      enterNumber: 'श्लोक संख्या दर्ज करें (1-48)',
      quickSelect: 'त्वरित चयन',
      start: 'संपुट पाठ शुरू करें',
      invalidNumber: 'अमान्य संख्या',
      pleaseSelect: 'कृपया 1 से 48 के बीच एक श्लोक संख्या चुनें',
      with: 'श्लोक के साथ',
      of: 'का',
    },
    search: {
      title: 'श्लोक खोजें',
      placeholder: 'श्लोक, अर्थ, या श्लोक संख्या खोजें...',
      searchTitle: 'भक्तामर स्तोत्र खोजें',
      searchSubtitle: 'संस्कृत, हिंदी, अंग्रेज़ी या लिप्यंतरण में शब्दों द्वारा श्लोक खोजें',
      tips: 'खोज सुझाव:',
      tip1: '- "भक्ति", "सुरक्षा", "शांति" जैसे शब्द आजमाएं',
      tip2: '- सीधे श्लोक संख्या खोजें, जैसे "5" या "श्लोक 10"',
      tip3: '- संस्कृत शब्द जैसे "भक्ति", "शांति", "मोक्ष" उपयोग करें',
      tip4: '- सटीक खोज के लिए उन्नत विकल्प चालू करें',
      resultsFor: 'के लिए परिणाम',
      noResults: 'कोई श्लोक नहीं मिला',
      searching: 'खोज जारी है...',
      tapToView: 'पूरा श्लोक देखने के लिए टैप करें',
    },
    menu: {
      title: 'मेनू',
      settings: 'पाठ सेटिंग्स',
      navigate: 'नेविगेशन',
      fontSize: 'फ़ॉन्ट आकार',
      language: 'भाषा',
      smaller: 'छोटा',
      larger: 'बड़ा',
      preview: 'पूर्वावलोकन:',
      small: 'छोटा',
      medium: 'मध्यम',
      large: 'बड़ा',
      extraLarge: 'अतिरिक्त बड़ा',
    },
    about: {
      title: 'जानकारी और गोपनीयता',
      subtitle: 'रिलीज़ तैयारी और डेटा उपयोग',
      appInfo: 'एप्लिकेशन जानकारी',
      privacyTitle: 'गोपनीयता और डेटा सुरक्षा',
      localOnly: 'यह ऐप ऑफलाइन उपयोग के लिए बनाया गया है और किसी सर्वर पर व्यक्तिगत या devotional डेटा नहीं भेजता।',
      dataStored: 'केवल भाषा और फ़ॉन्ट आकार जैसी आपकी पढ़ने की पसंद AsyncStorage के माध्यम से आपके डिवाइस पर स्थानीय रूप से सहेजी जाती है।',
      noTracking: 'वर्तमान संस्करण में कोई analytics, विज्ञापन, account creation, cloud sync या sensitive runtime permission नहीं है।',
      privacyPolicy: 'गोपनीयता नीति URL',
      openPolicy: 'होस्ट की गई गोपनीयता नीति खोलें',
      version: 'संस्करण',
      packageId: 'पैकेज आईडी',
      author: 'लेखक',
      totalVerses: 'कुल श्लोक',
      hostingHint: 'स्टोर सबमिशन से पहले privacy-policy.html होस्ट करें',
      complianceTitle: 'Android रिलीज़ नोट्स',
      playStoreReady: 'Google Play पर प्रकाशित करने के लिए अभी भी hosted privacy-policy URL, अंतिम screenshots, signed AAB, Play App Signing और Data safety declaration की आवश्यकता होगी।',
      releaseNote: 'यह स्क्रीन अब Play नीति के लिए in-app privacy reference है। प्रकाशित करने से पहले privacy-policy.html में placeholder contact details बदलें।',
    },
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      cancel: 'रद्द करें',
      ok: 'ठीक है',
      save: 'सहेजें',
    },
  },
};

interface LanguageContextType {
  language: LanguageCode;
  t: Translations;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LANGUAGE_STORAGE_KEY = '@bhaktamar_language';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage === 'en' || savedLanguage === 'hi') {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    }
  };

  const saveLanguage = async (lang: LanguageCode) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

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
