import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  technicalAverage: number;
  behavioralAverage: number;
}


export default function InterviewTypeChart({
  technicalAverage,
  behavioralAverage,
}: Props) {

  const data = [
    {
      type: "Technical",
      score: technicalAverage,
    },
    {
      type: "Behavioral",
      score: behavioralAverage,
    },
  ];


  return (
    <GlassPanel className="relative overflow-hidden p-6">

      {/* Ambient Glow */}
      <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-6">

          <h2 className="
            bg-gradient-to-r
            from-cyan-300
            via-blue-300
            to-violet-300

            bg-clip-text

            text-2xl
            font-bold
            text-transparent
          ">
            Interview Type Performance
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Compare your technical and behavioral interview scores.
          </p>

        </div>


        {/* Chart */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={data}
              barSize={55}
            >

              <XAxis
                dataKey="type"
                stroke="#94a3b8"
                tick={{
                  fill: "#cbd5e1",
                  fontSize: 14,
                }}
                axisLine={false}
                tickLine={false}
              />


              <Tooltip
                cursor={{
                  fill: "rgba(255,255,255,0.05)",
                }}

                contentStyle={{
                  background:
                    "rgba(15,23,42,0.85)",

                  border:
                    "1px solid rgba(255,255,255,0.1)",

                  borderRadius: "16px",

                  color: "#fff",

                  backdropFilter:
                    "blur(20px)",
                }}

                formatter={(value) =>
                  `${Number(value).toFixed(1)}%`
                }
              />


              <Bar
                dataKey="score"
                radius={[
                  12,
                  12,
                  0,
                  0,
                ]}
              >

                <Cell fill="#22d3ee" />

                <Cell fill="#8b5cf6" />

              </Bar>


            </BarChart>

          </ResponsiveContainer>

        </motion.div>

      </div>

    </GlassPanel>
  );
}