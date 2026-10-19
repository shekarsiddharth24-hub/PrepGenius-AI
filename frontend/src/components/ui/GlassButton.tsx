import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const buttonStyles = cva(
  `
  inline-flex items-center justify-center gap-2
  rounded-xl border font-medium
  shadow-lg transition-all
  disabled:cursor-not-allowed disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary:
          "border-white/10 bg-gradient-to-r from-blue-500/70 to-violet-600/70 text-white hover:shadow-blue-500/20",
        secondary:
          "border-white/10 bg-white/5 text-slate-100 backdrop-blur-xl hover:border-accent-400/30 hover:bg-white/10",
        ghost:
          "border-transparent bg-transparent text-slate-300 hover:bg-white/5 hover:text-white shadow-none",
        danger:
          "border-danger-400/20 bg-danger-500/10 text-danger-300 hover:bg-danger-500/20 hover:shadow-danger-500/20",
      },
      size: {
        sm: "px-3.5 py-1.5 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface GlassButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
}

export default function GlassButton({
  children,
  className,
  variant,
  size,
  ...props
}: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
