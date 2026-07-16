import MiniTrend from "../charts/MiniTrend";
import { cn } from "../../lib/cn";
import { useFlashOnChange } from "../../hooks/useFlashOnChange";

/**
 * StatCard — reusable metric display for the right panel.
 * trend: "up" | "down" | undefined
 *
 * Automatically flashes a brief highlight whenever `value` changes (see
 * useFlashOnChange) — this is the visual cue for "this metric just
 * updated," ready for whenever metrics start refreshing live instead of
 * loading once.
 */
export default function StatCard({ label, value, unit, trend, trendValue, icon: Icon }) {
  const flashing = useFlashOnChange(value);

  return (
    <div
      className={cn(
        "glass relative rounded-xl border p-3.5 shadow-lg shadow-black/20 overflow-hidden group hover:border-white/20 transition-colors duration-300",
        flashing ? "border-accent/50 bg-accent-soft" : "border-border bg-surface"
      )}
    >
      <div
        className="absolute -top-8 -right-8 h-20 w-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
      />
      <div className="relative flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-wider text-text-tertiary">{label}</span>
        {Icon ? (
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-white/10 to-white/0 border border-white/10 flex items-center justify-center">
            <Icon size={12} className="text-text-secondary" />
          </div>
        ) : null}
      </div>
      <div className="relative flex items-baseline gap-1.5">
        <span className="font-mono text-xl text-text-primary tabular-nums">{value}</span>
        {unit ? <span className="text-xs text-text-secondary">{unit}</span> : null}
      </div>
      {trend ? (
        <div className="relative mt-1">
          <MiniTrend trend={trend} value={trendValue} />
        </div>
      ) : null}
    </div>
  );
}
