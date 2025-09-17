import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslate = () => {
  useEffect(() => {
    // Add the exact styling as specified
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.id = 'google-translate-footer-exact-styles';
      style.innerHTML = `
        /* Ensure footer dropdown is always visible */
        #google_translate_element {
          display: block !important;
          margin: 12px auto !important;
          text-align: center !important;
          background: transparent !important;
          color: #ffffff !important; /* White text in footer */
          font-family: inherit !important;
          font-size: 16px !important;
          padding: 8px 12px !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1000 !important;
          width: auto !important;
          overflow: visible !important;
        }

        /* Gadget styling */
        .goog-te-gadget {
          color: #ffffff !important;
          background: transparent !important;
          font-size: inherit !important;
          font-family: inherit !important;
          text-align: center !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
        }

        .goog-te-gadget-simple {
          background: transparent !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          text-align: center !important;
        }

        .goog-te-gadget select,
        .goog-te-gadget .goog-te-combo {
          background: #0a1a3f !important;     /* Navy dropdown box */
          color: #ffffff !important;          /* White text */
          border: 1px solid #ffffff !important;
          border-radius: 4px !important;
          padding: 8px 12px !important;
          font-size: 16px !important;
          width: auto !important;
          min-width: 180px !important;
          max-width: 240px !important;
          box-sizing: border-box !important;
          font-family: inherit !important;
          line-height: 1.4 !important;
          cursor: pointer !important;
          outline: none !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          display: inline-block !important;
          visibility: visible !important;
          opacity: 1 !important;
          margin: 0 auto !important;
        }

        .goog-te-gadget select:hover,
        .goog-te-gadget .goog-te-combo:hover {
          background: #0d2251 !important;
          border-color: #cccccc !important;
        }

        .goog-te-gadget select:focus,
        .goog-te-gadget .goog-te-combo:focus {
          background: #0a1a3f !important;
          border-color: #ffffff !important;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3) !important;
        }

        /* Force white text for all elements */
        .goog-te-gadget .goog-te-menu-value,
        .goog-te-gadget .goog-te-menu-value span,
        .goog-te-gadget-simple .goog-te-menu-value,
        .goog-te-gadget-simple .goog-te-menu-value span,
        .goog-te-gadget option {
          color: #ffffff !important;
          background: #0a1a3f !important;
        }

        /* Custom placeholder text */
        .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'Select Language' !important;
          color: #ffffff !important;
          font-family: inherit !important;
          font-size: inherit !important;
        }

        /* Tablet fixes */
        @media (max-width: 1024px) {
          .goog-te-gadget select,
          .goog-te-gadget .goog-te-combo {
            width: 90% !important;
            font-size: 18px !important;       /* Larger text for tablets */
            padding: 10px 14px !important;
            max-width: 280px !important;
            min-width: 200px !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            font-size: 18px !important;
          }
        }

        /* Mobile fixes */
        @media (max-width: 768px) {
          #google_translate_element {
            margin: 14px auto !important;
            padding: 10px 12px !important;
          }
          
          .goog-te-gadget select,
          .goog-te-gadget .goog-te-combo {
            width: 100% !important;
            font-size: 18px !important;       /* Bigger for readability */
            padding: 12px 16px !important;
            max-width: 300px !important;
            min-width: 220px !important;
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
          background: #0a1a3f !important;
          border: 1px solid #ffffff !important;
          border-radius: 4px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
          z-index: 10000 !important;
        }

        .goog-te-menu2 {
          background: #0a1a3f !important;
          color: #ffffff !important;
          font-family: inherit !important;
        }

        .goog-te-menu2-item div {
          color: #ffffff !important;
          background: #0a1a3f !important;
          font-family: inherit !important;
          padding: 8px 12px !important;
        }

        .goog-te-menu2-item:hover {
          background-color: #0d2251 !important;
        }

        .goog-te-menu2-item div:hover {
          background-color: #0d2251 !important;
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
      console.log('[GoogleTranslate] Initializing with exact specifications...');
      
      if (window.google && window.google.translate) {
        console.log('[GoogleTranslate] Creating translate element...');
        
        // Priority languages as specified
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

        // Ensure perfect visibility and styling
        const ensurePerfectVisibility = () => {
          const element = document.getElementById('google_translate_element');
          const gadget = document.querySelector('.goog-te-gadget');
          const combo = document.querySelector('.goog-te-combo');
          
          console.log('[GoogleTranslate] Perfect visibility check:', {
            element: !!element,
            gadget: !!gadget,
            combo: !!combo,
            viewport: `${window.innerWidth}x${window.innerHeight}`
          });

          if (element && gadget) {
            // Apply exact styling as specified
            const htmlElement = element as HTMLElement;
            const gadgetElement = gadget as HTMLElement;
            
            // Exact element styling
            htmlElement.style.display = 'block';
            htmlElement.style.margin = '12px auto';
            htmlElement.style.textAlign = 'center';
            htmlElement.style.background = 'transparent';
            htmlElement.style.color = '#ffffff';
            htmlElement.style.fontFamily = 'inherit';
            htmlElement.style.fontSize = '16px';
            htmlElement.style.padding = '8px 12px';
            htmlElement.style.visibility = 'visible';
            htmlElement.style.opacity = '1';
            htmlElement.style.position = 'relative';
            htmlElement.style.zIndex = '1000';
            
            // Mobile adjustments
            if (window.innerWidth <= 768) {
              htmlElement.style.margin = '14px auto';
              htmlElement.style.padding = '10px 12px';
            }
            
            // Gadget styling
            gadgetElement.style.color = '#ffffff';
            gadgetElement.style.background = 'transparent';
            gadgetElement.style.fontSize = 'inherit';
            gadgetElement.style.fontFamily = 'inherit';
            gadgetElement.style.textAlign = 'center';
            gadgetElement.style.display = 'block';
            gadgetElement.style.visibility = 'visible';
            gadgetElement.style.opacity = '1';
            gadgetElement.style.width = '100%';

            if (combo) {
              const comboEl = combo as HTMLElement;
              comboEl.style.background = '#0a1a3f';
              comboEl.style.color = '#ffffff';
              comboEl.style.border = '1px solid #ffffff';
              comboEl.style.borderRadius = '4px';
              comboEl.style.fontSize = '16px';
              comboEl.style.padding = '8px 12px';
              comboEl.style.minWidth = '180px';
              comboEl.style.maxWidth = '240px';
              comboEl.style.display = 'inline-block';
              comboEl.style.visibility = 'visible';
              comboEl.style.opacity = '1';
              comboEl.style.margin = '0 auto';
              
              // Responsive adjustments
              if (window.innerWidth <= 1024 && window.innerWidth > 768) {
                comboEl.style.fontSize = '18px';
                comboEl.style.padding = '10px 14px';
                comboEl.style.width = '90%';
                comboEl.style.maxWidth = '280px';
                comboEl.style.minWidth = '200px';
              } else if (window.innerWidth <= 768) {
                comboEl.style.fontSize = '18px';
                comboEl.style.padding = '12px 16px';
                comboEl.style.width = '100%';
                comboEl.style.maxWidth = '300px';
                comboEl.style.minWidth = '220px';
                comboEl.style.borderRadius = '6px';
              }
              
              // Enhanced accessibility
              comboEl.setAttribute('tabindex', '0');
              comboEl.setAttribute('role', 'combobox');
              comboEl.setAttribute('aria-label', 'Website language selector');
              comboEl.setAttribute('aria-expanded', 'false');
              comboEl.setAttribute('title', 'Select website language');
            }

            console.log('[GoogleTranslate] Perfect visibility and styling applied successfully');
            return true;
          }
          return false;
        };

        // Multi-attempt initialization with perfect visibility checks
        let attempts = 0;
        const maxAttempts = 20;
        
        const retryPerfectVisibility = () => {
          attempts++;
          console.log(`[GoogleTranslate] Perfect visibility attempt ${attempts}/${maxAttempts}`);
          
          if (ensurePerfectVisibility()) {
            console.log('[GoogleTranslate] Successfully initialized with perfect styling');
            
            // Add resize listener for dynamic responsiveness
            const handleResize = () => {
              setTimeout(ensurePerfectVisibility, 50);
            };
            window.addEventListener('resize', handleResize);
            
            return;
          }
          
          if (attempts < maxAttempts) {
            setTimeout(retryPerfectVisibility, attempts * 150);
          } else {
            console.error('[GoogleTranslate] Failed to achieve perfect visibility after all attempts');
          }
        };
        
        setTimeout(retryPerfectVisibility, 200);
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
      const style = document.getElementById('google-translate-footer-exact-styles');
      if (style) style.remove();
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      aria-label="Website language selector"
      role="region"
      title="Select website language"
      style={{
        display: 'block',
        margin: '12px auto',
        textAlign: 'center',
        background: 'transparent',
        color: '#ffffff',
        fontFamily: 'inherit',
        fontSize: '16px',
        padding: '8px 12px',
        visibility: 'visible',
        opacity: 1,
        position: 'relative',
        zIndex: 1000
      }}
    />
  );
};