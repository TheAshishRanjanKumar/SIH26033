# API Documentation — SIH26033 Solution

**Base URL:** `/api/v1`

## Authentication

Protected endpoints use:

`Authorization: Bearer <access_token>`

## 1. Auth

### POST `/auth/register`
Register a user.

```json
{
  "name": "Ramesh Kumar",
  "phone": "+919812345678",
  "role": "farmer",
  "language_pref": "hi"
}
```

Roles:
`farmer`, `fpo`, `consumer`, `bulk_buyer`, `logistics_partner`, `admin`

### POST `/auth/verify-otp`
Verifies OTP and returns access/refresh tokens.

### POST `/auth/refresh`
Refreshes an access token.

## 2. Profiles

### GET `/me`
Returns current user profile.

### PATCH `/me`
Updates allowed profile fields.

### POST `/fpos`
Creates an FPO profile for an authorized FPO account.

### GET `/fpos/{fpo_id}`
Returns FPO summary.

## 3. Listings

### POST `/listings`
Farmer/FPO creates a listing.

```json
{
  "crop_type": "Tomato",
  "variety": "Hybrid",
  "quantity_kg": 500,
  "quality_grade": "A",
  "price_per_kg": 18.5,
  "available_from": "2026-09-10",
  "location": {"lat": 26.85, "lng": 80.95}
}
```

### GET `/listings`
Filters:
`crop_type`, `min_price`, `max_price`, `lat`, `lng`, `radius_km`, `grade`, `page`, `limit`

### GET `/listings/{listing_id}`
Listing details.

### PATCH `/listings/{listing_id}`
Owner update.

### DELETE `/listings/{listing_id}`
Deactivate listing.

## 4. RFQ

### POST `/rfqs`
Bulk buyer creates requirement.

```json
{
  "crop_type": "Tomato",
  "quantity_kg": 5000,
  "required_by": "2026-09-15",
  "delivery_location": {"lat": 25.61, "lng": 85.14},
  "target_price_per_kg": 25
}
```

### GET `/rfqs`
List buyer's RFQs or authorized public/market RFQs.

### GET `/rfqs/{rfq_id}`
RFQ details.

### POST `/rfqs/{rfq_id}/match`
Generate ranked supply matches.

### POST `/rfqs/{rfq_id}/offers`
Farmer/FPO submits an offer.

### POST `/rfqs/{rfq_id}/accept`
Buyer accepts an offer.

## 5. Orders

### POST `/orders`
Create direct order after listing/RFQ acceptance.

### GET `/orders`
List orders for current role.

### GET `/orders/{order_id}`
Order details.

### PATCH `/orders/{order_id}/status`
Authorized state transition.

Statuses:
`placed → confirmed → scheduled → picked_up → in_transit → delivered → settled`

Cancellation/dispute states may branch from the normal lifecycle.

## 6. Logistics

### POST `/logistics/routes/optimize`

```json
{
  "order_ids": ["uuid1", "uuid2"],
  "vehicle_capacity_kg": 1000
}
```

Returns route stops and estimated distance/time.

### GET `/logistics/routes/{route_id}`
Returns optimized route.

### GET `/logistics/shipments/{shipment_id}`
Returns shipment status.

## 7. AI

### GET `/ai/forecast/demand`

Parameters:
`crop_type`, `region`, `horizon_days`

### GET `/ai/forecast/explanation`
Returns key factors/features used by the forecast.

Price recommendation is optional and should not block the core SIH requirements.

## 8. Analytics

### GET `/admin/analytics/overview`
Marketplace, order and logistics summary.

### GET `/admin/analytics/demand`
Demand trends and forecasts.

### GET `/admin/analytics/impact`
Farmer realization, buyer savings and logistics metrics.

## 9. Notifications

### POST `/notifications/subscribe`
Registers notification preference.

## 10. Error Format

```json
{
  "error": {
    "code": "LISTING_NOT_FOUND",
    "message": "Listing not found",
    "status": 404
  }
}
```

## 11. API Rules

- Version APIs with `/api/v1`.
- Validate request bodies.
- Never trust client-provided ownership/role.
- Use pagination on collections.
- Use UUIDs for externally exposed IDs.
- Return consistent errors.
