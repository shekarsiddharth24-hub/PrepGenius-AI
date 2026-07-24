import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";


interface Props {
  title: string;
  skills: string[];
}


const SkillsCard = ({
  title,
  skills,
}: Props) => {


  return (

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
          bg-blue-500/10
          blur-3xl
        "
      />



      <div
        className="
          relative
          z-10
        "
      >


        {/* Header */}

        <div
          className="
            mb-5

            flex

            items-center

            gap-3
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
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              bg-blue-500/10

              text-blue-300
            "
          >

            <Sparkles size={20}/>

          </motion.div>



          <h2
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            {title}
          </h2>


        </div>




        {/* Divider */}

        <div
          className="
            mb-5

            h-px

            bg-gradient-to-r

            from-transparent

            via-white/10

            to-transparent
          "
        />




        {/* Skills */}

        {
          skills.length === 0 ?

          (

            <p
              className="
                text-sm
                text-slate-400
              "
            >
              No skills detected.
            </p>

          )

          :

          (

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              {
                skills.map(
                  (skill,index)=>(

                    <motion.span

                      key={skill}

                      initial={{
                        opacity:0,
                        scale:0.8,
                      }}

                      animate={{
                        opacity:1,
                        scale:1,
                      }}

                      transition={{
                        delay:index*0.05,
                      }}


                      whileHover={{
                        y:-3,
                        scale:1.05,
                      }}


                      className="
                        rounded-full

                        border

                        border-cyan-400/20

                        bg-cyan-500/10

                        px-4

                        py-2

                        text-sm

                        font-medium

                        text-cyan-300

                        shadow-[0_0_15px_rgba(34,211,238,0.12)]

                        transition
                      "
                    >

                      {skill}

                    </motion.span>

                  )
                )
              }


            </div>

          )
        }



      </div>


    </GlassPanel>

  );

};


export default SkillsCard;