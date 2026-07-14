import { useEffect, useRef, useState } from "react";

/**
 * useFlashOnChange — returns `true` briefly whenever `value` changes,
 * then automatically resets to `false`. Intended for a subtle visual
 * "this just updated" cue (see StatCard's `flash` prop).
 *
 * This is explicitly NOT a polling or WebSocket implementation — it's
 * the reusable reaction pattern that a future live-data source (whether
 * polling or streamed) can plug into: whatever eventually calls
 * setMetrics(newData) will change the value this hook watches, and the
 * flash happens automatically. No component needs to change when that
 * data source is wired in later.
 */
export function useFlashOnChange(value, duration = 700) {
  const [flashing, setFlashing] = useState(false);
  const isFirstRender = useRef(true);
  const previousValue = useRef(value);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousValue.current = value;
      return;
    }

    if (value !== previousValue.current) {
      previousValue.current = value;
      setFlashing(true);
      const timeout = setTimeout(() => setFlashing(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [value, duration]);

  return flashing;
}
