import { motion, type Variants } from "framer-motion";

import {
  BarChart3,
  BookOpen,
  Brain,
  MessageSquare,
  Star,
  Target,
  Trophy,
  ClipboardList,
} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

import type { Analytics } from "../../types/dashboard";

interface Props {
  analytics: Analytics;
}


const container: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};


const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};


export default function AnalyticsGrid({
  analytics,
}: Props) {

  const cards = [
    {
      title: "Total Interviews",
      value: analytics.total_interviews,
      subtitle: "Completed Interviews",
      icon: ClipboardList,
    },

    {
      title: "Average Score",
      value: `${analytics.average_score.toFixed(1)}%`,
      subtitle: "Overall Performance",
      icon: Star,
    },

    {
      title: "Best Score",
      value: `${analytics.best_score.toFixed(1)}%`,
      subtitle: "Personal Best",
      icon: Trophy,
    },

    {
      title: "Best Topic",
      value: analytics.best_topic || "-",
      subtitle: "Strongest Area",
      icon: Target,
    },

    {
      title: "Weakest Topic",
      value: analytics.weakest_topic || "-",
      subtitle: "Needs Improvement",
      icon: BookOpen,
    },

    {
      title: "Semantic Avg",
      value: `${analytics.average_semantic.toFixed(1)}%`,
      subtitle: "Understanding",
      icon: Brain,
    },

    {
      title: "Technical Avg",
      value: `${analytics.average_technical.toFixed(1)}%`,
      subtitle: "Technical Knowledge",
      icon: BarChart3,
    },

    {
      title: "Communication Avg",
      value: `${analytics.average_communication.toFixed(1)}%`,
      subtitle: "Communication Skills",
      icon: MessageSquare,
    },
  ];


  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"

      className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      {cards.map((card) => (
        <motion.div
          key={card.title}
          variants={item}
        >
          <AnalyticsCard
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
          />
        </motion.div>
      ))}

    </motion.div>
  );
}