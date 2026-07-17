"use client";

import { useState } from "react";

import PDFViewer from "./PDFViewer";
import ChatBox from "@/components/chat/ChatBox";

type Props = {
  paperId: string;
};

export default function PaperViewer({
  paperId,
}: Props) {
  const [page, setPage] = useState(1);

  return (
    <>
      <PDFViewer
        paperId={paperId}
        page={page}
      />

      <div className="mt-10">
        <ChatBox
          paperId={paperId}
          onJumpToPage={setPage}
        />
      </div>
    </>
  );
}