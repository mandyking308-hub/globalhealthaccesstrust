// Central source of truth for GHAT legal entity information.
// Do not display registration or company numbers unless a confirmed value
// is added to this file. Do not label the correspondence address a
// "registered office" unless separately confirmed.

export const LEGAL_ENTITY = {
  legalName: "Global Health Access Trust",
  shortName: "GHAT",

  publicLegalDescription:
    "Global Health Access Trust is a charitable trust established under the laws of England and Wales. It was constituted by Trust Deed with effect from 1 December 2024 and is administered by its Board of Trustees exclusively for charitable purposes and the public benefit.",

  publicLegalDescriptionLong:
    "Global Health Access Trust is a charitable trust established under the laws of England and Wales. Its founding and principal governing document is the Trust Deed effective from 1 December 2024. The trustees also adopted a signed Constitution in June 2025 to record supplementary governance and operating arrangements, including the arrangements provided for banking due diligence. The Constitution does not replace the Trust Deed. The Trustees are responsible for ensuring that the Trust's assets and activities are applied exclusively in furtherance of its charitable purposes and for the public benefit.",

  jurisdiction: "England and Wales",
  governingDocument: "Trust Deed",
  supplementaryGovernanceDocument: "Signed Constitution adopted June 2025",

  chair: "Mandy King",
  constitutionalSignatories: [
    "Mandy King",
    "Dr Jagdev Thukral",
    "John O'Sullivan",
  ] as const,

  correspondenceAddress: {
    label: "Correspondence address",
    lines: [
      "Global Health Access Trust",
      "2 Harley Street",
      "London",
      "England",
      "United Kingdom",
    ],
    single: "2 Harley Street, London, England, United Kingdom",
  },

  primaryWebsite: "https://globalhealthaccesstrust.com",

  generalContactRoute: "/contact-the-trust",
  privacyContactRoute: "/contact-the-trust",
  complaintsContactRoute: "/contact-the-trust",
  safeguardingContactRoute: "/contact-the-trust",
} as const;

export type LegalEntity = typeof LEGAL_ENTITY;
