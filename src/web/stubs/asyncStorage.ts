type Callback<T> = (error?: Error | null, result?: T | null) => void;

const getStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    throw new Error('localStorage is not available in this environment.');
  }

  return window.localStorage;
};

const createPromise = <T>(action: () => T, callback?: Callback<T>) => {
  return new Promise<T>((resolve, reject) => {
    try {
      const result = action();
      callback?.(null, result);
      resolve(result);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      callback?.(err, null);
      reject(err);
    }
  });
};

const mergeValues = (currentValue: string | null, nextValue: string) => {
  if (!currentValue) {
    return nextValue;
  }

  try {
    const currentObject = JSON.parse(currentValue);
    const nextObject = JSON.parse(nextValue);

    if (
      typeof currentObject === 'object' &&
      currentObject !== null &&
      typeof nextObject === 'object' &&
      nextObject !== null
    ) {
      return JSON.stringify({ ...currentObject, ...nextObject });
    }
  } catch {
    return nextValue;
  }

  return nextValue;
};

const AsyncStorage = {
  getItem: (key: string, callback?: Callback<string | null>) =>
    createPromise(() => getStorage().getItem(key), callback),

  setItem: (key: string, value: string, callback?: Callback<void>) =>
    createPromise(() => getStorage().setItem(key, value), callback),

  removeItem: (key: string, callback?: Callback<void>) =>
    createPromise(() => getStorage().removeItem(key), callback),

  clear: (callback?: Callback<void>) => createPromise(() => getStorage().clear(), callback),

  getAllKeys: (callback?: Callback<string[]>) =>
    createPromise(() => {
      const storage = getStorage();
      const keys: string[] = [];

      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if (key) {
          keys.push(key);
        }
      }

      return keys;
    }, callback),

  mergeItem: (key: string, value: string, callback?: Callback<void>) =>
    createPromise(() => {
      const storage = getStorage();
      const mergedValue = mergeValues(storage.getItem(key), value);
      storage.setItem(key, mergedValue);
    }, callback),

  multiGet: (keys: string[], callback?: Callback<[string, string | null][]>) =>
    createPromise(
      () => keys.map(key => [key, getStorage().getItem(key)] as [string, string | null]),
      callback
    ),

  multiSet: (entries: [string, string][], callback?: Callback<void>) =>
    createPromise(() => {
      const storage = getStorage();
      entries.forEach(([key, value]) => {
        storage.setItem(key, value);
      });
    }, callback),

  multiRemove: (keys: string[], callback?: Callback<void>) =>
    createPromise(() => {
      const storage = getStorage();
      keys.forEach(key => {
        storage.removeItem(key);
      });
    }, callback),

  multiMerge: (entries: [string, string][], callback?: Callback<void>) =>
    createPromise(() => {
      const storage = getStorage();
      entries.forEach(([key, value]) => {
        const mergedValue = mergeValues(storage.getItem(key), value);
        storage.setItem(key, mergedValue);
      });
    }, callback),

  flushGetRequests: () => undefined,
};

export const useAsyncStorage = (key: string) => ({
  getItem: () => AsyncStorage.getItem(key),
  setItem: (value: string) => AsyncStorage.setItem(key, value),
  mergeItem: (value: string) => AsyncStorage.mergeItem(key, value),
  removeItem: () => AsyncStorage.removeItem(key),
});

export default AsyncStorage;
