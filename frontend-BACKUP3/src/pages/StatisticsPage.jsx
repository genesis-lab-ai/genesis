import { useMemo } from "react";
import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineFaceSmile,
  HiOutlineCloud,
  HiOutlineTruck,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import LineChartCard from "../components/charts/LineChartCard";
import MetricBadge from "../components/charts/MetricBadge";
import SummaryHeader from "../components/ui/SummaryHeader";
import ChartCard from "../components/ui/ChartCard";
import ZoneDistributionChart from "../components/charts/ZoneDistributionChart";
import { generateTimeSeries, METRIC_DEFS, zoneDistribution } from "../mock/metrics";
import { generateCity } from "../mock/city";
import { useSimulationContext } from "../lib/simulationContext";

// Order controls both the badge row and the chart grid below.
const METRIC_KEYS = ["population", "employment", "happiness", "pollution", "traffic", "landValue"];

const METRIC_ICONS = {
  population: HiOutlineUsers,
  employment: HiOutlineBriefcase,
  happiness: HiOutlineFaceSmile,
  pollution: HiOutlineCloud,
  traffic: HiOutlineTruck,
  landValue: HiOutlineHomeModern,
};

export default function StatisticsPage() {
  const sim = useSimulationContext();
  const city = useMemo(() => generateCity(20, 42), []);
  const ticksToShow = Math.max(20, sim.tick);

  const series = useMemo(() => {
    const out = {};
    METRIC_KEYS.forEach((key) => {
      out[key] = generateTimeSeries(ticksToShow, { ...METRIC_DEFS[key], seed: key.length * 17 + 3 });
    });
    return out;
  }, [ticksToShow]);

  const allTiles = useMemo(() => [...city.zones, ...city.roads], [city]);
  const distribution = useMemo(() => zoneDistribution(allTiles), [allTiles]);

  return (
    <div className="city-lights h-full overflow-y-auto p-6">
      <SummaryHeader
        title="Statistics"
        subtitle="Live simulation metrics — mock historical data until backend integration."
        badges={METRIC_KEYS.map((key) => {
          const latest = series[key][series[key].length - 1];
          return (
            <MetricBadge
              key={key}
              icon={METRIC_ICONS[key]}
              label={METRIC_DEFS[key].label}
              value={`${latest.value.toLocaleString()}${METRIC_DEFS[key].unit}`}
            />
          );
        })}
      />

      <div className="grid grid-cols-2 gap-4">
        {METRIC_KEYS.map((key) => {
          const data = series[key];
          const latest = data[data.length - 1];
          const previous = data[data.length - 2] ?? latest;
          const trend = latest.value === previous.value ? null : latest.value > previous.value ? "up" : "down";
          const pct = previous.value ? Math.abs(((latest.value - previous.value) / previous.value) * 100).toFixed(1) : "0.0";

          return (
            <LineChartCard
              key={key}
              title={METRIC_DEFS[key].label}
              subtitle={`Over ${ticksToShow} ticks`}
              data={data}
              color={METRIC_DEFS[key].color}
              unit={METRIC_DEFS[key].unit}
              latestValue={`${latest.value.toLocaleString()}${METRIC_DEFS[key].unit}`}
              trend={trend}
              trendValue={`${pct}%`}
            />
          );
        })}

        <ChartCard title="Zone Distribution" subtitle={`${allTiles.length} zones total`} accentColor="var(--color-accent)">
          <ZoneDistributionChart data={distribution} />
        </ChartCard>
      </div>
    </div>
  );
}
