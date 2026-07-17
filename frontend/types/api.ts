export interface UploadResponse {
  paper_id: string;
  title: string;
  authors: string[];
  pages: number;
  chunks: number;
}

export interface SummaryResponse {
  paper_id: string;
  summary: string;
}

export interface ChatResponse {
  answer: string;
}