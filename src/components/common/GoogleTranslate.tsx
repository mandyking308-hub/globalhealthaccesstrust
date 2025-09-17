import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslate = () => {
  useEffect(() => {
    // Enhanced styles for cross-device consistency and visibility
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.id = 'google-translate-footer-styles';
      style.innerHTML = `
        /* COMPLETELY HIDE Google branding bar/banner */
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .goog-te-ftab-font,
        .goog-te-balloon-frame,
        .goog-te-balloon,
        iframe.goog-te-banner-frame {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
        }
        
        /* Prevent body displacement by Google banner */
        body {
          top: 0px !important;
          position: static !important;
        }
        
        /* Force visibility and styling of main container */
        #google_translate_element {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1000 !important;
          width: 100% !important;
          max-width: 220px !important;
          min-height: 44px !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
          overflow: visible !important;
        }
        
        /* Style the main gadget container */
        .goog-te-gadget {
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
          font-size: 14px !important;
          color: #111111 !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1000 !important;
          width: 100% !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
        }
        
        .goog-te-gadget-simple {
          background: transparent !important;
          border: none !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
          height: auto !important;
        }
        
        /* Enhanced dropdown styling for uniform appearance */
        .goog-te-gadget .goog-te-combo {
          background-color: #ffffff !important;
          color: #111111 !important;
          border: 1px solid #d1d5db !important;
          border-radius: 8px !important;
          padding: 12px 16px !important;
          font-size: 14px !important;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
          font-weight: 400 !important;
          line-height: 1.5 !important;
          min-height: 44px !important;
          height: 44px !important;
          width: 100% !important;
          max-width: 220px !important;
          min-width: 180px !important;
          cursor: pointer !important;
          outline: none !important;
          transition: all 0.2s ease-in-out !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          box-sizing: border-box !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 1000 !important;
          margin: 0 !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
        }
        
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #9ca3af !important;
          background-color: #f9fafb !important;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
        }
        
        .goog-te-gadget .goog-te-combo:focus {
          border-color: #0B2B4C !important;
          box-shadow: 0 0 0 3px rgba(11, 43, 76, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
        }
        
        /* COMPLETELY HIDE all Google branding elements */
        .goog-te-gadget img,
        .goog-te-gadget-simple img,
        .goog-logo-link,
        .goog-te-gadget .goog-te-menu-value img,
        .goog-te-gadget .goog-te-menu-value span img,
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
          top: -9999px !important;
        }
        
        /* Remove Google "Powered by" text and branding */
        .goog-te-gadget .goog-te-menu-value span:first-child,
        .goog-te-gadget .goog-te-menu-value span[style*="vertical-align"],
        .goog-te-gadget .goog-te-menu-value span[style*="white-space"] {
          display: none !important;
        }
        
        /* Force white text for ALL text elements in dropdown */
        .goog-te-gadget .goog-te-combo,
        .goog-te-gadget .goog-te-combo option,
        .goog-te-gadget .goog-te-menu-value,
        .goog-te-gadget .goog-te-menu-value span,
        .goog-te-gadget-simple .goog-te-menu-value,
        .goog-te-gadget-simple .goog-te-menu-value span {
          color: #ffffff !important;
        }
        
        /* Custom placeholder text with accessibility */
        .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'Select Language' !important;
          color: #ffffff !important;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
          font-size: 14px !important;
          font-weight: 400 !important;
        }
        
        /* Tablet-specific optimizations */
        @media screen and (min-width: 641px) and (max-width: 1024px) {
          #google_translate_element {
            max-width: 200px !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            font-size: 14px !important;
            padding: 10px 14px !important;
            min-height: 42px !important;
            height: 42px !important;
            max-width: 200px !important;
            min-width: 160px !important;
            color: #ffffff !important;
          }
          
          .goog-te-gadget .goog-te-combo option,
          .goog-te-gadget .goog-te-menu-value,
          .goog-te-gadget .goog-te-menu-value span,
          .goog-te-gadget-simple .goog-te-menu-value,
          .goog-te-gadget-simple .goog-te-menu-value span {
            color: #ffffff !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: 'Select Language' !important;
            color: #ffffff !important;
            font-size: 14px !important;
          }
        }
        
        /* Mobile-specific optimizations */
        @media screen and (max-width: 640px) {
          #google_translate_element {
            max-width: 180px !important;
            min-width: 160px !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            font-size: 14px !important;
            padding: 10px 12px !important;
            min-height: 44px !important;
            height: 44px !important;
            max-width: 180px !important;
            min-width: 160px !important;
            border-radius: 6px !important;
            color: #ffffff !important;
          }
          
          .goog-te-gadget .goog-te-combo option,
          .goog-te-gadget .goog-te-menu-value,
          .goog-te-gadget .goog-te-menu-value span,
          .goog-te-gadget-simple .goog-te-menu-value,
          .goog-te-gadget-simple .goog-te-menu-value span {
            color: #ffffff !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: 'Language' !important;
            color: #ffffff !important;
            font-size: 14px !important;
          }
        }
        
        /* RTL language support */
        html[dir="rtl"] .goog-te-gadget .goog-te-combo,
        [dir="rtl"] .goog-te-gadget .goog-te-combo {
          text-align: right !important;
          direction: rtl !important;
          padding: 12px 16px 12px 32px !important;
        }
        
        html[dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before,
        [dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'اختر اللغة' !important;
        }
        
        @media screen and (max-width: 640px) {
          html[dir="rtl"] .goog-te-gadget .goog-te-combo,
          [dir="rtl"] .goog-te-gadget .goog-te-combo {
            padding: 10px 12px 10px 28px !important;
          }
        }
        
        /* Enhanced iframe dropdown menu support */
        .goog-te-menu-frame {
          background: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          z-index: 10000 !important;
        }
        
        .goog-te-menu2 {
          background: white !important;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
        }
        
        .goog-te-menu2-item div {
          color: #111111 !important;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif !important;
        }
        
        .goog-te-menu2-item:hover {
          background-color: #f3f4f6 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Enhanced Google Translate initialization with priority language ordering
    const initializeGoogleTranslate = () => {
      console.log('[GoogleTranslate] Initializing widget...');
      
      if (window.google && window.google.translate) {
        console.log('[GoogleTranslate] Google API available, creating element...');
        
        // Priority languages first, then all others
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
        
        // Enhanced post-initialization with multiple retry attempts
        const forceVisibility = () => {
          const element = document.getElementById('google_translate_element');
          const gadget = document.querySelector('.goog-te-gadget');
          const combo = document.querySelector('.goog-te-combo');
          
          console.log('[GoogleTranslate] Force visibility check:', {
            element: !!element,
            gadget: !!gadget,
            combo: !!combo,
            viewport: window.innerWidth
          });
          
          if (element && gadget && combo) {
            // Force visibility using multiple approaches
            [element, gadget, combo].forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.display = 'block';
              htmlEl.style.visibility = 'visible';
              htmlEl.style.opacity = '1';
              htmlEl.style.position = 'relative';
              htmlEl.style.zIndex = '1000';
              
              // Remove any conflicting inline styles
              htmlEl.style.removeProperty('transform');
              htmlEl.style.removeProperty('left');
              htmlEl.style.removeProperty('right');
              htmlEl.style.removeProperty('top');
              htmlEl.style.removeProperty('bottom');
            });
            
            // Enhanced accessibility
            const comboEl = combo as HTMLElement;
            comboEl.setAttribute('tabindex', '0');
            comboEl.setAttribute('role', 'combobox');
            comboEl.setAttribute('aria-label', 'Website language selector');
            comboEl.setAttribute('aria-expanded', 'false');
            comboEl.setAttribute('aria-haspopup', 'listbox');
            comboEl.setAttribute('title', 'Select website language');
            
            console.log('[GoogleTranslate] Successfully applied visibility and accessibility');
            return true;
          }
          return false;
        };
        
        // Multiple retry attempts with progressive delays
        let attempts = 0;
        const maxAttempts = 15;
        
        const retryVisibility = () => {
          attempts++;
          console.log(`[GoogleTranslate] Visibility attempt ${attempts}/${maxAttempts}`);
          
          if (forceVisibility()) {
            console.log('[GoogleTranslate] Widget successfully initialized');
            return;
          }
          
          if (attempts < maxAttempts) {
            setTimeout(retryVisibility, attempts * 300); // Progressive delay
          } else {
            console.error('[GoogleTranslate] Failed to initialize after all attempts');
          }
        };
        
        // Start retry process
        setTimeout(retryVisibility, 500);
      } else {
        console.error('[GoogleTranslate] Google Translate API not available');
      }
    };

    // Set up initialization callback
    window.googleTranslateElementInit = () => {
      console.log('[GoogleTranslate] Callback triggered');
      addCustomStyles();
      setTimeout(initializeGoogleTranslate, 200);
    };

    // Load Google Translate script
    const loadScript = () => {
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (!existingScript) {
        console.log('[GoogleTranslate] Loading Google Translate script...');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.onload = () => {
          console.log('[GoogleTranslate] Script loaded successfully');
        };
        script.onerror = () => {
          console.error('[GoogleTranslate] Failed to load Google Translate script');
        };
        document.head.appendChild(script);
      } else {
        console.log('[GoogleTranslate] Script already exists, initializing...');
        if (window.google && window.google.translate) {
          setTimeout(() => window.googleTranslateElementInit(), 200);
        }
      }
    };

    // Apply styles immediately and load script
    addCustomStyles();
    loadScript();

    // Cleanup function
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
      className="w-full max-w-[220px]"
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'relative',
        zIndex: 1000,
        minHeight: '44px',
        width: '100%',
        maxWidth: '220px'
      }}
    />
  );
};