import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslate = () => {
  useEffect(() => {
    // Enhanced styles for better integration and RTL support
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        /* Hide Google Translate banner completely */
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        
        body {
          top: 0px !important;
        }
        
        .goog-te-banner-frame {
          display: none !important;
        }
        
        /* Main container styling with better mobile support */
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 14px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        /* Dropdown styling to match site design with enhanced mobile visibility */
        .goog-te-gadget .goog-te-combo {
          background-color: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          padding: 8px 12px 8px 8px !important;
          font-size: 14px !important;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          color: #111111 !important;
          min-height: 44px !important;
          min-width: 140px !important;
          max-width: 200px !important;
          cursor: pointer !important;
          outline: none !important;
          transition: all 0.2s ease !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1000 !important;
        }
        
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #9ca3af !important;
          background-color: #f9fafb !important;
        }
        
        .goog-te-gadget .goog-te-combo:focus {
          border-color: #0B2B4C !important;
          box-shadow: 0 0 0 2px rgba(11, 43, 76, 0.1) !important;
        }
        
        /* Dropdown options styling */
        .goog-te-gadget .goog-te-combo option {
          background-color: white !important;
          color: #111111 !important;
          padding: 8px 12px !important;
          font-family: inherit !important;
        }
        
        .goog-te-gadget .goog-te-combo option:hover {
          background-color: #f3f4f6 !important;
        }
        
        /* Remove Google branding and customize placeholder */
        .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value:before {
          content: '🌐 Select Language' !important;
          color: #6b7280 !important;
          font-family: inherit !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value span {
          color: #111111 !important;
        }
        
        /* Hide the "powered by" text */
        .goog-te-gadget .goog-te-combo option[value=""] {
          display: none !important;
        }
        
        /* RTL language support */
        html[dir="rtl"] .goog-te-gadget .goog-te-combo,
        [dir="rtl"] .goog-te-gadget .goog-te-combo {
          text-align: right !important;
          direction: rtl !important;
        }
        
        html[dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before,
        [dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'اختر اللغة 🌐' !important;
        }
        
        /* Mobile responsive design with enhanced visibility */
        @media (max-width: 640px) {
          .goog-te-gadget {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            min-width: 120px !important;
            max-width: 150px !important;
            font-size: 13px !important;
            padding: 6px 8px 6px 6px !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 1001 !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: '🌐 Language' !important;
          }
        }
        
        /* Tablet responsive with visibility fixes */
        @media (min-width: 641px) and (max-width: 1024px) {
          .goog-te-gadget {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            min-width: 130px !important;
            max-width: 180px !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 1001 !important;
          }
        }
        
        /* Desktop with enhanced visibility */
        @media (min-width: 1025px) {
          .goog-te-gadget {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 1001 !important;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .goog-te-gadget .goog-te-combo {
            border: 2px solid #000000 !important;
            background-color: #ffffff !important;
            color: #000000 !important;
          }
        }
        
        /* Focus styles for accessibility */
        .goog-te-gadget .goog-te-combo:focus-visible {
          outline: 2px solid #0B2B4C !important;
          outline-offset: 2px !important;
        }
        
        /* Force visibility on all devices */
        #google_translate_element {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          min-height: 44px !important;
          min-width: 120px !important;
        }
        
        #google_translate_element * {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        /* Ensure dropdown appears above other elements */
        .goog-te-gadget .goog-te-combo {
          position: relative !important;
          z-index: 9999 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize Google Translate with priority language order
    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            // Priority languages as specified, followed by others
            includedLanguages: 'zh-CN,es,hi,ar,bn,pt,ru,ja,pa,de,fr,sw,uk,pl,tr,it,nl,ko,th,vi,ms,id,tl,ur,fa,he,am,ha,yo,ig,zu,af,sq,eu,be,bg,ca,hr,cs,da,et,fi,gl,el,hu,is,ga,lv,lt,mk,mt,no,ro,sr,sk,sl,sv,cy,eo,la,jw,su,ceb,ny,hmn,ht,mg,mi,sm,haw,cy,yi,ug,ky,kk,uz,tg,mn,ne,si,my,km,lo,ka,gu,ta,te,kn,ml,or,pa,as,sd,ps,ku,az,hy,ka,mt,is,fo,lb',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
            gaTrack: false, // Disable Google Analytics tracking
            gaId: null
          },
          'google_translate_element'
        );
        
        // Add keyboard navigation support
        const translateElement = document.getElementById('google_translate_element');
        if (translateElement) {
          const combo = translateElement.querySelector('.goog-te-combo');
          if (combo) {
            combo.setAttribute('tabindex', '0');
            combo.setAttribute('role', 'combobox');
            combo.setAttribute('aria-expanded', 'false');
            combo.setAttribute('aria-haspopup', 'listbox');
            combo.setAttribute('aria-label', 'Select website language for translation');
            
            // Enhanced keyboard navigation
            combo.addEventListener('keydown', (e: any) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                (combo as HTMLElement).click();
              }
            });
          }
        }
      }
    };

    // Set up global function for Google Translate callback
    window.googleTranslateElementInit = () => {
      addCustomStyles();
      setTimeout(initializeGoogleTranslate, 100); // Small delay to ensure DOM is ready
    };

    // Load Google Translate script if not already loaded
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.google && window.google.translate) {
      // If script is already loaded, initialize directly
      setTimeout(() => window.googleTranslateElementInit(), 100);
    }

    // Add custom styles immediately
    addCustomStyles();

    // Monitor for language changes to update document direction for RTL languages
    const observeLanguageChanges = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
            const lang = document.documentElement.lang;
            const rtlLanguages = ['ar', 'he', 'ur', 'fa', 'ps', 'ku', 'sd', 'ug', 'yi'];
            
            if (rtlLanguages.some(rtlLang => lang.startsWith(rtlLang))) {
              document.documentElement.setAttribute('dir', 'rtl');
            } else {
              document.documentElement.setAttribute('dir', 'ltr');
            }
          }
        });
      });
      
      observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['lang'] 
      });
    };

    observeLanguageChanges();

    return () => {
      // Cleanup on component unmount
      const script = document.querySelector('script[src*="translate.google.com"]');
      const style = document.querySelector('style');
      if (script) script.remove();
      if (style) style.remove();
    };
  }, []);

    return (
      <div 
        id="google_translate_element" 
        aria-label="Website language selector"
        role="region"
        className="flex items-center justify-center"
        style={{ 
          minHeight: '44px', 
          minWidth: '120px',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          position: 'relative',
          zIndex: 1000
        }}
      />
    );
};