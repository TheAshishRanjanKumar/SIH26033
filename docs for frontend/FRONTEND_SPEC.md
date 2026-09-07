# AgriDirect Frontend Specification

Version: 1.0
Project: SIH26033
Product: AgriDirect
Scope: Frontend

# IMPORTANT AGENT RULE

This document is the stable product/design source of truth.

It should not be rewritten casually during implementation.

If implementation reality differs from this specification:
1. inspect the repository,
2. document the discrepancy in FRONTEND_AUDIT.md,
3. make the smallest safe implementation decision,
4. preserve working functionality.

FRONTEND_SPEC.md defines WHAT AgriDirect should be.
It does not define the current state of the repository.

---

# 1. Purpose

AgriDirect is a unified digital marketplace connecting:
- Farmers
- Farmer Producer Organizations (FPOs)
- Consumers
- Bulk Buyers
- Government / DoCA stakeholders

The frontend must communicate:
> Connect farmers directly with buyers, improve farmer realization,
> reduce unnecessary intermediaries, improve buyer access,
> support logistics, and provide AI-assisted market intelligence.

The product must feel like ONE coherent agricultural marketplace,
not a collection of unrelated dashboards.

---

# 2. Frontend Scope

Primary frontend technologies:
- Next.js
- TypeScript
- Tailwind CSS

Inspect the existing repository before modification.

Prefer existing routes, components, state management, mock data,
API/service wrappers, and utilities.

Do not rewrite working architecture without a clear reason.
Do not introduce unnecessary infrastructure.
Do not modify backend architecture unless a frontend dependency absolutely requires it.

---

# 3. Core Product Flow

LIST
↓
DISCOVER
↓
MATCH & PREDICT
↓
DELIVER
↓
IMPACT

---

# 4. Core User Roles

## Farmer / FPO
Goals:
- List produce
- Understand current and expected price
- Decide when to sell
- Receive buyer demand
- Aggregate through FPOs
- Track orders
- Understand earnings and savings

UX priority: Simplicity > density

## Consumer
Goals:
- Discover produce
- Compare prices
- Understand quality/grade
- Purchase
- Track orders

UX priority: Visual discovery + price clarity

## Bulk Buyer
Goals:
- Discover supply
- Submit RFQs
- Aggregate demand
- Match with farmers/FPOs
- Compare offers
- Track fulfillment

UX priority: Information density + efficient workflows

## Government / DoCA
Goals:
- Observe prices
- Compare market/direct prices
- Monitor trends
- Understand impact
- Review marketplace activity

UX priority: Analytical clarity

---

# 5. Role Density

| Role | Density | Primary UX |
|---|---|---|
| Farmer/FPO | Low | Simple, visual, actionable |
| Consumer | Medium | Visual marketplace |
| Bulk Buyer | High | Data-rich sourcing |
| Government/DoCA | Very High | Analytics |

Do not force every role into the same dashboard layout.

---

# 6. Farmer UX

Farmer screens must work for:
- low digital literacy
- limited attention
- mobile-first usage
- potentially low bandwidth
- preference for local-language interfaces

Avoid long English paragraphs, unnecessary technical terminology,
dense tables, hidden actions, and excessive navigation.

Prefer:
- large numbers
- large buttons
- crop imagery
- icons
- short labels
- clear status indicators
- simple language
- local-language-ready architecture

The farmer should understand important information within seconds.

---

# 7. Farmer Home

Surface AI-assisted market information directly.

Example concept:

Today's Market

Tomato
Grade A

₹24/kg

अच्छा भाव

↑ भाव बढ़ सकता है

Expected:
₹28–30/kg

Recommendation:
बेचने का अच्छा समय

Next 3–5 days

Primary action:
Sell Produce

Technical explanation such as:
"Model estimate based on historical market data"
may appear as secondary information.

The farmer should see:
- current price
- expected price
- price direction
- recommendation
- primary action

without needing to interpret a technical chart first.

---

# 8. AI Presentation

Use understandable language:
- Expected price
- Price may increase
- Good time to sell
- Demand is high
- Demand is increasing
- Recommended quantity
- Suggested route
- Matched buyers

Do not claim model accuracy that is not actually implemented or measured.
Do not fabricate real government data.
Do not fabricate real AI predictions while presenting them as live production predictions.
If frontend data is mock/demo data, make that distinction clear.

---

# 9. Crop Data and Imagery

At minimum distinguish:
- Tomato
- Onion
- Potato
- Green Chilli
- Cabbage

Crop cards must use crop-specific visual identity.
Images should be appropriately sized, optimized, responsive, mobile-usable,
and not unnecessarily heavy.

---

# 10. Marketplace

Communicate:
- crop
- grade/quality
- price
- available quantity
- seller/FPO
- location where useful
- relevant demand information

Price must have strong visual hierarchy.

Conceptual hierarchy:
CROP IMAGE
Tomato
Grade A
₹24/kg
Available: 500 kg
Farmer/FPO
Location
[Buy / Request]

---

# 11. Fair Price / Economic Value

Where relevant show:
Farmer realization vs Traditional / mandi / reference price
Buyer price vs Traditional procurement price

Use careful terminology for simulated/reference data.
Do not imply verified real-world saving unless supported by actual data.

Economic information should explain:
- farmer benefit
- buyer benefit
- price difference
- marketplace impact

---

# 12. Farmer Listing

Minimum:
- Crop
- Quantity
- Grade
- Expected price / relevant price information
- Location
- Availability
- Optional image where supported

Primary action must be obvious.
Form must be mobile friendly.
Avoid unnecessary fields.
Listing should persist through existing frontend state/data flow where supported.

---

# 13. Buyer Experience

Support:
- marketplace discovery
- search/filter
- crop selection
- quantity requirements
- supplier/FPO discovery
- RFQ creation
- matching
- order progression

---

# 14. RFQ

RFQ = Request for Quotation.

Communicate:
- crop
- required quantity
- target date
- quality/grade
- delivery location
- offer/matching status

---

# 15. FPO Aggregation

Make aggregation understandable.

Example:
Buyer needs: 5,000 kg Tomato
FPO A — 2,000 kg
FPO B — 1,500 kg
FPO C — 1,500 kg
Total: 5,000 kg
Status: Matched

---

# 16. Smart Matching

Communicate:
- buyer requirement
- available supply
- quantity match
- price match
- location
- fulfillment feasibility
- match score where implemented

Do not invent a scientifically meaningful score.
If mocked, make that clear.

---

# 17. Forecast Dashboard

Core SIH feature.

Must visibly show:
- historical prices
- forecast prices
- time period
- crop
- demand or market signal where available
- recommendation

The chart must render an actual visual series.
It must not display only percentage labels, week labels, axes,
or empty containers without the actual visualization.

---

# 18. Forecast P0 Bug

Known critical failure:
labels/ticks may appear while actual chart series do not.

This is P0.

Inspect:
- chart library
- chart component
- parent dimensions
- ResponsiveContainer or equivalent
- data shape
- data mapping
- conditional rendering
- loading state
- empty state
- CSS overflow
- responsive behavior

Fix the root cause.

Do not replace the visualization with a screenshot.
Do not hide the chart.
Do not remove labels to conceal the defect.

Final chart must contain actual visible bars, lines, area,
or another appropriate visualization based on existing data.

---

# 19. Forecast Mobile

Minimum target: 320px.

Check:
- dimensions
- labels
- legends
- tooltips
- overflow
- scrolling
- readability

---

# 20. Logistics

Communicate:
- order
- source
- destination
- quantity
- route
- status
- delivery progress

Do not claim a route is optimized unless implementation actually performs optimization.
Simplified/demo routing is acceptable if clearly represented.

---

# 21. Order Lifecycle

Example:
PLACED
↓
CONFIRMED
↓
PICKUP
↓
IN TRANSIT
↓
DELIVERED

Communicate:
- current state
- previous state
- next state
- timestamps where available
- quantity
- seller
- buyer
- delivery information

---

# 22. DoCA / Government Dashboard

Useful information may include:
- crop prices
- price trends
- regional comparisons
- direct marketplace prices
- reference/mandi prices
- demand
- supply
- farmer benefit
- buyer benefit
- transaction activity

Avoid decorative analytics.
Government price information must be labeled accurately.
Do not represent fabricated data as official government data.

---

# 23. Impact Dashboard

Possible metrics:
- farmer realization
- buyer savings
- volume traded
- direct transactions
- intermediary reduction
- fulfilled orders
- delivery performance

Only use claims supported by available data.

---

# 24. Navigation

Navigation should be role-aware, understandable on mobile,
and avoid unnecessary depth.

---

# 25. Design System

Use a consistent AgriDirect visual language communicating:
- agriculture
- trust
- marketplace
- direct trade
- intelligence
- government credibility

Avoid generic SaaS admin styling, excessive gradients,
excessive glassmorphism, and decorative UI competing with core information.

---

# 26. Color System

Use a restrained agricultural palette:
- agricultural green
- dark green
- light green
- warm neutral
- white
- charcoal/text neutral

Semantic:
- success: green
- warning: amber
- danger: red
- informational: blue where appropriate

Never rely on color alone.

---

# 27. Typography

Prioritize readability.
Use strong hierarchy, large price numbers, readable body text,
sufficient line height, and adequate contrast.
Farmer screens should use larger, simpler typography.

---

# 28. Cards

Priority:
1. Crop / product
2. Price
3. Quantity / availability
4. Important AI or market signal
5. Seller/location
6. Secondary metadata
7. Action

---

# 29. Buttons

Prefer:
- Sell Produce
- Buy Now
- Request Quote
- View Match
- Track Order
- View Forecast

Avoid vague labels when specific action wording is possible.

---

# 30. Responsive Requirements

Target:
320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, 1920px

Mobile:
- stacked cards
- reachable actions
- simplified navigation
- readable charts
- appropriate touch targets

Tablet:
- balanced layouts where appropriate

Desktop:
- multi-column layouts
- dashboards
- analytics
- wider marketplace grids

Layouts must adapt, not merely shrink.

---

# 31. Accessibility

Minimum:
- semantic HTML
- keyboard accessibility
- visible focus states
- sufficient contrast
- descriptive buttons
- alt text
- form labels
- accessible status indicators

---

# 32. Localization Readiness

Support architecture for:
- English
- Hindi
- Bengali

Avoid English-only layout assumptions and text baked into images.
Keep labels replaceable and allow longer localized text.

---

# 33. Low-Bandwidth Considerations

Avoid unnecessary:
- large images
- autoplay video
- heavy animation
- excessive client-side dependencies
- unnecessary API calls

Use optimized images, lazy loading where appropriate,
lightweight components, and clear loading states.

---

# 34. Performance

Avoid unnecessary rerenders and dependencies.
Avoid loading heavy libraries globally when one route needs them.
Optimize images and review large dashboard components for avoidable issues.

---

# 35. State Preservation

Important flow:
Farmer creates listing
↓
Listing persists in frontend state
↓
Buyer opens marketplace
↓
Listing is visible

Use existing state architecture where possible.

---

# 36. Existing Architecture

Before implementation inspect:
- package.json
- app/pages routes
- components
- state management
- API/service wrappers
- mock data
- styling system
- chart implementation
- existing tests
- available browser tooling

Actual repository is implementation reality.

---

# 37. Golden Demo Path

1. Farmer logs in
2. Farmer sees today's market
3. Farmer sees current and expected price
4. Farmer sees AI recommendation
5. Farmer creates produce listing
6. Buyer opens marketplace
7. Buyer sees farmer/FPO listing
8. Buyer creates or views RFQ
9. System shows matching/aggregation
10. Order progresses
11. Logistics shows delivery
12. Forecast shows market prediction
13. Government dashboard shows price intelligence
14. Impact dashboard shows marketplace value

Mock/demo data is acceptable where backend integration is unavailable,
but must not be falsely represented as live production data.

---

# 38. What Not To Do

Do not:
- rewrite the entire frontend unnecessarily
- replace working architecture without reason
- create disconnected demo screens
- fabricate AI accuracy
- fabricate government statistics
- fabricate real-time prices
- fabricate logistics optimization results
- hide broken functionality
- use identical generic icons for all crops
- bury important prices
- bury farmer AI insights
- make farmer screens look like admin dashboards
- add infrastructure without need
- add dependencies without justification
- break existing routes
- remove working functionality
- claim visual verification without actually performing it

---

# 39. Priority Rules

P0 — Functional correctness
P1 — Core SIH functionality
P2 — Farmer usability
P3 — Responsive behavior
P4 — Accessibility
P5 — Visual polish
P6 — Secondary enhancements

Fix P0 before significant P5 polish.

---

# 40. Verification Rules

Allowed:
PASS
UNVERIFIED
BLOCKED
FAIL

PASS = actually verified with evidence.
UNVERIFIED = not adequately verifiable with available tooling.
BLOCKED = dependency prevents implementation/verification.
FAIL = verification attempted and failed.

Never convert UNVERIFIED to PASS without new evidence.
Never claim browser/screenshot/build verification without actually doing it.

---

# 41. Evidence

Evidence may include:
- terminal command output
- test output
- route inspection
- component inspection
- browser interaction
- screenshot
- generated artifact
- reproducible manual verification

Evidence must be recorded in ACCEPTANCE.md.

---

# 42. Change Safety

Before deleting/replacing existing implementation:
1. determine dependencies,
2. determine whether it is functional,
3. prefer incremental modification,
4. preserve behavior unless specification requires change.

---

# 43. Final Quality Bar

Ready for demo review when:
- core routes work
- farmer workflow works
- marketplace works
- listing state persists
- prices have strong hierarchy
- crop imagery is differentiated
- AI insights are visible
- forecast visualization actually renders
- RFQ is understandable
- aggregation is understandable
- logistics is understandable
- order lifecycle is understandable
- government analytics are credible
- impact is understandable
- mobile and desktop layouts work
- accessibility basics are covered
- lint/typecheck/build succeed where applicable
- acceptance items have evidence
- no major P0/P1 defect remains

---

# 44. Source of Truth Rule

Read this file before significant frontend changes.
Do not invent conflicting requirements.

If repository and document disagree:
1. inspect repository,
2. record discrepancy in FRONTEND_AUDIT.md,
3. resolve using smallest safe implementation,
4. preserve working functionality,
5. update documentation if the specification itself needs to change.
