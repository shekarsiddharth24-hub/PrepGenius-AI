import { useMemo } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import GlassPanel from "../ui/GlassPanel";

import type { Interview } from "../../types/interview";

interface Props {
  interviews: Interview[];
}

export default function PerformanceChart({
  interviews,
}: Props) {
  const chartData = useMemo(() => {
    return [...interviews]
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      )
      .map((item) => ({
        date: new Date(
          item.created_at
        ).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        }),
        score: Number(
          item.overall_score.toFixed(1)
        ),
      }));
  }, [interviews]);

  if (interviews.length < 2) {
    return (
      <GlassPanel className="p-10 text-center">
        <h2 className="text-xl font-semibold text-white">
          Performance Trend
        </h2>

        <p className="mt-3 text-white/50">
          Complete at least two interviews to
          visualize your progress.
        </p>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Performance Trend
      </h2>

      <div className="h-80 rounded-xl bg-white/[0.02] p-2">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.5)"
            />

            <YAxis
              domain={[0, 100]}
              stroke="rgba(255,255,255,0.5)"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
}