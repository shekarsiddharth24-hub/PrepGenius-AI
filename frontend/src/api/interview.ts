import api from "./axios";

import type {
  EvaluationRequest,
  EvaluationResponse,
  QuestionRequest,
  QuestionResponse,
} from "../types/interview";

export async function generateQuestion(
  request: QuestionRequest
): Promise<QuestionResponse> {
  const response = await api.post(
    "/interview/question",
    request
  );

  return response.data;
}

export async function evaluateAnswer(
  request: EvaluationRequest
): Promise<EvaluationResponse> {
  const response = await api.post(
    "/interview/evaluate",
    request,
    {
      // Two LLM calls (ideal answer + scoring), possibly with a cold model
      // load and one retry; the 2 min default is too short.
      timeout: 300000,
    }
  );

  return response.data;
}