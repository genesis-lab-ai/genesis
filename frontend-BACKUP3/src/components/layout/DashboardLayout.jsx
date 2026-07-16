import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ErrorBoundary } from "../ui/ErrorBoundary";
import { useSimulation } from "../../hooks/useSimulation";
import { SimulationContext } from "../../lib/simulationContext";

export default function DashboardLayout() {
  const sim = useSimulation();
  const location = useLocation();
  const status = sim.isRunning ? "running" : sim.tick > 0 ? "paused" : "idle";

  return (
    <SimulationContext.Provider value={sim}>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <Navbar tick={sim.tick} status={status} />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main aria-label="Page content" className="flex-1 min-w-0 overflow-auto">
            <ErrorBoundary>
              {/* Keying on pathname remounts this wrapper on every route
                  change, which replays the fade-in animation — a simple,
                  dependency-free way to get a smooth page transition
                  instead of an instant, jarring swap. */}
              <div key={location.pathname} className="h-full page-fade-in">
                <Outlet />
              </div>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </SimulationContext.Provider>
  );
}
