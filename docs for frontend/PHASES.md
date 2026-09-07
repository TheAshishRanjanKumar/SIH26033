# AgriDirect Frontend — Implementation Phases

Project: SIH26033
Product: AgriDirect

Exactly three implementation sessions.
Do not execute all three in one continuous run.

Each session reads:
- FRONTEND_SPEC.md
- FRONTEND_AUDIT.md
- ACCEPTANCE.md
- PHASES.md

Each session implements its scope, verifies it, and updates all four files.

---

# SESSION 1 — Foundation + Farmer + Marketplace

## Phase 1 — Repository Audit
Inspect package.json, framework/config, routes, components, state, services,
mock data, charts, images, tests, dashboards, and tooling.
Record actual findings in FRONTEND_AUDIT.md.

## Phase 2 — Design System
Refine shared colors, typography, spacing, buttons, cards, badges, inputs,
navigation, containers, responsive grids, loading/empty/error states.

## Phase 3 — Shared Application Shell
Improve desktop/mobile navigation, headers, page structure, role-aware
navigation, responsive containers. Preserve existing routes.

## Phase 4 — Farmer Home
Implement/refine greeting, today's market, crop, current price, expected price,
price direction, AI recommendation, sell action, and key KPIs.

## Phase 5 — Farmer Listing
Implement/refine crop, quantity, grade, price, location, availability,
optional image, validation, submission, success state. Preserve state.

## Phase 6 — Marketplace
Refine cards, crop imagery, price hierarchy, quantity, grade, seller/FPO,
location, filters/search where supported, primary buying action.

## Phase 7 — Economic Value
Communicate farmer realization, reference/mandi price, buyer price/savings,
and economic impact without unsupported claims.

## Phase 8 — Session 1 Integration
Verify:
Farmer login → Farmer home → market/AI → create listing → persistence →
marketplace → listing visible.

Run available lint/typecheck/tests/build.
Use browser verification if available; otherwise mark visual items UNVERIFIED.
Update docs.

---

# SESSION 2 — Buyer + RFQ + FPO + Forecast + Logistics

## Phase 9 — Buyer Dashboard
Sourcing overview, marketplace, demand requirements, supplier discovery, KPIs.

## Phase 10 — RFQ
RFQ creation, crop, quantity, grade, target date, delivery location,
status, matching status.

## Phase 11 — FPO Aggregation
Show buyer requirement, FPO supply, contributions, total quantity, match status.

## Phase 12 — Smart Matching
Show quantity, price, location, supply, fulfillment, and match score only if
actually supported.

## Phase 13 — FORECAST P0
Inspect and fix the known chart defect where labels/ticks may appear without
actual visual series. Inspect chart library, component, data, mapping,
dimensions, ResponsiveContainer, parent height, CSS, conditional rendering,
loading/empty states, and responsive behavior. Fix root cause. Do not use an
image or screenshot.

## Phase 14 — Forecast Experience
Current price, historical prices, predicted prices, timeframe, demand signal,
recommendation, crop selection, legend, tooltips, mobile behavior.

## Phase 15 — Logistics
Source, destination, quantity, route, delivery status, estimated delivery,
summary. Do not falsely claim optimization.

## Phase 16 — Session 2 Integration
Verify:
Buyer → Marketplace → RFQ → Aggregation → Matching → Logistics
and Forecast → actual visualization.

Run verification and update docs.

---

# SESSION 3 — Orders + Government + Impact + Responsive + Final QA

## Phase 17 — Order Lifecycle
PLACED → CONFIRMED → PICKUP → IN TRANSIT → DELIVERED.

## Phase 18 — DoCA Dashboard
Price overview, crop trends, regional comparison, marketplace/reference price,
demand, supply, activity. Clearly distinguish demo/reference/live data.

## Phase 19 — Impact Dashboard
Farmer realization, buyer savings, volume traded, direct transactions,
fulfilled orders, delivery performance, intermediary reduction where supportable.

## Phase 20 — Responsive Pass
Inspect 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 widths.
Review navigation, cards, grids, forms, tables, charts, dialogs, buttons,
images, text overflow, spacing.

## Phase 21 — Accessibility
Semantic HTML, labels, keyboard navigation, focus, contrast, alt text,
status indicators, touch targets.

## Phase 22 — Low-Bandwidth / Performance
Review image sizes, dependencies, rerenders, API calls, heavy components,
animations. Keep farmer workflows lightweight.

## Phase 23 — Localization Readiness
English, Hindi, Bengali; no text baked into images; layouts tolerate longer text.

## Phase 24 — Golden Demo QA
1. Farmer login
2. Today's market
3. Current price
4. Expected price
5. AI recommendation
6. Create listing
7. Buyer sees listing
8. RFQ
9. Aggregation
10. Matching
11. Order
12. Logistics
13. Forecast
14. Government
15. Impact

## Phase 25 — Final Defect Pass
Prioritize P0 → P1 → P2.
Fix broken routes, charts, state, overflow, mobile, build/type/lint errors,
and obvious visual defects.

## Phase 26 — Final Verification
Run lint, typecheck, tests, build. Perform browser verification if available.
Update all docs.

Completion requires all achievable acceptance items PASS, remaining items
explicitly UNVERIFIED/BLOCKED, no known P0 or critical P1 defect, successful
build where applicable, working golden demo, and accurate documentation.
