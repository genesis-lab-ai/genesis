import { cn } from "../../lib/cn";

const STATUS_STYLES = {
  Stable: "text-positive bg-positive/10 border-positive/25",
  Active: "text-positive bg-positive/10 border-positive/25",
  Hiring: "text-positive bg-positive/10 border-positive/25",
  "En route": "text-data bg-data-soft border-data/25",
  Relocating: "text-accent bg-accent-soft border-accent/25",
  Downsizing: "text-negative bg-negative/10 border-negative/25",
};

/**
 * AgentCard — one row in the Agent Inspector list. Purely presentational,
 * renders whatever agent object it's given (see mock/agents.js for the
 * current shape); a real backend agent record can replace the mock data
 * source without this component changing.
 */
export default function AgentCard({ agent }) {
  const statusClass = STATUS_STYLES[agent.status] ?? "text-text-tertiary bg-surface-raised border-border";

  return (
    <div className="glass flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3 hover:border-white/20 transition-colors">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm text-text-primary truncate">{agent.name}</p>
          <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-mono shrink-0", statusClass)}>
            {agent.status}
          </span>
        </div>
        <p className="text-[11px] text-text-tertiary mt-0.5 truncate">{agent.detail}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[11px] font-mono text-text-secondary">{agent.zone}</p>
        <p className="text-[10px] font-mono text-text-tertiary mt-0.5">{agent.id}</p>
      </div>
    </div>
  );
}
