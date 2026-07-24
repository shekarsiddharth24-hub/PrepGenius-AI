import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  question: string;
}

export default function QuestionSection({
  question,
}: Props) {
  return (
    <GlassPanel className="group relative overflow-hidden p-6">

      {/* Ambient Glow */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">

          <motion.div
            whileHover={{
              y: -3,
              scale: 1.05,
            }}
            transition={{ duration: 0.2 }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              text-cyan-300
            "
          >
            <MessageSquareText size={24} />
          </motion.div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Interview Question
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              The AI-generated interview question presented during your session.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Question */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-5
          "
        >
          <p
            className="
              whitespace-pre-wrap
              leading-8
              text-slate-300
            "
          >
            {question}
          </p>
        </motion.div>

      </div>
    </GlassPanel>
  );
}