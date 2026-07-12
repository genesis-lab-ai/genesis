import { cn } from "../../lib/cn";

/**
 * SegmentedControl — a row of mutually exclusive options rendered as
 * connected buttons. Used where a slider doesn't fit (discrete named
 * choices rather than a continuous range).
 */
export default function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div>
      {label ? <p className="text-xs text-text-secondary mb-2">{label}</p> : null}
      <div className="inline-flex rounded-lg border border-border bg-surface p-0.5 gap-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
              value === opt.value
                ? "bg-accent-soft text-accent"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-raised"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
