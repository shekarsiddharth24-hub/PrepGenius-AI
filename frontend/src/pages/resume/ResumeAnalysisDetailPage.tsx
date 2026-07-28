import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import GlassPanel from "../../components/ui/GlassPanel";
import ResumeResults from "../../components/resume/ResumeResults";

import { useResumeAnalysis } from "../../hooks/useResumeAnalysis";

const ResumeAnalysisDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useResumeAnalysis(Number(id));

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
        "
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
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
          <Sparkles size={28} />
        </motion.div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
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
        Failed to load resume analysis.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="space-y-8"
    >
      {/* Header */}

      <GlassPanel
        className="
          relative
          overflow-hidden
          p-8
        "
      >
        <div
          className="
            absolute
            -top-20
            right-0

            h-60
            w-60

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
          <div>

            <motion.button
              whileHover={{
                x: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => navigate(-1)}
              className="
                mb-5

                flex
                items-center
                gap-2

                text-sm

                text-slate-400

                transition

                hover:text-cyan-300
              "
            >
              <ArrowLeft size={16} />
              Back to History
            </motion.button>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Sparkles
                size={22}
                className="text-cyan-300"
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

                bg-gradient-to-r

                from-cyan-300
                via-blue-300
                to-violet-300

                bg-clip-text

                text-4xl
                font-bold

                text-transparent
              "
            >
              Resume Analysis
            </h1>



          </div>

          <motion.div
            whileHover={{
              y: -5,
              rotate: 3,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              flex

              h-20
              w-20

              items-center
              justify-center

              rounded-3xl

              bg-cyan-500/10

              text-cyan-300
            "
          >
            <FileText size={40} />
          </motion.div>

        </div>
      </GlassPanel>

      {/* Resume Analysis */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
        }}
      >
        <ResumeResults
          analysis={data}
        />
      </motion.div>

    </motion.div>
  );
};

export default ResumeAnalysisDetailPage;