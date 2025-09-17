import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslateFixed = () => {
  useEffect(() => {
    // Enhanced approach based on Stack Overflow solutions for mobile visibility
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.id = 'google-translate-custom-styles';
      style.innerHTML = `
        /* COMPLETELY HIDE Google banners and branding */
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .goog-te-ftab-font {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
        
        body {
          top: 0px !important;
          position: static !important;
        }
        
        /* Force Google Translate widget container to be visible */
        #google_translate_element {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 10000 !important;
          min-height: 44px !important;
          min-width: 140px !important;
          overflow: visible !important;
        }
        
        /* Main gadget styling with mobile-first approach */
        .goog-te-gadget {
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          font-size: 14px !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: auto !important;
          height: auto !important;
          position: relative !important;
          z-index: 10000 !important;
        }
        
        .goog-te-gadget-simple {
          background: transparent !important;
          border: none !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        /* Dropdown with enhanced mobile visibility */
        .goog-te-gadget .goog-te-combo {
          background-color: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          padding: 8px 24px 8px 12px !important;
          font-size: 14px !important;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          color: #111111 !important;
          min-height: 44px !important;
          height: 44px !important;
          line-height: 1.5 !important;
          min-width: 140px !important;
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
          z-index: 10000 !important;
          box-sizing: border-box !important;
        }
        
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #9ca3af !important;
          background-color: #f9fafb !important;
        }
        
        .goog-te-gadget .goog-te-combo:focus {
          border-color: #0B2B4C !important;
          box-shadow: 0 0 0 2px rgba(11, 43, 76, 0.1) !important;
        }
        
        /* Hide ALL Google branding */
        .goog-te-gadget img,
        .goog-te-gadget-simple img,
        .goog-logo-link,
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
        
        /* Custom placeholder without Google branding */
        .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value:before {
          content: '🌐 Select Language' !important;
          color: #6b7280 !important;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          font-size: 14px !important;
        }
        
        /* Mobile-specific styles with enhanced visibility */
        @media screen and (max-width: 640px) {
          #google_translate_element {
            min-width: 120px !important;
            width: 120px !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            min-width: 120px !important;
            width: 120px !important;
            font-size: 13px !important;
            padding: 8px 20px 8px 8px !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: '🌐 Language' !important;
            font-size: 13px !important;
          }
        }
        
        /* Tablet-specific styles */
        @media screen and (min-width: 641px) and (max-width: 1024px) {
          #google_translate_element {
            min-width: 140px !important;
            width: 140px !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            min-width: 140px !important;
            width: 140px !important;
          }
        }
        
        /* Desktop styles */
        @media screen and (min-width: 1025px) {
          #google_translate_element {
            min-width: 160px !important;
            width: 160px !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            min-width: 160px !important;
            width: 160px !important;
          }
        }
        
        /* RTL language support */
        html[dir="rtl"] .goog-te-gadget .goog-te-combo,
        [dir="rtl"] .goog-te-gadget .goog-te-combo {
          text-align: right !important;
          direction: rtl !important;
          padding: 8px 12px 8px 24px !important;
        }
        
        html[dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before,
        [dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'اختر اللغة 🌐' !important;
        }
        
        /* Fix for iframe dropdown menu - based on Stack Overflow solution */
        .goog-te-menu-frame {
          max-width: 100% !important;
          overflow: visible !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize with better mobile handling
    const initializeGoogleTranslate = () => {
      console.log('[GoogleTranslateFixed] Starting initialization...');
      
      if (window.google && window.google.translate) {
        console.log('[GoogleTranslateFixed] Google API available, creating element...');
        
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'zh-CN,es,hi,ar,bn,pt,ru,ja,pa,de,fr,sw,uk,pl,tr,it,nl,ko,th,vi,ms,id,tl,ur,fa,he,am,ha,yo,ig,zu,af,sq,eu,be,bg,ca,hr,cs,da,et,fi,gl,el,hu,is,ga,lv,lt,mk,mt,no,ro,sr,sk,sl,sv,cy',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
            gaTrack: false,
            gaId: null
          },
          'google_translate_element_fixed'
        );
        
        // Enhanced post-initialization styling based on Stack Overflow solutions
        const applyPostInitStyles = () => {
          const element = document.getElementById('google_translate_element_fixed');
          const gadget = document.querySelector('.goog-te-gadget');
          const combo = document.querySelector('.goog-te-combo');
          
          console.log('[GoogleTranslateFixed] Post-init check:', {
            element: !!element,
            gadget: !!gadget,
            combo: !!combo,
            isMobile: window.innerWidth <= 640,
            isTablet: window.innerWidth > 640 && window.innerWidth <= 1024
          });
          
          if (element && gadget && combo) {
            // Force visibility using multiple methods
            [element, gadget, combo].forEach((el, index) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.display = 'block';
              htmlEl.style.visibility = 'visible';
              htmlEl.style.opacity = '1';
              htmlEl.style.position = 'relative';
              htmlEl.style.zIndex = '10000';
              
              // Remove any potentially conflicting classes or styles
              htmlEl.style.removeProperty('transform');
              htmlEl.style.removeProperty('left');
              htmlEl.style.removeProperty('right');
              htmlEl.style.removeProperty('top');
              htmlEl.style.removeProperty('bottom');
            });
            
            // Add accessibility attributes
            const comboEl = combo as HTMLElement;
            comboEl.setAttribute('tabindex', '0');
            comboEl.setAttribute('role', 'combobox');
            comboEl.setAttribute('aria-label', 'Select website language for translation');
            
            console.log('[GoogleTranslateFixed] Successfully initialized and styled elements');
            return true;
          }
          return false;
        };
        
        // Try multiple times with increasing delays (Stack Overflow pattern)
        const maxAttempts = 10;
        let attempts = 0;
        
        const attemptStyling = () => {
          attempts++;
          console.log(`[GoogleTranslateFixed] Styling attempt ${attempts}/${maxAttempts}`);
          
          if (applyPostInitStyles()) {
            console.log('[GoogleTranslateFixed] Successfully applied styles');
            return;
          }
          
          if (attempts < maxAttempts) {
            setTimeout(attemptStyling, attempts * 200); // Increasing delay
          } else {
            console.error('[GoogleTranslateFixed] Failed to initialize after all attempts');
          }
        };
        
        setTimeout(attemptStyling, 500);
      } else {
        console.error('[GoogleTranslateFixed] Google Translate API not available');
      }
    };

    // Set up callback
    window.googleTranslateElementInit = () => {
      console.log('[GoogleTranslateFixed] Callback triggered');
      addCustomStyles();
      setTimeout(initializeGoogleTranslate, 300);
    };

    // Load script
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (!existingScript) {
      console.log('[GoogleTranslateFixed] Loading Google Translate script...');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onload = () => {
        console.log('[GoogleTranslateFixed] Script loaded');
        setTimeout(() => {
          if (window.googleTranslateElementInit) {
            window.googleTranslateElementInit();
          }
        }, 200);
      };
      script.onerror = () => {
        console.error('[GoogleTranslateFixed] Failed to load Google Translate script');
      };
      document.head.appendChild(script);
    } else {
      console.log('[GoogleTranslateFixed] Script already exists, initializing...');
      if (window.google && window.google.translate) {
        setTimeout(() => window.googleTranslateElementInit(), 200);
      }
    }

    // Apply styles immediately
    addCustomStyles();

    return () => {
      // Cleanup
      const style = document.getElementById('google-translate-custom-styles');
      if (style) style.remove();
      
      const scripts = document.querySelectorAll('script[src*="translate.google.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div 
      id="google_translate_element_fixed" 
      aria-label="Website language selector"
      role="region"
      className="google-translate-container"
      style={{ 
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'relative',
        zIndex: 10000,
        minHeight: '44px',
        minWidth: '120px',
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        background: 'transparent',
        border: 'none',
        margin: 0,
        padding: 0
      }}
    />
  );
};