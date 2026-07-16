import RoadTile from "./RoadTile";

/**
 * RoadLayer — renders road cells as their own layer, deliberately kept
 * separate from ZoneTile/zone rendering (roads aren't zones and shouldn't
 * share a component just because they currently look similar).
 *
 * Each road cell is placed via explicit CSS grid coordinates so this can
 * be mapped independently of the zones list and still land correctly in
 * the shared CityGrid grid container. `focusedCoord` is used the same
 * way ZoneTile's `tabIndex` is — CityGrid owns the roving-tabindex state
 * for the whole grid, roads included.
 *
 * Actual per-tile rendering lives in RoadTile (memoized) — this
 * component's only job is mapping the roads list and resolving each
 * tile's selected/focus state.
 */
export default function RoadLayer({ roads = [], size, onSelectRoad, selectedZone, focusedCoord, onHoverCell }) {
  return (
    <>
      {roads.map((road) => {
        const isSelected = selectedZone?.id === road.id;
        const isFocusTarget = isSelected || (focusedCoord?.x === road.x && focusedCoord?.y === road.y);

        return (
          <RoadTile
            key={road.id}
            road={road}
            size={size}
            onSelectRoad={onSelectRoad}
            isSelected={isSelected}
            isFocusTarget={isFocusTarget}
            onHoverCell={onHoverCell}
          />
        );
      })}
    </>
  );
}
