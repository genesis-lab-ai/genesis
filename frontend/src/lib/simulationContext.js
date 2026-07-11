import { createContext, useContext } from "react";

export const SimulationContext = createContext(null);

export function useSimulationContext() {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error("useSimulationContext must be used within DashboardLayout");
  }
  return ctx;
}
