import { getEventType } from "../../lib/eventTypes";

/**
 * EventFeedCard — a single card in the City Feed. Distinct from
 * EventTimeline's dotted-line-node style on purpose: this is meant to
 * read like a news feed / mission log entry (headline + detail + type
 * badge), which is a different reading pattern than a chronological
 * timeline, per the "mission log / city news feed" brief.
 */
export default function EventFeedCard({ event }) {
  const type = getEventType(event.type);
  const Icon = type.icon;

  return (
    <div className="glass rounded-lg border border-border bg-surface p-4 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ backgroundColor: `${type.color}20`, color: type.color }}
        >
          <Icon size={11} />
          {type.label}
        </div>
        <span className="text-[10px] font-mono text-text-tertiary shrink-0">
          tick {String(event.tick).padStart(5, "0")}
        </span>
      </div>
      <p className="text-sm text-text-primary leading-snug mb-1">{event.title}</p>
      <p className="text-[11px] text-text-tertiary leading-relaxed">{event.detail}</p>
    </div>
  );
}
