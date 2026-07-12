import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function GenesisTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-surface-raised px-2.5 py-1.5 text-xs shadow-xl">
      <p className="text-text-tertiary font-mono text-[10px]">tick {label}</p>
      <p className="text-text-primary font-mono">
        {payload[0].value.toLocaleString()} {unit}
      </p>
    </div>
  );
}

export default function TimeSeriesChart({ data, color = "var(--color-data)", unit = "" }) {
  const gradientId = `grad-${color.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--color-border-soft)" vertical={false} />
        <XAxis
          dataKey="tick"
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<GenesisTooltip unit={unit} />} cursor={{ stroke: "var(--color-border)" }} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.75}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
