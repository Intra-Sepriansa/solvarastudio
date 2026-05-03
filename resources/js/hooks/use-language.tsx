import { useSyncExternalStore } from 'react';

export type Language = 'id' | 'en';

export type UseLanguageReturn = {
    readonly language: Language;
    readonly updateLanguage: (language: Language) => void;
    readonly toggleLanguage: () => void;
};

const listeners = new Set<() => void>();

const isLanguage = (value: string | null): value is Language =>
    value === 'id' || value === 'en';

const getStoredLanguage = (): Language => {
    if (typeof window === 'undefined') {
        return 'id';
    }

    const storedLanguage = localStorage.getItem('language');

    return isLanguage(storedLanguage) ? storedLanguage : 'id';
};

let currentLanguage: Language = getStoredLanguage();

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

export function useLanguage(): UseLanguageReturn {
    const language = useSyncExternalStore<Language>(
        subscribe,
        () => currentLanguage,
        () => 'id',
    );

    const updateLanguage = (nextLanguage: Language): void => {
        currentLanguage = nextLanguage;

        if (typeof window !== 'undefined') {
            localStorage.setItem('language', nextLanguage);
        }

        setCookie('language', nextLanguage);
        notify();
    };

    const toggleLanguage = (): void => {
        const nextLanguage: Language = language === 'id' ? 'en' : 'id';

        updateLanguage(nextLanguage);
    };

    return { language, updateLanguage, toggleLanguage } as const;
}
