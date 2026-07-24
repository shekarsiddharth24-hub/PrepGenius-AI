import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

import type { Interview } from "../../types/interview";

import ScoreCard from "../interview/ScoreCard";
import ScoreBreakdown from "../interview/ScoreBreakdown";

interface Props {
  interview: Interview;
}

export default function ScoreSummary({
  interview,
}: Props) {
  return (
    <GlassPanel className="group relative overflow-hidden p-6">

      {/* Ambient Glow */}
      <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-6 flex items-center gap-4">

          <motion.div
            whileHover={{
              y: -3,
              scale: 1.05,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl

              bg-blue-500/10
              text-blue-300
            "
          >
            <BarChart3 size={26} />
          </motion.div>


          <div>
            <h2 className="text-2xl font-bold text-white">
              Performance Score
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              AI-generated evaluation based on your interview response.
            </p>
          </div>

        </div>


        {/* Divider */}
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />


        {/* Score Content */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="space-y-6"
        >

          <ScoreCard
            score={interview.overall_score}
          />


          <ScoreBreakdown
            result={interview}
            interviewType={interview.interview_type}
          />

        </motion.div>

      </div>

    </GlassPanel>
  );
}