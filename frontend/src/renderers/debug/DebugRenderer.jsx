import { ZONE_LABELS } from "../../mock/city";

/**
 * DebugRenderer — a second, deliberately minimal renderer implementation.
 *
 * Its purpose isn't to be useful in production (though it's a reasonable
 * fallback/inspector view) — it's to prove the rendering abstraction
 * actually works with more than one implementation, not just in theory.
 * It accepts the exact same RendererProps as Grid2DRenderer (see
 * city-engine/sceneTypes.js) and CityView mounts it through the same
 * registry lookup, with zero special-casing.
 *
 * Renders a plain summary table instead of a spatial grid — deliberately
 * a completely different visual approach, to make the point that the
 * abstraction doesn't assume anything about HOW a renderer draws, only
 * WHAT data it's given and what callbacks it can call.
 */
export default function DebugRenderer({ scene, selectedCoord, onSelectCell, onHoverCell }) {
  if (!scene) {
    return (
      <div className="h-full flex items-center justify-center text-text-tertiary text-sm">
        No scene data loaded.
      </div>
    );
  }

  const countsByType = {};
  scene.zones.forEach((z) => {
    countsByType[z.type] = (countsByType[z.type] ?? 0) + 1;
  });

  return (
    <div className="flex-1 min-h-0 overflow-auto p-6 font-mono text-xs">
      <p className="text-text-tertiary mb-4">
        DEBUG RENDERER — {scene.size}×{scene.size} grid, {scene.zones.length} zones, {scene.roads.length} roads
      </p>

      <table className="w-full max-w-md border-collapse">
        <thead>
          <tr className="text-left text-text-tertiary border-b border-border">
            <th className="py-1.5 font-normal">Type</th>
            <th className="py-1.5 font-normal text-right">Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(countsByType).map(([type, count]) => {
            const representative = scene.zones.find((z) => z.type === type);
            const isSelectedType = selectedCoord && representative
              ? scene.zones.find((z) => z.x === selectedCoord.x && z.y === selectedCoord.y)?.type === type
              : false;

            return (
              <tr
                key={type}
                onClick={() => onSelectCell?.(representative)}
                onMouseEnter={() => onHoverCell?.(representative)}
                onMouseLeave={() => onHoverCell?.(null)}
                className={`border-b border-border-soft cursor-pointer hover:bg-surface-raised transition-colors ${
                  isSelectedType ? "text-accent" : "text-text-secondary"
                }`}
              >
                <td className="py-1.5">{ZONE_LABELS[type] ?? type}</td>
                <td className="py-1.5 text-right tabular-nums">{count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedCoord ? (
        <p className="text-text-tertiary mt-4">
          selected: {selectedCoord.x}, {selectedCoord.y}
        </p>
      ) : null}
    </div>
  );
}
