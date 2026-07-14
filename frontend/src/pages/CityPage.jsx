import { useCallback, useEffect, useState } from "react";
import CityGrid from "../components/city/CityGrid";
import CityGridSkeleton from "../components/city/CityGridSkeleton";
import ErrorState from "../components/ui/ErrorState";
import ZoneInspectorPanel from "../components/ui/ZoneInspectorPanel";
import { getCity } from "../services/cityService";

export default function CityPage() {
  const [city, setCity] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  const loadCity = useCallback(async () => {
    setLoadError(null);
    try {
      const data = await getCity();
      setCity(data);
    } catch (error) {
      console.error("Failed to load city:", error);
      setLoadError("Couldn't load the city map.");
    }
  }, []);

  useEffect(() => {
    loadCity();
  }, [loadCity]);

  if (loadError) {
    return <ErrorState message={loadError} onRetry={loadCity} />;
  }

  if (!city) {
    return (
      <div className="h-full flex">
        <div className="flex-1 min-w-0">
          <CityGridSkeleton />
        </div>
        <aside className="glass w-72 shrink-0 border-l border-border bg-surface p-4" />
      </div>
    );
  }

  const isRoad = selectedZone?.type === "road";

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
        <ZoneInspectorPanel
          title="Zone inspector"
          selectedZone={selectedZone}
          fields={
            selectedZone
              ? [
                  { label: "Coordinates", value: `${selectedZone.x}, ${selectedZone.y}` },
                  ...(isRoad
                    ? []
                    : [
                        { label: "Rent", value: `₹${selectedZone.rent}/mo` },
                        { label: "Employment", value: `${selectedZone.employment} jobs` },
                      ]),
                ]
              : []
          }
        />
      </aside>
    </div>
  );
}
