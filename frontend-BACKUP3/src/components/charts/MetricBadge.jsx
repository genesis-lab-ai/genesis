import MiniTrend from "./MiniTrend";

/**
 * MetricBadge — a compact icon + label + value pill, for summary rows at
 * the top of a page (see SummaryHeader). Distinct from StatCard, which is
 * a full card for grid layouts — this is for a single-line overview strip.
 */
export default function MetricBadge({ icon: Icon, label, value, trend, trendValue }) {
  return (
    <div className="glass flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
      {Icon ? <Icon size={13} className="text-text-tertiary shrink-0" /> : null}
      <span className="text-[11px] text-text-tertiary">{label}</span>
      <span className="font-mono text-xs text-text-primary tabular-nums">{value}</span>
      <MiniTrend trend={trend} value={trendValue} />
    </div>
  );
}
