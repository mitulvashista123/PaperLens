"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { chatWithPaper } from "@/lib/api";

type Props = {
  paperId: string;
  onJumpToPage?: (page: number) => void;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: {
    page: number;
  }[];
};

export default function ChatBox({
  paperId,
  onJumpToPage,
}: Props) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function askQuestion() {
    if (!question.trim() || loading) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await chatWithPaper(
        paperId,
        userQuestion
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.answer,
          sources: res.sources,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Failed to get an answer from PaperLens.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        💬 Ask PaperLens
      </h2>

      <textarea
        autoFocus
        rows={4}
        value={question}
        placeholder="Ask anything about this paper..."
        className="w-full rounded-xl border p-4 focus:border-blue-500 focus:outline-none"
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            askQuestion();
          }
        }}
      />

      <Button
        className="mt-4 w-full"
        onClick={askQuestion}
        disabled={loading || !question.trim()}
      >
        {loading ? "Thinking..." : "Ask"}
      </Button>

      <div className="mt-8 space-y-4">
        {messages.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
            Start asking questions about this paper.
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="mb-2 text-sm font-semibold">
                {msg.role === "user"
                  ? "🙂 You"
                  : "🤖 PaperLens"}
              </p>

              <div
                className={`prose prose-sm max-w-none ${
                  msg.role === "user"
                    ? "prose-invert"
                    : ""
                }`}
              >
                <ReactMarkdown>
                  {msg.content}
                </ReactMarkdown>
              </div>

              {msg.role === "assistant" &&
                msg.sources &&
                msg.sources.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {msg.sources.map((source, i) => (
                      <button
                        key={i}
                        onClick={() => onJumpToPage?.(source.page)}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
                      >
                        📄 p.{source.page}
                      </button>
                    ))}
                  </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-gray-100 px-4 py-3 text-gray-700 shadow-sm">
              🤖 Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}