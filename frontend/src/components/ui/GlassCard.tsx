import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className={clsx(
        `
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl

        shadow-xl

        transition-all
        duration-300

        hover:border-cyan-400/20
        hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]
        `,
        className
      )}
    >
      {/* Reflection */}
      <div
        className="
        pointer-events-none
        absolute
        inset-0
        opacity-0
        transition-opacity
        duration-500
        group-hover:opacity-100
        bg-gradient-to-br
        from-white/20
        via-transparent
        to-transparent
      "
      />

      {/* Animated Border */}
      <motion.div
        className="
        absolute
        inset-0
        rounded-3xl
        p-[1px]
        pointer-events-none
        "
        style={{
          background:
            "linear-gradient(120deg,#22d3ee,#8b5cf6,#3b82f6,#22d3ee)",
          backgroundSize: "300% 300%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
      />

      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
}