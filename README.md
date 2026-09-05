# AgriDirect — Direct Farmer-to-Consumer Digital Marketplace

**Smart India Hackathon 2026 — Problem Statement SIH26033**

> Multiple intermediaries reduce farmers' earnings and increase consumer prices.

[![SIH 2026](https://img.shields.io/badge/SIH-2026-orange)](https://sih.gov.in/sih2026PS)
[![PS Number](https://img.shields.io/badge/PS%20Number-SIH26033-blue)]()
[![Category](https://img.shields.io/badge/Category-Software-green)]()
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey)]()

---

## 📋 Problem Statement

| Field | Detail |
|---|---|
| **PS Number** | SIH26033 |
| **Problem ID** | 26033 |
| **Category** | Software |
| **Organization** | Ministry of Consumer Affairs, Food & Public Distribution |
| **Department** | Department of Consumer Affairs (DoCA) |
| **Deadline** | 20 September 2026 |
| **Source** | https://sih.gov.in/sih2026PS |

**Expected Solution (as per the official PS):** Create a digital marketplace that:
- Connects farmers/FPOs directly with consumers and bulk buyers.
- Provides logistics support.
- Uses AI for demand forecasting and route optimization.

**Benefits:** Better prices for farmers, lower prices for consumers, reduced supply chain inefficiencies.

> **Note:** The official PDF lists the Theme field for this PS as "MedTech / BioTech / HealthTech," which appears to be a data-tagging inconsistency in the source document relative to the agri-marketplace subject matter. This documentation treats the PS by its actual description/domain (Agriculture, FoodTech & Supply Chain), and the discrepancy should be flagged/verified against the live listing at sih.gov.in before final submission.

---

## 💡 Our Solution

**AgriDirect** is a digital marketplace platform that eliminates unnecessary middlemen in the agricultural supply chain by directly connecting farmers and Farmer Producer Organizations (FPOs) with consumers and bulk buyers (retailers, restaurants, institutions). The platform combines e-commerce, logistics coordination, and AI-driven demand forecasting to make the produce supply chain fairer and more efficient.

### Core Value Proposition
- **For Farmers/FPOs:** Direct access to buyers, fair price discovery, reduced dependency on mandis/middlemen, demand visibility before harvest.
- **For Consumers & Bulk Buyers:** Fresher produce, lower prices, transparent sourcing, reliable delivery.
- **For Government/DoCA:** Reduced price volatility, better market intelligence, improved farmer income (aligned with "Doubling Farmers' Income" objectives).

---

## ✨ Key Features

| Module | Description |
|---|---|
| 🧑‍🌾 **Farmer/FPO Onboarding** | KYC-based registration, produce listing (crop, quantity, quality grade, price, harvest date), multilingual support |
| 🛒 **Marketplace** | Buyer discovery, search/filter by crop-location-price, direct order placement, negotiation/bidding for bulk buyers |
| 📦 **Logistics & Fulfillment** | Route optimization for pickup/delivery, third-party logistics (3PL) integration, real-time shipment tracking, cold-chain flagging for perishables |
| 🤖 **AI Demand Forecasting** | Predicts regional demand using historical sales, seasonality, and weather data; recommends optimal pricing and harvest-to-market timing |
| 💳 **Payments & Escrow** | UPI/digital payment integration, escrow-based settlement to protect farmers from payment default |
| ⭐ **Trust & Quality** | Ratings/reviews, quality grading, dispute resolution workflow |
| 📊 **Analytics Dashboard** | Farmer earnings dashboard, admin/DoCA dashboard for market intelligence and price-trend monitoring |
| 🔔 **Notifications** | SMS/app/WhatsApp alerts for orders, price changes, and logistics updates (works over low-bandwidth/feature-phone channels too) |

---

## 🏗️ Tech Stack (Proposed)

> These are the recommended defaults for this build — see [ARCHITECTURE.md](./ARCHITECTURE.md) for rationale and alternatives.

| Layer | Technology |
|---|---|
| Frontend (Web) | React.js + Tailwind CSS |
| Mobile App (Farmers/Buyers) | React Native / Flutter |
| Backend / API | Node.js (Express) or Django REST Framework |
| Database | PostgreSQL (transactional) + Redis (caching/sessions) |
| AI/ML Service | Python (FastAPI) — Prophet/XGBoost for demand forecasting, OR-Tools for route optimization |
| Search | Elasticsearch / PostgreSQL full-text search |
| Notifications | Firebase Cloud Messaging, Twilio/MSG91 (SMS) |
| Payments | Razorpay / UPI Payment Gateway |
| Maps & Routing | Google Maps API / OpenStreetMap + OSRM |
| Cloud & DevOps | AWS/GCP, Docker, GitHub Actions (CI/CD) |
| Authentication | JWT + OTP-based login (Aadhaar-linked KYC optional) |

---

## 📁 Repository Structure

```
agridirect/
├── frontend/                # Web application (React)
├── mobile/                  # Mobile application (React Native/Flutter)
├── backend/                 # Core API service (Node.js/Django)
├── ml-service/              # Demand forecasting & route optimization (Python)
├── docs/                    # Project documentation
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── API_DOCUMENTATION.md
│   └── CONTRIBUTING.md
├── infra/                   # Docker, CI/CD, deployment configs
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x
- Python ≥ 3.10
- PostgreSQL ≥ 14
- Docker & Docker Compose (recommended)

### Local Setup
```bash
# Clone the repository
git clone https://github.com/<your-org>/agridirect.git
cd agridirect

# Copy environment variables
cp .env.example .env

# Start all services with Docker Compose
docker-compose up --build

# Or run services individually
cd backend && npm install && npm run dev
cd frontend && npm install && npm start
cd ml-service && pip install -r requirements.txt --break-system-packages && uvicorn main:app --reload
```

Frontend runs at `http://localhost:3000`, backend API at `http://localhost:5000`, ML service at `http://localhost:8000`.

---

## 📚 Documentation

- [Product Requirements Document (PRD)](./PRD.md)
- [System Architecture](./ARCHITECTURE.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

## 🗺️ Roadmap

- [ ] Phase 1: Farmer/FPO & buyer onboarding, basic marketplace listing
- [ ] Phase 2: Order management, payments/escrow integration
- [ ] Phase 3: Logistics coordination & route optimization
- [ ] Phase 4: AI demand forecasting engine
- [ ] Phase 5: Analytics dashboards, multilingual/voice support, pilot deployment

---

## 👥 Team

_Add your team name, members, and roles here._

## 📄 License

This project is submitted for Smart India Hackathon 2026 under PS SIH26033. License: MIT (update as per team/institution policy).
