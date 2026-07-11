import { HiOutlineBolt, HiOutlineCog6Tooth } from "react-icons/hi2";
import { cn } from "../../lib/cn";

export default function EventLog({ events, compact = false }) {
  if (!events?.length) {
    return (
      <div className="text-xs text-text-tertiary py-4 text-center">
        No events yet. Run the simulation or inject a shock.
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", compact ? "gap-1" : "gap-1.5")}>
      {events.map((e) => (
        <div
          key={e.id}
          className={cn(
            "glass flex items-start gap-2 rounded-lg px-2.5 py-2 border",
            e.type === "shock"
              ? "border-accent/30 bg-accent-soft"
              : "border-border-soft bg-surface-raised"
          )}
        >
          {e.type === "shock" ? (
            <HiOutlineBolt size={14} className="text-accent mt-0.5 shrink-0" />
          ) : (
            <HiOutlineCog6Tooth size={14} className="text-text-tertiary mt-0.5 shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-xs text-text-primary leading-snug">{e.label}</p>
            <p className="text-[10px] font-mono text-text-tertiary mt-0.5">tick {String(e.tick).padStart(5, "0")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
