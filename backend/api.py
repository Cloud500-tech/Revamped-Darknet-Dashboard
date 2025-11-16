# backend/api.py
from flask import Flask, jsonify, request
from leak_detector import LeakDetector  # adjusted import
import pandas as pd

app = Flask(__name__)

detector = LeakDetector()
detector.load_csv('sample_data.csv')
detector.scan_all()

def build_dataframe():
    """Adapted from process_scan_results + classify_leak_type in dashboard.py."""
    data = []
    for result in detector.scan_results:
        entry = result["entry"]
        # here you can pull real fields from entry instead of randoms
        data.append({
            "id": entry.get("id", "N/A"),
            "source": entry.get("source", "Unknown"),
            "description": entry.get("description", "N/A"),
            "content": entry.get("content", "N/A"),
            "leaked_date": entry.get("leaked_date", "N/A"),
            "severity": entry.get("severity", "unknown"),
            "risk_score": result["risk_score"],
            "risk_level": result["risk_level"],
            "detected_patterns": result["detected_patterns"],
            # add leak_type logic here
        })
    return pd.DataFrame(data)

df = build_dataframe()

@app.get("/api/summary")
def get_summary():
    """Totals + distributions for the top cards and donut charts."""
    total = len(df)
    high = int((df["risk_level"] == "high").sum())
    avg = float(df["risk_score"].mean() if total else 0)
    sources = int(df["source"].nunique())

    leak_type_counts = df["leak_type"].value_counts().to_dict()
    risk_counts = df["risk_level"].value_counts().to_dict()
    severity_counts = df["severity"].value_counts().to_dict()

    return jsonify({
        "total_leaks": total,
        "high_risk": high,
        "avg_risk_score": round(avg, 1),
        "active_sources": sources,
        "leak_type_distribution": leak_type_counts,
        "risk_level_distribution": risk_counts,
        "severity_distribution": severity_counts,
    })

@app.get("/api/leaks")
def get_leaks():
    """Table data for Live Threat Feed."""
    rows = df.to_dict(orient="records")
    return jsonify(rows)

@app.get("/api/domains")
def get_domains():
    """Domain stats similar to your domain table in Dash."""
    # adapt your domain aggregation logic from dashboard.py
    # groupby, average risk, last_seen, etc.
    ...

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
