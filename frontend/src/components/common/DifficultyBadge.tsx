import { motion } from "framer-motion";

interface Props {
  difficulty: string;
}

export default function DifficultyBadge({
  difficulty,
}: Props) {
  let classes =
    `
    border-white/10
    bg-white/5
    text-slate-300
    shadow-sm
    `;

  switch (difficulty.toLowerCase()) {
    case "easy":
      classes =
        `
        border-emerald-400/20
        bg-emerald-500/10
        text-emerald-300
        shadow-[0_0_15px_rgba(52,211,153,0.15)]
        `;
      break;

    case "medium":
      classes =
        `
        border-amber-400/20
        bg-amber-500/10
        text-amber-300
        shadow-[0_0_15px_rgba(251,191,36,0.15)]
        `;
      break;

    case "hard":
      classes =
        `
        border-red-400/20
        bg-red-500/10
        text-red-300
        shadow-[0_0_15px_rgba(248,113,113,0.15)]
        `;
      break;
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
        rounded-full
        border

        px-4
        py-1.5

        text-xs
        font-semibold
        uppercase
        tracking-wide

        backdrop-blur-xl

        transition-all

        ${classes}
      `}
    >
      {difficulty}
    </motion.span>
  );
}