# AI / ML Specification — SIH26033 Solution

## 1. AI Requirements

The SIH problem explicitly requires AI for:
1. demand forecasting;
2. route optimization.

## 2. Demand Forecasting

### Objective
Predict regional demand for a crop over a configurable horizon.

### Inputs
Prefer:
- historical platform order volume;
- crop type;
- region;
- date/seasonality;
- available market price data;
- weather data if reliably available.

If real data is insufficient, use a clearly labeled synthetic dataset for the prototype.

### Pipeline

```text
Raw Data
  ↓
Validation
  ↓
Cleaning
  ↓
Aggregation by crop + region + date
  ↓
Feature Engineering
  ↓
Train / Validation Split
  ↓
Baseline
  ↓
Candidate Model
  ↓
Evaluation
  ↓
Forecast API
```

### MVP Model

Start with a simple baseline, then XGBoost/gradient boosting if data supports it.

Do not use a complex model merely to make the project look like AI.

### Evaluation

Report:
- MAE
- RMSE
- validation period
- model version
- baseline comparison

### Output

```json
{
  "crop_type": "Tomato",
  "region": "Patna",
  "forecast": [
    {"date": "2026-09-10", "predicted_demand_kg": 920}
  ]
}
```

## 3. Explainability

The UI should show why a forecast changed, for example:
- recent demand trend;
- seasonality;
- recent market-price movement;
- available supply.

Only show factors actually used by the model.

## 4. Route Optimization

Treat logistics as a constrained optimization problem.

Inputs:
- pickup coordinates;
- delivery coordinates;
- order quantities;
- vehicle capacity;
- delivery constraints.

Use Google OR-Tools for the prototype.

## 5. ML Safety

- Never claim forecast certainty.
- Clearly label predictions as estimates.
- Record model version.
- Separate synthetic demo results from real-world observations.
- Do not fabricate accuracy metrics.

## 6. AI Demo

The final presentation should show:

```text
Historical Demand
      ↓
AI Model
      ↓
Next 7 Days Forecast
      ↓
Buyer/Supply Planning
```

Then show the route optimizer using the resulting orders.
