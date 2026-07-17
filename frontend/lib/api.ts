import { API_URL } from "@/lib/config";

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, options);

  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const data = await response.json();
      message = data.detail ?? message;
    } catch {
      // ignore
    }

    throw new Error(message);
  }

  return response.json();
}

export function uploadPaper(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return api("/upload/", {
    method: "POST",
    body: formData,
  });
}

export function getSummary(paperId: string) {
  return api(`/summary/${paperId}`);
}

export function getPaper(paperId: string) {
  return api(`/paper/${paperId}`, {
    cache: "no-store",
  });
}

export function chatWithPaper(
  paperId: string,
  question: string
) {
  return api(`/chat/${paperId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });
}

export function getLibrary() {
  return api("/library", {
    cache: "no-store",
  });
}

export function deletePaper(paperId: string) {
  return api(`/paper/${paperId}`, {
    method: "DELETE",
  });
}