import { motion } from "framer-motion";
import { Code2, Users } from "lucide-react";

interface Props {
  type: "technical" | "behavioral";
}

export default function InterviewTypeBadge({
  type,
}: Props) {
  const isTechnical = type === "technical";

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
        gap-2

        rounded-full

        border

        px-4
        py-1.5

        text-xs
        font-semibold

        backdrop-blur-xl

        transition-all

        ${
          isTechnical
            ? `
              border-cyan-400/20
              bg-cyan-500/10
              text-cyan-300
              shadow-[0_0_20px_rgba(34,211,238,0.15)]
            `
            :
            `
              border-green-400/20
              bg-green-500/10
              text-green-300
              shadow-[0_0_20px_rgba(34,197,94,0.15)]
            `
        }
      `}
    >

      <motion.span
        whileHover={{
          rotate: 8,
        }}
      >
        {
          isTechnical
            ? <Code2 size={15}/>
            : <Users size={15}/>
        }
      </motion.span>


      {
        isTechnical
          ? "Technical"
          : "Behavioral"
      }

    </motion.span>
  );
}