# Logistics & Route Optimization — AgriDirect

## 1. Objective

Consolidate compatible farmer pickups and buyer deliveries into efficient routes while respecting vehicle capacity.

## 2. Inputs

- order IDs
- pickup locations
- delivery locations
- quantity
- vehicle capacity
- required-by time, where supported

## 3. Route Flow

```text
Confirmed Orders
      ↓
Identify Pickup/Drop Points
      ↓
Group Compatible Orders
      ↓
Build Distance/Time Matrix
      ↓
OR-Tools VRP
      ↓
Optimized Stops
      ↓
Shipment Assignment
```

## 4. Example

```text
Farmer A — 300 kg — Muzaffarpur
Farmer B — 400 kg — Hajipur
Farmer C — 200 kg — Vaishali
                    ↓
                  Patna
```

The optimizer should attempt to consolidate these compatible shipments into a feasible route rather than treating every shipment as an independent trip.

## 5. Map Layer

Recommended prototype:
- OpenStreetMap for map data
- OSRM for route/distance calculations

Use an adapter so the map provider can later be changed.

## 6. Route Output

```json
{
  "route_id": "uuid",
  "total_distance_km": 86.4,
  "estimated_duration_min": 185,
  "stops": [
    {"sequence": 1, "type": "pickup", "order_id": "a"},
    {"sequence": 2, "type": "pickup", "order_id": "b"},
    {"sequence": 3, "type": "pickup", "order_id": "c"},
    {"sequence": 4, "type": "delivery", "order_id": "a"}
  ]
}
```

## 7. Prototype Constraints

Do not attempt nationwide fleet optimization.

The demo should support:
- one vehicle;
- multiple pickups;
- one or more deliveries;
- capacity constraint;
- distance/time objective.

Extend only if stable.
