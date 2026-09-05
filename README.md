# 🌾 SIH26033 Solution — Direct Farm-to-Market Marketplace

**Smart India Hackathon 2026 · Problem Statement SIH26033**

[![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-orange?style=for-the-badge)](https://sih.gov.in/sih2026PS)
[![PS Number](https://img.shields.io/badge/PS-SIH26033-blue?style=for-the-badge)](https://sih.gov.in/sih2026PS)
[![Category](https://img.shields.io/badge/Category-Software-2ea44f?style=for-the-badge)](https://sih.gov.in/sih2026PS)
[![Status](https://img.shields.io/badge/Status-Internal%20Hackathon%20MVP-yellow?style=for-the-badge)]()

> **Connecting farmers and FPOs directly with consumers and bulk buyers — with AI-powered demand forecasting and logistics optimization.**

SIH26033 Solution is our proposed software solution for SIH26033. It combines a direct agricultural marketplace, bulk procurement workflows, supply matching, AI demand forecasting, and route optimization into one end-to-end platform.

---

## 📌 Problem Statement

**SIH26033 — Multiple intermediaries reduce farmers' earnings and increase consumer prices.**

| Field | Details |
|---|---|
| **PS Number** | SIH26033 |
| **Organization** | Ministry of Consumer Affairs, Food & Public Distribution |
| **Department** | Department of Consumer Affairs (DoCA) |
| **Category** | Software |
| **Expected Solution** | Direct digital marketplace + logistics support + AI demand forecasting & route optimization |
| **Deadline listed for SIH 2026** | 20 September 2026 |

The expected solution calls for a digital marketplace connecting farmers/FPOs directly with consumers and bulk buyers, logistics support, and AI for demand forecasting and route optimization.

---

## 🎯 Our Vision

Agricultural supply chains can become more efficient when supply and demand are connected digitally instead of relying on fragmented discovery and coordination.

**SIH26033 Solution focuses on four things:**

- 🧑‍🌾 **Direct market access** for farmers and FPOs
- 🛒 **Transparent procurement** for consumers and bulk buyers
- 🧠 **Demand intelligence** through AI forecasting
- 🚚 **Smarter logistics** through route optimization

### Core Value Proposition

```text
Farmer / FPO
      ↓
List Available Produce
      ↓
Direct Marketplace
      ↓
Consumer / Bulk Buyer
      ↓
RFQ + Supply Matching
      ↓
Aggregation
      ↓
AI Demand Forecast
      ↓
Route Optimization
      ↓
Delivery
      ↓
Impact Dashboard
```

---

## ✨ Key Features

| Feature | What it does |
|---|---|
| 🧑‍🌾 **Farmer & FPO Onboarding** | Role-based onboarding and profiles with location information |
| 🌾 **Produce Marketplace** | List and discover produce by crop, quantity, price, quality and location |
| 📦 **Bulk RFQ** | Bulk buyers can request specific quantities and delivery requirements |
| 🤝 **Supply Matching** | Match RFQs with compatible farmer/FPO listings |
| 🧺 **Supply Aggregation** | Combine multiple compatible listings for larger requirements |
| 🧠 **AI Demand Forecasting** | Estimate regional crop demand for a configurable forecast horizon |
| 🚚 **Route Optimization** | Generate efficient pickup/delivery routes using vehicle constraints |
| 📍 **Shipment Tracking** | Show order/shipment status with simulated tracking where required |
| 📊 **Impact Dashboard** | Visualize farmer price realization, buyer savings and logistics metrics |

### Optional Enhancements

Price recommendation, ratings/reviews, payment sandbox, richer notifications and other integrations may be added only after the core SIH flow is stable.

---

## 🧠 AI & Logistics

AI is **not a decorative add-on** in SIH26033 Solution. It is part of the core demonstration.

### Demand Forecasting

```text
Historical Orders / Market Data
              ↓
       Data Validation
              ↓
      Feature Engineering
              ↓
        Model Training
              ↓
          Evaluation
              ↓
      Demand Forecast API
              ↓
     Farmer / Buyer Planning
```

The prototype will start with a simple baseline and move to a stronger model only when the available data justifies it. Synthetic data may be used when real data is insufficient and will be clearly labelled.

### Route Optimization

The logistics module treats delivery planning as a constrained optimization problem using:

- pickup and delivery locations;
- order quantities;
- vehicle capacity;
- route distance/cost;
- delivery constraints.

The prototype uses **Google OR-Tools** for route optimization and **OpenStreetMap/OSRM** for map/routing support.

---

## 🛠️ Proposed Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js + TypeScript + Tailwind CSS |
| **Backend** | Python + FastAPI |
| **Database** | PostgreSQL + PostGIS |
| **Caching** | Redis |
| **AI / ML** | Python, Pandas, NumPy, scikit-learn / XGBoost |
| **Optimization** | Google OR-Tools |
| **Maps / Routing** | OpenStreetMap + OSRM |
| **Authentication** | JWT + OTP abstraction |
| **Testing** | pytest + frontend component/E2E tests |
| **Development** | Docker Compose + GitHub |

### Architecture Principle

We are using a **modular monolith** for the hackathon rather than multiple independently deployed microservices. This keeps development, debugging and deployment manageable for a four-person team.

---

## 🏗️ High-Level Architecture

```text
┌───────────────────────────────────────────────┐
│                 Next.js Web App               │
│  Farmer · FPO · Consumer · Buyer · Logistics │
└───────────────────────┬───────────────────────┘
                        │ REST API
                        ▼
┌───────────────────────────────────────────────┐
│                  FastAPI Backend               │
│ Auth · Marketplace · RFQ · Orders · Logistics│
└───────────────┬───────────────┬───────────────┘
                │               │
                ▼               ▼
       ┌────────────────┐  ┌──────────────────┐
       │ PostgreSQL +   │  │ AI / Optimization│
       │ PostGIS + Redis│  │ Forecast + Routes│
       └────────────────┘  └──────────────────┘
```

---

## 📂 Repository Structure

```text
SIH26033/
├── docs/
│   ├── PRD.md
│   ├── MVP_SCOPE.md
│   ├── ARCHITECTURE.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── AI_ML.md
│   ├── LOGISTICS.md
│   ├── UI_UX.md
│   ├── SECURITY.md
│   ├── TESTING.md
│   ├── DEMO_SCRIPT.md
│   ├── TEAM_PLAN.md
│   ├── CONTRIBUTING.md
│   ├── RESEARCH_AND_DATA.md
│   ├── PROJECT_STRUCTURE.md
│   └── DECISIONS.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker + Docker Compose
- Git

### Clone

```bash
git clone https://github.com/IITian-Ashish/SIH26033.git
cd SIH26033
```

### Development

The application structure is being built around separate frontend and backend modules. See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) and [`docs/PROJECT_STRUCTURE.md`](./docs/PROJECT_STRUCTURE.md) for the implementation layout.

---

## 📚 Documentation

### Product & Scope

- [📋 Product Requirements](./docs/PRD.md)
- [🎯 MVP Scope](./docs/MVP_SCOPE.md)
- [🎨 UI/UX Requirements](./docs/UI_UX.md)
- [🎬 Demo Script](./docs/DEMO_SCRIPT.md)

### Engineering

- [🏗️ Architecture](./docs/ARCHITECTURE.md)
- [🔌 API Documentation](./docs/API_DOCUMENTATION.md)
- [🗄️ Database Schema](./docs/DATABASE_SCHEMA.md)
- [🧠 AI/ML Specification](./docs/AI_ML.md)
- [🚚 Logistics & Optimization](./docs/LOGISTICS.md)
- [🛡️ Security Requirements](./docs/SECURITY.md)
- [🧪 Testing Strategy](./docs/TESTING.md)

### Project Management

- [👥 Team Plan](./docs/TEAM_PLAN.md)
- [🤝 Contributing Guide](./docs/CONTRIBUTING.md)
- [🔍 Research & Data](./docs/RESEARCH_AND_DATA.md)
- [🏛️ Architecture Decisions](./docs/DECISIONS.md)

---

## 🗺️ MVP Roadmap

### Phase 1 — Foundation

- [ ] Project setup
- [ ] Authentication and roles
- [ ] Farmer/FPO profiles
- [ ] PostgreSQL/PostGIS setup

### Phase 2 — Marketplace

- [ ] Produce listings
- [ ] Marketplace search/filter
- [ ] Bulk buyer RFQ
- [ ] Supply matching
- [ ] Supply aggregation

### Phase 3 — AI + Logistics

- [ ] Demand forecasting baseline
- [ ] Forecast API
- [ ] Route optimization
- [ ] Shipment/order lifecycle
- [ ] Logistics dashboard

### Phase 4 — Demo & Hardening

- [ ] Impact dashboard
- [ ] Test critical flows
- [ ] Seed/demo dataset
- [ ] End-to-end demo rehearsal
- [ ] Final PPT/video integration

---

## 👥 Team

| Member | Current Responsibility |
|---|---|
| **Ashish Ranjan Kumar** | 🧠 Product · Full-Stack · Architecture |
| **Abhishek Kumar Rai** | ⚙️ Backend · API · Database |
| **Shikha Kumari** | 🤖 AI/ML · Data & Analytics |
| **Bhanu Bhavya** | 🎨 Frontend · UI/UX |
| **Janwi Kumari** | 📊 Research · Documentation · Testing |
| **Shreya** | 🚀 Frontend · Testing · Presentation |

> Responsibilities are the current working allocation and can be adjusted as implementation progresses.

---

## ⚠️ Prototype Disclosure

This repository describes an **internal hackathon prototype**, not a production financial, government or logistics platform.

Where real integrations are unavailable, the prototype may simulate:

- payment settlement;
- KYC verification;
- live GPS tracking;
- external logistics/3PL integration;
- SMS/WhatsApp notifications;
- external datasets.

Simulated or synthetic results must be clearly identified during the demo and in the documentation.

---

## 📜 License

License to be finalized by the team before public release.

---

## 🌱 Built for SIH 2026

SIH26033 Solution is our team's proposed implementation of **SIH26033**, focused on a practical, explainable and demo-ready path from **farmer supply → buyer demand → AI planning → optimized logistics**.
