# Database Schema — AgriDirect

## 1. Database

**PostgreSQL + PostGIS**

## 2. Core Entities

```text
users
  ├── farmer_profiles
  ├── fpo_profiles
  ├── buyer_profiles
  └── logistics_profiles

farms
fpo_members
produce_listings
rfqs
rfq_offers
orders
order_items
shipments
routes
route_stops
demand_forecasts
market_prices
payments
notifications
reviews
audit_events
```

## 3. Important Tables

### users
- id UUID PK
- name
- phone
- role
- language_pref
- verification_status
- created_at
- updated_at

### farmer_profiles
- user_id PK/FK
- farm_size
- address
- location GEOGRAPHY(Point, 4326)

### fpo_profiles
- id UUID PK
- owner_user_id
- organization_name
- registration_reference
- location
- verification_status

### fpo_members
- fpo_id FK
- farmer_user_id FK
- joined_at
- status

### produce_listings
- id UUID PK
- seller_user_id FK
- fpo_id nullable
- crop_type
- variety
- quality_grade
- quantity_kg
- available_quantity_kg
- price_per_kg
- available_from
- location
- status
- created_at

### rfqs
- id UUID PK
- buyer_user_id FK
- crop_type
- requested_quantity_kg
- target_price_per_kg nullable
- delivery_location
- required_by
- status

### rfq_offers
- id UUID PK
- rfq_id FK
- seller_user_id FK
- listing_id FK
- offered_quantity_kg
- offered_price_per_kg
- status

### orders
- id UUID PK
- buyer_user_id FK
- seller_user_id FK
- rfq_id nullable
- status
- total_amount
- delivery_location
- created_at

### order_items
- id UUID PK
- order_id FK
- listing_id FK
- quantity_kg
- unit_price

### shipments
- id UUID PK
- order_id FK
- route_id nullable
- status
- current_location nullable
- eta nullable
- pickup_at nullable
- delivered_at nullable

### routes
- id UUID PK
- vehicle_capacity_kg
- total_distance_km
- estimated_duration_min
- status

### route_stops
- id UUID PK
- route_id FK
- order_id FK
- sequence
- stop_type
- location
- eta

### demand_forecasts
- id UUID PK
- crop_type
- region
- forecast_date
- predicted_demand_kg
- model_version
- generated_at

### market_prices
- id UUID PK
- crop_type
- market_name
- region
- price_per_kg
- observed_date
- source

## 4. Indexes

Recommended:
- `produce_listings(crop_type, status)`
- geospatial index on listing/location fields
- `rfqs(status, crop_type)`
- `orders(buyer_user_id, created_at)`
- `orders(seller_user_id, created_at)`
- `demand_forecasts(crop_type, region, forecast_date)`

## 5. Integrity Rules

- available quantity cannot be negative.
- accepted RFQ offers must not exceed RFQ quantity.
- order transitions must follow allowed state transitions.
- seller must own or be authorized for a listing.
- route capacity must not be exceeded.
