import Badge, { type BadgeTone } from "../ui/Badge";

interface Props {
  score: number;
}

export default function ScoreBadge({ score }: Props) {
  let tone: BadgeTone = "danger";
  if (score >= 80) tone = "success";
  else if (score >= 60) tone = "warning";

  return <Badge tone={tone}>{score.toFixed(1)}%</Badge>;
}
