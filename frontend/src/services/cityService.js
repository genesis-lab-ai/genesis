const API_BASE = "http://127.0.0.1:8000";

export async function getCity() {
  const response = await fetch(`${API_BASE}/city`);

  if (!response.ok) {
    throw new Error("Failed to fetch city.");
  }

  const data = await response.json();

  return adaptCity(data);
}

function adaptCity(data) {
  const size = data.city.rows;

  const zones = data.zones.map(zone => ({
    id: `${zone.x}-${zone.y}`,
    type: zone.type.toLowerCase(),

    x: zone.x,
    y: zone.y,

    population: zone.population,
    employment: zone.employment,
    pollution: zone.pollution,
    happiness: zone.happiness,

    rent: Math.round(zone.land_value),
  }));

  const roads = [];

  return {
    size,
    zones,
    roads,
  };
}