import { motion } from "framer-motion";

/**
 * Brain silhouette — real anatomical line-art paths (two hemispheres,
 * gyri folds, brainstem), sourced from Lucide's "brain" icon geometry
 * in its native 24x24 coordinate space. This is what makes the shape
 * actually read as a brain instead of an abstract blob.
 */
const brainStrokes = [
  "M12 18V5",
  "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",
  "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",
  "M17.997 5.125a4 4 0 0 1 2.526 5.77",
  "M18 18a4 4 0 0 0 2-7.464",
  "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",
  "M6 18a4 4 0 0 1-2-7.464",
  "M6.003 5.125a4 4 0 0 0-2.526 5.77",
];

/** Neural-network nodes placed to follow the two hemispheres + stem
 * of the brain shape above (same 24x24 coordinate space). */
const innerNodes = [
  // left hemisphere
  { x: 6, y: 5 }, { x: 8.5, y: 4.2 }, { x: 4.3, y: 8 }, { x: 7.5, y: 8 },
  { x: 5.5, y: 11.5 }, { x: 8.8, y: 11.3 }, { x: 4.5, y: 14.5 }, { x: 7.7, y: 14.3 },
  { x: 5.8, y: 17.3 }, { x: 8, y: 17.6 }, { x: 6.8, y: 19.5 },
  // right hemisphere (mirrored)
  { x: 18, y: 5 }, { x: 15.5, y: 4.2 }, { x: 19.7, y: 8 }, { x: 16.5, y: 8 },
  { x: 18.5, y: 11.5 }, { x: 15.2, y: 11.3 }, { x: 19.5, y: 14.5 }, { x: 16.3, y: 14.3 },
  { x: 18.2, y: 17.3 }, { x: 16, y: 17.6 }, { x: 17.2, y: 19.5 },
  // brainstem
  { x: 12, y: 6.5 }, { x: 12, y: 10.5 }, { x: 12, y: 14 }, { x: 12, y: 17.5 },
];

const innerConnections: [number, number][] = [
  // left hemisphere
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6],
  [5, 7], [6, 7], [6, 8], [7, 9], [8, 9], [8, 10], [9, 10],
  // right hemisphere
  [11, 12], [11, 13], [12, 14], [13, 14], [13, 15], [14, 16], [15, 16], [15, 17],
  [16, 18], [17, 18], [17, 19], [18, 20], [19, 20], [19, 21], [20, 21],
  // brainstem
  [22, 23], [23, 24], [24, 25],
  // corpus-callosum-ish cross links tying hemispheres to the stem
  [1, 12], [3, 22], [14, 22], [5, 23], [16, 23], [7, 24], [18, 24],
  [9, 25], [20, 25], [10, 25], [21, 25],
];

/** Outer nodes drift freely just outside the skull outline, tethered
 * back into the network — the "network extending beyond the brain". */
const outerNodes = [
  { x: -3, y: 6, tether: 2 },
  { x: -4, y: 14, tether: 6 },
  { x: -2, y: 20.5, tether: 8 },
  { x: 27, y: 6, tether: 13 },
  { x: 28, y: 14, tether: 17 },
  { x: 26, y: 20.5, tether: 19 },
  { x: 12, y: -4, tether: 22 },
  { x: 12, y: 25, tether: 25 },
];

export default function FloatingBrain() {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ top: "6%", right: "-2%", width: 480, height: 480 }}
      animate={{
        y: [0, -20, 8, 0],
        x: [0, 10, -8, 0],
        rotate: [0, 1.2, -0.8, 0],
      }}
      transition={{
        duration: 26,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="-6 -6 36 36"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brainStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="brainFill" cx="45%" cy="42%" r="65%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>

          <filter id="brainGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="0.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="0.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient glow behind the whole shape */}
        <ellipse cx="12" cy="12" rx="17" ry="15" fill="url(#brainFill)" />

        {/* Real brain silhouette — hemispheres, gyri folds, brainstem */}
        <g
          fill="none"
          stroke="url(#brainStroke)"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#brainGlow)"
        >
          {brainStrokes.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.75 }}
              transition={{
                duration: 1.8,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Inner neural-network connections, following the folds */}
        {innerConnections.map(([a, b], i) => (
          <motion.line
            key={`c-${i}`}
            x1={innerNodes[a].x}
            y1={innerNodes[a].y}
            x2={innerNodes[b].x}
            y2={innerNodes[b].y}
            stroke="rgba(139,92,246,0.35)"
            strokeWidth="0.09"
            strokeLinecap="round"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: (i % 7) * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Tethers from outer nodes into the network */}
        {outerNodes.map((n, i) => (
          <line
            key={`t-${i}`}
            x1={n.x}
            y1={n.y}
            x2={innerNodes[n.tether].x}
            y2={innerNodes[n.tether].y}
            stroke="rgba(34,211,238,0.22)"
            strokeWidth="0.07"
            strokeDasharray="0.3 0.5"
          />
        ))}

        {/* Inner nodes — synapses */}
        {innerNodes.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={0.22}
            fill={i % 3 === 0 ? "#67e8f9" : "#c4b5fd"}
            filter="url(#nodeGlow)"
            initial={{ opacity: 0.4, scale: 0.8 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.4, 0.8] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: (i % 6) * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Outer floating nodes */}
        {outerNodes.map((n, i) => (
          <motion.circle
            key={`o-${i}`}
            cx={n.x}
            cy={n.y}
            r={0.28}
            fill="#22d3ee"
            filter="url(#nodeGlow)"
            animate={{
              cx: [n.x, n.x + 0.8, n.x - 0.6, n.x],
              cy: [n.y, n.y - 1, n.y + 0.7, n.y],
              opacity: [0.4, 0.85, 0.4],
            }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
