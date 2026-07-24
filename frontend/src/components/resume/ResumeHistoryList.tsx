import { FileSearch } from "lucide-react";
import { motion } from "framer-motion";

import ResumeHistoryCard from "./ResumeHistoryCard";

import type { ResumeHistoryItem } from "../../types/resume";

import { downloadResumePDF } from "../../api/resume";

import GlassPanel from "../ui/GlassPanel";


interface Props {
  items: ResumeHistoryItem[];
}


const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};


const itemAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,
  },
};



const ResumeHistoryList = ({
  items,
}: Props) => {


  const handleExport = async (
    id: number,
  ) => {

    try {

      await downloadResumePDF(id);

    } catch(error){

      console.error(
        "Failed to download PDF",
        error
      );

    }

  };



  if (items.length === 0) {

    return (

      <GlassPanel
        className="
          flex
          flex-col
          items-center
          justify-center

          p-10

          text-center
        "
      >

        <motion.div

          initial={{
            opacity:0,
            scale:0.8,
          }}

          animate={{
            opacity:1,
            scale:1,
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

          <FileSearch size={32}/>

        </motion.div>



        <h3
          className="
            mt-5

            text-xl

            font-semibold

            text-white
          "
        >
          No Resume Analysis Yet
        </h3>



        <p
          className="
            mt-2

            max-w-md

            text-slate-400
          "
        >
          Upload your resume to get AI-powered
          feedback and improvement suggestions.
        </p>


      </GlassPanel>

    );

  }



  return (

    <motion.div

      variants={container}

      initial="hidden"

      animate="show"

      className="
        space-y-5
      "
    >

      {
        items.map((item)=>(

          <motion.div

            key={item.id}

            variants={itemAnimation}

          >

            <ResumeHistoryCard

              item={item}

              onExport={handleExport}

            />

          </motion.div>

        ))
      }


    </motion.div>

  );

};


export default ResumeHistoryList;