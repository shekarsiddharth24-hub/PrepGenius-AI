import { motion } from "framer-motion";
import { FileCheck2, Sparkles } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";


interface Props {
  score: number;
}


const ResumeScoreCard = ({
  score,
}: Props) => {


  const getStatus = () => {

    if (score >= 90)
      return {
        text: "Excellent",
        color:
          "text-green-300 bg-green-500/10 border-green-400/20",
      };


    if (score >= 75)
      return {
        text: "Good",
        color:
          "text-cyan-300 bg-cyan-500/10 border-cyan-400/20",
      };


    if (score >= 60)
      return {
        text: "Average",
        color:
          "text-yellow-300 bg-yellow-500/10 border-yellow-400/20",
      };


    return {
      text: "Needs Improvement",
      color:
        "text-red-300 bg-red-500/10 border-red-400/20",
    };

  };


  const status = getStatus();



  return (

    <GlassPanel
      className="
        relative
        overflow-hidden
        p-10
      "
    >

      {/* AI Glow */}

      <div
        className="
          absolute
          -top-28
          left-1/2
          h-72
          w-72
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
            duration:0.2,
          }}

          className="
            flex
            h-16
            w-16
            items-center
            justify-center

            rounded-2xl

            bg-cyan-500/10

            text-cyan-300
          "
        >

          <FileCheck2 size={34}/>

        </motion.div>



        {/* Heading */}

        <div
          className="
            mt-6
            flex
            items-center
            gap-2
          "
        >

          <h2
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            Resume Score
          </h2>


          <Sparkles
            size={18}
            className="text-cyan-300"
          />

        </div>




        {/* Score */}

        <motion.div

          initial={{
            opacity:0,
            scale:0.7,
          }}

          animate={{
            opacity:1,
            scale:1,
          }}

          transition={{
            duration:0.5,
          }}

          className="
            mt-5

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

          {score}%

        </motion.div>




        {/* Status */}

        <div
          className={`
            mt-6

            rounded-full

            border

            px-5

            py-2

            text-sm

            font-medium

            ${status.color}
          `}
        >

          {status.text}

        </div>



        <p
          className="
            mt-4
            text-sm
            text-slate-400
          "
        >
          AI-powered resume evaluation complete
        </p>


      </div>


    </GlassPanel>

  );

};


export default ResumeScoreCard;