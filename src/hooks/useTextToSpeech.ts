import { useCallback, useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import Tts from 'react-native-tts';
import { ttsService } from '../services/ttsService';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      await ttsService.init();
      if (isMounted) {
        setIsReady(true);
      }
    };

    init();

    const startListener = Tts.addEventListener('tts-start', () => {
      setIsSpeaking(true);
    });

    const finishListener = Tts.addEventListener('tts-finish', () => {
      setIsSpeaking(false);
    });

    const cancelListener = Tts.addEventListener('tts-cancel', () => {
      setIsSpeaking(false);
    });

    return () => {
      isMounted = false;
      startListener.remove();
      finishListener.remove();
      cancelListener.remove();
    };
  }, []);

  const speak = useCallback(async (text: string, announcement?: string, rate?: number) => {
    if (!text) {
      return;
    }

    if (announcement) {
      AccessibilityInfo.announceForAccessibility(announcement);
    }

    if (!isReady) {
      await ttsService.init();
      setIsReady(true);
    }

    ttsService.speak(text, rate);
  }, [isReady]);

  const stop = useCallback(() => {
    ttsService.stop();
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    isReady,
  };
};
