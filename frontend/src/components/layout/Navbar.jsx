import { Link, useLocation } from "react-router-dom";
import { HiOutlineCubeTransparent } from "react-icons/hi2";
import StatusBadge from "../ui/StatusBadge";

// Maps each route to a human page title, shown next to the logo so the
// top bar orients the user even if they land deep-linked on a page —
// previously the navbar looked identical regardless of which page was
// open, with only the Sidebar's highlight indicating location.
const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/dashboard/city": "City",
  "/dashboard/statistics": "Statistics",
  "/dashboard/events": "Events",
  "/dashboard/policy": "Policy Panel",
  "/dashboard/agents": "Agent Inspector",
};

const STATUS_LABELS = { idle: "Idle", running: "Running", paused: "Paused" };

export default function Navbar({ tick = 0, status = "idle" }) {
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname];

  return (
    <header className="glass h-14 shrink-0 border-b border-border bg-surface flex items-center justify-between px-5">
      <div className="flex items-center gap-2.5">
        <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-md -m-1 p-1">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent/30 to-data/10 border border-white/10 flex items-center justify-center">
            <HiOutlineCubeTransparent className="text-accent" size={16} />
          </div>
          <span className="font-display font-semibold text-[15px] tracking-tight text-text-primary">
            Genesis
          </span>
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-text-tertiary border border-border rounded px-1.5 py-0.5">
          v1
        </span>
        {pageTitle ? (
          <>
            <span className="text-border">/</span>
            <span className="text-xs text-text-secondary">{pageTitle}</span>
          </>
        ) : null}
      </div>

      <div className="flex items-center gap-5">
        <StatusBadge status={STATUS_LABELS[status] ?? "Idle"} pulse={status === "running"} size="md" />
        <div className="h-4 w-px bg-border" />
        <div className="flex items-baseline gap-1.5 font-mono">
          <span className="text-[10px] uppercase tracking-widest text-text-tertiary">Tick</span>
          <span className="text-sm text-text-primary tabular-nums">{String(tick).padStart(5, "0")}</span>
        </div>
      </div>
    </header>
  );
}
