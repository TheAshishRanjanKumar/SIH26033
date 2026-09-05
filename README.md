# 🌾 AgriDirect
> **Empowering Farmers, Connecting Consumers, Revolutionizing the Agricultural Supply Chain.**

[![SIH 2026](https://img.shields.io/badge/SIH-2026-orange)](https://sih.gov.in/sih2026PS)
[![PS Number](https://img.shields.io/badge/PS%20Number-SIH26033-blue)]()
[![Status](https://img.shields.io/badge/Status-Hackathon%20MVP-yellow)]()

*A Smart India Hackathon 2026 Project (Problem Statement SIH26033) for the Department of Consumer Affairs (DoCA).*

---

## 📖 The Vision

**The Problem:** The current agricultural supply chain is highly fragmented. Multiple intermediaries (middlemen) create a massive gap between what consumers pay and what farmers actually earn. This leads to supply chain inefficiencies, artificial price inflation, and reduced income for the very people growing our food.

**The AgriDirect Solution:** We are building a unified digital marketplace that bridges this gap. By connecting farmers and Farmer Producer Organizations (FPOs) directly with consumers and bulk buyers, AgriDirect ensures fairer prices, fresher produce, and a transparent agricultural ecosystem.

### 🎯 Who Benefits?
- 🧑‍🌾 **Farmers & FPOs:** Gain direct market access, fair price discovery, and visibility into market demand *before* harvest.
- 🛒 **Consumers & Bulk Buyers:** Enjoy fresher produce, lower and more transparent prices, and reliable delivery.
- 🏛️ **Government & Policymakers:** Access real-time market intelligence to monitor price trends, prevent volatility, and support the "Doubling Farmers' Income" initiative.

---

## ✨ How It Works (The Core Flow)
AgriDirect streamlines the entire farm-to-table process. Here is how our platform operates:

```text
🧑‍🌾 Farmer/FPO 
   ↓ 1. Lists Produce
🛒 Marketplace 
   ↓ 2. Buyer Discovers & Requests Bulk Quote (RFQ)
🤝 Supply Matching & Aggregation
   ↓ 3. AI Predicts Demand & Optimal Pricing
🚚 Route Optimization (AI-Driven Logistics)
   ↓ 4. Delivery & Live Tracking
💳 Settlement & Impact Dashboard (Showing Savings/Earnings)
```

---

## 🛠️ Hackathon MVP Scope

To deliver a high-quality prototype for SIH 2026, we are focusing on the most impactful core features:

### ✅ Core Features (Must Work)
1. **Farmer & Buyer Onboarding:** Secure authentication and role-based dashboards.
2. **Produce Listing & Marketplace Search:** Advanced filtering by crop, price, and location.
3. **Bulk Buyer RFQ & Matching:** Allow bulk buyers to request quotes and match with Farmer/FPO offers.
4. **Order Management:** Full lifecycle tracking from creation to delivery.
5. **AI Demand Forecasting:** Predict regional demand using historical and external data.
6. **Smart Route Optimization:** Cost-effective and efficient delivery paths.
7. **Impact Dashboards:** Real-time view of farmer earnings and buyer savings.

### 🚧 Simulated Features (For Prototype)
*Payment settlement, KYC verification, live GPS tracking, and SMS/WhatsApp notifications will be simulated for the hackathon demo.*

*(Note: Physical warehouses, government subsidies, and international exports are explicitly out of scope for this MVP.)*

---

## 💻 Technical Overview

AgriDirect uses a **modular monolith** approach tailored for rapid hackathon development while maintaining production-grade technologies.

### Recommended Stack
| Layer | Choice |
| :--- | :--- |
| **Frontend (Web)** | Next.js + TypeScript + Tailwind CSS |
| **Backend API** | Python FastAPI |
| **Database** | PostgreSQL + PostGIS |
| **Caching** | Redis |
| **AI / ML** | Python, Pandas, NumPy, scikit-learn / XGBoost |
| **Route Optimization**| Google OR-Tools |
| **Maps & Routing** | OpenStreetMap + OSRM |
| **DevOps** | Docker Compose + GitHub |

---

## 📚 Comprehensive Documentation

Dive deeper into our architecture, data models, and product planning. All documentation is stored in the `docs/` directory:

### Product & Design
- 📝 [Product Requirements (PRD)](./docs/PRD.md)
- 🎯 [MVP Scope Control](./docs/MVP_SCOPE.md)
- 🎨 [UI/UX & Screens](./docs/UI_UX.md)
- 🎬 [Final Demo Script](./docs/DEMO_SCRIPT.md)

### Engineering & Architecture
- 🏗️ [System Architecture](./docs/ARCHITECTURE.md)
- 🔌 [API Documentation](./docs/API_DOCUMENTATION.md)
- 🗄️ [Database Schema](./docs/DATABASE_SCHEMA.md)
- 🧠 [AI & ML Specifications](./docs/AI_ML.md)
- 🚚 [Logistics & Matching](./docs/LOGISTICS.md)
- 🛡️ [Security Requirements](./docs/SECURITY.md)

### Project Management
- 🤝 [Contributing & Git Workflow](./docs/CONTRIBUTING.md)
- 👥 [Team Plan & Responsibilities](./docs/TEAM_PLAN.md)
- 🧪 [Testing Strategy](./docs/TESTING.md)
- 🔍 [Research & Data](./docs/RESEARCH_AND_DATA.md)
- 🤔 [Architecture Decisions](./docs/DECISIONS.md)

---

## 📄 Source of Truth
The official problem statement (SIH26033) defines the core problem. The product features, technology choices, and implementation details outlined in this repository represent our team's proposed solution and design decisions for the internal hackathon prototype.
