/**
 * SectionHeader — the small uppercase eyebrow-style label used at the top
 * of panels ("City metrics", "Zone inspector", etc.). Previously each
 * panel wrote this markup by hand; now there's one place that owns its
 * type scale, tracking, and color if it ever needs to change.
 */
export default function SectionHeader({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-2 px-1">
      <h2 className="text-[11px] uppercase tracking-wider text-text-tertiary">{children}</h2>
      {action}
    </div>
  );
}
