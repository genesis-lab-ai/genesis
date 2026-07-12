import { useMemo } from "react";
import ChartCard from "../components/ui/ChartCard";
import TimeSeriesChart from "../components/charts/TimeSeriesChart";
import ZoneDistributionChart from "../components/charts/ZoneDistributionChart";
import { generateTimeSeries, METRIC_DEFS, zoneDistribution } from "../data/mockMetrics";
import { generateCity } from "../mock/city";
import { useSimulationContext } from "../lib/simulationContext";

const SERIES_KEYS = ["population", "rent", "employment", "traffic", "pollution", "budget"];

export default function StatisticsPage() {
  const sim = useSimulationContext();
  const city = useMemo(() => generateCity(20, 42), []);
  const ticksToShow = Math.max(20, sim.tick);

  const series = useMemo(() => {
    const out = {};
    SERIES_KEYS.forEach((key) => {
      out[key] = generateTimeSeries(ticksToShow, { ...METRIC_DEFS[key], seed: key.length * 17 + 3 });
    });
    return out;
  }, [ticksToShow]);

  const allTiles = useMemo(() => [...city.zones, ...city.roads], [city]);
  const distribution = useMemo(() => zoneDistribution(allTiles), [allTiles]);

  return (
    <div className="city-lights h-full overflow-y-auto p-6">
      <h1 className="font-display text-lg text-text-primary mb-1">Statistics</h1>
      <p className="text-xs text-text-tertiary mb-5">Live simulation metrics — mock data until backend integration.</p>

      <div className="grid grid-cols-2 gap-4">
        {SERIES_KEYS.map((key) => (
          <ChartCard
            key={key}
            title={METRIC_DEFS[key].label}
            subtitle={`Over ${ticksToShow} ticks`}
            accentColor={METRIC_DEFS[key].color}
          >
            <TimeSeriesChart data={series[key]} color={METRIC_DEFS[key].color} />
          </ChartCard>
        ))}
        <ChartCard title="Zone Distribution" subtitle={`${allTiles.length} zones total`} accentColor="var(--color-accent)">
          <ZoneDistributionChart data={distribution} />
        </ChartCard>
      </div>
    </div>
  );
}
