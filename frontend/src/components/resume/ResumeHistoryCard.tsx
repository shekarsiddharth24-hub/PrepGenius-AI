import { motion } from "framer-motion";
import { FileText, Download, Sparkles } from "lucide-react";

import type { ResumeHistoryItem } from "../../types/resume";

import GlassTiltCard from "../ui/GlassTiltCard";
import GlassPanel from "../ui/GlassPanel";

interface Props {
  item: ResumeHistoryItem;
  onExport: (id: number) => void;
}

const ResumeHistoryCard = ({
  item,
  onExport,
}: Props) => {

  return (
    <GlassTiltCard>

      <GlassPanel
        className="
          group
          relative
          overflow-hidden
          p-6
        "
      >

        {/* Glow */}

        <div
          className="
            absolute
            -top-16
            -right-16
            h-40
            w-40
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
            gap-6

            md:flex-row
            md:items-center
            md:justify-between
          "
        >


          {/* Resume Info */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

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
                h-12
                w-12
                items-center
                justify-center

                rounded-2xl

                bg-blue-500/10

                text-blue-300
              "
            >

              <FileText size={26}/>

            </motion.div>



            <div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <h3
                  className="
                    font-semibold
                    text-white
                  "
                >
                  {item.filename}
                </h3>


                <Sparkles
                  size={15}
                  className="text-cyan-300"
                />

              </div>



              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >
                Analyzed on{" "}
                {
                  new Date(
                    item.created_at
                  ).toLocaleDateString()
                }
              </p>


            </div>


          </div>





          {/* Score + Action */}

          <div
            className="
              flex
              items-center
              gap-6
            "
          >

            {/* Score */}

            <div
              className="
                rounded-2xl

                border
                border-cyan-400/20

                bg-cyan-500/10

                px-6
                py-3

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
                  bg-gradient-to-r
                  from-cyan-300
                  to-blue-400

                  bg-clip-text

                  text-3xl

                  font-bold

                  text-transparent
                "
              >
                {item.resume_score}
              </motion.div>


              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Resume Score
              </p>


            </div>





            {/* Export Button */}

            <motion.button
              whileHover={{
                y:-2,
                scale:1.05,
              }}

              whileTap={{
                scale:0.95,
              }}

              onClick={() =>
                onExport(item.id)
              }

              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-xl

                border
                border-white/10

                bg-white/5

                text-slate-300

                transition

                hover:border-cyan-400/30

                hover:bg-cyan-500/10

                hover:text-cyan-300
              "
            >

              <Download size={18}/>

            </motion.button>


          </div>


        </div>


      </GlassPanel>

    </GlassTiltCard>
  );
};


export default ResumeHistoryCard;