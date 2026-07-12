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
      {roads.map((road) => {
        // The city's road rule (see mock/city.js) is: a cell is a road
        // if x%4===0 or y%4===0. A cell where BOTH are true is a 4-way
        // intersection. This only reads road.x/road.y — no new data or
        // prop needed — so it stays correct for any city the backend
        // eventually sends, as long as it follows the same convention.
        const isVertical = road.x % 4 === 0;
        const isHorizontal = road.y % 4 === 0;
        const isIntersection = isVertical && isHorizontal;

        return (
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
              backgroundImage: "linear-gradient(155deg, rgba(255,255,255,0.04), rgba(0,0,0,0.12))",
            }}
            className={cn(
              "relative border border-transparent",
              selectedZone?.id === road.id && "ring-2 ring-accent ring-offset-1 ring-offset-canvas z-10"
            )}
          >
            {/* Center line(s) — gives roads a direction instead of
                reading as a flat gray block. */}
            {isVertical && !isIntersection && (
              <span className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
            )}
            {isHorizontal && !isIntersection && (
              <span className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white/10" />
            )}

            {/* Intersections get a faint warm glow — a small nod to the
                "city lights at night" motif used elsewhere in the app. */}
            {isIntersection && (
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(225,29,72,0.18) 0%, transparent 70%)",
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
