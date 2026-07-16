import { useEffect, useRef, useState } from "react";
import ZoneTile from "./ZoneTile";
import RoadLayer from "./RoadLayer";
import AgentLayer from "./AgentLayer";
import TrafficOverlay from "./TrafficOverlay";
import SelectionOverlay from "./SelectionOverlay";
import { useGrid2DKeyboardNav } from "./useGrid2DKeyboardNav";

const TILE_SIZE = 24;

/**
 * Grid2DRenderer — the current (and default) city renderer: a flat 2D
 * CSS-grid of colored tiles. This is "v1's renderer," now formalized as
 * one implementation of the renderer interface (see
 * city-engine/sceneTypes.js) rather than the only way CityView knows how
 * to draw a city.
 *
 * Accepts exactly RendererProps — `scene`, `camera`, `selectedCoord`,
 * `shockedIds`, `onSelectCell`, `onHoverCell` — and nothing else. It does
 * not fetch data, does not know about pages, and does not render any of
 * CityView's chrome (legend, quick-info bar, zoom buttons) — only the
 * map itself. A future Three.js renderer living at
 * renderers/threejs/ThreeRenderer.jsx would accept this exact same prop
 * shape and CityView would not need to change to mount it.
 *
 * Roving-tabindex keyboard navigation is grid2d-specific (see
 * useGrid2DKeyboardNav) — a DOM concept that wouldn't carry over to a
 * canvas/WebGL renderer, so it stays local to this implementation rather
 * than living in the shared contract.
 */
export default function Grid2DRenderer({ scene, camera, selectedCoord, shockedIds = [], onSelectCell, onHoverCell }) {
  const gridRef = useRef(null);
  const [hoveredCell, setHoveredCell] = useState(null);

  const { focusedCoord, activeCoord, handleKeyDown } = useGrid2DKeyboardNav({
    scene,
    selectedCoord,
    gridRef,
  });

  // The cell this renderer currently wants CityView's quick-info bar to
  // show: whatever's directly hovered, falling back to whatever has
  // keyboard focus (or the selected cell) when nothing's hovered. This
  // fallback is a grid2d-specific idea (DOM focus), so it's computed
  // here and reported upward through the generic onHoverCell prop —
  // CityView just displays whatever it's told, without needing to know
  // hover came from a mouse vs. a fallback default.
  const displayedCell =
    hoveredCell ??
    scene?.zones.find((z) => z.x === activeCoord.x && z.y === activeCoord.y) ??
    scene?.roads.find((r) => r.x === activeCoord.x && r.y === activeCoord.y) ??
    null;

  useEffect(() => {
    onHoverCell?.(displayedCell);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedCell?.id]);

  if (!scene) {
    return (
      <div className="h-full flex items-center justify-center text-text-tertiary text-sm">
        No city data loaded.
      </div>
    );
  }

  return (
    <div className="city-lights relative flex-1 min-h-0 flex items-center justify-center overflow-auto blueprint-grid p-6">
      <div
        style={{
          transform: `scale(${camera.zoom})`,
          transition: "transform 150ms ease-out",
        }}
      >
        <div
          ref={gridRef}
          role="grid"
          aria-label={`City grid, ${scene.size} by ${scene.size} zones`}
          aria-rowcount={scene.size}
          aria-colcount={scene.size}
          onKeyDown={handleKeyDown}
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${scene.size}, ${TILE_SIZE}px)`,
            gridTemplateRows: `repeat(${scene.size}, ${TILE_SIZE}px)`,
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 80px -30px rgba(225,29,72,0.25)",
          }}
        >
          <RoadLayer
            roads={scene.roads}
            size={TILE_SIZE}
            onSelectRoad={onSelectCell}
            selectedCoord={selectedCoord}
            focusedCoord={!selectedCoord ? focusedCoord : null}
            onHoverCell={setHoveredCell}
          />

          {/* Traffic overlay — architecture-ready, renders nothing until
              real congestion data exists (see TrafficOverlay.jsx and
              lib/traffic.js). Sits between roads and zones so a future
              congestion tint sits visually "on the road" without
              needing to touch RoadTile itself. */}
          <TrafficOverlay />

          {scene.zones.map((zone) => {
            const isFocusTarget = !selectedCoord && focusedCoord.x === zone.x && focusedCoord.y === zone.y;
            const isSelected = selectedCoord?.x === zone.x && selectedCoord?.y === zone.y;
            return (
              <ZoneTile
                key={zone.id}
                zone={zone}
                size={TILE_SIZE}
                onSelect={onSelectCell}
                onHover={setHoveredCell}
                isSelected={isSelected}
                highlight={shockedIds.includes(zone.id)}
                tabIndex={isFocusTarget || isSelected ? 0 : -1}
                gridSize={scene.size}
              />
            );
          })}

          <AgentLayer agents={[]} />
        </div>
      </div>

      <SelectionOverlay selectedCoord={selectedCoord} />
    </div>
  );
}
