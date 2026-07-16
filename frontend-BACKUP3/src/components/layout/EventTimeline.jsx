import { cn } from "../../lib/cn";
import { getEventType } from "../../lib/eventTypes";

/**
 * EventTimeline — a vertical dotted-line timeline with glowing nodes per
 * event. Reads its icon/color from the shared EVENT_TYPES config (see
 * lib/eventTypes.js) rather than hardcoding per-type logic here, so
 * adding a new event category doesn't require touching this component.
 */
export default function EventTimeline({ events }) {
  if (!events?.length) {
    return (
      <div className="text-sm text-text-tertiary py-10 text-center">
        No events yet. Run the simulation or inject a shock.
      </div>
    );
  }

  return (
    <div className="relative pl-8">
      {/* The connecting line itself */}
      <div
        className="absolute left-[9px] top-2 bottom-2 w-px"
        style={{
          background: "linear-gradient(180deg, var(--color-accent) 0%, rgba(255,255,255,0.12) 15%, rgba(255,255,255,0.12) 100%)",
        }}
      />

      <div className="flex flex-col gap-5">
        {events.map((e, i) => {
          const eventType = getEventType(e.type);
          const Icon = eventType.icon;
          const isHighlighted = e.type === "shock" || e.type === "policy";

          return (
            <div key={e.id} className="relative">
              {/* Node */}
              <div
                className={cn(
                  "absolute -left-8 top-0.5 h-[18px] w-[18px] rounded-full flex items-center justify-center",
                  isHighlighted ? "bg-accent" : "bg-surface-raised border border-border"
                )}
                style={
                  isHighlighted
                    ? { boxShadow: "0 0 0 4px var(--color-accent-soft), 0 0 16px rgba(225,29,72,0.7)" }
                    : i === 0
                    ? { boxShadow: "0 0 0 4px rgba(255,255,255,0.06)" }
                    : undefined
                }
              >
                <Icon size={10} className={isHighlighted ? "text-white" : "text-text-tertiary"} />
              </div>

              {/* Card */}
              <div
                className={cn(
                  "glass rounded-lg px-3.5 py-2.5 border",
                  isHighlighted ? "border-accent/30 bg-accent-soft" : "border-border-soft bg-surface"
                )}
              >
                <p className="text-sm text-text-primary leading-snug">{e.label}</p>
                <p className="text-[10px] font-mono text-text-tertiary mt-1">
                  tick {String(e.tick).padStart(5, "0")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
