import {
  Search,
  Filter,
  ArrowUpDown,
  BrainCircuit,
} from "lucide-react";

import GlassPanel from "../ui/GlassPanel";

interface Props {
  search: string;
  difficulty: string;
  sort: string;
  interviewType: "all" | "technical" | "behavioral";

  onSearchChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onInterviewTypeChange: (
    value: "all" | "technical" | "behavioral"
  ) => void;
}

export default function HistoryFilters({
  search,
  difficulty,
  sort,
  interviewType,
  onSearchChange,
  onDifficultyChange,
  onSortChange,
  onInterviewTypeChange,
}: Props) {
  return (
    <GlassPanel className="group p-5">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}

        <div className="relative w-full lg:max-w-sm">

          <Search
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search by topic..."
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              py-3
              pl-11
              pr-4

              text-white
              placeholder:text-slate-500

              backdrop-blur-xl

              outline-none

              transition-all
              duration-300

              focus:border-cyan-400/40
              focus:bg-white/10
              focus:ring-2
              focus:ring-cyan-500/20
            "
          />
        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3">

          {/* Interview Type */}

          <div className="relative">

            <BrainCircuit
              size={16}
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-cyan-300
              "
            />

            <select
              value={interviewType}
              onChange={(e) =>
                onInterviewTypeChange(
                  e.target.value as
                    | "all"
                    | "technical"
                    | "behavioral"
                )
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                py-3
                pl-10
                pr-8

                text-white

                backdrop-blur-xl

                outline-none

                transition-all
                duration-300

                focus:border-cyan-400/40
                focus:ring-2
                focus:ring-cyan-500/20
              "
            >
              <option className="bg-slate-900" value="all">
                All Interviews
              </option>

              <option className="bg-slate-900" value="technical">
                Technical
              </option>

              <option className="bg-slate-900" value="behavioral">
                Behavioral
              </option>
            </select>

          </div>

          {/* Difficulty */}

          <div className="relative">

            <Filter
              size={16}
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-cyan-300
              "
            />

            <select
              value={difficulty}
              onChange={(e) =>
                onDifficultyChange(e.target.value)
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                py-3
                pl-10
                pr-8

                text-white

                backdrop-blur-xl

                outline-none

                transition-all
                duration-300

                focus:border-cyan-400/40
                focus:ring-2
                focus:ring-cyan-500/20
              "
            >
              <option className="bg-slate-900" value="All">
                All Difficulties
              </option>

              <option className="bg-slate-900" value="Easy">
                Easy
              </option>

              <option className="bg-slate-900" value="Medium">
                Medium
              </option>

              <option className="bg-slate-900" value="Hard">
                Hard
              </option>
            </select>

          </div>

          {/* Sort */}

          <div className="relative">

            <ArrowUpDown
              size={16}
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-cyan-300
              "
            />

            <select
              value={sort}
              onChange={(e) =>
                onSortChange(e.target.value)
              }
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                py-3
                pl-10
                pr-8

                text-white

                backdrop-blur-xl

                outline-none

                transition-all
                duration-300

                focus:border-cyan-400/40
                focus:ring-2
                focus:ring-cyan-500/20
              "
            >
              <option className="bg-slate-900" value="newest">
                Newest First
              </option>

              <option className="bg-slate-900" value="oldest">
                Oldest First
              </option>

              <option className="bg-slate-900" value="highest">
                Highest Score
              </option>

              <option className="bg-slate-900" value="lowest">
                Lowest Score
              </option>
            </select>

          </div>

        </div>

      </div>

    </GlassPanel>
  );
}