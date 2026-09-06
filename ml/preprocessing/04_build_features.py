"""
SIH26033 - Agricultural ML Pipeline
Script 04: Build Feature Matrix and Forecasting Targets
======================================================
Merges cleaned AGMARKNET market observations with cleaned rainfall features on
[Date, District], constructs strictly retrospective price lags, rolling statistics,
exogenous weather indicators, and calendar seasonality features.

Constructs deterministic target: modal_price_t+7 (earliest observation in [t+7, t+10]).
Partitions data into chronological splits (Train: 2018-2022, Val: 2023, Test: 2024-2025 H1).

Output: data/processed/master_price_forecasting_dataset.csv
"""

import os
import sys
import pandas as pd
import numpy as np

# Ensure root directory is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))


def build_master_dataset(
    agmarknet_path: str = "data/processed/agmarknet_daily_modeling.csv",
    rainfall_path: str = "data/processed/rainfall_daily_features.csv",
    output_path: str = "data/processed/master_price_forecasting_dataset.csv",
) -> pd.DataFrame:
    print(f"Loading modeling datasets:\n  - {agmarknet_path}\n  - {rainfall_path}")
    df_market = pd.read_csv(agmarknet_path)
    df_market["Date"] = pd.to_datetime(df_market["Date"])

    df_rain = pd.read_csv(rainfall_path)
    df_rain["Date"] = pd.to_datetime(df_rain["Date"])

    print(f"Market rows: {len(df_market):,}, Weather rows: {len(df_rain):,}")

    # 1. Left Join Weather onto Market Observations
    # Join key: [Date, District]
    merged = pd.merge(df_market, df_rain, on=["Date", "District"], how="left")
    print(f"Merged dataset rows: {len(merged):,}")
    
    # Check rainfall join coverage
    rain_nulls = merged["rainfall_consensus_mm"].isnull().sum()
    print(f"Rainfall match completeness: {len(merged) - rain_nulls:,} / {len(merged):,} ({((len(merged)-rain_nulls)/len(merged))*100:.2f}%)")
    if rain_nulls > 0:
        # Fill any missing rainfall with district mean or 0.0
        merged["rainfall_consensus_mm"] = merged["rainfall_consensus_mm"].fillna(0.0)
        merged["rainfall_cum_7d"] = merged["rainfall_cum_7d"].fillna(0.0)
        merged["rainfall_cum_14d"] = merged["rainfall_cum_14d"].fillna(0.0)
        merged["rainfall_cum_30d"] = merged["rainfall_cum_30d"].fillna(0.0)
        merged["dry_spell_days_14d"] = merged["dry_spell_days_14d"].fillna(14.0)
        merged["excess_rain_shock_7d"] = merged["excess_rain_shock_7d"].fillna(0)

    # 2. Sort deterministically for retrospective time-series feature engineering
    merged = merged.sort_values(["District", "Commodity", "Date"]).reset_index(drop=True)

    # 3. Retrospective Price Lags & Rolling Statistics
    # Strictly retrospective: feature at time t uses ONLY information <= t.
    # Group by [District, Commodity]
    print("\nEngineering retrospective price lags and rolling statistics...")

    # Calculate gap in days to preceding observation in the series
    merged["prev_date"] = merged.groupby(["District", "Commodity"])["Date"].shift(1)
    merged["days_since_prev_obs"] = (merged["Date"] - merged["prev_date"]).dt.days

    # Most recent previous observation (shift 1)
    # If the previous observation occurred > 30 days ago (e.g. across the 2019/2020 gap),
    # we do NOT carry prices across the multi-month gap!
    valid_lag1 = merged["days_since_prev_obs"] <= 30
    merged["modal_price_lag_1d"] = np.where(
        valid_lag1,
        merged.groupby(["District", "Commodity"])["modal_price"].shift(1),
        np.nan
    )

    # Rolling 7-day trailing mean and std of past observed prices (strictly excluding day t)
    # shift(1) ensures current day t price does NOT leak into trailing summary statistics
    past_price = merged.groupby(["District", "Commodity"])["modal_price"].shift(1)
    merged["modal_price_roll_mean_7d"] = (
        past_price.groupby([merged["District"], merged["Commodity"]])
        .rolling(7, min_periods=1)
        .mean()
        .reset_index(drop=True)
    )
    # Volatility / standard deviation
    merged["modal_price_roll_std_7d"] = (
        past_price.groupby([merged["District"], merged["Commodity"]])
        .rolling(7, min_periods=2)
        .std()
        .reset_index(drop=True)
        .fillna(0.0)
    )

    # 4. Retrospective Calendar & Seasonality Features
    print("Engineering calendar and cyclic seasonality features...")
    merged["year"] = merged["Date"].dt.year
    merged["month"] = merged["Date"].dt.month
    merged["day_of_week"] = merged["Date"].dt.dayofweek
    merged["day_of_year"] = merged["Date"].dt.dayofyear
    merged["quarter"] = merged["Date"].dt.quarter

    # Cyclic sine/cosine transformations for continuous seasonal transitions
    merged["sin_day_of_year"] = np.sin(2 * np.pi * merged["day_of_year"] / 365.25)
    merged["cos_day_of_year"] = np.cos(2 * np.pi * merged["day_of_year"] / 365.25)
    merged["sin_month"] = np.sin(2 * np.pi * merged["month"] / 12.0)
    merged["cos_month"] = np.cos(2 * np.pi * merged["month"] / 12.0)

    # Agronomic Monsoon Flag (June 15 to September 30)
    merged["is_monsoon"] = (
        ((merged["month"] == 6) & (merged["Date"].dt.day >= 15)) |
        (merged["month"].isin([7, 8])) |
        ((merged["month"] == 9) & (merged["Date"].dt.day <= 30))
    ).astype(int)

    # 5. Deterministic Primary Target Construction: modal_price_t+7
    # For each sample [Date t, District d, Commodity c]:
    # Search window: match_date >= t + 7 days  AND  match_date <= t + 10 days
    # Earliest observation in [t+7, t+10] is selected.
    # If none exists: target = NaN
    print("\nConstructing deterministic primary target: modal_price_t+7 (window: [t+7, t+10])...")

    target_pool = merged[["Date", "District", "Commodity", "modal_price"]].rename(
        columns={"Date": "target_match_date", "modal_price": "future_modal_price"}
    ).sort_values("target_match_date")

    merged["min_target_date"] = merged["Date"] + pd.Timedelta(days=7)

    # merge_asof forward finds earliest observation on or after Date + 7
    asof_matched = pd.merge_asof(
        merged.sort_values("min_target_date"),
        target_pool,
        left_on="min_target_date",
        right_on="target_match_date",
        by=["District", "Commodity"],
        direction="forward"
    )

    # Enforce strict dual condition:
    # 1. target_match_date >= Date + 7 (guaranteed by merge_asof on min_target_date)
    # 2. target_match_date <= Date + 10 (enforced via lead_days upper bound)
    asof_matched["target_lead_days"] = (asof_matched["target_match_date"] - asof_matched["Date"]).dt.days

    valid_target_mask = (
        (asof_matched["target_lead_days"] >= 7) &
        (asof_matched["target_lead_days"] <= 10) &
        asof_matched["future_modal_price"].notna()
    )

    asof_matched["target_modal_price_t7"] = np.where(
        valid_target_mask,
        asof_matched["future_modal_price"],
        np.nan
    )
    asof_matched["target_observed_date"] = np.where(
        valid_target_mask,
        asof_matched["target_match_date"].dt.strftime("%Y-%m-%d"),
        None
    )
    asof_matched["target_lead_days"] = np.where(
        valid_target_mask,
        asof_matched["target_lead_days"],
        np.nan
    )

    # Restore deterministic sorting
    final_df = asof_matched.sort_values(["District", "Commodity", "Date"]).reset_index(drop=True)

    # Drop intermediate helper columns
    drop_helpers = ["prev_date", "min_target_date", "target_match_date", "future_modal_price"]
    final_df = final_df.drop(columns=[c for c in drop_helpers if c in final_df.columns])

    # 6. Chronological Train / Validation / Test Splitting
    print("\nAssigning chronological splits (no random shuffling)...")
    # TRAIN:      2018-01-01 to 2022-12-31
    # VALIDATION: 2023-01-01 to 2023-12-31
    # TEST:       2024-01-01 to 2025-06-30
    conditions = [
        final_df["Date"] <= "2022-12-31",
        (final_df["Date"] >= "2023-01-01") & (final_df["Date"] <= "2023-12-31"),
        (final_df["Date"] >= "2024-01-01") & (final_df["Date"] <= "2025-06-30")
    ]
    choices = ["TRAIN", "VALIDATION", "TEST"]
    final_df["split"] = np.select(conditions, choices, default="UNKNOWN")

    split_counts_pre = final_df["split"].value_counts()
    print("Pre-purge split breakdown across all modeling rows:")
    for split_name in choices:
        cnt = split_counts_pre.get(split_name, 0)
        valid_tgt = final_df[final_df["split"] == split_name]["target_modal_price_t7"].notna().sum()
        print(f"  - {split_name:10s}: {cnt:,} total rows | {valid_tgt:,} with valid target ({valid_tgt/cnt*100:.2f}%)")

    # 7. Leakage-Safe Chronological Purge / Embargo
    # Target-Date Containment Rule: For every non-null target, target_observed_date must
    # fall strictly within the calendar boundaries of that split.
    # Boundary feature rows whose target extends across the boundary into a later split
    # period are purged to eliminate lookahead target contamination.
    print("\nAuditing and enforcing target-date containment across split boundaries...")
    target_obs = pd.to_datetime(final_df["target_observed_date"])

    is_cross_train = (final_df["split"] == "TRAIN") & (target_obs > "2022-12-31")
    is_cross_val = (final_df["split"] == "VALIDATION") & (target_obs > "2023-12-31")
    is_cross_test = (final_df["split"] == "TEST") & (target_obs > "2025-06-30")

    contaminated_mask = is_cross_train | is_cross_val | is_cross_test
    num_contaminated = int(contaminated_mask.sum())
    print(f"Cross-split contaminated rows identified: {num_contaminated:,}")
    print(f"  - TRAIN rows with target > 2022-12-31 (contaminates VAL): {is_cross_train.sum():,}")
    print(f"  - VAL rows with target > 2023-12-31 (contaminates TEST):  {is_cross_val.sum():,}")
    print(f"  - TEST rows with target > 2025-06-30:                     {is_cross_test.sum():,}")

    # Purge contaminated boundary rows
    purged_df = final_df[~contaminated_mask].copy().reset_index(drop=True)
    print(f"Rows after boundary purge: {len(purged_df):,} (Purged: {num_contaminated:,} rows)")

    split_counts_post = purged_df["split"].value_counts()
    print("Post-purge split breakdown:")
    for split_name in choices:
        cnt = split_counts_post.get(split_name, 0)
        valid_tgt = purged_df[purged_df["split"] == split_name]["target_modal_price_t7"].notna().sum()
        print(f"  - {split_name:10s}: {cnt:,} total rows | {valid_tgt:,} with valid target ({valid_tgt/cnt*100:.2f}%)")

    # 8. Automated Target & Leakage Assertions
    print("\nRunning automated data integrity & leakage assertions...")
    valid_targets = purged_df[purged_df["target_modal_price_t7"].notna()].copy()
    valid_targets["Date"] = pd.to_datetime(valid_targets["Date"])
    valid_targets["target_observed_date"] = pd.to_datetime(valid_targets["target_observed_date"])

    # Assertion 1: target lead strictly >= 7
    assert (valid_targets["target_lead_days"] >= 7).all(), "ASSERTION ERROR: Target lead < 7 days found!"

    # Assertion 2: target lead strictly <= 10
    assert (valid_targets["target_lead_days"] <= 10).all(), "ASSERTION ERROR: Target lead > 10 days found!"

    # Assertion 3: target date strictly after feature date
    assert (valid_targets["target_observed_date"] > valid_targets["Date"]).all(), "ASSERTION ERROR: Target date <= Feature date!"

    # Assertion 4: chronological order of splits
    train_max_date = purged_df[purged_df["split"] == "TRAIN"]["Date"].max()
    val_min_date = purged_df[purged_df["split"] == "VALIDATION"]["Date"].min()
    val_max_date = purged_df[purged_df["split"] == "VALIDATION"]["Date"].max()
    test_min_date = purged_df[purged_df["split"] == "TEST"]["Date"].min()

    assert train_max_date < val_min_date, f"TRAIN ({train_max_date}) overlaps with VAL ({val_min_date})!"
    assert val_max_date < test_min_date, f"VAL ({val_max_date}) overlaps with TEST ({test_min_date})!"

    # Assertion 5: Target Containment within Split (ZERO cross-split targets)
    train_cross_targets = (valid_targets["split"] == "TRAIN") & (valid_targets["target_observed_date"] > "2022-12-31")
    val_cross_targets = (valid_targets["split"] == "VALIDATION") & (
        (valid_targets["target_observed_date"] < "2023-01-01") | (valid_targets["target_observed_date"] > "2023-12-31")
    )
    test_cross_targets = (valid_targets["split"] == "TEST") & (
        (valid_targets["target_observed_date"] < "2024-01-01") | (valid_targets["target_observed_date"] > "2025-06-30")
    )
    assert train_cross_targets.sum() == 0, f"CRITICAL: {train_cross_targets.sum()} cross-split targets in TRAIN!"
    assert val_cross_targets.sum() == 0, f"CRITICAL: {val_cross_targets.sum()} cross-split targets in VAL!"
    assert test_cross_targets.sum() == 0, f"CRITICAL: {test_cross_targets.sum()} cross-split targets in TEST!"

    print(">>> All target construction, boundary purge, and split containment assertions PASSED!")

    # 9. Save Master Feature Dataset
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    purged_df.to_csv(output_path, index=False)
    print(f"\n[OK] Master feature dataset saved to: {output_path}")
    print(f"Total rows: {len(purged_df):,}, Total columns: {len(purged_df.columns)}")
    return purged_df


if __name__ == "__main__":
    build_master_dataset()

