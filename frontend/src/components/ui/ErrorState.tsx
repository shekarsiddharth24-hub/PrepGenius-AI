import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";

import GlassPanel from "./GlassPanel";
import GlassButton from "./GlassButton";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <GlassPanel className="p-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-danger-400/20 bg-danger-500/10 text-danger-300"
        >
          <AlertTriangle size={26} />
        </motion.div>

        <div className="space-y-1.5">
          <h3 className="font-display text-lg font-semibold text-white">
            {title}
          </h3>
          <p className="max-w-sm text-sm text-slate-400">{description}</p>
        </div>

        {onRetry && (
          <GlassButton variant="secondary" size="sm" onClick={onRetry}>
            <RotateCcw size={14} />
            Try again
          </GlassButton>
        )}
      </div>
    </GlassPanel>
  );
}
