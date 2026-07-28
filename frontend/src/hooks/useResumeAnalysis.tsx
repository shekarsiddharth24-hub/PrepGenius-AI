import { useQuery } from "@tanstack/react-query";

import { getResumeAnalysis } from "../api/resume";

export function useResumeAnalysis(id: number) {
  return useQuery({
    queryKey: ["resume-analysis", id],
    queryFn: () => getResumeAnalysis(id),
    enabled: !!id,
  });
}