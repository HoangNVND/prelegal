export interface PartyDetails {
  company: string;
  printName: string;
  title: string;
  noticeAddress: string;
}

export interface NdaData {
  purpose: string;
  effectiveDate: string;
  mndaTermFixed: boolean;
  mndaTermYears: number;
  confidentialityFixed: boolean;
  confidentialityYears: number;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  party1: PartyDetails;
  party2: PartyDetails;
}

export const emptyParty: PartyDetails = {
  company: "",
  printName: "",
  title: "",
  noticeAddress: "",
};

export const defaultNda: NdaData = {
  purpose: "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: new Date().toISOString().slice(0, 10),
  mndaTermFixed: true,
  mndaTermYears: 1,
  confidentialityFixed: true,
  confidentialityYears: 1,
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  party1: { ...emptyParty },
  party2: { ...emptyParty },
};

export function mndaTermDisplay(data: NdaData): string {
  return data.mndaTermFixed
    ? `Expires ${pluralYears(data.mndaTermYears)} from Effective Date.`
    : "Continues until terminated in accordance with the terms of the MNDA.";
}

export function confidentialityTermDisplay(data: NdaData): string {
  return data.confidentialityFixed
    ? `${pluralYears(data.confidentialityYears)} from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`
    : "In perpetuity.";
}

export function effectiveDateDisplay(data: NdaData): string {
  if (!data.effectiveDate) return "";
  const date = new Date(`${data.effectiveDate}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? data.effectiveDate
    : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function pluralYears(years: number): string {
  const n = Number.isFinite(years) && years > 0 ? years : 1;
  return `${n} year${n === 1 ? "" : "s"}`;
}
