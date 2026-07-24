import api from "./axios";

import type {
  ResumeAnalysis,
  ResumeHistoryResponse,
} from "../types/resume";

export async function analyzeResume(
  file: File,
  targetRole: string,
): Promise<ResumeAnalysis> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("target_role", targetRole);

  const response = await api.post<ResumeAnalysis>(
    "/resume/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getResumeHistory(): Promise<ResumeHistoryResponse> {
  const response = await api.get("/resume/history");

  return response.data;
}

/**
 * Download Resume Analysis PDF
 */
export async function downloadResumePDF(
  analysisId: number,
): Promise<void> {
  const response = await api.get(
    `/resume/${analysisId}/pdf`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob(
    [response.data],
    {
      type: "application/pdf",
    }
  );

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `resume_analysis_${analysisId}.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}