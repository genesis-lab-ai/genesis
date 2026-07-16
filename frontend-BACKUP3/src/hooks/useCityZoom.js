import { useState } from "react";

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2;
const STEP = 0.2;

/**
 * useCityZoom — small, self-contained zoom-level state for the city map.
 *
 * This is a real, working zoom (buttons, not pinch/scroll) rather than
 * just "readiness" — it's a low-risk, backend-independent way to
 * concretely improve map readability at different sizes today. The
 * bigger asks (pinch-to-zoom, click-and-drag panning, a camera system)
 * are intentionally NOT built here: CityGrid's map area already scrolls
 * natively via `overflow-auto` (that's the panning mechanism), and this
 * hook's `scale` value is applied as a CSS transform on the grid — which
 * is the same extension point a future pinch/scroll handler would hook
 * into, it would just call `setZoom` from a different input source.
 */
export function useCityZoom(initial = 1) {
  const [zoom, setZoom] = useState(initial);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + STEP).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - STEP).toFixed(2)));
  const resetZoom = () => setZoom(initial);

  return {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn: zoom < MAX_ZOOM,
    canZoomOut: zoom > MIN_ZOOM,
  };
}
