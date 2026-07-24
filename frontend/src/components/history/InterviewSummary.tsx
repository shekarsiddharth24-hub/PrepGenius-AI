import { motion } from "framer-motion";
import {
  CalendarDays,
  BrainCircuit,
  Gauge,
} from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

import type { Interview } from "../../types/interview";

interface Props {
  interview: Interview;
}

export default function InterviewSummary({
  interview,
}: Props) {
  return (
    <GlassPanel className="group relative overflow-hidden p-6">

      {/* Ambient Glow */}
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Section */}
        <div className="flex items-start gap-5">

          <motion.div
            whileHover={{
              y: -3,
              scale: 1.05,
            }}
            transition={{ duration: 0.2 }}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl

              bg-cyan-500/10
              text-cyan-300
            "
          >
            <BrainCircuit size={32} />
          </motion.div>

          <div>

            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-3xl font-bold text-transparent">
              {interview.topic || "Behavioral Interview"}
            </h1>

            <p className="mt-3 text-slate-400">
              Review your interview responses, AI evaluation,
              and detailed performance insights.
            </p>

          </div>

        </div>

        {/* Right Section */}
        <div className="grid gap-4 sm:grid-cols-2">

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-4
            "
          >
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <Gauge size={18} />
              <span className="text-sm font-medium">
                Difficulty
              </span>
            </div>

            <p className="text-lg font-semibold text-white capitalize">
              {interview.difficulty}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-4
            "
          >
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <CalendarDays size={18} />
              <span className="text-sm font-medium">
                Completed
              </span>
            </div>

            <p className="text-sm text-slate-300">
              {new Date(interview.created_at).toLocaleString()}
            </p>
          </div>

        </div>

      </div>
    </GlassPanel>
  );
}