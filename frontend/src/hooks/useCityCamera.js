import { useState } from "react";

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2;
const STEP = 0.2;

/**
 * useCityCamera — owns CameraState (see city-engine/sceneTypes.js) for
 * the city view. Evolved from the previous useCityZoom hook: same real,
 * working zoom behavior as before (buttons, not pinch/scroll — that
 * remains a deliberate scope boundary, not an oversight), but now
 * returns the full CameraState shape instead of just a bare zoom number.
 *
 * Why bundle `pan` and `rotation` in here now even though neither is
 * interactive yet: the point is that CityView and every renderer
 * consume ONE `camera` object. When pan or rotation eventually become
 * real (click-drag panning, a future 3D orbit control), this hook grows
 * to produce real values for them — nothing that reads `camera` from
 * here needs to change shape-wise, only what's inside it.
 *
 * `pan` stays {x:0, y:0} and `rotation` stays 0 — today's panning is
 * native browser scroll on the renderer's container, not a transform
 * this hook drives, and rotation has no meaning for a 2D grid. Both are
 * genuinely inert right now; this hook does not pretend otherwise.
 */
export function useCityCamera(initialZoom = 1) {
  const [zoom, setZoom] = useState(initialZoom);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + STEP).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - STEP).toFixed(2)));
  const resetZoom = () => setZoom(initialZoom);

  return {
    camera: {
      zoom,
      pan: { x: 0, y: 0 }, // reserved — see doc comment above
      rotation: 0, // reserved — see doc comment above
    },
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn: zoom < MAX_ZOOM,
    canZoomOut: zoom > MIN_ZOOM,
  };
}
