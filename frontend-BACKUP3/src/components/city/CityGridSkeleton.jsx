/**
 * CityGridSkeleton — shown while city data is loading, in place of a
 * generic spinner. A faint ghost grid in roughly the right shape makes
 * the transition to real data feel like the city "arriving" rather than
 * a jarring swap from an unrelated loading screen to a full grid.
 *
 * Deliberately cheap: a fixed-size placeholder grid, not driven by any
 * real data (there isn't any yet) — this is pure loading-state UI.
 */
export default function CityGridSkeleton() {
  const rows = 12;
  const cols = 18;

  return (
    <div className="h-full flex items-center justify-center overflow-hidden blueprint-grid p-6">
      <div
        className="grid gap-px opacity-40"
        style={{
          gridTemplateColumns: `repeat(${cols}, 22px)`,
          gridTemplateRows: `repeat(${rows}, 22px)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div
            key={i}
            className="rounded-[2px] bg-white/5 animate-pulse"
            style={{ animationDelay: `${(i % 12) * 80}ms`, animationDuration: "1.6s" }}
          />
        ))}
      </div>
    </div>
  );
}
