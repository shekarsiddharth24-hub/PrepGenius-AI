import { motion } from "framer-motion";

import type { ScoreBreakdownResult } from "../../types/interview";

import GlassCard from "../ui/GlassCard";
import GlassTiltCard from "../ui/GlassTiltCard";

interface Props {
  result: ScoreBreakdownResult;
  interviewType: "technical" | "behavioral";
}


export default function ScoreBreakdown({
  result,
  interviewType,
}: Props) {

  const technicalMetrics = [
    {
      label: "Semantic",
      value: result.semantic_score,
    },
    {
      label: "Technical",
      value: result.technical_score,
    },
    {
      label: "Completeness",
      value: result.completeness_score,
    },
    {
      label: "Communication",
      value: result.communication_score,
    },
  ];


  const behavioralMetrics = [
    {
      label: "Communication",
      value: result.communication_score,
    },
    {
      label: "Professionalism",
      value: result.professionalism_score,
    },
    {
      label: "Leadership",
      value: result.leadership_score,
    },
    {
      label: "Problem Solving",
      value: result.problem_solving_score,
    },
    {
      label: "STAR Method",
      value: result.star_score,
    },
  ];


  const metrics =
    interviewType === "technical"
      ? technicalMetrics
      : behavioralMetrics;



  return (
    <div className="
      grid
      gap-5
      md:grid-cols-2
      xl:grid-cols-3
    ">

      {metrics
        .filter(
          (metric) =>
            metric.value != null
        )
        .map((metric, index) => {

          const score =
            Number(metric.value);


          return (

            <motion.div
              key={metric.label}
              initial={{
                opacity:0,
                y:20,
              }}
              animate={{
                opacity:1,
                y:0,
              }}
              transition={{
                delay:index * 0.08,
              }}
            >

              <GlassTiltCard>

                <GlassCard
                  className="
                    group
                    relative
                    overflow-hidden
                    p-6
                  "
                >

                  {/* Score Glow */}

                  <div
                    className="
                      absolute
                      -right-10
                      -top-10

                      h-32
                      w-32

                      rounded-full

                      bg-cyan-500/10

                      blur-3xl
                    "
                  />


                  <div className="relative z-10">


                    {/* Label */}

                    <p className="
                      text-sm
                      font-medium
                      text-slate-400
                    ">
                      {metric.label}
                    </p>



                    {/* Score */}

                    <motion.h3
                      initial={{
                        opacity:0,
                        scale:0.8,
                      }}
                      animate={{
                        opacity:1,
                        scale:1,
                      }}
                      transition={{
                        delay:
                          index * 0.1 +
                          0.2,
                      }}
                      className="
                        mt-3

                        text-4xl

                        font-bold

                        text-white
                      "
                    >
                      {score.toFixed(1)}
                      <span className="
                        ml-1
                        text-xl
                        text-cyan-300
                      ">
                        %
                      </span>
                    </motion.h3>



                    {/* Progress */}

                    <div
                      className="
                        mt-5

                        h-2

                        overflow-hidden

                        rounded-full

                        bg-white/10
                      "
                    >

                      <motion.div
                        initial={{
                          width:0,
                        }}
                        animate={{
                          width:`${score}%`,
                        }}
                        transition={{
                          duration:0.8,
                          delay:
                            index * 0.1,
                        }}
                        className="
                          h-full

                          rounded-full

                          bg-gradient-to-r

                          from-cyan-400

                          to-blue-500
                        "
                      />

                    </div>


                  </div>


                </GlassCard>

              </GlassTiltCard>


            </motion.div>

          );
        })}

    </div>
  );
}