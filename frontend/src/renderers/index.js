import Grid2DRenderer from "./grid2d/Grid2DRenderer";
import DebugRenderer from "./debug/DebugRenderer";

/**
 * renderers/index.js — the renderer registry. This is the "Rendering
 * Abstraction" the app depends on: CityView looks up a renderer by name
 * here instead of importing Grid2DRenderer (or any specific renderer)
 * directly.
 *
 * Every entry's component must accept exactly the RendererProps shape
 * documented in city-engine/sceneTypes.js — that's the actual contract;
 * this file is just where implementations register themselves against
 * it.
 *
 * Adding a future Three.js renderer means:
 *   1. Build renderers/threejs/ThreeRenderer.jsx implementing
 *      RendererProps.
 *   2. Add one line here: `threejs: { component: ThreeRenderer, label: "3D (WebGL)" }`.
 *   3. Nothing else in the app changes — CityView, both existing
 *      renderers, and every page stay exactly as they are.
 */
export const RENDERER_REGISTRY = {
  grid2d: { component: Grid2DRenderer, label: "2D Grid" },
  debug: { component: DebugRenderer, label: "Debug" },
  // threejs: { component: ThreeRenderer, label: "3D (WebGL)" }, — future
};

export const DEFAULT_RENDERER = "grid2d";

export function getRenderer(name) {
  return RENDERER_REGISTRY[name]?.component ?? RENDERER_REGISTRY[DEFAULT_RENDERER].component;
}
