import { motion } from "framer-motion";

interface Props {
  score: number;
}

export default function ScoreBadge({
  score,
}: Props) {
  let classes = `
    border-white/10
    bg-white/5
    text-slate-300
  `;

  if (score >= 80) {
    classes = `
      border-emerald-400/20
      bg-emerald-500/10
      text-emerald-300

      shadow-[0_0_18px_rgba(52,211,153,0.2)]
    `;
  } else if (score >= 60) {
    classes = `
      border-amber-400/20
      bg-amber-500/10
      text-amber-300

      shadow-[0_0_18px_rgba(251,191,36,0.2)]
    `;
  } else {
    classes = `
      border-red-400/20
      bg-red-500/10
      text-red-300

      shadow-[0_0_18px_rgba(248,113,113,0.2)]
    `;
  }

  return (
    <motion.span
      whileHover={{
        y: -2,
        scale: 1.05,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        inline-flex
        items-center
        justify-center

        rounded-full
        border

        px-4
        py-1.5

        text-xs
        font-bold

        tracking-wide

        backdrop-blur-xl

        transition-all

        ${classes}
      `}
    >
      {score.toFixed(1)}%
    </motion.span>
  );
}