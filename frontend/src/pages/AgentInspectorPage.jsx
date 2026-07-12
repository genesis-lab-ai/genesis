import { useMemo, useState } from "react";
import {
  HiOutlineHomeModern,
  HiOutlineBuildingOffice2,
  HiOutlineTruck,
  HiOutlineBuildingLibrary,
  HiOutlineUserGroup,
  HiOutlineMagnifyingGlassCircle,
} from "react-icons/hi2";

import SummaryHeader from "../components/ui/SummaryHeader";
import MetricBadge from "../components/charts/MetricBadge";
import SearchInput from "../components/ui/SearchInput";
import SegmentedControl from "../components/ui/SegmentedControl";
import EmptyState from "../components/ui/EmptyState";
import AgentCard from "../components/agents/AgentCard";
import { MOCK_AGENTS, AGENT_CATEGORY_LABELS } from "../mock/agents";

const CATEGORY_ICONS = {
  households: HiOutlineHomeModern,
  businesses: HiOutlineBuildingOffice2,
  commuters: HiOutlineTruck,
  government: HiOutlineBuildingLibrary,
};

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "households", label: "Households" },
  { value: "businesses", label: "Businesses" },
  { value: "commuters", label: "Commuters" },
  { value: "government", label: "Government" },
];

/**
 * AgentInspectorPage — fully designed interface for a feature the backend
 * doesn't expose yet. Uses a small illustrative mock dataset (see
 * mock/agents.js) so the summary counts, filtering, search, and card list
 * all have something real to demonstrate against — but there's no
 * backend call anywhere on this page. Swapping in live agent data later
 * should only mean changing the import at the top.
 */
export default function AgentInspectorPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = { households: 0, businesses: 0, commuters: 0, government: 0 };
    MOCK_AGENTS.forEach((a) => { c[a.category] = (c[a.category] ?? 0) + 1; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    return MOCK_AGENTS.filter((a) => {
      const matchesCategory = category === "all" || a.category === category;
      const matchesQuery = query.trim() === "" || a.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="city-lights h-full overflow-y-auto p-6">
      <SummaryHeader
        title="Agent Inspector"
        subtitle="Preview interface — awaiting agent-level data from the simulation engine."
        badges={[
          <MetricBadge key="households" icon={HiOutlineHomeModern} label="Households" value={counts.households} />,
          <MetricBadge key="businesses" icon={HiOutlineBuildingOffice2} label="Businesses" value={counts.businesses} />,
          <MetricBadge key="commuters" icon={HiOutlineTruck} label="Commuters" value={counts.commuters} />,
          <MetricBadge key="government" icon={HiOutlineBuildingLibrary} label="Government" value={counts.government} />,
        ]}
      />

      <div className="flex items-center gap-3 mb-4 max-w-2xl">
        <div className="flex-1">
          <SearchInput value={query} onChange={setQuery} placeholder="Search agents by name..." />
        </div>
      </div>

      <div className="mb-4">
        <SegmentedControl options={FILTER_OPTIONS} value={category} onChange={setCategory} />
      </div>

      <div className="max-w-2xl">
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-2">
            {filtered.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : query ? (
          <EmptyState
            icon={HiOutlineMagnifyingGlassCircle}
            title="No agents match your search"
            description={`Nothing found for "${query}". Try a different name or clear the filter.`}
          />
        ) : (
          <EmptyState
            icon={HiOutlineUserGroup}
            title="No agents in this category yet"
            description="This will populate once the simulation engine exposes agent-level data."
          />
        )}
      </div>
    </div>
  );
}
