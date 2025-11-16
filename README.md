
  # Revamp Cybersecurity Dashboard Design

  This is a code bundle for Revamp Cybersecurity Dashboard Design. The original project is available at https://www.figma.com/design/48CAkFHaqFw9MTRO4jHKRd/Revamp-Cybersecurity-Dashboard-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.


  darknet-leak-detector
Simulated Darknet Data Leak Detection Dashboard

A Python-based system that simulates dark web data leak detection by scanning datasets for sensitive information patterns and keywords. The system identifies potential leaks and assigns risk levels based on the detected patterns.

Now featuring a comprehensive web dashboard with real-time visualization, interactive charts, threat feed monitoring, and advanced filtering capabilities - styled with a professional cyber intelligence theme.

Features
Backend Detection Engine
Multi-format Data Loading: Supports both CSV and JSON data formats
Pattern-based Detection: Scans for sensitive keywords including:
Passwords and credentials
Credit card information
Social Security Numbers (SSN)
Email addresses (including company domains like @company.com)
API keys and access tokens
Database information
Risk Scoring: Assigns risk scores (0-100) based on detected patterns
Risk Level Classification: Categorizes entries as low, moderate, or high risk
Summary Reports: Generates comprehensive statistics and pattern frequency analysis
Export Capabilities: Export scan results to JSON or CSV formats
Web Dashboard
Interactive Visualizations: Multiple chart types (pie, donut, bar, time-series)
Real-time KPI Monitoring: Track total leaks, high-risk entries, and average risk scores
Live Threat Feed: Real-time table with timestamps, IPs, countries, sources, and risk levels
Domain Risk Assessment: Identify affected domains with aggregated risk metrics
Advanced Filtering: Search and filter by IP, domain, source, severity, and risk level
Responsive Design: Dark cyber intelligence theme optimized for security monitoring
Built with Dash & Plotly: Professional, interactive data visualization framework
Installation
No external dependencies required! The system uses only Python standard library modules.

# Clone the repository
git clone https://github.com/Cloud500-tech/darknet-leak-detector.git
cd darknet-leak-detector

# Python 3.6+ required
python3 --version
Usage
Quick Start
Run the detector with the included sample dataset:

python3 detector.py
Using as a Module
from detector import LeakDetector

# Initialize the detector
detector = LeakDetector()

# Load data from CSV
detector.load_csv('sample_data.csv')

# Or load from JSON
# detector.load_json('sample_data.json')

# Scan all entries
results = detector.scan_all()

# Generate summary
summary = detector.generate_summary()
print(f"Total entries: {summary['total_entries']}")
print(f"High risk entries: {summary['high_risk_count']}")
print(f"Average risk score: {summary['average_risk_score']}")

# Get high-risk entries
high_risk = detector.get_high_risk_entries()
for entry in high_risk:
    print(f"Risk Score: {entry['risk_score']}")
    print(f"Patterns: {entry['detected_patterns']}")

# Export results
detector.export_results('results.json', format='json')
detector.export_results('results.csv', format='csv')
Sample Dataset
The repository includes sample_data.csv with 30 simulated data leak entries containing various types of sensitive information. Each entry includes:

id: Unique identifier
source: Origin of the leak (forum, marketplace, etc.)
description: Brief description of the leak
content: Details about what was leaked
leaked_date: Date of the leak
severity: Initial severity assessment
Risk Scoring System
The detector uses a weighted scoring system:

Pattern Type	Weight	Description
Credit Card	50	Credit card numbers, payment info
SSN	50	Social Security Numbers
API Keys	45	API keys, access tokens
Company Email	40	Emails with @company.com domain
Database	35	Database references
Credentials	35	Login credentials
Password	30	Password references
Email	20	General email addresses
Risk Level Thresholds
Low: 0-39 points
Moderate: 40-74 points
High: 75-100 points
Output Example
=== Scan Summary ===
Total entries scanned: 30
Average risk score: 39.17

Risk Distribution:
  High: 5
  Moderate: 9
  Low: 16

Most common patterns:
  database: 10
  credit_card: 6
  ssn: 5
  credentials: 4
  password: 3
API Reference
LeakDetector Class
Methods
load_csv(filepath): Load data from a CSV file
load_json(filepath): Load data from a JSON file
scan_entry(entry): Scan a single entry and return results
scan_all(): Scan all loaded entries
generate_summary(): Generate summary statistics
get_high_risk_entries(): Get all high-risk entries
export_results(filepath, format): Export results to file
Web Dashboard
A comprehensive web-based dashboard is now available for real-time visualization and monitoring of detected leaks. The dashboard provides an interactive cyber intelligence interface with dark theme styling.

Dashboard Features
Real-time KPI Metrics:

Total Leaks Detected
High Risk Entries Count
Average Risk Score
Active Sources Count
Interactive Visualizations:

Leak Type Distribution (Pie Chart)
Risk Level Distribution (Donut Chart)
Leak Sources (Bar Chart)
Severity Levels (Bar Chart)
Timeline Chart (Time-series of leaks over time)
Live Threat Feed Table:

Timestamp
IP Address
Country
Source
Type
Risk Level
Risk Score
Sortable and filterable columns
Domain Risk Assessment Table:

Affected domains
Number of leaks per domain
Average risk score
Risk level
Last detected timestamp
Search & Filter Capabilities:

Search by IP address or domain
Filter by source
Filter by severity (Critical, High, Moderate, Low)
Filter by risk level (High, Moderate, Low)
Dashboard Installation
Install the required dependencies:

pip install -r requirements.txt
Running the Dashboard
Start the dashboard server:

python3 dashboard.py
The dashboard will be available at http://127.0.0.1:8050

Dashboard Usage
Navigate to the dashboard URL in your web browser
Use the filters at the top to narrow down results:
Enter IP addresses or domains in the search box
Select specific sources from the dropdown
Filter by severity level
Filter by risk level
View visualizations that update in real-time based on your filters
Explore the threat feed table with sortable columns
Review domain risk assessments to identify affected domains
Quick Start Script
For convenience, use the provided launch script:

chmod +x run_dashboard.sh
./run_dashboard.sh
Dashboard Screenshots
The dashboard features a dark cyber intelligence theme optimized for monitoring darknet data leaks:

Modern, responsive layout
Dark theme with cybersecurity aesthetics
Interactive charts using Plotly
Real-time filtering and search
Professional threat intelligence presentation
For detailed dashboard documentation, see DASHBOARD.md.

Tailwind CSS
The dashboard uses Tailwind CSS for modern, utility-first styling.

Run npm install once to install dependencies.
To build CSS for production: npm run build:css
During development: npm run dev:css in a separate terminal.
Then run python dashboard.py to start the Dash app.
License
This project is for educational and simulation purposes only.

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
