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
  private enabled = Boolean(Tts && typeof Tts.setDefaultRate === 'function');

  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (!this.enabled) {
      this.initialized = true;
      return;
    }

    try {
      Tts.setDefaultRate(DEFAULT_RATE);
      Tts.setDefaultPitch(DEFAULT_PITCH);
    } catch (error) {
      // ignore if native module is not fully available yet
    }

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
    if (!this.enabled) {
      return;
    }

    try {
      if (rate !== undefined) {
        Tts.setDefaultRate(rate);
      } else {
        Tts.setDefaultRate(DEFAULT_RATE);
      }
      Tts.stop();
      Tts.speak(text);
    } catch (error) {
      // gracefully ignore TTS errors
    }
  }

  stop(): void {
    if (!this.enabled) {
      return;
    }

    try {
      Tts.stop();
    } catch (error) {
      // ignore stop errors when module is unavailable
    }
  }
}

export const ttsService = new TtsService();
