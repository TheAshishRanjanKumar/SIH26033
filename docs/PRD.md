# Product Requirements Document — AgriDirect

**PS:** SIH26033  
**Version:** 2.0  
**Purpose:** SIH Internal Hackathon Prototype

## 1. Executive Summary

AgriDirect is a digital marketplace connecting farmers/FPOs directly with consumers and bulk buyers. The platform combines marketplace workflows with logistics support, AI demand forecasting, and route optimization.

The product is designed around the official SIH26033 expected solution and should prioritize a convincing end-to-end demonstration over production-scale infrastructure.

## 2. Official Problem

**Title:** Multiple intermediaries reduce farmers' earnings and increase consumer prices.

**Expected solution:** A digital marketplace connecting farmers/FPOs directly with consumers and bulk buyers, with logistics support and AI for demand forecasting and route optimization.

**Benefits:** Better prices for farmers, lower prices for consumers, reduced supply-chain inefficiencies.

## 3. Goals

1. Enable direct digital discovery between supply and demand.
2. Allow farmers/FPOs to list available produce.
3. Allow consumers and bulk buyers to discover and purchase produce.
4. Support bulk RFQs and supply aggregation.
5. Forecast regional crop demand.
6. Optimize pickup/delivery routes.
7. Demonstrate measurable economic/logistics impact.

## 4. Non-Goals

The hackathon prototype will not attempt to:
- replace every agricultural market mechanism;
- operate physical logistics infrastructure;
- become a full banking/escrow provider;
- implement nationwide government integrations;
- solve every crop, district, and logistics scenario.

## 5. Personas

### Farmer
Needs simple listing, visibility into demand, buyer discovery, order status and earnings.

### FPO
Aggregates farmer supply and handles larger buyer requirements.

### Consumer
Needs produce discovery, transparent price/quantity information and order tracking.

### Bulk Buyer
Needs large quantities, RFQs, offers, scheduled delivery and reliable supply.

### Logistics Partner
Needs pickup/drop information, vehicle capacity and optimized routes.

### Admin
Needs marketplace, order, demand, price and logistics visibility.

## 6. User Stories

| ID | User | Story |
|---|---|---|
| US-01 | Farmer | List produce with quantity, quality, price and availability |
| US-02 | Farmer | View demand forecast for my crop and region |
| US-03 | FPO | Aggregate supply from participating farmers |
| US-04 | Consumer | Search and filter nearby produce |
| US-05 | Bulk Buyer | Create an RFQ for a required quantity |
| US-06 | Farmer/FPO | Respond to a buyer requirement |
| US-07 | Buyer | Place/confirm an order |
| US-08 | Logistics | Receive an optimized pickup/delivery route |
| US-09 | Buyer/Farmer | Track order status |
| US-10 | Admin | View marketplace and impact analytics |

## 7. Functional Requirements

### FR-01 Authentication
Role-aware login and registration for farmer, FPO, consumer, bulk buyer, logistics partner and admin.

### FR-02 Farmer/FPO profiles
Store identity, location, language preference and verification status.

### FR-03 Produce listings
Create, update, deactivate and view listings containing crop, variety, quantity, unit, quality, price, availability and location.

### FR-04 Marketplace
Search/filter by crop, location, price, quality and availability.

### FR-05 Bulk RFQ
Bulk buyers can specify crop, quantity, target region, required-by date and optional target price.

### FR-06 Matching
Rank suitable farmer/FPO supply against an RFQ using crop, quantity, location, price and availability.

### FR-07 Aggregation
Combine multiple compatible listings to satisfy a larger requirement.

### FR-08 Orders
Create and manage direct orders with a clear status lifecycle.

### FR-09 Logistics
Create shipments and optimize pickup/delivery sequences using vehicle capacity and locations.

### FR-10 Demand forecasting
Predict regional crop demand for a configurable forecast horizon.

### FR-11 Route optimization
Solve a constrained routing problem for sample orders.

### FR-12 Tracking
Expose shipment status and location/ETA where available; simulated tracking is acceptable for the prototype.

### FR-13 Impact analytics
Show example metrics such as farmer price realization, buyer savings, order fulfillment and route distance.

## 8. MVP Acceptance Criteria

A successful demo must prove:
- a farmer can list produce;
- a bulk buyer can create an RFQ;
- the system can identify compatible supply;
- multiple listings can satisfy one requirement;
- the AI module returns a demand forecast;
- the logistics module returns a route;
- an order can move through the defined lifecycle;
- the dashboard communicates the resulting value.

## 9. Product Principles

- Simple farmer UX
- Explainable AI
- Transparent calculations
- Demo reliability over feature count
- Synthetic data must be clearly identified as synthetic
- Never present simulated integrations as live government/payment/logistics integrations
