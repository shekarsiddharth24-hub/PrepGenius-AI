import GlassPanel from "../ui/GlassPanel";

export default function HistoryTableSkeleton() {
  return (
    <GlassPanel className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              {[
                "Interview",
                "Difficulty",
                "Score",
                "Status",
                "Date",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="
                    px-6
                    py-5
                    text-left
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-300
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {Array.from({ length: 5 }).map((_, row) => (
              <tr
                key={row}
                className="transition-colors hover:bg-white/5"
              >
                {Array.from({ length: 6 }).map((_, cell) => (
                  <td key={cell} className="px-6 py-5">
                    <div
                      className="
                        h-4
                        w-full
                        animate-pulse
                        rounded-full

                        bg-gradient-to-r
                        from-white/5
                        via-white/10
                        to-white/5
                      "
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </GlassPanel>
  );
}