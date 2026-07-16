/**
 * Mock agent data — small illustrative sample so Agent Inspector's list
 * rendering, filtering, and search UI have something real to demonstrate
 * against. Structured so a real backend agent record can be dropped in
 * with the same shape later.
 */
export const AGENT_CATEGORIES = ["households", "businesses", "commuters", "government"];

export const AGENT_CATEGORY_LABELS = {
  households: "Households",
  businesses: "Businesses",
  commuters: "Commuters",
  government: "Government",
};

export const MOCK_AGENTS = [
  { id: "hh-1042", category: "households", name: "Household #1042", zone: "Residential · 8,4", status: "Stable", detail: "3 members · income tier: middle" },
  { id: "hh-2077", category: "households", name: "Household #2077", zone: "Mixed use · 12,9", status: "Relocating", detail: "2 members · income tier: high" },
  { id: "hh-3311", category: "households", name: "Household #3311", zone: "Residential · 3,15", status: "Stable", detail: "4 members · income tier: low" },

  { id: "biz-0091", category: "businesses", name: "Fabrica Textiles", zone: "Industrial · 17,6", status: "Hiring", detail: "Sector: manufacturing · 82 employees" },
  { id: "biz-0154", category: "businesses", name: "Riverside Cafe Co.", zone: "Commercial · 9,10", status: "Stable", detail: "Sector: food service · 14 employees" },
  { id: "biz-0212", category: "businesses", name: "Northgate Logistics", zone: "Industrial · 18,3", status: "Downsizing", detail: "Sector: logistics · 46 employees" },

  { id: "cm-5501", category: "commuters", name: "Commuter #5501", zone: "8,4 → 9,10", status: "En route", detail: "Mode: transit · avg. 24 min" },
  { id: "cm-5502", category: "commuters", name: "Commuter #5502", zone: "12,9 → 17,6", status: "En route", detail: "Mode: vehicle · avg. 31 min" },

  { id: "gov-001", category: "government", name: "City Council", zone: "Citywide", status: "Active", detail: "Budget authority · policy issuance" },
  { id: "gov-002", category: "government", name: "Transit Authority", zone: "Citywide", status: "Active", detail: "Manages public transit infrastructure" },
];
