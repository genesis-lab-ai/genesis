import { cn } from "../../lib/cn";

const VARIANTS = {
  primary:
    "bg-gradient-to-br from-[#FB7185] to-[#E11D48] text-white shadow-[0_4px_20px_-4px_rgba(225,29,72,0.55)] hover:shadow-[0_6px_28px_-4px_rgba(225,29,72,0.7)] hover:brightness-105 active:brightness-95",
  secondary:
    "glass bg-surface-raised text-text-primary border border-border hover:border-text-tertiary",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-raised",
  danger:
    "bg-transparent text-negative border border-negative/40 hover:bg-negative/10",
};

const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  icon: "h-9 w-9",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  rounded = "rounded-md",
  className,
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-150 active:scale-[0.97]",
        rounded,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        "disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="shrink-0" size={16} /> : null}
      {children}
    </button>
  );
}
