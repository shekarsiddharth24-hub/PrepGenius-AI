import { motion, type Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "../../api/dashboard";
import { getHistory } from "../../api/history";

import GlassPanel from "../../components/ui/GlassPanel";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import AnalyticsGrid from "../../components/dashboard/AnalyticsGrid";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import PerformanceChart from "../../components/dashboard/PerformanceChart";
import TopicPerformanceChart from "../../components/dashboard/TopicPerformanceChart";
import InterviewTypeAnalytics from "../../components/dashboard/InterviewTypeAnalytics";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function DashboardPage() {
  const analyticsQuery = useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: getAnalytics,
  });

  const historyQuery = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  if (analyticsQuery.isLoading || historyQuery.isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardHeader />
        <DashboardSkeleton />
      </div>
    );
  }

  if (
    analyticsQuery.isError ||
    historyQuery.isError ||
    !analyticsQuery.data
  ) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardHeader />

        <GlassPanel className="p-6">
          <p className="text-red-400">
            Failed to load dashboard analytics.
          </p>
        </GlassPanel>
      </div>
    );
  }

  const analytics = analyticsQuery.data;

  const history = (historyQuery.data ?? []) as Parameters<
    typeof PerformanceChart
  >[0]["interviews"];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-7xl space-y-10"
    >
      <motion.div variants={item}>
        <DashboardHeader />
      </motion.div>

      <motion.div variants={item}>
        <AnalyticsGrid analytics={analytics} />
      </motion.div>

      <motion.div variants={item}>
        <InterviewTypeAnalytics
          technicalInterviews={analytics.technical_interviews}
          behavioralInterviews={analytics.behavioral_interviews}
          technicalAverage={analytics.technical_average_score}
          behavioralAverage={analytics.behavioral_average_score}
        />
      </motion.div>

      <motion.div variants={item}>
        <PerformanceChart interviews={history} />
      </motion.div>

      <motion.div variants={item}>
        <TopicPerformanceChart
          topicScores={analytics.topic_scores}
          bestTopic={analytics.best_topic}
          weakestTopic={analytics.weakest_topic}
        />
      </motion.div>
    </motion.div>
  );
}