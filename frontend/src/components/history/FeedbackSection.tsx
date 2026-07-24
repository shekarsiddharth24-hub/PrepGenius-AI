import { motion } from "framer-motion";
import { Bot } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

import type { Interview } from "../../types/interview";

interface Props {
  interview: Interview;
}

export default function FeedbackSection({
  interview,
}: Props) {
  return (
    <GlassPanel className="group relative overflow-hidden p-6">

      {/* Background Glow */}
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
            <Bot size={24} />
          </motion.div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              AI Feedback
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Personalized evaluation and improvement suggestions.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Feedback */}
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
          <pre
            className="
              whitespace-pre-wrap
              font-sans
              text-sm
              leading-7
              text-slate-300
            "
          >
            {interview.feedback}
          </pre>
        </motion.div>

      </div>
    </GlassPanel>
  );
}