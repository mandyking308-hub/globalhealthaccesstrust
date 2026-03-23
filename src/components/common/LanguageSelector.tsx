import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LANGUAGES } from "@/lib/constants";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

// Flag mapping for languages (using emoji flags as specified)
const LANGUAGE_FLAGS: Record<string, string> = {
  'en': '🇬🇧',
  'es': '🇪🇸', 
  'fr': '🇫🇷',
  'de': '🇩🇪',
  'it': '🇮🇹',
  'pt': '🇵🇹',
  'pt-br': '🇧🇷',
  'ru': '🇷🇺',
  'zh-hans': '🇨🇳',
  'zh-hant': '🇹🇼',
  'ja': '🇯🇵',
  'ko': '🇰🇷',
  'ar': '🇸🇦',
  'hi': '🇮🇳',
  'bn': '🇧🇩',
  'ur': '🇵🇰',
  'fa': '🇮🇷',
  'tr': '🇹🇷',
  'he': '🇮🇱',
  'th': '🇹🇭',
  'vi': '🇻🇳',
  'sw': '🇹🇿',
  'nl': '🇳🇱',
  'sv': '🇸🇪',
  'no': '🇳🇴',
  'da': '🇩🇰',
  'fi': '🇫🇮',
  'pl': '🇵🇱',
  'cs': '🇨🇿',
  'sk': '🇸🇰',
  'hu': '🇭🇺',
  'ro': '🇷🇴',
  'bg': '🇧🇬',
  'hr': '🇭🇷',
  'sr': '🇷🇸',
  'sl': '🇸🇮',
  'et': '🇪🇪',
  'lv': '🇱🇻',
  'lt': '🇱🇹',
  'uk': '🇺🇦',
  'be': '🇧🇾',
  'mk': '🇲🇰',
  'sq': '🇦🇱',
  'el': '🇬🇷',
  'ca': '🇪🇸', // Catalonia uses Spain flag
  'eu': '🇪🇸', // Basque uses Spain flag
  'gl': '🇪🇸', // Galician uses Spain flag
  'mt': '🇲🇹',
  'cy': '🏴󠁧󠁢󠁷󠁬󠁳󠁿', // Wales flag
  'ga': '🇮🇪',
  'is': '🇮🇸',
  'fo': '🇫🇴',
  'gd': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', // Scotland flag
  'br': '🇫🇷', // Breton uses France flag
  'co': '🇫🇷', // Corsican uses France flag
  'oc': '🇫🇷', // Occitan uses France flag
  'rm': '🇨🇭', // Romansh uses Switzerland flag
  'lb': '🇱🇺',
  'frp': '🇫🇷', // Franco-Provençal uses France flag
  'fur': '🇮🇹', // Friulian uses Italy flag
  'lij': '🇮🇹', // Ligurian uses Italy flag
  'lmo': '🇮🇹', // Lombard uses Italy flag
  'pms': '🇮🇹', // Piedmontese uses Italy flag
  'rgn': '🇮🇹', // Romagnol uses Italy flag
  'scn': '🇮🇹', // Sicilian uses Italy flag
  'vec': '🇮🇹', // Venetian uses Italy flag
  'wa': '🇧🇪', // Walloon uses Belgium flag
  'li': '🇳🇱', // Limburgish uses Netherlands flag
  'nds': '🇩🇪', // Low German uses Germany flag
  'bar': '🇩🇪', // Bavarian uses Germany flag
  'gsw': '🇨🇭', // Swiss German uses Switzerland flag
  'pdc': '🇺🇸', // Pennsylvania Dutch uses USA flag
  'ksh': '🇩🇪', // Kölsch uses Germany flag
  'stq': '🇩🇪', // Saterland Frisian uses Germany flag
  'fy': '🇳🇱', // West Frisian uses Netherlands flag
  'af': '🇿🇦',
  'zu': '🇿🇦',
  'xh': '🇿🇦',
  'ss': '🇸🇿',
  'st': '🇿🇦',
  'tn': '🇿🇦',
  've': '🇿🇦',
  'ts': '🇿🇦',
  'nr': '🇿🇦',
  'nso': '🇿🇦',
  'am': '🇪🇹',
  'ti': '🇪🇹',
  'om': '🇪🇹',
  'so': '🇸🇴',
  'ha': '🇳🇬',
  'ig': '🇳🇬',
  'yo': '🇳🇬',
  'ff': '🇸🇳', // Fulah uses Senegal flag
  'wo': '🇸🇳', // Wolof uses Senegal flag
  'bm': '🇲🇱', // Bambara uses Mali flag
  'dyu': '🇧🇫', // Dyula uses Burkina Faso flag
  'ee': '🇬🇭', // Ewe uses Ghana flag
  'tw': '🇬🇭', // Twi uses Ghana flag
  'ak': '🇬🇭', // Akan uses Ghana flag
  'lg': '🇺🇬', // Luganda uses Uganda flag
  'rw': '🇷🇼',
  'rn': '🇧🇮',
  'ny': '🇲🇼', // Chewa uses Malawi flag
  'sn': '🇿🇼', // Shona uses Zimbabwe flag
  'nd': '🇿🇼', // North Ndebele uses Zimbabwe flag
  'mg': '🇲🇬',
  'ms': '🇲🇾',
  'id': '🇮🇩',
  'jv': '🇮🇩', // Javanese uses Indonesia flag
  'su': '🇮🇩', // Sundanese uses Indonesia flag
  'mad': '🇮🇩', // Madurese uses Indonesia flag
  'ban': '🇮🇩', // Balinese uses Indonesia flag
  'bug': '🇮🇩', // Buginese uses Indonesia flag
  'bjn': '🇮🇩', // Banjarese uses Indonesia flag
  'ace': '🇮🇩', // Acehnese uses Indonesia flag
  'min': '🇮🇩', // Minangkabau uses Indonesia flag
  'rej': '🇮🇩', // Rejang uses Indonesia flag
  'tl': '🇵🇭',
  'ceb': '🇵🇭', // Cebuano uses Philippines flag
  'hil': '🇵🇭', // Hiligaynon uses Philippines flag
  'war': '🇵🇭', // Waray uses Philippines flag
  'pam': '🇵🇭' // Kapampangan uses Philippines flag
};

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: (typeof LANGUAGES)[number]) => {
    setLanguage(language);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const currentFlag = LANGUAGE_FLAGS[currentLanguage.code] || '🌐';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center space-x-2 min-h-[44px] px-3 py-2 rounded-lg bg-accent/20 text-foreground hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Change language"
          onKeyDown={handleKeyDown}
        >
          <span 
            className="text-lg leading-none" 
            aria-hidden="true"
            style={{ fontSize: '18px', fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif' }}
          >
            {currentFlag}
          </span>
          <span className="hidden sm:inline font-medium">
            {currentLanguage.nativeName}
          </span>
          <span className="sm:hidden font-medium">
            {currentLanguage.code.toUpperCase()}
          </span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 max-h-96 overflow-y-auto bg-white border border-gray-300 shadow-lg z-50"
        role="listbox"
        onKeyDown={handleKeyDown}
        style={{ backgroundColor: 'white', border: '1px solid #d1d5db' }}
      >
        {LANGUAGES.map((language) => {
          const flag = LANGUAGE_FLAGS[language.code] || '🌐';
          const isSelected = language.code === currentLanguage.code;
          
          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`flex items-center space-x-3 py-3 px-3 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset text-black ${
                isSelected ? "font-bold border-l-3 border-primary bg-gray-50" : ""
              }`}
              role="option"
              aria-selected={isSelected}
              aria-current={isSelected ? "page" : undefined}
            >
              <a
                href={`/${language.code === 'en' ? '' : language.code + '/'}`}
                lang={language.code}
                hrefLang={language.code}
                className="flex items-center space-x-3 w-full text-black no-underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleLanguageChange(language);
                }}
              >
                <span 
                  className="text-lg leading-none flex-shrink-0" 
                  aria-hidden="true"
                  style={{ fontSize: '18px', fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif' }}
                >
                  {flag}
                </span>
                <span className="font-medium">
                  {language.nativeName}
                </span>
              </a>
            </DropdownMenuItem>
          );
        })}
        <div className="px-3 py-2 text-xs text-gray-600 border-t border-gray-300 mt-2 bg-white">
          <p>
            *Translations provided for convenience. 
            English version remains authoritative.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};