import { Navigate, useLocation } from "react-router-dom";

import type { QuestionResponse } from "../../types/interview";

import QuestionCard from "../../components/interview/QuestionCard";
import AnswerEditor from "../../components/interview/AnswerEditor";

export default function InterviewSessionPage() {
  const location = useLocation();

  const interview = location.state as
    | QuestionResponse
    | undefined;

  if (!interview) {
    return <Navigate to="/interview" replace />;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <QuestionCard interview={interview} />

      <AnswerEditor interview={interview} />
    </div>
  );
}