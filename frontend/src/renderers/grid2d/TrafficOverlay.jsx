/**
 * TrafficOverlay — placeholder layer for future road congestion
 * visualization, following the exact same pattern AgentLayer already
 * established for future agent rendering.
 *
 * Prop contract (for whoever wires this up later):
 *   congestionByRoadId?: Record<string, number>
 *     A map from road id ("x-y", matching RoadTile's road.id) to a
 *     congestion level from 0 (free-flowing) to 1 (gridlocked).
 *
 * When that data exists, implementing this layer means:
 *   1. For each road id in `congestionByRoadId`, render a tile positioned
 *      the same way RoadTile is (gridColumnStart/gridRowStart from the
 *      id's x/y) with a color from getCongestionColor() and opacity from
 *      getCongestionOpacity() (see lib/traffic.js).
 *   2. Nothing else needs to change — Grid2DRenderer already renders this
 *      layer between RoadLayer and the zones, and it already receives
 *      the same grid sizing/positioning context RoadLayer does.
 *
 * Intentionally renders nothing yet — there is no real congestion data
 * to show, and this file must not invent any.
 */
export default function TrafficOverlay({ congestionByRoadId }) {
  return null;
}
