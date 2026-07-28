import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface SkillItem {
  skill?: string;
  text?: string;
  reason?: string | null;
  evidence?: string | null;
}

interface Props {
  title: string;
  skills: SkillItem[];
}

const SkillsCard = ({ title, skills }: Props) => {
  return (
    <GlassPanel className="group relative overflow-hidden p-6">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <motion.div
            whileHover={{ y: -3, scale: 1.05 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300"
          >
            <Sparkles size={20} />
          </motion.div>

          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>

        <div className="mb-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {skills.length === 0 ? (
          <p className="text-sm text-slate-400">
            No skills detected.
          </p>
        ) : (
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.skill ?? skill.text ?? index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3"
              >
                <div className="font-semibold text-cyan-300">
                  {skill.skill ?? skill.text}
                </div>

                {(skill.reason || skill.evidence) && (
                  <p className="mt-1 text-sm text-slate-400">
                    {skill.reason ?? skill.evidence}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default SkillsCard;