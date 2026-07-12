import { useEffect, useState } from "react";
import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineHomeModern,
  HiOutlineTruck,
  HiOutlineCloud,
  HiOutlineBanknotes,
  HiOutlineFaceSmile,
} from "react-icons/hi2";

import CityGrid from "../components/city/CityGrid";
import StatCard from "../components/ui/StatCard";
import ControlPanel from "../components/layout/ControlPanel";
import LoadingState from "../components/ui/LoadingState";
import DetailRow from "../components/ui/DetailRow";

import { ZONE_LABELS } from "../mock/city";
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

  const [selectedZone, setSelectedZone] = useState(null);
  const [shockedZoneIds, setShockedZoneIds] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [cityData, metricsData] = await Promise.all([
          getCity(),
          getMetrics(),
        ]);

        setCity(cityData);
        setMetrics(metricsData);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  if (!city || !metrics) {
    return <LoadingState />;
  }

  const METRIC_CARDS = [
    {
      label: "Population",
      value: metrics.population.toLocaleString(),
      icon: HiOutlineUsers,
    },
    {
      label: "Employment",
      value: `${metrics.employment_rate}%`,
      icon: HiOutlineBriefcase,
    },
    {
      label: "Land Value",
      value: `₹${metrics.average_land_value}`,
      icon: HiOutlineHomeModern,
    },
    {
      label: "Traffic",
      value: metrics.average_traffic,
      unit: "/100",
      icon: HiOutlineTruck,
    },
    {
      label: "Pollution",
      value: metrics.average_pollution,
      unit: "/100",
      icon: HiOutlineCloud,
    },
    {
      label: "Jobs",
      value: metrics.employment.toLocaleString(),
      icon: HiOutlineBanknotes,
    },
    {
      label: "Happiness",
      value: metrics.average_happiness,
      unit: "/100",
      icon: HiOutlineFaceSmile,
    },
  ];

  const handleInjectShock = () => {
    const preset = SHOCK_PRESETS[sim.events.length % SHOCK_PRESETS.length];

    sim.injectShock(preset);

    const sample = [...city.zones]
      .sort(() => 0.5 - Math.random())
      .slice(0, 12)
      .map((z) => z.id);

    setShockedZoneIds(sample);

    setTimeout(() => {
      setShockedZoneIds([]);
    }, 2500);
  };

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
        <h2 className="text-[11px] uppercase tracking-wider text-text-tertiary px-1 mb-2">
          City metrics
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          {METRIC_CARDS.map((card, i) => (
            <div
              key={card.label}
              className="fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <StatCard {...card} />
            </div>
          ))}

          {selectedZone ? (
            <div className="glass col-span-2 rounded-xl border border-accent/30 bg-accent-soft p-3 mt-1 fade-in-up">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] uppercase tracking-wider text-accent">
                  Selected zone
                </p>
                <p className="text-[10px] text-text-tertiary font-mono">
                  {selectedZone.id}
                </p>
              </div>

              <div className="mt-2">
                <DetailRow label="Type" value={ZONE_LABELS[selectedZone.type] ?? selectedZone.type} />
                <DetailRow label="Population" value={selectedZone.population} />
                <DetailRow label="Employment" value={selectedZone.employment} />
                <DetailRow label="Pollution" value={selectedZone.pollution} />
                <DetailRow label="Happiness" value={selectedZone.happiness} />
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}