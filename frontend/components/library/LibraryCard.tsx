"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deletePaper } from "@/lib/api";

type Props = {
  paper: {
    paper_id: string;
    title: string;
    authors: string[];
    pages: number;
  };
};

export default function LibraryCard({
  paper,
}: Props) {
  const router = useRouter();

  async function handleDelete(
    e: React.MouseEvent
  ) {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${paper.title}"?`
    );

    if (!confirmed) return;

    try {
      await deletePaper(paper.paper_id);

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete paper.");
    }
  }

  return (
    <Link href={`/paper/${paper.paper_id}`}>
      <div className="group relative cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

        <button
          onClick={handleDelete}
          className="absolute right-4 top-4 rounded-lg p-2 text-red-500 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
          title="Delete paper"
        >
          <Trash2 size={18} />
        </button>

        <h2 className="line-clamp-2 pr-10 text-xl font-semibold">
          {paper.title}
        </h2>

        <p className="mt-3 line-clamp-2 text-sm text-gray-600">
          {paper.authors.join(", ")}
        </p>

        <div className="mt-5 flex justify-between text-sm text-gray-500">
          <span>{paper.pages} pages</span>
          <span>Open →</span>
        </div>

      </div>
    </Link>
  );
}