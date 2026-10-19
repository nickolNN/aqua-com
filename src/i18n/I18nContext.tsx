import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { en, es } from './translations';

export type Language = 'en' | 'es';

export interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translations: Record<Language, Record<string, unknown>> = { en, es };

  const t = (key: string): string => {
    const keys = key.split('.');
    let obj: Record<string, unknown> = translations[language];
    for (const k of keys) {
      if (obj && typeof obj === 'object' && k in obj) {
        obj = obj[k] as Record<string, unknown>;
      } else {
        return key;
      }
    }
    return typeof obj === 'string' ? obj : key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
