import { motion, type Variants } from "framer-motion";

import GlassCard from "../ui/GlassCard";


interface Props {
  technicalInterviews: number;
  behavioralInterviews: number;
  technicalAverage: number;
  behavioralAverage: number;
}


const container: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};


const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};


export default function InterviewTypeAnalytics({
  technicalInterviews,
  behavioralInterviews,
  technicalAverage,
  behavioralAverage,
}: Props) {

  const cards = [
    {
      title: "Technical Interviews",
      value: technicalInterviews,
    },

    {
      title: "Behavioral Interviews",
      value: behavioralInterviews,
    },

    {
      title: "Technical Avg",
      value: `${technicalAverage.toFixed(1)}%`,
    },

    {
      title: "Behavioral Avg",
      value: `${behavioralAverage.toFixed(1)}%`,
    },
  ];


  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"

      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >

      {cards.map((card) => (
        <motion.div
          key={card.title}
          variants={item}
        >

          <GlassCard className="p-6">

            <p className="text-sm text-white/60">
              {card.title}
            </p>

            <h2 className="
              mt-3
              text-3xl
              font-bold
              text-white
            ">
              {card.value}
            </h2>

          </GlassCard>

        </motion.div>
      ))}

    </motion.div>
  );
}