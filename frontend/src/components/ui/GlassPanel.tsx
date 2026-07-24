import type { ReactNode } from "react";

import GlassCard from "./GlassCard";
import GlassTiltCard from "./GlassTiltCard";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({
  children,
  className = "",
}: GlassPanelProps) {
  return (
    <GlassTiltCard>
      <GlassCard className={className}>
        {children}
      </GlassCard>
    </GlassTiltCard>
  );
}