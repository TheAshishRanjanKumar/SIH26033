# 📋 SIH26033 — Official Raw Dataset Audit Report

*Generated on: 2026-09-06 17:19:58*

This document audits all raw files in `data/raw/` in compliance with SIH26033 data governance rules.

---

## 1. Summary of Files Discovered

| Filename | Category | Format | Size (MB) | Total Rows | Bihar Rows | Date Range | Years |
|---|---|---|---|---|---|---|---|
| `agmarknet1.json` | `agmarknet` | JSON | 3.65 | 10,000 | 43 | 2026-09-05 to 2026-09-05 | 2026-2026 |
| `bihar 3.json` | `agmarknet` | JSON | 38.39 | 100,000 | 100,000 | 2002-02-02 to 2026-09-04 | 2002-2026 |
| `bihar1.json` | `agmarknet` | JSON | 19.14 | 50,000 | 50,000 | 2002-02-02 to 2026-03-31 | 2002-2026 |
| `bihar2.json` | `agmarknet` | JSON | 38.34 | 100,000 | 100,000 | 2002-02-02 to 2026-09-04 | 2002-2026 |
| `cropprod2.json` | `crop_production` | JSON | 39.08 | 100,000 | 2 | 2009-01-01 to 2017-12-31 | 2009-2017 |
| `6c05cd1b-ed59-40c2-bc31-e314f39c6971 (1).csv` | `rainfall` | CSV | 10.11 | 183,707 | 183,707 | 2018-01-01 to 2025-06-30 | 2018-2025 |

---

## 2. Detailed Dataset Audits

### 1. `agmarknet1.json` (data\raw\agmarknet\agmarknet1.json)
- **Title**: Current Daily Price of Various Commodities from Various Markets (Mandi)
- **Format**: JSON (3.65 MB)
- **Record Count**: 10,000 rows
- **Exact Duplicates**: 0 rows
- **Columns (10 total)**: `state, district, market, commodity, variety, grade, arrival_date, min_price, max_price, modal_price`
- **State Coverage**: 27 states (Bihar records: 43 [0.43%])
- **District Coverage**: 11 districts in Bihar
- **Temporal Range**: 2026-09-05 to 2026-09-05 (Years: `[2026]`)
- **Missing Values**:
  - *0 missing values across all columns.*
- **Top Commodities (Total 228)**:
  - Potato: 368 records
  - Brinjal: 363 records
  - Wheat: 362 records
  - Tomato: 356 records
  - Onion: 354 records
- **Dataset Role & Compatibility Assessment**:
  - ⚠️ **Current Snapshot Data**: Single-date All-India snapshot (`2026-09-05`). Contains 43 Bihar records across 11 districts.
  - *Action*: Kept strictly separate from historical model training as per specifications; used for live inference/fresh testing.

### 2. `bihar 3.json` (data\raw\agmarknet\bihar 3.json)
- **Title**: Variety-wise Daily Market Prices Data of Commodity
- **Format**: JSON (38.39 MB)
- **Record Count**: 100,000 rows
- **Exact Duplicates**: 0 rows
- **Columns (11 total)**: `Arrival_Date, Commodity, Commodity_Code, District, Grade, Market, Max_Price, Min_Price, Modal_Price, State, Variety`
- **State Coverage**: 1 states (Bihar records: 100,000 [100.0%])
- **District Coverage**: 39 districts in Bihar
- **Temporal Range**: 2002-02-02 to 2026-09-04 (Years: `[2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2021, 2022, 2023, 2024, 2025, 2026]`)
- **Missing Values**:
  - *0 missing values across all columns.*
- **Top Commodities (Total 142)**:
  - Potato: 14,910 records
  - Onion: 14,311 records
  - Rice: 7,328 records
  - Wheat: 6,586 records
  - Brinjal: 6,084 records
- **Dataset Role & Compatibility Assessment**:
  - ✅ **Historical Mandi Data (Core)**: 100% Bihar mandi prices across 39 district names spanning 2002 to 2026.
  - *Action*: Primary market data source for price forecasting, price spread, and mandi reporting activity.

### 3. `bihar1.json` (data\raw\agmarknet\bihar1.json)
- **Title**: Variety-wise Daily Market Prices Data of Commodity
- **Format**: JSON (19.14 MB)
- **Record Count**: 50,000 rows
- **Exact Duplicates**: 0 rows
- **Columns (11 total)**: `Arrival_Date, Commodity, Commodity_Code, District, Grade, Market, Max_Price, Min_Price, Modal_Price, State, Variety`
- **State Coverage**: 1 states (Bihar records: 50,000 [100.0%])
- **District Coverage**: 39 districts in Bihar
- **Temporal Range**: 2002-02-02 to 2026-03-31 (Years: `[2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2021, 2022, 2023, 2024, 2026]`)
- **Missing Values**:
  - *0 missing values across all columns.*
- **Top Commodities (Total 125)**:
  - Potato: 6,928 records
  - Onion: 6,864 records
  - Rice: 5,351 records
  - Wheat: 3,829 records
  - Brinjal: 2,884 records
- **Dataset Role & Compatibility Assessment**:
  - ✅ **Historical Mandi Data (Core)**: 100% Bihar mandi prices across 39 district names spanning 2002 to 2026.
  - *Action*: Primary market data source for price forecasting, price spread, and mandi reporting activity.

### 4. `bihar2.json` (data\raw\agmarknet\bihar2.json)
- **Title**: Variety-wise Daily Market Prices Data of Commodity
- **Format**: JSON (38.34 MB)
- **Record Count**: 100,000 rows
- **Exact Duplicates**: 0 rows
- **Columns (11 total)**: `Arrival_Date, Commodity, Commodity_Code, District, Grade, Market, Max_Price, Min_Price, Modal_Price, State, Variety`
- **State Coverage**: 1 states (Bihar records: 100,000 [100.0%])
- **District Coverage**: 39 districts in Bihar
- **Temporal Range**: 2002-02-02 to 2026-09-04 (Years: `[2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2021, 2022, 2023, 2024, 2025, 2026]`)
- **Missing Values**:
  - *0 missing values across all columns.*
- **Top Commodities (Total 148)**:
  - Potato: 12,734 records
  - Onion: 11,811 records
  - Rice: 10,898 records
  - Wheat: 7,849 records
  - Paddy(Dhan)(Common): 3,942 records
- **Dataset Role & Compatibility Assessment**:
  - ✅ **Historical Mandi Data (Core)**: 100% Bihar mandi prices across 39 district names spanning 2002 to 2026.
  - *Action*: Primary market data source for price forecasting, price spread, and mandi reporting activity.

### 5. `cropprod2.json` (data\raw\crop_production\cropprod2.json)
- **Title**: Variety-wise Daily Market Prices Data of Commodity
- **Format**: JSON (39.08 MB)
- **Record Count**: 100,000 rows
- **Exact Duplicates**: 0 rows
- **Columns (11 total)**: `Arrival_Date, Commodity, Commodity_Code, District, Grade, Market, Max_Price, Min_Price, Modal_Price, State, Variety`
- **State Coverage**: 32 states (Bihar records: 2 [0.0%])
- **District Coverage**: 2 districts in Bihar
- **Temporal Range**: 2009-01-01 to 2017-12-31 (Years: `[2009, 2017]`)
- **Missing Values**:
  - *0 missing values across all columns.*
- **Top Commodities (Total 84)**:
  - Paddy(Dhan)(Common): 13,878 records
  - Bajra(Pearl Millet/Cumbu): 7,003 records
  - Cauliflower: 6,944 records
  - Potato: 6,158 records
  - Tomato: 5,609 records
- **Dataset Role & Compatibility Assessment**:
  - ⚠️ **CRITICAL AUDIT FINDING**: Despite its folder location (`data/raw/crop_production/`), this file is an All-India AGMARKNET market prices dataset (catalog `35985678-0d79-46b4-9ed6-6f13308a1d24`) with only 2 records for Bihar and no `Area`/`Production` columns.
  - *Action*: Must NOT be coerced into crop production tables. The raw file is left untouched in `data/raw/`, and the pipeline handles its classification transparently.

### 6. `6c05cd1b-ed59-40c2-bc31-e314f39c6971 (1).csv` (data\raw\rainfall\6c05cd1b-ed59-40c2-bc31-e314f39c6971 (1).csv)
- **Title**: Rainfall Observation Dataset
- **Format**: CSV (10.11 MB)
- **Record Count**: 183,707 rows
- **Exact Duplicates**: 6,650 rows
- **Columns (7 total)**: `State, District, Date, Year, Month, Avg_rainfall, Agency_name`
- **State Coverage**: 1 states (Bihar records: 183,707 [100.0%])
- **District Coverage**: 41 districts in Bihar
- **Temporal Range**: 2018-01-01 to 2025-06-30 (Years: `[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]`)
- **Missing Values**:
  - *0 missing values across all columns.*
- **Rainfall Stats**: Min: `-0.024985015 mm`, Max: `250.2231091 mm`, Mean: `3.51 mm`
  - Zero rainfall days: `103,003`, Rainy days: `80,632`, Negative readings: `72` (artifact to be zero-clipped)
- **Dataset Role & Compatibility Assessment**:
  - ✅ **Daily Bihar Rainfall Data (Core)**: 183,707 records spanning 2018-01-01 to 2025-06-30 across all Bihar districts.
  - *Action*: Primary weather data source for daily rainfall, cumulative rainfall, monsoon anomaly, and seasonal lag features.

---

## 3. Cross-Dataset Temporal & Spatial Alignment

### A. Common Temporal Overlap
- **Historical AGMARKNET Bihar**: 2002 to 2026 (250,000 records)
- **Daily Rainfall Bihar**: 2018 to 2025 (183,707 records)
- **Common Overlap Window**: **2018 to 2025** (8 calendar years; approx. 7.5 continuous synchronous years: 2018-01-01 to 2025-06-30)
  - Overlapping AGMARKNET records: **117,261 records** (dense in 2022-2023)
  - Overlapping Rainfall records: **128,882 records**

### B. Spatial (District) Normalization Required
There are 30 exact district matches and 9 spelling/composite variations that must be standardized:
- `West Chambaran` (AGMARKNET) / `Pashchim Champaran` (Rainfall) → `West Champaran`
- `East Champaran/ Motihari` (AGMARKNET) / `Purbi Champaran` (Rainfall) → `East Champaran`
- `Kaimur/Bhabhua` (AGMARKNET) / `Kaimur (Bhabua)` (Rainfall) → `Kaimur`
- `Purnea` (AGMARKNET) / `Purnia` (Rainfall) → `Purnea`
- `Kaithar` (AGMARKNET) / `Katihar` (Rainfall) → `Katihar`
- `Gopalgang` (AGMARKNET) / `Gopalganj` (Rainfall) → `Gopalganj`
- `Munghair` (AGMARKNET) / `Munger` (Rainfall) → `Munger`
- `Luckeesarai` (AGMARKNET) / `Lakhisarai` (Rainfall) → `Lakhisarai`
- `Chhapra` (AGMARKNET) / `Saran` (Rainfall) → `Saran`
- `Jehanabad` (AGMARKNET) / `Jahanabad` (Rainfall) → `Jehanabad`

### C. Defensible Join Strategy
- **Primary Join Keys**: `[Date, District]`
- **Grain**: Daily District-level market activity joined with Daily District-level rainfall aggregates.
- Higher-frequency rolling aggregations: 7-day, 14-day, and 30-day cumulative rainfall and market price moving averages.

---

## 4. Proposed Target Definition & ML Formulation

### A. Primary Target Variable: Next-Period Wholesale Modal Price (`modal_price_t+7`)
As established, **AGMARKNET prices do not equal direct consumer demand or physical arrival volume**.
The primary ML forecasting target is:
$$\mathbf{y = \text{modal\_price}_{t+7}} \quad \text{at } \left[\text{Date}, \text{District}, \text{Commodity}\right] \text{ grain}$$
- **Ground Truth**: Observed historical wholesale modal price used as the forecasting ground truth.
- **Modeling Grain**: `[Date, District, Commodity]`
- **Observed Feature**: `reporting_mandis = number of reporting mandis` (descriptive market reporting count, strictly NOT physical volume).

### B. Train / Validation / Test Chronological Split
- **Training Period**: `2018-01-01` to `2022-12-31` (5 calendar years; baseline price and weather patterns)
- **Validation Period**: `2023-01-01` to `2023-12-31` (1 calendar year; hyperparameter tuning, lag selection)
- **Test Period**: `2024-01-01` to `2025-06-30` (1.5 calendar years; strict out-of-time evaluation; NO data leakage)