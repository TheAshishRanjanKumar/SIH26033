# API Documentation — AgriDirect (SIH26033)

**Base URL (dev):** `http://localhost:5000/api/v1`
**Auth:** Bearer JWT in `Authorization: Bearer <token>` header (unless noted as public)

---

## 1. Authentication

### `POST /auth/register`
Register a new user (farmer, consumer, bulk buyer, or logistics partner).

**Body:**
```json
{
  "name": "Ramesh Kumar",
  "phone": "+919812345678",
  "role": "farmer",
  "language_pref": "hi"
}
```
**Response `201`:**
```json
{ "user_id": "uuid", "otp_sent": true }
```

### `POST /auth/verify-otp`
**Body:** `{ "phone": "+919812345678", "otp": "482913" }`
**Response `200`:** `{ "access_token": "...", "refresh_token": "...", "role": "farmer" }`

### `POST /auth/refresh`
**Body:** `{ "refresh_token": "..." }` → **Response:** `{ "access_token": "..." }`

---

## 2. Listings (Marketplace)

### `POST /listings`
_Role: farmer_ — Create a new produce listing.
```json
{
  "crop_type": "Tomato",
  "quality_grade": "A",
  "quantity_kg": 500,
  "price_per_kg": 18.5,
  "harvest_date": "2026-09-10",
  "location": { "lat": 26.85, "lng": 80.95 }
}
```
**Response `201`:** `{ "listing_id": "uuid", "status": "active" }`

### `GET /listings`
_Public_ — Search/filter listings.
**Query params:** `crop_type`, `min_price`, `max_price`, `lat`, `lng`, `radius_km`, `grade`, `page`, `limit`
**Response `200`:**
```json
{
  "results": [
    { "listing_id": "uuid", "crop_type": "Tomato", "price_per_kg": 18.5, "quantity_kg": 500, "farmer_name": "Ramesh Kumar", "distance_km": 4.2 }
  ],
  "total": 128, "page": 1, "limit": 20
}
```

### `GET /listings/{listing_id}`
**Response `200`:** Full listing detail including farmer profile summary and ratings.

### `PATCH /listings/{listing_id}` / `DELETE /listings/{listing_id}`
_Role: owning farmer_ — Update or deactivate a listing.

---

## 3. Orders

### `POST /orders`
_Role: consumer or bulk buyer_ — Place an order or RFQ against a listing.
```json
{
  "listing_id": "uuid",
  "quantity_kg": 50,
  "order_type": "fixed_price",
  "delivery_address": { "lat": 26.90, "lng": 80.90, "text": "..." }
}
```
**Response `201`:** `{ "order_id": "uuid", "status": "placed", "total_price": 925.0 }`

### `GET /orders/{order_id}`
**Response `200`:** Order detail including status timeline, payment status, and shipment tracking link.

### `PATCH /orders/{order_id}/status`
_Role: farmer/logistics/admin_ — Update order status.
```json
{ "status": "picked_up" }
```
Valid statuses: `placed → confirmed → picked_up → in_transit → delivered → payment_settled` (or `cancelled` / `disputed`).

### `POST /orders/{order_id}/dispute`
_Role: buyer or farmer_ — Raise a dispute.
```json
{ "reason": "quality_mismatch", "description": "..." }
```

---

## 4. Payments

### `POST /payments/initiate`
Initiate escrow-held payment for an order.
```json
{ "order_id": "uuid", "payment_method": "upi" }
```
**Response `200`:** `{ "payment_id": "uuid", "gateway_redirect_url": "https://..." }`

### `POST /payments/webhook`
_Internal — called by payment gateway_ — Confirms payment success/failure and updates escrow state.

### `POST /payments/{payment_id}/release`
_Role: system, triggered on delivery confirmation_ — Releases escrow funds to farmer.

### `GET /payments/farmer/{farmer_id}/earnings`
_Role: farmer_ — Returns earnings history and payout summary.

---

## 5. Logistics

### `POST /logistics/routes/optimize`
_Role: logistics partner/admin_ — Requests an optimized pickup/delivery route for a batch of orders.
```json
{ "order_ids": ["uuid1", "uuid2", "uuid3"], "vehicle_capacity_kg": 1000 }
```
**Response `200`:** `{ "route_id": "uuid", "stops": [ { "order_id": "uuid1", "sequence": 1, "eta": "2026-09-10T08:30:00Z" } ] }`

### `GET /logistics/shipments/{order_id}/track`
**Response `200`:** `{ "status": "in_transit", "current_location": { "lat": ..., "lng": ... }, "eta": "..." }`

---

## 6. AI / Forecasting

### `GET /ai/forecast/demand`
**Query params:** `crop_type`, `region`, `horizon_days`
**Response `200`:**
```json
{
  "crop_type": "Tomato",
  "region": "Kanpur",
  "forecast": [
    { "date": "2026-09-10", "predicted_demand_kg": 12000, "recommended_price_per_kg": 17.8 }
  ]
}
```

### `GET /ai/price-recommendation`
**Query params:** `crop_type`, `region`, `quantity_kg`
**Response `200`:** `{ "recommended_price_per_kg": 18.2, "confidence": 0.82, "basis": "AGMARKNET benchmark + demand forecast" }`

---

## 7. Notifications

### `POST /notifications/subscribe`
Register a device/phone number for push/SMS/WhatsApp notifications.

### Notification Events (system-triggered, not directly called by clients)
- `order.placed`, `order.status_changed`, `payment.released`, `price.alert`, `shipment.eta_update`

---

## 8. Admin / DoCA Dashboard

### `GET /admin/analytics/price-trends`
**Query params:** `crop_type`, `region`, `date_from`, `date_to`
**Response `200`:** Aggregated price trend time-series data.

### `GET /admin/analytics/farmer-income-impact`
**Response `200`:** Estimated farmer income uplift metrics vs. mandi baseline.

### `GET /admin/disputes`
**Response `200`:** List of open disputes for oversight/resolution.

---

## 9. Error Format (Standard)

```json
{
  "error": {
    "code": "LISTING_NOT_FOUND",
    "message": "The requested listing does not exist or has been removed.",
    "status": 404
  }
}
```

## 10. Rate Limiting

- Public endpoints: 60 requests/minute per IP.
- Authenticated endpoints: 300 requests/minute per user.
- `429 Too Many Requests` returned with `Retry-After` header when exceeded.
