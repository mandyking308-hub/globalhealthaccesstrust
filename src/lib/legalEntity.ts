// Central source of truth for GHAT legal entity information.
// Do not display registration or company numbers unless a confirmed value
// is added to this file. Do not label the correspondence address a
// "registered office" unless separately confirmed.

export const LEGAL_ENTITY = {
  legalName: "Global Health Access Trust",
  shortName: "GHAT",

  publicLegalDescription:
    "Global Health Access Trust is an unincorporated charitable organisation established in England and Wales and governed by its Constitution adopted in June 2025. It is administered by its Board of Trustees exclusively for charitable purposes and the public benefit.",

  publicLegalDescriptionLong:
    "Global Health Access Trust is an unincorporated charitable organisation established in England and Wales. The organisation is governed by its Constitution adopted in June 2025 and administered by its Board of Trustees. The Trustees are responsible for ensuring that its assets and activities are applied exclusively in furtherance of its charitable purposes and for the public benefit.",

  jurisdiction: "England and Wales",
  governingDocument: "Constitution",

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
