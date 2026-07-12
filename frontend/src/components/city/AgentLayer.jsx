/**
 * AgentLayer — placeholder.
 *
 * This exists purely so the dashboard's structure already has a slot for
 * animated households, commuters, and businesses moving across the city
 * grid. When agent simulation data arrives from the backend, it should be
 * possible to implement rendering here without touching CityGrid,
 * ZoneTile, RoadLayer, or any page that renders <CityGrid />.
 *
 * Intentionally renders nothing yet.
 */
export default function AgentLayer({ agents = [] }) {
  return null;
}
