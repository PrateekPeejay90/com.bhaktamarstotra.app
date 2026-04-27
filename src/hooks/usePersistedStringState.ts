import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usePersistedStringState = <T extends string>(
  storageKey: string,
  defaultValue: T,
  allowedValues: readonly T[],
  valueLabel: string,
): readonly [T, (nextValue: T) => void] => {
  const [value, setValue] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    let isMounted = true;

    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(storageKey);
        if (storedValue && allowedValues.includes(storedValue as T) && isMounted) {
          setValue(storedValue as T);
        }
      } catch (error) {
        console.log(`Error loading ${valueLabel}:`, error);
      }
    };

    loadValue();

    return () => {
      isMounted = false;
    };
  }, [allowedValues, storageKey, valueLabel]);

  const setPersistedValue = (nextValue: T) => {
    setValue(nextValue);
    AsyncStorage.setItem(storageKey, nextValue).catch((error) => {
      console.log(`Error saving ${valueLabel}:`, error);
    });
  };

  return [value, setPersistedValue] as const;
};
