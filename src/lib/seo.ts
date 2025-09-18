// SEO constants and schemas
export const SITE_CONFIG = {
  name: "Global Health Access Trust",
  url: "https://globalhealthaccesstrust.org",
  description: "A charity building lasting access to healthcare for vulnerable and underserved populations worldwide",
  image: "/ghat-logo.png"
};

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Global Health Access Trust",
  "alternateName": "GHAT",
  "url": "https://globalhealthaccesstrust.org",
  "logo": "https://globalhealthaccesstrust.org/ghat-logo.png",
  "description": "A charity building lasting access to healthcare for vulnerable and underserved populations worldwide through ethical healthcare interventions, capacity building, and systems strengthening.",
  "foundingDate": "2025",
  "foundingLocation": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB"
  },
  "sameAs": [
    "https://globalhealthaccesstrust.org"
  ],
  "knowsAbout": [
    "Global Health",
    "Healthcare Access",
    "Humanitarian Aid",
    "Health Systems Strengthening",
    "Medical Humanitarian Response"
  ],
  "serviceArea": {
    "@type": "Place",
    "name": "Worldwide"
  }
};

// FAQ Schema generator
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Article Schema generator
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image || "https://globalhealthaccesstrust.org/ghat-logo.png",
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Global Health Access Trust",
    "logo": {
      "@type": "ImageObject",
      "url": "https://globalhealthaccesstrust.org/ghat-logo.png"
    }
  },
  "datePublished": article.publishDate,
  "dateModified": article.modifiedDate || article.publishDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
});

// Keywords by page
export const PAGE_KEYWORDS = {
  home: "global health access, healthcare for all, medical humanitarian aid, health systems strengthening, vulnerable populations healthcare",
  about: "healthcare charity, global health organization, medical humanitarian trust, healthcare access mission",
  whatWeDo: "healthcare interventions, medical capacity building, health systems, humanitarian response, healthcare equity",
  blog: "global health insights, healthcare policy, medical humanitarian stories, health access updates",
  contact: "healthcare charity contact, global health organization, medical humanitarian support",
  partner: "partner with healthcare charity, support global health, medical humanitarian contributions",
  governance: "healthcare charity governance, medical trust transparency, health organization accountability"
};