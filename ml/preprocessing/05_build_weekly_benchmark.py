"""
SIH26033 - Agricultural ML Pipeline
Script 05: Build Weekly Benchmark Dataset
========================================
Constructs the secondary weekly forecasting benchmark at grain:
  [ISO_Year, ISO_Week, District, Commodity]

Target: next ISO week's median wholesale modal price, joined via explicit
ISO calendar date arithmetic. Retains separate secondary role (does not replace daily model).

Output: data/processed/weekly_benchmark_dataset.csv
"""

import os
import sys
import datetime
import pandas as pd
import numpy as np

# Ensure root directory is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))


def get_next_iso_week(year: int, week: int):
    """
    Computes (next_ISO_Year, next_ISO_Week) deterministically via Monday date arithmetic.
    Correctly handles year-end transitions (e.g. week 52/53 -> week 1 of next year).
    """
    monday = datetime.date.fromisocalendar(int(year), int(week), 1)
    next_monday = monday + pd.Timedelta(days=7)
    next_iso = next_monday.isocalendar()
    return int(next_iso.year), int(next_iso.week)


def build_weekly_benchmark(
    agmarknet_path: str = "data/processed/agmarknet_daily_modeling.csv",
    rainfall_path: str = "data/processed/rainfall_daily_features.csv",
    output_path: str = "data/processed/weekly_benchmark_dataset.csv",
) -> pd.DataFrame:
    print(f"Loading datasets for weekly benchmark:\n  - {agmarknet_path}\n  - {rainfall_path}")
    df_market = pd.read_csv(agmarknet_path)
    df_market["Date"] = pd.to_datetime(df_market["Date"])
    df_market["ISO_Year"] = df_market["Date"].dt.isocalendar().year.astype(int)
    df_market["ISO_Week"] = df_market["Date"].dt.isocalendar().week.astype(int)

    df_rain = pd.read_csv(rainfall_path)
    df_rain["Date"] = pd.to_datetime(df_rain["Date"])
    df_rain["ISO_Year"] = df_rain["Date"].dt.isocalendar().year.astype(int)
    df_rain["ISO_Week"] = df_rain["Date"].dt.isocalendar().week.astype(int)

    # 1. Aggregate Weekly Market Data
    print("Aggregating daily mandi transactions into weekly market summaries...")
    weekly_market = df_market.groupby(["ISO_Year", "ISO_Week", "District", "Commodity"]).agg(
        weekly_modal_price=("modal_price", "median"),
        weekly_min_price=("min_price", "min"),
        weekly_max_price=("max_price", "max"),
        active_reporting_mandis=("reporting_mandis", "max"),
        active_trading_days=("Date", "nunique"),
        total_price_observations=("observation_count", "sum")
    ).reset_index()

    weekly_market["weekly_price_range"] = (
        weekly_market["weekly_max_price"] - weekly_market["weekly_min_price"]
    )
    print(f"Total weekly market records: {len(weekly_market):,}")

    # 2. Aggregate Weekly District Weather
    print("Aggregating daily rainfall into weekly district totals...")
    weekly_weather = df_rain.groupby(["ISO_Year", "ISO_Week", "District"]).agg(
        weekly_rainfall_consensus_mm=("rainfall_consensus_mm", "sum"),
        weekly_rainfall_imd_mm=("rainfall_imd_mm", "sum"),
        weekly_rainfall_vic_mm=("rainfall_vic_mm", "sum"),
        weekly_rainy_days=("rainfall_consensus_mm", lambda s: (s > 0.1).sum())
    ).reset_index()

    # 3. Join Weekly Market with Weekly Weather
    weekly_df = pd.merge(
        weekly_market,
        weekly_weather,
        on=["ISO_Year", "ISO_Week", "District"],
        how="left"
    )

    # 4. Construct Deterministic Next-Week Target via Explicit Key Join
    print("Constructing next-week target using explicit ISO week arithmetic...")
    unique_weeks = weekly_df[["ISO_Year", "ISO_Week"]].drop_duplicates().copy()
    next_week_map = {}
    for _, row in unique_weeks.iterrows():
        y, w = row["ISO_Year"], row["ISO_Week"]
        next_week_map[(y, w)] = get_next_iso_week(y, w)

    weekly_df["next_ISO_Year"] = weekly_df.apply(
        lambda r: next_week_map[(r["ISO_Year"], r["ISO_Week"])][0], axis=1
    )
    weekly_df["next_ISO_Week"] = weekly_df.apply(
        lambda r: next_week_map[(r["ISO_Year"], r["ISO_Week"])][1], axis=1
    )

    target_pool = weekly_df[
        ["ISO_Year", "ISO_Week", "District", "Commodity", "weekly_modal_price"]
    ].rename(
        columns={
            "ISO_Year": "target_join_year",
            "ISO_Week": "target_join_week",
            "weekly_modal_price": "target_next_week_modal_price"
        }
    )

    weekly_joined = pd.merge(
        weekly_df,
        target_pool,
        left_on=["next_ISO_Year", "next_ISO_Week", "District", "Commodity"],
        right_on=["target_join_year", "target_join_week", "District", "Commodity"],
        how="left"
    )

    # 5. Retrospective Weekly Price Lags
    # Sort deterministically
    weekly_joined = weekly_joined.sort_values(
        ["District", "Commodity", "ISO_Year", "ISO_Week"]
    ).reset_index(drop=True)

    past_weekly_price = weekly_joined.groupby(["District", "Commodity"])["weekly_modal_price"]
    weekly_joined["weekly_modal_lag_1w"] = past_weekly_price.shift(1)
    weekly_joined["weekly_modal_lag_2w"] = past_weekly_price.shift(2)
    weekly_joined["weekly_modal_lag_4w"] = past_weekly_price.shift(4)

    # 6. Chronological Train / Validation / Test Splitting
    conditions = [
        weekly_joined["ISO_Year"] <= 2022,
        weekly_joined["ISO_Year"] == 2023,
        weekly_joined["ISO_Year"] >= 2024
    ]
    choices = ["TRAIN", "VALIDATION", "TEST"]
    weekly_joined["split"] = np.select(conditions, choices, default="UNKNOWN")

    # Clean intermediate columns
    drop_cols = ["target_join_year", "target_join_week"]
    weekly_joined = weekly_joined.drop(columns=[c for c in drop_cols if c in weekly_joined.columns])

    # 7. Verification and Assertions
    valid_weekly = weekly_joined["target_next_week_modal_price"].notna().sum()
    total_weekly = len(weekly_joined)
    print(f"\nWeekly benchmark target coverage: {valid_weekly:,} / {total_weekly:,} ({valid_weekly/total_weekly*100:.2f}%)")

    # Verify no duplicate weekly keys
    assert not weekly_joined.duplicated(subset=["ISO_Year", "ISO_Week", "District", "Commodity"]).any(), "Duplicate weekly keys found!"

    # Save output
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    weekly_joined.to_csv(output_path, index=False)
    print(f"[OK] Weekly benchmark dataset saved to: {output_path}")
    print(f"Total rows: {len(weekly_joined):,}, Total columns: {len(weekly_joined.columns)}")
    return weekly_joined


if __name__ == "__main__":
    build_weekly_benchmark()

