export interface TopicScore {
  topic: string;
  score: number;
}

export interface TrendPoint {
  date: string;
  score: number;
}

export interface Analytics {
  total_interviews: number;

  average_score: number;
  best_score: number;

  best_topic: string | null;
  weakest_topic: string | null;

  average_semantic: number;
  average_technical: number;
  average_communication: number;

  topic_scores: TopicScore[];
  trend: TrendPoint[];

  technical_interviews: number;
  behavioral_interviews: number;

  technical_average_score: number;
  behavioral_average_score: number;
}