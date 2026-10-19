import Badge, { type BadgeTone } from "../ui/Badge";

interface Props {
  difficulty: string;
}

export default function DifficultyBadge({ difficulty }: Props) {
  let tone: BadgeTone = "neutral";

  switch (difficulty.toLowerCase()) {
    case "easy":
      tone = "success";
      break;
    case "medium":
      tone = "warning";
      break;
    case "hard":
      tone = "danger";
      break;
  }

  return (
    <Badge tone={tone} uppercase>
      {difficulty}
    </Badge>
  );
}
