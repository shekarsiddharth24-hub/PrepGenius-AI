import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import GlassCard from "../ui/GlassCard";
import GlassTiltCard from "../ui/GlassTiltCard";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
}

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <GlassTiltCard>
        <GlassCard className="group h-full p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <p className="relative z-10 text-sm text-slate-400">
                {title}
              </p>

              <h2 className="relative z-10 text-3xl font-bold text-white">
                {value}
              </h2>

              <p className="relative z-10 text-sm text-slate-500">
                {subtitle}
              </p>
            </div>

            <motion.div
              whileHover={{
                y: -3,
                scale: 1.05,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                relative
                z-20
                rounded-2xl
                bg-cyan-500/10
                p-4
                text-cyan-300
                backdrop-blur-md
                transition-colors
                group-hover:bg-cyan-500/15
              "
            >
              <Icon size={28} />
            </motion.div>
          </div>
        </GlassCard>
      </GlassTiltCard>
    </motion.div>
  );
}