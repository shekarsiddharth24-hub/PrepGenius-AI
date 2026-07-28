import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface InfoItem {
  text?: string;
  evidence?: string;

  skill?: string;
  reason?: string;

  topic?: string;
}

interface Props {
  title: string;
  items: InfoItem[];
}

const InfoListCard = ({ title, items }: Props) => {
  return (
    <GlassPanel className="group relative overflow-hidden p-6">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <motion.div
            whileHover={{ y: -3, scale: 1.05 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300"
          >
            <Sparkles size={20} />
          </motion.div>

          <h2 className="text-xl font-semibold text-white">
            {title}
          </h2>
        </div>

        <div className="mb-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {items.length === 0 ? (
          <p className="text-sm text-slate-400">
            No information available.
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={
                  item.text ??
                  item.skill ??
                  item.topic ??
                  index
                }
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <h3 className="font-semibold text-white">
                  {item.text ?? item.skill ?? item.topic}
                </h3>

                {(item.evidence || item.reason) && (
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.evidence ?? item.reason}
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

export default InfoListCard;