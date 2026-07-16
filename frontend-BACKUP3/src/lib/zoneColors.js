/**
 * Shared zone color lookup — the single source of truth for zone fill
 * colors. Kept as real hex (not CSS var() references) because callers
 * need to append alpha for glow/fill effects, and CSS custom properties
 * can't have a hex alpha suffix appended to them as a string (that
 * produces invalid CSS the browser silently drops).
 *
 * These intentionally mirror the --color-zone-* tokens in index.css.
 * If the palette changes there, mirror the change here too.
 */
export const ZONE_COLOR_HEX = {
  residential: "#60A5FA",
  commercial: "#E11D48",
  industrial: "#FB7185",
  park: "#4ADE80",
  mixed: "#C084FC",
  road: "#3A3548",
};
