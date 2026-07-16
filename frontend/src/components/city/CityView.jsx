import { useMemo, useState } from "react";
import { HiOutlineMagnifyingGlassPlus, HiOutlineMagnifyingGlassMinus, HiOutlineArrowsPointingOut } from "react-icons/hi2";
import { buildScene } from "../../city-engine/buildScene";
import { useCityCamera } from "../../hooks/useCityCamera";
import { getRenderer, RENDERER_REGISTRY, DEFAULT_RENDERER } from "../../renderers";
import SegmentedControl from "../ui/SegmentedControl";
import { ZONE_LABELS } from "../../mock/city";
import { cn } from "../../lib/cn";

const LEGEND_ORDER = ["residential", "commercial", "industrial", "mixed", "park", "road"];

const RENDERER_OPTIONS = Object.entries(RENDERER_REGISTRY).map(([value, { label }]) => ({ value, label }));

/**
 * CityView — the renderer-agnostic entry point every page uses to show
 * the city. This is what CityGrid used to be from a page's perspective:
 * same props in (`city`, `zones`, `roads`, `selectedZone`, `onSelectZone`,
 * `shockedZoneIds`), so DashboardPage and CityPage needed only a one-line
 * import swap to adopt this.
 *
 * What changed underneath: CityView no longer knows how to draw a city.
 * It:
 *   1. Normalizes simulation data into SceneData (buildScene).
 *   2. Owns CameraState (useCityCamera) and the zoom control chrome.
 *   3. Owns the legend and hover/focus-driven quick-info readout — both
 *      genuinely renderer-agnostic (they only depend on scene data, not
 *      on how a renderer draws it).
 *   4. Looks up the active renderer from the registry (renderers/index.js)
 *      and mounts it with the standard RendererProps contract (see
 *      city-engine/sceneTypes.js) — Dashboard/Metrics/Policies/Agent
 *      Inspector/Events/simulation communication/state management none
 *      of them know or care which renderer is mounted.
 *
 * The renderer switcher below is included specifically to demonstrate
 * that the abstraction is real and working, not just a design on paper —
 * switching it actually swaps the mounted component.
 */
export default function CityView({
  city,
  zones = [],
  roads = [],
  selectedZone,
  onSelectZone,
  shockedZoneIds = [],
}) {
  const [rendererName, setRendererName] = useState(DEFAULT_RENDERER);
  const [displayedCell, setDisplayedCell] = useState(null);

  const scene = useMemo(() => buildScene({ city, zones, roads }), [city, zones, roads]);
  const { camera, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } = useCityCamera();

  const selectedCoord = selectedZone ? { x: selectedZone.x, y: selectedZone.y } : null;
  const ActiveRenderer = getRenderer(rendererName);

  if (!scene) {
    return (
      <div className="h-full flex items-center justify-center text-text-tertiary text-sm">
        No city data loaded.
      </div>
    );
  }

  const activeType = displayedCell?.type;

  return (
    <div className="h-full flex flex-col">
      <div className="relative flex-1 min-h-0 flex flex-col">
        <ActiveRenderer
          scene={scene}
          camera={camera}
          selectedCoord={selectedCoord}
          shockedIds={shockedZoneIds}
          onSelectCell={onSelectZone}
          onHoverCell={setDisplayedCell}
        />

        {/* Zoom controls — chrome, not renderer-specific. Applying zoom
            to what's on screen IS renderer-specific (CSS transform here,
            a camera distance/FOV change for a future 3D renderer), which
            is why the renderer itself reads `camera.zoom`, not this UI. */}
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

        {/* Renderer switcher — demonstrates the abstraction is real.
            Not persisted, not meant as a permanent end-user feature;
            defaults to the production 2D renderer every load. */}
        {RENDERER_OPTIONS.length > 1 ? (
          <div className="absolute top-4 right-4">
            <SegmentedControl options={RENDERER_OPTIONS} value={rendererName} onChange={setRendererName} />
          </div>
        ) : null}
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
