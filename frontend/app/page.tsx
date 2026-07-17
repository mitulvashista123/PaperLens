import Link from "next/link";

import UploadCard from "@/components/upload/UploadCard";

const features = [
  {
    emoji: "⚡",
    title: "Instant Summaries",
    text: "Generate concise summaries of research papers in seconds.",
  },
  {
    emoji: "💬",
    title: "Chat with Papers",
    text: "Ask natural-language questions and get grounded answers with citations.",
  },
  {
    emoji: "📄",
    title: "Page Citations",
    text: "Every response links back to the exact page in the original paper.",
  },
  {
    emoji: "🧠",
    title: "Methodology Extraction",
    text: "Quickly understand datasets, models, and experimental setups.",
  },
  {
    emoji: "📚",
    title: "Personal Library",
    text: "Store and revisit all of your uploaded research papers.",
  },
  {
    emoji: "🔍",
    title: "RAG Powered",
    text: "Answers are generated only from your paper—not from outside knowledge.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-6">

        {/* Hero */}

        <section className="py-24 text-center">

          <span className="rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm">
            AI-powered Research Assistant
          </span>

          <h1 className="mt-8 text-6xl font-extrabold tracking-tight md:text-7xl">
            PaperLens
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-600">
            Understand research papers in minutes instead of hours.
            Upload any PDF to generate structured summaries,
            chat with the paper, and jump directly to cited pages.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              href="/library"
              className="rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:scale-105"
            >
              📚 Open Library
            </Link>

            <a
              href="#upload"
              className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold shadow-sm transition hover:bg-gray-100"
            >
              Upload Paper
            </a>

          </div>

        </section>

        {/* Features */}

        <section className="grid gap-6 md:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </section>

        {/* Upload */}

        <section
          id="upload"
          className="mx-auto mt-28 max-w-3xl pb-24"
        >
          <h2 className="mb-3 text-center text-4xl font-bold">
            Upload your first paper
          </h2>

          <p className="mb-10 text-center text-gray-600">
            Drag & drop a research paper to start chatting with it.
          </p>

          <UploadCard />

        </section>

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
    <div className="rounded-2xl border bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

      <div className="text-5xl">
        {emoji}
      </div>

      <h3 className="mt-5 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-600">
        {text}
      </p>

    </div>
  );
}