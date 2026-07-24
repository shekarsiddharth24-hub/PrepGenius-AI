import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  title: string;
  items: string[];
}

const InfoListCard = ({
  title,
  items,
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

      {/* Ambient Glow */}

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

              bg-cyan-500/10

              text-cyan-300
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
            w-full
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
          "
        />



        {/* List */}

        {
          items.length === 0 ? (

            <p
              className="
                text-sm
                text-slate-400
              "
            >
              No information available.
            </p>

          ) : (

            <ul
              className="
                space-y-3
              "
            >

              {
                items.map((item,index)=>(

                  <motion.li
                    key={item}

                    initial={{
                      opacity:0,
                      x:-10,
                    }}

                    animate={{
                      opacity:1,
                      x:0,
                    }}

                    transition={{
                      delay:index * 0.05,
                    }}

                    className="
                      flex
                      items-start
                      gap-3

                      text-slate-300

                      leading-7
                    "
                  >

                    <span
                      className="
                        mt-3
                        h-2
                        w-2
                        shrink-0
                        rounded-full

                        bg-cyan-400

                        shadow-[0_0_10px_rgba(34,211,238,0.8)]
                      "
                    />


                    <span>
                      {item}
                    </span>


                  </motion.li>

                ))
              }

            </ul>

          )
        }


      </div>


    </GlassPanel>

  );

};


export default InfoListCard;