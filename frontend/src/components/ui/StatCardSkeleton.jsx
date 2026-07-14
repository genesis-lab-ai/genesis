/**
 * StatCardSkeleton — placeholder shaped like StatCard, shown in the
 * metrics panel while data loads. Paired with CityGridSkeleton so the
 * whole Dashboard loading state roughly matches the final layout instead
 * of jumping from a centered spinner into a completely different shape.
 */
export default function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-3.5 h-[86px]">
      <div className="h-2.5 w-16 rounded bg-white/5 animate-pulse mb-3" />
      <div className="h-5 w-20 rounded bg-white/5 animate-pulse" />
    </div>
  );
}
