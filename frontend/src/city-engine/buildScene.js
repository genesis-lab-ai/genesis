/**
 * buildScene — normalizes raw simulation data (city/zones/roads) into the
 * SceneData shape every renderer consumes (see sceneTypes.js).
 *
 * This is the ONE place simulation data gets transformed for rendering
 * purposes. Today it's a thin passthrough — the data Genesis's backend
 * already provides happens to be renderer-ready. But its existence is
 * the architectural point: a future renderer needing a different
 * internal representation (e.g. zones grouped by type for GPU
 * instancing in a Three.js renderer, or a spatial index for frustum
 * culling) extends THIS function, rather than each renderer inventing
 * its own copy of "how do I turn simulation data into something I can
 * draw." One seam, not N.
 *
 * Deliberately a pure function: no React, no DOM, no rendering
 * concerns. Fully testable in isolation, and safe for any future
 * renderer (including non-DOM ones like a Three.js/WebGL renderer) to
 * call directly.
 */
export function buildScene({ city, zones = [], roads = [] }) {
  if (!city) return null;

  return {
    size: city.size,
    zones,
    roads,
  };
}
