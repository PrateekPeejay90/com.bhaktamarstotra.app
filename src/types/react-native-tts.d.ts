declare module 'react-native-tts' {
  type TtsEvent = 'tts-start' | 'tts-finish' | 'tts-cancel' | 'tts-progress';

  interface TtsEventListener {
    remove(): void;
  }

  const Tts: {
    setDefaultLanguage(language: string): Promise<void>;
    setDefaultRate(value: number, skipEvents?: boolean): void;
    setDefaultPitch(value: number): void;
    speak(text: string): void;
    stop(): void;
    addEventListener(event: TtsEvent, callback: (event: any) => void): TtsEventListener;
  };

  export default Tts;
}
