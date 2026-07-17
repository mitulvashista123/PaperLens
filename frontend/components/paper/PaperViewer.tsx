"use client";

import { useState } from "react";

import PDFViewer from "./PDFViewer";
import WorkspaceTabs from "./WorkspaceTabs";

type Props = {
  paperId: string;
};

export default function PaperViewer({
  paperId,
}: Props) {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-8">

      {/* PDF Viewer */}

      <div className="rounded-2xl border bg-white shadow-sm">

        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            📄 Original Paper
          </h2>
        </div>

        <PDFViewer
          paperId={paperId}
          page={page}
        />

      </div>

      {/* AI Workspace */}

      <WorkspaceTabs
        paperId={paperId}
        onJumpToPage={setPage}
      />

    </div>
  );
}