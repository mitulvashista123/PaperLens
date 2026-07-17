"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadPaper } from "@/lib/api";

export default function UploadCard() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [paperId, setPaperId] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const result = await uploadPaper(file);

      console.log(result);

      setPaperId(result.paper_id);

      // Navigate to the summary page
      router.push(`/paper/${result.paper_id}`);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

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
        className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-500"
        }`}
      >
        {!uploading && <input {...getInputProps()} />}

        <UploadCloud className="mx-auto h-12 w-12 text-blue-500" />

        <h2 className="mt-4 text-2xl font-semibold">
          {uploading
            ? "Processing Research Paper..."
            : "Upload Research Paper"}
        </h2>

        <p className="mt-2 text-gray-500">
          {uploading
            ? "Parsing PDF, creating embeddings and generating AI summary..."
            : "Drag & Drop a PDF here or click to browse."}
        </p>
      </div>

      {file && (
        <div className="mt-8 rounded-xl border p-5">
          <div className="flex items-center gap-4">
            <FileText className="text-red-500" />

            <div>
              <p className="font-medium">{file.name}</p>

              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <Button
            className="mt-6 w-full"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Processing PDF & Generating AI Summary..." : "Upload Paper"}
          </Button>

          {paperId && (
            <p className="mt-4 text-center text-sm text-green-600">
              Paper ID: {paperId}
            </p>
          )}
        </div>
      )}
    </div>
  );
}