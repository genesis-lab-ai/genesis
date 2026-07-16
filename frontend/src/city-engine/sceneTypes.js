/**
 * sceneTypes.js — the rendering interface contract, expressed as JSDoc
 * typedefs rather than prose documentation, so editors/tooling can
 * surface it at the point of use even though this codebase is plain JS,
 * not TypeScript.
 *
 * ANY renderer (the current 2D grid, a future Three.js/WebGL renderer,
 * the debug renderer, or anything else registered in renderers/index.js)
 * must accept exactly the RendererProps shape below and nothing else.
 * CityView (components/city/CityView.jsx) is the only thing that
 * constructs these props; no renderer should reach outside them for
 * additional data (e.g. fetching from a service directly) — that
 * would defeat the point of the abstraction.
 *
 * @typedef {Object} Zone
 * @property {string} id
 * @property {string} type - "residential" | "commercial" | "industrial" | "mixed" | "park"
 * @property {number} x
 * @property {number} y
 * @property {number} [population]
 * @property {number} [employment]
 * @property {number} [pollution]
 * @property {number} [happiness]
 * @property {number} [rent]
 *
 * @typedef {Object} Road
 * @property {string} id
 * @property {"road"} type
 * @property {number} x
 * @property {number} y
 *
 * @typedef {Object} SceneData
 * @property {number} size - grid dimensions (size x size)
 * @property {Zone[]} zones
 * @property {Road[]} roads
 *
 * @typedef {Object} CameraState
 * @property {number} zoom - the only camera dimension actually
 *   interactive today.
 * @property {{x: number, y: number}} pan - RESERVED. Not yet driven by
 *   any input; today's panning is native browser scroll on the
 *   renderer's container. A future click-drag or 3D camera pan would
 *   populate this instead, and callers of `camera` wouldn't need to
 *   change how they read it.
 * @property {number} rotation - RESERVED. Meaningless for the current
 *   2D renderer; reserved for a future 3D renderer's orbit/yaw angle.
 *
 * @typedef {Object} RendererProps
 * @property {SceneData} scene
 * @property {CameraState} camera
 * @property {{x: number, y: number}|null} selectedCoord - the
 *   currently selected cell's coordinates, or null. Renderers compare
 *   by coordinate, not by id/object identity — keeps the contract
 *   independent of any particular id scheme.
 * @property {string[]} shockedIds - ids of zones currently animating a
 *   policy-shock reaction. Transient UI state, kept separate from
 *   `scene` because it's an effect, not a description of the city.
 * @property {(cell: Zone|Road) => void} onSelectCell - call when the
 *   user selects a cell, regardless of input method (click, tap, future
 *   3D raycasting) or whether it's a zone or a road.
 * @property {(cell: Zone|Road|null) => void} onHoverCell - call when
 *   the user's attention moves to a cell (mouse hover, keyboard focus,
 *   future 3D raycasting) or leaves one (null). Drives CityView's
 *   quick-info readout — renderers don't need to know that; they just
 *   report attention changes.
 */

export {};
