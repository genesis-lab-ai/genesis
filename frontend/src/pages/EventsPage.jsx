import EventTimeline from "../components/layout/EventTimeline";
import { useSimulationContext } from "../lib/simulationContext";

export default function EventsPage() {
  const sim = useSimulationContext();
  return (
    <div className="city-lights h-full overflow-y-auto p-6 max-w-2xl">
      <h1 className="font-display text-lg text-text-primary mb-1">Event log</h1>
      <p className="text-xs text-text-tertiary mb-6">
        Full history of simulation events and policy shocks for this run.
      </p>
      <EventTimeline events={sim.events} />
    </div>
  );
}
