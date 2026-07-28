import { motion } from "framer-motion";
import { FolderKanban, Layers3 } from "lucide-react";

import type { ResumeProject } from "../../types/resume";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  projects: ResumeProject[];
}

const ProjectsCard = ({
  projects,
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
          -top-24
          right-0
          h-72
          w-72
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* Header */}

        <div
          className="
            mb-6
            flex
            items-center
            gap-3
          "
        >
          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: 5,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-violet-500/10
              text-violet-300
            "
          >
            <FolderKanban size={22} />
          </motion.div>

          <div>
            <h2
              className="
                text-2xl
                font-semibold
                text-white
              "
            >
              Projects
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              AI extracted project portfolio
            </p>
          </div>
        </div>

        {/* Divider */}

        <div
          className="
            mb-6
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
          "
        />

        {projects.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-6
              text-center
              text-slate-400
            "
          >
            No projects detected.
          </div>
        ) : (
          <div
            className="
              space-y-5
            "
          >
            {projects.map((project, index) => (
              <motion.div
                key={`${project.name}-${index}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-violet-400/30
                  hover:bg-white/[0.07]
                  hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
                "
              >
                {/* Project Name */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-white
                      "
                    >
                      {project.name}
                    </h3>

                   
                      
                  </div>
                </div>

                {/* Tech Stack */}

                {project.tech_stack.length > 0 && (
                  <>
                    <div
                      className="
                        mt-6
                        mb-3
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-violet-300
                      "
                    >
                      <Layers3 size={16} />
                      Technologies
                    </div>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-3
                      "
                    >
                      {project.tech_stack.map(
                        (tech, techIndex) => (
                          <motion.div
                            key={`${tech.skill}-${techIndex}`}
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                            }}
                            className="
                              rounded-xl
                              border
                              border-violet-400/20
                              bg-violet-500/10
                              px-3
                              py-2
                              transition-all
                            "
                          >
                            <div
                              className="
                                text-sm
                                font-medium
                                text-violet-200
                              "
                            >
                              {tech.skill}
                            </div>

                            {tech.reason && (
                              <div
                                className="
                                  mt-1
                                  max-w-xs
                                  text-xs
                                  leading-5
                                  text-slate-400
                                "
                              >
                                {tech.reason}
                              </div>
                            )}
                          </motion.div>
                        )
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default ProjectsCard;