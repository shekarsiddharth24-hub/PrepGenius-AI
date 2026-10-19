import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

import GlassPanel from "./GlassPanel";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <GlassPanel className="p-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400"
        >
          {icon ?? <Inbox size={24} />}
        </motion.div>

        <div className="space-y-1.5">
          <h3 className="font-display text-lg font-semibold text-white">
            {title}
          </h3>
          {description && (
            <p className="max-w-sm text-sm text-slate-400">{description}</p>
          )}
        </div>

        {action}
      </div>
    </GlassPanel>
  );
}
