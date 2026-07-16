import { useState, useCallback, useRef, useEffect } from "react";

/**
 * useSimulation — placeholder simulation state hook.
 *
 * Currently drives mock/local state so the UI is fully interactive without
 * a backend. Designed so the internals can be swapped for a WebSocket
 * connection to the FastAPI simulation engine later WITHOUT changing the
 * public interface consumed by components (status, tick, isRunning,
 * play/pause/reset, injectShock).
 */
export function useSimulation() {
  const [tick, setTick] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1); // 1x, 2x, 4x
  const [events, setEvents] = useState([
    { id: 1, tick: 0, label: "Simulation initialized", type: "system" },
  ]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTick((t) => t + 1);
      }, 1000 / speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, speed]);

  const play = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTick(0);
    setEvents([{ id: Date.now(), tick: 0, label: "Simulation reset", type: "system" }]);
  }, []);

  const injectShock = useCallback((shock) => {
    setEvents((prev) => [
      { id: Date.now(), tick, label: shock.label, type: "shock" },
      ...prev,
    ]);
  }, [tick]);

  return {
    tick,
    isRunning,
    speed,
    setSpeed,
    events,
    play,
    pause,
    reset,
    injectShock,
  };
}
