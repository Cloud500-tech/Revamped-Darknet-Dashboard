Darknet Leak Detector

A Simulated Darknet Data Leak Detection Dashboard
(Flask API + React/Tailwind Frontend)

This project simulates a darknet monitoring system for academic and research purposes.
It consists of:

A Python backend (Flask) that loads synthetic darknet leaks, analyzes patterns, and exposes structured API endpoints.

A React + Tailwind dashboard that visualizes leaks through analytics, charts, tables, and on-demand reports.

A Figma-styled UI integrated into a cybersecurity-themed interface.

No real darknet data is accessed. All data is synthetic and generated for educational use only.

🔧 Features
Backend (Python / Flask)

Synthetic darknet leak generator

Leak detection engine with:

Severity scoring

Risk classification

Pattern extraction

JSON + CSV dataset support

CSV export of all leaks

Summary endpoint for dashboard analytics

Frontend (React / Vite / Tailwind)

Interactive cyber-style dashboard UI

Analytics: severity, sources, patterns, timelines

Live threat feed

Report generation with timestamps

CSV export per report

CSV export of full leak dataset

🚀 How to Run the Darknet Leak Detector

This system requires two terminals:
one for the Backend (Flask) and one for the Frontend (React).

1. Start the Backend (Flask API)

From the project root:

cd backend
pip install -r requirements.txt
python api.py


If it loads successfully, you’ll see:

Running on http://127.0.0.1:8000


Keep this terminal open.

2. Start the Frontend (React Dashboard)

Open a second terminal:

cd frontend
npm install
npm run dev


You will see:

Local: http://localhost:3000


Open that URL to access the dashboard UI.

Quick Summary
Terminal 1
cd backend
python api.py

Terminal 2
cd frontend
npm run dev


Dashboard runs at: http://localhost:3000

Backend API runs at: http://127.0.0.1:8000

🧪 Generate Synthetic Darknet Data (Optional)

To generate hundreds of realistic synthetic leaks (for testing charts and reports):

cd backend
python generate_synthetic_data.py
python api.py   # restart backend


This overwrites:

sample_data.json

sample_data.csv

The dashboard will automatically reflect the new dataset.

🗂️ API Endpoints
Endpoint	Description
/api/summary	Returns leak summary analytics
/api/leaks	Returns all leaks (JSON)
/api/leaks_csv	Downloads full leak dataset (CSV)
/api/ping	Health check
📝 Project Purpose

This project was developed as part of a university senior project to demonstrate:

Darknet intelligence simulation

Data-driven threat analytics

Dashboard UI/UX design

Full-stack integration (Python backend + React frontend)

It is not intended for real-world threat intelligence or monitoring.

🔒 Disclaimer

This tool uses synthetic data only.
It does not access, scrape, or monitor the real darknet.
