import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslate = () => {
  useEffect(() => {
    // Enhanced styles for MAXIMUM visibility and COMPLETE Google logo removal
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        /* COMPLETELY HIDE Google Translate banner and ALL Google branding */
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .goog-te-gadget img,
        .goog-te-gadget-simple img,
        .goog-te-combo img,
        .goog-logo-link,
        .goog-te-banner-frame img,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf img,
        [src*="translate.google"],
        [src*="google.com/images/branding"],
        .goog-te-gadget .goog-te-menu-value img {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          left: -9999px !important;
        }
        
        body {
          top: 0px !important;
          position: static !important;
        }
        
        /* ABSOLUTE FORCE VISIBILITY ON ALL DEVICES */
        #google_translate_element,
        .goog-te-gadget,
        .goog-te-gadget-simple,
        .goog-te-combo {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: static !important;
          z-index: 99999 !important;
        }
        
        /* Main container with MAXIMUM forced visibility */
        .goog-te-gadget {
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          font-size: 14px !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          background: transparent !important;
          border: none !important;
        }
        
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
        }
        
        /* Dropdown with MAXIMUM visibility and clean styling */
        .goog-te-gadget .goog-te-combo {
          background-color: white !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          padding: 8px 32px 8px 12px !important;
          font-size: 14px !important;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          color: #111111 !important;
          min-height: 44px !important;
          height: 44px !important;
          line-height: 1.5 !important;
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
          z-index: 99999 !important;
          overflow: visible !important;
          box-sizing: border-box !important;
          margin: 0 !important;
        }
        
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #9ca3af !important;
          background-color: #f9fafb !important;
        }
        
        .goog-te-gadget .goog-te-combo:focus {
          border-color: #0B2B4C !important;
          box-shadow: 0 0 0 2px rgba(11, 43, 76, 0.1) !important;
          outline: 2px solid #0B2B4C !important;
          outline-offset: 2px !important;
        }
        
        /* Dropdown options with clean styling */
        .goog-te-gadget .goog-te-combo option {
          background-color: white !important;
          color: #111111 !important;
          padding: 8px 12px !important;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          display: block !important;
          visibility: visible !important;
          font-size: 14px !important;
        }
        
        /* COMPLETELY REMOVE Google branding text */
        .goog-te-gadget-simple .goog-te-menu-value span:first-child,
        .goog-te-gadget-simple .goog-te-menu-value span[style*="color"],
        .goog-te-gadget .goog-te-menu-value span:first-child,
        .goog-te-gadget .goog-te-menu-value span[style*="color"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          width: 0 !important;
          height: 0 !important;
          position: absolute !important;
          left: -9999px !important;
        }
        
        /* Custom placeholder WITHOUT Google branding */
        .goog-te-gadget-simple .goog-te-menu-value:before {
          content: '🌐 Select Language' !important;
          color: #6b7280 !important;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          font-size: 14px !important;
          display: inline-block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value span:not([style*="color"]):not(:first-child) {
          color: #111111 !important;
          font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
          display: inline-block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        /* Hide default option and powered by text */
        .goog-te-gadget .goog-te-combo option[value=""],
        .goog-te-gadget .goog-te-combo option:first-child {
          display: none !important;
        }
        
        /* RTL language support */
        html[dir="rtl"] .goog-te-gadget .goog-te-combo,
        [dir="rtl"] .goog-te-gadget .goog-te-combo {
          text-align: right !important;
          direction: rtl !important;
          padding: 8px 12px 8px 32px !important;
        }
        
        html[dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before,
        [dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'اختر اللغة 🌐' !important;
        }
        
        /* MOBILE RESPONSIVE with ABSOLUTE MAXIMUM visibility */
        @media screen and (max-width: 640px) {
          #google_translate_element {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 120px !important;
            min-width: 120px !important;
            height: 44px !important;
            min-height: 44px !important;
            position: relative !important;
            z-index: 99999 !important;
            overflow: visible !important;
          }
          
          .goog-te-gadget {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 120px !important;
            height: 44px !important;
            position: relative !important;
            z-index: 99999 !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            min-width: 120px !important;
            width: 120px !important;
            max-width: 120px !important;
            font-size: 13px !important;
            padding: 6px 24px 6px 8px !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 99999 !important;
            height: 44px !important;
            line-height: 1.4 !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: '🌐 Language' !important;
            font-size: 13px !important;
          }
        }
        
        /* TABLET RESPONSIVE with ABSOLUTE MAXIMUM visibility */
        @media screen and (min-width: 641px) and (max-width: 1024px) {
          #google_translate_element {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 140px !important;
            min-width: 140px !important;
            height: 44px !important;
            min-height: 44px !important;
            position: relative !important;
            z-index: 99999 !important;
            overflow: visible !important;
          }
          
          .goog-te-gadget {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 140px !important;
            height: 44px !important;
            position: relative !important;
            z-index: 99999 !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            min-width: 140px !important;
            width: 140px !important;
            max-width: 140px !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 99999 !important;
            height: 44px !important;
          }
        }
        
        /* DESKTOP with enhanced visibility */
        @media screen and (min-width: 1025px) {
          #google_translate_element {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 160px !important;
            min-width: 160px !important;
            height: 44px !important;
            min-height: 44px !important;
            position: relative !important;
            z-index: 99999 !important;
            overflow: visible !important;
          }
          
          .goog-te-gadget {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 160px !important;
            height: 44px !important;
            position: relative !important;
            z-index: 99999 !important;
          }
          
          .goog-te-gadget .goog-te-combo {
            min-width: 160px !important;
            width: 160px !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 99999 !important;
            height: 44px !important;
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
        
        /* FORCE container visibility at all costs */
        #google_translate_element {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          z-index: 99999 !important;
          overflow: visible !important;
          background: transparent !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Additional forced visibility rules */
        #google_translate_element * {
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        #google_translate_element .goog-te-gadget {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        #google_translate_element .goog-te-combo {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize Google Translate with enhanced visibility monitoring
    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            // Priority languages first as requested
            includedLanguages: 'zh-CN,es,hi,ar,bn,pt,ru,ja,pa,de,fr,sw,uk,pl,tr,it,nl,ko,th,vi,ms,id,tl,ur,fa,he,am,ha,yo,ig,zu,af,sq,eu,be,bg,ca,hr,cs,da,et,fi,gl,el,hu,is,ga,lv,lt,mk,mt,no,ro,sr,sk,sl,sv,cy,eo,la,jw,su,ceb,ny,hmn,ht,mg,mi,sm,haw,yi,ug,ky,kk,uz,tg,mn,ne,si,my,km,lo,ka,gu,ta,te,kn,ml,or,as,sd,ps,ku,az,hy,is,fo,lb',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
            gaTrack: false,
            gaId: null
          },
          'google_translate_element'
        );
        
        // AGGRESSIVE visibility enforcement after initialization
        setTimeout(() => {
          const translateElement = document.getElementById('google_translate_element');
          const gadget = document.querySelector('.goog-te-gadget');
          const combo = document.querySelector('.goog-te-combo');
          
          if (translateElement) {
            translateElement.style.display = 'block';
            translateElement.style.visibility = 'visible';
            translateElement.style.opacity = '1';
            translateElement.style.position = 'relative';
            translateElement.style.zIndex = '99999';
          }
          
          if (gadget) {
            const gadgetEl = gadget as HTMLElement;
            gadgetEl.style.display = 'block';
            gadgetEl.style.visibility = 'visible';
            gadgetEl.style.opacity = '1';
            gadgetEl.style.position = 'relative';
            gadgetEl.style.zIndex = '99999';
          }
          
          if (combo) {
            const comboEl = combo as HTMLElement;
            comboEl.style.display = 'block';
            comboEl.style.visibility = 'visible';
            comboEl.style.opacity = '1';
            comboEl.style.position = 'relative';
            comboEl.style.zIndex = '99999';
            comboEl.setAttribute('tabindex', '0');
            comboEl.setAttribute('role', 'combobox');
            comboEl.setAttribute('aria-expanded', 'false');
            comboEl.setAttribute('aria-haspopup', 'listbox');
            comboEl.setAttribute('aria-label', 'Select website language for translation');
            
            // Enhanced keyboard navigation
            combo.addEventListener('keydown', (e: any) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                comboEl.click();
              }
            });
          }
        }, 800);
      }
    };

    // Set up global function for Google Translate callback
    window.googleTranslateElementInit = () => {
      addCustomStyles();
      setTimeout(initializeGoogleTranslate, 300);
    };

    // Load Google Translate script
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTimeout(() => {
          if (window.googleTranslateElementInit) {
            window.googleTranslateElementInit();
          }
        }, 500);
      };
      document.head.appendChild(script);
    } else if (window.google && window.google.translate) {
      setTimeout(() => window.googleTranslateElementInit(), 300);
    }

    // Add styles immediately
    addCustomStyles();

    // AGGRESSIVE visibility monitoring - check every 1 second for 15 seconds
    const visibilityInterval = setInterval(() => {
      const element = document.getElementById('google_translate_element');
      const gadget = document.querySelector('.goog-te-gadget');
      const combo = document.querySelector('.goog-te-combo');
      
      if (element) {
        element.style.display = 'block';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        element.style.position = 'relative';
        element.style.zIndex = '99999';
      }
      
      if (gadget) {
        const gadgetEl = gadget as HTMLElement;
        gadgetEl.style.display = 'block';
        gadgetEl.style.visibility = 'visible';
        gadgetEl.style.opacity = '1';
        gadgetEl.style.position = 'relative';
        gadgetEl.style.zIndex = '99999';
      }
      
      if (combo) {
        const comboEl = combo as HTMLElement;
        comboEl.style.display = 'block';
        comboEl.style.visibility = 'visible';
        comboEl.style.opacity = '1';
        comboEl.style.position = 'relative';
        comboEl.style.zIndex = '99999';
      }
    }, 1000);

    setTimeout(() => clearInterval(visibilityInterval), 15000);

    // Monitor for language changes for RTL support
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
      // Cleanup
      if (visibilityInterval) clearInterval(visibilityInterval);
      const scripts = document.querySelectorAll('script[src*="translate.google.com"]');
      const styles = document.querySelectorAll('style');
      
      scripts.forEach(script => script.remove());
      styles.forEach(style => {
        if (style.innerHTML.includes('goog-te')) {
          style.remove();
        }
      });
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      aria-label="Website language selector"
      role="region"
      className="translate-widget"
      style={{ 
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'relative',
        zIndex: 99999,
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