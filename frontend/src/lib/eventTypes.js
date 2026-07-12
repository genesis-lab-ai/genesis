import {
  HiOutlineBolt,
  HiOutlineExclamationTriangle,
  HiOutlineArrowTrendingUp,
  HiOutlineBanknotes,
  HiOutlineCloud,
  HiOutlineTruck,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

/**
 * EVENT_TYPES — single source of truth for how each event category looks
 * across the app (Events page feed, simulation log, and anywhere else an
 * event might surface later, e.g. a future notification tray). Adding a
 * new category later means adding one entry here, not touching every
 * component that renders an event.
 */
export const EVENT_TYPES = {
  policy: { label: "Policy", icon: HiOutlineBolt, color: "var(--color-accent)" },
  warning: { label: "Warning", icon: HiOutlineExclamationTriangle, color: "var(--color-negative)" },
  growth: { label: "Growth", icon: HiOutlineArrowTrendingUp, color: "var(--color-positive)" },
  economy: { label: "Economy", icon: HiOutlineBanknotes, color: "#F5B942" },
  environment: { label: "Environment", icon: HiOutlineCloud, color: "#4ADE80" },
  transportation: { label: "Transportation", icon: HiOutlineTruck, color: "var(--color-data)" },
  // Kept for compatibility with the real simulation event log, which
  // already emits "shock" and "system" typed events from useSimulation.
  shock: { label: "Policy Shock", icon: HiOutlineBolt, color: "var(--color-accent)" },
  system: { label: "System", icon: HiOutlineCog6Tooth, color: "var(--color-text-tertiary)" },
};

export function getEventType(type) {
  return EVENT_TYPES[type] ?? EVENT_TYPES.system;
}
