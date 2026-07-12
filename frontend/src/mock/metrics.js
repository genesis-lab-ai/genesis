/**
 * Mock metrics — used until the FastAPI/WebSocket backend is wired in.
 * Each generator takes `ticks` so charts can extend live as the sim runs.
 */

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateTimeSeries(ticks, { base, drift = 0, volatility = 0.05, seed = 7 }) {
  const rand = seeded(seed);
  const points = [];
  let value = base;
  for (let t = 0; t <= ticks; t++) {
    value = value + drift + (rand() - 0.5) * base * volatility;
    value = Math.max(0, value);
    points.push({ tick: t, value: Math.round(value) });
  }
  return points;
}

export const METRIC_DEFS = {
  population: { label: "Population", base: 42000, drift: 12, volatility: 0.01, color: "var(--color-data)", unit: "" },
  employment: { label: "Employment", base: 68, drift: 0.05, volatility: 0.02, color: "var(--color-positive)", unit: "%" },
  happiness: { label: "Happiness", base: 74, drift: 0.03, volatility: 0.02, color: "#F5B942", unit: "/100" },
  pollution: { label: "Pollution Index", base: 31, drift: -0.02, volatility: 0.05, color: "#9B7BC7", unit: "" },
  traffic: { label: "Traffic Load", base: 54, drift: 0.1, volatility: 0.06, color: "var(--color-negative)", unit: "" },
  landValue: { label: "Land Value", base: 1150, drift: 2, volatility: 0.03, color: "var(--color-accent)", unit: "$" },
};

export function zoneDistribution(zones) {
  const counts = {};
  zones.forEach((z) => {
    counts[z.type] = (counts[z.type] || 0) + 1;
  });
  return Object.entries(counts).map(([type, count]) => ({ type, count }));
}
