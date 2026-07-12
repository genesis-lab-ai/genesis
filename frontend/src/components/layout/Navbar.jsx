import { HiOutlineCubeTransparent } from "react-icons/hi2";

export default function Navbar({ tick = 0, status = "idle" }) {
  const statusConfig = {
    idle: { label: "Idle", color: "bg-text-tertiary" },
    running: { label: "Running", color: "bg-positive" },
    paused: { label: "Paused", color: "bg-warning" },
  };
  const { label, color } = statusConfig[status] ?? statusConfig.idle;

  return (
    <header className="glass h-14 shrink-0 border-b border-border bg-surface flex items-center justify-between px-5">
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent/30 to-data/10 border border-white/10 flex items-center justify-center">
          <HiOutlineCubeTransparent className="text-accent" size={16} />
        </div>
        <span className="font-display font-semibold text-[15px] tracking-tight text-text-primary">
          Genesis
        </span>
        <span className="ml-1 text-[10px] uppercase tracking-widest text-text-tertiary border border-border rounded px-1.5 py-0.5">
          v1
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${color} ${status === "running" ? "animate-pulse" : ""}`} />
          <span className="text-xs text-text-secondary">{label}</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-baseline gap-1.5 font-mono">
          <span className="text-[10px] uppercase tracking-widest text-text-tertiary">Tick</span>
          <span className="text-sm text-text-primary tabular-nums">{String(tick).padStart(5, "0")}</span>
        </div>
      </div>
    </header>
  );
}
