// Central source of truth for GHAT legal entity information.
// Do not display registration or company numbers unless a confirmed value
// is added to this file. Do not label the correspondence address a
// "registered office" unless separately confirmed.

export const LEGAL_ENTITY = {
  legalName: "Global Health Access Trust",
  shortName: "GHAT",

  publicLegalDescription:
    "Global Health Access Trust is a charitable trust established under the laws of England and Wales. It is governed by its Trust Deed and administered by its Board of Trustees exclusively for charitable purposes.",

  publicLegalDescriptionLong:
    "Global Health Access Trust is a charitable trust established under the laws of England and Wales. The Trust is governed by its Trust Deed and administered by its Board of Trustees. The Trustees are responsible for ensuring that the Trust's assets and activities are applied exclusively in furtherance of its charitable purposes and for the public benefit.",

  jurisdiction: "England and Wales",
  governingDocument: "Trust Deed",

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
