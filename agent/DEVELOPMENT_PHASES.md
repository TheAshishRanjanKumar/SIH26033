# SIH26033 — Multi-Agent Development Phases

Use these phases as the master execution order. Do not skip foundational work unless the project already contains an equivalent implementation.

## Phase 0 — Repository Audit
Agent: Audit
- Inspect entire repository.
- Identify current frontend/backend/database/ML/logistics state.
- Find broken, incomplete and reusable parts.
- Do not make feature changes.
- Produce a concise audit and recommended task breakdown.

## Phase 1 — Frontend Foundation
Agent: Frontend Foundation
Build/reuse:
- app layout
- design tokens
- navigation
- responsive shell
- Button
- Input
- Select
- Card
- Badge
- Modal
- Table
- Toast
- Loading/Skeleton
- Error/Empty states
Goal: every later frontend agent reuses these components.

## Phase 2 — Farmer
Agent: Farmer
Pages:
- farmer dashboard
- listings
- add/edit produce
- orders
- demand forecast
- earnings
Features:
- create/update/delete listing
- inventory
- order status
- forecast visualization

## Phase 3 — Marketplace / Consumer
Agent: Marketplace
Pages:
- marketplace
- product details
- cart
- checkout/order creation
- orders
- order details/tracking
Features:
- search
- filters
- categories
- farmer/FPO information
- quantity
- ordering

## Phase 4 — Bulk Buyer
Agent: Bulk Buyer
Pages:
- buyer dashboard
- create RFQ
- RFQs
- RFQ details
- matches
- bulk orders
Features:
- quantity
- delivery location
- required date
- price preference
- supply matching
- aggregation

## Phase 5 — FPO
Agent: FPO
Pages:
- dashboard
- farmers
- inventory
- aggregation
- orders
- analytics
Features:
- farmer management
- aggregate produce
- bulk fulfillment

## Phase 6 — Backend Core
Split ownership:
- Auth
- Marketplace
- Orders
- RFQ/Matching
Each agent owns its module and avoids unrelated changes.

## Phase 7 — Database
Agent: Database
Implement/verify:
- users
- farmers
- FPOs
- buyers
- produce
- listings
- orders
- order_items
- RFQs
- matches
- vehicles
- routes
- forecasts
- notifications
Use migrations, relationships, constraints and indexes.

## Phase 8 — ML Demand Forecasting
Agent: ML
1. Acquire/organize data.
2. Clean data.
3. Build unified dataset.
4. Create baseline.
5. Engineer features.
6. Train candidate models.
7. Evaluate with MAE/RMSE.
8. Save best model.
9. Build inference pipeline/API.
10. Connect to farmer dashboard.

Do not claim direct consumer-demand measurement from mandi arrival data.

## Phase 9 — Logistics
Agent: Logistics
Flow:
orders -> pickup locations -> OSRM distance/time -> distance matrix -> OR-Tools -> optimized route -> map UI.

Support:
- vehicle capacity
- pickup stops
- buyer destination
- route summary
- distance/time
- demo tracking

## Phase 10 — Admin
Agent: Admin
Pages:
- dashboard
- users
- listings
- orders
- analytics
Functions:
- user management
- verification
- marketplace monitoring
- order monitoring
- analytics

## Phase 11 — Integration
Agent: Integration
Verify real end-to-end flow:
Frontend -> API -> backend -> database -> ML/logistics -> frontend.

Remove accidental fake/stub connections from production paths.
Verify authentication and authorization across roles.

## Phase 12 — QA
Agent: QA
Test:
- auth
- farmer flow
- consumer flow
- buyer RFQ
- matching
- orders
- ML inference
- route generation
- role authorization
- responsive UI
- error handling

## Phase 13 — UI Polish
Agent: UI/UX
Only polish:
- spacing
- hierarchy
- animations
- charts
- loading states
- empty states
- responsive behavior
- consistency

Do not rewrite backend architecture.

## Phase 14 — Demo Mode
Agent: Demo
Create a reliable 5–7 minute demo:
Farmer adds produce
-> AI forecasts demand
-> Bulk buyer creates requirement
-> System matches multiple supplies
-> Supply is aggregated
-> Route is optimized
-> Order progresses
-> Impact dashboard shows results.

Every demo-only dataset or simulated GPS value must be clearly labelled internally as demo data.
