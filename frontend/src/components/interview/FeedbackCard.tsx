import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  result: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}

interface SectionProps {
  title: string;
  items: string[];
  type: "strength" | "weakness" | "suggestion";
}


function FeedbackSection({
  title,
  items,
  type,
}: SectionProps) {

  const config = {
    strength: {
      icon: CheckCircle2,
      color:
        "text-green-300 bg-green-500/10 border-green-400/20",
      bullet:
        "bg-green-400",
    },

    weakness: {
      icon: AlertTriangle,
      color:
        "text-orange-300 bg-orange-500/10 border-orange-400/20",
      bullet:
        "bg-orange-400",
    },

    suggestion: {
      icon: Lightbulb,
      color:
        "text-cyan-300 bg-cyan-500/10 border-cyan-400/20",
      bullet:
        "bg-cyan-400",
    },
  }[type];


  const Icon = config.icon;


  return (
    <motion.div
      initial={{
        opacity:0,
        y:15,
      }}
      animate={{
        opacity:1,
        y:0,
      }}
      transition={{
        duration:0.35,
      }}
      className="
        rounded-2xl
        border
        border-white/10

        bg-white/5

        p-6
      "
    >

      {/* Section Header */}

      <div className="mb-5 flex items-center gap-3">

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border

            ${config.color}
          `}
        >
          <Icon size={20}/>
        </div>


        <h2 className="
          text-xl
          font-semibold
          text-white
        ">
          {title}
        </h2>

      </div>



      {items.length === 0 ? (

        <p className="
          text-sm
          text-slate-400
        ">
          No feedback available.
        </p>

      ) : (

        <ul className="
          space-y-3
        ">

          {items.map((item,index)=>(
            <motion.li
              key={index}
              initial={{
                opacity:0,
                x:-10,
              }}
              animate={{
                opacity:1,
                x:0,
              }}
              transition={{
                delay:index*0.05,
              }}
              className="
                flex
                gap-3

                text-slate-300
                leading-7
              "
            >

              <span
                className={`
                  mt-3
                  h-2
                  w-2
                  shrink-0
                  rounded-full

                  ${config.bullet}
                `}
              />

              <span>
                {item}
              </span>

            </motion.li>
          ))}

        </ul>

      )}

    </motion.div>
  );
}



export default function FeedbackCard({
  result,
}: Props) {

  return (
    <GlassPanel className="
      relative
      overflow-hidden
      space-y-6
      p-8
    ">

      {/* AI Glow */}

      <div
        className="
          absolute
          -top-20
          right-0
          h-52
          w-52
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />


      <div className="
        relative
        z-10
        space-y-6
      ">

        <FeedbackSection
          title="Strengths"
          items={result.strengths}
          type="strength"
        />


        <FeedbackSection
          title="Areas for Improvement"
          items={result.weaknesses}
          type="weakness"
        />


        <FeedbackSection
          title="Suggestions"
          items={result.suggestions}
          type="suggestion"
        />

      </div>

    </GlassPanel>
  );
}