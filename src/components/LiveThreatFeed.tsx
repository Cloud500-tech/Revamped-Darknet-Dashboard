import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

// Fallback demo data (used when API fails or returns empty)
const fallbackData = [
  { timestamp: "2025-11-08 09:23:14", ipAddress: "192.168.1.100", severity: "Critical", source: "pastebin.com", type: "Credential Leak", size: "2.3GB", alert: 10 },
  { timestamp: "2025-11-08 09:18:42", ipAddress: "10.0.0.25", severity: "High", source: "github.com", type: "API Key", size: "45MB", alert: 9 },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
    case "Critical":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "high":
    case "High":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "medium":
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "low":
    case "Low":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getSeverityBg = (severity: string) => {
  switch (severity) {
    case "critical":
    case "Critical":
      return "bg-red-500/5 border-red-500/10";
    case "high":
    case "High":
      return "bg-amber-500/5 border-amber-500/10";
    case "medium":
    case "Medium":
      return "bg-yellow-500/5 border-yellow-500/10";
    case "low":
    case "Low":
      return "bg-green-500/5 border-green-500/10";
    default:
      return "bg-gray-500/5 border-gray-500/10";
  }
};

export function LiveThreatFeed() {
  const [threats, setThreats] = useState(fallbackData);

  useEffect(() => {
    async function fetchLeaks() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/leaks");
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("API returned no data, using fallback");
          return;
        }

        // Map backend fields -> frontend table format
        const formatted = data.map((item: any) => ({
          timestamp: item.leaked_date || "N/A",
          ipAddress: "—", // Backend has no IP field; placeholder
          severity: item.severity || "Unknown",
          source: item.source || "Unknown",
          type: item.patterns?.join(", ") || "Leak",
          size: item.size || `${item.risk_score}MB`,
          alert: item.risk_score || 0,
        }));

        setThreats(formatted);
      } catch (err) {
        console.error("Failed loading leaks:", err);
      }
    }

    fetchLeaks();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20 mb-6 hover:border-cyan-500/30 transition-all">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
        <h3 className="text-sm tracking-wider text-red-400">LIVE THREAT FEED</h3>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/10">
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Timestamp</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">IP Address</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Severity</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Source</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Type</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Size</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Alert</th>
            </tr>
          </thead>
          <tbody>
            {threats.map((threat, index) => (
              <tr
                key={index}
                className={`border-b border-cyan-500/5 hover:bg-cyan-500/5 transition-colors ${getSeverityBg(
                  threat.severity
                )}`}
              >
                <td className="py-3 px-4 text-xs text-gray-400">{threat.timestamp}</td>
                <td className="py-3 px-4 text-xs text-gray-300">{threat.ipAddress}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs border ${getSeverityColor(threat.severity)}`}>
                    {threat.severity}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-gray-400">{threat.source}</td>
                <td className="py-3 px-4 text-xs text-gray-300">{threat.type}</td>
                <td className="py-3 px-4 text-xs text-gray-400">{threat.size}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-300">{threat.alert}</span>
                    {threat.alert >= 90 && <AlertTriangle className="w-3 h-3 text-red-400" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-cyan-500/10">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs hover:bg-cyan-500/20 transition-colors border border-cyan-500/20">
            ← Prev
          </button>
          <span className="text-xs text-gray-500">Page 1 of 1</span>
          <button className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs hover:bg-cyan-500/20 transition-colors border border-cyan-500/20">
            Next →
          </button>
        </div>

        <div className="flex gap-2">
          <button className="w-8 h-8 rounded bg-[#0a0e1a] border border-cyan-500/20 flex items-center justify-center hover:border-cyan-500/50 transition-colors">
            <span className="text-xs text-cyan-400">⊞</span>
          </button>
          <button className="w-8 h-8 rounded bg-[#0a0e1a] border border-cyan-500/20 flex items-center justify-center hover:border-cyan-500/50 transition-colors">
            <span className="text-xs text-cyan-400">⊟</span>
          </button>
          <button className="w-8 h-8 rounded bg-[#0a0e1a] border border-cyan-500/20 flex items-center justify-center hover:border-cyan-500/50 transition-colors">
            <span className="text-xs text-cyan-400">⊠</span>
          </button>
        </div>
      </div>
    </div>
  );
}
