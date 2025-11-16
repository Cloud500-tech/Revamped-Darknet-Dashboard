from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

from leak_detector import LeakDetector  # uses your existing detector logic


app = Flask(__name__)
CORS(app)  # allow React frontend to call the API


# ------------------------------------------------------------
# Load data once and run the detector
# ------------------------------------------------------------

detector = LeakDetector()

# Prefer JSON if available, otherwise fall back to CSV.
# This uses your sample_data files directly.
try:
    detector.load_json("sample_data.json")
except FileNotFoundError:
    detector.load_csv("sample_data.csv")

# Run full scan using the built-in method from leak_detector.py
scan_results = detector.scan_all()


def build_dataframe() -> pd.DataFrame:
    """
    Convert scan_results (from LeakDetector) into a DataFrame
    with explicit columns for the dashboard.
    """
    rows = []
    for result in scan_results:
        entry = result["entry"]

        rows.append(
            {
                "id": entry.get("id"),
                "source": entry.get("source", "unknown"),
                "description": entry.get("description", ""),
                "content": entry.get("content", ""),
                "leaked_date": entry.get("leaked_date"),
                "severity": entry.get("severity", "unknown"),  # from the dataset
                "risk_score": int(result.get("risk_score", 0)),  # from detector
                "risk_level": result.get("risk_level", "low"),  # from detector
                "patterns": result.get("detected_patterns", []),
            }
        )

    if not rows:
        # If for some reason nothing was detected, return empty DF with expected columns.
        return pd.DataFrame(
            columns=[
                "id",
                "source",
                "description",
                "content",
                "leaked_date",
                "severity",
                "risk_score",
                "risk_level",
                "patterns",
            ]
        )

    return pd.DataFrame(rows)


df = build_dataframe()


# ------------------------------------------------------------
# API endpoints
# ------------------------------------------------------------

@app.get("/api/summary")
def summary():
    """
    High-level KPIs for the top cards + distributions for charts.
    """
    if df.empty:
        return jsonify(
            {
                "total_leaks": 0,
                "high_risk": 0,
                "avg_risk_score": 0,
                "active_sources": 0,
                "risk_level_distribution": {},
                "severity_distribution": {},
            }
        )

    total = len(df)
    high_risk = int((df["risk_level"] == "high").sum())
    avg_score = float(df["risk_score"].mean())
    active_sources = int(df["source"].nunique())

    risk_dist = df["risk_level"].value_counts().to_dict()
    severity_dist = df["severity"].value_counts().to_dict()

    return jsonify(
        {
            "total_leaks": total,
            "high_risk": high_risk,
            "avg_risk_score": round(avg_score, 1),
            "active_sources": active_sources,
            "risk_level_distribution": risk_dist,
            "severity_distribution": severity_dist,
        }
    )


@app.get("/api/leaks")
def leaks():
    """
    Detailed leak entries for the Live Threat Feed / tables.
    """
    if df.empty:
        return jsonify([])

    return jsonify(df.to_dict(orient="records"))


@app.get("/api/risk-distribution")
def risk_distribution():
    if df.empty:
        return jsonify({})
    return jsonify(df["risk_level"].value_counts().to_dict())


@app.get("/api/domains")
def domains():
    """
    Aggregate stats by source (domain/platform).
    """
    if df.empty:
        return jsonify([])

    domain_stats = (
        df.groupby("source")
        .agg(
            {
                "risk_score": "mean",
                "id": "count",
                "leaked_date": "max",
            }
        )
        .rename(
            columns={
                "risk_score": "avg_risk_score",
                "id": "total_leaks",
                "leaked_date": "last_seen",
            }
        )
        .reset_index()
    )

    return jsonify(domain_stats.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
