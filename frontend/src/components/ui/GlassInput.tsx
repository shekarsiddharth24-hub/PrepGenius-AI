import clsx from "clsx";

type GlassInputProps =
  React.InputHTMLAttributes<HTMLInputElement>;

export default function GlassInput({
  className,
  ...props
}: GlassInputProps) {
  return (
    <input
      {...props}
      className={clsx(
        `
        w-full
        rounded-xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        px-4
        py-3
        text-white

        placeholder:text-white/40

        outline-none

        transition-all

        focus:border-cyan-400
        focus:ring-2
        focus:ring-cyan-400/20
        `,
        className
      )}
    />
  );
}