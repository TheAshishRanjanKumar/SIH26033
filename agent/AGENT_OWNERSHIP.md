# SIH26033 — Agent Ownership and Coordination

## Rule
One module = one owner at a time.

Before editing a shared file, verify whether another active task owns it.

## Suggested Ownership

Frontend Foundation:
- /frontend/components/ui
- global layout/theme
- shared frontend utilities

Farmer:
- /frontend/app/farmer
- farmer-specific components

Marketplace:
- /frontend/app/marketplace
- /frontend/app/cart
- consumer-specific components

Bulk Buyer:
- /frontend/app/buyer
- buyer-specific components

FPO:
- /frontend/app/fpo

Logistics Frontend:
- /frontend/app/logistics

Admin:
- /frontend/app/admin

Backend Auth:
- backend auth module

Backend Marketplace:
- backend marketplace module

Backend Orders:
- backend orders module

Backend RFQ/Matching:
- backend RFQ/matching module

Database:
- migrations
- database models/schema
- database indexes/constraints

ML:
- /ml
- ML datasets/processing/training/evaluation/inference

Logistics:
- logistics routing/optimization module

QA:
- tests only, unless fixing a test-required defect in coordination with the owner

Integration:
- cross-module integration
- API wiring
- contract verification

## Shared Files
Treat these as high-risk:
- package manifests
- lockfiles
- environment templates
- routing configuration
- global styles
- database base configuration
- API client configuration

Change them only when necessary and mention changes in handoff.

## If Two Agents Need the Same File
Do not blindly edit concurrently.

Preferred order:
1. Coordinate ownership.
2. Make the smallest compatible change.
3. Preserve both changes.
4. Run tests after merging.

## Handoff Format

TASK COMPLETED:
...

FILES:
...

APIS:
...

DATABASE:
...

TESTS:
...

DEPENDENCIES:
...

KNOWN ISSUES:
...

NEXT AGENT SHOULD:
...

## Definition of Done
A task is complete only when:
- implementation exists
- existing functionality is preserved
- relevant tests/checks pass
- no secrets are exposed
- API/schema changes are recorded
- next agent can understand the state
