import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import CityPage from "./pages/CityPage";
import LoadingState from "./components/ui/LoadingState";

// Code-split the less-immediately-needed routes so the initial
// Dashboard/City load doesn't pay for Recharts (Statistics) or the
// Policy/Agent Inspector pages up front. Each Suspense wraps only the
// individual route's content, not the whole layout — Navbar/Sidebar stay
// mounted and visible while a lazy chunk loads, so switching to e.g.
// Statistics doesn't flash the whole shell back to a loading state.
const StatisticsPage = lazy(() => import("./pages/StatisticsPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const PolicyPage = lazy(() => import("./pages/PolicyPage"));
const AgentInspectorPage = lazy(() => import("./pages/AgentInspectorPage"));

function lazyRoute(Component) {
  return (
    <Suspense fallback={<LoadingState label="Loading..." />}>
      <Component />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="city" element={<CityPage />} />
          <Route path="statistics" element={lazyRoute(StatisticsPage)} />
          <Route path="events" element={lazyRoute(EventsPage)} />
          <Route path="policy" element={lazyRoute(PolicyPage)} />
          <Route path="agents" element={lazyRoute(AgentInspectorPage)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
