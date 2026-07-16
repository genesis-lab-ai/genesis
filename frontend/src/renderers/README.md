# Rendering architecture

Genesis's city view is built around a **renderer abstraction**: the rest of
the app (pages, Dashboard, metrics, policies, agent inspector, events,
simulation state) talks to `components/city/CityView.jsx`, which knows
nothing about *how* a city gets drawn — only that it hands off normalized
scene/camera data to whichever renderer is currently active, and receives
selection/hover callbacks back.

```
Page (DashboardPage / CityPage)
  │  city, zones, roads, selectedZone, onSelectZone, shockedZoneIds
  ▼
CityView                              (components/city/CityView.jsx)
  │  • builds SceneData  (city-engine/buildScene.js)
  │  • owns CameraState  (hooks/useCityCamera.js)
  │  • owns legend / quick-info / zoom-button chrome
  │  • looks up the active renderer (renderers/index.js)
  ▼
<ActiveRenderer scene camera selectedCoord shockedIds onSelectCell onHoverCell />
  │
  ├── renderers/grid2d/Grid2DRenderer.jsx   (default, production today)
  ├── renderers/debug/DebugRenderer.jsx     (proves the abstraction works)
  └── renderers/threejs/…                   (future — not built yet)
```

## The contract

Every renderer accepts exactly the `RendererProps` shape documented as
JSDoc typedefs in `city-engine/sceneTypes.js`:

- `scene` — `{ size, zones, roads }`, built by `city-engine/buildScene.js`.
- `camera` — `{ zoom, pan, rotation }`. Only `zoom` is interactive today;
  `pan`/`rotation` are reserved fields for future panning/orbit controls —
  see the doc comment in `hooks/useCityCamera.js` for why they're included
  now even though inert.
- `selectedCoord` — `{x, y} | null`. Renderers compare by coordinate, not
  by id or object identity.
- `shockedIds` — transient policy-shock animation state, kept separate
  from `scene` because it's an effect, not a description of the city.
- `onSelectCell(cell)` / `onHoverCell(cell | null)` — the only two things
  a renderer needs to report upward. How selection/hover is *detected* is
  entirely up to the renderer (DOM click/focus for grid2d; raycasting for
  a future 3D renderer).

## Adding a new renderer

1. Build a component under `renderers/<name>/` accepting `RendererProps`.
2. Register it in `renderers/index.js`.
3. Nothing else changes. `CityView`, the other renderers, and every page
   that uses `CityView` are unaffected.

## What's NOT built yet (by design, per this round's scope)

- No Three.js/WebGL renderer — this round is architecture only.
- No pinch/scroll-to-zoom or click-drag panning — zoom is button-driven
  today; panning is native browser scroll. Both are real, working
  features, just not the fuller gesture-based versions a camera system
  would eventually want.
- No real asset loading — see `src/assets/city/manifest.js` and its
  category folders for the reserved (empty) structure.
