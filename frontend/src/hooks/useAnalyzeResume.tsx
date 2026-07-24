// src/hooks/useAnalyzeResume.ts

import { useMutation } from "@tanstack/react-query";

import { analyzeResume } from "../api/resume";

type AnalyzeResumeRequest = {
  file: File;
  targetRole: string;
};

export function useAnalyzeResume() {
  return useMutation({
    mutationFn: ({ file, targetRole }: AnalyzeResumeRequest) =>
      analyzeResume(file, targetRole),
  });
}