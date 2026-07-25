export interface Interview {
  id: number;

  user_id: number;

  topic: string;
  difficulty: string;
  interview_type: "technical" | "behavioral";

  question: string;
  ideal_answer: string;
  user_answer: string;

  semantic_score?: number;
  technical_score?: number;
  completeness_score?: number;
  communication_score?: number;
  overall_score: number;

  professionalism_score?: number;
  leadership_score?: number;
  problem_solving_score?: number;
  star_score?: number;

  feedback: string;
  status: string;
  created_at: string;
}

export interface QuestionRequest {
  interview_type: "technical" | "behavioral";

  topic?: string;

  difficulty: string;
}

export interface QuestionResponse {
  interview_type: "technical" | "behavioral";

  topic?: string;

  difficulty: string;

  question: string;
}

export interface EvaluationRequest {
  interview_type: "technical" | "behavioral";

  topic?: string;

  difficulty: string;

  question: string;

  candidate_answer: string;
}

export interface EvaluationResponse {
  question: string;

  candidate_answer: string;

  overall_score: number;

  strengths: string[];
  weaknesses: string[];
  suggestions: string[];

  // Technical interview fields
  semantic_score?: number;
  technical_score?: number;
  completeness_score?: number;
  communication_score?: number;

  // Behavioral interview fields
  professionalism_score?: number;
  leadership_score?: number;
  problem_solving_score?: number;
  star_score?: number;

  ideal_answer?: string;
}


export interface InterviewHistoryItem {
  id: number;
  interview_type: "technical" | "behavioral";
  topic?: string;
  difficulty: string;
  overall_score: number;
  created_at: string;
  status: string;
}

export interface ScoreBreakdownResult {

  overall_score: number;

  semantic_score?: number;
  technical_score?: number;
  completeness_score?: number;
  communication_score?: number;

  professionalism_score?: number;
  leadership_score?: number;
  problem_solving_score?: number;
  star_score?: number;
}