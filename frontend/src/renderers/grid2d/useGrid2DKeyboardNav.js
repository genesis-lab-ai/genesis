import { useState } from "react";

/**
 * useGrid2DKeyboardNav — owns the 2D grid renderer's roving-tabindex
 * state and arrow-key navigation. This is deliberately grid2d-internal,
 * not part of the renderer-agnostic contract: "which DOM element has
 * keyboard focus" is a concept specific to a DOM-based renderer. A
 * future Three.js renderer would handle "what's focused" completely
 * differently (there's no DOM grid to move a roving tabindex around) and
 * would not use this hook at all.
 *
 * Standard grid-widget keyboard pattern: only one cell is ever a tab
 * stop; arrow keys move a "focused" coordinate around within the grid;
 * Tab moves focus out of the grid entirely.
 */
export function useGrid2DKeyboardNav({ scene, selectedCoord, gridRef }) {
  const [focusedCoord, setFocusedCoord] = useState(() => {
    const first = scene?.zones[0] ?? scene?.roads[0];
    return first ? { x: first.x, y: first.y } : { x: 0, y: 0 };
  });

  const activeCoord = selectedCoord ?? focusedCoord;

  // Moves the roving-tabindex focus by (dx, dy), clamped to the grid, and
  // hands real DOM focus to the target tile so screen readers and
  // keyboard-only users land on it.
  function moveFocus(dx, dy) {
    if (!scene) return;
    const next = {
      x: Math.min(Math.max(activeCoord.x + dx, 0), scene.size - 1),
      y: Math.min(Math.max(activeCoord.y + dy, 0), scene.size - 1),
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

  return { focusedCoord, activeCoord, handleKeyDown };
}
