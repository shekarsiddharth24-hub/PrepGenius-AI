import { z } from "zod";

export const interviewSetupSchema = z.object({
  topic: z.string().optional(),

  difficulty: z.string().min(
    1,
    "Please select a difficulty"
  ),
});

export type InterviewSetupForm =
  z.infer<typeof interviewSetupSchema>;