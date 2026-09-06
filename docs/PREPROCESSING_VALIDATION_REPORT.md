# 🧪 SIH26033 — Preprocessing & Data Validation Report

*Generated on: 2026-09-06 17:41:49*
*Status: PREPROCESSING PHASE COMPLETED & 100% VALIDATED*

---

## 1. Automated Integrity Test Results

| # | Test Name | Assertion Criteria | Result |
|---|---|---|---|
| 1 | **Raw Data Immutability** | Strict validation rule | `PASSED (All 6 files 100% untouched)` |
| 2 | **District Normalization** | Strict validation rule | `PASSED (All districts map to Bihar 38: 38 active districts)` |
| 3 | **Modeling Key Uniqueness** | Strict validation rule | `PASSED (0 duplicate keys across all 4 processed outputs)` |
| 4 | **Rainfall Agency Aggregation** | Strict validation rule | `PASSED (Consensus is strict mean, negatives clipped, no summation)` |
| 5 | **Target Lead Bounds** | Strict validation rule | `PASSED (Min lead = 7.0d, Max lead = 10.0d; 100% within [7, 10])` |
| 6 | **Chronological Split Order** | Strict validation rule | `PASSED (TRAIN <= 2022-12-31 < VAL [2023-01-01..2023-12-27] < TEST >= 2024-01-01)` |
| 7 | **2019/2020 Gap Confirmation** | Strict validation rule | `PASSED (0 records fabricated or filled for 2019/2020)` |
| 8 | **Retrospective Feature Causality (No Leakage)** | Strict validation rule | `PASSED (modal_price_lag_1d strictly < Date & gap<=30d; roll_mean/std strictly <= t-1; rainfall_cum strictly <= Date; all 4 counter-factual leak injection tests rejected)` |
| 9 | **Target-Split Containment** | Strict validation rule | `PASSED (0 cross-split targets; 100% of targets strictly contained within split)` |

## 2. Chronological Boundary Embargo & Target-Split Containment

A methodological audit was conducted to eliminate cross-split target contamination near boundary dates:
- **Audit Finding (Pre-Purge)**:
  - TRAIN features (2022-12-22 to 2022-12-31) with targets in 2023: **1,269 rows** (2.25% of valid targets)
  - VALIDATION features (2023-12-24 to 2023-12-31) with targets in 2024: **148 rows** (0.85% of valid targets)
  - TEST features with targets after 2025-06-30: **0 rows** (0.00%)
  - Total cross-split contaminated rows identified: **1,417 rows**
- **Leakage-Safe Purge Executed**:
  - Exactly **1,417 boundary feature rows** whose targets extended into subsequent splits were purged.
  - Features with targets fully contained within their respective split (e.g. 403 rows in Dec 2022 and 45 rows in Dec 2023) were verified and preserved.
- **Post-Purge Target Containment**: **0 cross-split targets (100% clean containment)**.

## 3. Raw Data Immutability & Protection Guarantee

Every file in `data/raw/` has been verified bit-for-bit against original byte footprints:

- ✅ INTACT: data/raw/agmarknet/agmarknet1.json (3,828,624 bytes)
- ✅ INTACT: data/raw/agmarknet/bihar1.json (20,070,254 bytes)
- ✅ INTACT: data/raw/agmarknet/bihar2.json (40,201,715 bytes)
- ✅ INTACT: data/raw/agmarknet/bihar 3.json (40,256,813 bytes)
- ✅ INTACT: data/raw/crop_production/cropprod2.json (40,973,868 bytes)
- ✅ INTACT: data/raw/rainfall/6c05cd1b-ed59-40c2-bc31-e314f39c6971 (1).csv (10,602,806 bytes)

## 4. Dataset Pipeline Row Counts & Dimensions

| Pipeline Stage | Dataset File | Total Rows | Columns | Date Span |
|---|---|---|---|---|
| Raw Historical Mandi | `data/raw/agmarknet/bihar*.json` | 250,000 | 11 | 2002-02-02 to 2026-09-04 |
| Raw Rainfall | `data/raw/rainfall/6c05cd1b-....csv` | 183,707 | 7 | 2018-01-01 to 2025-06-30 |
| Cleaned Weather | `data/processed/rainfall_daily_features.csv` | 103,372 | 10 | 2018-01-01 to 2025-06-30 |
| Cleaned Daily Mandi | `data/processed/agmarknet_daily_modeling.csv` | 93,152 | 10 | 2018-01-01 to 2025-06-30 |
| Master Modeling Dataset | `data/processed/master_price_forecasting_dataset.csv` | 91,735 | 36 | 2018-01-01 to 2025-06-30 |
| Weekly Benchmark | `data/processed/weekly_benchmark_dataset.csv` | 25,271 | 22 | ISO Weeks 2018-W01 to 2025-W26 |

## 5. Primary Target Coverage & Lead Day Distribution (`modal_price_t+7`)

- **Total Modeling Samples**: `91,735`
- **Samples with Valid Target in `[t+7, t+10]`**: `79,976` (**87.18%**)
- **Samples with `target = NaN` (dropped from training/eval)**: `11,759` (**12.82%**)

### Empirical Lead Day Distribution for Valid Targets:

| Lead Days | Search Condition | Sample Count | Percentage of Valid Targets | Cumulative Coverage |
|---|---|---|---|---|
| **7 Days** | Exactly $t + 7$ days | 57,174 | 71.49% | 62.33% |
| **8 Days** | Exactly $t + 8$ days | 13,894 | 17.37% | 77.47% |
| **9 Days** | Exactly $t + 9$ days | 5,875 | 7.35% | 83.88% |
| **10 Days** | Exactly $t + 10$ days | 3,033 | 3.79% | 87.18% |

## 6. Chronological Train / Validation / Test Breakdown

| Split Role | Calendar Period | Total Rows | Rows with Valid Target | Target Coverage (%) | Unique Series |
|---|---|---|---|---|---|
| **TRAIN** | 2018-01-01 to 2022-12-31 | 62,130 | 55,194 | 88.84% | 835 |
| **VALIDATION** | 2023-01-01 to 2023-12-27 | 21,085 | 17,263 | 81.87% | 588 |
| **TEST** | 2024-01-01 to 2025-06-30 | 8,520 | 7,519 | 88.25% | 43 |

## 7. Secondary Weekly Benchmark Coverage

- **Total Weekly Records**: `25,271`
- **Records with Valid Next-Week Target**: `21,745` (**86.05%**)
- **Records with Target = NaN**: `3,526` (**13.95%**)

## 8. Feature Columns & Missingness in Master Dataset

| Feature Column | Data Type | Null Count | Null % | Description / Leakage Guard |
|---|---|---|---|---|
| `Date` | `datetime64[us]` | 0 | 0.0% | Observed / Retrospective |
| `District` | `str` | 0 | 0.0% | Observed / Retrospective |
| `Commodity` | `str` | 0 | 0.0% | Observed / Retrospective |
| `modal_price` | `float64` | 0 | 0.0% | Observed / Retrospective |
| `min_price` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `max_price` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `reporting_mandis` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `observation_count` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `price_range` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `price_position` | `float64` | 0 | 0.0% | Observed / Retrospective |
| `rainfall_imd_mm` | `float64` | 10,266 | 11.19% | Exogenous weather indicator (<= t) |
| `rainfall_vic_mm` | `float64` | 1,894 | 2.06% | Exogenous weather indicator (<= t) |
| `rainfall_consensus_mm` | `float64` | 0 | 0.0% | Exogenous weather indicator (<= t) |
| `rainfall_cum_7d` | `float64` | 0 | 0.0% | Exogenous weather indicator (<= t) |
| `rainfall_cum_14d` | `float64` | 0 | 0.0% | Exogenous weather indicator (<= t) |
| `rainfall_cum_30d` | `float64` | 0 | 0.0% | Exogenous weather indicator (<= t) |
| `dry_spell_days_14d` | `float64` | 0 | 0.0% | Observed / Retrospective |
| `excess_rain_shock_7d` | `float64` | 0 | 0.0% | Observed / Retrospective |
| `days_since_prev_obs` | `float64` | 891 | 0.97% | Observed / Retrospective |
| `modal_price_lag_1d` | `float64` | 1,726 | 1.88% | Retrospective time-series lag (<= t-1) |
| `modal_price_roll_mean_7d` | `float64` | 891 | 0.97% | Retrospective time-series lag (<= t-1) |
| `modal_price_roll_std_7d` | `float64` | 0 | 0.0% | Retrospective time-series lag (<= t-1) |
| `year` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `month` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `day_of_week` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `day_of_year` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `quarter` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `sin_day_of_year` | `float64` | 0 | 0.0% | Observed / Retrospective |
| `cos_day_of_year` | `float64` | 0 | 0.0% | Observed / Retrospective |
| `sin_month` | `float64` | 0 | 0.0% | Observed / Retrospective |
| `cos_month` | `float64` | 0 | 0.0% | Observed / Retrospective |
| `is_monsoon` | `int64` | 0 | 0.0% | Observed / Retrospective |
| `target_lead_days` | `float64` | 11,759 | 12.82% | Forward-looking Target (Excluded from X) |
| `target_modal_price_t7` | `float64` | 11,759 | 12.82% | Forward-looking Target (Excluded from X) |
| `target_observed_date` | `str` | 11,759 | 12.82% | Forward-looking Target (Excluded from X) |
| `split` | `str` | 0 | 0.0% | Partition Identifier |

## 9. 2019 / 2020 Gap Confirmation & Boundary Effects

- **Direct Finding**: Calendar years 2019 and 2020 contain exactly **0** market observations.
- **Strict Rule Enforced**: No synthetic records were fabricated; no prices were interpolated or carried across the 2-year boundary.
- **Lag Missingness**: Initial rows in late 2021 (resumption of reporting) naturally evaluate `modal_price_lag_1d = NaN` because prior observations occurred > 30 days prior. Exactly 1,726 rows have null `modal_price_lag_1d` due to series boundaries.

## 10. Retrospective Feature Causality & Leakage Prevention Audit (TEST 8)

A multi-level mathematical and counter-factual verification was performed to guarantee zero future-data leakage:

### 10.1 Forecasting Timestamp Convention
> **Operational Rule**: *Prediction is made after end-of-day t market/weather observations are available. Therefore, same-day weather/market aggregate features are permitted, while autoregressive price features remain strictly <= t-1.*

### 10.2 Autoregressive Price Lag Verification (`modal_price_lag_1d`)
- **Prior-Date Verification**: 100% of all **90,009 non-null lag values** have source observation dates strictly prior to feature `Date` (`source_date < Date`).
- **30-Day Maximum Gap Enforcement**: 100% of valid lag values satisfy $\text{gap} \le 30$ calendar days.
- **Boundary / Hiatus Null Accounting**: Exactly **1,726 rows** have null lag values. Every single null was audited and confirmed to be an initial series observation or an observation following a reporting gap $> 30$ days (e.g. across the 2019/2020 hiatus).

### 10.3 Rolling Trailing Price Statistics (`modal_price_roll_mean_7d`, `modal_price_roll_std_7d`)
- **Strict Construction**: Trailing statistics are computed via `shift(1).rolling(7, min_periods=1)`, strictly referencing past observed prices $[t-7, t-1]$.
- **Zero Contemporaneous Day-t Leakage**: On all **891 initial series observations**, `modal_price_roll_mean_7d` evaluates strictly to `NaN`, despite current-day `modal_price` being present and recorded.
- **Numerical Concordance**: Across all non-null entries, master dataset rolling statistics match the canonical retrospective calculation with $\Delta = 0.0$.

### 10.4 Exogenous Weather Trailing Cumulative Indicators (`rainfall_cum_7d, 14d, 30d`)
- **Temporal Bounds**: Weather indicators are computed over trailing windows $[t - W + 1, t]$ on the complete calendar grid.
- **Retrospective Verification**: All **103,372 weather records** strictly equal trailing retrospective sums over calendar dates $\le \text{Date}$ (maximum deviation $|\Delta| < 10^{-12}$ mm). Zero future weather dates are included.

### 10.5 Automated Counter-Factual / Negative Leakage Tests
Four automated negative tests verified that the test suite detects and rejects synthetic leaks:
1. **Negative Test A (Contemporaneous Lag)**: Injected same-day modal price into lag feature $\rightarrow$ **CAUGHT & REJECTED** (`AssertionError`).
2. **Negative Test B (Future Date in Lag)**: Injected forward date into lag metadata $\rightarrow$ **CAUGHT & REJECTED** (`AssertionError`).
3. **Negative Test C (Day-t Price in Rolling Statistics)**: Injected current-day price into initial series rolling window $\rightarrow$ **CAUGHT & REJECTED** (`AssertionError`).
4. **Negative Test D (Forward-Shifted Rainfall)**: Injected future $t+3$ precipitation into trailing cumulative rainfall $\rightarrow$ **CAUGHT & REJECTED** (`AssertionError`).
