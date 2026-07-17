import UploadCard from "@/components/upload/UploadCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Hero */}

        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-6xl font-bold tracking-tight">
            PaperLens
          </h1>

          <p className="mt-6 text-2xl text-gray-700">
            Understand research papers in minutes, not hours.
          </p>

          <p className="mt-4 text-lg text-gray-500">
            Upload any research paper and instantly get AI-generated
            summaries, methodology extraction, strengths,
            limitations and chat with your paper.
          </p>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/library"
            className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold shadow-sm transition hover:bg-gray-100"
          >
            📚 Open Library
          </Link>

        </div>

        {/* Upload */}

        <div className="mx-auto mt-14 max-w-3xl">
          <UploadCard />
        </div>

        {/* Features */}

        <div className="mt-20 grid gap-6 md:grid-cols-3">

          <FeatureCard
            emoji="⚡"
            title="Instant Summary"
            text="Generate concise summaries of research papers in seconds."
          />

          <FeatureCard
            emoji="💬"
            title="Chat with Paper"
            text="Ask natural language questions about any uploaded paper."
          />

          <FeatureCard
            emoji="📖"
            title="Original PDF"
            text="Read the paper alongside AI explanations."
          />

          <FeatureCard
            emoji="📌"
            title="Page References"
            text="Every answer links back to the original paper."
          />

          <FeatureCard
            emoji="🧠"
            title="Methodology"
            text="Understand the methods and experimental setup quickly."
          />

          <FeatureCard
            emoji="⭐"
            title="Research Insights"
            text="View contributions, strengths and limitations instantly."
          />

        </div>

      </div>
    </main>
  );
}

function FeatureCard({
  emoji,
  title,
  text,
}: {
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="text-4xl">{emoji}</div>

      <h3 className="mt-4 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600">
        {text}
      </p>
    </div>
  );
}