import ChatBox from "@/components/chat/ChatBox";
import SectionCard from "@/components/paper/SectionCard";
import PDFViewer from "@/components/paper/PDFViewer";
import PaperViewer from "@/components/paper/PaperViewer";
import { API_URL } from "@/lib/config";

type SummaryResponse = {
  paper_id: string;
  metadata: {
    title: string;
    authors: string[];
    pages: number;
    sections: string[];
  };
  summary: {
    summary: string;
    contributions: string[];
    methodology: string;
    strengths: string[];
    limitations: string[];
  };
};

async function getSummary(
  paperId: string
): Promise<SummaryResponse> {
  const res = await fetch(
    `${API_URL}/summary/${paperId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch summary");
  }

  return res.json();
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) {
  const { paperId } = await params;

  const data = await getSummary(paperId);

  const s = data.summary;
  const m = data.metadata;

  return (
    <main className="mx-auto max-w-7xl p-8">

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {m.title}
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          {m.authors.join(", ")}
        </p>

        <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500">
          <span>📄 {m.pages} pages</span>
          <span>🆔 {paperId}</span>
        </div>
      </div>

      {/* PDF + Summary */}

      <div className="grid gap-8 lg:grid-cols-2">

        <PaperViewer paperId={paperId} />

        <div className="space-y-6">

          <SectionCard title="📄 Summary">
            <p className="leading-7">
              {s.summary}
            </p>
          </SectionCard>

          <SectionCard title="⭐ Contributions">
            <ul className="list-disc space-y-2 pl-6">
              {s.contributions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="🧠 Methodology">
            <p className="leading-7">
              {s.methodology}
            </p>
          </SectionCard>

          <SectionCard title="✅ Strengths">
            <ul className="list-disc space-y-2 pl-6">
              {s.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="⚠️ Limitations">
            <ul className="list-disc space-y-2 pl-6">
              {s.limitations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </SectionCard>

        </div>

      </div>

    </main>
  );
}