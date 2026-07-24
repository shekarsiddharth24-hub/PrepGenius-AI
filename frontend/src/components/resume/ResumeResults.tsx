import { motion } from "framer-motion";

import type { ResumeAnalysis } from "../../types/resume";

import ResumeScoreCard from "./ResumeScoreCard";
import SkillsCard from "./SkillsCard";
import InfoListCard from "./InfoListCard";


interface Props {
  analysis: ResumeAnalysis;
}


const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};


const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  show: {
    opacity: 1,
    y: 0,
  },
};



const ResumeResults = ({
  analysis,
}: Props) => {

  return (

    <motion.div

      variants={container}

      initial="hidden"

      animate="show"

      className="
        space-y-8
      "
    >


      {/* Resume Score */}

      <motion.div
        variants={cardAnimation}
      >

        <ResumeScoreCard
          score={analysis.resume_score}
        />

      </motion.div>




      {/* AI Insights Grid */}

      <div
        className="
          grid

          grid-cols-1

          gap-6

          md:grid-cols-2
        "
      >


        <motion.div variants={cardAnimation}>

          <SkillsCard
            title="Technical Skills"
            skills={
              analysis.technical_skills
            }
          />

        </motion.div>



        <motion.div variants={cardAnimation}>

          <SkillsCard
            title="Soft Skills"
            skills={
              analysis.soft_skills
            }
          />

        </motion.div>



        <motion.div variants={cardAnimation}>

          <InfoListCard
            title="Strengths"
            items={
              analysis.strengths
            }
          />

        </motion.div>



        <motion.div variants={cardAnimation}>

          <InfoListCard
            title="Weaknesses"
            items={
              analysis.weaknesses
            }
          />

        </motion.div>



        <motion.div variants={cardAnimation}>

          <InfoListCard
            title="Missing Skills"
            items={
              analysis.missing_skills
            }
          />

        </motion.div>



        <motion.div variants={cardAnimation}>

          <InfoListCard
            title="Recommended Topics"
            items={
              analysis.recommended_topics
            }
          />

        </motion.div>


      </div>


    </motion.div>

  );

};


export default ResumeResults;