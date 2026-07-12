import { useMemo, useState } from "react";
import EventTimeline from "../components/layout/EventTimeline";
import EventFeedCard from "../components/layout/EventFeedCard";
import FilterChip from "../components/layout/FilterChip";
import EmptyState from "../components/ui/EmptyState";
import { useSimulationContext } from "../lib/simulationContext";
import { EVENT_TYPES } from "../lib/eventTypes";
import { MOCK_CITY_EVENTS } from "../mock/events";
import { HiOutlineInboxStack } from "react-icons/hi2";

const FEED_TYPES = ["policy", "warning", "growth", "economy", "environment", "transportation"];

/**
 * EventsPage — two sections, deliberately kept distinct rather than
 * merged into one feed:
 *
 * 1. Simulation Log — the REAL event history from useSimulation (tick
 *    resets, injected shocks). Unchanged behavior from before this pass.
 *
 * 2. City Feed — a preview of the richer event taxonomy the simulation
 *    engine will eventually emit (policy/warning/growth/economy/
 *    environment/transportation). Backed by mock/events.js only.
 *
 * Keeping these visually separate (rather than interleaving mock and
 * real events in one list) avoids the feed ever misrepresenting mock
 * data as something that actually happened in this run.
 */
export default function EventsPage() {
  const sim = useSimulationContext();
  const [activeTypes, setActiveTypes] = useState(new Set(FEED_TYPES));

  const toggleType = (type) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  const filteredFeed = useMemo(
    () => MOCK_CITY_EVENTS.filter((e) => activeTypes.has(e.type)),
    [activeTypes]
  );

  return (
    <div className="city-lights h-full overflow-y-auto p-6">
      <div className="grid grid-cols-2 gap-8 max-w-6xl">
        {/* Simulation Log — real data */}
        <section>
          <h1 className="font-display text-lg text-text-primary mb-1">Simulation Log</h1>
          <p className="text-xs text-text-tertiary mb-6">
            Live event history for this run — resets and policy shocks.
          </p>
          <EventTimeline events={sim.events} />
        </section>

        {/* City Feed — mock preview of the future event taxonomy */}
        <section>
          <h2 className="font-display text-lg text-text-primary mb-1">City Feed</h2>
          <p className="text-xs text-text-tertiary mb-4">
            Preview of upcoming event categories. Illustrative data only.
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {FEED_TYPES.map((type) => (
              <FilterChip
                key={type}
                label={EVENT_TYPES[type].label}
                icon={EVENT_TYPES[type].icon}
                color={EVENT_TYPES[type].color}
                active={activeTypes.has(type)}
                onClick={() => toggleType(type)}
              />
            ))}
          </div>

          {filteredFeed.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {filteredFeed.map((event) => (
                <EventFeedCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={HiOutlineInboxStack}
              title="No events match these filters"
              description="Select at least one category above to see feed items."
            />
          )}
        </section>
      </div>
    </div>
  );
}
