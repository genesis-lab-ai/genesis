import { cn } from "../../lib/cn";

/**
 * Toggle — an on/off switch. Uses role="switch" + aria-checked so it
 * behaves correctly for assistive tech, not just visually.
 */
export default function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs text-text-primary">{label}</p>
        {description ? <p className="text-[11px] text-text-tertiary mt-0.5">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          checked ? "bg-accent" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 shadow-sm",
            checked && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}
