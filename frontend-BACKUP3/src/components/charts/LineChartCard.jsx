import ChartCard from "../ui/ChartCard";
import MetricChart from "./MetricChart";
import MiniTrend from "./MiniTrend";

/**
 * LineChartCard — the standard "metric over time" card used across
 * Statistics (and reusable anywhere else a metric history needs
 * showing). Composes the existing ChartCard shell with MetricChart, so
 * neither has to know about the other's implementation.
 */
export default function LineChartCard({
  title,
  subtitle,
  data,
  color,
  unit = "",
  variant = "area",
  latestValue,
  trend,
  trendValue,
}) {
  return (
    <ChartCard
      title={title}
      subtitle={subtitle}
      accentColor={color}
      actions={
        latestValue !== undefined ? (
          <div className="text-right">
            <div className="font-mono text-sm text-text-primary tabular-nums">{latestValue}</div>
            <MiniTrend trend={trend} value={trendValue} />
          </div>
        ) : null
      }
    >
      <MetricChart data={data} color={color} unit={unit} variant={variant} />
    </ChartCard>
  );
}
