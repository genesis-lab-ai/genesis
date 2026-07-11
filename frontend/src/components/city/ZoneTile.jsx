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
export default function ZoneTile({ zone, size, onSelect, isSelected, highlight }) {
  const color = ZONE_COLOR_HEX[zone.type];

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
        backgroundColor: `${color}2E`,
        borderColor: `${color}55`,
      }}
      className={cn(
        "relative border transition-all duration-200 hover:brightness-125 cursor-pointer",
        isSelected && "ring-2 ring-accent ring-offset-1 ring-offset-canvas z-10",
        highlight && "animate-pulse"
      )}
    >
      <span
        className="absolute inset-0.5 rounded-[2px]"
        style={{
          background: `linear-gradient(155deg, ${color}, ${color}CC)`,
          boxShadow: `inset 0 1px 0 ${color}55, inset 0 -1px 2px rgba(0,0,0,0.25)`,
        }}
      />
    </button>
  );
}
