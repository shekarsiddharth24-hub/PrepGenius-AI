import { motion } from "framer-motion";
import { History } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

export default function HistoryHeader() {
  return (
    <GlassPanel className="group relative mb-8 overflow-hidden p-6">

      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-5">

          <motion.div
            whileHover={{
              y: -3,
              scale: 1.05,
            }}
            transition={{ duration: 0.25 }}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-cyan-500/10
              text-cyan-300
            "
          >
            <History size={28} />
          </motion.div>

          <div>
            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-3xl font-bold text-transparent">
              Interview History
            </h1>

            <p className="mt-2 max-w-2xl text-slate-400">
              Review your completed interviews, revisit AI feedback,
              and monitor your progress over time.
            </p>
          </div>

        </div>

      </div>
    </GlassPanel>
  );
}