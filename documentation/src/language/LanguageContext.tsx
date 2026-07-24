import React, { createContext, useContext, useState, useEffect } from 'react';
import { es } from './es';
import { en } from './en';

export type Language = 'es' | 'en';

type TranslationsType = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getBrowserLanguage = (): Language => {
  try {
    const lang = navigator.language || (navigator as any).userLanguage || 'es';
    return lang.toLowerCase().startsWith('es') ? 'es' : 'en';
  } catch {
    return 'es';
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('signature_doc_lang');
      if (saved === 'es' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.warn('LocalStorage not accessible:', e);
    }
    return getBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('signature_doc_lang', lang);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  const t = language === 'es' ? es : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
