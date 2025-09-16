// Types for GHAT website

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  featuredImage?: string;
  publishDate: string;
  author: Author;
  categories: Category[];
  tags: string[];
  readingTime: number;
  canonicalUrl?: string;
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  type: 'Constitution' | 'Annual Report' | 'Audited Accounts' | 'Policy' | 'Statement' | 'Press Release' | 'Other';
  version: string;
  publishDate: string;
  lastUpdated: string;
  region?: string;
  language: string;
  tags: string[];
  fileUrl?: string;
  externalUrl?: string;
  checksum?: string;
  authoritativeLanguage: string;
  viewerEnabled: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

export interface NewsletterSignup {
  name: string;
  email: string;
  consent: boolean;
}

export interface SearchResult {
  type: 'page' | 'blog' | 'document';
  title: string;
  url: string;
  excerpt: string;
  date?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  subItems?: NavigationItem[];
}

export interface ImpactStat {
  number: string;
  label: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization?: string;
}

export interface ProgramArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  outcomes: string[];
}