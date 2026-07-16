/**
 * Mock city event feed — demonstrates the full event taxonomy the
 * simulation engine will eventually emit for real (ticks, agent
 * decisions, policy effects, etc.). Isolated here exactly like
 * mock/city.js, so swapping this for a real event stream later means
 * changing this file's export, not any component that consumes it.
 */
export const MOCK_CITY_EVENTS = [
  { id: "evt-1", type: "policy", tick: 128, title: "Property tax adjusted in District 3", detail: "Rate increased from 1.8% to 2.1% following council review." },
  { id: "evt-2", type: "growth", tick: 124, title: "Residential permits up 12% this quarter", detail: "Concentrated in the northern ring, near the new transit corridor." },
  { id: "evt-3", type: "warning", tick: 119, title: "Congestion threshold exceeded on Ring Road", detail: "Average commute time crossed 32 minutes during peak hours." },
  { id: "evt-4", type: "transportation", tick: 115, title: "Riverside metro line construction began", detail: "Projected to reduce cross-town commute time by ~18% on completion." },
  { id: "evt-5", type: "environment", tick: 108, title: "Air quality index improved to 74/100", detail: "Attributed to reduced industrial output in the western quarter." },
  { id: "evt-6", type: "economy", tick: 101, title: "Commercial vacancy fell below 6%", detail: "Lowest recorded rate since simulation start." },
  { id: "evt-7", type: "warning", tick: 94, title: "Housing affordability index declining", detail: "Median rent-to-income ratio crossed 34% in central districts." },
  { id: "evt-8", type: "policy", tick: 89, title: "Green investment incentive introduced", detail: "Tax credit for parks and green-roof development in mixed-use zones." },
  { id: "evt-9", type: "growth", tick: 82, title: "Industrial Quarter employment up 8%", detail: "New manufacturing permits approved near the southern rail line." },
  { id: "evt-10", type: "economy", tick: 76, title: "City budget surplus recorded", detail: "First quarterly surplus in the simulation's recorded history." },
  { id: "evt-11", type: "environment", tick: 70, title: "Pollution spike near Industrial Quarter", detail: "Localized increase linked to a temporary rise in freight traffic." },
  { id: "evt-12", type: "transportation", tick: 63, title: "Bus route coverage expanded", detail: "Two new routes added connecting outer residential zones to downtown." },
];
