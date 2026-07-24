import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import type { Interview } from "../../types/interview";

import { downloadInterviewPDF } from "../../api/history";
import { downloadBlob } from "../../utils/download";

import ScoreBadge from "../common/ScoreBadge";
import DifficultyBadge from "../common/DifficultyBadge";
import StatusBadge from "../common/StatusBadge";
import InterviewTypeBadge from "../interview/InterviewTypeBadge";

interface Props {
  interview: Interview;
}

export default function HistoryRow({ interview }: Props) {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const blob = await downloadInterviewPDF(interview.id);

      const filename =
        interview.interview_type === "technical"
          ? `${interview.topic}_${interview.difficulty}_Interview_Report.pdf`
          : `Behavioral_${interview.difficulty}_Interview_Report.pdf`;

      downloadBlob(blob, filename);
    } catch (error) {
      console.error(error);
      alert("Failed to download interview report.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.005,
      }}
      transition={{ duration: 0.25 }}
      className="
        group
        border-t
        border-white/10
        transition-all
        duration-300
        hover:bg-white/5
      "
    >
      {/* Interview */}
      <td className="px-6 py-5">
        <div className="space-y-3">
          <InterviewTypeBadge type={interview.interview_type} />

          {interview.topic && (
            <p className="font-semibold text-white">
              {interview.topic}
            </p>
          )}
        </div>
      </td>

      {/* Difficulty */}
      <td className="px-6 py-5">
        <DifficultyBadge difficulty={interview.difficulty} />
      </td>

      {/* Score */}
      <td className="px-6 py-5">
        <ScoreBadge score={interview.overall_score} />
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge status={interview.status} />
      </td>

      {/* Date */}
      <td className="px-6 py-5 text-slate-300">
        {new Date(interview.created_at).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              navigate(`/history/${interview.id}`, {
                state: interview,
              })
            }
            className="
              flex
              items-center
              gap-2

              rounded-xl
              border
              border-cyan-400/20

              bg-cyan-500/10

              px-4
              py-2

              text-cyan-300

              transition-all

              hover:border-cyan-300/40
              hover:bg-cyan-500/20
            "
          >
            <Eye size={16} />
            View
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDownload}
            disabled={downloading}
            className="
              flex
              items-center
              gap-2

              rounded-xl
              border
              border-white/10

              bg-white/5

              px-4
              py-2

              text-slate-300

              transition-all

              hover:border-white/20
              hover:bg-white/10

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Download size={16} />
            {downloading ? "Downloading..." : "Download"}
          </motion.button>

        </div>
      </td>
    </motion.tr>
  );
}