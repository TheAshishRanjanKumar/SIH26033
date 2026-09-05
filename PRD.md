# Product Requirements Document (PRD)

## AgriDirect — Direct Farmer-to-Consumer Digital Marketplace
**SIH Problem Statement:** SIH26033 | **Problem ID:** 26033
**Version:** 1.0 | **Date:** 05 September 2026 | **Status:** Draft

---

## 1. Executive Summary

Indian agricultural supply chains typically involve 3–6 intermediaries between the farm and the final consumer (village aggregators, commission agents/arhatiyas, wholesalers, mandis, retailers). Each layer takes a margin, meaning farmers often receive only 25–40% of the final retail price while consumers pay inflated prices. **AgriDirect** is a digital marketplace that directly connects farmers/FPOs with consumers and bulk buyers, backed by integrated logistics and AI-driven demand forecasting, to compress this chain, improve farmer realization, and lower consumer prices.

---

## 2. Problem Statement (Official)

> **Title:** Multiple intermediaries reduce farmers earnings and increase consumer prices.
>
> **Organization:** Ministry of Consumer Affairs, Food & Public Distribution
> **Department:** Department of Consumer Affairs (DoCA)
> **Category:** Software
> **Deadline:** 20 September 2026
>
> **Expected Solution:** Create a digital marketplace that connects farmers/FPOs directly with consumers and bulk buyers, provides logistics support, and uses AI for demand forecasting and route optimization.
>
> **Benefits:** Better prices for farmers, lower prices for consumers, reduced supply chain inefficiencies.

---

## 3. Goals & Objectives

| Goal | Metric |
|---|---|
| Increase farmer price realization | Target ≥ 60–70% of final consumer price reaching farmers (vs. ~25–40% today) |
| Reduce consumer prices | 10–20% reduction vs. mandi/retail benchmark for equivalent produce |
| Reduce post-harvest losses | Cut spoilage/wastage via better demand matching and logistics |
| Improve market transparency | Real-time, verifiable pricing available to all farmers, not just those near mandis |
| Drive platform adoption | Onboard target number of farmers/FPOs and buyers within pilot period |

---

## 4. Target Users / Personas

### 4.1 Farmer / FPO (Primary Seller)
- Small-to-medium landholding farmers or Farmer Producer Organizations.
- Often limited digital literacy, may use basic smartphones or feature phones.
- Needs: fair price, guaranteed buyer, minimal friction, local language, low data usage.

### 4.2 Individual Consumer
- Urban/semi-urban household buying fresh produce directly.
- Needs: freshness, transparent pricing, reliable delivery.

### 4.3 Bulk Buyer (Retailer / Restaurant / Institution / Processor)
- Requires consistent volume, quality grading, and scheduled delivery.
- Needs: bulk pricing, contract/advance booking, invoicing, quality assurance.

### 4.4 Logistics Partner
- Last-mile/aggregation transport providers.
- Needs: optimized routes, load consolidation, clear pickup/drop schedules.

### 4.5 Government / DoCA Administrator
- Needs: market intelligence dashboards, price-trend monitoring, dispute oversight, policy-relevant analytics.

---

## 5. User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-01 | Farmer | List my produce with quantity, price, and harvest date | Buyers can discover and purchase directly from me |
| US-02 | Farmer | See AI-recommended pricing and best time to sell | I can maximize my earnings |
| US-03 | Consumer | Search and filter produce by location, crop, and price | I can find fresh, affordable produce nearby |
| US-04 | Bulk Buyer | Place large recurring orders with negotiated pricing | I can secure consistent supply for my business |
| US-05 | Farmer/Buyer | Track my order/shipment in real time | I know when to expect pickup or delivery |
| US-06 | Farmer | Receive payment automatically once delivery is confirmed | I don't face payment delays or defaults |
| US-07 | Logistics Partner | Get an optimized daily pickup/delivery route | I minimize travel time and fuel cost |
| US-08 | DoCA Admin | View aggregated price and volume trends by region/crop | I can monitor market health and intervene if needed |
| US-09 | Farmer | Use the app in my local language via voice/SMS | I can operate the platform despite limited literacy |
| US-10 | Consumer/Buyer | Rate and review produce quality and sellers | The marketplace stays trustworthy |

---

## 6. Functional Requirements

### 6.1 Onboarding & Identity
- FR-1: Farmer/FPO registration with mobile OTP and optional Aadhaar/KYC verification.
- FR-2: Buyer registration (individual and bulk buyer flows differ — bulk buyers require business verification/GST).
- FR-3: Multilingual UI (minimum: Hindi, English, + 2 regional languages for pilot state).

### 6.2 Marketplace & Listings
- FR-4: Farmers can create/edit/delete produce listings (crop type, variety, quantity, quality grade, price, harvest/availability date, location).
- FR-5: Buyers can search/filter listings by crop, location radius, price range, and quality grade.
- FR-6: Support both fixed-price ("buy now") and bulk-buyer negotiation/bid requests.

### 6.3 Order Management
- FR-7: Cart/checkout flow for consumers; RFQ (request-for-quote) flow for bulk buyers.
- FR-8: Order status lifecycle: Placed → Confirmed → Picked Up → In Transit → Delivered → Payment Settled.
- FR-9: Cancellation and dispute-raising workflow with defined SLAs.

### 6.4 Logistics
- FR-10: Integration with logistics/3PL partners for pickup and delivery scheduling.
- FR-11: Route optimization engine to consolidate multiple farmer pickups into efficient delivery routes.
- FR-12: Real-time shipment tracking visible to both farmer and buyer.
- FR-13: Cold-chain/perishability flag for produce requiring temperature-controlled transport.

### 6.5 AI & Analytics
- FR-14: Demand forecasting model predicting regional demand by crop and season using historical order data, mandi price data, and weather inputs.
- FR-15: Dynamic price recommendation engine for farmers based on forecast, supply levels, and comparable mandi prices.
- FR-16: Route optimization algorithm (e.g., vehicle routing problem solver) for logistics consolidation.
- FR-17: Admin/DoCA analytics dashboard: price trends, volume trends, regional heatmaps, farmer income impact estimates.

### 6.6 Payments
- FR-18: Integrated digital payment gateway (UPI, cards, net banking).
- FR-19: Escrow mechanism: buyer payment held until delivery confirmation, then auto-released to farmer.
- FR-20: Farmer earnings dashboard with transaction history and payout tracking.

### 6.7 Trust, Quality & Support
- FR-21: Ratings and reviews for both sellers and buyers.
- FR-22: Quality grading standard (e.g., Grade A/B/C) with optional photo verification at pickup.
- FR-23: In-app support/helpdesk and dispute resolution workflow.
- FR-24: SMS/WhatsApp notifications for order and price updates (works without requiring smartphone app usage).

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Scalability** | System should support horizontal scaling to handle seasonal demand spikes (e.g., harvest season traffic surges) |
| **Performance** | API response time < 500ms for 95th percentile under normal load |
| **Availability** | ≥ 99.5% uptime target for production |
| **Accessibility** | Low-bandwidth mode; SMS/IVR fallback for feature-phone users; multilingual + voice support |
| **Security** | End-to-end encrypted payments; role-based access control; data protection compliant with India's DPDP Act, 2023 |
| **Localization** | Support for at least Hindi + one regional language at MVP; extensible language framework |
| **Interoperability** | Open APIs for potential integration with eNAM, AGMARKNET, and state agri-marketing boards |
| **Auditability** | Full transaction and pricing audit trail for DoCA oversight |

---

## 8. Out of Scope (for MVP / Hackathon Prototype)

- Full-scale cold-chain infrastructure ownership (platform will integrate with existing 3PL/cold-chain providers, not build physical infrastructure).
- Direct government subsidy disbursement.
- International/export marketplace features.
- Insurance and crop-loan integrations (potential future phase).

---

## 9. Assumptions & Constraints

**Assumptions:**
- Farmers have access to at least a basic smartphone or can be supported via SMS/IVR/CSC (Common Service Centre) kiosks.
- Historical mandi/price data (e.g., AGMARKNET, eNAM) is available for training the demand forecasting model.
- Logistics partners are willing to integrate via API or manual dispatch workflows.

**Constraints:**
- Submission deadline: 20 September 2026.
- Hackathon prototype scope is limited; full production rollout (KYC, payment gateway licensing, 3PL contracts) is a post-hackathon activity.
- Connectivity in rural areas may be intermittent — offline-first design patterns should be considered for the mobile app.

---

## 10. Success Metrics (KPIs)

| KPI | Target (Pilot Phase) |
|---|---|
| Number of farmers/FPOs onboarded | e.g., 500+ within 3 months of pilot |
| Number of active buyers | e.g., 1,000+ within 3 months |
| Average farmer price realization vs. mandi rate | +15–25% improvement |
| Average consumer price vs. retail benchmark | −10–20% reduction |
| Order fulfillment success rate | ≥ 95% |
| Platform Net Promoter Score (NPS) | ≥ 40 |

---

## 11. Milestones & Timeline (Indicative, Hackathon → Pilot)

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 0 — Ideation & Design | Week 1–2 | Finalized PRD, wireframes, architecture |
| Phase 1 — Core MVP | Week 3–6 | Farmer/buyer onboarding, listings, basic order flow |
| Phase 2 — Payments & Logistics | Week 7–9 | Escrow payments, logistics partner integration |
| Phase 3 — AI Modules | Week 10–12 | Demand forecasting + route optimization live |
| Phase 4 — Pilot Launch | Week 13+ | Pilot in 1–2 districts, feedback loop, iteration |

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Low digital literacy among farmers | Low adoption | SMS/IVR channels, CSC kiosk partnerships, local-language voice UI |
| Distrust of new payment systems | Low transaction volume | Escrow model, transparent fee structure, government/FPO backing |
| Logistics fragmentation in rural areas | Delivery failures | Partner with existing rural logistics networks (e.g., postal, dairy cooperatives) |
| Data scarcity for AI models | Poor forecast accuracy | Bootstrap with public datasets (AGMARKNET, eNAM) and improve iteratively with platform data |
| Resistance from existing middlemen | Market pushback | Position platform as complementary channel initially; emphasize FPO aggregation |

---

## 13. Open Questions

- Should the platform integrate directly with eNAM / AGMARKNET APIs for pricing benchmarks?
- What is the preferred payout cycle for farmers (instant vs. T+1 settlement)?
- Which state(s)/districts will be selected for the initial pilot?
- Will the hackathon prototype include the AI forecasting model live, or a simulated/rule-based version for the demo?

---

## 14. Appendix

- Official PS reference: https://sih.gov.in/sih2026PS (PS Number: SIH26033, Problem ID: 26033)
- Related datasets to explore: AGMARKNET (agricultural market prices), eNAM (National Agriculture Market), IMD weather data.
