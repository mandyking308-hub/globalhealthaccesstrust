// Shared, approved constants for the GHAT website.

export const SITE_CONFIG = {
  name: "Global Health Access Trust",
  shortName: "GHAT",
  description: "A charitable trust that develops, funds and coordinates projects which enable better healthcare.",
  url: "https://globalhealthaccesstrust.com",
  address: {
    line1: "2 Harley Street",
    city: "London",
    country: "England, United Kingdom",
  },
  social: {
    linkedin: "",
    twitter: "",
  },
} as const;

export const NAVIGATION_ITEMS = [
  {
    label: "About",
    href: "/about-the-trust",
    submenu: [
      { label: "About the Trust", href: "/about-the-trust" },
      { label: "Trustee Biographies", href: "/trustee-biographies" },
    ],
  },
  {
    label: "Governance",
    href: "/governance-legal-framework",
    submenu: [
      { label: "Governance & Legal Framework", href: "/governance-legal-framework" },
      { label: "Governance & Oversight", href: "/governance" },
    ],
  },
  {
    label: "Our Work",
    href: "/our-work",
    submenu: [
      { label: "Our Work", href: "/our-work" },
      { label: "How We Work", href: "/how-we-work" },
    ],
  },
  {
    label: "Support",
    href: "/support-the-trust",
    submenu: [
      { label: "Support the Trust", href: "/support-the-trust" },
      { label: "Pledge a Contribution", href: "/donate" },
      { label: "Donor Portal Guide", href: "/donor-guide" },
      { label: "Donor Recognition", href: "/donor-recognition" },
    ],
  },
  {
    label: "Help",
    href: "/frequently-asked-questions",
    submenu: [
      { label: "Frequently Asked Questions", href: "/frequently-asked-questions" },
      { label: "Contact", href: "/contact-the-trust" },
    ],
  },
] as const;

export const FOOTER_SECTIONS = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About the Trust", href: "/about-the-trust" },
    { label: "Our Work", href: "/our-work" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Support the Trust", href: "/support-the-trust" },
    { label: "Publications & Documents", href: "/publications" },
    { label: "Contact", href: "/contact-the-trust" },
  ],
  governance: [
    { label: "Governance & Legal Framework", href: "/governance-legal-framework" },
    { label: "Governance & Oversight", href: "/governance" },
    { label: "Privacy Notice", href: "/legal/privacy-notice" },
    { label: "Cookie Notice", href: "/cookie-policy" },
    { label: "Terms of Use", href: "/legal/terms-of-use" },
    { label: "Accessibility Statement", href: "/accessibility-statement" },
    { label: "Safeguarding", href: "/safeguarding" },
    { label: "Financial Controls", href: "/financial-controls" },
    { label: "Risk Management", href: "/risk-management" },
    { label: "Conflicts of Interest", href: "/conflict-of-interest" },
    { label: "Whistleblowing", href: "/whistleblowing" },
    { label: "Anti-Fraud & Anti-Corruption", href: "/anti-fraud" },
    { label: "Trust Deed", href: "/constitution" },
  ],
} as const;

export const IMPACT_STATS = [
  {
    number: "12",
    label: "Countries",
    description: "Work, learning and relationships developed across twelve countries",
  },
  {
    number: "40+",
    label: "Relationships",
    description: "Delivery, professional and network relationships supporting public-benefit work",
  },
  {
    number: "Thousands",
    label: "Contributors",
    description: "Clinicians and other contributors connected through professional networks",
  },
] as const;

export const NEW_IMPACT_STATS = [
  { icon: "Globe", text: "Work, learning and relationships across 12 countries" },
  { icon: "Users", text: "More than 40 delivery and network relationships" },
  { icon: "Heart", text: "Thousands of clinicians and contributors connected through professional networks" },
  { icon: "TrendingUp", text: "Public-benefit work spanning health, infrastructure, education, food systems and responsible technology" },
] as const;

export const PROGRAM_AREAS = [
  {
    id: "healthcare-access",
    title: "Healthcare Access and Health Systems",
    icon: "Heart",
    description: "Projects that enable better healthcare by strengthening access, workforce capability, facilities, equipment, referral pathways and accountable health systems.",
    outcomes: [
      "Improved access to appropriate healthcare through regulated providers",
      "Stronger workforce, facilities, equipment and enabling infrastructure",
      "Better coordination, referral, information and supply systems",
    ],
  },
  {
    id: "infrastructure-living-conditions",
    title: "Infrastructure, Housing and Safe Living Conditions",
    icon: "Building",
    description: "Land, buildings, housing and essential infrastructure where these directly support health, safety, recovery, education, humanitarian relief or community resilience.",
    outcomes: [
      "Safer and more suitable living or working environments",
      "Essential premises and infrastructure for public-benefit activity",
      "Reduced health risks arising from unsafe or unstable conditions",
    ],
  },
  {
    id: "food-water-systems",
    title: "Food, Agriculture, Water and Essential Systems",
    icon: "Globe",
    description: "Work that strengthens food security, agriculture, nutrition, water, sanitation, utilities, storage and supply systems connected to health and dignified living.",
    outcomes: [
      "More resilient food and agricultural systems",
      "Improved access to nutrition, safe water and sanitation",
      "Better storage, logistics and availability of essential resources",
    ],
  },
  {
    id: "education-livelihoods",
    title: "Education, Skills, Livelihoods and Human Capability",
    icon: "Users",
    description: "Education, training, professional development, employment pathways and enterprise capability where these relieve vulnerability and directly advance health and public benefit.",
    outcomes: [
      "Greater professional, practical and community capability",
      "Sustainable livelihoods connected to health and resilience",
      "Education and training that strengthen long-term public benefit",
    ],
  },
  {
    id: "responsible-technology",
    title: "Responsible AI, Technology and Data",
    icon: "TrendingUp",
    description: "Technology and artificial intelligence used to support research, coordination, evidence, communication, logistics and accountable delivery while keeping human judgment central.",
    outcomes: [
      "Better visibility, coordination and evidence",
      "Technology that expands human capability rather than replacing responsibility",
      "Secure and proportionate systems suited to the real project need",
    ],
  },
  {
    id: "humanitarian-reform",
    title: "Humanitarian Response, Research and Systems Reform",
    icon: "ArrowRight",
    description: "Humanitarian support, community protection, research, legal inquiry and practical systems reform in settings affected by conflict, displacement, exclusion or serious institutional failure.",
    outcomes: [
      "Accountable support in urgent and conflict-affected settings",
      "Protection and support for vulnerable communities",
      "Research and reform that improve access, resilience and accountability",
    ],
  },
] as const;

// No testimonials are published unless they are genuine, approved and evidenced.
export const TESTIMONIALS: Array<{
  quote: string;
  author: string;
  role: string;
  organization: string;
}> = [];

export const TRUSTEES = [
  {
    name: "Mandy King",
    role: "Chair of Trustees",
    bio: "An experienced business operator and technology strategist whose work spans healthcare, social care, education, artificial intelligence and international operations.",
    expertise: "Institutional Strategy, Technology, AI, Enterprise and International Operations",
  },
  {
    name: "Dr Jagdev Thukral",
    role: "Trustee and Executive Lead",
    bio: "An NHS psychiatrist with more than 25 years of clinical experience across public and private mental health services.",
    expertise: "Clinical Strategy, Safeguarding, Mental Health and Professional Partnerships",
  },
  {
    name: "John O'Sullivan BA FCA",
    role: "Trustee — Finance and Governance",
    bio: "A senior financial and governance professional supporting the Trust on financial stewardship, audit, risk and long-term institutional planning.",
    expertise: "Finance, Audit, Risk and Governance",
  },
] as const;

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
  { code: 'ts', name: 'Tsonga', nativeName: 'Xigitsonga', rtl: false },
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
  { code: 'pam', name: 'Kapampangan', nativeName: 'Kapampangan', rtl: false },
] as const;

export const CONTACT_INFO = {
  address: {
    line1: "Global Health Access Trust",
    line2: "2 Harley Street",
    city: "London",
    country: "United Kingdom",
  },
} as const;

// Social accounts are not published until verified and approved.
export const SOCIAL_LINKS: Array<{ platform: string; url: string; icon: string }> = [];

// Fixed public donation tiers are not used while the Trust operates a pledge-first process.
export const DONATION_TIERS: Array<{ amount: number; description: string }> = [];
