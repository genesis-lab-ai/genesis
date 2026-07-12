import { cn } from "../../lib/cn";
import { ZONE_COLOR_HEX } from "../../lib/zoneColors";

/**
 * ZoneTile — a single zone cell in the city grid.
 *
 * Purely presentational: receives a full Zone object and renders from it,
 * nothing else. Roads are NOT handled here — see RoadLayer. Placed via
 * explicit CSS grid coordinates (from zone.x/zone.y) rather than relying
 * on array order, so ZoneTile and RoadLayer can be mapped independently
 * and still land in the correct grid cell.
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

export default function ZoneTile({ zone, size, onSelect, isSelected, highlight }) {
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

  return (
    <button
      type="button"
      onClick={() => onSelect?.(zone)}
      title={`${zone.type} · zone ${zone.id}`}
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
    </button>
  );
}
