import { NavLink } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineMapPin,
  HiOutlineChartBar,
  HiOutlineBolt,
  HiOutlineClipboardDocumentList,
  HiOutlineUserGroup,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { cn } from "../../lib/cn";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: HiOutlineSquares2X2 },
  { to: "/dashboard/city", label: "City", icon: HiOutlineMapPin },
  { to: "/dashboard/statistics", label: "Statistics", icon: HiOutlineChartBar },
  { to: "/dashboard/events", label: "Events", icon: HiOutlineBolt },
  { to: "/dashboard/policy", label: "Policy Panel", icon: HiOutlineClipboardDocumentList },
  { to: "/dashboard/agents", label: "Agent Inspector", icon: HiOutlineUserGroup },
  // Still a genuine placeholder — no page built for this yet.
  { to: "/dashboard/settings", label: "Settings", icon: HiOutlineCog6Tooth, disabled: true },
];

export default function Sidebar() {
  return (
    <nav aria-label="Main navigation" className="glass w-56 shrink-0 border-r border-border bg-surface flex flex-col py-4">
      <div className="flex flex-col gap-0.5 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon, disabled }) =>
          disabled ? (
            <div
              key={to}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-tertiary cursor-not-allowed"
              title="Coming soon"
            >
              <Icon size={17} />
              {label}
              <span className="ml-auto text-[9px] uppercase tracking-wider border border-border rounded px-1 py-0.5">
                soon
              </span>
            </div>
          ) : (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-inset",
                  isActive
                    ? "bg-gradient-to-r from-accent-soft to-transparent text-accent shadow-[inset_1px_0_0_var(--color-accent)]"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-raised"
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
}
