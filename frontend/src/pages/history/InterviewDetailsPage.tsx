import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import GlassButton from "../../components/ui/GlassButton";

import InterviewSummary from "../../components/history/InterviewSummary";
import ScoreSummary from "../../components/history/ScoreSummary";
import QuestionSection from "../../components/history/QuestionSection";
import IdealAnswerSection from "../../components/history/IdealAnswerSection";
import CandidateAnswerSection from "../../components/history/CandidateAnswerSection";
import FeedbackSection from "../../components/history/FeedbackSection";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function InterviewDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const interview = location.state;

  if (!interview) {
    return <Navigate to="/history" replace />;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl space-y-8"
    >
      {/* Header */}

      <motion.div
        variants={item}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <GlassButton
          onClick={() => navigate("/history")}
          className="w-fit"
        >
          <ArrowLeft size={18} />
          Back to History
        </GlassButton>

        <div className="text-right">
          <h1 className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-3xl font-bold text-transparent">
            Interview Details
          </h1>

          <p className="mt-2 text-slate-400">
            Review your performance, answers, and AI feedback.
          </p>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <InterviewSummary interview={interview} />
      </motion.div>

      <motion.div variants={item}>
        <ScoreSummary interview={interview} />
      </motion.div>

      <motion.div variants={item}>
        <QuestionSection
          question={interview.question}
        />
      </motion.div>

      <motion.div variants={item}>
        <IdealAnswerSection
          answer={interview.ideal_answer}
        />
      </motion.div>

      <motion.div variants={item}>
        <CandidateAnswerSection
          answer={interview.user_answer}
        />
      </motion.div>

      <motion.div variants={item}>
        <FeedbackSection interview={interview} />
      </motion.div>
    </motion.div>
  );
}