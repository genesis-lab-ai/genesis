import { ZONE_COLOR_HEX } from "../../lib/zoneColors";

/**
 * ZONE_ASSET_MANIFEST — forward-looking registry mapping each zone/road
 * type to the visual assets that represent it, across all current and
 * future renderers.
 *
 * Today only `color` is populated (used by Grid2DRenderer's tiles).
 * `model` and `category` are reserved for when a future 3D renderer
 * needs to know which asset file represents a given zone type — at that
 * point, this is the one file to update, not every place a zone type is
 * currently color-mapped.
 *
 * `color` is imported from lib/zoneColors.js rather than redefined here
 * — one source of truth for the current palette. This manifest adds the
 * forward-looking fields on top, it doesn't fork the color data.
 *
 * `category` corresponds to a folder under src/assets/city/ — see the
 * README in each for what's expected to live there once real assets
 * exist (buildings/, roads/, trees/, parks/, landmarks/, vehicles/).
 */
export const ZONE_ASSET_MANIFEST = {
  residential: { color: ZONE_COLOR_HEX.residential, category: "buildings", model: null },
  commercial: { color: ZONE_COLOR_HEX.commercial, category: "buildings", model: null },
  industrial: { color: ZONE_COLOR_HEX.industrial, category: "buildings", model: null },
  mixed: { color: ZONE_COLOR_HEX.mixed, category: "buildings", model: null },
  park: { color: ZONE_COLOR_HEX.park, category: "parks", model: null },
  road: { color: ZONE_COLOR_HEX.road, category: "roads", model: null },
};

export function getAssetDescriptor(zoneType) {
  return ZONE_ASSET_MANIFEST[zoneType] ?? null;
}
