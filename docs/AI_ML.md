# 🌾 SIH26033 — Machine Learning System Specification & Evaluation Report

*Document Status: APPROVED & VALIDATED*  
*Last Updated: 2026-09-06*  
*Scope: 7–10 Day-Ahead Agricultural Wholesale Modal Price Forecasting*

---

## 1. Executive Summary & Problem Scope

In the SIH26033 agricultural platform, the machine learning module is purpose-built for:

> **Core Objective**: **7–10 day-ahead wholesale modal price forecasting** in ₹/quintal for agricultural commodities across the 38 districts of Bihar at `[District, Commodity]` grain.

### ⚠️ Scope Boundaries & Scientific Clarifications
- **What this model forecasts**: The expected wholesale modal market price (`target_modal_price_t7`) observed in physical mandis 7 to 10 calendar days in advance.
- **What this model does NOT forecast**:
  - It is **NOT** a consumer retail demand model (no retail consumer purchase transactions).
  - It is **NOT** a guaranteed farmer price or minimum support price (MSP) floor.
  - It is **NOT** a physical arrival volume estimator (arrival volumes are not reported in AGMARKNET Bihar feeds).

### Operational Forecasting Timestamp Convention
> **Operational Rule**: *Prediction is made after end-of-day $t$ market and weather observations are finalized and published. Therefore, contemporaneous same-day weather indicators ($W_t$) and same-day market arrival aggregates ($N_t$, observed reporting mandis) are permitted as inputs, while autoregressive price history features ($P_{t-1}, \text{MA}_{7d}$) remain strictly $\le t-1$.*

---

## 2. Frozen Dataset & Chronological Partitioning

The modeling pipeline consumes exclusively the frozen processed dataset:
`data/processed/master_price_forecasting_dataset.csv` (91,735 total rows).

Supervised model training and evaluation are conducted strictly on records with non-null targets (**79,976 records**, 87.18% coverage). Unsupervised/boundary records where no mandi observation was recorded within $[t+7, t+10]$ evaluate to `target = NaN` and are dropped from loss calculation.

### Strict Chronological Partitioning
To prevent look-ahead bias and cross-split contamination, data is partitioned chronologically with boundary embargos:

| Split Role | Calendar Range | Total Records | Valid Target Samples | Active Series | Function |
|---|---|---|---|---|---|
| **TRAIN** | 2018-01-01 to 2022-12-24 | 62,130 | **55,194** | 835 | Supervised feature preprocessing & model fitting |
| **VALIDATION** | 2023-01-01 to 2023-12-24 | 21,085 | **17,263** | 588 | Model selection, hyperparameter validation, baseline comparison |
| **TEST** | 2024-01-01 to 2025-06-23 | 8,520 | **7,519** | 43 | Final unbiased out-of-sample evaluation |

*Note*: Late-December records whose targets crossed into subsequent calendar years (1,269 train rows and 148 validation rows) were purged during preprocessing validation to ensure 100% split isolation.

---

## 3. Feature Architecture & Leakage Guards

The model utilizes **31 input features** (2 categorical, 29 numeric).

### Categorical Features (2)
- `District`: Normalizes to official 38 Bihar administrative districts (e.g. Patna, Muzaffarpur, Gaya).
- `Commodity`: Standardized commodity name across cereals, pulses, fruits, and vegetables (e.g. Wheat, Maize, Potato, Tomato).

### Contemporaneous Mandi Aggregates (Day $t$) (7)
- `modal_price`: Daily observed modal price in ₹/quintal across mandis in the district.
- `min_price`: Minimum recorded price in ₹/quintal.
- `max_price`: Maximum recorded price in ₹/quintal.
- `price_range`: `max_price - min_price`.
- `price_position`: Relative position `(modal - min) / (max - min)`.
- `reporting_mandis`: Count of active reporting markets in the district on day $t$.
- `observation_count`: Total grade-level trade observations recorded on day $t$.

### Retrospective Autoregressive Price History ($\le t-1$) (4)
- `modal_price_lag_1d`: Most recent past modal price observation for the series with strict $\le 30$-day gap enforcement (`source_date < Date`).
- `modal_price_roll_mean_7d`: Trailing 7-observation moving average of past prices (`shift(1).rolling(7)`). Strictly evaluates to `NaN` on series starts.
- `modal_price_roll_std_7d`: Trailing 7-observation price standard deviation (short-term volatility proxy).
- `days_since_prev_obs`: Elapsed calendar days since the prior mandi trade observation.

### Exogenous Meteorological Features ($\le t$) (8)
- `rainfall_imd_mm`: Precipitation from IMD 0.25° grid model.
- `rainfall_vic_mm`: Precipitation from NRSC VIC hydrological model.
- `rainfall_consensus_mm`: Arithmetic mean $(IMD + VIC) / 2.0$ (clipped to $\ge 0.0$ mm).
- `rainfall_cum_7d`: Trailing 7-day cumulative precipitation on full calendar grid.
- `rainfall_cum_14d`: Trailing 14-day cumulative precipitation on full calendar grid.
- `rainfall_cum_30d`: Trailing 30-day cumulative precipitation on full calendar grid.
- `dry_spell_days_14d`: Count of rainless days ($\le 0.05$ mm) in preceding 14 days.
- `excess_rain_shock_7d`: Binary indicator of heavy rain shock ($>50$ mm in trailing 3 days).

### Agronomic Calendar & Seasonality Features (10)
- `year`, `month`, `day_of_week`, `day_of_year`, `quarter`
- `sin_day_of_year`, `cos_day_of_year`: Continuous cyclic trigonometric day-of-year encoding.
- `sin_month`, `cos_month`: Continuous cyclic trigonometric month encoding.
- `is_monsoon`: Agronomic indicator flag for Kharif monsoon season (June 15 – September 30).

### Forbidden Columns (Strictly Excluded from $X$)
The training harness automatically validates that the following columns are never in the feature set:
- `target_modal_price_t7` (Target)
- `target_observed_date` (Future metadata)
- `target_lead_days` (Future metadata)
- `split` (Partition identifier)
- `Date` (Split/indexing key)

---

## 4. Models Evaluated

In accordance with hackathon principles (reliability, explainability, non-over-engineering), three models were benchmarked:

### Model 1 — Naive Persistence Baseline
- **Formula**: $\hat{y}_{t+7} = \text{modal\_price\_lag\_1d}$ (with fallback to day-$t$ $\text{modal\_price}$ when lag is null).
- **Rationale**: In agricultural spot markets, today's price is the standard benchmark for near-term forecasting.

### Model 2 — 7-Day Moving Average Baseline
- **Formula**: $\hat{y}_{t+7} = \text{modal\_price\_roll\_mean\_7d}$ (trailing retrospective mean of past observations $\le t-1$).
- **Rationale**: Smooths idiosyncratic daily price spikes.

### Model 3 — Random Forest Regressor
- **Architecture**: `sklearn.ensemble.RandomForestRegressor`
- **Preprocessing Pipeline**:
  - Numeric imputation: `SimpleImputer(strategy='median')` fitted strictly on TRAIN.
  - Categorical encoding: `OneHotEncoder(handle_unknown='ignore', sparse_output=False)` fitted strictly on TRAIN.
- **Hyperparameters**:
  - `n_estimators = 300`
  - `max_depth = 20`
  - `min_samples_leaf = 2`
  - `max_features = 0.5` (empirically selected via validation comparison; reduces tree correlation and training latency)
  - `random_state = 42`
  - `n_jobs = -1`

---

## 5. Empirical Results & Model Selection

### 5.1 Validation Set Comparison (Model Selection Phase)
*Validation Period: 2023-01-01 to 2023-12-24 (17,263 samples, Mean Actual Price: ₹2,218.76/quintal)*

| Model Candidate | Sample Count ($n$) | Validation MAE (₹/q) | Validation RMSE (₹/q) | Validation $R^2$ | Validation MAPE | Selection Role |
|---|---|---|---|---|---|---|
| **Naive Persistence (A: Native Lag-1D only)** | 17,131 (available) | ₹433.44 | ₹4,756.93 | -0.2201 | 19.32% | Baseline (lag-only) |
| **Naive Persistence (B: Fallback-inclusive)** | 17,263 (all val) | ₹435.59 | ₹4,741.22 | -0.2189 | 19.35% | Baseline (complete) |
| **7-Day Moving Average (Roll-7D)** | 17,263 (all val) | ₹446.31 | ₹3,935.42 | 0.1602 | 20.41% | Baseline (complete) |
| **Random Forest Regressor** | **17,263 (all val)** | **₹410.12** | **₹3,940.44** | **0.1581** | **18.48%** | 🏆 **Best Validation MAE** |

> **Validation Selection Outcome**: Random Forest Regressor achieved the lowest Validation MAE (₹410.12/quintal), outperforming both Naive Persistence benchmarks (by ₹23.32 to ₹25.47/quintal) and 7-Day Moving Average (by ₹36.19/quintal), while dramatically reducing RMSE over persistence by >₹800/quintal.

---

### 5.2 Final Unbiased Out-of-Sample Test Evaluation
*Test Period: 2024-01-01 to 2025-06-23 (7,519 samples, Mean Actual Price: ₹2,917.81/quintal)*

| Model | Sample Count ($n$) | Test MAE (₹/q) | Test RMSE (₹/q) | Test $R^2$ | Test MAPE | Mean Predicted Price |
|---|---|---|---|---|---|---|
| **Naive Persistence (A: Native Lag-1D only)** | 7,499 (available) | **₹366.37** | ₹6,050.67 | 0.0474 | 9.07% | ₹2,812.55 |
| **Naive Persistence (B: Fallback-inclusive)** | 7,519 (all test) | **₹366.72** | ₹6,042.83 | 0.0484 | 9.08% | ₹2,813.18 |
| **7-Day Moving Average (Roll-7D)** | 7,519 (all test) | ₹448.69 | ₹6,288.40 | -0.0305 | 12.37% | ₹2,865.75 |
| **Random Forest Regressor** | 7,519 (all test) | ₹423.95 | ₹6,125.78 | 0.0221 | 10.34% | ₹2,732.36 |

> **Core Empirical Conclusion**:  
> **Random Forest achieved the best validation MAE, while the Naive Persistence baseline achieved the best final test MAE.**

### 🔍 Scientific Analysis of Test Regime vs. Validation Regime
1. **Validation Regime (2023)**: Broad market participation across **588 distinct series**. Multi-variate interactions (weather shocks, day-of-year crop cycles, price spreads) gave Random Forest a clear predictive advantage over unadjusted persistence.
2. **Test Regime (2024–2025)**: AGMARKNET reporting in Bihar narrowed to **43 active series**, dominated by staple grains and long-life commodities with high price inertia and minimal intra-week volatility. On these inertia-dominated series, 1-day lag persistence achieved lower absolute error (₹366.37–₹366.72 MAE).
3. **Robustness**: Random Forest generalized with a safe 10.34% MAPE on test without diverging, and consistently outperformed the 7-day moving average benchmark (₹423.95 vs ₹448.69).

---

## 6. Model Feature Importance (Explainability)

Gini feature importance from the 300-tree ensemble was extracted and mapped to feature names:

| Rank | Model Feature | Importance Weight | Cumulative % | Domain Interpretation |
|---|---|---|---|---|
| 1 | `modal_price` | 0.3521 | 35.21% | Today's prevailing wholesale price anchor |
| 2 | `max_price` | 0.2248 | 57.69% | Upper market trade ceiling |
| 3 | `min_price` | 0.1543 | 73.12% | Lower market trade floor |
| 4 | `Commodity_Cashewnuts` | 0.0944 | 82.56% | High-value commodity category offset |
| 5 | `modal_price_lag_1d` | 0.0562 | 88.18% | Prior trading day price |
| 6 | `modal_price_roll_mean_7d` | 0.0546 | 93.65% | Trailing weekly price baseline |
| 7 | `modal_price_roll_std_7d` | 0.0061 | 94.25% | Short-term price dispersion / volatility |
| 8 | `day_of_year` | 0.0055 | 94.80% | Annual harvest/sowing calendar progression |
| 9 | `rainfall_cum_30d` | 0.0042 | 95.22% | Monthly cumulative moisture availability |
| 10 | `sin_day_of_year` | 0.0040 | 95.62% | Cyclic annual seasonality |
| 11 | `cos_day_of_year` | 0.0039 | 96.01% | Cyclic annual seasonality |
| 12 | `rainfall_cum_14d` | 0.0035 | 96.36% | Fortnightly cumulative rainfall |
| 13 | `price_range` | 0.0034 | 96.71% | Intra-day mandi price spread |
| 14 | `rainfall_cum_7d` | 0.0029 | 97.01% | Trailing weekly weather disruption indicator |
| 15 | `Commodity_Apple` | 0.0027 | 97.27% | Perishable imported fruit premium |
| 16 | `dry_spell_days_14d` | 0.0018 | 97.46% | Agronomic moisture deficit indicator |
| 17 | `rainfall_consensus_mm` | 0.0015 | 97.61% | Same-day rain shock |
| 18 | `rainfall_imd_mm` | 0.0015 | 97.75% | IMD weather grid estimate |
| 19 | `price_position` | 0.0015 | 97.90% | Skew within daily price range |
| 20 | `rainfall_vic_mm` | 0.0014 | 98.04% | VIC hydrological model estimate |

> **Explainability Notice**: These weights reflect **model feature importance** within tree split criteria, not causal economic claims. Price anchors (`modal`, `max`, `min`) establish the baseline valuation tier, while autoregressive lags, seasonality, and rainfall features modulate the 7–10 day trend adjustment.

---

## 7. Artifacts & Code Structure

All artifacts are persisted under standard project directories:

```text
ml/
├── train_price_model.py                # Main training & validation pipeline
├── predict.py                          # Reusable Python inference interface
├── inference/
│   └── predict.py                      # Package-level inference wrapper
├── models/
│   ├── price_forecasting_model.joblib  # Trained RandomForestRegressor (300 trees, 286 MB)
│   └── preprocessor.joblib             # Fitted ColumnTransformer (imputer + one-hot)
└── evaluation/
    ├── model_metrics.json              # Full machine-readable metric summary
    ├── model_comparison.csv            # Tabular validation & test comparison
    ├── feature_importance.csv          # Ranked feature importances (147 features)
    ├── actual_vs_predicted_test.png    # Test set scatter plot with 1:1 identity line
    ├── residual_distribution_test.png  # Error histogram & residual distribution
    └── feature_importance_top20.png    # Top 20 feature importance horizontal bar chart
```

---

## 8. How to Use the Trained Model (Inference Interface)

The inference interface `PriceForecaster` is designed for seamless backend integration:

```python
from ml.predict import PriceForecaster

# Initialize forecaster (loads joblib artifacts)
forecaster = PriceForecaster()

# Single observation prediction
sample_input = {
    "District": "Patna",
    "Commodity": "Wheat",
    "modal_price": 2400.0,
    "min_price": 2350,
    "max_price": 2450,
    "reporting_mandis": 2,
    "observation_count": 4,
    "price_range": 100,
    "price_position": 0.5,
    "rainfall_consensus_mm": 0.0,
    "rainfall_cum_7d": 0.0,
    "rainfall_cum_14d": 5.2,
    "rainfall_cum_30d": 12.0,
    "dry_spell_days_14d": 12.0,
    "excess_rain_shock_7d": 0,
    "days_since_prev_obs": 1.0,
    "modal_price_lag_1d": 2390.0,
    "modal_price_roll_mean_7d": 2385.0,
    "modal_price_roll_std_7d": 15.0,
    "year": 2024,
    "month": 4,
    "day_of_week": 2,
    "day_of_year": 105,
    "quarter": 2,
    "sin_day_of_year": 0.97,
    "cos_day_of_year": -0.24,
    "sin_month": 0.866,
    "cos_month": -0.5,
    "is_monsoon": 0,
}

predicted_price = forecaster.predict(sample_input)
print(f"Predicted 7-10d Wholesale Modal Price: ₹{predicted_price}/quintal")
# Output: ₹2257.72/quintal
```

---

## 9. Model Limitations & Production Safeguards

1. **Temporal Horizon**: Forecasts are strictly tuned for the **7 to 10 day window**. The model cannot be extrapolated to multi-month or annual forecasts without retraining on seasonal horizons.
2. **Missing Mandi Observations**: When a district-commodity series stops reporting for $>30$ days, autoregressive features evaluate to `NaN` and default to training-set medians.
3. **External Shocks**: Macroeconomic factors (sudden export bans, fuel price spikes, demonetization) not reflected in local weather or past prices cannot be anticipated.
4. **Safety Clipping**: The inference engine enforces a strict non-negative price lower bound ($\hat{y} \ge 0.0$).
