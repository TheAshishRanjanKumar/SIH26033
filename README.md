# AgriDirect — SIH26033

**Smart India Hackathon 2026 — Internal Hackathon Documentation**

> **Problem Statement:** SIH26033 — Multiple intermediaries reduce farmers' earnings and increase consumer prices.

## 1. Problem Alignment

The official problem statement requires a digital marketplace that:
- connects farmers/FPOs directly with consumers and bulk buyers;
- provides logistics support;
- uses AI for demand forecasting and route optimization.

Expected benefits are better prices for farmers, lower prices for consumers, and reduced supply-chain inefficiencies.

## 2. Product Vision

AgriDirect is an AI-assisted farm-to-market marketplace designed to demonstrate how farmers/FPOs can discover buyers directly, aggregate supply, fulfill orders efficiently, and use demand intelligence to plan sales and logistics.

## 3. Core Demo

The complete demo should show:

```text
Farmer/FPO
   ↓
Produce Listing
   ↓
Buyer / Consumer Discovery
   ↓
Bulk RFQ / Direct Order
   ↓
Supply Matching & Aggregation
   ↓
AI Demand Forecast
   ↓
Route Optimization
   ↓
Delivery
   ↓
Settlement & Impact Dashboard
```

## 4. Hackathon MVP

### Must work
1. Authentication and roles
2. Farmer/FPO onboarding
3. Produce listing
4. Marketplace search/filter
5. Bulk buyer RFQ
6. Farmer/FPO offer matching
7. Order creation and status lifecycle
8. Demand forecasting
9. Route optimization
10. Basic shipment tracking
11. Farmer earnings and buyer savings/impact view

### Prototype / simulated
- Payment settlement
- KYC verification
- External logistics integration
- SMS/WhatsApp
- Live GPS
- Government data integrations

### Out of scope
- Owning physical warehouses/cold-chain infrastructure
- Government subsidy disbursement
- International/export marketplace
- Crop insurance and crop-loan integrations

## 5. Recommended Stack

| Layer | Choice |
|---|---|
| Web | Next.js + TypeScript + Tailwind CSS |
| Backend | Python FastAPI |
| Database | PostgreSQL + PostGIS |
| Cache | Redis |
| AI/ML | Python, Pandas, NumPy, scikit-learn/XGBoost |
| Route Optimization | Google OR-Tools |
| Maps | OpenStreetMap + OSRM |
| Auth | JWT + OTP abstraction |
| Testing | pytest + frontend component tests |
| Dev | Docker Compose + GitHub |

Use a **modular monolith** for the hackathon rather than a production microservice architecture.

## 6. Documentation

- `docs/PRD.md` — product requirements and scope
- `docs/ARCHITECTURE.md` — technical architecture
- `docs/API_DOCUMENTATION.md` — API contract
- `docs/DATABASE_SCHEMA.md` — database design
- `docs/AI_ML.md` — forecasting and ML plan
- `docs/LOGISTICS.md` — matching and route optimization
- `docs/UI_UX.md` — screens and interaction requirements
- `docs/SECURITY.md` — security requirements
- `docs/TESTING.md` — testing strategy
- `docs/DEMO_SCRIPT.md` — final presentation/demo flow
- `docs/TEAM_PLAN.md` — team responsibilities
- `docs/CONTRIBUTING.md` — Git workflow
- `docs/MVP_SCOPE.md` — scope control

## 7. Source of Truth

The official PS defines the core problem and expected solution. Product features, architecture, technology choices, and implementation details in this repository are the team's proposed design decisions for the internal hackathon prototype.
