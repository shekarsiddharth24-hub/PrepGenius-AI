import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {

  let Icon = CheckCircle;

  let classes = `
    border-emerald-400/20
    bg-emerald-500/10
    text-emerald-300

    shadow-[0_0_18px_rgba(52,211,153,0.2)]
  `;


  switch (status.toLowerCase()) {

    case "pending":
      Icon = Clock;

      classes = `
        border-amber-400/20
        bg-amber-500/10
        text-amber-300

        shadow-[0_0_18px_rgba(251,191,36,0.2)]
      `;
      break;


    case "failed":
    case "error":
      Icon = XCircle;

      classes = `
        border-red-400/20
        bg-red-500/10
        text-red-300

        shadow-[0_0_18px_rgba(248,113,113,0.2)]
      `;
      break;


    case "completed":
    default:
      Icon = CheckCircle;
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
        gap-2

        rounded-full
        border

        px-4
        py-1.5

        text-xs
        font-bold
        uppercase
        tracking-wide

        backdrop-blur-xl

        transition-all

        ${classes}
      `}
    >

      <motion.span
        whileHover={{
          rotate: 10,
        }}
      >
        <Icon size={15} />
      </motion.span>


      {status}

    </motion.span>
  );
}