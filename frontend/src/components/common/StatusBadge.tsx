import { CheckCircle, Clock, XCircle } from "lucide-react";

import Badge, { type BadgeTone } from "../ui/Badge";

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  let Icon = CheckCircle;
  let tone: BadgeTone = "success";

  switch (status.toLowerCase()) {
    case "pending":
      Icon = Clock;
      tone = "warning";
      break;

    case "failed":
    case "error":
      Icon = XCircle;
      tone = "danger";
      break;

    case "completed":
    default:
      Icon = CheckCircle;
      tone = "success";
      break;
  }

  return (
    <Badge tone={tone} uppercase icon={<Icon size={15} />}>
      {status}
    </Badge>
  );
}
