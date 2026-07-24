import { BarChart3 } from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

export default function DashboardHeader() {
  return (
    <GlassPanel className="mb-8 p-6">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-white/60">
            Track your interview performance, monitor your progress, and
            identify areas where you can improve.
          </p>
        </div>


        <div className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-white/10
          backdrop-blur-md
        ">

          <BarChart3
            size={32}
            className="text-cyan-300"
          />

        </div>

      </div>

    </GlassPanel>
  );
}