import { motion } from "framer-motion";
import type { ReactNode } from "react";

import GlassPanel from "../ui/GlassPanel";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <GlassPanel className="group relative overflow-hidden p-6">

      {/* Ambient Glow */}
      <div
        className="
          absolute
          -top-16
          -right-16
          h-40
          w-40
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          {/* Title */}
          <p
            className="
              text-sm
              font-medium
              text-slate-400
            "
          >
            {title}
          </p>


          {/* Icon */}
          <motion.div
            whileHover={{
              y: -3,
              scale: 1.08,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              border
              border-cyan-400/20

              bg-cyan-500/10

              text-cyan-300
            "
          >
            {icon}
          </motion.div>

        </div>


        {/* Value */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            mt-6

            bg-gradient-to-r
            from-white
            via-slate-200
            to-slate-400

            bg-clip-text

            text-4xl
            font-bold
            text-transparent
          "
        >
          {value}
        </motion.h2>


      </div>

    </GlassPanel>
  );
}