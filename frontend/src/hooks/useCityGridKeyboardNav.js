import { useMemo, useState } from "react";

/**
 * useCityGridKeyboardNav — owns the city grid's roving-tabindex state and
 * arrow-key navigation. Extracted out of CityGrid so that component can
 * stay focused on composing layers/rendering, while this hook owns one
 * cohesive concern: "which cell has keyboard focus, and how does that
 * move."
 *
 * Standard grid-widget keyboard pattern: only one cell is ever a tab
 * stop; arrow keys move a "focused" coordinate around within the grid;
 * Tab moves focus out of the grid entirely. This is what replaced what
 * used to be 400+ individually tab-stoppable tiles.
 */
export function useCityGridKeyboardNav({ city, zones, roads, selectedZone, gridRef }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Coordinate -> cell lookup, rebuilt only when the underlying data
  // changes — used both for arrow-key navigation targeting and for
  // resolving the roving tabindex's current position.
  const cellByCoord = useMemo(() => {
    const map = new Map();
    zones.forEach((z) => map.set(`${z.x},${z.y}`, z));
    roads.forEach((r) => map.set(`${r.x},${r.y}`, r));
    return map;
  }, [zones, roads]);

  const [focusedCoord, setFocusedCoord] = useState(() => {
    const first = zones[0] ?? roads[0];
    return first ? { x: first.x, y: first.y } : { x: 0, y: 0 };
  });

  const activeCoord = selectedZone ? { x: selectedZone.x, y: selectedZone.y } : focusedCoord;
  const displayedCell = hoveredCell ?? cellByCoord.get(`${activeCoord.x},${activeCoord.y}`);

  // Moves the roving-tabindex focus by (dx, dy), clamped to the grid, and
  // hands real DOM focus to the target tile so screen readers and
  // keyboard-only users land on it.
  function moveFocus(dx, dy) {
    if (!city) return;
    const next = {
      x: Math.min(Math.max(activeCoord.x + dx, 0), city.size - 1),
      y: Math.min(Math.max(activeCoord.y + dy, 0), city.size - 1),
    };
    setFocusedCoord(next);
    requestAnimationFrame(() => {
      const el = gridRef.current?.querySelector(`[data-x="${next.x}"][data-y="${next.y}"]`);
      el?.focus();
    });
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowUp": e.preventDefault(); moveFocus(0, -1); break;
      case "ArrowDown": e.preventDefault(); moveFocus(0, 1); break;
      case "ArrowLeft": e.preventDefault(); moveFocus(-1, 0); break;
      case "ArrowRight": e.preventDefault(); moveFocus(1, 0); break;
      default: break;
    }
  }

  return {
    focusedCoord,
    hoveredCell,
    setHoveredCell,
    displayedCell,
    handleKeyDown,
  };
}
