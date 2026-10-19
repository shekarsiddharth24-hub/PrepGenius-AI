import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

export type BadgeTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-white/10 bg-white/5 text-slate-300",
  success:
    "border-success-400/20 bg-success-500/10 text-success-300 shadow-[0_0_18px_rgba(52,211,153,0.2)]",
  warning:
    "border-warning-400/20 bg-warning-500/10 text-warning-300 shadow-[0_0_18px_rgba(251,191,36,0.2)]",
  danger:
    "border-danger-400/20 bg-danger-500/10 text-danger-300 shadow-[0_0_18px_rgba(248,113,113,0.2)]",
  info: "border-accent-400/20 bg-accent-500/10 text-accent-300 shadow-[0_0_18px_rgba(34,211,238,0.2)]",
};

interface BadgeProps {
  tone?: BadgeTone;
  icon?: ReactNode;
  uppercase?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Shared badge primitive. ScoreBadge / StatusBadge / DifficultyBadge
 * all render through this so tone, spacing, hover behavior, and
 * backdrop treatment stay in one place.
 */
export default function Badge({
  tone = "neutral",
  icon,
  uppercase = false,
  className,
  children,
}: BadgeProps) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5",
        "text-xs font-bold tracking-wide backdrop-blur-xl transition-all",
        uppercase && "uppercase",
        toneClasses[tone],
        className
      )}
    >
      {icon && (
        <motion.span
          whileHover={{ rotate: 10 }}
          className="inline-flex shrink-0 items-center"
        >
          {icon}
        </motion.span>
      )}
      {children}
    </motion.span>
  );
}
