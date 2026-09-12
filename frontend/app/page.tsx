"use client";

import { useState } from "react";
import DownloadButton from "@/components/DownloadButton";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import { defaultNda, type NdaData } from "@/lib/nda";

export default function Home() {
  const [data, setData] = useState<NdaData>(defaultNda);

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Mutual NDA Creator
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Fill in the cover page, preview the agreement live, and download the completed document.
          Based on the Common Paper Mutual NDA (v1.0, CC BY 4.0).
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:top-8">
          <NdaForm data={data} onChange={(patch) => setData((d) => ({ ...d, ...patch }))} />
          <DownloadButton data={data} />
        </section>

        <section aria-label="Document preview">
          <NdaPreview data={data} />
        </section>
      </div>
    </div>
  );
}
