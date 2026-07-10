# Genesis — Project Brief for AI-Assisted Development

**Purpose of this doc:** Context for an AI coding assistant (ChatGPT) helping build this project. Paste this in as the first message of a fresh chat, then work incrementally from there.

---

## 1. Concept

Genesis is a generative agent-based simulation of a synthetic city and its economy. Thousands of lightweight autonomous agents — households, businesses, and commuters — live, work, spend, and move within a synthetic city map. The user can inject a **policy shock** (e.g., a property tax hike, a new metro line, a zoning change) mid-simulation and watch the system ripple and re-equilibrate in real time on a live map, with supporting charts.

**Target audience:** Final-year CS/Computer Engineering resume/portfolio project. Primary goal is a strong live demo moment for interviews, backed by genuine technical depth (not a toy).

**Builder background (for calibrating suggestions):** Strong in backend, data science, and ML; frontend is handled with AI-assisted tools rather than deep manual frontend expertise. Prior projects: CivicLens AI (FastAPI/MongoDB/NLP/SHAP), Codequake (Next.js/TypeScript/GitHub API), GitPersona (K-Means/SHAP/p5.js).

---

## 2. Core Demo Loop (this is the product — protect it above all else)

1. Load a synthetic city (grid or graph of zones connected by roads/transit).
2. Simulation runs forward — agents move, work, spend, relocate over simulated time steps.
3. User clicks a control to inject a shock (raise tax in zone X / add metro line A→B / rezone a district).
4. Map and charts visibly and interpretably react: commute patterns shift, property values near new infrastructure rise, business density follows.
5. All of this is visible live — moving agent dots on a map, heatmaps, time-series charts alongside.

**Everything else in this brief is in service of making this loop work well and be explainable in an interview.**

---

## 3. Scope for v1 (hard constraints — do not exceed without discussion)

- 500–2,000 agents (not "a whole real city")
- ONE synthetic city layout (not real GIS data — a designed grid/graph is fine and easier to control)
- 2–3 shock types only: e.g. (a) tax rate change, (b) new transit edge, (c) zoning change
- No deep multi-agent reinforcement learning — use rule-based / utility-maximization-with-noise decision logic for agents. Full MARL is a scope trap for a solo final-year project; avoid it.
- At least ONE genuinely learned ML component (see Section 6) so the project can defend an "ML" claim, not just "simulation/systems"

**Priority order when time is short:** working demo loop > agent realism > visual polish > extra shock types > scale (more agents).

---

## 4. Architecture

### Agent layer
- **Households**: attributes — income, current location, preferences (cost sensitivity, commute tolerance, amenity preference). Decision logic: utility function over cost/access/amenities + stochastic noise, re-evaluated periodically or when shocked.
- **Businesses**: attributes — sector, employee count, location, rent paid. Decision logic: hire/relocate/close based on local demand, rent, and access to labor.
- **Commuters**: derived from household/business location pairs — generates traffic/transit load used to compute congestion and commute time.

### Environment
- City represented as a **graph**: nodes = zones/parcels (with attributes like rent, zoning type, amenity score), edges = roads/transit links (with attributes like capacity, travel time).
- Synthetic generation, not real-world data — deterministic seed for reproducible demos, but should support regenerating varied layouts too.

### Economy engine
- Tick-based simulation loop (e.g., 1 tick = 1 simulated week).
- Each tick: agents evaluate current state → decide to stay/move/hire/fire/reprice → environment updates (rents adjust from supply/demand, congestion recalculated) → repeat.

### Shock injection
- Shocks are parameterized events applied at a chosen tick: modify a zone's tax rate, add/remove a graph edge, change a zone's zoning type.
- After injection, agents re-evaluate against the new parameters — this produces the "ripple."

### Visualization (this is the product surface)
- Live map: agents as moving points, zones colored by a selectable metric (rent, employment, congestion).
- Time-series panel: key metrics (avg rent, avg commute time, employment by sector) plotted as the simulation runs.
- Shock control panel: buttons/sliders to inject shocks and re-run from the current or a reset state.

---

## 5. Suggested Tech Stack

- **Backend**: Python (simulation core — plain classes/dataclasses for agents, networkx-style graph for the city, or a custom lightweight graph if performance matters). FastAPI to serve simulation state, ideally over WebSocket for live push updates to the frontend rather than polling.
- **Frontend**: A map/graph visualization (e.g., deck.gl, D3, or even a simpler canvas-based renderer if a true geographic map isn't needed — since the city is synthetic, a stylized node-link/grid view is fine and can look more "designed"). Charts via a standard charting lib (Chart.js/Recharts equivalent).
- **Data**: No external dataset required for the simulation itself. Optional: loosely calibrate agent behavior parameters against real urban economics literature (rent gradients, commute elasticity, e.g. Alonso-Muth-Mills model basics) for credibility — mention this in the resume/demo narrative even if approximate.
- **Simulation performance**: 500–2,000 agents per tick should run comfortably in pure Python if the per-agent decision logic stays O(1)–O(log n); avoid O(n²) agent-to-agent interactions (use zone-level aggregation instead of pairwise checks).

---

## 6. The "genuinely ML" component (don't skip this)

Interviewers will ask "is this really ML, or just a rules engine?" Build in at least one trained/learned model, for example:
- A model (logistic regression / gradient boosted trees / small neural net) trained on simulated historical agent decisions to **predict relocation probability** given features (income, rent, commute time, amenity score).
- Use this trained model to drive (or partially drive) agent relocation decisions instead of a hand-written rule, and be able to show/explain the model's feature importances.
- This also gives a legitimate "SHAP explainability" angle, consistent with prior project style (CivicLens).

---

## 7. Known Failure Modes to Design Around

- **Ripple effect looks like noise instead of a clear story.** Deliberately tune agent rules so effects are *legible* — e.g., rent near a new metro stop should visibly and reliably rise, even if that means simplifying realism for demo clarity. A demo that produces a clean, explainable narrative beats one that is "more realistic" but illegible.
- **Scope creep.** The temptation will be to keep adding realism (more agent types, real GIS data, full MARL). Resist this — hard-scope to Section 3 for v1. Additional realism is a "if time remains" backlog item, not a v1 requirement.
- **Demo fragility.** Build one polished, reliable "golden path" demo scenario (specific city layout + specific shock) that always works and looks good, separate from free-form exploration mode which can be rougher.

---

## 8. Suggested Build Order (roughly 4–6 weeks, adjust as needed)

1. **Week 1**: City graph generation + basic agent classes + tick loop with no visualization (console/log output only). Get the core simulation logically working first.
2. **Week 2**: Minimal visualization — even a static rendered snapshot per tick is fine initially. Get agents visibly moving/existing on a map.
3. **Week 3**: Implement one shock type end-to-end (e.g., new transit edge) and confirm it produces a visible, explainable ripple.
4. **Week 4**: Add the trained ML component (Section 6) replacing/augmenting one rule-based decision.
5. **Week 5**: Add remaining shock types, polish visualization, add time-series charts.
6. **Week 6**: Deployment, demo-path hardening, README, resume/story writeup.

---

## 9. Deployment Plan

**Recommended approach: keep it simple, favor reliability over infrastructure sophistication — this is a demo tool, not a production service.**

- **Backend (FastAPI + simulation engine)**: Deploy on **Render** or **Railway** (both have generous free/hobby tiers, easy Python/FastAPI deploys straight from a GitHub repo, and support WebSockets — important since the live-update loop needs it). Fly.io is a solid alternative if you want more control over region/scaling.
- **Frontend**: Deploy separately on **Vercel** or **Netlify** if it's a standalone JS/React app (fast, free, trivial GitHub-integrated deploys). If frontend is served directly by FastAPI (e.g., a single-page app bundled in), it can just live on the same Render/Railway service to simplify deployment.
- **WebSocket consideration**: confirm whichever host is used supports persistent WebSocket connections on the free tier (Render and Railway both do; some serverless platforms like plain Vercel functions do NOT support long-lived WebSockets well — so don't put the simulation backend on Vercel, only the frontend).
- **Database**: Likely unnecessary for v1 — simulation state can live in memory per session/run. If you want to persist/replay past runs for the resume portfolio site, a lightweight SQLite or MongoDB Atlas free tier (already used in CivicLens) works fine.
- **Domain/portfolio integration**: Point a subdomain or path from an existing portfolio site to the deployed demo so it's one click from the resume/portfolio, not a separate unlinked URL.
- **Cost**: All of the above (Render/Railway/Vercel free tiers) should be $0 for a portfolio-scale demo with light traffic during interview season.

**Simple version if time is very short:** skip separate hosting entirely and record a polished demo video/GIF of the golden-path scenario for the resume/portfolio page, with a "run it live" link to a Render-hosted instance as a bonus rather than the primary proof.

---

## 10. Open Questions to Resolve Before/During Build (flag these to the assistant helping you)

- Exact visual style for the city map — abstract grid vs. stylized geographic look?
- How many distinct zone "types" (residential/commercial/industrial/mixed) for v1?
- Whether commute/traffic congestion is modeled explicitly or approximated
- Whether the trained ML model (Section 6) is trained once offline on generated data, or retrained live during shocks (offline-once is strongly recommended for time/complexity reasons)
