import { memo } from "react";
import { cn } from "../../lib/cn";
import { ZONE_COLOR_HEX } from "../../lib/zoneColors";

/**
 * RoadTile — a single road cell. Extracted out of RoadLayer's inline
 * `.map()` for two reasons: it's now independently memoized (see below),
 * and it gives roads the same "one component, one concern" treatment
 * ZoneTile already has.
 *
 * Visual language is deliberately different from ZoneTile: zones read as
 * raised, glowing blocks (gradient fill, glow halo); roads read as a
 * recessed, paved surface (inset shadow, dashed lane markings) — the
 * goal is that you can tell roads from zones from their *shape language*
 * alone, not just their color.
 *
 * Wrapped in React.memo — with ~small road cells re-rendered on every
 * grid update, and this component's own render being pure given its
 * props, this avoids re-rendering every road tile when only one thing
 * (e.g. the focused/selected coordinate) actually changed. Matters more
 * once city data refreshes live rather than once per page load.
 */
function RoadTile({ road, size, onSelectRoad, isSelected, isFocusTarget, onHoverCell }) {
  const isVertical = road.x % 4 === 0;
  const isHorizontal = road.y % 4 === 0;
  const isIntersection = isVertical && isHorizontal;

  return (
    <div
      data-x={road.x}
      data-y={road.y}
      tabIndex={isFocusTarget ? 0 : -1}
      role={onSelectRoad ? "gridcell" : undefined}
      aria-label={`Road at column ${road.x + 1}, row ${road.y + 1}`}
      onClick={onSelectRoad ? () => onSelectRoad(road) : undefined}
      onMouseEnter={() => onHoverCell?.(road)}
      onMouseLeave={() => onHoverCell?.(null)}
      onFocus={() => onHoverCell?.(road)}
      onBlur={() => onHoverCell?.(null)}
      onKeyDown={
        onSelectRoad
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectRoad(road);
              }
            }
          : undefined
      }
      title={`Road · ${road.id}`}
      style={{
        width: size,
        height: size,
        gridColumnStart: road.x + 1,
        gridRowStart: road.y + 1,
        backgroundColor: ZONE_COLOR_HEX.road,
        // Inset shadow (rather than ZoneTile's outward glow) is the core
        // "recessed pavement" cue — roads visually sit slightly below
        // the zone grid instead of sitting flush with it.
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.03)",
        backgroundImage: "linear-gradient(155deg, rgba(255,255,255,0.03), rgba(0,0,0,0.15))",
      }}
      className={cn(
        "relative border border-transparent transition-shadow duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:z-20",
        isSelected && "ring-2 ring-accent ring-offset-1 ring-offset-canvas z-10"
      )}
    >
      {/* Dashed lane marking — reads more like an actual road than the
          previous solid line, and is the single clearest "this is
          infrastructure, not a building" cue at a glance. */}
      {isVertical && !isIntersection && (
        <span
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
          style={{
            width: "1px",
            backgroundImage: "linear-gradient(rgba(255,255,255,0.22) 40%, transparent 40%)",
            backgroundSize: "1px 6px",
          }}
        />
      )}
      {isHorizontal && !isIntersection && (
        <span
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
          style={{
            height: "1px",
            backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.22) 40%, transparent 40%)",
            backgroundSize: "6px 1px",
          }}
        />
      )}

      {/* Intersections: a slightly raised, softly-lit junction plaza —
          distinguishes a 4-way crossing from a straight road segment at
          a glance, and doubles as the "city lights at night" motif used
          elsewhere in the app. */}
      {isIntersection && (
        <span
          className="absolute inset-[3px] rounded-[2px]"
          style={{
            background: "radial-gradient(circle, rgba(225,29,72,0.22) 0%, rgba(255,255,255,0.05) 55%, transparent 75%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        />
      )}
    </div>
  );
}

export default memo(RoadTile);
