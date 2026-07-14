import { useRef, useState } from "react";
import { HiOutlineMagnifyingGlassPlus, HiOutlineMagnifyingGlassMinus, HiOutlineArrowsPointingOut } from "react-icons/hi2";
import ZoneTile from "./ZoneTile";
import RoadLayer from "./RoadLayer";
import AgentLayer from "./AgentLayer";
import TrafficOverlay from "./TrafficOverlay";
import SelectionOverlay from "./SelectionOverlay";
import { ZONE_LABELS } from "../../mock/city";
import { useCityGridKeyboardNav } from "../../hooks/useCityGridKeyboardNav";
import { useCityZoom } from "../../hooks/useCityZoom";
import { cn } from "../../lib/cn";

const LEGEND_ORDER = ["residential", "commercial", "industrial", "mixed", "park", "road"];

/**
 * CityGrid — the 2D grid renderer for the synthetic city.
 *
 * Purely data-driven and layout-agnostic about its contents: it takes
 * `city` (grid dimensions), `zones`, `roads`, and `selectedZone`, and
 * composes RoadLayer, ZoneTile-per-zone, TrafficOverlay, AgentLayer, and
 * SelectionOverlay into one shared CSS grid. Every tile places itself via
 * explicit grid coordinates (x/y), so zones and roads can be mapped as
 * fully independent lists and still land in the correct cell.
 *
 * Keyboard navigation (roving tabindex + arrow keys) lives in
 * useCityGridKeyboardNav; zoom state lives in useCityZoom — both
 * extracted so this component stays focused on composition/rendering.
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
  const gridRef = useRef(null);

  const { focusedCoord, setHoveredCell, displayedCell, handleKeyDown } = useCityGridKeyboardNav({
    city,
    zones,
    roads,
    selectedZone,
    gridRef,
  });

  const { zoom, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } = useCityZoom();

  if (!city) {
    return (
      <div className="h-full flex items-center justify-center text-text-tertiary text-sm">
        No city data loaded.
      </div>
    );
  }

  const activeType = displayedCell?.type;

  return (
    <div className="h-full flex flex-col">
      <div className="city-lights relative flex-1 min-h-0 flex items-center justify-center overflow-auto blueprint-grid p-6">
        <div
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 150ms ease-out",
          }}
        >
          <div
            ref={gridRef}
            role="grid"
            aria-label={`City grid, ${city.size} by ${city.size} zones`}
            aria-rowcount={city.size}
            aria-colcount={city.size}
            onKeyDown={handleKeyDown}
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${city.size}, ${tileSize}px)`,
              gridTemplateRows: `repeat(${city.size}, ${tileSize}px)`,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 80px -30px rgba(225,29,72,0.25)",
            }}
          >
            <RoadLayer
              roads={roads}
              size={tileSize}
              onSelectRoad={onSelectZone}
              selectedZone={selectedZone}
              focusedCoord={!selectedZone ? focusedCoord : null}
              onHoverCell={setHoveredCell}
            />

            {/* Traffic overlay — architecture-ready, renders nothing
                until real congestion data exists (see TrafficOverlay.jsx
                and lib/traffic.js). Sits between roads and zones so a
                future congestion tint sits visually "on the road"
                without needing to touch RoadTile itself. */}
            <TrafficOverlay />

            {zones.map((zone) => {
              const isFocusTarget = !selectedZone && focusedCoord.x === zone.x && focusedCoord.y === zone.y;
              const isSelected = selectedZone?.id === zone.id;
              return (
                <ZoneTile
                  key={zone.id}
                  zone={zone}
                  size={tileSize}
                  onSelect={onSelectZone}
                  onHover={setHoveredCell}
                  isSelected={isSelected}
                  highlight={shockedZoneIds.includes(zone.id)}
                  tabIndex={isFocusTarget || isSelected ? 0 : -1}
                  gridSize={city.size}
                />
              );
            })}

            <AgentLayer agents={[]} />
          </div>
        </div>

        <SelectionOverlay selectedZone={selectedZone} />

        {/* Zoom controls — real and working (not just "readiness"): a
            low-risk, backend-independent way to improve readability at
            different sizes today. Panning is already handled by this
            container's native overflow-auto scroll; a future
            pinch/scroll-driven zoom would call the same setZoom this UI
            calls, nothing else would need to change. */}
        <div className="glass absolute bottom-4 right-4 flex flex-col rounded-lg border border-border bg-surface overflow-hidden">
          <button
            type="button"
            onClick={zoomIn}
            disabled={!canZoomIn}
            aria-label="Zoom in"
            className="h-8 w-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-raised disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <HiOutlineMagnifyingGlassPlus size={15} />
          </button>
          <div className="h-px bg-border" />
          <button
            type="button"
            onClick={zoomOut}
            disabled={!canZoomOut}
            aria-label="Zoom out"
            className="h-8 w-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-raised disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <HiOutlineMagnifyingGlassMinus size={15} />
          </button>
          <div className="h-px bg-border" />
          <button
            type="button"
            onClick={resetZoom}
            aria-label="Reset zoom"
            title="Reset zoom"
            className="h-8 w-8 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <HiOutlineArrowsPointingOut size={13} />
          </button>
        </div>
      </div>

      <div className="glass shrink-0 border-t border-border bg-surface px-4 py-2.5 flex items-center gap-4 flex-wrap">
        {LEGEND_ORDER.map((type) => (
          <div
            key={type}
            className={cn(
              "flex items-center gap-1.5 rounded px-1.5 py-0.5 transition-colors duration-150",
              activeType === type && "bg-surface-raised"
            )}
          >
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-[2px] transition-transform duration-150",
                activeType === type && "scale-125"
              )}
              style={{ backgroundColor: `var(--color-zone-${type})` }}
            />
            <span
              className={cn(
                "text-[11px] transition-colors duration-150",
                activeType === type ? "text-text-primary" : "text-text-secondary"
              )}
            >
              {ZONE_LABELS[type]}
            </span>
          </div>
        ))}

        {/* Quick-info readout — reflects whatever's hovered, or the
            keyboard-focused/selected tile when nothing's hovered, so
            inspecting the map doesn't require a click just to see what a
            tile is. */}
        <div className="ml-auto flex items-center gap-2 font-mono text-[11px] text-text-tertiary">
          {displayedCell ? (
            <>
              <span className="text-text-secondary">
                {ZONE_LABELS[displayedCell.type] ?? displayedCell.type}
              </span>
              <span>·</span>
              <span>
                {displayedCell.x}, {displayedCell.y}
              </span>
              {displayedCell.population !== undefined && (
                <>
                  <span>·</span>
                  <span>pop {displayedCell.population}</span>
                </>
              )}
            </>
          ) : (
            <span>hover or focus a zone</span>
          )}
        </div>
      </div>
    </div>
  );
}
