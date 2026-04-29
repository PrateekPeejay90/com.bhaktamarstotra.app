export type LanguageCode = 'en' | 'hi';

export interface Translations {
  home: {
    title: string;
    startReading: string;
    browseVerses: string;
    samputReading: string;
    history: string;
    searchVerses: string;
    loading: string;
  };
  navigation: {
    back: string;
    menu: string;
    home: string;
    previous: string;
    next: string;
  };
  verseList: {
    title: string;
    searchPlaceholder: string;
    goToVerse: string;
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
    hindiMeaning: string;
    english: string;
    englishMeaning: string;
  };
  samputt: {
    title: string;
    selection: string;
    whatIs: string;
    description: string;
    detailsIntro: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    selectVerse: string;
    enterNumber: string;
    quickSelect: string;
    start: string;
    invalidNumber: string;
    pleaseSelect: string;
    with: string;
    of: string;
    examplePattern: string;
    exampleSequence: string;
    chooseVerseNumber: string;
    searchByWords: string;
    searchHelp: string;
    searchPlaceholder: string;
    tapToSelect: string;
    selectedVersePreview: string;
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
    searchIn: string;
    caseSensitive: string;
    exactMatch: string;
    match: string;
  };
  menu: {
    title: string;
    settings: string;
    navigate: string;
    privacyPolicy: string;
    privacySummary: string;
    privacyContact: string;
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
  history: {
    title: string;
    subtitle: string;
    heading: string;
  };
  common: {
    loading: string;
    error: string;
    cancel: string;
    ok: string;
    save: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    home: {
      title: 'Bhaktamar Stotra',
      startReading: 'Start Reading',
      browseVerses: 'Browse All Verses',
      samputReading: 'Start Samputt',
      history: 'History of Bhaktamar Stotra',
      searchVerses: 'Search Verses',
      loading: 'Loading Bhaktamar Stotra...',
    },
    navigation: {
      back: 'Back',
      menu: 'Menu',
      home: 'Home',
      previous: 'Previous',
      next: 'Next',
    },
    verseList: {
      title: 'All Verses',
      searchPlaceholder: 'Search or enter verse number...',
      goToVerse: 'Go to Verse',
      versesFound: 'found',
      verse: 'verse',
      verses: 'verses',
    },
    verseDetail: {
      verse: 'Verse',
      page: 'Page',
      sanskrit: 'Sanskrit',
      transliteration: 'Transliteration',
      hindi: 'Hindi',
      hindiMeaning: 'Hindi Meaning',
      english: 'English',
      englishMeaning: 'English Meaning',
    },
    samputt: {
      title: 'Samputt Reading',
      selection: 'Samputt Selection',
      whatIs: 'What is Samputt?',
      description: 'Samputt is a spiritual practice where a selected verse is repeated between each verse of the Bhaktamar Stotra. This creates a rhythmic pattern that enhances meditation and devotion.',
      detailsIntro: 'Each verse in Bhaktamar Stotra has its own meaning and benefits. In Samputt:',
      benefit1: '1. You increase your concentration by reading it.',
      benefit2: '2. The verse you select for Samputt gets repeated 48 times, increasing its effect.',
      benefit3: '3. It is all about the verse, its pronunciation, and the vibration it creates.',
      selectVerse: 'Select Samputt Verse',
      enterNumber: 'Enter verse number',
      quickSelect: 'Quick Select',
      start: 'Start Samputt',
      invalidNumber: 'Invalid Number',
      pleaseSelect: 'Please select a verse number between 1 and 48',
      with: 'With Verse',
      of: 'of',
      examplePattern: 'Example Pattern',
      exampleSequence: 'Select verse 20 -> Pattern: 1->20->2->20->3->20...->48->20',
      chooseVerseNumber: 'Choose a verse number',
      searchByWords: 'Search Verse By Words',
      searchHelp: 'Search by verse number or by words from the verse, transliteration, or meaning.',
      searchPlaceholder: 'Enter verse number or search for Samputt...',
      tapToSelect: 'Tap to select this verse for Samputt',
      selectedVersePreview: 'Selected Verse Preview',
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
      searchIn: 'Search In',
      caseSensitive: 'Case Sensitive',
      exactMatch: 'Exact Match',
      match: 'match',
    },
    menu: {
      title: 'Menu',
      settings: 'Reading settings',
      navigate: 'Navigate',
      privacyPolicy: 'Privacy Policy',
      privacySummary: 'Bhaktamar Stotra does not collect, transmit, sell, or share personal data. Only your selected language and font-size preference are stored locally on your device.',
      privacyContact: 'Privacy contact: prateekpeejay@gmail.com',
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
    history: {
      title: 'Bhaktamar History',
      subtitle: 'Historical background',
      heading: 'Historical Background of Bhaktamar Mantra',
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
      samputReading: 'संपुट शुरू करें',
      history: 'भक्तामर स्तोत्र का इतिहास',
      searchVerses: 'श्लोक खोजें',
      loading: 'भक्तामर स्तोत्र लोड हो रहा है...',
    },
    navigation: {
      back: 'वापस',
      menu: 'मेनू',
      home: 'होम',
      previous: 'पिछला',
      next: 'अगला',
    },
    verseList: {
      title: 'सभी श्लोक',
      searchPlaceholder: 'खोजें या श्लोक संख्या दर्ज करें...',
      goToVerse: 'श्लोक पर जाएं',
      versesFound: 'मिले',
      verse: 'श्लोक',
      verses: 'श्लोक',
    },
    verseDetail: {
      verse: 'श्लोक',
      page: 'पृष्ठ',
      sanskrit: 'संस्कृत',
      transliteration: 'लिप्यंतरण',
      hindi: 'हिंदी',
      hindiMeaning: 'हिंदी अर्थ',
      english: 'अंग्रेज़ी',
      englishMeaning: 'अंग्रेज़ी अर्थ',
    },
    samputt: {
      title: 'संपुट पाठ',
      selection: 'संपुट चयन',
      whatIs: 'संपुट क्या है?',
      description: 'संपुट एक आध्यात्मिक अभ्यास है जिसमें भक्तामर स्तोत्र के प्रत्येक श्लोक के बीच एक चयनित श्लोक दोहराया जाता है। यह ध्यान और भक्ति को गहरा करने वाला लयबद्ध पाठ बनाता है।',
      detailsIntro: 'भक्तामर स्तोत्र के प्रत्येक श्लोक का अपना अर्थ और लाभ है। संपुट में:',
      benefit1: '1. इसे पढ़ने से एकाग्रता बढ़ती है।',
      benefit2: '2. संपुट के लिए चुना गया श्लोक 48 बार दोहराया जाता है, जिससे उसका प्रभाव बढ़ता है।',
      benefit3: '3. यह श्लोक, उसके उच्चारण और उससे उत्पन्न होने वाली ध्वनि-तरंगों पर आधारित साधना है।',
      selectVerse: 'संपुट श्लोक चुनें',
      enterNumber: 'श्लोक संख्या दर्ज करें',
      quickSelect: 'त्वरित चयन',
      start: 'संपुट शुरू करें',
      invalidNumber: 'अमान्य संख्या',
      pleaseSelect: 'कृपया 1 से 48 के बीच एक श्लोक संख्या चुनें',
      with: 'श्लोक के साथ',
      of: 'का',
      examplePattern: 'उदाहरण क्रम',
      exampleSequence: 'श्लोक 20 चुनें -> क्रम: 1->20->2->20->3->20...->48->20',
      chooseVerseNumber: 'एक श्लोक संख्या चुनें',
      searchByWords: 'शब्दों से श्लोक खोजें',
      searchHelp: 'श्लोक संख्या या श्लोक, लिप्यंतरण अथवा अर्थ के शब्दों से खोजें।',
      searchPlaceholder: 'श्लोक संख्या दर्ज करें या खोजें...',
      tapToSelect: 'संपुट के लिए यह श्लोक चुनने हेतु टैप करें',
      selectedVersePreview: 'चयनित श्लोक पूर्वावलोकन',
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
      searchIn: 'इनमें खोजें',
      caseSensitive: 'अक्षर-संवेदी',
      exactMatch: 'सटीक मिलान',
      match: 'मिलान',
    },
    menu: {
      title: 'मेनू',
      settings: 'पाठ सेटिंग्स',
      navigate: 'नेविगेशन',
      privacyPolicy: 'गोपनीयता नीति',
      privacySummary: 'भक्तामर स्तोत्र आपका व्यक्तिगत डेटा collect, transmit, sell या share नहीं करता। केवल आपकी चुनी हुई भाषा और फ़ॉन्ट आकार की पसंद आपके डिवाइस पर स्थानीय रूप से सहेजी जाती है।',
      privacyContact: 'गोपनीयता संपर्क: prateekpeejay@gmail.com',
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
    history: {
      title: 'भक्तामर इतिहास',
      subtitle: 'ऐतिहासिक पृष्ठभूमि',
      heading: 'भक्तामर मंत्र का ऐतिहासिक परिचय',
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
