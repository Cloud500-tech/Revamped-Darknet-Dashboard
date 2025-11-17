import { useEffect, useState } from "react";
import {
  FileText,
  Filter,
  RefreshCw,
  Download,
  AlertTriangle,
  BarChart2,
  Clock,
} from "lucide-react";

type SummaryResponse = {
  total_leaks: number;
  high_risk: number;
  avg_risk_score: number;
  active_sources: number;
  risk_level_distribution: Record<string, number>;
  severity_distribution: Record<string, number>;
};

type LeakRow = {
  id: string | null;
  source: string;
  description: string;
  content: string;
  leaked_date: string | null;
  severity: string;
  risk_score: number;
  risk_level: string;
  patterns: string[];
};

type ReportRow = {
  id: string;
  name: string;
  type: string;
  dateRange: string;
  createdAt: string;
  createdBy: string;
  status: string;
  findings: string;
  format: string;
};

const initialReports: ReportRow[] = [
  {
    id: "RPT-2025-001",
    name: "Weekly Threat Summary",
    type: "Threat Summary",
    dateRange: "2025-11-01 to 2025-11-07",
    createdAt: "2025-11-08 09:30",
    createdBy: "System",
    status: "Completed",
    findings: "Elevated credential leaks and API key exposure on pastebin and GitHub.",
    format: "PDF / CSV",
  },
  {
    id: "RPT-2025-002",
    name: "High-Risk Credential Exposures",
    type: "Credential Report",
    dateRange: "Last 24 hours",
    createdAt: "2025-11-08 08:10",
    createdBy: "Analyst",
    status: "Completed",
    findings: "Concentrated leaks with high risk scores across forums and marketplaces.",
    format: "PDF",
  },
  {
    id: "RPT-2025-003",
    name: "Darknet Financial Data Overview",
    type: "Financial Data",
    dateRange: "Last 7 days",
    createdAt: "2025-11-07 21:40",
    createdBy: "System",
    status: "Completed",
    findings: "Credit card dumps and IBAN patterns clustered in 3 primary sources.",
    format: "CSV",
  },
];

export function ReportsView() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [reports, setReports] = useState<ReportRow[]>(initialReports);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/summary");
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Failed to load summary for reports:", err);
      }
    }
    fetchSummary();
  }, []);

  const quickStats = summary
    ? [
        {
          label: "Total Leaks (Current Window)",
          value: summary.total_leaks,
          icon: <BarChart2 className="w-4 h-4 text-cyan-400" />,
        },
        {
          label: "High-Risk Entries",
          value: summary.high_risk,
          icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
        },
        {
          label: "Avg Risk Score",
          value: summary.avg_risk_score.toFixed(1),
          icon: <FileText className="w-4 h-4 text-amber-400" />,
        },
        {
          label: "Active Sources",
          value: summary.active_sources,
          icon: <Clock className="w-4 h-4 text-green-400" />,
        },
      ]
    : [
        {
          label: "Total Reports Generated",
          value: reports.length,
          icon: <BarChart2 className="w-4 h-4 text-cyan-400" />,
        },
        {
          label: "Completed Reports",
          value: reports.filter((r) => r.status === "Completed").length,
          icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
        },
        {
          label: "Preferred Format",
          value: "PDF / CSV",
          icon: <FileText className="w-4 h-4 text-amber-400" />,
        },
        {
          label: "Generation Time",
          value: "~3s",
          icon: <Clock className="w-4 h-4 text-green-400" />,
        },
      ];

  const handleGenerateReport = async () => {
  setIsGenerating(true);
  try {
    const [summaryRes, leaksRes] = await Promise.all([
      fetch("http://127.0.0.1:8000/api/summary"),
      fetch("http://127.0.0.1:8000/api/leaks"),
    ]);

    const summaryData: SummaryResponse = await summaryRes.json();
    const leaks: LeakRow[] = await leaksRes.json();

    const now = new Date();

    // Nice readable ID: RPT-YYYYMMDD-### (### = running counter)
    const id = `RPT-${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(
      reports.length + 1
    ).padStart(3, "0")}`;

    const highRiskCount = leaks.filter((l) => l.risk_level === "high").length;

    const topSources = Array.from(
      leaks.reduce<Map<string, number>>((acc, leak) => {
        acc.set(leak.source, (acc.get(leak.source) || 0) + 1);
        return acc;
      }, new Map())
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([source]) => source)
      .join(", ");

    const newReport: ReportRow = {
      id,
      name: "On-Demand Threat Summary",
      type: "Threat Summary",
      dateRange: "Last scan window",
      createdAt: now.toISOString().slice(0, 16).replace("T", " "),
      createdBy: "System",
      status: "Completed",
      // ✅ One clean findings field with real timestamp
      findings: `${summaryData.total_leaks} leaks detected, ${highRiskCount} high-risk entries. Top sources: ${
        topSources || "N/A"
      }. Generated at ${now.toLocaleString()}`,
      format: "JSON / CSV",
    };

    setReports((prev) => [newReport, ...prev]);
    setSummary(summaryData);
  } catch (err) {
    console.error("Failed to generate report:", err);
  } finally {
    setIsGenerating(false);
  }
};


  const handleDownload = (report: ReportRow) => {
  // Build a simple one-row CSV using the report fields
  const headers = [
    "Report ID",
    "Name",
    "Type",
    "Date Range",
    "Created At",
    "Created By",
    "Status",
    "Key Findings",
    "Format",
  ];

  const values = [
    report.id,
    report.name,
    report.type,
    report.dateRange,
    report.createdAt,
    report.createdBy,
    report.status,
    report.findings.replace(/,/g, ";"), // avoid breaking CSV with commas
    report.format,
  ];

  const csvContent = [headers.join(","), values.join(",")].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${report.id}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};



  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-cyan-400" />
          <div>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Reports & Analytics
            </h2>
            <p className="text-sm text-gray-500">
              Generate and review darknet leak intelligence reports.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3 py-2 rounded-lg bg-[#0a0e1a] border border-cyan-500/20 text-xs text-cyan-300 hover:border-cyan-400/60 transition-colors flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Filters
          </button>
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-xs text-white flex items-center gap-2 shadow-lg shadow-cyan-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="w-3 h-3" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-4 shadow-xl flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg text-cyan-300 mt-1">{stat.value}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#020617] border border-cyan-500/30 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Reports Table */}
      <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
            <h3 className="text-sm tracking-wider text-cyan-400">
              GENERATED REPORTS
            </h3>
          </div>
          <span className="text-xs text-gray-500">
            {reports.length} reports available
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-cyan-500/10">
                <th className="text-left py-3 px-4 text-cyan-400">Report ID</th>
                <th className="text-left py-3 px-4 text-cyan-400">Name</th>
                <th className="text-left py-3 px-4 text-cyan-400">Type</th>
                <th className="text-left py-3 px-4 text-cyan-400">
                  Date Range
                </th>
                <th className="text-left py-3 px-4 text-cyan-400">
                  Created At
                </th>
                <th className="text-left py-3 px-4 text-cyan-400">
                  Created By
                </th>
                <th className="text-left py-3 px-4 text-cyan-400">Status</th>
                <th className="text-left py-3 px-4 text-cyan-400">
                  Key Findings
                </th>
                <th className="text-left py-3 px-4 text-cyan-400">Format</th>
                <th className="text-left py-3 px-4 text-cyan-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-cyan-500/5 hover:bg-cyan-500/5 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-400">{report.id}</td>
                  <td className="py-3 px-4 text-gray-200">{report.name}</td>
                  <td className="py-3 px-4 text-gray-300">{report.type}</td>
                  <td className="py-3 px-4 text-gray-400">
                    {report.dateRange}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {report.createdAt}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {report.createdBy}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full border text-xs ${
                        report.status === "Completed"
                          ? "border-green-500/40 text-green-400 bg-green-500/10"
                          : "border-amber-500/40 text-amber-400 bg-amber-500/10"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300 max-w-xs truncate">
                    {report.findings}
                  </td>
                  <td className="py-3 px-4 text-gray-400">{report.format}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDownload(report)}
                      className="px-2 py-1 rounded bg-[#020617] border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/70 hover:text-cyan-200 transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="py-6 text-center text-gray-500 text-xs"
                  >
                    No reports available. Click{" "}
                    <span className="text-cyan-400">Generate Report</span> to
                    create one from current darknet activity.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
