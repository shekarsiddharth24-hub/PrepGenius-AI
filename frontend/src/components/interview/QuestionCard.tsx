import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";
import InterviewTypeBadge from "./InterviewTypeBadge";

interface Props {
  interview: {
    interview_type: "technical" | "behavioral";
    topic?: string;
    difficulty: string;
    question: string;
  };
}

export default function QuestionCard({
  interview,
}: Props) {
  return (
    <GlassPanel className="group relative mb-8 overflow-hidden p-8">

      {/* Ambient AI Glow */}

      <div
        className="
          absolute
          -top-24
          -right-24
          h-64
          w-64
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-24
          -left-24
          h-48
          w-48
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />


      <div className="relative z-10">


        {/* Header */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


          <div className="flex items-center gap-3">

            <motion.div
              whileHover={{
                y:-3,
                scale:1.05,
              }}
              transition={{
                duration:0.2,
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl

                bg-cyan-500/10

                text-cyan-300
              "
            >
              <Sparkles size={22}/>
            </motion.div>


            <div>

              <p className="
                text-sm
                text-slate-400
              ">
                AI Generated Question
              </p>


              <h2 className="
                text-xl
                font-bold
                text-white
              ">
                Interview Challenge
              </h2>

            </div>

          </div>


          <InterviewTypeBadge
            type={interview.interview_type}
          />

        </div>



        {/* Metadata */}

        <div
          className="
            mb-6
            flex
            flex-col
            gap-4

            rounded-2xl

            border
            border-white/10

            bg-white/5

            p-5

            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>

            <p className="
              text-sm
              text-slate-400
            ">
              Topic
            </p>


            <h3 className="
              mt-1
              text-lg
              font-semibold
              text-white
            ">
              {
                interview.topic ??
                "Behavioral Interview"
              }
            </h3>

          </div>



          <span
            className="
              w-fit

              rounded-full

              border
              border-blue-400/20

              bg-blue-500/10

              px-4
              py-2

              text-sm

              font-medium

              text-blue-300
            "
          >
            {interview.difficulty}
          </span>


        </div>



        {/* Question */}

        <motion.div
          initial={{
            opacity:0,
            y:10,
          }}
          animate={{
            opacity:1,
            y:0,
          }}
          transition={{
            delay:0.15,
          }}
          className="
            rounded-2xl

            border
            border-white/10

            bg-black/10

            p-6
          "
        >

          <p
            className="
              whitespace-pre-line

              text-lg

              leading-8

              text-slate-200
            "
          >
            {interview.question}
          </p>

        </motion.div>


      </div>

    </GlassPanel>
  );
}