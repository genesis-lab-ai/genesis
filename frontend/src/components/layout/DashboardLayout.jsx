import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSimulation } from "../../hooks/useSimulation";
import { SimulationContext } from "../../lib/simulationContext";

export default function DashboardLayout() {
  const sim = useSimulation();
  const status = sim.isRunning ? "running" : sim.tick > 0 ? "paused" : "idle";

  return (
    <SimulationContext.Provider value={sim}>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <Navbar tick={sim.tick} status={status} />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main className="flex-1 min-w-0 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SimulationContext.Provider>
  );
}
