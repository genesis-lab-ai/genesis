/**
 * CitySkyline — a silhouetted building skyline with a glowing horizon and
 * a faded water reflection underneath, directly modeled on the dusk
 * skyline reference photo (dark buildings, crimson glow, reflected lights).
 *
 * Deterministic (fixed array, not random per render) so the composition
 * is stable across reloads — same reasoning as generateCity's seeded PRNG.
 */

// [widthPx, heightPx, hasLitWindows]
const BUILDINGS = [
  [28, 90, false], [40, 140, true], [24, 70, false], [55, 190, true],
  [32, 110, false], [46, 220, true], [26, 85, false], [60, 260, true],
  [34, 130, false], [42, 170, true], [28, 95, false], [50, 210, true],
  [30, 100, false], [38, 155, true], [64, 240, true], [30, 90, false],
  [44, 180, true], [26, 75, false], [36, 145, false], [52, 200, true],
  [30, 105, false], [40, 165, true], [24, 80, false], [46, 195, true],
];

function Building({ width, height, lit, seed }) {
  // Deterministic pseudo-random window pattern from seed, not Math.random(),
  // so the skyline doesn't shift between renders/hydration.
  const windows = [];
  if (lit) {
    const cols = Math.max(2, Math.floor(width / 12));
    const rows = Math.max(3, Math.floor(height / 16));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const n = (seed * 31 + r * 7 + c * 13) % 10;
        if (n > 6) windows.push(`${r}-${c}`);
      }
    }
  }

  return (
    <div
      className="relative shrink-0"
      style={{ width, height, backgroundColor: "#0B0710" }}
    >
      {windows.length > 0 && (
        <div
          className="absolute inset-0 grid gap-[3px] p-[3px]"
          style={{
            gridTemplateColumns: `repeat(${Math.max(2, Math.floor(width / 12))}, 1fr)`,
          }}
        >
          {Array.from({ length: Math.max(2, Math.floor(width / 12)) * Math.max(3, Math.floor(height / 16)) }).map((_, i) => {
            const r = Math.floor(i / Math.max(2, Math.floor(width / 12)));
            const c = i % Math.max(2, Math.floor(width / 12));
            const isLit = windows.includes(`${r}-${c}`);
            return (
              <div
                key={i}
                className="rounded-[1px]"
                style={{
                  backgroundColor: isLit ? "rgba(225,29,72,0.85)" : "transparent",
                  boxShadow: isLit ? "0 0 4px rgba(225,29,72,0.6)" : "none",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CitySkyline() {
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none" aria-hidden="true">
      {/* Glowing horizon band, sits behind the skyline */}
      <div
        className="absolute inset-x-0 bottom-[140px] h-24"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(225,29,72,0.35) 60%, rgba(225,29,72,0.15))",
          filter: "blur(12px)",
        }}
      />

      {/* Skyline silhouette */}
      <div className="relative flex items-end justify-center gap-[3px] h-[260px] overflow-hidden opacity-90">
        {BUILDINGS.map((b, i) => (
          <Building key={i} width={b[0]} height={b[1]} lit={b[2]} seed={i + 1} />
        ))}
      </div>

      {/* Reflection — flipped, faded, blurred, echoing the photo's water */}
      <div
        className="relative flex items-start justify-center gap-[3px] h-[100px] overflow-hidden opacity-25"
        style={{
          transform: "scaleY(-1)",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent)",
          filter: "blur(1.5px)",
        }}
      >
        {BUILDINGS.map((b, i) => (
          <Building key={i} width={b[0]} height={Math.min(b[1], 100)} lit={b[2]} seed={i + 1} />
        ))}
      </div>
    </div>
  );
}
