import { cn } from "../../lib/cn";

/**
 * FilterChip — small toggle button for filtering a list by category.
 * Generic enough to reuse anywhere a multi-select filter row is needed.
 */
export default function FilterChip({ label, icon: Icon, color, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        active ? "border-transparent text-white" : "border-border text-text-secondary hover:text-text-primary hover:bg-surface-raised"
      )}
      style={active ? { backgroundColor: color } : undefined}
    >
      {Icon ? <Icon size={12} /> : null}
      {label}
    </button>
  );
}
