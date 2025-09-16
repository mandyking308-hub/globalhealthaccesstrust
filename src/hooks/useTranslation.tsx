import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LANGUAGES } from '@/lib/constants';

type Language = typeof LANGUAGES[number];

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (text: string) => string;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Simple auto-translation function (placeholder - in production would use Google Translate API)
const autoTranslate = async (text: string, targetLanguage: string): Promise<string> => {
  // For now, return original text for English, placeholder for others
  if (targetLanguage === 'en') return text;
  
  // This would call Google Translate API in production
  // For demo purposes, we'll return a simple placeholder
  return `[${targetLanguage.toUpperCase()}] ${text}`;
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);
  const [translationCache, setTranslationCache] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      const language = LANGUAGES.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
        document.dir = language.rtl ? 'rtl' : 'ltr';
        document.documentElement.lang = language.code;
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    document.dir = language.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language.code;
    localStorage.setItem('preferred-language', language.code);
  };

  const translate = (text: string): string => {
    if (currentLanguage.code === 'en') return text;
    
    // Check cache first
    const cacheKey = `${text}-${currentLanguage.code}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey][currentLanguage.code] || text;
    }

    // For demo purposes, return placeholder translation
    // In production, this would use Google Translate API
    const languageMap: Record<string, string> = {
      'es': `[ES] ${text}`,
      'fr': `[FR] ${text}`,
      'de': `[DE] ${text}`,
      'ar': `[AR] ${text}`,
      'zh-hans': `[中文] ${text}`,
      'hi': `[हिं] ${text}`,
      'pt': `[PT] ${text}`,
      'ru': `[RU] ${text}`,
      'ja': `[日本] ${text}`,
      'sw': `[SW] ${text}`,
      'bn': `[বাং] ${text}`,
      'it': `[IT] ${text}`,
      'pt-br': `[PT-BR] ${text}`,
      'he': `[עב] ${text}`,
      'ur': `[اردو] ${text}`
    };

    return languageMap[currentLanguage.code] || text;
  };

  return (
    <TranslationContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage, 
        translate, 
        isRTL: currentLanguage.rtl 
      }}
    >
      <div dir={currentLanguage.rtl ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};