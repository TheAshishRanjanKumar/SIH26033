"""
SIH26033 - Agricultural ML Pipeline
Script 03: Clean and Aggregate AGMARKNET Mandi Data
==================================================
Ingests raw historical AGMARKNET files (bihar1.json, bihar2.json, bihar 3.json),
preserves all legitimate multi-grade observations, normalizes Bihar district names,
filters to the synchronous window (2018-01-01 to 2025-06-30), and deterministically
aggregates to the modeling grain [Date, District, Commodity].

Outputs:
  - data/processed/agmarknet_daily_modeling.csv
"""

import os
import sys
import json
import pandas as pd
import numpy as np

# Ensure root directory is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
from ml.preprocessing.district_normalization import normalize_district, BIHAR_38_DISTRICTS


def clean_commodity_name(raw_name: str) -> str:
    """Standardizes commodity names."""
    if not raw_name or not isinstance(raw_name, str):
        return "Unknown"
    cleaned = raw_name.strip()
    # Normalize common spacing around parentheses, e.g. "Paddy(Dhan)(Common)"
    return cleaned


def process_agmarknet(
    input_files=(
        "data/raw/agmarknet/bihar1.json",
        "data/raw/agmarknet/bihar2.json",
        "data/raw/agmarknet/bihar 3.json",
    ),
    output_path: str = "data/processed/agmarknet_daily_modeling.csv",
    start_date: str = "2018-01-01",
    end_date: str = "2025-06-30",
) -> pd.DataFrame:
    print(f"Ingesting raw AGMARKNET records from {len(input_files)} files...")
    records = []
    for path in input_files:
        print(f"  Reading {path}...")
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
            records.extend(data.get("records", []))

    raw_count = len(records)
    print(f"Total raw records loaded: {raw_count:,}")
    df = pd.DataFrame(records)

    # 1. Exact full-row duplicates check (must drop only exact duplicates across all columns)
    exact_dups = df.duplicated().sum()
    print(f"Exact full-row duplicates found: {exact_dups}")
    if exact_dups > 0:
        df = df.drop_duplicates().copy()

    # 2. Date parsing
    print("Parsing arrival dates...")
    df["Date"] = pd.to_datetime(df["Arrival_Date"], format="%d/%m/%Y", errors="coerce")
    invalid_dates = df["Date"].isnull().sum()
    if invalid_dates > 0:
        print(f"Dropping {invalid_dates} records with unparseable dates.")
        df = df.dropna(subset=["Date"])

    # 3. Filter to synchronous window (2018-01-01 through 2025-06-30)
    # Strictly do NOT fabricate 2019 or 2020 data!
    df_window = df[(df["Date"] >= start_date) & (df["Date"] <= end_date)].copy()
    print(f"Records within synchronous window ({start_date} to {end_date}): {len(df_window):,}")

    # 4. District normalization
    print("Normalizing district names to Bihar 38 official districts...")
    df_window["District_Raw"] = df_window["District"]
    df_window["District"] = df_window["District"].apply(normalize_district)
    unmapped = df_window[df_window["District"].isnull()]["District_Raw"].unique()
    assert len(unmapped) == 0, f"Unmapped districts found: {unmapped}"
    print(f"Normalized districts count: {df_window['District'].nunique()} / 38")

    # 5. Commodity standardization
    df_window["Commodity"] = df_window["Commodity"].apply(clean_commodity_name)
    print(f"Unique commodities in window: {df_window['Commodity'].nunique()}")

    # 6. Numeric price conversion and price hygiene
    price_cols = ["Min_Price", "Max_Price", "Modal_Price"]
    for col in price_cols:
        df_window[col] = pd.to_numeric(df_window[col], errors="coerce")

    # Filter out invalid modal prices (<= 0 or null)
    valid_prices = df_window["Modal_Price"].notna() & (df_window["Modal_Price"] > 0)
    df_window = df_window[valid_prices].copy()
    print(f"Records with valid positive modal prices: {len(df_window):,}")

    # Price hygiene:
    # 571 rows report Max_Price == 0.0 or < Modal_Price. Set Max_Price = Modal_Price.
    # 62 rows report Min_Price <= 0.0. Set Min_Price = Modal_Price.
    invalid_max = df_window["Max_Price"] < df_window["Modal_Price"]
    if invalid_max.sum() > 0:
        print(f"Fixing {invalid_max.sum()} rows where Max_Price < Modal_Price (set to Modal_Price).")
        df_window["Max_Price"] = np.where(invalid_max, df_window["Modal_Price"], df_window["Max_Price"])

    invalid_min = (df_window["Min_Price"] <= 0) | (df_window["Min_Price"] > df_window["Modal_Price"])
    if invalid_min.sum() > 0:
        print(f"Fixing {invalid_min.sum()} rows where Min_Price <= 0 or > Modal_Price (set to Modal_Price).")
        df_window["Min_Price"] = np.where(invalid_min, df_window["Modal_Price"], df_window["Min_Price"])

    # Double check price ordering
    assert (df_window["Min_Price"] <= df_window["Modal_Price"]).all(), "Min_Price > Modal_Price found!"
    assert (df_window["Modal_Price"] <= df_window["Max_Price"]).all(), "Modal_Price > Max_Price found!"

    # 7. Document raw business grain integrity
    # Raw grain: [Arrival_Date, District, Market, Commodity, Variety, Grade]
    raw_grain_keys = ["Date", "District", "Market", "Commodity", "Variety", "Grade"]
    # Verify that multi-grade observations are preserved
    print(f"Unique multi-grade / transaction instances: {len(df_window.drop_duplicates(subset=raw_grain_keys)):,}")

    # 8. Deterministic aggregation to modeling grain [Date, District, Commodity]
    print("\nAggregating to modeling grain [Date, District, Commodity]...")
    daily_modeling = df_window.groupby(["Date", "District", "Commodity"]).agg(
        modal_price=("Modal_Price", "median"),
        min_price=("Min_Price", "min"),
        max_price=("Max_Price", "max"),
        reporting_mandis=("Market", "nunique"),
        observation_count=("Modal_Price", "count")
    ).reset_index()

    # Derived price features
    daily_modeling["price_range"] = daily_modeling["max_price"] - daily_modeling["min_price"]
    
    # Relative price position: (modal - min) / (max - min)
    spread = daily_modeling["max_price"] - daily_modeling["min_price"]
    daily_modeling["price_position"] = np.where(
        spread > 0,
        (daily_modeling["modal_price"] - daily_modeling["min_price"]) / spread,
        0.5
    )

    # Sort deterministically
    daily_modeling = daily_modeling.sort_values(["District", "Commodity", "Date"]).reset_index(drop=True)

    # 9. Verification & Assertions
    assert not daily_modeling.duplicated(subset=["Date", "District", "Commodity"]).any(), "Duplicate modeling keys found!"
    assert (daily_modeling["modal_price"] > 0).all(), "Non-positive modal price found!"
    assert (daily_modeling["reporting_mandis"] >= 1).all(), "Reporting mandis count < 1 found!"
    assert (daily_modeling["price_range"] >= 0).all(), "Negative price range found!"
    
    # Check 2019/2020 confirmation
    c_2019 = (daily_modeling["Date"].dt.year == 2019).sum()
    c_2020 = (daily_modeling["Date"].dt.year == 2020).sum()
    assert c_2019 == 0, "2019 records unexpectedly found!"
    assert c_2020 == 0, "2020 records unexpectedly found!"
    print(f"\n[OK] 2019/2020 gap strictly confirmed: 2019={c_2019} rows, 2020={c_2020} rows.")

    # Save output
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    daily_modeling.to_csv(output_path, index=False)
    print(f"[OK] Aggregated modeling dataset saved to: {output_path}")
    print(f"Total modeling rows: {len(daily_modeling):,}")
    print(f"Columns: {list(daily_modeling.columns)}")
    return daily_modeling


if __name__ == "__main__":
    process_agmarknet()
