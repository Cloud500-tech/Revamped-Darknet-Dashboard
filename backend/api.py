from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from leak_detector import LeakDetector

app = Flask(__name__)
CORS(app)  # allow frontend to call the API

# ------------------------------------------------------------
# Load & scan data once at startup
# ------------------------------------------------------------
detector = LeakDetector()

# You can switch between CSV or JSON here
try:
    df_raw = pd.read_json("sample_data.json")
except:
    df_raw = pd.read_csv("sample_data.csv")

# Scan all row contents
for _, row in df_raw.iterrows():
    entry = {
        "id": row.get("id", None),
        "source": row.get("source", "unknown"),
        "description": row.get("description", ""),
        "content": row.get("content", ""),
        "leaked_date": row.get("leaked_date", None),
        "severity": row.get("severity", "low")
    }
    detector.scan_entry(entry)

scan_results = detector.get_results()

# ------------------------------------------------------------
# Transform raw scan data → DataFrame for stats
# ------------------------------------------------------------
def build_dataframe():
    rows = []
    for r in scan_results:
        entry = r["entry"]
        rows.append({
            "id": entry.get("id", None),
            "source": entry.get("source", "unknown"),
            "description": entry.get("description", ""),
            "content": entry.get("content", ""),
            "leaked_date": entry.get("leaked_date", None),
            "severity": entry.get("severity", "unknown"),
            "risk_score": r.get("risk_score", 0),
            "risk_level": r.get("risk_level", "low"),
            "patterns": r.get("detected_patterns", []),
        })
    return pd.DataFrame(rows)

df = build_dataframe()

# ------------------------------------------------------------
# /api/summary
# ------------------------------------------------------------
@app.get("/api/summary")
def summary():
    total = len(df)
    high_risk = int((df["risk_level"] == "high").sum())
    avg_score = float(df["risk_score"].mean()) if total else 0
    active_sources = int(df["source"].nunique())

    leak_type_dist = df["severity"].value_counts().to_dict()
    risk_dist = df["risk_level"].value_counts().to_dict()

    return jsonify({
        "total_leaks": total,
        "high_risk": high_risk,
        "avg_risk_score": round(avg_score, 1),
        "active_sources": active_sources,
        "risk_level_distribution": risk_dist,
        "severity_distribution": leak_type_dist,
    })

# ------------------------------------------------------------
# /api/leaks
# ------------------------------------------------------------
@app.get("/api/leaks")
def leaks():
    return jsonify(df.to_dict(orient="records"))

# ------------------------------------------------------------
# /api/risk-distribution
# ------------------------------------------------------------
@app.get("/api/risk-distribution")
def risk_distribution():
    counts = df["risk_level"].value_counts().to_dict()
    return jsonify(counts)

# ------------------------------------------------------------
# /api/domains
# ------------------------------------------------------------
@app.get("/api/domains")
def domains():
    domain_stats = (
        df.groupby("source")
        .agg({
            "risk_score": "mean",
            "id": "count",
            "leaked_date": "max"
        })
        .rename(columns={
            "risk_score": "avg_risk_score",
            "id": "total_leaks",
            "leaked_date": "last_seen"
        })
        .reset_index()
    )

    return jsonify(domain_stats.to_dict(orient="records"))

# ------------------------------------------------------------
# Run the server
# ------------------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

