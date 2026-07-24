// Central source of truth for GHAT legal entity information.
// Do not display registration or company numbers unless a confirmed value
// is added to this file. Do not label the correspondence address a
// "registered office" unless separately confirmed.

export const LEGAL_ENTITY = {
  legalName: "Global Health Access Trust",
  shortName: "GHAT",

  publicLegalDescription:
    "Global Health Access Trust builds on charitable and community work carried out since 2019. The organisation was formally established with effect from 1 December 2024 and operates for charitable purposes and the public benefit.",

  publicLegalDescriptionLong:
    "Global Health Access Trust builds on charitable and community work carried out since 2019. The organisation was formally established with effect from 1 December 2024. Its Trustees subsequently signed the Constitution in June 2025, confirming the governance and operating arrangements effective from that date. The signed Constitution sits at the centre of the Trust's governance. A Trust Deed is also held as part of its wider legal and governance framework.",

  jurisdiction: "England and Wales",
  governingDocument: "Signed Constitution adopted June 2025",
  supportingGovernanceDocument: "Trust Deed held as part of the wider legal and governance framework",
  supplementaryGovernanceDocument: "Trust Deed held as part of the wider legal and governance framework",

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
