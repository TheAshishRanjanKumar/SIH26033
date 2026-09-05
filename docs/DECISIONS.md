# Architecture Decision Record Summary

## ADR-001 — Modular Monolith for Hackathon

**Decision:** Use a modular monolith instead of multiple independently deployed microservices.

**Reason:** Faster development, easier debugging, lower infrastructure overhead.

## ADR-002 — FastAPI Backend

**Decision:** Use FastAPI.

**Reason:** Python is already required for AI/ML, reducing language/service fragmentation.

## ADR-003 — PostgreSQL + PostGIS

**Decision:** Use PostgreSQL with PostGIS.

**Reason:** Transactions plus geospatial queries in one primary datastore.

## ADR-004 — OR-Tools for Route Optimization

**Decision:** Use OR-Tools for prototype vehicle-routing optimization.

**Reason:** Provides a practical solver for constrained routing.

## ADR-005 — PostgreSQL Search for MVP

**Decision:** Do not add Elasticsearch initially.

**Reason:** MVP search/filter requirements can be handled with indexed PostgreSQL queries.

## ADR-006 — Synthetic Data Disclosure

**Decision:** Synthetic data may be used when sufficient real data is unavailable, but must be visibly labeled.

**Reason:** Prevents misleading claims during judging.
