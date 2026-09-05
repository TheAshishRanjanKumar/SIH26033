# Contributing — AgriDirect

## Branches

- `main` — stable/demo-ready
- `develop` — integration
- `feature/<name>` — feature work
- `fix/<name>` — bug fixes

## Commit Convention

Use Conventional Commits:

```text
feat: add bulk rfq endpoint
fix: prevent negative listing quantity
docs: update route optimization
test: add order lifecycle tests
chore: update docker setup
```

## Pull Requests

Before merge:
- builds locally;
- tests pass;
- lint/format pass;
- API docs updated;
- no secrets;
- scope matches PRD.

## Code Standards

### TypeScript
- ESLint
- Prettier
- strict TypeScript where practical

### Python
- type hints
- Ruff
- Black
- pytest

### Database
Use migrations. Never manually modify the production schema.

## Environment

Copy `.env.example` to `.env`.

Use test/sandbox credentials only.

## Daily Team Check

Each member reports:
- completed;
- next;
- blocked by.

## Architecture Changes

Record major changes in `ARCHITECTURE.md`.
