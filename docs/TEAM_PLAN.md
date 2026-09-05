# Team Plan — SIH Internal Hackathon

## Current Team

We are currently working as a **4-member team**. The plan below is intentionally cross-functional so the team can build the complete MVP without creating unnecessary silos.

| Member | Primary Responsibility | Secondary Responsibility |
|---|---|---|
| **Ashish Ranjan Kumar** | Product / Full-Stack | Architecture & Integration |
| **Abhishek Kumar Rai** | Backend / API | Database & Integration |
| **Shikha Kumari** | AI/ML | Data & Analytics |
| **Bhanu Bhavya** | Frontend / UI-UX | Testing & Demo |

> Specific ownership can be adjusted as implementation progresses. The names are confirmed; role assignments are the current working plan.

## Responsibility Areas

### Product & Frontend
- Farmer/FPO dashboard
- Buyer marketplace
- RFQ screens
- Order and logistics views
- Responsive and mobile-friendly UX
- Demo polish

### Backend & Database
- FastAPI application structure
- Authentication and role-based access
- Marketplace, listing, RFQ and order APIs
- PostgreSQL/PostGIS schema and migrations
- Seed/demo data
- Frontend/backend integration

### AI / ML
- Demand dataset preparation
- Forecasting baseline
- Feature engineering
- Model evaluation
- Forecast API
- Explainable forecast output

### Logistics & Optimization
- Pickup/delivery location handling
- Distance matrix
- Vehicle capacity constraints
- OR-Tools route optimization
- Shipment and route APIs
- Prototype tracking/ETA simulation

### QA, DevOps & Presentation
- Unit and integration tests
- End-to-end demo validation
- Docker Compose setup
- Environment/configuration checks
- Demo script and presentation support

## Build Strategy

Because the team has four members, we will **combine related responsibilities instead of building separate microservices or departments**.

Priority order:

1. Core marketplace
2. Farmer/FPO produce listing
3. Bulk buyer RFQ
4. Supply matching and aggregation
5. Order lifecycle
6. AI demand forecasting
7. Route optimization
8. Logistics dashboard
9. Impact analytics
10. Optional enhancements only after the P0 flow is stable

## Working Rule

Every important module should have:
- one clear owner;
- at least one backup/secondary contributor;
- a documented API or interface;
- a working demo path;
- tests for critical behaviour.

Avoid one-person-only knowledge for core features.

## Scope Discipline

The team will prioritize a **reliable end-to-end demonstration** over a large feature count. P2/P3 features such as real payment settlement, real 3PL integration, live GPS, SMS/WhatsApp, Aadhaar KYC, voice/IVR, Kubernetes and Elasticsearch are not allowed to delay the core SIH requirements.
