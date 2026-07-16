export default function ChartCard({ title, subtitle, children, actions, accentColor }) {
  return (
    <div className="glass relative rounded-xl border border-border bg-surface p-4 flex flex-col min-h-0 shadow-lg shadow-black/20 overflow-hidden">
      {accentColor ? (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />
      ) : null}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-text-primary">{title}</h3>
          {subtitle ? <p className="text-[11px] text-text-tertiary mt-0.5">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
