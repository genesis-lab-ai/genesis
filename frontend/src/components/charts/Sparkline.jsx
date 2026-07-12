import { LineChart, Line, ResponsiveContainer } from "recharts";

/**
 * Sparkline — a minimal, axis-less line chart for compact spaces (badges,
 * card headers, summary rows). Deliberately has none of MetricChart's
 * chrome (grid, axes, tooltip) — if you need those, use MetricChart.
 */
export default function Sparkline({ data, color = "var(--color-accent)", height = 28, width = 64 }) {
  if (!data?.length) return null;

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
