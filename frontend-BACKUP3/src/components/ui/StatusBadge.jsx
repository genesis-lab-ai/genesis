import { cn } from "../../lib/cn";

/**
 * StatusBadge — one consistent status-pill treatment, used wherever the
 * app shows a discrete state (agent status, simulation status, etc.).
 * Previously AgentCard had its own inline STATUS_STYLES map and Navbar
 * had its own separate statusConfig map — same concept, two
 * implementations. This is the single version both now use.
 *
 * `tone` picks the color; unknown tones fall back to a neutral style
 * rather than breaking, since this will eventually render real backend
 * status strings we don't fully control the vocabulary of.
 */
const TONE_STYLES = {
  positive: { badge: "text-positive bg-positive/10 border-positive/25", dot: "bg-positive" },
  data: { badge: "text-data bg-data-soft border-data/25", dot: "bg-data" },
  accent: { badge: "text-accent bg-accent-soft border-accent/25", dot: "bg-accent" },
  negative: { badge: "text-negative bg-negative/10 border-negative/25", dot: "bg-negative" },
  neutral: { badge: "text-text-tertiary bg-surface-raised border-border", dot: "bg-text-tertiary" },
};

// Maps the actual status words used across the app to a tone. Centralizing
// this means a new status string only needs one new entry here, not a new
// map in every component that might show it.
const STATUS_TONE = {
  Stable: "positive",
  Active: "positive",
  Hiring: "positive",
  Running: "positive",
  "En route": "data",
  Relocating: "accent",
  Downsizing: "negative",
  Idle: "neutral",
  Paused: "accent",
};

export default function StatusBadge({ status, pulse = false, size = "sm" }) {
  const tone = STATUS_TONE[status] ?? "neutral";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border font-mono shrink-0",
        size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1",
        TONE_STYLES[tone].badge
      )}
    >
      {pulse ? <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", TONE_STYLES[tone].dot)} /> : null}
      {status}
    </span>
  );
}
