import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslate = () => {
  useEffect(() => {
    // Add responsive styles for cross-device compatibility
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.id = 'google-translate-responsive-styles';
      style.innerHTML = `
        /* General footer dropdown styling */
        #google_translate_element {
          background: transparent !important;
          color: #ffffff !important;   /* White text for footer */
          font-family: inherit !important;
          font-size: 14px !important;
          display: inline-block !important;
          padding: 6px 10px !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1000 !important;
          width: auto !important;
        }

        /* Translate gadget styling */
        .goog-te-gadget {
          color: #ffffff !important;
          font-family: inherit !important;
          font-size: 14px !important;
          background: transparent !important;
          display: inline-block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
        }

        .goog-te-gadget-simple {
          background: transparent !important;
          display: inline-block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
        }

        .goog-te-gadget select,
        .goog-te-gadget .goog-te-combo {
          background: #1a1a1a !important;     /* Dark dropdown box */
          color: #ffffff !important;          /* White text */
          border: 1px solid #ffffff !important;
          border-radius: 4px !important;
          padding: 6px 10px !important;
          font-size: 14px !important;
          width: 100% !important;             /* Force full width in containers */
          max-width: 250px !important;        /* Keep it tidy */
          min-width: 160px !important;        /* Prevent collapsing on mobile */
          box-sizing: border-box !important;
          font-family: inherit !important;
          line-height: 1.4 !important;
          cursor: pointer !important;
          outline: none !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        .goog-te-gadget select:hover,
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #cccccc !important;
          background-color: #2a2a2a !important;
        }

        .goog-te-gadget select:focus,
        .goog-te-gadget .goog-te-combo:focus {
          border-color: #ffffff !important;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3) !important;
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
          font-size: inherit !important;
        }

        /* Responsive fixes */
        @media (max-width: 1024px) {
          #google_translate_element {
            display: block !important;
            margin: 10px auto !important;
            text-align: center !important;
            width: 100% !important;
            max-width: 300px !important;
          }
          
          .goog-te-gadget {
            display: block !important;
            width: 100% !important;
            text-align: center !important;
          }
          
          .goog-te-gadget select,
          .goog-te-gadget .goog-te-combo {
            width: 90% !important;
            font-size: 16px !important;       /* Larger, more readable on tablets */
            padding: 8px 12px !important;
            min-height: 44px !important;
            margin: 0 auto !important;
            display: block !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            font-size: 16px !important;
          }
        }

        @media (max-width: 768px) {
          #google_translate_element {
            display: block !important;
            margin: 12px auto !important;
            text-align: center !important;
            width: 100% !important;
            max-width: 280px !important;
            padding: 8px !important;
          }
          
          .goog-te-gadget {
            display: block !important;
            width: 100% !important;
            text-align: center !important;
          }
          
          .goog-te-gadget select,
          .goog-te-gadget .goog-te-combo {
            width: 100% !important;
            font-size: 18px !important;       /* Bigger text for small screens */
            padding: 10px 12px !important;    /* More tap-friendly */
            min-height: 48px !important;
            margin: 0 auto !important;
            display: block !important;
            border-radius: 6px !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: 'Language' !important;
            font-size: 18px !important;
          }
        }

        /* Remove Google branding */
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame,
        .goog-logo-link,
        .goog-te-gadget img,
        .goog-te-gadget-simple img,
        .goog-te-gadget .goog-te-menu-value img,
        .goog-te-gadget span img,
        [src*="translate.google"],
        [src*="google.com/images/branding"],
        [src*="googleusercontent.com"] {
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

        /* RTL language support */
        html[dir="rtl"] .goog-te-gadget select,
        html[dir="rtl"] .goog-te-gadget .goog-te-combo,
        [dir="rtl"] .goog-te-gadget select,
        [dir="rtl"] .goog-te-gadget .goog-te-combo {
          text-align: right !important;
          direction: rtl !important;
        }

        html[dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before,
        [dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'اختر اللغة' !important;
        }

        @media (max-width: 768px) {
          html[dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before,
          [dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before {
            content: 'اللغة' !important;
          }
        }

        /* Dropdown menu styling */
        .goog-te-menu-frame {
          background: #1a1a1a !important;
          border: 1px solid #ffffff !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
          z-index: 10000 !important;
        }

        .goog-te-menu2 {
          background: #1a1a1a !important;
          color: #ffffff !important;
          font-family: inherit !important;
        }

        .goog-te-menu2-item div {
          color: #ffffff !important;
          background: #1a1a1a !important;
          font-family: inherit !important;
          padding: 8px 12px !important;
        }

        .goog-te-menu2-item:hover {
          background-color: #2a2a2a !important;
        }

        .goog-te-menu2-item div:hover {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }

        /* Mobile dropdown menu adjustments */
        @media (max-width: 768px) {
          .goog-te-menu2-item div {
            font-size: 16px !important;
            padding: 12px 16px !important;
            min-height: 44px !important;
          }
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize Google Translate with priority languages
    const initializeGoogleTranslate = () => {
      console.log('[GoogleTranslate] Initializing responsive widget...');
      
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

        // Enhanced visibility and responsive styling
        const ensureResponsiveVisibility = () => {
          const element = document.getElementById('google_translate_element');
          const gadget = document.querySelector('.goog-te-gadget');
          const combo = document.querySelector('.goog-te-combo');
          
          console.log('[GoogleTranslate] Responsive visibility check:', {
            element: !!element,
            gadget: !!gadget,
            combo: !!combo,
            viewport: `${window.innerWidth}x${window.innerHeight}`
          });

          if (element && gadget) {
            // Force visibility and responsive behavior
            const htmlElement = element as HTMLElement;
            const gadgetElement = gadget as HTMLElement;
            
            // Base styling
            htmlElement.style.display = window.innerWidth <= 1024 ? 'block' : 'inline-block';
            htmlElement.style.visibility = 'visible';
            htmlElement.style.opacity = '1';
            htmlElement.style.position = 'relative';
            htmlElement.style.zIndex = '1000';
            htmlElement.style.color = '#ffffff';
            htmlElement.style.background = 'transparent';
            
            // Responsive adjustments
            if (window.innerWidth <= 1024) {
              htmlElement.style.margin = '10px auto';
              htmlElement.style.textAlign = 'center';
              htmlElement.style.width = '100%';
              htmlElement.style.maxWidth = window.innerWidth <= 768 ? '280px' : '300px';
            }
            
            gadgetElement.style.display = window.innerWidth <= 1024 ? 'block' : 'inline-block';
            gadgetElement.style.visibility = 'visible';
            gadgetElement.style.opacity = '1';
            gadgetElement.style.color = '#ffffff';
            gadgetElement.style.background = 'transparent';
            gadgetElement.style.width = '100%';
            
            if (window.innerWidth <= 1024) {
              gadgetElement.style.textAlign = 'center';
            }

            if (combo) {
              const comboEl = combo as HTMLElement;
              comboEl.style.background = '#1a1a1a';
              comboEl.style.color = '#ffffff';
              comboEl.style.border = '1px solid #ffffff';
              comboEl.style.display = 'block';
              comboEl.style.visibility = 'visible';
              comboEl.style.opacity = '1';
              
              // Responsive font sizing
              if (window.innerWidth <= 768) {
                comboEl.style.fontSize = '18px';
                comboEl.style.padding = '10px 12px';
                comboEl.style.minHeight = '48px';
                comboEl.style.width = '100%';
              } else if (window.innerWidth <= 1024) {
                comboEl.style.fontSize = '16px';
                comboEl.style.padding = '8px 12px';
                comboEl.style.minHeight = '44px';
                comboEl.style.width = '90%';
                comboEl.style.margin = '0 auto';
              }
              
              // Enhanced accessibility
              comboEl.setAttribute('tabindex', '0');
              comboEl.setAttribute('role', 'combobox');
              comboEl.setAttribute('aria-label', 'Website language selector');
              comboEl.setAttribute('aria-expanded', 'false');
              comboEl.setAttribute('title', 'Select website language');
            }

            console.log('[GoogleTranslate] Responsive visibility and styling applied successfully');
            return true;
          }
          return false;
        };

        // Multi-attempt initialization with responsive checks
        let attempts = 0;
        const maxAttempts = 15;
        
        const retryResponsiveVisibility = () => {
          attempts++;
          console.log(`[GoogleTranslate] Responsive visibility attempt ${attempts}/${maxAttempts}`);
          
          if (ensureResponsiveVisibility()) {
            console.log('[GoogleTranslate] Successfully initialized with responsive styling');
            
            // Add resize listener for dynamic responsiveness
            const handleResize = () => {
              setTimeout(ensureResponsiveVisibility, 100);
            };
            window.addEventListener('resize', handleResize);
            
            return;
          }
          
          if (attempts < maxAttempts) {
            setTimeout(retryResponsiveVisibility, attempts * 200);
          } else {
            console.error('[GoogleTranslate] Failed to initialize responsive styling after all attempts');
          }
        };
        
        setTimeout(retryResponsiveVisibility, 300);
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
      const style = document.getElementById('google-translate-responsive-styles');
      if (style) style.remove();
      
      // Remove resize listener
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      aria-label="Website language selector"
      role="region"
      title="Select website language"
      className="google-translate-container"
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
        zIndex: 1000
      }}
    />
  );
};