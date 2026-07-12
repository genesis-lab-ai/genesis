import { HiOutlineBolt, HiOutlineCog6Tooth } from "react-icons/hi2";
import { cn } from "../../lib/cn";

/**
 * EventTimeline — a vertical dotted-line timeline with glowing nodes per
 * event. Pulled from the reference boards' dotted-line-with-lit-nodes
 * pattern, applied to actual simulation event history rather than
 * decoration.
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
          const isShock = e.type === "shock";
          return (
            <div key={e.id} className="relative">
              {/* Node */}
              <div
                className={cn(
                  "absolute -left-8 top-0.5 h-[18px] w-[18px] rounded-full flex items-center justify-center",
                  isShock ? "bg-accent" : "bg-surface-raised border border-border"
                )}
                style={
                  isShock
                    ? { boxShadow: "0 0 0 4px var(--color-accent-soft), 0 0 16px rgba(225,29,72,0.7)" }
                    : i === 0
                    ? { boxShadow: "0 0 0 4px rgba(255,255,255,0.06)" }
                    : undefined
                }
              >
                {isShock ? (
                  <HiOutlineBolt size={10} className="text-white" />
                ) : (
                  <HiOutlineCog6Tooth size={9} className="text-text-tertiary" />
                )}
              </div>

              {/* Card */}
              <div
                className={cn(
                  "glass rounded-lg px-3.5 py-2.5 border",
                  isShock ? "border-accent/30 bg-accent-soft" : "border-border-soft bg-surface"
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
