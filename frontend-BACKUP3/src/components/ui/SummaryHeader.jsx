/**
 * SummaryHeader — page-level header: title, subtitle, and an optional row
 * of MetricBadges giving a quick overview before the user scrolls into
 * detail. Meant to be reused at the top of any data-heavy page (currently
 * Statistics; likely Agent Inspector and others later).
 */
export default function SummaryHeader({ title, subtitle, badges, actions }) {
  return (
    <div className="mb-5">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="font-display text-lg text-text-primary">{title}</h1>
          {subtitle ? <p className="text-xs text-text-tertiary mt-0.5">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
      {badges?.length ? (
        <div className="flex items-center gap-2 flex-wrap mt-4">{badges}</div>
      ) : null}
    </div>
  );
}
