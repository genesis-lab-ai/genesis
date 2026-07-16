/**
 * DetailRow — a single label/value pair, styled consistently wherever a
 * "detail panel" needs to show one. Pulled out of DashboardPage and
 * CityPage, which both hand-rolled slightly different markup for the same
 * pattern before this.
 */
export default function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border-soft last:border-b-0">
      <span className="text-[11px] text-text-tertiary">{label}</span>
      <span className="text-xs text-text-primary font-mono">{value}</span>
    </div>
  );
}
