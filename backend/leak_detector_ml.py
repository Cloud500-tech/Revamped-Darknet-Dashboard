import csv
import json
from typing import List, Dict, Any, Optional
from datetime import datetime

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline


class LeakDetectorML:
    def __init__(self, model_path: str = "../models/leak_model.pkl"):
        self.leaks: List[Dict[str, Any]] = []
        self.scan_results: List[Dict[str, Any]] = []
        self.model_path = model_path
        self.model: Optional[Pipeline] = None

        try:
            self.model = joblib.load(self.model_path)
            print(f"[INFO] Loaded trained model from {self.model_path}")
        except Exception:
            print("[INFO] No trained model found yet. Train the model first.")

    # ------------------- LOADING -------------------

    def load_csv(self, filepath: str) -> List[Dict[str, Any]]:
        data: List[Dict[str, Any]] = []
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                data.append(row)
        self.leaks = data
        return data

    def load_json(self, filepath: str) -> List[Dict[str, Any]]:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.leaks = data if isinstance(data, list) else [data]
        return self.leaks

    # ------------------- HELPERS -------------------

    @staticmethod
    def _entry_to_text(entry: Dict[str, Any], label_field: str = "label") -> str:
        parts = []
        for k, v in entry.items():
            if k == label_field:
                continue
            parts.append(str(v).lower())
        return " ".join(parts)

    # ------------------- TRAINING -------------------

    def train_model_from_csv(self, filepath: str, label_field: str = "label") -> None:
        print(f"[INFO] Loading training data from {filepath} ...")
        training_data = self.load_csv(filepath)

        texts: List[str] = []
        labels: List[int] = []

        for row in training_data:
            if label_field not in row:
                raise ValueError(f"Missing label field '{label_field}' in row: {row}")
            labels.append(int(row[label_field]))
            texts.append(self._entry_to_text(row, label_field=label_field))

        pipeline = Pipeline(
            steps=[
                ("tfidf", TfidfVectorizer(
                    max_features=5000,
                    ngram_range=(1, 2),
                    stop_words="english"
                )),
                ("clf", LogisticRegression(max_iter=1000)),
            ]
        )

        print("[INFO] Training ML model ...")
        pipeline.fit(texts, labels)
        print("[INFO] Training completed.")

        self.model = pipeline
        joblib.dump(self.model, self.model_path)
        print(f"[INFO] Model saved to {self.model_path}")

    # ------------------- INFERENCE -------------------

    def scan_entry(self, entry: Dict[str, Any]) -> Dict[str, Any]:
        if self.model is None:
            raise ValueError("No trained model loaded. Train or load a model first.")

        text = self._entry_to_text(entry, label_field="label")
        proba = self.model.predict_proba([text])[0][1]
        prediction = "leak" if proba >= 0.5 else "safe"

        if proba < 0.3:
            risk_level = "low"
        elif proba < 0.7:
            risk_level = "moderate"
        else:
            risk_level = "high"

        return {
            "entry": entry,
            "leak_probability": float(proba),
            "prediction": prediction,
            "risk_level": risk_level,
            "timestamp": datetime.now().isoformat(),
        }

    def scan_all(self) -> List[Dict[str, Any]]:
        if not self.leaks:
            raise ValueError("No data loaded. Please load data first.")
        if self.model is None:
            raise ValueError("No trained model loaded. Train or load a model first.")

        self.scan_results = [self.scan_entry(e) for e in self.leaks]
        return self.scan_results

    # ------------------- SUMMARY -------------------

    def generate_summary(self) -> Dict[str, Any]:
        if not self.scan_results:
            raise ValueError("No scan results available. Please run scan_all() first.")

        total = len(self.scan_results)
        dist = {"low": 0, "moderate": 0, "high": 0}
        total_proba = 0.0

        for r in self.scan_results:
            dist[r["risk_level"]] += 1
            total_proba += r["leak_probability"]

        avg = total_proba / total if total > 0 else 0.0

        return {
            "total_entries": total,
            "risk_distribution": dist,
            "average_leak_probability": round(avg, 3),
            "high_risk_count": dist["high"],
            "moderate_risk_count": dist["moderate"],
            "low_risk_count": dist["low"],
            "scan_timestamp": datetime.now().isoformat(),
        }
