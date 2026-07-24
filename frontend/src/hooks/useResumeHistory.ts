import { useQuery } from "@tanstack/react-query";

import { getResumeHistory } from "../api/resume";

export function useResumeHistory() {
  return useQuery({
    queryKey: ["resume-history"],
    queryFn: getResumeHistory,
  });
}