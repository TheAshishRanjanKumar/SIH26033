"""
SIH26033 - Agricultural Wholesale Modal Price Forecasting
Module: ml/predict.py
=========================================================
Reusable prediction interface for 7-10 day-ahead wholesale modal price
forecasting (₹/quintal) at [District, Commodity] grain in Bihar.

Used by backend API services and standalone scripts.
"""

import os
import sys
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, Union, List

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Default model artifact paths
DEFAULT_MODEL_PATH = "ml/models/price_forecasting_model.joblib"
DEFAULT_PREPROCESSOR_PATH = "ml/models/preprocessor.joblib"

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

ALL_FEATURES = CATEGORICAL_FEATURES + NUMERIC_FEATURES


class PriceForecaster:
    """
    Inference interface for the trained 7–10 day-ahead wholesale modal price
    forecasting model.
    """

    def __init__(
        self,
        model_path: str = DEFAULT_MODEL_PATH,
        preprocessor_path: str = DEFAULT_PREPROCESSOR_PATH
    ):
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model artifact not found at '{model_path}'. Please run ml/train_price_model.py first.")
        if not os.path.exists(preprocessor_path):
            raise FileNotFoundError(f"Preprocessor artifact not found at '{preprocessor_path}'. Please run ml/train_price_model.py first.")

        self.model = joblib.load(model_path)
        self.preprocessor = joblib.load(preprocessor_path)

    def predict(self, data: Union[Dict[str, Any], pd.DataFrame, List[Dict[str, Any]]]) -> Union[float, List[float]]:
        """
        Predict 7–10 day-ahead wholesale modal market price in ₹/quintal.

        Parameters:
            data: Single dict of features, list of dicts, or pandas DataFrame.

        Returns:
            Single float (if single sample dict) or list of floats (if batch).
        """
        is_single = isinstance(data, dict)

        if is_single:
            df = pd.DataFrame([data])
        elif isinstance(data, list):
            df = pd.DataFrame(data)
        elif isinstance(data, pd.DataFrame):
            df = data.copy()
        else:
            raise ValueError("Input data must be a dict, list of dicts, or pandas DataFrame.")

        # Ensure all required features exist in df; fill missing with NaN (handled by preprocessor's SimpleImputer)
        for col in ALL_FEATURES:
            if col not in df.columns:
                df[col] = np.nan

        # Order columns identically to training protocol
        df_input = df[ALL_FEATURES]

        # Preprocess and predict
        X_proc = self.preprocessor.transform(df_input)
        preds = self.model.predict(X_proc)

        # Non-negative wholesale price constraint
        preds = np.maximum(preds, 0.0)

        if is_single:
            return round(float(preds[0]), 2)
        return [round(float(p), 2) for p in preds]


# Convenience singleton function
_forecaster_instance = None


def get_price_forecast(features: Dict[str, Any]) -> float:
    """
    Convenience function to get a forecast for a single observation dict.
    Caches the PriceForecaster instance in memory.
    """
    global _forecaster_instance
    if _forecaster_instance is None:
        _forecaster_instance = PriceForecaster()
    return _forecaster_instance.predict(features)


if __name__ == "__main__":
    print("Testing PriceForecaster inference interface...")
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

    try:
        forecaster = PriceForecaster()
        pred = forecaster.predict(sample_input)
        print("Prediction successful!")
        print(f"Sample: Patna | Wheat | Current Modal Price: INR {sample_input['modal_price']}/quintal")
        print(f"Forecasted 7-10d Wholesale Modal Price: INR {pred}/quintal")
    except FileNotFoundError as e:
        print(f"Inference module ready. Note: {e}")

