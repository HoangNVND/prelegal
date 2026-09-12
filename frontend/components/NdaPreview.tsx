"use client";

import {
  confidentialityTermDisplay,
  effectiveDateDisplay,
  mndaTermDisplay,
  type NdaData,
} from "@/lib/nda";
import { standardTerms, termsFooter, type Run } from "@/lib/standardTerms";

const definedClass = "underline underline-offset-2";

function Runs({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((run, i) =>
        typeof run === "string" ? (
          run
        ) : (
          <span key={i} className={definedClass}>
            {run.defined}
          </span>
        ),
      )}
    </>
  );
}

function Check({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`mr-2 inline-flex h-3 w-3 shrink-0 items-center justify-center border border-zinc-900 align-[-1px] text-[9px] leading-none text-zinc-900 ${
        checked ? "" : "invisible"
      }`}
    >
      X
    </span>
  );
}

export default function NdaPreview({ data }: { data: NdaData }) {
  return (
    <div className="bg-white px-10 py-8 font-serif text-[13px] leading-relaxed text-zinc-900 shadow-sm ring-1 ring-zinc-200">
      <h1 className="mb-6 text-center text-xl font-bold">Mutual Non-Disclosure Agreement</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-center text-sm font-bold uppercase tracking-wide">
          Using this Mutual Non-Disclosure Agreement
        </h2>
        <p className="mb-3 text-center text-xs">
          This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;) consists of: (1) this Cover
          Page (&ldquo;<strong>Cover Page</strong>&rdquo;) and (2) the Common Paper Mutual NDA
          Standard Terms Version 1.0 (&ldquo;<strong>Standard Terms</strong>&rdquo;) identical to
          those posted at commonpaper.com/standards/mutual-nda/1.0. Any modifications of the
          Standard Terms should be made on the Cover Page, which will control over conflicts with
          the Standard Terms.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="mb-1 font-bold">Purpose</h3>
        <p className="pl-6 italic">[{data.purpose || "…"}]</p>
      </section>

      <section className="mb-5">
        <h3 className="mb-1 font-bold">Effective Date</h3>
        <p className="pl-6">[{effectiveDateDisplay(data) || "…"}]</p>
      </section>

      <section className="mb-5">
        <h3 className="mb-1 font-bold">MNDA Term</h3>
        <p className="pl-6">
          <Check checked={data.mndaTermFixed} />
          {mndaTermDisplay(data)}
        </p>
        <p className="pl-6">
          <Check checked={!data.mndaTermFixed} />
          Continues until terminated in accordance with the terms of the MNDA.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="mb-1 font-bold">Term of Confidentiality</h3>
        <p className="pl-6">
          <Check checked={data.confidentialityFixed} />
          {confidentialityTermDisplay(data)}
        </p>
        <p className="pl-6">
          <Check checked={!data.confidentialityFixed} />
          In perpetuity.
        </p>
      </section>

      <section className="mb-5">
        <h3 className="mb-1 font-bold">Governing Law &amp; Jurisdiction</h3>
        <p className="pl-6">Governing Law: [{data.governingLaw || "…"}]</p>
        <p className="pl-6">Jurisdiction: [{data.jurisdiction || "…"}]</p>
      </section>

      <section className="mb-8">
        <h3 className="mb-1 font-bold">MNDA Modifications</h3>
        <p className="pl-6 italic">[{data.modifications.trim() || "None"}]</p>
      </section>

      <p className="mb-6">
        By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective
        Date.
      </p>

      <table className="mb-8 w-full border-collapse text-[12px]">
        <thead>
          <tr>
            <th className="w-32 border border-zinc-900 px-2 py-1 text-left" />
            <th className="border border-zinc-900 px-2 py-1 text-center font-bold">PARTY 1</th>
            <th className="border border-zinc-900 px-2 py-1 text-center font-bold">PARTY 2</th>
          </tr>
        </thead>
        <tbody>
          <SignatureRow label="Signature" />
          <SignatureRow label="Print Name" value1={data.party1.printName} value2={data.party2.printName} />
          <SignatureRow label="Title" value1={data.party1.title} value2={data.party2.title} />
          <SignatureRow label="Company" value1={data.party1.company} value2={data.party2.company} />
          <SignatureRow
            label="Notice Address"
            value1={data.party1.noticeAddress}
            value2={data.party2.noticeAddress}
          />
          <SignatureRow label="Date" />
        </tbody>
      </table>

      <hr className="my-8 border-zinc-400" />

      <h1 className="mb-6 text-center text-xl font-bold">Standard Terms</h1>

      <div className="space-y-4">
        {standardTerms.map((term) => (
          <p key={term.number}>
            <strong>
              {term.number}. {term.title}.
            </strong>{" "}
            <Runs runs={term.body} />
          </p>
        ))}
      </div>

      <p className="mt-8 text-center text-xs">{termsFooter}</p>
    </div>
  );
}

function SignatureRow({
  label,
  value1 = "",
  value2 = "",
}: {
  label: string;
  value1?: string;
  value2?: string;
}) {
  return (
    <tr>
      <td className="border border-zinc-900 px-2 py-1 font-bold">{label}</td>
      <td className="border border-zinc-900 px-2 py-1">{value1 || " "}</td>
      <td className="border border-zinc-900 px-2 py-1">{value2 || " "}</td>
    </tr>
  );
}
