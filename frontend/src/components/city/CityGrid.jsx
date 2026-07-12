import { useState } from "react";
import ZoneTile from "./ZoneTile";
import RoadLayer from "./RoadLayer";
import AgentLayer from "./AgentLayer";
import SelectionOverlay from "./SelectionOverlay";
import { ZONE_LABELS } from "../../mock/city";

const LEGEND_ORDER = ["residential", "commercial", "industrial", "mixed", "park", "road"];

/**
 * CityGrid — the 2D grid renderer for the synthetic city.
 *
 * Purely data-driven and layout-agnostic about its contents: it takes
 * `city` (grid dimensions), `zones`, `roads`, and `selectedZone`, and
 * composes the RoadLayer, ZoneTile-per-zone, AgentLayer, and
 * SelectionOverlay into one shared CSS grid. Every tile places itself via
 * explicit grid coordinates (x/y), so zones and roads can be mapped as
 * fully independent lists and still land in the correct cell.
 *
 * This is v1's renderer. It's intentionally isolated behind this props
 * contract so it can be swapped for an isometric/3D/deck.gl renderer
 * later without touching any page that renders <CityGrid />.
 */
export default function CityGrid({
  city,
  zones = [],
  roads = [],
  selectedZone,
  onSelectZone,
  shockedZoneIds = [],
}) {
  const [tileSize] = useState(24);

  if (!city) {
    return (
      <div className="h-full flex items-center justify-center text-text-tertiary text-sm">
        No city data loaded.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="city-lights flex-1 min-h-0 flex items-center justify-center overflow-auto blueprint-grid p-6">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${city.size}, ${tileSize}px)`,
            gridTemplateRows: `repeat(${city.size}, ${tileSize}px)`,
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 80px -30px rgba(225,29,72,0.25)",
          }}
        >
          <RoadLayer roads={roads} size={tileSize} onSelectRoad={onSelectZone} selectedZone={selectedZone} />

          {zones.map((zone) => (
            <ZoneTile
              key={zone.id}
              zone={zone}
              size={tileSize}
              onSelect={onSelectZone}
              isSelected={selectedZone?.id === zone.id}
              highlight={shockedZoneIds.includes(zone.id)}
            />
          ))}

          <AgentLayer agents={[]} />
        </div>

        <SelectionOverlay selectedZone={selectedZone} />
      </div>

      <div className="glass shrink-0 border-t border-border bg-surface px-4 py-2.5 flex items-center gap-4 flex-wrap">
        {LEGEND_ORDER.map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: `var(--color-zone-${type})` }}
            />
            <span className="text-[11px] text-text-secondary">{ZONE_LABELS[type]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
