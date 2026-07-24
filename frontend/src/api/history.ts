import api from "./axios";
import type { InterviewHistoryItem } from "../types/interview";

// GET /history
export const getHistory = async (): Promise<
  InterviewHistoryItem[]
> => {
  const response = await api.get(
    "/history",
  );

  return response.data;
};

// GET /history/:id/pdf
export const downloadInterviewPDF = async (
  interviewId: number,
): Promise<Blob> => {
  const response = await api.get(
    `/history/${interviewId}/pdf`,
    {
      responseType: "blob",
    },
  );

  return response.data;
};