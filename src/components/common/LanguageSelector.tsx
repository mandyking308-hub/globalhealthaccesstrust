import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LANGUAGES } from "@/lib/constants";

export const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState<(typeof LANGUAGES)[number]>(LANGUAGES[0]);

  const handleLanguageChange = (language: (typeof LANGUAGES)[number]) => {
    setCurrentLanguage(language);
    // In a real implementation, this would trigger translation
    // For now, we'll just update the state
    console.log(`Language changed to: ${language.name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">🌐 {currentLanguage.name}</span>
          <span className="sm:hidden">🌐</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-96 overflow-y-auto">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`flex items-center space-x-3 ${
              language.code === currentLanguage.code ? "bg-accent" : ""
            }`}
          >
            <span className="text-lg">🌐</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
        <div className="px-2 py-1 text-xs text-muted-foreground border-t mt-2">
          <p>
            *Translations provided for convenience. 
            English version remains authoritative.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};