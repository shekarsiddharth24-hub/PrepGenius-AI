import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

import GlassCard from "../ui/GlassCard";
import GlassPanel from "../ui/GlassPanel";

import type { TopicScore } from "../../types/dashboard";

interface Props {
  topicScores: TopicScore[];
  bestTopic: string | null;
  weakestTopic: string | null;
}


export default function TopicPerformanceChart({
  topicScores,
  bestTopic,
  weakestTopic,
}: Props) {


  if (topicScores.length === 0) {
    return (
      <GlassPanel className="p-10 text-center">

        <h2 className="text-xl font-semibold text-white">
          Topic Performance
        </h2>

        <p className="mt-3 text-white/50">
          Complete interviews to compare your performance across topics.
        </p>

      </GlassPanel>
    );
  }


  const strongest = topicScores.find(
    (topic) => topic.topic === bestTopic
  );


  const weakest = topicScores.find(
    (topic) => topic.topic === weakestTopic
  );


  return (
    <GlassPanel className="p-6">


      <h2 className="mb-6 text-xl font-semibold text-white">
        Topic Performance
      </h2>



      {/* Radar Chart */}

      <div className="h-96 rounded-xl bg-white/[0.02] p-2">

        <ResponsiveContainer width="100%" height="100%">

          <RadarChart
            data={topicScores}
            cx="50%"
            cy="50%"
            outerRadius="80%"
          >


            <PolarGrid
              stroke="rgba(255,255,255,0.15)"
            />


            <PolarAngleAxis
              dataKey="topic"
              tick={{
                fill: "rgba(255,255,255,0.7)",
                fontSize: 12,
              }}
            />


            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{
                fill: "rgba(255,255,255,0.4)",
                fontSize: 10,
              }}
            />


            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(1)}%`,
                "Average Score",
              ]}
            />


            <Radar

              name="Performance"

              dataKey="score"

              stroke="#8b5cf6"

              fill="#8b5cf6"

              fillOpacity={0.35}

              strokeWidth={3}

            />


          </RadarChart>

        </ResponsiveContainer>

      </div>



      {/* Legend */}

      <div className="mt-6 flex justify-center text-sm text-white/70">

        <div className="flex items-center gap-2">

          <span className="h-3 w-3 rounded-full bg-purple-500" />

          <span>
            AI Skill Coverage Across Topics
          </span>

        </div>

      </div>



      {/* Insights */}

      <div className="mt-6 grid gap-4 md:grid-cols-2">



        <GlassCard className="p-4">


          <p className="text-sm font-semibold text-green-300">
            🏆 Strongest Topic
          </p>


          <p className="mt-2 text-lg font-bold text-white">
            {strongest?.topic ?? "N/A"}
          </p>


          <p className="text-white/60">
            {strongest?.score ?? 0}%
          </p>


        </GlassCard>




        <GlassCard className="p-4">


          <p className="text-sm font-semibold text-yellow-300">
            📚 Needs More Practice
          </p>


          <p className="mt-2 text-lg font-bold text-white">
            {weakest?.topic ?? "N/A"}
          </p>


          <p className="text-white/60">
            {weakest?.score ?? 0}%
          </p>


        </GlassCard>



      </div>



    </GlassPanel>
  );
}