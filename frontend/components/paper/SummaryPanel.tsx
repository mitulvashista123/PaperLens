"use client";

import { useEffect, useState } from "react";

import { getSummary } from "@/lib/api";

type SummaryData = {
  summary: string;
  contributions: string[];
  methodology: string;
  strengths: string[];
  limitations: string[];
};

type Props = {
  paperId: string;
};

export default function SummaryPanel({
  paperId,
}: Props) {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await getSummary(paperId);
        setData(res.summary);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, [paperId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 rounded bg-gray-200" />
        <div className="h-5 rounded bg-gray-200" />
        <div className="h-5 rounded bg-gray-200" />
        <div className="h-5 w-3/4 rounded bg-gray-200" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        Failed to load summary.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <section>
        <h3 className="mb-3 text-2xl font-bold">
          📄 Executive Summary
        </h3>

        <p className="leading-8 text-gray-700">
          {data.summary}
        </p>
      </section>

      <section>
        <h3 className="mb-3 text-2xl font-bold">
          ⭐ Key Contributions
        </h3>

        <ul className="list-disc space-y-2 pl-6">
          {data.contributions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-2xl font-bold">
          🧠 Methodology
        </h3>

        <p className="leading-8 text-gray-700">
          {data.methodology}
        </p>
      </section>

      <section>
        <h3 className="mb-3 text-2xl font-bold">
          ✅ Strengths
        </h3>

        <ul className="list-disc space-y-2 pl-6">
          {data.strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-2xl font-bold">
          ⚠️ Limitations
        </h3>

        <ul className="list-disc space-y-2 pl-6">
          {data.limitations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

    </div>
  );
}