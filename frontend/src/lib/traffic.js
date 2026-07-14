/**
 * Traffic/congestion utilities — NOT wired to any data source yet. This
 * file exists so that when the backend eventually exposes real
 * congestion data (e.g. a `congestion` field per road, or a separate
 * `/traffic` endpoint), there's already a single, tested place to turn a
 * congestion value into a color, rather than that logic getting invented
 * ad-hoc wherever it's first needed.
 *
 * Deliberately conservative: no fake/random values are generated here.
 * Every function below is a pure transform from an input the backend
 * would provide to a visual output — nothing here invents data.
 */

/**
 * getCongestionColor — maps a 0–1 congestion level to a color along a
 * green → amber → red scale, matching the semantic colors already used
 * elsewhere in the app (positive/warning/negative tokens).
 *
 * @param {number} level - 0 (free-flowing) to 1 (gridlocked)
 * @returns {string} a CSS color
 */
export function getCongestionColor(level) {
  const clamped = Math.max(0, Math.min(1, level));
  if (clamped < 0.4) return "var(--color-positive)";
  if (clamped < 0.75) return "#F5B942"; // matches the amber used for "Happiness"/economy elsewhere
  return "var(--color-negative)";
}

/**
 * getCongestionOpacity — how strongly a congestion overlay should read
 * visually. Kept separate from color so a future renderer can animate
 * opacity (e.g. pulsing on heavy congestion) independently of hue.
 *
 * @param {number} level - 0 to 1
 * @returns {number} 0 to 1
 */
export function getCongestionOpacity(level) {
  const clamped = Math.max(0, Math.min(1, level));
  return 0.15 + clamped * 0.5;
}
