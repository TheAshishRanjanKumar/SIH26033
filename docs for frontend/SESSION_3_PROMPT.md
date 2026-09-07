# AGRIDIRECT — SESSION 3

You are completing the AgriDirect frontend for SIH26033.

This is SESSION 3 and final implementation/QA.

Before doing anything, read:
- /docs/FRONTEND_SPEC.md
- /docs/PHASES.md
- /docs/ACCEPTANCE.md
- /docs/FRONTEND_AUDIT.md

Treat the repository as implementation reality.

# FIRST ACTION

Review:
- completed Session 1
- completed Session 2
- current acceptance statuses
- current known defects
- current audit

Do not redo working functionality without reason.

# SESSION 3 SCOPE

Implement and verify:
1. Order lifecycle
2. DoCA dashboard
3. Impact dashboard
4. Responsive behavior
5. Accessibility
6. Low-bandwidth considerations
7. Performance
8. Localization readiness
9. Golden demo
10. Final defect pass
11. Final verification

# ORDER LIFECYCLE

Represent:
PLACED → CONFIRMED → PICKUP → IN TRANSIT → DELIVERED

Show relevant:
- current state
- quantity
- seller
- buyer
- delivery
- timestamps where supported

# DoCA

Create/refine analytical government-facing information:
- price overview
- trends
- crop comparison
- regional comparison where supported
- marketplace/reference prices
- demand
- supply
- activity

Do not present fabricated information as official live government data.
Clearly distinguish demo/reference/live data.

# IMPACT

Show meaningful metrics where supported:
- farmer realization
- buyer savings
- volume traded
- direct transactions
- fulfillment
- delivery

Do not use unsupported claims.

# RESPONSIVE QA

Review:
320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, 1920px

Check:
- navigation
- cards
- grids
- forms
- tables
- charts
- dialogs
- buttons
- images
- text
- overflow
- spacing

Do not simply shrink desktop layouts.

# ACCESSIBILITY

Check:
- semantic HTML
- labels
- buttons
- keyboard navigation
- focus
- contrast
- alt text
- status indicators
- touch targets

# PERFORMANCE

Review:
- image optimization
- unnecessary dependencies
- unnecessary rerenders
- heavy components
- unnecessary animations
- unnecessary API calls

Do not introduce unnecessary infrastructure.

# LOCALIZATION

Ensure UI can accommodate:
English
Hindi
Bengali

Do not bake text into images.
Do not assume English-only text lengths.

# GOLDEN DEMO

Verify:
1. Farmer logs in
2. Farmer sees today's market
3. Farmer sees current price
4. Farmer sees expected price
5. Farmer sees AI recommendation
6. Farmer creates listing
7. Buyer sees listing
8. Buyer opens sourcing flow
9. Buyer creates/views RFQ
10. Aggregation is visible
11. Matching is visible
12. Order progresses
13. Logistics is visible
14. Forecast visibly works
15. DoCA price intelligence is visible
16. Impact is visible

This must feel like one product.

# FINAL P0/P1 PASS

Prioritize P0 then P1 then P2.
Fix broken functionality, chart, routes, state, build errors, broken core flows,
unusable mobile, major visual hierarchy issues, accessibility blockers, and
data-flow defects.

# VERIFICATION

Run:
- lint
- typecheck
- tests
- build

Use browser/screenshot tooling if available.
Do not claim visual verification without actual visual inspection.

# ACCEPTANCE

Review every item in /docs/ACCEPTANCE.md.
Use PASS / UNVERIFIED / BLOCKED / FAIL.
Every PASS must contain evidence.
Do not convert UNVERIFIED → PASS without new evidence.

# FINAL DOCUMENTATION

Update:
- /docs/FRONTEND_AUDIT.md
- /docs/ACCEPTANCE.md
- /docs/PHASES.md

Final report:
## Implementation
## Verification
## PASS
## UNVERIFIED
## BLOCKED
## FAIL
## Commands
## Remaining Issues
## Demo Readiness

State READY or NOT READY.
Do not claim READY if a known P0 defect remains.
