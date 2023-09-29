import { useState } from 'react';

type LocalStorageValue<T> = T | null;

function getLocalStorageValue<T>(key: string): LocalStorageValue<T> {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
}

function setLocalStorageValue<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeLocalStorageValue(key: string) {
    localStorage.removeItem(key);
}

function useLocalStorage<T>(key: string, initialValue: T): [LocalStorageValue<T>, (value: T) => void, () => void] {
    const [storedValue, setStoredValue] = useState<LocalStorageValue<T>>(() => {
        const initialValueFromLocalStorage = getLocalStorageValue<T>(key);
        return initialValueFromLocalStorage !== null ? initialValueFromLocalStorage : initialValue;
    });

    const setValue = (value: T) => {
        setStoredValue(value);
        setLocalStorageValue(key, value);
    };

    const clearValue = () => {
        setStoredValue(null);
        removeLocalStorageValue(key);
    };

    return [storedValue, setValue, clearValue];
}

export default useLocalStorage;
