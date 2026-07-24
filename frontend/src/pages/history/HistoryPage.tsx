import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  History,
  SearchX,
  AlertCircle,
} from "lucide-react";

import { getHistory } from "../../api/history";

import HistoryHeader from "../../components/history/HistoryHeader";
import HistoryFilters from "../../components/history/HistoryFilters";
import HistoryTable from "../../components/history/HistoryTable";
import HistoryTableSkeleton from "../../components/history/HistoryTableSkeleton";

import GlassPanel from "../../components/ui/GlassPanel";
import GlassButton from "../../components/ui/GlassButton";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function HistoryPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("newest");

  const [interviewType, setInterviewType] =
    useState<"all" | "technical" | "behavioral">("all");

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const filteredInterviews = useMemo(() => {
    let result = [...data];

    if (search) {
      result = result.filter((item) =>
        (item.topic ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (interviewType !== "all") {
      result = result.filter(
        (item) =>
          item.interview_type === interviewType
      );
    }

    if (difficulty !== "All") {
      result = result.filter(
        (item) =>
          item.difficulty === difficulty
      );
    }

    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        break;

      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );
        break;

      case "highest":
        result.sort(
          (a, b) =>
            b.overall_score - a.overall_score
        );
        break;

      case "lowest":
        result.sort(
          (a, b) =>
            a.overall_score - b.overall_score
        );
        break;
    }

    return result;
  }, [
    data,
    search,
    interviewType,
    difficulty,
    sort,
  ]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <HistoryHeader />

        <HistoryFilters
          search={search}
          difficulty={difficulty}
          sort={sort}
          interviewType={interviewType}
          onSearchChange={setSearch}
          onDifficultyChange={setDifficulty}
          onSortChange={setSort}
          onInterviewTypeChange={setInterviewType}
        />

        <HistoryTableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <GlassPanel className="mx-auto max-w-7xl p-10">
        <div className="flex flex-col items-center text-center">
          <AlertCircle
            size={56}
            className="text-red-400"
          />

          <h2 className="mt-5 text-2xl font-bold text-white">
            Failed to Load History
          </h2>

          <p className="mt-2 text-slate-400">
            Something went wrong while loading
            your interview history.
          </p>
        </div>
      </GlassPanel>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl space-y-8"
    >
      <motion.div variants={item}>
        <HistoryHeader />
      </motion.div>

      <motion.div variants={item}>
        <HistoryFilters
          search={search}
          difficulty={difficulty}
          sort={sort}
          interviewType={interviewType}
          onSearchChange={setSearch}
          onDifficultyChange={setDifficulty}
          onSortChange={setSort}
          onInterviewTypeChange={setInterviewType}
        />
      </motion.div>

      {data.length === 0 ? (
        <motion.div variants={item}>
          <GlassPanel className="py-16">
            <div className="flex flex-col items-center text-center">

              <History
                size={64}
                className="text-cyan-400"
              />

              <h2 className="mt-6 text-3xl font-bold text-white">
                No Interviews Yet
              </h2>

              <p className="mt-3 max-w-md text-slate-400">
                Complete your first AI interview to
                unlock analytics, progress tracking,
                and personalized feedback.
              </p>

              <GlassButton
                className="mt-8"
                onClick={() =>
                  navigate("/interview")
                }
              >
                Start Your First Interview
              </GlassButton>
            </div>
          </GlassPanel>
        </motion.div>
      ) : filteredInterviews.length === 0 ? (
        <motion.div variants={item}>
          <GlassPanel className="py-16">
            <div className="flex flex-col items-center text-center">

              <SearchX
                size={60}
                className="text-yellow-400"
              />

              <h2 className="mt-6 text-3xl font-bold text-white">
                No Matching Interviews
              </h2>

              <p className="mt-3 text-slate-400">
                Try adjusting your search or
                filters to find interviews.
              </p>
            </div>
          </GlassPanel>
        </motion.div>
      ) : (
        <motion.div variants={item}>
          <HistoryTable
            interviews={
              filteredInterviews as React.ComponentProps<
                typeof HistoryTable
              >["interviews"]
            }
          />
        </motion.div>
      )}
    </motion.div>
  );
}