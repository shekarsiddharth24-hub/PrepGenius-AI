import { FileClock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import ResumeHistoryList from "../../components/resume/ResumeHistoryList";
import { useResumeHistory } from "../../hooks/useResumeHistory";

import GlassPanel from "../../components/ui/GlassPanel";


const ResumeHistoryPage = () => {

  const {
    data,
    isLoading,
    isError,
  } = useResumeHistory();





  if (isLoading) {

    return (

      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
        "
      >

        <motion.div

          animate={{
            rotate:360,
          }}

          transition={{
            duration:2,
            repeat:Infinity,
            ease:"linear",
          }}

          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            bg-cyan-500/10

            text-cyan-300
          "
        >

          <Sparkles size={28}/>

        </motion.div>


      </div>

    );

  }





  if (isError) {

    return (

      <motion.div

        initial={{
          opacity:0,
          scale:0.95,
        }}

        animate={{
          opacity:1,
          scale:1,
        }}

        className="
          rounded-2xl

          border

          border-red-400/20

          bg-red-500/10

          p-6

          text-center

          text-red-300
        "
      >

        Failed to load resume history.

      </motion.div>

    );

  }





  return (

    <motion.div

      initial={{
        opacity:0,
        y:20,
      }}

      animate={{
        opacity:1,
        y:0,
      }}

      transition={{
        duration:0.4,
      }}

      className="
        space-y-8
      "
    >




      {/* Header */}

      <GlassPanel
        className="
          relative
          overflow-hidden
          p-8
        "
      >


        {/* Glow */}

        <div
          className="
            absolute
            -top-20
            right-0

            h-60
            w-60

            rounded-full

            bg-blue-500/10

            blur-3xl
          "
        />



        <div
          className="
            relative
            z-10

            flex

            flex-col

            gap-5


            md:flex-row

            md:items-center

            md:justify-between
          "
        >



          <div>


            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Sparkles
                size={22}
                className="
                  text-cyan-300
                "
              />


              <span
                className="
                  text-sm
                  font-medium
                  text-cyan-300
                "
              >
                AI Resume Intelligence
              </span>


            </div>




            <h1
              className="
                mt-3

                text-4xl

                font-bold


                bg-gradient-to-r

                from-cyan-300

                via-blue-300

                to-violet-300


                bg-clip-text

                text-transparent
              "
            >

              Resume History

            </h1>



            <p
              className="
                mt-2

                text-slate-400
              "
            >

              Review your previous resume analyses,
              scores, and AI-generated recommendations.

            </p>


          </div>






          <motion.div

            whileHover={{
              y:-5,
              rotate:-3,
            }}

            transition={{
              duration:0.2,
            }}

            className="
              flex

              h-20

              w-20

              items-center

              justify-center


              rounded-3xl


              bg-blue-500/10


              text-blue-300
            "
          >

            <FileClock size={40}/>


          </motion.div>




        </div>


      </GlassPanel>







      {/* History List */}

      <motion.div

        initial={{
          opacity:0,
          y:25,
        }}

        animate={{
          opacity:1,
          y:0,
        }}

        transition={{
          delay:0.15,
        }}

      >

        <ResumeHistoryList

          items={
            data?.items ?? []
          }

        />


      </motion.div>



    </motion.div>

  );

};


export default ResumeHistoryPage;