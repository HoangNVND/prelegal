"use client";

import type { NdaData, PartyDetails } from "@/lib/nda";

interface NdaFormProps {
  data: NdaData;
  onChange: (patch: Partial<NdaData>) => void;
}

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100";
const labelClass = "mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300";
const hintClass = "mt-1 text-xs text-zinc-500 dark:text-zinc-400";
const sectionClass = "mb-6";
const sectionTitleClass =
  "mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400";

export default function NdaForm({ data, onChange }: NdaFormProps) {
  const setParty = (key: "party1" | "party2", patch: Partial<PartyDetails>) => {
    onChange({ [key]: { ...data[key], ...patch } });
  };

  return (
    <div>
      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>Deal details</h2>

        <div className="mb-4">
          <label htmlFor="purpose" className={labelClass}>
            Purpose
          </label>
          <textarea
            id="purpose"
            rows={3}
            className={inputClass}
            value={data.purpose}
            onChange={(e) => onChange({ purpose: e.target.value })}
          />
          <p className={hintClass}>How Confidential Information may be used.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="effective-date" className={labelClass}>
            Effective date
          </label>
          <input
            id="effective-date"
            type="date"
            className={inputClass}
            value={data.effectiveDate}
            onChange={(e) => onChange({ effectiveDate: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <span className={labelClass}>MNDA term</span>
          <TermChoice
            name="mnda-term"
            fixed={data.mndaTermFixed}
            years={data.mndaTermYears}
            fixedLabel="Expires from Effective Date"
            perpetuityLabel="Continues until terminated"
            onFixed={(fixed) => onChange({ mndaTermFixed: fixed })}
            onYears={(years) => onChange({ mndaTermYears: years })}
            showPerpetuity={false}
          />
        </div>

        <div className="mb-4">
          <span className={labelClass}>Term of confidentiality</span>
          <TermChoice
            name="confidentiality-term"
            fixed={data.confidentialityFixed}
            years={data.confidentialityYears}
            fixedLabel="Years from Effective Date (trade secrets carve-out applies)"
            perpetuityLabel="In perpetuity"
            onFixed={(fixed) => onChange({ confidentialityFixed: fixed })}
            onYears={(years) => onChange({ confidentialityYears: years })}
            showPerpetuity={true}
          />
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="governing-law" className={labelClass}>
              Governing law
            </label>
            <input
              id="governing-law"
              type="text"
              placeholder="e.g. Delaware"
              className={inputClass}
              value={data.governingLaw}
              onChange={(e) => onChange({ governingLaw: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="jurisdiction" className={labelClass}>
              Jurisdiction
            </label>
            <input
              id="jurisdiction"
              type="text"
              placeholder='e.g. courts located in New Castle, DE'
              className={inputClass}
              value={data.jurisdiction}
              onChange={(e) => onChange({ jurisdiction: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="modifications" className={labelClass}>
            MNDA modifications <span className="font-normal">(optional)</span>
          </label>
          <textarea
            id="modifications"
            rows={2}
            placeholder="Any modifications to the MNDA"
            className={inputClass}
            value={data.modifications}
            onChange={(e) => onChange({ modifications: e.target.value })}
          />
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>Party 1</h2>
        <PartyFields party={data.party1} onChange={(patch) => setParty("party1", patch)} />
      </div>

      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>Party 2</h2>
        <PartyFields party={data.party2} onChange={(patch) => setParty("party2", patch)} />
      </div>
    </div>
  );
}

interface TermChoiceProps {
  name: string;
  fixed: boolean;
  years: number;
  fixedLabel: string;
  perpetuityLabel: string;
  showPerpetuity: boolean;
  onFixed: (fixed: boolean) => void;
  onYears: (years: number) => void;
}

function TermChoice({
  name,
  fixed,
  years,
  fixedLabel,
  perpetuityLabel,
  showPerpetuity,
  onFixed,
  onYears,
}: TermChoiceProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <input
          type="radio"
          name={name}
          checked={fixed}
          onChange={() => onFixed(true)}
          className="accent-zinc-900 dark:accent-zinc-100"
        />
        <input
          type="number"
          min={1}
          max={99}
          disabled={!fixed}
          value={years}
          onChange={(e) => onYears(Number(e.target.value))}
          className="w-16 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 outline-none focus:border-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        year(s) — {fixedLabel}
      </label>
      {showPerpetuity && (
        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="radio"
            name={name}
            checked={!fixed}
            onChange={() => onFixed(false)}
            className="accent-zinc-900 dark:accent-zinc-100"
          />
          {perpetuityLabel}
        </label>
      )}
    </div>
  );
}

interface PartyFieldsProps {
  party: PartyDetails;
  onChange: (patch: Partial<PartyDetails>) => void;
}

function PartyFields({ party, onChange }: PartyFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelClass}>Company</label>
        <input
          type="text"
          className={inputClass}
          value={party.company}
          onChange={(e) => onChange({ company: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>Print name</label>
        <input
          type="text"
          className={inputClass}
          value={party.printName}
          onChange={(e) => onChange({ printName: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          className={inputClass}
          value={party.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Notice address</label>
        <input
          type="text"
          placeholder="Email or postal address"
          className={inputClass}
          value={party.noticeAddress}
          onChange={(e) => onChange({ noticeAddress: e.target.value })}
        />
      </div>
    </div>
  );
}
