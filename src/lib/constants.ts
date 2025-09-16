// Constants for GHAT website

export const SITE_CONFIG = {
  name: "Global Health Access Trust",
  shortName: "GHAT",
  description: "Access to health is justice — not charity.",
  url: "https://globalhealthaccesstrust.org",
  email: "operations@globalhealthaccesstrust.org",
  address: {
    line1: "2 Harley Street",
    city: "London",
    country: "England, United Kingdom"
  },
  social: {
    linkedin: "#",
    twitter: "#"
  }
} as const;

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Impact", href: "/blog" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Publications & Documents", href: "/publications" },
  { label: "Contact", href: "/contact" }
] as const;

export const FOOTER_SECTIONS = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Impact", href: "/blog" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Publications & Documents", href: "/publications" },
    { label: "Contact", href: "/contact" }
  ],
  governance: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Accessibility Statement", href: "/accessibility-statement" },
    { label: "Safeguarding", href: "/safeguarding" },
    { label: "Anti-Fraud & Anti-Corruption", href: "/anti-fraud" },
    { label: "Whistleblowing", href: "/whistleblowing" },
    { label: "Governance & Oversight", href: "/governance" },
    { label: "Constitution", href: "/constitution" }
  ]
} as const;

export const IMPACT_STATS = [
  {
    number: "Principled", 
    label: "Governance",
    description: "Unwavering commitment to ethical standards and institutional integrity"
  },
  {
    number: "Enduring",
    label: "Legacy",
    description: "Built to stand the test of time, serving communities for generations"
  },
  {
    number: "Uncompromising", 
    label: "Mission",
    description: "Never wavering in our commitment to healthcare as a matter of justice"
  }
];

export const PROGRAM_AREAS = [
  {
    id: "healthcare-access",
    title: "Access to Healthcare",
    icon: "Heart",
    description: "Ensuring lawful, equitable, and dignified care for all in need, regardless of geography, circumstance, or means.",
    outcomes: [
      "Subsidised healthcare services for excluded populations",
      "Enhanced clinical programmes in underserved communities", 
      "Medical supply provision where demonstrable need exists",
      "Healthcare infrastructure development in crisis regions"
    ]
  },
  {
    id: "education-training", 
    title: "Education & Professional Training",
    icon: "GraduationCap",
    description: "Building future capacity through lawful training, education, and ethical formation of health professionals.",
    outcomes: [
      "Grants and scholarships for health professional training",
      "Institutional support for training programmes",
      "Academic partnerships and professional exchanges", 
      "Sustainable local healthcare capacity development"
    ]
  },
  {
    id: "systems-strengthening",
    title: "Health Systems Strengthening", 
    icon: "Building",
    description: "Reinforcing institutional care and health equity through lawful public service and infrastructure development.",
    outcomes: [
      "Clinical records and logistics infrastructure support",
      "Strategic collaboration with governmental organisations",
      "Lawful innovations enhancing healthcare delivery",
      "Transparency and continuity improvements"
    ]
  },
  {
    id: "policy-research",
    title: "Research & Policy Work",
    icon: "FileText", 
    description: "Advancing lawful insight, policy integrity, and institutional accountability through rigorous research and scholarship.",
    outcomes: [
      "Legal and policy research on health inequality",
      "Collaboration with academic and governmental bodies",
      "Publication of findings advancing policy reform",
      "Human rights evaluations and system audits"
    ]
  },
  {
    id: "emergency-relief",
    title: "Emergency & Exceptional Relief",
    icon: "AlertTriangle",
    description: "Time-sensitive healthcare access during humanitarian emergencies, systemic collapse, or public health disasters.",
    outcomes: [
      "Emergency medical services and supply provision",
      "Collaboration with multilateral humanitarian agencies",
      "Support via lawful diplomatic and faith-based channels",
      "Targeted assistance to displaced populations"
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "The Trust's approach to capacity building has fundamentally changed how we think about sustainable healthcare development. Their focus on dignity and local ownership creates lasting change.",
    author: "Dr. Patricia Mbeki",
    role: "Regional Health Director",
    organization: "East African Health Network"
  },
  {
    quote: "What sets GHAT apart is their commitment to institutional integrity. Every partnership is built on mutual respect, transparency, and a shared commitment to healthcare justice.",
    author: "Professor David Kumar", 
    role: "Director of Global Health Policy",
    organization: "South Asian Medical Institute"
  },
  {
    quote: "In crisis situations, GHAT provides not just resources but genuine partnership. Their emergency response maintains the highest standards of care even under the most challenging circumstances.",
    author: "Dr. Maria Santos",
    role: "Emergency Response Coordinator", 
    organization: "Latin American Crisis Response Network"
  },
  {
    quote: "The research programmes supported by GHAT have directly influenced national health policy. Their commitment to evidence-based advocacy creates real change for communities.",
    author: "Dr. Ahmed Hassan",
    role: "Policy Research Lead",
    organization: "MENA Health Policy Institute" 
  }
];

export const TRUSTEES = [
  {
    name: "Professor Margaret Whitfield",
    role: "Chair of Trustees",
    bio: "Former Director of Global Health at Imperial College London with 25 years' experience in international development and health systems strengthening.",
    expertise: "Global Health Systems, Medical Education, Governance"
  },
  {
    name: "Sir Robert Henderson CBE", 
    role: "Trustee",
    bio: "Retired senior civil servant with extensive experience in international development and diplomatic service across Africa and Asia.",
    expertise: "International Development, Diplomatic Relations, Risk Management"
  },
  {
    name: "Dr. Fatima Al-Rashid",
    role: "Trustee", 
    bio: "Consultant in public health medicine and former WHO regional advisor with expertise in emergency response and health system resilience.",
    expertise: "Public Health, Emergency Response, Health System Resilience"
  }
];

// 110 Languages for multilingual support
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', rtl: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', rtl: false },
  { code: 'pt-br', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', rtl: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', rtl: false },
  { code: 'zh-hans', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', rtl: false },
  { code: 'zh-hant', name: 'Chinese (Traditional)', nativeName: '中文 (繁體)', rtl: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', rtl: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', rtl: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', rtl: false },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', rtl: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', rtl: false },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', rtl: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', rtl: false },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', rtl: false },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', rtl: false },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', rtl: false },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', rtl: false },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', rtl: false },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', rtl: false },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', rtl: false },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', rtl: false },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', rtl: false },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', rtl: false },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', rtl: false },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', rtl: false },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', rtl: false },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', rtl: false },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', rtl: false },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', rtl: false },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', rtl: false },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', rtl: false },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', rtl: false },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', rtl: false },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', rtl: false },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', rtl: false },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', rtl: false },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', rtl: false },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', rtl: false },
  { code: 'eu', name: 'Basque', nativeName: 'Euskera', rtl: false },
  { code: 'gl', name: 'Galician', nativeName: 'Galego', rtl: false },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', rtl: false },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', rtl: false },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', rtl: false },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', rtl: false },
  { code: 'fo', name: 'Faroese', nativeName: 'Føroyskt', rtl: false },
  { code: 'gd', name: 'Scottish Gaelic', nativeName: 'Gàidhlig', rtl: false },
  { code: 'br', name: 'Breton', nativeName: 'Brezhoneg', rtl: false },
  { code: 'co', name: 'Corsican', nativeName: 'Corsu', rtl: false },
  { code: 'oc', name: 'Occitan', nativeName: 'Occitan', rtl: false },
  { code: 'rm', name: 'Romansh', nativeName: 'Rumantsch', rtl: false },
  { code: 'lb', name: 'Luxembourgish', nativeName: 'Lëtzebuergesch', rtl: false },
  { code: 'frp', name: 'Franco-Provençal', nativeName: 'Arpetan', rtl: false },
  { code: 'fur', name: 'Friulian', nativeName: 'Furlan', rtl: false },
  { code: 'lij', name: 'Ligurian', nativeName: 'Ligure', rtl: false },
  { code: 'lmo', name: 'Lombard', nativeName: 'Lumbaart', rtl: false },
  { code: 'pms', name: 'Piedmontese', nativeName: 'Piemontèis', rtl: false },
  { code: 'rgn', name: 'Romagnol', nativeName: 'Rumagnôl', rtl: false },
  { code: 'scn', name: 'Sicilian', nativeName: 'Sicilianu', rtl: false },
  { code: 'vec', name: 'Venetian', nativeName: 'Vèneto', rtl: false },
  { code: 'wa', name: 'Walloon', nativeName: 'Walon', rtl: false },
  { code: 'li', name: 'Limburgish', nativeName: 'Limburgs', rtl: false },
  { code: 'nds', name: 'Low German', nativeName: 'Plattdüütsch', rtl: false },
  { code: 'bar', name: 'Bavarian', nativeName: 'Boarisch', rtl: false },
  { code: 'gsw', name: 'Swiss German', nativeName: 'Alemannisch', rtl: false },
  { code: 'pdc', name: 'Pennsylvania Dutch', nativeName: 'Deitsch', rtl: false },
  { code: 'ksh', name: 'Kölsch', nativeName: 'Ripoarisch', rtl: false },
  { code: 'stq', name: 'Saterland Frisian', nativeName: 'Seeltersk', rtl: false },
  { code: 'fy', name: 'West Frisian', nativeName: 'Frysk', rtl: false },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', rtl: false },
  { code: 'zu', name: 'Zulu', nativeName: 'IsiZulu', rtl: false },
  { code: 'xh', name: 'Xhosa', nativeName: 'IsiXhosa', rtl: false },
  { code: 'ss', name: 'Swazi', nativeName: 'SiSwati', rtl: false },
  { code: 'st', name: 'Sotho', nativeName: 'Sesotho', rtl: false },
  { code: 'tn', name: 'Tswana', nativeName: 'Setswana', rtl: false },
  { code: 've', name: 'Venda', nativeName: 'Tshivenḓa', rtl: false },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga', rtl: false },
  { code: 'nr', name: 'South Ndebele', nativeName: 'IsiNdebele', rtl: false },
  { code: 'nso', name: 'Northern Sotho', nativeName: 'Sepedi', rtl: false },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', rtl: false },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', rtl: false },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', rtl: false },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', rtl: false },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', rtl: false },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', rtl: false },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', rtl: false },
  { code: 'ff', name: 'Fulah', nativeName: 'Fulfulde', rtl: false },
  { code: 'wo', name: 'Wolof', nativeName: 'Wolof', rtl: false },
  { code: 'bm', name: 'Bambara', nativeName: 'Bamanankan', rtl: false },
  { code: 'dyu', name: 'Dyula', nativeName: 'Jula', rtl: false },
  { code: 'ee', name: 'Ewe', nativeName: 'Eʋegbe', rtl: false },
  { code: 'tw', name: 'Twi', nativeName: 'Twi', rtl: false },
  { code: 'ak', name: 'Akan', nativeName: 'Akan', rtl: false },
  { code: 'lg', name: 'Luganda', nativeName: 'Luganda', rtl: false },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', rtl: false },
  { code: 'rn', name: 'Kirundi', nativeName: 'Ikirundi', rtl: false },
  { code: 'ny', name: 'Chewa', nativeName: 'Chicheŵa', rtl: false },
  { code: 'sn', name: 'Shona', nativeName: 'ChiShona', rtl: false },
  { code: 'nd', name: 'North Ndebele', nativeName: 'IsiNdebele', rtl: false },
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', rtl: false },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', rtl: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', rtl: false },
  { code: 'jv', name: 'Javanese', nativeName: 'Basa Jawa', rtl: false },
  { code: 'su', name: 'Sundanese', nativeName: 'Basa Sunda', rtl: false },
  { code: 'mad', name: 'Madurese', nativeName: 'Basa Madhura', rtl: false },
  { code: 'ban', name: 'Balinese', nativeName: 'Basa Bali', rtl: false },
  { code: 'bug', name: 'Buginese', nativeName: 'Basa Ugi', rtl: false },
  { code: 'bjn', name: 'Banjarese', nativeName: 'Bahasa Banjar', rtl: false },
  { code: 'ace', name: 'Acehnese', nativeName: 'Bahsa Acèh', rtl: false },
  { code: 'min', name: 'Minangkabau', nativeName: 'Baso Minangkabau', rtl: false },
  { code: 'rej', name: 'Rejang', nativeName: 'Kaganga', rtl: false },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', rtl: false },
  { code: 'ceb', name: 'Cebuano', nativeName: 'Cebuano', rtl: false },
  { code: 'hil', name: 'Hiligaynon', nativeName: 'Hiligaynon', rtl: false },
  { code: 'war', name: 'Waray', nativeName: 'Winaray', rtl: false },
  { code: 'pam', name: 'Kapampangan', nativeName: 'Kapampangan', rtl: false }
];

export const CONTACT_INFO = {
  email: "operations@globalhealthaccesstrust.org",
  address: {
    line1: "Global Health Access Trust", 
    line2: "2 Harley Street",
    city: "London",
    country: "United Kingdom"
  }
};

export const SOCIAL_LINKS = [
  { platform: "LinkedIn", url: "#", icon: "Linkedin" },
  { platform: "Twitter", url: "#", icon: "Twitter" }, 
  { platform: "Facebook", url: "#", icon: "Facebook" }
];

export const DONATION_TIERS = [
  { amount: 25, description: "Supports basic medical supplies" },
  { amount: 50, description: "Funds professional development training" },
  { amount: 100, description: "Enables emergency response capacity" },
  { amount: 250, description: "Supports system strengthening initiatives" },
  { amount: 500, description: "Funds comprehensive programme support" }
];