import { createContext, useContext, useState, ReactNode } from 'react';
import { LANGUAGES } from '@/lib/constants';

type Language = typeof LANGUAGES[number];

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, fallback: string) => string;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Simple translation dictionary for key pages
const translations: Record<string, Record<string, string>> = {
  // Navigation
  'nav.home': {
    'en': 'Home',
    'es': 'Inicio',
    'fr': 'Accueil', 
    'de': 'Startseite',
    'ar': 'الرئيسية',
    'zh-hans': '首页',
    'hi': 'होम',
    'pt': 'Início',
    'ru': 'Главная'
  },
  'nav.about': {
    'en': 'About',
    'es': 'Acerca de',
    'fr': 'À propos',
    'de': 'Über uns',
    'ar': 'حول',
    'zh-hans': '关于',
    'hi': 'के बारे में',
    'pt': 'Sobre',
    'ru': 'О нас'
  },
  'nav.what-we-do': {
    'en': 'What We Do',
    'es': 'Qué Hacemos',
    'fr': 'Ce que nous faisons',
    'de': 'Was wir tun',
    'ar': 'ما نقوم به',
    'zh-hans': '我们的工作',
    'hi': 'हम क्या करते हैं',
    'pt': 'O que fazemos',
    'ru': 'Чем мы занимаемся'
  },
  'nav.contact': {
    'en': 'Contact',
    'es': 'Contacto',
    'fr': 'Contact',
    'de': 'Kontakt',
    'ar': 'اتصل بنا',
    'zh-hans': '联系我们',
    'hi': 'संपर्क',
    'pt': 'Contato',
    'ru': 'Контакт'
  },
  // Hero section
  'hero.title': {
    'en': 'Access to health is justice — not charity.',
    'es': 'El acceso a la salud es justicia, no caridad.',
    'fr': 'L\'accès à la santé est justice — pas charité.',
    'de': 'Zugang zur Gesundheit ist Gerechtigkeit — keine Wohltätigkeit.',
    'ar': 'الوصول إلى الصحة عدالة — وليس صدقة.',
    'zh-hans': '获得健康是正义——而非慈善。',
    'hi': 'स्वास्थ्य तक पहुंच न्याय है — दान नहीं।',
    'pt': 'O acesso à saúde é justiça — não caridade.',
    'ru': 'Доступ к здравоохранению — это справедливость, а не благотворительность.'
  },
  'hero.subtitle': {
    'en': 'The Global Health Access Trust upholds the sacred obligation to protect human dignity through healthcare access, without border, bias, or exclusion.',
    'es': 'El Global Health Access Trust defiende la obligación sagrada de proteger la dignidad humana a través del acceso a la atención médica, sin fronteras, prejuicios o exclusión.',
    'fr': 'Le Global Health Access Trust respecte l\'obligation sacrée de protéger la dignité humaine par l\'accès aux soins de santé, sans frontière, préjugé ou exclusion.',
    'de': 'Das Global Health Access Trust hält die heilige Verpflichtung aufrecht, die Menschenwürde durch Gesundheitszugang zu schützen, ohne Grenzen, Vorurteile oder Ausschluss.',
    'ar': 'يحافظ صندوق الوصول الصحي العالمي على الالتزام المقدس بحماية كرامة الإنسان من خلال الوصول إلى الرعاية الصحية، دون حدود أو تحيز أو استبعاد.',
    'zh-hans': '全球健康准入信托基金秉持保护人类尊严的神圣义务，通过医疗服务的获得，不分边界、偏见或排斥。',
    'hi': 'ग्लोबल हेल्थ एक्सेस ट्रस्ट स्वास्थ्य सेवा पहुंच के माध्यम से मानवीय गरिमा की रक्षा के पवित्र दायित्व को बनाए रखता है, बिना सीमा, पूर्वाग्रह या बहिष्करण के।',
    'pt': 'O Global Health Access Trust mantém a obrigação sagrada de proteger a dignidade humana através do acesso aos cuidados de saúde, sem fronteiras, preconceitos ou exclusão.',
    'ru': 'Глобальный фонд доступа к здравоохранению поддерживает священную обязанность защищать человеческое достоинство через доступ к здравоохранению, без границ, предрассудков или исключений.'
  }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Update document direction for RTL languages
    document.dir = language.rtl ? 'rtl' : 'ltr';
    // Store in localStorage
    localStorage.setItem('preferred-language', language.code);
  };

  const translate = (key: string, fallback: string): string => {
    const translationSet = translations[key];
    if (!translationSet) return fallback;
    
    return translationSet[currentLanguage.code] || translationSet['en'] || fallback;
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
      {children}
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