import { cn } from "../../lib/cn";
import { ZONE_COLOR_HEX } from "../../lib/zoneColors";

/**
 * RoadLayer — renders road cells as their own layer, deliberately kept
 * separate from ZoneTile/zone rendering (roads aren't zones and shouldn't
 * share a component just because they currently look similar).
 *
 * Each road cell is placed via explicit CSS grid coordinates so this can
 * be mapped independently of the zones list and still land correctly in
 * the shared CityGrid grid container.
 */
export default function RoadLayer({ roads = [], size, onSelectRoad, selectedZone }) {
  return (
    <>
      {roads.map((road) => (
        <div
          key={road.id}
          role={onSelectRoad ? "button" : undefined}
          onClick={onSelectRoad ? () => onSelectRoad(road) : undefined}
          title={`road · ${road.id}`}
          style={{
            width: size,
            height: size,
            gridColumnStart: road.x + 1,
            gridRowStart: road.y + 1,
            backgroundColor: ZONE_COLOR_HEX.road,
          }}
          className={cn(
            "border border-transparent",
            selectedZone?.id === road.id && "ring-2 ring-accent ring-offset-1 ring-offset-canvas z-10"
          )}
        />
      ))}
    </>
  );
}
