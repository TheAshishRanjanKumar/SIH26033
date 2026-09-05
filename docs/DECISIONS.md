# Architecture Decision Record Summary

## ADR-001 — Modular Monolith for Hackathon

**Decision:** Use a modular monolith instead of multiple independently deployed microservices.

**Reason:** The team currently has four members, so a modular monolith keeps development, debugging and deployment manageable while preserving clear module boundaries.

## ADR-002 — FastAPI Backend

**Decision:** Use FastAPI.

**Reason:** Python is already required for AI/ML, reducing language/service fragmentation.

## ADR-003 — PostgreSQL + PostGIS

**Decision:** Use PostgreSQL with PostGIS.

**Reason:** Transactions plus geospatial queries can be handled in one primary datastore.

## ADR-004 — OR-Tools for Route Optimization

**Decision:** Use OR-Tools for prototype vehicle-routing optimization.

**Reason:** It provides a practical solver for constrained routing without requiring a large infrastructure footprint.

## ADR-005 — PostgreSQL Search for MVP

**Decision:** Do not add Elasticsearch initially.

**Reason:** MVP search/filter requirements can be handled with indexed PostgreSQL queries.

## ADR-006 — Synthetic Data Disclosure

**Decision:** Synthetic data may be used when sufficient real data is unavailable, but must be visibly labelled.

**Reason:** Prevents misleading claims during judging.

## ADR-007 — AI Is a Core MVP Capability

**Decision:** Demand forecasting and route optimization are part of the core demo rather than deferred to a final optional phase.

**Reason:** They directly correspond to the AI requirements in SIH26033 and are central to the proposed solution.

## ADR-008 — No Unsupported Impact Statistics

**Decision:** Do not hard-code claims such as a fixed number of intermediaries or a fixed percentage of the retail price received by farmers unless the team adds an authoritative source.

**Reason:** The documentation should distinguish the official problem statement from assumptions and team-proposed metrics.
