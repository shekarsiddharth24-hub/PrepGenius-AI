import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import type { EvaluationResponse } from "../../types/interview";

import ScoreCard from "../../components/interview/ScoreCard";
import ScoreBreakdown from "../../components/interview/ScoreBreakdown";
import FeedbackCard from "../../components/interview/FeedbackCard";
import IdealAnswerSection from "../../components/history/IdealAnswerSection";

export default function InterviewResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as
    | {
        result: EvaluationResponse;
        interviewType: "technical" | "behavioral";
      }
    | undefined;

  if (!state) {
    return <Navigate to="/interview" replace />;
  }

  const { result, interviewType } = state;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <ScoreCard score={result.overall_score} />

      <ScoreBreakdown
        result={result}
        interviewType={interviewType}
      />

      {interviewType === "technical" && result.ideal_answer && (
        <IdealAnswerSection
          answer={result.ideal_answer}
        />
      )}

      <FeedbackCard result={result} />

      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate("/interview")}
          className="rounded-lg border px-6 py-3"
        >
          New Interview
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}