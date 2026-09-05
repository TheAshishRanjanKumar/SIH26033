# Team Plan — SIH26033

## 👥 Current Team

We are currently working as a **6-member team**. The plan below is cross-functional so the team can build and demonstrate the complete MVP while keeping responsibilities clear.

| # | Team Member | Primary Responsibility | Secondary Responsibility |
|---|---|---|---|
| 01 | **Ashish Ranjan Kumar** | Product / Full-Stack | Architecture & Integration |
| 02 | **Abhishek Kumar Rai** | Backend / API | Database & Integration |
| 03 | **Shikha Kumari** | AI/ML | Data & Analytics |
| 04 | **Bhanu Bhavya** | Frontend / UI-UX | Testing & Demo |
| 05 | **Janwi Kumari** | Research / Documentation | Testing & QA |
| 06 | **....** | Frontend / Presentation | Testing & Demo |

> Specific ownership can be adjusted as implementation progresses. The responsibilities above represent the current working allocation.

## Responsibility Areas

### Product & Architecture
- Problem understanding and requirement analysis
- Product planning and feature prioritization
- System architecture
- Cross-module integration
- Technical decision tracking

### Frontend & UI/UX
- Farmer/FPO dashboard
- Buyer marketplace
- Produce listing screens
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

### Research, QA & Documentation
- Problem-domain research
- Dataset research and validation
- Unit and integration tests
- End-to-end demo validation
- Technical documentation
- Demo script and presentation support

## Build Strategy

Because the team has six members, we will keep responsibilities modular and collaborative without introducing unnecessary architectural complexity.

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
