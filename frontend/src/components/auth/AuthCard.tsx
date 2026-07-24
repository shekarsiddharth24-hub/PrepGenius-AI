import type { ReactNode } from "react";
import { Brain, Sparkles } from "lucide-react";

import GlassCard from "../ui/GlassCard";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <GlassCard
      className="
        w-full
        max-w-md
        p-8
      "
    >

      <div className="mb-8 text-center">

        {/* AI Logo */}
        <div className="mb-6 flex justify-center">
          <div
            className="
              relative
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/20
              bg-gradient-to-br
              from-cyan-500/20
              via-blue-500/20
              to-purple-500/20
              backdrop-blur-xl
              shadow-lg
              shadow-cyan-500/20
            "
          >

            <Brain
              className="
                h-10
                w-10
                text-cyan-300
              "
            />

            <Sparkles
              className="
                absolute
                -right-1
                -top-1
                h-5
                w-5
                text-yellow-300
              "
            />


            {/* Logo Glow */}
            <div
              className="
                absolute
                inset-0
                -z-10
                rounded-2xl
                bg-cyan-400/20
                blur-xl
              "
            />

          </div>
        </div>


        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-white
          "
        >
          {title}
        </h1>


        <p
          className="
            mt-2
            text-white/60
          "
        >
          {subtitle}
        </p>

      </div>


      {children}

    </GlassCard>
  );
}