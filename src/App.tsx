import { useState } from "react";
import {
  Shield,
  Search,
  Activity,
  AlertTriangle,
  Database,
  Settings,
  FileText,
  Home,
  Info,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { StatCard } from "./components/StatCard";
import { LiveThreatFeed } from "./components/LiveThreatFeed";
import { RiskAssessment } from "./components/RiskAssessment";
import { ActivityView } from "./components/ActivityView";
import { ReportsView } from "./components/ReportsView";
import { SettingsView } from "./components/SettingsView";

export default function App() {
  const [activeNav, setActiveNav] = useState("home");

  // Data for charts
  const dataTypeDistribution = [
    { name: "Credentials", value: 35, color: "#ef4444" },
    { name: "PII", value: 25, color: "#f59e0b" },
    { name: "Financial", value: 20, color: "#3b82f6" },
    { name: "Medical", value: 20, color: "#10b981" },
  ];

  const riskLevelDistribution = [
    { name: "Critical", value: 30, color: "#dc2626" },
    { name: "High", value: 25, color: "#f59e0b" },
    { name: "Medium", value: 25, color: "#eab308" },
    { name: "Low", value: 20, color: "#22c55e" },
  ];

  const leakSources = [
    { name: "pastebin.com", value: 45 },
    { name: "github.com", value: 38 },
    { name: "raidforums.com", value: 35 },
    { name: "onion sites", value: 32 },
    { name: "telegram", value: 28 },
    { name: "discord", value: 25 },
    { name: "breachforums", value: 22 },
    { name: "darknet markets", value: 20 },
    { name: "hacking forums", value: 18 },
    { name: "other", value: 15 },
  ];

  const detectionPatterns = [
    { name: "email:pass", value: 42 },
    { name: "credit_card", value: 35 },
    { name: "ssn", value: 38 },
    { name: "api_key", value: 28 },
    { name: "phone", value: 32 },
    { name: "address", value: 25 },
  ];

  const timelineData = [
    { date: "Feb 05", value: 3 },
    { date: "Feb 12", value: 5 },
    { date: "Feb 19", value: 4 },
    { date: "Feb 26", value: 7 },
    { date: "Mar 05", value: 6 },
    { date: "Mar 12", value: 5 },
  ];

  const severityData = [
    { severity: "Critical", Feb: 12, Mar: 10 },
    { severity: "High", Feb: 8, Mar: 6 },
    { severity: "Medium", Feb: 5, Mar: 7 },
    { severity: "Low", Feb: 3, Mar: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-[#0f1420] border-r border-cyan-500/10 flex flex-col items-center py-6 gap-6 z-50">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Shield className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <button
            onClick={() => setActiveNav("home")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              activeNav === "home"
                ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                : "text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveNav("activity")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              activeNav === "activity"
                ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                : "text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            <Activity className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveNav("reports")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              activeNav === "reports"
                ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                : "text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            <FileText className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveNav("settings")}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              activeNav === "settings"
                ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                : "text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16">
        {/* Header */}
        <div className="border-b border-cyan-500/10 bg-gradient-to-r from-[#0f1420] to-[#0a0e1a] sticky top-0 z-40">
          <div className="px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-8 h-8 text-cyan-400" />
              <h1 className="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                DARKNET LEAK DETECTION DASHBOARD
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              Real-time monitoring & threat intelligence
              analysis
            </p>
          </div>
        </div>

        {/* Conditional Content Based on Active Nav */}
        {activeNav === "activity" && <ActivityView />}
        {activeNav === "reports" && <ReportsView />}
        {activeNav === "settings" && <SettingsView />}

        {/* Home Dashboard */}
        {activeNav === "home" && (
          <>
            {/* Search & Filter Section */}
            <div className="px-8 py-6 border-b border-cyan-500/10 bg-[#0f1420]/30">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm tracking-wider text-cyan-400">
                  SEARCH & FILTER
                </h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">
                    Search [IP/Domain]
                  </label>
                  <Input
                    placeholder="Enter IP or domain..."
                    className="bg-[#0a0e1a] border-gray-700/50 focus:border-cyan-500 focus:ring-cyan-500/20 text-gray-200"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">
                    Source
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-cyan-500 focus:ring-cyan-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All Sources
                      </SelectItem>
                      <SelectItem value="pastebin">
                        Pastebin
                      </SelectItem>
                      <SelectItem value="github">
                        GitHub
                      </SelectItem>
                      <SelectItem value="darknet">
                        Darknet
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">
                    Severity
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-cyan-500 focus:ring-cyan-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All Levels
                      </SelectItem>
                      <SelectItem value="critical">
                        Critical
                      </SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">
                        Medium
                      </SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">
                    Risk Level
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-cyan-500 focus:ring-cyan-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All Risks
                      </SelectItem>
                      <SelectItem value="high">
                        High Risk
                      </SelectItem>
                      <SelectItem value="medium">
                        Medium Risk
                      </SelectItem>
                      <SelectItem value="low">
                        Low Risk
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="px-8 py-6">
              <TooltipProvider>
                <div className="grid grid-cols-4 gap-6 mb-8">
                  <StatCard
                    label="Total Leaks Detected"
                    value="30"
                    icon={Database}
                    color="red"
                    tooltip="Total number of data leaks identified across all sources"
                  />
                  <StatCard
                    label="High Risk Entries"
                    value="8"
                    icon={AlertTriangle}
                    color="amber"
                    tooltip="Entries classified as high risk requiring immediate attention"
                  />
                  <StatCard
                    label="Average Risk Score"
                    value="57.5"
                    icon={Activity}
                    color="cyan"
                    trend="+2.3"
                    tooltip="Calculated risk score based on severity, exposure, and data sensitivity"
                  />
                  <StatCard
                    label="Active Sources"
                    value="30"
                    icon={Shield}
                    color="green"
                    tooltip="Number of monitored sources currently active"
                  />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Data Type Distribution */}
                  <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
                      <h3 className="text-sm tracking-wider text-amber-400">
                        DATA TYPE DISTRIBUTION
                      </h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <ResponsiveContainer
                        width="60%"
                        height={200}
                      >
                        <PieChart>
                          <Pie
                            data={dataTypeDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {dataTypeDistribution.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ),
                            )}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0a0e1a",
                              border:
                                "1px solid rgba(6, 182, 212, 0.2)",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-col gap-2">
                        {dataTypeDistribution.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-3 h-3 rounded-sm"
                                style={{
                                  backgroundColor: item.color,
                                }}
                              ></div>
                              <span className="text-xs text-gray-400">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {item.value}%
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Risk Level Distribution */}
                  <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                      <h3 className="text-sm tracking-wider text-red-400">
                        RISK LEVEL DISTRIBUTION
                      </h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <ResponsiveContainer
                        width="60%"
                        height={200}
                      >
                        <PieChart>
                          <Pie
                            data={riskLevelDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {riskLevelDistribution.map(
                              (entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ),
                            )}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#0a0e1a",
                              border:
                                "1px solid rgba(6, 182, 212, 0.2)",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-col gap-2">
                        {riskLevelDistribution.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-3 h-3 rounded-sm"
                                style={{
                                  backgroundColor: item.color,
                                }}
                              ></div>
                              <span className="text-xs text-gray-400">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {item.value}%
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Top Leak Sources */}
                  <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full"></div>
                      <h3 className="text-sm tracking-wider text-cyan-400">
                        TOP LEAK SOURCES
                      </h3>
                    </div>
                    <ResponsiveContainer
                      width="100%"
                      height={280}
                    >
                      <BarChart
                        data={leakSources}
                        layout="vertical"
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                        />
                        <XAxis
                          type="number"
                          stroke="#64748b"
                          style={{ fontSize: "11px" }}
                        />
                        <YAxis
                          dataKey="name"
                          type="category"
                          width={120}
                          stroke="#64748b"
                          style={{ fontSize: "11px" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0a0e1a",
                            border:
                              "1px solid rgba(6, 182, 212, 0.2)",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill="#06b6d4"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Detected Patterns */}
                  <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
                      <h3 className="text-sm tracking-wider text-amber-400">
                        TOP DETECTED PATTERNS
                      </h3>
                    </div>
                    <ResponsiveContainer
                      width="100%"
                      height={280}
                    >
                      <BarChart data={detectionPatterns}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                        />
                        <XAxis
                          dataKey="name"
                          stroke="#64748b"
                          style={{ fontSize: "11px" }}
                        />
                        <YAxis
                          stroke="#64748b"
                          style={{ fontSize: "11px" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0a0e1a",
                            border:
                              "1px solid rgba(6, 182, 212, 0.2)",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill="#f59e0b"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Charts Row 3 */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Leak Detection Timeline */}
                  <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                      <h3 className="text-sm tracking-wider text-red-400">
                        LEAK DETECTION TIMELINE
                      </h3>
                    </div>
                    <ResponsiveContainer
                      width="100%"
                      height={200}
                    >
                      <LineChart data={timelineData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                        />
                        <XAxis
                          dataKey="date"
                          stroke="#64748b"
                          style={{ fontSize: "11px" }}
                        />
                        <YAxis
                          stroke="#64748b"
                          style={{ fontSize: "11px" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0a0e1a",
                            border:
                              "1px solid rgba(6, 182, 212, 0.2)",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ fill: "#ef4444", r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Severity Distribution */}
                  <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                      <h3 className="text-sm tracking-wider text-purple-400">
                        SEVERITY DISTRIBUTION
                      </h3>
                    </div>
                    <ResponsiveContainer
                      width="100%"
                      height={200}
                    >
                      <BarChart data={severityData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                        />
                        <XAxis
                          dataKey="severity"
                          stroke="#64748b"
                          style={{ fontSize: "11px" }}
                        />
                        <YAxis
                          stroke="#64748b"
                          style={{ fontSize: "11px" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0a0e1a",
                            border:
                              "1px solid rgba(6, 182, 212, 0.2)",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "11px" }}
                        />
                        <Bar
                          dataKey="Feb"
                          fill="#ec4899"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="Mar"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Live Threat Feed */}
                <LiveThreatFeed />

                {/* Risk Assessment */}
                <RiskAssessment />
              </TooltipProvider>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-cyan-500/10 bg-[#0f1420]/30">
              <p className="text-xs text-gray-600 text-center">
                © 2025 Darknet Leak Detection System | Senior
                Cybersecurity Project
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}