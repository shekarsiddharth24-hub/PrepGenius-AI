export interface ResumeProject {
  name: string;
  description: string | null;
  tech_stack: string[];
}

export interface ResumeAnalysis {
  resume_score: number;

  technical_skills: string[];

  soft_skills: string[];

  projects: ResumeProject[];

  strengths: string[];

  weaknesses: string[];

  missing_skills: string[];

  recommended_topics: string[];
}

export interface ResumeHistoryItem {
  id: number;
  filename: string;
  resume_score: number;
  created_at: string;
}

export interface ResumeHistoryResponse {
  items: ResumeHistoryItem[];
}