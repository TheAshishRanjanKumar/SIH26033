# Research & Data Plan — AgriDirect

## 1. Data Categories

### Marketplace
- crop
- quantity
- listing price
- quality
- location
- availability

### Demand
- date
- crop
- region
- quantity ordered/sold

### Market Price
- crop
- market
- region
- date
- observed price
- source

### Logistics
- pickup location
- delivery location
- quantity
- vehicle capacity
- distance/time

## 2. Data Provenance

Every dataset should record:
- source;
- collection date;
- license/usage terms;
- fields used;
- whether data is real, public, or synthetic.

## 3. Synthetic Data

Synthetic data is allowed for demonstrating architecture when real data is unavailable, but it must be labeled:

`DEMO / SYNTHETIC DATA`

Do not present synthetic values as official government statistics.

## 4. Model Dataset

Minimum training format:

```text
date,crop,region,demand_kg
2026-01-01,Tomato,Patna,640
2026-01-02,Tomato,Patna,655
...
```

Optional features:

```text
price_per_kg
temperature
rainfall
festival_flag
season
```

## 5. Data Quality

Before training:
- remove duplicates;
- validate dates;
- check missing values;
- check impossible quantities;
- inspect outliers;
- split chronologically for time-series evaluation.
