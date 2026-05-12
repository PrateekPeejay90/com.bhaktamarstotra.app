import { Platform } from 'react-native';
import Tts from 'react-native-tts';

const DEFAULT_RATE = 0.35;
const DEFAULT_PITCH = 1.0;
const PRIMARY_LANGUAGE = 'sa';

const FALLBACK_LANGUAGES = Platform.select({
  ios: ['hi-IN', 'hi'],
  android: ['hi-IN', 'hi'],
  default: ['hi'],
}) ?? ['hi'];

class TtsService {
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    Tts.setDefaultRate(DEFAULT_RATE);
    Tts.setDefaultPitch(DEFAULT_PITCH);

    const languages = [PRIMARY_LANGUAGE, ...FALLBACK_LANGUAGES];

    for (const language of languages) {
      try {
        await Tts.setDefaultLanguage(language);
        this.initialized = true;
        break;
      } catch (error) {
        // try next fallback language
      }
    }

    this.initialized = true;
  }

  async speak(text: string, rate?: number): Promise<void> {
    if (!text) {
      return;
    }

    await this.init();
    if (rate !== undefined) {
      Tts.setDefaultRate(rate);
    } else {
      Tts.setDefaultRate(DEFAULT_RATE);
    }

    Tts.stop();
    Tts.speak(text);
  }

  stop(): void {
    Tts.stop();
  }
}

export const ttsService = new TtsService();
