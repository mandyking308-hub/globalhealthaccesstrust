import React from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  // Additional languages
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },
  { code: 'eu', name: 'Basque', nativeName: 'Euskera' },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'gl', name: 'Galician', nativeName: 'Galego' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg' },
];

export const CustomLanguageSelector = () => {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    
    if (selectedLang !== 'en') {
      const translateUrl = `https://translate.google.com/translate?sl=en&tl=${selectedLang}&u=${encodeURIComponent(window.location.href)}`;
      window.location.href = translateUrl;
    } else {
      // Reset to original English version
      window.location.href = `${window.location.origin}${window.location.pathname}`;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-translate {
            text-align: center;
            margin: 14px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .custom-translate-label {
            color: #ffffff !important;
            font-size: 16px !important;
            font-family: inherit !important;
            font-weight: normal !important;
            margin: 0 !important;
            white-space: nowrap;
          }
          
          .custom-translate-select {
            background: #0a1a3f !important;
            color: #ffffff !important;
            border: 1px solid #ffffff !important;
            border-radius: 4px !important;
            padding: 10px 14px !important;
            font-size: 16px !important;
            font-family: inherit !important;
            min-width: 200px !important;
            max-width: 260px !important;
            cursor: pointer !important;
            outline: none !important;
          }
          
          .custom-translate-select:focus {
            border-color: #ffffff !important;
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2) !important;
          }
          
          .custom-translate-select option {
            background: #0a1a3f !important;
            color: #ffffff !important;
            padding: 8px 12px !important;
          }
          
          /* Tablet responsive fixes */
          @media (max-width: 1024px) {
            .custom-translate-select {
              width: 90% !important;
              font-size: 18px !important;
              padding: 12px 16px !important;
              min-width: auto !important;
              max-width: 400px !important;
            }
            
            .custom-translate-label {
              font-size: 18px !important;
            }
          }
          
          /* Mobile responsive fixes */
          @media (max-width: 768px) {
            .custom-translate {
              flex-direction: column !important;
              margin: 16px auto !important;
            }
            
            .custom-translate-label {
              display: block !important;
              margin-bottom: 8px !important;
              font-size: 18px !important;
            }
            
            .custom-translate-select {
              width: 100% !important;
              font-size: 18px !important;
              padding: 14px 18px !important;
              min-width: auto !important;
              max-width: 100% !important;
            }
          }
          
          /* RTL language support */
          html[dir="rtl"] .custom-translate-select,
          [dir="rtl"] .custom-translate-select {
            text-align: right !important;
            direction: rtl !important;
          }
          
          /* Portrait and landscape mode fixes */
          @media screen and (orientation: portrait) and (max-width: 768px) {
            .custom-translate-select {
              max-width: 90vw !important;
            }
          }
          
          @media screen and (orientation: landscape) and (max-width: 768px) {
            .custom-translate {
              flex-direction: row !important;
              gap: 12px !important;
            }
            
            .custom-translate-label {
              margin-bottom: 0 !important;
            }
            
            .custom-translate-select {
              max-width: 280px !important;
              font-size: 16px !important;
              padding: 10px 14px !important;
            }
          }
        `
      }} />
      <div className="custom-translate">
        <label 
          htmlFor="languageSelect" 
          className="custom-translate-label"
        >
          🌍 Translate this site:
        </label>
        <select
          id="languageSelect"
          onChange={handleLanguageChange}
          className="custom-translate-select"
          aria-label="Website language selector"
          defaultValue="en"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.nativeName} ({language.name})
            </option>
          ))}
        </select>
      </div>
    </>
  );
};