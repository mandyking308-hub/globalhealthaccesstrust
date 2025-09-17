import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslate = () => {
  useEffect(() => {
    // Add comprehensive styles for footer visibility
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.id = 'google-translate-footer-styles';
      style.innerHTML = `
        /* Force visibility and correct styling for footer */
        #google_translate_element {
          background: transparent !important; /* Blend into footer background */
          color: #ffffff !important;          /* White text for readability */
          font-family: inherit !important;    /* Match site font */
          font-size: 14px !important;         /* Uniform font size */
          display: inline-block !important;
          padding: 6px 10px !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1000 !important;
          width: auto !important;
          max-width: 220px !important;
        }

        /* Dropdown select box styling */
        .goog-te-gadget {
          color: #ffffff !important;
          font-family: inherit !important;
          font-size: 14px !important;
          background: transparent !important;
          display: inline-block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        .goog-te-gadget select,
        .goog-te-gadget .goog-te-combo {
          background: #1a1a1a !important;     /* Dark background for dropdown */
          color: #ffffff !important;          /* White text */
          border: 1px solid #ffffff !important;
          border-radius: 4px !important;
          padding: 6px 10px !important;
          font-size: 14px !important;
          font-family: inherit !important;
          min-height: 36px !important;
          line-height: 1.4 !important;
          cursor: pointer !important;
          outline: none !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          width: 100% !important;
          max-width: 200px !important;
          min-width: 160px !important;
        }

        .goog-te-gadget select:hover,
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #cccccc !important;
          background-color: #2a2a2a !important;
        }

        .goog-te-gadget select:focus,
        .goog-te-gadget .goog-te-combo:focus {
          border-color: #ffffff !important;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2) !important;
        }

        /* Force white text for all dropdown elements */
        .goog-te-gadget .goog-te-menu-value,
        .goog-te-gadget .goog-te-menu-value span,
        .goog-te-gadget-simple .goog-te-menu-value,
        .goog-te-gadget-simple .goog-te-menu-value span,
        .goog-te-gadget option {
          color: #ffffff !important;
          background: #1a1a1a !important;
        }

        /* Custom placeholder text */
        .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'Select Language' !important;
          color: #ffffff !important;
          font-family: inherit !important;
          font-size: 14px !important;
        }

        /* Remove Google branding bar and link */
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame,
        .goog-logo-link,
        .goog-te-gadget img,
        .goog-te-gadget-simple img,
        .goog-te-gadget .goog-te-menu-value img,
        [src*="translate.google"],
        [src*="google.com/images/branding"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          width: 0 !important;
          height: 0 !important;
          position: absolute !important;
          left: -9999px !important;
        }

        /* Remove "Powered by" text */
        .goog-te-gadget .goog-te-menu-value span:first-child {
          display: none !important;
        }

        body {
          top: 0px !important;
          position: static !important;
        }

        /* Tablet responsive adjustments */
        @media screen and (min-width: 641px) and (max-width: 1024px) {
          #google_translate_element {
            max-width: 200px !important;
            font-size: 14px !important;
            padding: 6px 8px !important;
          }
          
          .goog-te-gadget select,
          .goog-te-gadget .goog-te-combo {
            font-size: 14px !important;
            padding: 6px 8px !important;
            min-height: 36px !important;
            max-width: 180px !important;
            min-width: 140px !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: 'Select Language' !important;
            font-size: 14px !important;
          }
        }

        /* Mobile responsive adjustments */
        @media screen and (max-width: 640px) {
          #google_translate_element {
            max-width: 180px !important;
            font-size: 14px !important;
            padding: 6px !important;
          }
          
          .goog-te-gadget select,
          .goog-te-gadget .goog-te-combo {
            font-size: 14px !important;
            padding: 6px 8px !important;
            min-height: 36px !important;
            max-width: 160px !important;
            min-width: 120px !important;
            border-radius: 4px !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: 'Language' !important;
            font-size: 14px !important;
          }
        }

        /* RTL language support */
        html[dir="rtl"] .goog-te-gadget select,
        html[dir="rtl"] .goog-te-gadget .goog-te-combo,
        [dir="rtl"] .goog-te-gadget select,
        [dir="rtl"] .goog-te-gadget .goog-te-combo {
          text-align: right !important;
          direction: rtl !important;
          padding: 6px 10px 6px 20px !important;
        }

        html[dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before,
        [dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'اختر اللغة' !important;
        }

        /* Dropdown menu styling */
        .goog-te-menu-frame {
          background: #1a1a1a !important;
          border: 1px solid #ffffff !important;
          border-radius: 4px !important;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
          z-index: 10000 !important;
        }

        .goog-te-menu2 {
          background: #1a1a1a !important;
          color: #ffffff !important;
        }

        .goog-te-menu2-item div {
          color: #ffffff !important;
          background: #1a1a1a !important;
          font-family: inherit !important;
        }

        .goog-te-menu2-item:hover {
          background-color: #2a2a2a !important;
        }

        .goog-te-menu2-item div:hover {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize Google Translate with priority languages
    const initializeGoogleTranslate = () => {
      console.log('[GoogleTranslate] Initializing...');
      
      if (window.google && window.google.translate) {
        console.log('[GoogleTranslate] Creating translate element...');
        
        // Priority languages first, then others
        const priorityLanguages = 'zh-CN,es,hi,ar,bn,pt,ru,ja,pa,de,fr,sw,uk,pl,tr,it,nl';
        const otherLanguages = 'ko,th,vi,ms,id,tl,ur,fa,he,am,ha,yo,ig,zu,af,sq,eu,be,bg,ca,hr,cs,da,et,fi,gl,el,hu,is,ga,lv,lt,mk,mt,no,ro,sr,sk,sl,sv,cy';
        const allLanguages = priorityLanguages + ',' + otherLanguages;
        
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: allLanguages,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
            gaTrack: false,
            gaId: null
          },
          'google_translate_element'
        );

        // Force visibility and styling after initialization
        const ensureVisibility = () => {
          const element = document.getElementById('google_translate_element');
          const gadget = document.querySelector('.goog-te-gadget');
          const combo = document.querySelector('.goog-te-combo');
          
          console.log('[GoogleTranslate] Visibility check:', {
            element: !!element,
            gadget: !!gadget,
            combo: !!combo
          });

          if (element && gadget) {
            // Force visibility
            [element, gadget].forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.display = 'inline-block';
              htmlEl.style.visibility = 'visible';
              htmlEl.style.opacity = '1';
              htmlEl.style.position = 'relative';
              htmlEl.style.zIndex = '1000';
              htmlEl.style.color = '#ffffff';
              htmlEl.style.background = 'transparent';
            });

            if (combo) {
              const comboEl = combo as HTMLElement;
              comboEl.style.background = '#1a1a1a';
              comboEl.style.color = '#ffffff';
              comboEl.style.border = '1px solid #ffffff';
              
              // Accessibility attributes
              comboEl.setAttribute('tabindex', '0');
              comboEl.setAttribute('role', 'combobox');
              comboEl.setAttribute('aria-label', 'Website language selector');
              comboEl.setAttribute('aria-expanded', 'false');
              comboEl.setAttribute('title', 'Select website language');
            }

            console.log('[GoogleTranslate] Visibility and styling applied successfully');
            return true;
          }
          return false;
        };

        // Retry visibility with progressive delays
        let attempts = 0;
        const maxAttempts = 12;
        
        const retryVisibility = () => {
          attempts++;
          console.log(`[GoogleTranslate] Visibility attempt ${attempts}/${maxAttempts}`);
          
          if (ensureVisibility()) {
            console.log('[GoogleTranslate] Successfully initialized and styled');
            return;
          }
          
          if (attempts < maxAttempts) {
            setTimeout(retryVisibility, attempts * 250);
          } else {
            console.error('[GoogleTranslate] Failed to initialize after all attempts');
          }
        };
        
        setTimeout(retryVisibility, 300);
      } else {
        console.error('[GoogleTranslate] Google API not available');
      }
    };

    // Set up callback
    window.googleTranslateElementInit = () => {
      console.log('[GoogleTranslate] Callback triggered');
      addCustomStyles();
      setTimeout(initializeGoogleTranslate, 100);
    };

    // Load script
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (!existingScript) {
      console.log('[GoogleTranslate] Loading script...');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onload = () => console.log('[GoogleTranslate] Script loaded');
      script.onerror = () => console.error('[GoogleTranslate] Script failed to load');
      document.head.appendChild(script);
    } else {
      console.log('[GoogleTranslate] Script exists, initializing...');
      if (window.google && window.google.translate) {
        setTimeout(() => window.googleTranslateElementInit(), 100);
      }
    }

    // Apply styles immediately
    addCustomStyles();

    return () => {
      const style = document.getElementById('google-translate-footer-styles');
      if (style) style.remove();
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      aria-label="Website language selector"
      role="region"
      title="Select website language"
      className="inline-block"
      style={{
        background: 'transparent',
        color: '#ffffff',
        fontFamily: 'inherit',
        fontSize: '14px',
        display: 'inline-block',
        padding: '6px 10px',
        visibility: 'visible',
        opacity: 1,
        position: 'relative',
        zIndex: 1000,
        width: 'auto',
        maxWidth: '220px'
      }}
    />
  );
};