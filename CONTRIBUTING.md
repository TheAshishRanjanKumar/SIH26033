# Contributing to AgriDirect (SIH26033)

Thanks for contributing to our Smart India Hackathon 2026 submission! This guide keeps our team's workflow consistent under a tight deadline.

## 1. Branching Strategy

- `main` — always demo-ready/stable.
- `develop` — integration branch for ongoing work.
- `feature/<short-description>` — one branch per feature (e.g., `feature/listing-search`, `feature/route-optimizer`).
- `fix/<short-description>` — bug fixes.

Merge into `develop` via Pull Request; merge `develop` → `main` only when stable and demo-tested.

## 2. Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add demand forecasting endpoint
fix: correct escrow release trigger on delivery
docs: update API documentation for orders
chore: add docker-compose for ml-service
```

## 3. Pull Request Checklist

- [ ] Code builds and runs locally (`docker-compose up` or module-specific run command).
- [ ] Linting passes (`npm run lint` / `flake8` for Python).
- [ ] New/changed endpoints are reflected in `docs/API_DOCUMENTATION.md`.
- [ ] No secrets or API keys committed (`.env` is git-ignored).
- [ ] PR description explains what changed and links the relevant PRD section/user story ID.

## 4. Coding Standards

| Layer | Standard |
|---|---|
| JavaScript/TypeScript | ESLint + Prettier, functional React components with hooks |
| Python | PEP8, type hints, `black` formatter |
| API design | RESTful, versioned (`/api/v1/...`), consistent error format (see API_DOCUMENTATION.md §9) |
| Database migrations | Use a migration tool (e.g., Prisma Migrate, Alembic) — never hand-edit production schema |

## 5. Environment Setup

1. Copy `.env.example` to `.env` and fill in local values (DB credentials, API keys for maps/payments/SMS — use sandbox/test keys only).
2. Never commit real credentials, even sandbox ones with quota implications.
3. Run `docker-compose up --build` to bring up backend, frontend, ML service, and databases together.

## 6. Testing

- Backend: unit tests for services (Jest for Node.js / pytest for Python), integration tests for critical flows (order → payment → escrow release).
- Frontend: component tests (React Testing Library) for core flows (listing creation, checkout).
- Before a demo/milestone, run through the end-to-end scenario: farmer lists produce → buyer orders → logistics assigns route → payment settles.

## 7. Issue Tracking

- Use GitHub Issues (or the team's chosen tracker) labeled by module: `frontend`, `backend`, `ml`, `logistics`, `docs`.
- Tag issues with the corresponding PRD user story ID (e.g., `US-04`) where applicable.

## 8. Communication

- Daily/alternate-day stand-up (async on chat is fine) covering: what's done, what's next, any blockers.
- Major architecture or scope decisions should be recorded in `ARCHITECTURE.md` or as an ADR (Architecture Decision Record) in `docs/adr/`.

## 9. Code of Conduct

Be respectful, give constructive feedback in reviews, and credit teammates' contributions. This is a team effort under deadline pressure — communicate blockers early rather than silently struggling.
