import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineHomeModern,
  HiOutlineTruck,
  HiOutlineCloud,
  HiOutlineIdentification,
  HiOutlineFaceSmile,
} from "react-icons/hi2";

import CityGrid from "../components/city/CityGrid";
import CityGridSkeleton from "../components/city/CityGridSkeleton";
import StatCard from "../components/ui/StatCard";
import StatCardSkeleton from "../components/ui/StatCardSkeleton";
import ControlPanel from "../components/layout/ControlPanel";
import ErrorState from "../components/ui/ErrorState";
import SectionHeader from "../components/ui/SectionHeader";
import ZoneInspectorPanel from "../components/ui/ZoneInspectorPanel";

import { getCity } from "../services/cityService";
import { getMetrics } from "../services/metricsService";

import { useSimulationContext } from "../lib/simulationContext";

const SHOCK_PRESETS = [
  { label: "Raised property tax in District 3" },
  { label: "New metro line: Downtown → Riverside" },
  { label: "Rezoned Industrial Quarter to Mixed Use" },
];

export default function DashboardPage() {
  const sim = useSimulationContext();

  const [city, setCity] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const [selectedZone, setSelectedZone] = useState(null);
  const [shockedZoneIds, setShockedZoneIds] = useState([]);

  const loadData = useCallback(async () => {
    setLoadError(null);
    try {
      const [cityData, metricsData] = await Promise.all([getCity(), getMetrics()]);
      setCity(cityData);
      setMetrics(metricsData);
    } catch (error) {
      console.error(error);
      // Surfaced to the user instead of just the console — matters more
      // once this is polling/streaming live data, where a transient
      // failure shouldn't silently strand the page on a loading spinner.
      setLoadError("Couldn't load the city and metrics data.");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Recomputed only when `metrics` actually changes, not on every
  // render (e.g. from selecting a zone or a shock highlight timing out) —
  // matters more once metrics refresh live on an interval.
  const METRIC_CARDS = useMemo(() => {
    if (!metrics) return [];
    return [
      { label: "Population", value: metrics.population.toLocaleString(), icon: HiOutlineUsers },
      { label: "Employment", value: `${metrics.employment_rate}%`, icon: HiOutlineBriefcase },
      { label: "Land Value", value: `₹${metrics.average_land_value}`, icon: HiOutlineHomeModern },
      { label: "Traffic", value: metrics.average_traffic, unit: "/100", icon: HiOutlineTruck },
      { label: "Pollution", value: metrics.average_pollution, unit: "/100", icon: HiOutlineCloud },
      // Was HiOutlineBanknotes — a currency icon for a jobs count read
      // oddly next to "Employment" (already using the briefcase icon).
      { label: "Jobs", value: metrics.employment.toLocaleString(), icon: HiOutlineIdentification },
      { label: "Happiness", value: metrics.average_happiness, unit: "/100", icon: HiOutlineFaceSmile },
    ];
  }, [metrics]);

  const handleInjectShock = () => {
    const preset = SHOCK_PRESETS[sim.events.length % SHOCK_PRESETS.length];
    sim.injectShock(preset);

    const sample = [...city.zones]
      .sort(() => 0.5 - Math.random())
      .slice(0, 12)
      .map((z) => z.id);

    setShockedZoneIds(sample);
    setTimeout(() => setShockedZoneIds([]), 2500);
  };

  if (loadError) {
    return <ErrorState message={loadError} onRetry={loadData} />;
  }

  if (!city || !metrics) {
    // Shaped like the real layout (grid + metrics panel) rather than a
    // centered spinner, so loading feels like the city "arriving"
    // instead of a jump-cut from an unrelated screen.
    return (
      <div className="h-full flex">
        <div className="flex-1 min-w-0 flex flex-col">
          <CityGridSkeleton />
        </div>
        <aside className="glass w-72 shrink-0 border-l border-border bg-surface overflow-y-auto p-3">
          <SectionHeader>City metrics</SectionHeader>
          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      <div className="flex-1 min-w-0 flex flex-col">
        <CityGrid
          city={city}
          zones={city.zones}
          roads={city.roads}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
          shockedZoneIds={shockedZoneIds}
        />

        <ControlPanel
          isRunning={sim.isRunning}
          tick={sim.tick}
          speed={sim.speed}
          onPlay={sim.play}
          onPause={sim.pause}
          onReset={sim.reset}
          onSpeedChange={sim.setSpeed}
          onInjectShock={handleInjectShock}
        />
      </div>

      <aside className="glass w-72 shrink-0 border-l border-border bg-surface overflow-y-auto p-3">
        <SectionHeader>City metrics</SectionHeader>

        <div className="grid grid-cols-2 gap-2.5">
          {METRIC_CARDS.map((card, i) => (
            <div key={card.label} className="fade-in-up" style={{ animationDelay: `${i * 40}ms` }}>
              <StatCard {...card} />
            </div>
          ))}
        </div>

        <div className="mt-3">
          <ZoneInspectorPanel
            selectedZone={selectedZone}
            emptyHint="Click a zone on the map to inspect it here."
            fields={
              selectedZone
                ? [
                    { label: "Population", value: selectedZone.population },
                    { label: "Employment", value: selectedZone.employment },
                    { label: "Pollution", value: selectedZone.pollution },
                    { label: "Happiness", value: selectedZone.happiness },
                  ]
                : []
            }
          />
        </div>
      </aside>
    </div>
  );
}
