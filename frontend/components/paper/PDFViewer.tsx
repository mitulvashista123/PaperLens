"use client";

import { API_URL } from "@/lib/config";

type Props = {
  paperId: string;
  page: number;
};

export default function PDFViewer({
  paperId,
  page,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">
          📄 Original Paper
        </h2>
      </div>

      <iframe
        key={page}
        src={`${API_URL}/paper/${paperId}/pdf#page=${page}`}
        title="Original Research Paper"
        className="h-225 w-full"
      />
    </div>
  );
}