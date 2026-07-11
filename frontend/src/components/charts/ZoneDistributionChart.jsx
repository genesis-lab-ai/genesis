import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ZONE_LABELS } from "../../mock/city";

const ZONE_COLOR_VAR = {
  residential: "var(--color-zone-residential)",
  commercial: "var(--color-zone-commercial)",
  industrial: "var(--color-zone-industrial)",
  park: "var(--color-zone-park)",
  mixed: "var(--color-zone-mixed)",
  road: "var(--color-zone-road)",
};

function DistTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border border-border bg-surface-raised px-2.5 py-1.5 text-xs shadow-xl">
      <p className="text-text-primary">{ZONE_LABELS[d.type]}</p>
      <p className="text-text-tertiary font-mono text-[10px]">{d.count} zones</p>
    </div>
  );
}

export default function ZoneDistributionChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <XAxis
          dataKey="type"
          tickFormatter={(t) => ZONE_LABELS[t]?.slice(0, 4) ?? t}
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--color-text-tertiary)", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip content={<DistTooltip />} cursor={{ fill: "var(--color-border-soft)" }} />
        <Bar dataKey="count" radius={[3, 3, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.type} fill={ZONE_COLOR_VAR[entry.type]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
