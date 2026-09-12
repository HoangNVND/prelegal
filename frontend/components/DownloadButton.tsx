"use client";

import { useState } from "react";
import { renderNdaPdfBlob } from "@/components/NdaPdf";
import type { NdaData } from "@/lib/nda";

export default function DownloadButton({ data }: { data: NdaData }) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async () => {
    setGenerating(true);
    setError(null);
    try {
      const blob = await renderNdaPdfBlob(data);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Mutual-NDA-${data.effectiveDate || "draft"}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed", err);
      setError("Could not generate the PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={download}
        disabled={generating}
        className="w-full rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        {generating ? "Generating PDF…" : "Download PDF"}
      </button>
      {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
