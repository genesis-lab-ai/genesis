import StatusBadge from "../ui/StatusBadge";

/**
 * AgentCard — one row in the Agent Inspector list. Purely presentational,
 * renders whatever agent object it's given (see mock/agents.js for the
 * current shape); a real backend agent record can replace the mock data
 * source without this component changing.
 *
 * Status styling now comes from the shared StatusBadge (see
 * components/ui/StatusBadge.jsx) instead of a map duplicated here —
 * Navbar's simulation status uses the same component.
 */
export default function AgentCard({ agent }) {
  return (
    <div className="glass flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3 hover:border-white/20 transition-colors">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm text-text-primary truncate">{agent.name}</p>
          <StatusBadge status={agent.status} />
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
