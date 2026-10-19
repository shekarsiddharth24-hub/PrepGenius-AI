import { motion } from "framer-motion";
import FloatingOrbs from "./FloatingOrbs";
import NeuralNetwork from "./NeuralNetwork";
import FloatingBrain from "./FloatingBrain";

interface AuroraBackgroundProps {
  children: React.ReactNode;
}

export default function AuroraBackground({
  children,
}: AuroraBackgroundProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">
      {/* Base mesh — static, gives the canvas a dimensional gradient
          before any animated blobs are layered on top */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 15% 0%, rgba(99,102,241,0.10) 0%, transparent 55%)," +
            "radial-gradient(100% 70% at 100% 10%, rgba(34,211,238,0.08) 0%, transparent 55%)," +
            "radial-gradient(90% 60% at 50% 100%, rgba(139,92,246,0.10) 0%, transparent 60%)",
        }}
      />

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

      {/* Slow-drifting accent blob — extra layer of depth so the
          canvas doesn't read as three fixed spotlights */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[140px]"
        animate={{
          scale: [1, 1.25, 0.9, 1],
          opacity: [0.5, 0.8, 0.4, 0.5],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Neural Network (ambient full-canvas mesh, very faint) */}
      <div className="absolute inset-0 z-[1] opacity-[0.15]">
        <NeuralNetwork />
      </div>

      {/* Floating Brain — the hero neural motif, present on every page */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        <FloatingBrain />
      </div>

      {/* Floating AI Orbs */}
      <div className="absolute inset-0 z-[2]">
        <FloatingOrbs />
      </div>

      {/* Film grain — breaks up gradient banding on the large blurred
          fields above so they read as textured, not flat/plasticky */}
      <div className="bg-noise pointer-events-none absolute inset-0 z-[3] opacity-[0.035] mix-blend-overlay" />

      {/* Vignette — pulls focus back to the center content and gives
          the canvas an edge instead of an abrupt cutoff */}
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{
          boxShadow: "inset 0 0 220px 40px rgba(0,0,0,0.55)",
        }}
      />

      {/* Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
