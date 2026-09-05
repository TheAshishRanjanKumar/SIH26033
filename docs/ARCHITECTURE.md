# System Architecture — AgriDirect

## 1. Architecture Decision

For the SIH internal hackathon, use a **modular monolith** with a separate Python ML module/service where useful.

Do not introduce Kubernetes, Elasticsearch, a data warehouse, or multiple independently deployed business microservices unless the team later proves they are necessary.

## 2. High-Level Architecture

```text
                    ┌──────────────────────────┐
                    │ Next.js Web Application   │
                    │ Farmer / Buyer / Admin UI │
                    └────────────┬─────────────┘
                                 │ HTTPS/JSON
                                 ▼
                    ┌──────────────────────────┐
                    │       FastAPI Backend     │
                    │ Auth / Marketplace / RFQ  │
                    │ Orders / Logistics / Admin│
                    └───────┬─────────┬────────┘
                            │         │
                 ┌──────────┘         └──────────┐
                 ▼                               ▼
        ┌─────────────────┐              ┌─────────────────┐
        │ PostgreSQL      │              │ Redis           │
        │ + PostGIS       │              │ Cache / jobs    │
        └─────────────────┘              └─────────────────┘
                 │
                 ▼
        ┌────────────────────────────────────────┐
        │ Python AI/Optimization Module          │
        │ Demand Forecasting + OR-Tools routing  │
        └──────────────────┬─────────────────────┘
                           │
                           ▼
                   ┌───────────────┐
                   │ OSM / OSRM    │
                   │ Maps & routes │
                   └───────────────┘
```

## 3. Backend Modules

- `auth`
- `users`
- `farmers`
- `fpos`
- `marketplace`
- `rfq`
- `matching`
- `orders`
- `logistics`
- `forecasting`
- `analytics`
- `notifications`
- `payments` (prototype abstraction)

## 4. Data Flow

### Marketplace
Farmer → API → validation → PostgreSQL → marketplace query → buyer.

### RFQ
Buyer → RFQ → matching engine → eligible listings → offers → acceptance → order.

### Forecasting
Historical order/market data → cleaning → features → model → forecast → API/dashboard.

### Logistics
Orders → pickup/drop points → vehicle constraints → route solver → route → shipment status.

## 5. External Services

External integrations are adapters, not hard dependencies:
- Maps: OpenStreetMap/OSRM
- Payment: sandbox/provider adapter
- Notifications: FCM/SMS/WhatsApp adapter
- Market data: approved/public dataset adapter

## 6. Scalability

For the prototype:
- PostgreSQL indexes for marketplace queries
- Redis only where caching/queues help
- background jobs for forecasting and route optimization

Production evolution can later split modules into services.

## 7. Reliability

- Validate every API input.
- Use database transactions for order state changes.
- Keep order/payment state transitions explicit.
- Store audit events for important changes.
- Fail gracefully when external APIs are unavailable.
