import { memo } from "react";
import { cn } from "../../lib/cn";
import { ZONE_COLOR_HEX } from "../../lib/zoneColors";
import { ZONE_LABELS } from "../../mock/city";

/**
 * ZoneTile — a single zone cell in the city grid.
 *
 * Purely presentational: receives a full Zone object and renders from it,
 * nothing else. Roads are NOT handled here — see RoadLayer/RoadTile.
 * Placed via explicit CSS grid coordinates (from zone.x/zone.y) rather
 * than relying on array order, so ZoneTile and RoadLayer can be mapped
 * independently and still land in the correct grid cell.
 *
 * `tabIndex` is passed in by Grid2DRenderer, which owns the roving-tabindex
 * state for the whole grid (see useGrid2DKeyboardNav) — only one tile
 * in the entire grid is ever a tab stop at a time; arrow keys move focus
 * between tiles instead of Tab having to visit all 400+ individually.
 *
 * Wrapped in React.memo — with ~370 of these rendered per grid, and this
 * component's render being pure given its props, this avoids
 * re-rendering every tile when only e.g. the focused coordinate changed.
 * Matters more once city data refreshes live rather than once per load.
 */

// Cheap deterministic hash from a zone's id string — used to pick a
// stable ~12% subset of tiles for the ambient twinkle and to stagger
// their animation timing. Deterministic (not Math.random()) so the same
// tiles twinkle on every render instead of flickering differently each
// time React re-renders the grid.
function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return h;
}

// How "alive" a zone looks is driven by whichever of its own fields
// actually signals activity for that zone type — population for
// residential/mixed, employment for commercial/industrial, happiness for
// parks. This uses data the zone already carries; no new fields needed.
function getActivityLevel(zone) {
  switch (zone.type) {
    case "residential":
    case "mixed":
      return Math.min(1, (zone.population ?? 0) / 1000);
    case "commercial":
    case "industrial":
      return Math.min(1, (zone.employment ?? 0) / 400);
    case "park":
      return Math.min(1, (zone.happiness ?? 0) / 100);
    default:
      return 0.5;
  }
}

function ZoneTile({ zone, size, onSelect, onHover, isSelected, highlight, tabIndex = -1, gridSize }) {
  const color = ZONE_COLOR_HEX[zone.type];
  const hash = hashId(zone.id);
  const activity = getActivityLevel(zone);

  const twinkles = hash % 8 === 0; // ~12% of tiles
  const twinkleDelay = (hash % 40) / 10; // 0–4s stagger

  // Higher-activity zones render with a slightly stronger fill and a
  // brighter inner highlight — the grid reads as a place with variation
  // in it, rather than every commercial block looking identical.
  const fillAlphaHex = Math.round(0x22 + activity * 0x35).toString(16).padStart(2, "0");
  const innerOpacity = 0.7 + activity * 0.3;

  const zoneLabel = ZONE_LABELS[zone.type] ?? zone.type;

  return (
    <button
      type="button"
      data-x={zone.x}
      data-y={zone.y}
      tabIndex={tabIndex}
      onClick={() => onSelect?.(zone)}
      onMouseEnter={() => onHover?.(zone)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(zone)}
      onBlur={() => onHover?.(null)}
      title={`${zoneLabel} · zone ${zone.id}`}
      role="gridcell"
      aria-selected={isSelected}
      aria-rowindex={gridSize ? zone.y + 1 : undefined}
      aria-colindex={gridSize ? zone.x + 1 : undefined}
      aria-label={`${zoneLabel} zone at column ${zone.x + 1}, row ${zone.y + 1}${isSelected ? ", selected" : ""}`}
      style={{
        width: size,
        height: size,
        gridColumnStart: zone.x + 1,
        gridRowStart: zone.y + 1,
        backgroundColor: `${color}${fillAlphaHex}`,
        borderColor: `${color}55`,
        animation: twinkles ? `city-twinkle ${3 + (hash % 3)}s ease-in-out ${twinkleDelay}s infinite` : undefined,
      }}
      className={cn(
        "group relative border transition-all duration-200 hover:scale-110 hover:z-20 cursor-pointer",
        // Click feedback: a quick dip from the hovered 110% down toward
        // 102% and a brightness pop, so a click reads as a distinct
        // physical "press" rather than just triggering the selection
        // ring after the fact.
        "active:scale-105 active:brightness-125 active:duration-75",
        "focus-visible:outline-none focus-visible:scale-110 focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-accent",
        isSelected && "z-10",
        highlight && "animate-pulse"
      )}
    >
      <span
        className="absolute inset-0.5 rounded-[2px]"
        style={{
          background: `linear-gradient(155deg, ${color}, ${color}CC)`,
          opacity: innerOpacity,
          boxShadow: `inset 0 1px 0 ${color}55, inset 0 -1px 2px rgba(0,0,0,0.25)`,
        }}
      />

      {/* Hover/selection glow halo, colored to the zone itself rather
          than a generic white highlight — reinforces which zone type
          you're looking at even mid-interaction. */}
      <span
        className={cn(
          "pointer-events-none absolute -inset-1 rounded-[3px] opacity-0 transition-opacity duration-200",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
          isSelected && "opacity-100"
        )}
        style={{
          boxShadow: isSelected
            ? `0 0 0 2px var(--color-accent), 0 0 14px 2px ${color}99`
            : `0 0 10px 2px ${color}80`,
        }}
      />

      {/* Persistent selected-zone marker — visible even without hover,
          so the selected tile can be spotted at a glance across the
          whole grid instead of only being obvious up close via the ring. */}
      {isSelected && (
        <span
          className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent"
          style={{ boxShadow: "0 0 4px 1px var(--color-accent)" }}
        />
      )}
    </button>
  );
}

export default memo(ZoneTile);
