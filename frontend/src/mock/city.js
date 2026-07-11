/**
 * Mock city data — isolated here so the rest of the app consumes it
 * exactly the way it will eventually consume real backend data. When the
 * FastAPI/WebSocket backend is wired in, callers should be able to swap
 * `generateCity()` for a fetch/subscription without changing any
 * component's props contract.
 *
 * Shape:
 * {
 *   size: number,
 *   zones: Zone[],   // everything EXCEPT roads
 *   roads: Road[],   // road cells, kept separate from zones on purpose
 * }
 *
 * Zone:
 * { id, type, population, rent, employment, pollution, happiness, x, y }
 *
 * Road:
 * { id, type: "road", x, y }
 */

export const ZONE_TYPES = [
  "residential",
  "commercial",
  "industrial",
  "park",
  "mixed",
  "road",
];

export const ZONE_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  park: "Park",
  mixed: "Mixed use",
  road: "Road",
};

// mulberry32 — small deterministic PRNG so layout is stable across reloads.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Layout pass — deliberately kept as one single, untouched rand() stream
 * consumed in a fixed interleaved order (type, then rent, then
 * employment, then congestion). This exact call sequence is load-bearing:
 * it's what determines every cell's TYPE, which is the only thing that
 * affects rendered color. Do not reorder or add calls inside this
 * function — see generateCity below for how to add new fields safely.
 */
function generateLayout(size, seed) {
  const rand = mulberry32(seed);
  const cells = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let type;

      if (x % 4 === 0 || y % 4 === 0) {
        type = "road";
      } else {
        const r = rand();
        const cx = size / 2;
        const cy = size / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) / (size / 2);

        if (dist < 0.25) {
          type = r < 0.7 ? "commercial" : "mixed";
        } else if (dist < 0.6) {
          type = r < 0.55 ? "residential" : r < 0.8 ? "mixed" : "park";
        } else {
          type = r < 0.4 ? "residential" : r < 0.7 ? "industrial" : "park";
        }
      }

      cells.push({
        id: `${x}-${y}`,
        x,
        y,
        type,
        rent: type === "road" ? 0 : Math.round(400 + rand() * 1600),
        employment: type === "commercial" || type === "industrial"
          ? Math.round(rand() * 400)
          : Math.round(rand() * 40),
        congestion: type === "road" ? Math.round(rand() * 100) : 0,
      });
    }
  }

  return cells;
}

export function generateCity(size = 16, seed = 42) {
  const cells = generateLayout(size, seed);

  // Second, independent PRNG stream for the new attribute fields
  // (population, pollution, happiness). Deliberately NOT drawn from the
  // layout stream above — since that stream's call count per cell is
  // load-bearing for visual output, any new field must come from its own
  // stream so it can never shift another cell's type/color.
  const attrRand = mulberry32(seed + 1);

  const zones = [];
  const roads = [];

  for (const cell of cells) {
    if (cell.type === "road") {
      roads.push({ id: cell.id, type: "road", x: cell.x, y: cell.y });
      continue;
    }

    zones.push({
      id: cell.id,
      type: cell.type,
      x: cell.x,
      y: cell.y,
      rent: cell.rent,
      employment: cell.employment,
      population: cell.type === "residential" || cell.type === "mixed"
        ? Math.round(200 + attrRand() * 800)
        : Math.round(attrRand() * 60),
      pollution: cell.type === "industrial" ? Math.round(30 + attrRand() * 60) : Math.round(attrRand() * 30),
      happiness: cell.type === "park" ? Math.round(65 + attrRand() * 30) : Math.round(40 + attrRand() * 45),
    });
  }

  return { size, zones, roads };
}
