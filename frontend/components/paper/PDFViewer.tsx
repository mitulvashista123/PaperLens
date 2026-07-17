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
    <iframe
      key={page}
      src={`${API_URL}/paper/${paperId}/pdf#page=${page}`}
      title="Original Research Paper"
      className="h-[900px] w-full rounded-b-2xl"
    />
  );
}