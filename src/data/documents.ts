export interface Document {
  id: string;
  title: string;
  description: string;
  type: DocumentType;
  version: string;
  publishDate: string;
  lastUpdated: string;
  region?: string;
  language: string;
  tags: string[];
  fileUrl?: string;
  externalUrl?: string;
  hasInlineViewer: boolean;
  checksum?: string;
  isAuthoritative: boolean;
}

export type DocumentType = 
  | "Constitution"
  | "Annual Report" 
  | "Audited Accounts"
  | "Policy"
  | "Statement"
  | "Press Release"
  | "Other";

export const documents: Document[] = [
  {
    id: "constitution-signed",
    title: "Constitution (Signed)", 
    description: "The formal governing document of the Global Health Access Trust, establishing its charitable purposes, trustees' powers, and operational framework in accordance with English charity law.",
    type: "Constitution",
    version: "1.0",
    publishDate: "2024-12-01",
    lastUpdated: "2024-12-01", 
    language: "English",
    tags: ["governance", "legal", "charitable purposes"],
    fileUrl: "/documents/ghat-constitution-signed.pdf",
    hasInlineViewer: true,
    checksum: "sha256:a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890",
    isAuthoritative: true
  },
  {
    id: "annual-report-2023",
    title: "Annual Report 2023",
    description: "Comprehensive review of the Trust's activities, impact, and financial stewardship during the 2023 calendar year, including programme outcomes and governance updates.",
    type: "Annual Report",
    version: "1.0", 
    publishDate: "2024-03-31",
    lastUpdated: "2024-03-31",
    language: "English",
    tags: ["annual report", "impact", "transparency"],
    fileUrl: "/documents/ghat-annual-report-2023.pdf",
    hasInlineViewer: true,
    checksum: "sha256:b2c3d4e5f6789012345678901234567890123456789012345678901234567890a1",
    isAuthoritative: true
  },
  {
    id: "safeguarding-statement-2024", 
    title: "Safeguarding Statement 2024",
    description: "Our comprehensive approach to safeguarding vulnerable individuals across all programme activities, including reporting procedures and accountability mechanisms.",
    type: "Statement",
    version: "2.0",
    publishDate: "2024-01-15",
    lastUpdated: "2024-09-01",
    language: "English", 
    tags: ["safeguarding", "protection", "accountability"],
    fileUrl: "/documents/ghat-safeguarding-statement-2024.pdf",
    hasInlineViewer: true,
    checksum: "sha256:c3d4e5f6789012345678901234567890123456789012345678901234567890a1b2",
    isAuthoritative: true
  }
];

export const documentTypes: DocumentType[] = [
  "Constitution",
  "Annual Report", 
  "Audited Accounts",
  "Policy",
  "Statement", 
  "Press Release",
  "Other"
];

export const getDocumentsByType = (type: DocumentType): Document[] => {
  return documents.filter(doc => doc.type === type);
};

export const getConstitutionDocument = (): Document | undefined => {
  return documents.find(doc => doc.type === "Constitution");
};

export const getFeaturedDocuments = (): Document[] => {
  return documents
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 6);
};