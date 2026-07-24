import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

import ScoreBadge from "../common/ScoreBadge";

import type { Interview } from "../../types/interview";

interface Props {
  interview: Interview;
}


function formatRelativeDate(date: string) {
  const interviewDate = new Date(date);

  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);


  if (
    interviewDate.toDateString() ===
    today.toDateString()
  ) {
    return "Today";
  }


  if (
    interviewDate.toDateString() ===
    yesterday.toDateString()
  ) {
    return "Yesterday";
  }


  return interviewDate.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}



export default function TimelineItem({
  interview,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -15,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="relative flex gap-5"
    >

      {/* Timeline Node */}
      <div className="relative flex flex-col items-center">

        <motion.div
          whileHover={{
            scale: 1.2,
          }}
          className="
            mt-3

            flex
            h-4
            w-4
            items-center
            justify-center

            rounded-full

            bg-cyan-400

            shadow-[0_0_20px_rgba(34,211,238,0.7)]
          "
        />

        {/* Line */}
        <div
          className="
            mt-2
            h-full
            w-px

            bg-gradient-to-b
            from-cyan-400/40
            via-white/10
            to-transparent
          "
        />

      </div>


      {/* Content */}
      <motion.div
        whileHover={{
          y: -3,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          group
          flex-1

          rounded-2xl

          border
          border-white/10

          bg-white/5

          p-5

          backdrop-blur-xl

          transition-all

          hover:border-cyan-400/20

          hover:bg-white/10
        "
      >

        <div className="flex items-start justify-between gap-4">

          <div>

            <div className="flex items-center gap-2">

              <BrainCircuit
                size={18}
                className="text-cyan-300"
              />

              <h3 className="font-semibold text-white">
                {interview.topic || "Behavioral Interview"}
              </h3>

            </div>


            <p className="mt-2 text-sm capitalize text-slate-400">
              {interview.difficulty} Difficulty
            </p>

          </div>


          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {formatRelativeDate(interview.created_at)}
          </span>

        </div>


        {/* Score */}
        <div className="mt-4 flex items-center gap-3">

          <ScoreBadge
            score={interview.overall_score}
          />

          <span className="text-sm text-slate-400">
            AI Evaluation Score
          </span>

        </div>


      </motion.div>

    </motion.div>
  );
}