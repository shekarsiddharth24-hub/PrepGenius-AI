export interface ResumeSkill {
  skill: string;
  reason: string | null;
}

export interface ResumeSoftSkill {
  text: string;
  evidence: string | null;
}

export interface ResumeProject {
  name: string;
  description: string | null;
  tech_stack: ResumeSkill[];
}

export interface ResumeStrength {
  text: string;
  evidence: string;
}

export interface ResumeWeakness {
  text: string;
  evidence: string;
}

export interface ResumeMissingSkill {
  skill: string;
  reason: string;
}

export interface RecommendedTopic {
  topic: string;
  reason: string;
}

export interface ResumeAnalysis {
  resume_score: number;

  technical_skills: ResumeSkill[];

  soft_skills: ResumeSoftSkill[];

  projects: ResumeProject[];

  strengths: ResumeStrength[];

  weaknesses: ResumeWeakness[];

  missing_skills: ResumeMissingSkill[];

  recommended_topics: RecommendedTopic[];
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