import { getLibrary } from "@/lib/api";
import LibraryCard from "@/components/library/LibraryCard";

type Paper = {
  paper_id: string;
  title: string;
  authors: string[];
  pages: number;
};

export default async function LibraryPage() {
  const papers = await getLibrary();

  return (
    <main className="mx-auto max-w-7xl p-10">
      <h1 className="text-5xl font-bold">
        📚 Library
      </h1>

      <p className="mt-2 text-gray-500">
        Previously uploaded research papers
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {papers.map((paper: Paper) => (
          <LibraryCard
            key={paper.paper_id}
            paper={paper}
          />
        ))}
      </div>
    </main>
  );
}