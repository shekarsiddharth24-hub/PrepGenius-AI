import { motion } from "framer-motion";
import FloatingOrbs from "./FloatingOrbs";
import NeuralNetwork from "./NeuralNetwork";

interface AuroraBackgroundProps {
  children: React.ReactNode;
}

export default function AuroraBackground({
  children,
}: AuroraBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">
      {/* Aurora Layer */}

      <motion.div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/25 blur-[120px]"
        animate={{
          x: [0, 120, -80, 0],
          y: [0, 80, -60, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-20 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{
          x: [0, -100, 60, 0],
          y: [0, -60, 90, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[120px]"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -70, 40, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Neural Network */}
      <div className="absolute inset-0 z-[1] opacity-10">
        <NeuralNetwork />
      </div>

      {/* Floating AI Orbs */}
      <div className="absolute inset-0 z-[2]">
        <FloatingOrbs />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}