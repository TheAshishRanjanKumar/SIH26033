# SIH26033 — Agent Definition of Done Checklist

Before saying "done", verify every applicable item.

## Repository
[ ] I inspected existing code first.
[ ] I searched for existing implementations.
[ ] I stayed within assigned scope.
[ ] I did not overwrite unrelated work.

## Code
[ ] Naming is clear.
[ ] Types/validation are correct.
[ ] Error handling exists.
[ ] No unnecessary dependency was added.
[ ] No debug code remains.
[ ] No secrets are present.

## Frontend
[ ] Desktop works.
[ ] Mobile works.
[ ] Loading state exists where needed.
[ ] Empty state exists where needed.
[ ] Error state exists where needed.
[ ] Existing shared components were reused.

## Backend
[ ] Endpoint does what it claims.
[ ] Request validation works.
[ ] Authorization works.
[ ] Unauthorized requests are rejected.
[ ] Not-found cases are handled.
[ ] API contract is recorded.

## Database
[ ] Schema was inspected first.
[ ] Migration used for changes.
[ ] Relationships are correct.
[ ] Constraints/indexes are appropriate.

## ML
[ ] Data source is recorded.
[ ] Target definition is explicit.
[ ] Preprocessing is reproducible.
[ ] Baseline exists.
[ ] Evaluation metrics are recorded.
[ ] Model artifact/inference works.

## Logistics
[ ] Road routing uses OSRM where applicable.
[ ] Optimization uses OR-Tools where applicable.
[ ] Demo/synthetic locations are labelled.

## Testing
[ ] Relevant tests were run.
[ ] Lint/type checks were run where applicable.
[ ] Build was run where applicable.
[ ] Failures caused by my changes are fixed.

## Handoff
[ ] Changed files listed.
[ ] API/DB changes listed.
[ ] Dependencies listed.
[ ] Known issues listed.
[ ] Next-agent instructions written.
