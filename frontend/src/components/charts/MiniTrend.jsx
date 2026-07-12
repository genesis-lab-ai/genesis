import { cn } from "../../lib/cn";

/**
 * MiniTrend — a small "▲ 0.4%" style indicator. Extracted from what used
 * to be inline markup duplicated in StatCard; now shared by StatCard,
 * MetricBadge, and LineChartCard so trend styling only lives in one place.
 */
export default function MiniTrend({ trend, value, size = "sm" }) {
  if (!trend) return null;

  return (
    <span
      className={cn(
        "font-mono inline-flex items-center gap-0.5",
        size === "sm" ? "text-[11px]" : "text-xs",
        trend === "up" ? "text-positive" : trend === "down" ? "text-negative" : "text-text-tertiary"
      )}
    >
      {trend === "up" ? "▲" : trend === "down" ? "▼" : "–"} {value}
    </span>
  );
}
