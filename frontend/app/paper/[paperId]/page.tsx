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
    throw new Error("Failed to fetch paper");
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

  const m = data.metadata;

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">

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

      <PaperViewer paperId={paperId} />

    </main>
  );
}