/**
 * PolicyCard — wraps a single policy control (slider/toggle/segmented
 * control) with a consistent icon/title/description header and an
 * optional projected-impact hint. Purely presentational — the actual
 * control and its state live in the page that uses this.
 */
export default function PolicyCard({ icon: Icon, title, description, children, impact }) {
  return (
    <div className="glass rounded-xl border border-border bg-surface p-4 shadow-lg shadow-black/20">
      <div className="flex items-start gap-3 mb-4">
        {Icon ? (
          <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-accent/25 to-data/10 border border-white/10 flex items-center justify-center">
            <Icon size={17} className="text-accent" />
          </div>
        ) : null}
        <div>
          <p className="text-sm text-text-primary">{title}</p>
          <p className="text-[11px] text-text-tertiary mt-0.5">{description}</p>
        </div>
      </div>

      {children}

      {impact ? (
        <p className="text-[11px] text-text-tertiary mt-3 pt-3 border-t border-border-soft font-mono">
          {impact}
        </p>
      ) : null}
    </div>
  );
}
