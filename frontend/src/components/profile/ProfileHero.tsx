import { motion } from "framer-motion";
import { Sparkles, Calendar } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface ProfileHeroProps {
  name: string;
  email: string;
}

export default function ProfileHero({
  name,
  email,
}: ProfileHeroProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <GlassPanel className="group relative overflow-hidden p-8">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Avatar */}
        <motion.div
          whileHover={{
            y: -4,
            scale: 1.04,
          }}
          transition={{ duration: 0.25 }}
          className="
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full

            bg-gradient-to-br
            from-cyan-400
            via-blue-500
            to-violet-600

            text-4xl
            font-bold
            text-white

            shadow-[0_0_40px_rgba(34,211,238,0.35)]
          "
        >
          {initials}
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-3xl font-bold text-white"
        >
          {name}
        </motion.h2>

        {/* Email */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-2 text-slate-300"
        >
          {email}
        </motion.p>

        {/* Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            mt-6
            inline-flex
            items-center
            gap-2

            rounded-full
            border
            border-cyan-400/20

            bg-cyan-500/10

            px-5
            py-2

            text-sm
            font-medium

            text-cyan-300
          "
        >
          <Sparkles size={16} />
          AI Interview Candidate
        </motion.div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Member Since */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Calendar size={16} />
          <span>Member since July 2025</span>
        </div>
      </div>
    </GlassPanel>
  );
}