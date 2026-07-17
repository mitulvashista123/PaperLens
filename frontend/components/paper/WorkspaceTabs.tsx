"use client";

import { useState } from "react";
import {
  MessageSquare,
  FileText,
  BarChart3,
} from "lucide-react";

import ChatBox from "@/components/chat/ChatBox";
import SummaryPanel from "./SummaryPanel";

type Props = {
  paperId: string;
  onJumpToPage: (page: number) => void;
};

type Tab = "chat" | "summary" | "analysis";

export default function WorkspaceTabs({
  paperId,
  onJumpToPage,
}: Props) {
  const [activeTab, setActiveTab] =
    useState<Tab>("chat");

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">

      {/* Header */}

      <div className="border-b px-6 py-5">
        <h2 className="text-2xl font-bold">
          AI Workspace
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Chat with the paper, explore summaries and analyze research insights.
        </p>
      </div>

      {/* Tabs */}

      <div className="flex border-b bg-gray-50">

        <button
          onClick={() => setActiveTab("chat")}
          className={`flex flex-1 items-center justify-center gap-2 py-4 transition ${
            activeTab === "chat"
              ? "bg-white border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <MessageSquare size={18} />
          Chat
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={`flex flex-1 items-center justify-center gap-2 py-4 transition ${
            activeTab === "summary"
              ? "bg-white border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <FileText size={18} />
          Summary
        </button>

        <button
          onClick={() => setActiveTab("analysis")}
          className={`flex flex-1 items-center justify-center gap-2 py-4 transition ${
            activeTab === "analysis"
              ? "bg-white border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <BarChart3 size={18} />
          Analysis
        </button>

      </div>

      {/* Workspace */}

      <div className="max-h-[700px] overflow-y-auto p-6">

        {activeTab === "chat" && (
          <ChatBox
            paperId={paperId}
            onJumpToPage={onJumpToPage}
          />
        )}

        {activeTab === "summary" && (
          <SummaryPanel
            paperId={paperId}
          />
        )}

        {activeTab === "analysis" && (
          <div className="space-y-6">

            <div className="rounded-xl border border-dashed p-8">
              <h3 className="text-xl font-semibold">
                🚧 Analysis Dashboard
              </h3>

              <p className="mt-3 text-gray-600">
                This section will soon include deeper AI-powered
                research analysis beyond simple summaries.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-xl border p-6">
                <h4 className="font-semibold">
                  📚 Literature Review
                </h4>

                <p className="mt-2 text-sm text-gray-600">
                  Compare multiple related papers.
                </p>
              </div>

              <div className="rounded-xl border p-6">
                <h4 className="font-semibold">
                  💡 Research Gaps
                </h4>

                <p className="mt-2 text-sm text-gray-600">
                  Discover unexplored directions.
                </p>
              </div>

              <div className="rounded-xl border p-6">
                <h4 className="font-semibold">
                  📈 Citation Graph
                </h4>

                <p className="mt-2 text-sm text-gray-600">
                  Visualize connected papers.
                </p>
              </div>

              <div className="rounded-xl border p-6">
                <h4 className="font-semibold">
                  🧠 Novel Ideas
                </h4>

                <p className="mt-2 text-sm text-gray-600">
                  Generate research ideas from the literature.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}