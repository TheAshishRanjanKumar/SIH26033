# SIH Demo Script — AgriDirect

## Demo Objective

Do not demonstrate isolated screens. Demonstrate one complete business story.

## 1. Opening — 30 seconds

Explain:

> Farmers can face reduced price realization when produce passes through multiple layers. AgriDirect creates a direct digital connection between farmers/FPOs and consumers/bulk buyers and adds AI-assisted demand planning and logistics optimization.

## 2. Farmer — 60 seconds

Login as farmer.

Show:
- location;
- produce;
- quantity;
- price;
- listing.

Create or open a tomato listing.

## 3. AI Forecast — 60 seconds

Open demand dashboard.

Show:
- historical demand;
- forecast;
- predicted quantity;
- confidence/metrics only if genuinely measured.

Explain:

> The forecast helps sellers understand expected regional demand rather than selling completely blind.

## 4. Bulk Buyer — 60 seconds

Create RFQ:

```text
Tomato
5,000 kg
Patna
Required by: selected date
```

Run matching.

Show multiple farmers/FPOs.

## 5. Aggregation — 45 seconds

Example:

```text
Farmer A: 2,000 kg
Farmer B: 1,500 kg
FPO:      1,500 kg
-------------------
Total:    5,000 kg
```

Accept compatible offers.

## 6. Logistics — 60 seconds

Generate route.

Show:
- pickup points;
- delivery point;
- vehicle capacity;
- total distance;
- estimated time.

Explain the optimization objective.

## 7. Order — 30 seconds

Move order:

```text
Confirmed
→ Picked Up
→ In Transit
→ Delivered
```

## 8. Impact — 45 seconds

Show the dashboard:

```text
Direct supply matched
Farmer realization
Buyer price/saving
Quantity moved
Route distance
```

Do not invent real-world impact. Demo numbers must be clearly identified as prototype/synthetic where applicable.

## 9. Closing — 20 seconds

End with:

> We are not trying to build another shopping app. We are connecting supply, demand, AI forecasting and logistics into one farm-to-market workflow.

## Backup Demo

If external APIs fail:
- use seeded database;
- use cached route response;
- use pre-trained local model;
- show the same UI with local data.
