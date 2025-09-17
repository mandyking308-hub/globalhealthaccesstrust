import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const GoogleTranslate = () => {
  useEffect(() => {
    // Add custom styles to remove Google branding and style dropdown
    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.id = 'google-translate-styles';
      style.innerHTML = `
        /* Hide Google branding bar/banner completely */
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .goog-te-ftab-font {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          overflow: hidden !important;
        }
        
        /* Ensure body doesn't get pushed down by Google banner */
        body {
          top: 0px !important;
          position: static !important;
        }
        
        /* Style the dropdown container */
        #google_translate_element {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        /* Style the main gadget */
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 14px !important;
          color: inherit !important;
        }
        
        /* Style the dropdown select */
        .goog-te-gadget .goog-te-combo {
          background-color: white !important;
          color: #111111 !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          padding: 8px 12px !important;
          font-size: 14px !important;
          font-family: inherit !important;
          min-height: 40px !important;
          line-height: 1.5 !important;
          cursor: pointer !important;
          outline: none !important;
          transition: all 0.2s ease !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          width: 100% !important;
          max-width: 200px !important;
        }
        
        .goog-te-gadget .goog-te-combo:hover {
          border-color: #9ca3af !important;
          background-color: #f9fafb !important;
        }
        
        .goog-te-gadget .goog-te-combo:focus {
          border-color: #0B2B4C !important;
          box-shadow: 0 0 0 2px rgba(11, 43, 76, 0.1) !important;
        }
        
        /* Hide Google branding images */
        .goog-te-gadget img,
        .goog-te-gadget-simple img,
        .goog-logo-link,
        .goog-te-gadget .goog-te-menu-value img,
        [src*="translate.google"],
        [src*="google.com/images/branding"] {
          display: none !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
        }
        
        /* Remove Google "Powered by" text */
        .goog-te-gadget .goog-te-menu-value span:first-child {
          display: none !important;
        }
        
        /* Custom placeholder text */
        .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'Select Language' !important;
          color: #6b7280 !important;
          font-family: inherit !important;
          font-size: 14px !important;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .goog-te-gadget .goog-te-combo {
            font-size: 13px !important;
            padding: 6px 10px !important;
            min-height: 36px !important;
            max-width: 180px !important;
          }
          
          .goog-te-gadget-simple .goog-te-menu-value:before {
            content: 'Language' !important;
            font-size: 13px !important;
          }
        }
        
        /* RTL language support */
        html[dir="rtl"] .goog-te-gadget .goog-te-combo,
        [dir="rtl"] .goog-te-gadget .goog-te-combo {
          text-align: right !important;
          direction: rtl !important;
        }
        
        html[dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before,
        [dir="rtl"] .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'اختر اللغة' !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize Google Translate
    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate) {
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
          'google_translate_element'
        );
      }
    };

    // Set up the callback function
    window.googleTranslateElementInit = () => {
      addCustomStyles();
      setTimeout(initializeGoogleTranslate, 100);
    };

    // Load the Google Translate script if not already loaded
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else if (window.google && window.google.translate) {
      // If script exists and API is ready, initialize immediately
      setTimeout(() => window.googleTranslateElementInit(), 100);
    }

    // Apply styles immediately in case widget already exists
    addCustomStyles();

    return () => {
      // Cleanup on unmount
      const style = document.getElementById('google-translate-styles');
      if (style) style.remove();
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      aria-label="Website language selector"
      role="region"
      className="inline-block"
    />
  );
};