import { motion } from "framer-motion";

const nodes = [
  { x: 8, y: 12 },
  { x: 18, y: 28 },
  { x: 30, y: 18 },
  { x: 42, y: 35 },
  { x: 55, y: 15 },
  { x: 70, y: 28 },
  { x: 85, y: 18 },

  { x: 12, y: 60 },
  { x: 28, y: 52 },
  { x: 44, y: 68 },
  { x: 60, y: 58 },
  { x: 78, y: 65 },

  { x: 18, y: 84 },
  { x: 36, y: 88 },
  { x: 58, y: 82 },
  { x: 82, y: 86 },

  { x: 92, y: 48 },
  { x: 5, y: 45 },
];

const connections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],

  [1, 8],
  [3, 9],
  [5, 10],

  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],

  [8, 13],
  [9, 14],
  [10, 15],

  [6, 16],
  [7, 17],

  [2, 8],
  [4, 10],
];

export default function NeuralNetwork() {
  return (
    <motion.svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      animate={{
        x: [0, 10, -8, 0],
        y: [0, -6, 5, 0],
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >

      {/* Glow Definition */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Connections */}
      {connections.map(([a, b], index) => (
        <line
          key={index}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(99,102,241,.18)"
          strokeWidth=".12"
          strokeLinecap="round"
          filter="url(#glow)"
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, index) => (
  <motion.circle
    key={index}
    cx={node.x}
    cy={node.y}
    initial={{
      r: 0.45,
      opacity: 0.35,
    }}
    animate={{
      r: [0.35, 0.55, 0.35],
      opacity: [0.35, 0.8, 0.35],
    }}
    transition={{
      duration: 5 + (index % 3),
      repeat: Infinity,
      delay: index * 0.2,
      ease: "easeInOut",
    }}
    fill="rgba(137,96,250,0.6)"
  />
))}
    </motion.svg>
  );
}