import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import CityPage from "./pages/CityPage";
import StatisticsPage from "./pages/StatisticsPage";
import EventsPage from "./pages/EventsPage";
import PolicyPage from "./pages/PolicyPage";
import AgentInspectorPage from "./pages/AgentInspectorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="city" element={<CityPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="agents" element={<AgentInspectorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
