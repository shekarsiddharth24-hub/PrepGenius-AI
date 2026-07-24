import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
}

export default function GlassButton({
  children,
  className,
  ...props
}: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        `
        rounded-xl
        border border-white/10
        bg-gradient-to-r
        from-blue-500/70
        to-violet-600/70
        px-6
        py-3
        font-medium
        text-white
        shadow-lg
        transition-all
        hover:shadow-blue-500/20
        disabled:opacity-50
        disabled:cursor-not-allowed
        `,
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}