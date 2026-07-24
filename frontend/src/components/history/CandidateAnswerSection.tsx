import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  answer: string;
}

export default function CandidateAnswerSection({
  answer,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <GlassPanel className="group relative overflow-hidden p-6">

        {/* Background Glow */}
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10">

          {/* Header */}
          <div className="mb-6 flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-xl font-semibold text-transparent">
                Your Answer
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Response submitted during the interview.
              </p>
            </div>

          </div>

          {/* Answer */}
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
            "
          >
            <p className="whitespace-pre-wrap leading-8 text-slate-300">
              {answer}
            </p>
          </div>

        </div>

      </GlassPanel>
    </motion.div>
  );
}