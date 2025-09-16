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

export const PROGRAM_AREAS = [
  {
    id: "healthcare-access",
    title: "Healthcare Access",
    description: "Ensuring lawful, equitable, and dignified care for all in need, regardless of geography or circumstances.",
    icon: "Heart",
    outcomes: [
      "2,400 patients reached through subsidised healthcare services",
      "Healthcare infrastructure established in 12 underserved regions",
      "Medical supplies provided to 450 clinics during critical shortages"
    ]
  },
  {
    id: "education-training",
    title: "Education & Training",
    description: "Building future capacity through lawful training, education, and ethical formation of healthcare professionals.",
    icon: "GraduationCap",
    outcomes: [
      "680 healthcare professionals trained across 15 countries",
      "Medical scholarships provided to 200 students from underserved communities",
      "Professional development programmes established in 8 training institutions"
    ]
  },
  {
    id: "systems-strengthening",
    title: "Systems Strengthening",
    description: "Reinforcing institutional care and health equity through lawful public service and infrastructure development.",
    icon: "Building",
    outcomes: [
      "Health systems strengthened in 25 regions affected by conflict",
      "Digital health records implemented across 150 clinics",
      "Public health infrastructure improved for 1.2 million people"
    ]
  },
  {
    id: "research-policy",
    title: "Research & Policy",
    description: "Advancing lawful insight, policy integrity, and institutional accountability in global health access.",
    icon: "FileText",
    outcomes: [
      "15 policy research studies published on health access barriers",
      "Legal frameworks improved in 8 countries to enhance healthcare rights",
      "Impact evaluations completed for 45 health system interventions"
    ]
  },
  {
    id: "emergency-relief",
    title: "Emergency Relief",
    description: "Delivering time-sensitive healthcare access during humanitarian emergencies, conflicts, and public health disasters.",
    icon: "AlertTriangle",
    outcomes: [
      "Emergency healthcare provided to 15,000 displaced persons",
      "Crisis response teams deployed to 6 humanitarian emergencies",
      "Medical supplies delivered within 48 hours to disaster zones"
    ]
  }
] as const;

export const IMPACT_STATS = [
  {
    number: "2.3M",
    label: "People Reached",
    description: "Individuals who have accessed healthcare through GHAT-supported programmes"
  },
  {
    number: "£4.2M",
    label: "Grants Awarded",
    description: "Total funding provided to charitable programmes since establishment"
  },
  {
    number: "45",
    label: "Countries Served",
    description: "Nations where GHAT has supported healthcare access initiatives"
  }
] as const;

export const TESTIMONIALS = [
  {
    quote: "The Global Health Access Trust's support enabled our community clinic to provide essential care to 800 families who had no other access to healthcare. Their approach respects both our dignity and our medical expertise.",
    author: "Dr. Amara Kone",
    role: "Director",
    organization: "Community Health Centre, Mali"
  },
  {
    quote: "GHAT's scholarship programme allowed me to complete my medical training and return to serve my community. Now I'm treating patients who, like me, deserve healthcare regardless of their circumstances.",
    author: "Dr. Fatima Al-Rashid",
    role: "General Practitioner",
    organization: "Rural Health Initiative, Jordan"
  },
  {
    quote: "During the emergency, GHAT's rapid response meant the difference between life and death for displaced families. Their professionalism and respect for human dignity sets them apart.",
    author: "Maria Santos",
    role: "Emergency Coordinator",
    organization: "International Relief Network"
  }
] as const;

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
] as const;

export const DOCUMENT_TYPES = [
  'Constitution',
  'Annual Report', 
  'Audited Accounts',
  'Policy',
  'Statement',
  'Press Release',
  'Other'
] as const;

export const REGIONS = [
  'Africa',
  'South Asia',
  'Middle East & North Africa',
  'Latin America',
  'Eastern Europe',
  'Global'
] as const;