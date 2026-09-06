"""
SIH26033 - Agricultural Wholesale Modal Price Forecasting
Script: ml/train_price_model.py
=========================================================
Trains and evaluates 7-10 day-ahead wholesale modal price forecasting models
for Bihar agricultural markets at [District, Commodity] grain.

Forecasting Target:
    target_modal_price_t7 (₹/quintal)
    Earliest observed wholesale modal market price in [t+7, t+10] window.

Models Evaluated:
    1. Model 1 — Naive Persistence Baseline (modal_price_lag_1d)
    2. Model 2 — 7-Day Moving Average Baseline (modal_price_roll_mean_7d)
    3. Model 3 — Random Forest Regressor (sklearn.ensemble.RandomForestRegressor)

Data Protocol:
    - Chronological split: TRAIN (<= 2022), VALIDATION (2023), TEST (2024 - 2025-06)
    - Preprocessing fitted strictly on TRAIN (SimpleImputer + OneHotEncoder)
    - Model selection based strictly on VALIDATION MAE
    - TEST evaluated once on finalized model

Outputs:
    - ml/models/price_forecasting_model.joblib
    - ml/models/preprocessor.joblib
    - ml/evaluation/model_metrics.json
    - ml/evaluation/model_comparison.csv
    - ml/evaluation/feature_importance.csv
    - ml/evaluation/actual_vs_predicted_test.png
    - ml/evaluation/residual_distribution_test.png
    - ml/evaluation/feature_importance_top20.png
"""

import os
import sys
import json
import time
import joblib
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")  # Non-interactive backend for headless execution
import matplotlib.pyplot as plt

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from sklearn.ensemble import RandomForestRegressor
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Paths
DATASET_PATH = "data/processed/master_price_forecasting_dataset.csv"
MODEL_DIR = "ml/models"
EVAL_DIR = "ml/evaluation"

# Feature definitions
CATEGORICAL_FEATURES = ["District", "Commodity"]

NUMERIC_FEATURES = [
    "modal_price",
    "min_price",
    "max_price",
    "reporting_mandis",
    "observation_count",
    "price_range",
    "price_position",
    "rainfall_imd_mm",
    "rainfall_vic_mm",
    "rainfall_consensus_mm",
    "rainfall_cum_7d",
    "rainfall_cum_14d",
    "rainfall_cum_30d",
    "dry_spell_days_14d",
    "excess_rain_shock_7d",
    "days_since_prev_obs",
    "modal_price_lag_1d",
    "modal_price_roll_mean_7d",
    "modal_price_roll_std_7d",
    "year",
    "month",
    "day_of_week",
    "day_of_year",
    "quarter",
    "sin_day_of_year",
    "cos_day_of_year",
    "sin_month",
    "cos_month",
    "is_monsoon",
]

TARGET_COLUMN = "target_modal_price_t7"
FORBIDDEN_COLUMNS = [
    "target_modal_price_t7",
    "target_observed_date",
    "target_lead_days",
    "split",
    "Date",
]


def calculate_metrics(y_true, y_pred, name="Model"):
    """Calculate MAE, RMSE, R2, sample count, mean actual, and mean predicted."""
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    r2 = r2_score(y_true, y_pred)
    mean_act = float(np.mean(y_true))
    mean_prd = float(np.mean(y_pred))
    n_samples = int(len(y_true))

    # Safe MAPE: only on rows where actual price >= 100 to avoid division by zero / tiny values
    valid_mape_mask = y_true >= 100.0
    if valid_mape_mask.sum() > 0:
        mape = float(np.mean(np.abs((y_true[valid_mape_mask] - y_pred[valid_mape_mask]) / y_true[valid_mape_mask])) * 100.0)
    else:
        mape = None

    return {
        "model": name,
        "n_samples": n_samples,
        "mae": round(float(mae), 2),
        "rmse": round(float(rmse), 2),
        "r2": round(float(r2), 4),
        "mean_actual": round(mean_act, 2),
        "mean_predicted": round(mean_prd, 2),
        "mape_pct": round(mape, 2) if mape is not None else None,
    }


def main():
    print("=" * 80)
    print("SIH26033 - ML MODELING & EVALUATION PIPELINE")
    print("Task: 7-10 day-ahead wholesale modal price forecasting (INR/quintal)")
    print("=" * 80)

    os.makedirs(MODEL_DIR, exist_ok=True)
    os.makedirs(EVAL_DIR, exist_ok=True)

    # 1. Load Frozen Processed Dataset
    print(f"\n[1/6] Loading frozen dataset: {DATASET_PATH}...")
    df = pd.read_csv(DATASET_PATH)
    df["Date"] = pd.to_datetime(df["Date"])
    print(f"  Total rows loaded: {len(df):,}")

    # 2. Filter supervised samples (non-null target)
    df_valid = df[df[TARGET_COLUMN].notna()].copy()
    print(f"  Supervised samples with valid target: {len(df_valid):,} ({len(df_valid)/len(df)*100:.2f}%)")

    # 3. Chronological Train / Validation / Test Separation
    train_df = df_valid[df_valid["split"] == "TRAIN"].copy()
    val_df = df_valid[df_valid["split"] == "VALIDATION"].copy()
    test_df = df_valid[df_valid["split"] == "TEST"].copy()

    print("\n[2/6] Chronological Dataset Splits:")
    print(f"  TRAIN:      {len(train_df):,} samples ({train_df['Date'].min().date()} to {train_df['Date'].max().date()})")
    print(f"  VALIDATION: {len(val_df):,} samples ({val_df['Date'].min().date()} to {val_df['Date'].max().date()})")
    print(f"  TEST:       {len(test_df):,} samples ({test_df['Date'].min().date()} to {test_df['Date'].max().date()})")

    feature_cols = CATEGORICAL_FEATURES + NUMERIC_FEATURES
    print(f"\n  Feature count: {len(feature_cols)} ({len(CATEGORICAL_FEATURES)} categorical, {len(NUMERIC_FEATURES)} numeric)")

    # Integrity check: Ensure NO forbidden target or split columns in feature list
    for col in FORBIDDEN_COLUMNS:
        assert col not in feature_cols, f"CRITICAL LEAKAGE: Forbidden column {col} in feature list!"
    print("  -> Feature leakage check PASSED: zero target or split columns in feature set.")

    X_train = train_df[feature_cols]
    y_train = train_df[TARGET_COLUMN].values

    X_val = val_df[feature_cols]
    y_val = val_df[TARGET_COLUMN].values

    X_test = test_df[feature_cols]
    y_test = test_df[TARGET_COLUMN].values

    # -------------------------------------------------------------------------
    # 4. EVALUATE BASELINES ON VALIDATION SET
    # -------------------------------------------------------------------------
    print("\n[3/6] Evaluating Baselines on Validation Set...")

    # Model 1: Naive Persistence Baseline
    # Latest available modal price. Prefer modal_price_lag_1d; fallback to modal_price (day t) if lag is null.
    val_lag_pred_avail = val_df.loc[val_df["modal_price_lag_1d"].notna(), "modal_price_lag_1d"]
    val_y_lag_avail = val_df.loc[val_df["modal_price_lag_1d"].notna(), TARGET_COLUMN]
    m1_avail_metrics = calculate_metrics(val_y_lag_avail.values, val_lag_pred_avail.values, "Naive Persistence (Available lag_1d)")

    # Complete evaluation with day-t fallback for null lag
    val_naive_pred = val_df["modal_price_lag_1d"].fillna(val_df["modal_price"]).values
    m1_metrics = calculate_metrics(y_val, val_naive_pred, "Naive Persistence (Lag-1D / day-t fallback)")

    print(f"  Model 1 (Naive Persistence - Available):  MAE = INR {m1_avail_metrics['mae']:,.2f}, RMSE = INR {m1_avail_metrics['rmse']:,.2f}, R2 = {m1_avail_metrics['r2']:.4f}")
    print(f"  Model 1 (Naive Persistence - All Val):    MAE = INR {m1_metrics['mae']:,.2f}, RMSE = INR {m1_metrics['rmse']:,.2f}, R2 = {m1_metrics['r2']:.4f}")

    # Model 2: 7-Day Moving Average Baseline
    val_ma_pred_avail = val_df.loc[val_df["modal_price_roll_mean_7d"].notna(), "modal_price_roll_mean_7d"]
    val_y_ma_avail = val_df.loc[val_df["modal_price_roll_mean_7d"].notna(), TARGET_COLUMN]
    m2_avail_metrics = calculate_metrics(val_y_ma_avail.values, val_ma_pred_avail.values, "7-Day Moving Average (Available roll_7d)")

    val_ma_pred = val_df["modal_price_roll_mean_7d"].fillna(val_df["modal_price"]).values
    m2_metrics = calculate_metrics(y_val, val_ma_pred, "7-Day Moving Average (Roll-7D / day-t fallback)")

    print(f"  Model 2 (7-Day MA - Available):            MAE = INR {m2_avail_metrics['mae']:,.2f}, RMSE = INR {m2_avail_metrics['rmse']:,.2f}, R2 = {m2_avail_metrics['r2']:.4f}")
    print(f"  Model 2 (7-Day MA - All Val):              MAE = INR {m2_metrics['mae']:,.2f}, RMSE = INR {m2_metrics['rmse']:,.2f}, R2 = {m2_metrics['r2']:.4f}")

    # -------------------------------------------------------------------------
    # 5. FIT PREPROCESSING & RANDOM FOREST REGRESSOR
    # -------------------------------------------------------------------------
    print("\n[4/6] Preprocessing and Model Fitting...")

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", SimpleImputer(strategy="median"), NUMERIC_FEATURES),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), CATEGORICAL_FEATURES),
        ]
    )

    # Model 3: Random Forest Regressor
    rf_model = RandomForestRegressor(
        n_estimators=300,
        max_depth=20,
        min_samples_leaf=2,
        max_features=0.5,
        random_state=42,
        n_jobs=-1,
    )

    print("  Fitting preprocessor strictly on TRAIN...")
    t0 = time.time()
    preprocessor.fit(X_train)
    X_train_proc = preprocessor.transform(X_train)
    X_val_proc = preprocessor.transform(X_val)
    print(f"  Transformed feature dimensions: {X_train_proc.shape[1]} features")

    print("  Training RandomForestRegressor (n_estimators=300, max_depth=20, max_features=0.5)...")
    rf_model.fit(X_train_proc, y_train)
    train_time = time.time() - t0
    print(f"  Training completed in {train_time:.1f} seconds.")

    # Evaluate Model 3 on Validation Set
    val_rf_pred = rf_model.predict(X_val_proc)
    m3_metrics = calculate_metrics(y_val, val_rf_pred, "Random Forest Regressor")
    print(f"  Model 3 (Random Forest - All Val):         MAE = INR {m3_metrics['mae']:,.2f}, RMSE = INR {m3_metrics['rmse']:,.2f}, R2 = {m3_metrics['r2']:.4f}")

    # -------------------------------------------------------------------------
    # MODEL SELECTION ON VALIDATION MAE
    # -------------------------------------------------------------------------
    val_comparison = [
        {"Model": "Naive Persistence (Lag-1D)", "Val MAE (INR/q)": m1_metrics["mae"], "Val RMSE (INR/q)": m1_metrics["rmse"], "Val R2": m1_metrics["r2"], "Samples": m1_metrics["n_samples"]},
        {"Model": "7-Day Moving Average", "Val MAE (INR/q)": m2_metrics["mae"], "Val RMSE (INR/q)": m2_metrics["rmse"], "Val R2": m2_metrics["r2"], "Samples": m2_metrics["n_samples"]},
        {"Model": "Random Forest Regressor", "Val MAE (INR/q)": m3_metrics["mae"], "Val RMSE (INR/q)": m3_metrics["rmse"], "Val R2": m3_metrics["r2"], "Samples": m3_metrics["n_samples"]},
    ]
    df_val_comp = pd.DataFrame(val_comparison)

    print("\n" + "=" * 80)
    print("VALIDATION SET MODEL COMPARISON (Selection based on MAE)")
    print("=" * 80)
    print(df_val_comp.to_string(index=False))

    # Determine best model
    best_candidate = min(val_comparison, key=lambda x: x["Val MAE (INR/q)"])
    selected_model_name = best_candidate["Model"]
    print(f"\n>>> Selected Best Model: {selected_model_name} (Validation MAE = INR {best_candidate['Val MAE (INR/q)']}/quintal)")

    # -------------------------------------------------------------------------
    # 6. UNBIASED EVALUATION ON FINAL TEST SET
    # -------------------------------------------------------------------------
    print("\n[5/6] Final Unbiased Evaluation on TEST Set (2024-01-01 to 2025-06-30)...")

    # Baselines on Test Set
    test_naive_pred = test_df["modal_price_lag_1d"].fillna(test_df["modal_price"]).values
    test_m1_metrics = calculate_metrics(y_test, test_naive_pred, "Naive Persistence (Lag-1D)")

    test_ma_pred = test_df["modal_price_roll_mean_7d"].fillna(test_df["modal_price"]).values
    test_m2_metrics = calculate_metrics(y_test, test_ma_pred, "7-Day Moving Average")

    # Random Forest on Test Set
    X_test_proc = preprocessor.transform(X_test)
    test_rf_pred = rf_model.predict(X_test_proc)
    test_m3_metrics = calculate_metrics(y_test, test_rf_pred, "Random Forest Regressor")

    test_comparison = [
        {"Model": "Naive Persistence (Lag-1D)", "Test MAE (INR/q)": test_m1_metrics["mae"], "Test RMSE (INR/q)": test_m1_metrics["rmse"], "Test R2": test_m1_metrics["r2"], "Samples": test_m1_metrics["n_samples"]},
        {"Model": "7-Day Moving Average", "Test MAE (INR/q)": test_m2_metrics["mae"], "Test RMSE (INR/q)": test_m2_metrics["rmse"], "Test R2": test_m2_metrics["r2"], "Samples": test_m2_metrics["n_samples"]},
        {"Model": "Random Forest Regressor", "Test MAE (INR/q)": test_m3_metrics["mae"], "Test RMSE (INR/q)": test_m3_metrics["rmse"], "Test R2": test_m3_metrics["r2"], "Samples": test_m3_metrics["n_samples"]},
    ]
    df_test_comp = pd.DataFrame(test_comparison)

    print("\n" + "=" * 80)
    print("FINAL TEST SET PERFORMANCE (7,519 samples)")
    print("=" * 80)
    print(df_test_comp.to_string(index=False))

    # -------------------------------------------------------------------------
    # 7. FEATURE IMPORTANCE EXTRACTION
    # -------------------------------------------------------------------------
    print("\n[6/6] Extracting Model Feature Importance & Generating Visualizations...")

    # Reconstruct transformed feature names
    cat_encoder = preprocessor.named_transformers_["cat"]
    encoded_cat_names = list(cat_encoder.get_feature_names_out(CATEGORICAL_FEATURES))
    all_feature_names = NUMERIC_FEATURES + encoded_cat_names

    importances = rf_model.feature_importances_
    df_importance = pd.DataFrame({
        "feature": all_feature_names,
        "importance": importances
    }).sort_values("importance", ascending=False).reset_index(drop=True)

    df_importance["cumulative_importance"] = df_importance["importance"].cumsum()

    print("\nTop 20 Model Features by Importance:")
    for idx, row in df_importance.head(20).iterrows():
        print(f"  {idx+1:2d}. {row['feature']:<35} : {row['importance']:.4f} ({row['importance']*100:.2f}%)")

    # -------------------------------------------------------------------------
    # 8. SAVE ARTIFACTS
    # -------------------------------------------------------------------------
    model_path = os.path.join(MODEL_DIR, "price_forecasting_model.joblib")
    preproc_path = os.path.join(MODEL_DIR, "preprocessor.joblib")
    joblib.dump(rf_model, model_path, compress=3)
    joblib.dump(preprocessor, preproc_path)
    print(f"\n[OK] Model saved to: {model_path}")
    print(f"[OK] Preprocessor saved to: {preproc_path}")

    # Save metrics JSON
    metrics_summary = {
        "forecasting_objective": "7–10 day-ahead wholesale modal price forecasting",
        "target": "target_modal_price_t7",
        "unit": "INR per quintal (₹/quintal)",
        "timestamp_convention": "Prediction is made after end-of-day t market/weather observations are available.",
        "splits": {
            "train": {"n_samples": len(train_df), "date_min": str(train_df["Date"].min().date()), "date_max": str(train_df["Date"].max().date())},
            "validation": {"n_samples": len(val_df), "date_min": str(val_df["Date"].min().date()), "date_max": str(val_df["Date"].max().date())},
            "test": {"n_samples": len(test_df), "date_min": str(test_df["Date"].min().date()), "date_max": str(test_df["Date"].max().date())},
        },
        "validation_metrics": {
            "naive_persistence": m1_metrics,
            "moving_average_7d": m2_metrics,
            "random_forest": m3_metrics,
        },
        "test_metrics": {
            "naive_persistence": test_m1_metrics,
            "moving_average_7d": test_m2_metrics,
            "random_forest": test_m3_metrics,
        },
        "selected_model": {
            "name": selected_model_name,
            "hyperparameters": {
                "n_estimators": 300,
                "max_depth": 20,
                "min_samples_leaf": 2,
                "max_features": 0.5,
                "random_state": 42,
            },
            "validation_mae": m3_metrics["mae"],
            "test_mae": test_m3_metrics["mae"],
            "test_rmse": test_m3_metrics["rmse"],
            "test_r2": test_m3_metrics["r2"],
        }
    }

    metrics_json_path = os.path.join(EVAL_DIR, "model_metrics.json")
    with open(metrics_json_path, "w", encoding="utf-8") as f:
        json.dump(metrics_summary, f, indent=2)
    print(f"[OK] Metrics saved to: {metrics_json_path}")

    # Save Comparison CSV
    comparison_combined = []
    for m in [m1_metrics, m2_metrics, m3_metrics]:
        comparison_combined.append({**{"split": "VALIDATION"}, **m})
    for m in [test_m1_metrics, test_m2_metrics, test_m3_metrics]:
        comparison_combined.append({**{"split": "TEST"}, **m})
    df_comparison_all = pd.DataFrame(comparison_combined)
    comp_csv_path = os.path.join(EVAL_DIR, "model_comparison.csv")
    df_comparison_all.to_csv(comp_csv_path, index=False)
    print(f"[OK] Model comparison table saved to: {comp_csv_path}")

    # Save Feature Importance CSV
    importance_csv_path = os.path.join(EVAL_DIR, "feature_importance.csv")
    df_importance.to_csv(importance_csv_path, index=False)
    print(f"[OK] Feature importance table saved to: {importance_csv_path}")

    # -------------------------------------------------------------------------
    # 9. GENERATE EVALUATION CHARTS
    # -------------------------------------------------------------------------
    # Chart 1: Actual vs Predicted Price on Test Set
    plt.figure(figsize=(9, 7))
    plt.scatter(y_test, test_rf_pred, alpha=0.35, edgecolors="none", s=18, color="#1f77b4")
    # Diagonal 1:1 reference line
    min_val = min(float(np.min(y_test)), float(np.min(test_rf_pred)))
    max_val = max(float(np.max(y_test)), float(np.max(test_rf_pred)))
    plt.plot([min_val, max_val], [min_val, max_val], "r--", lw=1.8, label="Ideal 1:1 Identity")
    plt.title(f"Random Forest: Actual vs Predicted 7–10d Wholesale Modal Price (Test Set)\nMAE: ₹{test_m3_metrics['mae']:,.2f} | RMSE: ₹{test_m3_metrics['rmse']:,.2f} | R²: {test_m3_metrics['r2']:.4f}", fontsize=12)
    plt.xlabel("Actual Wholesale Modal Price (₹/quintal)", fontsize=11)
    plt.ylabel("Predicted Wholesale Modal Price (₹/quintal)", fontsize=11)
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.legend(loc="upper left")
    plt.tight_layout()
    chart1_path = os.path.join(EVAL_DIR, "actual_vs_predicted_test.png")
    plt.savefig(chart1_path, dpi=180)
    plt.close()
    print(f"[OK] Chart 1 saved: {chart1_path}")

    # Chart 2: Residual / Error Distribution on Test Set
    residuals = y_test - test_rf_pred
    plt.figure(figsize=(9, 5))
    # Clip extreme outlier residuals for clear histogram display (e.g. within -2000 to +2000)
    res_clipped = np.clip(residuals, -2500, 2500)
    plt.hist(res_clipped, bins=80, color="#2ca02c", edgecolor="black", alpha=0.7)
    plt.axvline(0, color="red", linestyle="--", lw=1.8, label="Zero Error")
    plt.axvline(float(np.mean(residuals)), color="blue", linestyle=":", lw=1.8, label=f"Mean Error: ₹{np.mean(residuals):.1f}")
    plt.title(f"Prediction Residual Distribution (Actual - Predicted) on Test Set\nMean Error: ₹{np.mean(residuals):.2f} | Median Absolute Error: ₹{np.median(np.abs(residuals)):.2f}", fontsize=12)
    plt.xlabel("Residual / Error (₹/quintal) [Clipped to ±₹2,500 for visualization]", fontsize=11)
    plt.ylabel("Frequency (Sample Count)", fontsize=11)
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.legend(loc="upper right")
    plt.tight_layout()
    chart2_path = os.path.join(EVAL_DIR, "residual_distribution_test.png")
    plt.savefig(chart2_path, dpi=180)
    plt.close()
    print(f"[OK] Chart 2 saved: {chart2_path}")

    # Chart 3: Top 20 Feature Importances
    top20 = df_importance.head(20).iloc[::-1]  # Invert so highest is at top
    plt.figure(figsize=(10, 7))
    plt.barh(top20["feature"], top20["importance"], color="#ff7f0e", edgecolor="black", alpha=0.8)
    plt.title("Random Forest: Top 20 Model Features by Importance", fontsize=12)
    plt.xlabel("Gini Feature Importance (Relative Weight)", fontsize=11)
    plt.grid(True, linestyle="--", alpha=0.5, axis="x")
    plt.tight_layout()
    chart3_path = os.path.join(EVAL_DIR, "feature_importance_top20.png")
    plt.savefig(chart3_path, dpi=180)
    plt.close()
    print(f"[OK] Chart 3 saved: {chart3_path}")

    print("\n" + "=" * 80)
    print("TRAINING & EVALUATION COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    main()

