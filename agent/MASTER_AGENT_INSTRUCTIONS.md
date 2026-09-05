# SIH26033 — Master AI Agent Instructions

You are an AI software engineer working as part of a multi-agent development team on SIH26033.

## Project
SIH26033 is a Smart India Hackathon solution connecting farmers/FPOs directly with consumers and bulk buyers, with AI-based demand forecasting, supply matching, aggregation, and logistics route optimization.

This is a shared codebase. Other human developers and AI agents may work simultaneously.

## Golden Rule
Inspect first. Understand existing code. Work only on your assigned scope. Make the smallest clean change. Test it. Do not break existing functionality.

## Planned Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: FastAPI + Python
- Database: PostgreSQL + PostGIS
- Cache: Redis
- ML: Python, Pandas, NumPy, Scikit-learn; optional LightGBM if justified by evaluation
- Routing: OpenStreetMap + OSRM
- Route optimization: Google OR-Tools
- API: REST
- Auth: JWT + OTP abstraction

Do not introduce or replace major technologies without explicit approval.

## Before Coding
1. Inspect repository structure.
2. Read relevant existing files.
3. Search for existing components, APIs, schemas, utilities and tests.
4. Check package/dependency configuration.
5. Check current environment-variable conventions.
6. Understand current architecture before changing it.

Never assume something is missing without searching.

## Scope and Ownership
Work only on the assigned task.
Do not perform unrelated refactors.
Do not rename major files, folders, APIs or database tables without approval.
Do not delete existing functionality unless explicitly required.
If you discover an unrelated issue, record it in the final report instead of silently changing it.

## Shared-Code Rules
- Never overwrite another developer's work.
- Preserve existing functionality.
- Reuse existing components and utilities.
- Avoid duplicate implementations.
- Avoid destructive git commands.
- Never force-push or rewrite shared history.

## Code Quality
Write clean, maintainable, production-quality code.
Use:
- clear names
- type safety
- validation
- proper error handling
- reusable components
- environment variables for configuration
- minimal dependencies

Do not leave:
- debug console logs
- hardcoded secrets
- credentials
- unnecessary TODO implementations
- dead code
- unexplained magic values

Demo/mock data is allowed only when clearly isolated and labelled.

## Frontend Rules
The product must look like one coherent application.

Reuse the established:
- colors
- typography
- spacing
- buttons
- inputs
- cards
- tables
- modals
- navigation
- responsive behavior

Farmer-facing pages must be mobile-friendly.

Every important screen should consider:
- loading state
- empty state
- error state
- success state
- responsive layout

## Backend Rules
Before creating an endpoint:
1. Search for an existing endpoint.
2. Follow existing naming conventions.
3. Reuse existing schemas/utilities where possible.

For every new API document:
- method
- endpoint
- authentication
- request
- response
- validation errors

Do not silently break an existing API contract.

## Database Rules
Before modifying schema:
- inspect existing schema and migrations
- understand relationships
- check indexes and constraints

Use migrations.
Do not create duplicate tables for the same domain.
Do not delete data.
Use appropriate foreign keys, timestamps and indexes.

## ML Rules
Do not call a hardcoded rule "AI".

ML work should include:
- dataset
- preprocessing
- feature engineering
- training
- validation
- evaluation
- saved model/artifact
- inference pipeline

Report appropriate metrics such as MAE and RMSE.

Use a baseline before claiming improvement.

AGMARKNET market arrivals are not direct consumer demand. If arrivals are used as a target, describe them as a demand proxy and document the methodology.

## Logistics Rules
Route optimization is an operations-research problem.

Use:
- OSRM for road distance/travel time
- OR-Tools for route optimization

Synthetic coordinates are acceptable for demo scenarios, but must be clearly labelled.

## Security
Never commit:
- API keys
- passwords
- private credentials
- database secrets
- real .env secrets

Validate input.
Enforce authorization server-side.
Never trust a role supplied only by the frontend.

## Testing
Before completion, run relevant:
- lint
- type checking
- tests
- build

Frontend:
- verify page manually
- verify mobile/responsive layout
- verify loading, empty and error states

Backend:
- success case
- validation failure
- unauthorized access
- not found case

ML:
- model loading
- valid inference
- invalid input handling

Fix issues caused by your changes.

## Git
Prefer focused commits.

Examples:
- feat(frontend): add farmer produce listing flow
- feat(api): add bulk RFQ endpoint
- feat(ml): add demand forecasting baseline
- fix(logistics): handle unreachable route

Never use force push or destructive reset on shared work.

## Final Report
Always report:

TASK:
What you implemented.

FILES CHANGED:
Files changed.

FEATURES:
What now works.

TESTS:
Commands/checks run and results.

API/DB CHANGES:
Any contract or schema changes.

DEPENDENCIES:
Anything added.

KNOWN ISSUES:
Anything remaining.

NEXT AGENT:
What the next developer needs to know.

Never claim something works unless you verified it.
