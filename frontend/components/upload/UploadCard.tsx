"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { uploadPaper } from "@/lib/api";

const steps = [
  "Uploading PDF",
  "Extracting text",
  "Creating embeddings",
  "Generating summary",
  "Preparing chat",
];

export default function UploadCard() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [paperId, setPaperId] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  async function handleUpload() {
    if (!file) return;

    try {
      setUploading(true);

      let step = 0;

      const interval = setInterval(() => {
        step++;

        if (step < steps.length) {
          setCurrentStep(step);
        }
      }, 2500);

      const result = await uploadPaper(file);

      clearInterval(interval);

      setCurrentStep(steps.length);

      setPaperId(result.paper_id);

      router.push(`/paper/${result.paper_id}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="mx-auto mt-12 max-w-2xl">

      <div
        {...(!uploading ? getRootProps() : {})}
        className={`rounded-2xl border-2 border-dashed p-12 text-center transition ${
          uploading
            ? "border-blue-300 bg-blue-50"
            : isDragActive
            ? "border-blue-500 bg-blue-50"
            : "cursor-pointer border-gray-300 hover:border-blue-500"
        }`}
      >
        {!uploading && <input {...getInputProps()} />}

        <UploadCloud className="mx-auto h-14 w-14 text-blue-600" />

        <h2 className="mt-5 text-3xl font-bold">
          {uploading
            ? "Analyzing Paper..."
            : "Upload Research Paper"}
        </h2>

        <p className="mt-3 text-gray-500">
          {uploading
            ? "This usually takes 20–40 seconds."
            : "Drag & drop a PDF or click to browse."}
        </p>
      </div>

      {file && (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">
            <FileText className="text-red-500" />

            <div>
              <p className="font-medium">{file.name}</p>

              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {!uploading ? (
            <Button
              className="mt-6 w-full"
              onClick={handleUpload}
            >
              Upload Paper
            </Button>
          ) : (
            <div className="mt-8 space-y-4">

              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3"
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : index === currentStep ? (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border" />
                  )}

                  <span
                    className={
                      index <= currentStep
                        ? "font-medium"
                        : "text-gray-400"
                    }
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          )}

          {paperId && (
            <p className="mt-5 text-center text-sm text-green-600">
              Paper ID: {paperId}
            </p>
          )}
        </div>
      )}
    </div>
  );
}