import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  score: number;
}

export default function ScoreCard({
  score,
}: Props) {
  return (
    <GlassPanel className="group relative overflow-hidden p-10">

      {/* Glow */}

      <div
        className="
          absolute
          -top-24
          left-1/2
          h-64
          w-64
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />


      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          text-center
        "
      >

        {/* Icon */}

        <motion.div
          whileHover={{
            y:-4,
            scale:1.05,
          }}
          transition={{
            duration:0.25,
          }}
          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            bg-yellow-500/10

            text-yellow-300
          "
        >
          <Trophy size={30}/>
        </motion.div>



        {/* Title */}

        <h2
          className="
            mt-6

            text-lg

            font-medium

            text-slate-400
          "
        >
          Overall Score
        </h2>



        {/* Score */}

        <motion.div
          initial={{
            opacity:0,
            scale:0.8,
          }}
          animate={{
            opacity:1,
            scale:1,
          }}
          transition={{
            duration:0.5,
            ease:"easeOut",
          }}
          className="
            mt-4

            bg-gradient-to-r

            from-cyan-300

            via-blue-400

            to-violet-400

            bg-clip-text

            text-7xl

            font-bold

            text-transparent
          "
        >
          {score.toFixed(1)}%
        </motion.div>



        {/* Status */}

        <div
          className="
            mt-6

            rounded-full

            border

            border-cyan-400/20

            bg-cyan-500/10

            px-5

            py-2

            text-sm

            font-medium

            text-cyan-300
          "
        >
          AI Evaluation Complete
        </div>


      </div>


    </GlassPanel>
  );
}