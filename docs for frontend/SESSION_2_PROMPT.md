# AGRIDIRECT — SESSION 2

You are continuing the AgriDirect frontend for SIH26033.

This is SESSION 2.

Before doing anything, read:
- /docs/FRONTEND_SPEC.md
- /docs/PHASES.md
- /docs/ACCEPTANCE.md
- /docs/FRONTEND_AUDIT.md

Treat the current repository as implementation reality.

# FIRST ACTION

Review:
- FRONTEND_AUDIT.md
- ACCEPTANCE.md
- PHASES.md

Determine exactly what Session 1 completed.
Do not redo completed work unnecessarily.
Do not assume a requirement passed unless ACCEPTANCE.md contains evidence.

# SESSION 2 SCOPE

Implement:
1. Buyer dashboard
2. RFQ
3. FPO aggregation
4. Smart matching
5. Forecast
6. Logistics
7. Session 2 integration

# BUYER

Support:
- supply discovery
- sourcing
- requirements
- RFQ
- matching
- fulfillment

# RFQ

Communicate:
- crop
- quantity
- quality/grade
- target date
- delivery location
- status
- matching

# FPO AGGREGATION

Make aggregation visually obvious.

Example:
Buyer requirement: 5,000 kg
FPO A: 2,000 kg
FPO B: 1,500 kg
FPO C: 1,500 kg
Total: 5,000 kg

Use actual repository data where available.

# SMART MATCHING

Show relevant matching information.
Do not falsely claim a scientifically meaningful score if mocked.

# FORECAST — P0

Known defect:
labels/ticks may appear while actual chart series do not.

Inspect:
- chart library
- component
- data
- mapping
- dimensions
- ResponsiveContainer
- parent height
- CSS
- conditional rendering
- loading
- empty state
- mobile behavior

Fix the ROOT CAUSE.

The result must show an actual chart with a visible line, bar, area, or equivalent data series.

Do not:
- use an image
- use a screenshot
- fake chart pixels
- hide visualization
- remove labels to conceal the issue

# FORECAST UX

Show:
- historical price
- forecast price
- time period
- crop
- market signal
- recommendation

# LOGISTICS

Show:
- source
- destination
- quantity
- route
- status
- delivery information

If routing is mocked, do not claim actual optimization.

# INTEGRATION

Verify:
Buyer → Marketplace → RFQ → Aggregation → Matching → Logistics
and Forecast → actual visualization

# VERIFICATION

Run:
- lint
- typecheck
- tests
- build

Use browser verification if available.
Otherwise mark visual requirements UNVERIFIED.

# ACCEPTANCE

Update /docs/ACCEPTANCE.md.
Every PASS requires evidence.
Do not self-certify.

# DOCUMENTATION

Update:
- /docs/FRONTEND_AUDIT.md
- /docs/ACCEPTANCE.md
- /docs/PHASES.md

Report implemented, verified, unverified, blocked, failed, commands, remaining issues.

Do not begin Session 3.
Stop after Session 2 is complete and documented.
