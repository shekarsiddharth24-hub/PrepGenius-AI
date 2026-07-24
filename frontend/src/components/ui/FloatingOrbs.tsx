import { motion } from "framer-motion";

const orbs = [
  {
    size: 18,
    left: "12%",
    top: "18%",
    duration: 18,
    delay: 0,
  },
  {
    size: 26,
    left: "82%",
    top: "12%",
    duration: 22,
    delay: 2,
  },
  {
    size: 14,
    left: "65%",
    top: "72%",
    duration: 20,
    delay: 1,
  },
  {
    size: 20,
    left: "30%",
    top: "82%",
    duration: 24,
    delay: 3,
  },
  {
    size: 16,
    left: "90%",
    top: "58%",
    duration: 21,
    delay: 5,
  },
  {
    size: 12,
    left: "48%",
    top: "28%",
    duration: 19,
    delay: 4,
  },
];

const colors = [
  "bg-cyan-400/10",
  "bg-blue-400/10",
  "bg-violet-400/10",
];

export default function FloatingOrbs() {
  return (
    <>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`
            absolute
            pointer-events-none
            rounded-full
            ${colors[index % colors.length]}
          `}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            filter: "blur(2px)",
            boxShadow: "0 0 30px rgba(139,92,246,.4)",
          }}
          animate={{
            y: [0, -25, 10, 0],
            opacity: [0.25, 0.55, 0.3, 0.25],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </>
  );
}