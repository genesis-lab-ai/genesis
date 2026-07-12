import { HiOutlinePlay, HiOutlinePause, HiOutlineArrowPath, HiOutlineBolt } from "react-icons/hi2";
import Button from "../ui/Button";
import { cn } from "../../lib/cn";

const SPEEDS = [1, 2, 4];

/**
 * ControlPanel — bottom simulation control bar.
 * Framed as simulation software controls (play/pause/reset/speed/tick),
 * not media-player controls — per brief.
 */
export default function ControlPanel({
  isRunning,
  tick,
  speed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  onInjectShock,
}) {
  return (
    <div className="glass shrink-0 border-t border-border bg-surface px-4 py-2.5 flex items-center gap-4">
      <div className="flex items-center gap-1.5">
        {isRunning ? (
          <Button variant="secondary" size="sm" icon={HiOutlinePause} onClick={onPause}>
            Pause
          </Button>
        ) : (
          <Button variant="primary" size="sm" icon={HiOutlinePlay} onClick={onPlay}>
            Run
          </Button>
        )}
        <Button variant="ghost" size="sm" icon={HiOutlineArrowPath} onClick={onReset}>
          Reset
        </Button>
      </div>

      <div className="h-5 w-px bg-border" />

      <div className="flex items-center gap-1">
        <span className="text-[11px] text-text-tertiary mr-1">Speed</span>
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={cn(
              "h-7 w-9 rounded text-xs font-mono transition-colors",
              speed === s
                ? "bg-accent-soft text-accent"
                : "text-text-secondary hover:bg-surface-raised"
            )}
          >
            {s}×
          </button>
        ))}
      </div>

      <div className="h-5 w-px bg-border" />

      <div className="flex items-center gap-1.5 font-mono text-xs text-text-secondary">
        <span className="text-text-tertiary uppercase tracking-wider text-[10px]">Tick</span>
        <span className="tabular-nums">{String(tick).padStart(5, "0")}</span>
      </div>

      <div className="flex-1" />

      <Button
        variant="secondary"
        size="sm"
        icon={HiOutlineBolt}
        onClick={onInjectShock}
        className="border-accent/40 text-accent hover:bg-accent-soft"
      >
        Inject policy shock
      </Button>
    </div>
  );
}
