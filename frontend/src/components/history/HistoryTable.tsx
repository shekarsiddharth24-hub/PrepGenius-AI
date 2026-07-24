import type { Interview } from "../../types/interview";

import GlassPanel from "../ui/GlassPanel";
import HistoryRow from "./HistoryRow";

interface Props {
  interviews: Interview[];
}

export default function HistoryTable({
  interviews,
}: Props) {
  return (
    <GlassPanel className="group overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">

          <thead>
            <tr className="border-b border-white/10 bg-white/5 backdrop-blur-xl">

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Interview
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Difficulty
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Score
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Status
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Date
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                Actions
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {interviews.map((interview) => (
              <HistoryRow
                key={interview.id}
                interview={interview}
              />
            ))}
          </tbody>

        </table>
      </div>
    </GlassPanel>
  );
}