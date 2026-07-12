import { useEffect, useState } from "react";
import CityGrid from "../components/city/CityGrid";
import { getCity } from "../services/cityService";
import { ZONE_LABELS } from "../mock/city";

export default function CityPage() {
  const [city, setCity] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    async function loadCity() {
      try {
        const data = await getCity();
        setCity(data);
      } catch (error) {
        console.error("Failed to load city:", error);
      }
    }

    loadCity();
  }, []);

  if (!city) {
    return (
      <div className="flex h-full items-center justify-center text-text-secondary">
        Loading Genesis...
      </div>
    );
  }

  return (
    <div className="h-full flex">
      <div className="flex-1 min-w-0">
        <CityGrid
          city={city}
          zones={city.zones}
          roads={city.roads}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </div>

      <aside className="glass w-72 shrink-0 border-l border-border bg-surface p-4">
        <h2 className="text-[11px] uppercase tracking-wider text-text-tertiary mb-3">
          Zone inspector
        </h2>

        {selectedZone ? (
          <div className="space-y-3">
            <div>
              <p className="text-[11px] text-text-tertiary">Type</p>
              <p className="text-sm text-text-primary">
                {ZONE_LABELS[selectedZone.type]}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-text-tertiary">Coordinates</p>
              <p className="text-sm text-text-primary font-mono">
                {selectedZone.x}, {selectedZone.y}
              </p>
            </div>

            {selectedZone.type !== "road" && (
              <>
                <div>
                  <p className="text-[11px] text-text-tertiary">Rent</p>
                  <p className="text-sm text-text-primary font-mono">
                    ${selectedZone.rent}/mo
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-text-tertiary">Employment</p>
                  <p className="text-sm text-text-primary font-mono">
                    {selectedZone.employment} jobs
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-xs text-text-tertiary">
            Select a zone on the map to inspect it.
          </p>
        )}
      </aside>
    </div>
  );
}