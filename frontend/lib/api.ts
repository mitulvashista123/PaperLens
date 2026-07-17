import { API_URL } from "@/lib/config";

export async function uploadPaper(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

export async function getSummary(paperId: string) {
  const response = await fetch(
    `${API_URL}/summary/${paperId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch summary");
  }

  return response.json();
}

export async function getPaper(
  paperId: string
) {
  const response = await fetch(
    `${API_URL}/paper/${paperId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch paper");
  }

  return response.json();
}

export async function chatWithPaper(
  paperId: string,
  question: string
) {
  const res = await fetch(
    `${API_URL}/chat/${paperId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Chat failed");
  }

  return res.json();
}

export async function getLibrary() {
  const res = await fetch(
    `${API_URL}/library`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch library");
  }

  return res.json();
}

export async function deletePaper(
  paperId: string
) {
  const res = await fetch(
    `${API_URL}/paper/${paperId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete paper");
  }

  return res.json();
}