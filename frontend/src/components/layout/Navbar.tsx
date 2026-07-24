import { motion } from "framer-motion";

import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="
        sticky
        top-0
        z-30

        flex
        h-20
        items-center
        justify-between

        border-b
        border-white/10

        bg-white/5
        backdrop-blur-2xl

        px-8

        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
      "
    >
      {/* Left */}
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          Welcome,{" "}
          <span
            className="
              bg-gradient-to-r
              from-cyan-300
              via-blue-300
              to-indigo-400
              bg-clip-text
              text-transparent
            "
          >
            {user?.name}
          </span>{" "}
          👋
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-1 text-sm text-slate-400"
        >
          Ready for your next interview?
        </motion.p>
      </div>

      {/* Right */}
      <motion.div
        whileHover={{
          y: -2,
          scale: 1.02,
        }}
        transition={{ duration: 0.2 }}
        className="
          flex
          items-center
          gap-4

          rounded-2xl

          border
          border-white/10

          bg-white/5

          px-4
          py-2

          backdrop-blur-xl
        "
      >
        {/* Avatar */}
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full

            bg-gradient-to-br
            from-cyan-400
            via-blue-500
            to-indigo-600

            text-sm
            font-bold
            text-white

            shadow-lg
          "
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-medium text-white">
            {user?.name}
          </p>

          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
              "
            />

            <span className="text-xs text-slate-400">
              Online
            </span>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}