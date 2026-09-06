"""
SIH26033 - Agricultural ML Pipeline
Script 02: Clean and Engineer Rainfall Features
===============================================
Ingests raw rainfall data (CSV), removes exact duplicate rows, zero-clips negative
precision artifacts, preserves IMD and NRSC agency estimates separately, computes
consensus rainfall, and generates retrospective rolling weather indicators.

Output: data/processed/rainfall_daily_features.csv
"""

import os
import sys
import pandas as pd
import numpy as np

# Ensure root directory is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from ml.preprocessing.district_normalization import normalize_district, BIHAR_38_DISTRICTS


def process_rainfall(
    input_path: str = "data/raw/rainfall/6c05cd1b-ed59-40c2-bc31-e314f39c6971 (1).csv",
    output_path: str = "data/processed/rainfall_daily_features.csv",
    start_date: str = "2018-01-01",
    end_date: str = "2025-06-30",
) -> pd.DataFrame:
    print(f"Reading raw rainfall data from: {input_path}")
    raw_df = pd.read_csv(input_path)
    initial_rows = len(raw_df)
    print(f"Initial raw rainfall rows: {initial_rows:,}")

    # 1. Deduplicate exact identical rows (NRSC VIC 2025 batch export duplicates)
    df = raw_df.drop_duplicates().copy()
    dedup_rows = len(df)
    print(f"Rows after dropping exact duplicates: {dedup_rows:,} (Removed: {initial_rows - dedup_rows:,})")

    # 2. Date parsing and filtering to synchronous window
    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    df = df.dropna(subset=["Date"])
    df = df[(df["Date"] >= start_date) & (df["Date"] <= end_date)].copy()
    print(f"Rows in synchronous window ({start_date} to {end_date}): {len(df):,}")

    # 3. District normalization
    df["District"] = df["District"].apply(normalize_district)
    unmapped_count = df["District"].isnull().sum()
    assert unmapped_count == 0, f"Found {unmapped_count} unmapped rainfall districts!"
    print(f"Districts normalized successfully to Bihar canonical names (Unique: {df['District'].nunique()})")

    # 4. Zero-clip negative precision artifacts in NRSC VIC model
    neg_count = (df["Avg_rainfall"] < 0).sum()
    if neg_count > 0:
        print(f"Found {neg_count} negative rainfall values (min: {df['Avg_rainfall'].min():.6f}). Clipping to 0.0.")
        df["Avg_rainfall"] = df["Avg_rainfall"].clip(lower=0.0)

    # 5. Standardize Agency Names
    # Agencies: 'IMD GRID MODEL', 'NRSC VIC MODEL'
    df["Agency_Clean"] = df["Agency_name"].str.strip().str.upper()
    print(f"Agency breakdown:\n{df['Agency_Clean'].value_counts()}")

    # 6. Pivot by agency to preserve both signals: rainfall_imd_mm and rainfall_vic_mm
    # Grain: [Date, District]
    pivoted = df.pivot_table(
        index=["Date", "District"],
        columns="Agency_Clean",
        values="Avg_rainfall",
        aggfunc="mean"  # In case of any remaining multiple entries for that agency
    ).reset_index()

    # Rename columns cleanly
    col_mapping = {
        "IMD GRID MODEL": "rainfall_imd_mm",
        "NRSC VIC MODEL": "rainfall_vic_mm"
    }
    for old_col, new_col in col_mapping.items():
        if old_col in pivoted.columns:
            pivoted = pivoted.rename(columns={old_col: new_col})
        else:
            pivoted[new_col] = np.nan

    # 7. Consensus rainfall: average of IMD and NRSC (or single available agency value)
    # Strictly NEVER sum IMD + NRSC!
    imd = pivoted["rainfall_imd_mm"]
    vic = pivoted["rainfall_vic_mm"]

    # When both available: (IMD + VIC) / 2
    # When only IMD: IMD
    # When only VIC: VIC
    pivoted["rainfall_consensus_mm"] = np.where(
        imd.notna() & vic.notna(),
        (imd + vic) / 2.0,
        np.where(imd.notna(), imd, vic)
    )

    print(f"\nUnique [Date, District] weather observations: {len(pivoted):,}")
    print(f"Rainfall consensus stats:\n{pivoted['rainfall_consensus_mm'].describe()}")

    # 8. Sort deterministically before rolling calculations
    pivoted = pivoted.sort_values(["District", "Date"]).reset_index(drop=True)

    # 9. Retrospective Rolling Rainfall Features
    # Group by District, sorted by Date
    print("\nComputing retrospective rolling rainfall indicators (strictly <= t)...")

    # Complete calendar grid for each district to ensure rolling days correspond to real calendar days
    districts = pivoted["District"].unique()
    full_date_range = pd.date_range(start=start_date, end=end_date, freq="D")
    grid = pd.MultiIndex.from_product([districts, full_date_range], names=["District", "Date"]).to_frame().reset_index(drop=True)
    
    merged_grid = pd.merge(grid, pivoted, on=["District", "Date"], how="left")
    # For missing days in district grid (if any), fill rainfall with 0.0 for rolling sums
    merged_grid["rainfall_consensus_mm_filled"] = merged_grid["rainfall_consensus_mm"].fillna(0.0)
    merged_grid = merged_grid.sort_values(["District", "Date"]).reset_index(drop=True)

    # Retrospective rolling windows (strictly closed='left' or trailing including t, since rainfall at day t is observed weather)
    # Day t weather is contemporaneous observed exogenous weather.
    grouped = merged_grid.groupby("District")["rainfall_consensus_mm_filled"]
    
    # Trailing cumulative precipitation
    merged_grid["rainfall_cum_7d"] = grouped.rolling(7, min_periods=1).sum().reset_index(drop=True)
    merged_grid["rainfall_cum_14d"] = grouped.rolling(14, min_periods=1).sum().reset_index(drop=True)
    merged_grid["rainfall_cum_30d"] = grouped.rolling(30, min_periods=1).sum().reset_index(drop=True)

    # Dry spells: count of zero-rain days in preceding 14 days
    is_zero_rain = (merged_grid["rainfall_consensus_mm_filled"] <= 0.05).astype(int)
    merged_grid["dry_spell_days_14d"] = (
        is_zero_rain.groupby(merged_grid["District"]).rolling(14, min_periods=1).sum().reset_index(drop=True)
    )

    # Excess rain shock: heavy rain (>50mm in trailing 3 days)
    rain_3d = grouped.rolling(3, min_periods=1).sum().reset_index(drop=True)
    merged_grid["excess_rain_shock_7d"] = (rain_3d >= 50.0).astype(int)

    # Drop temporary filled column
    merged_grid = merged_grid.drop(columns=["rainfall_consensus_mm_filled"])

    # Merge back onto original pivoted dates (or keep complete grid)
    final_weather = merged_grid.dropna(subset=["rainfall_consensus_mm"]).copy()
    final_weather = final_weather.sort_values(["Date", "District"]).reset_index(drop=True)

    # 10. Assertions and Verification
    assert (final_weather["rainfall_consensus_mm"] >= 0.0).all(), "Negative rainfall found!"
    assert (final_weather["rainfall_cum_7d"] >= 0.0).all(), "Negative rolling cumulative rainfall found!"
    assert not final_weather.duplicated(subset=["Date", "District"]).any(), "Duplicate [Date, District] keys in weather output!"
    
    # Save output
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    final_weather.to_csv(output_path, index=False)
    print(f"\n[OK] Cleaned rainfall features saved to: {output_path}")
    print(f"Total rows: {len(final_weather):,}, Columns: {list(final_weather.columns)}")
    return final_weather


if __name__ == "__main__":
    process_rainfall()

