import React, { useEffect, useState } from 'react';
import { Activity, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const fallback_activityTimeline = [
  { time: '00:00', threats: 2, scans: 15 },
  { time: '03:00', threats: 1, scans: 12 },
  { time: '06:00', threats: 4, scans: 18 },
  { time: '09:00', threats: 7, scans: 25 },
  { time: '12:00', threats: 5, scans: 22 },
  { time: '15:00', threats: 6, scans: 20 },
  { time: '18:00', threats: 8, scans: 28 },
  { time: '21:00', threats: 4, scans: 19 },
];

const fallback_hourlyActivity = [
  { hour: '00:00', critical: 1, high: 2, medium: 3, low: 1 },
  { hour: '03:00', critical: 0, high: 1, medium: 2, low: 2 },
  { hour: '06:00', critical: 2, high: 3, medium: 4, low: 1 },
  { hour: '09:00', critical: 3, high: 4, medium: 5, low: 2 },
  { hour: '12:00', critical: 2, high: 3, medium: 4, low: 3 },
  { hour: '15:00', critical: 1, high: 2, medium: 3, low: 2 },
  { hour: '18:00', critical: 3, high: 4, medium: 5, low: 2 },
  { hour: '21:00', critical: 2, high: 3, medium: 4, low: 1 },
];

const fallback_recentActivity = [
  { time: '09:23:14', action: 'Critical leak detected', source: 'pastebin.com', user: 'System', status: 'Alert Sent' },
  { time: '09:18:42', action: 'API key exposure found', source: 'github.com', user: 'System', status: 'Investigating' },
  { time: '09:15:33', action: 'Financial data leak', source: 'darknet market', user: 'System', status: 'Alert Sent' },
  { time: '09:12:11', action: 'PII exposure detected', source: 'raidforums.com', user: 'Admin', status: 'Mitigated' },
  { time: '09:08:59', action: 'Medical records found', source: 'telegram', user: 'System', status: 'Reviewing' },
  { time: '09:05:27', action: 'Credit card data leak', source: 'onion site', user: 'Admin', status: 'Alert Sent' },
  { time: '09:02:15', action: 'Email list exposed', source: 'discord', user: 'System', status: 'Monitoring' },
  { time: '08:58:44', action: 'Public data indexed', source: 'pastebin.com', user: 'System', status: 'Archived' },
];

const fallback_sourceActivity = [
  { source: 'pastebin.com', detections: 145 },
  { source: 'github.com', detections: 98 },
  { source: 'darknet markets', detections: 87 },
  { source: 'raidforums', detections: 76 },
  { source: 'telegram', detections: 65 },
  { source: 'onion sites', detections: 54 },
];

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

const HOURS = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

function buildActivityTimeline(leaks: LeakRow[]) {
  // initialise map
  const buckets: Record<string, { time: string; threats: number; scans: number }> = {};
  HOURS.forEach((h) => {
    buckets[h] = { time: h, threats: 0, scans: 0 };
  });

  leaks.forEach((leak, index) => {
    const hour = HOURS[index % HOURS.length];
    const bucket = buckets[hour];
    bucket.threats += 1;
    // simple synthetic scan count using risk_score so it feels dynamic
    bucket.scans += 10 + Math.round(leak.risk_score / 5);
  });

  return HOURS.map((h) => buckets[h]);
}

function buildHourlySeverity(leaks: LeakRow[]) {
  type SevBucket = { hour: string; critical: number; high: number; medium: number; low: number };
  const buckets: Record<string, SevBucket> = {};
  HOURS.forEach((h) => {
    buckets[h] = { hour: h, critical: 0, high: 0, medium: 0, low: 0 };
  });

  leaks.forEach((leak, index) => {
    const hour = HOURS[index % HOURS.length];
    const bucket = buckets[hour];
    const sev = (leak.severity || '').toLowerCase();

    if (sev === 'critical') bucket.critical += 1;
    else if (sev === 'high') bucket.high += 1;
    else if (sev === 'medium' || sev === 'moderate') bucket.medium += 1;
    else bucket.low += 1;
  });

  return HOURS.map((h) => buckets[h]);
}

export function ActivityView() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [leaks, setLeaks] = useState<LeakRow[]>([]);

  useEffect(() => {
    // Summary KPIs
    fetch('http://127.0.0.1:8000/api/summary')
      .then((res) => res.json())
      .then(setSummary)
      .catch((err) => console.error('Failed to load summary', err));

    // Detailed leaks
    fetch('http://127.0.0.1:8000/api/leaks')
      .then((res) => res.json())
      .then(setLeaks)
      .catch((err) => console.error('Failed to load leaks', err));
  }, []);

  const activityTimeline = fallback_activityTimeline;
  const hourlyActivity = fallback_hourlyActivity;


  const recentActivity = leaks.length
    ? leaks.slice(0, 8).map((l) => ({
        time: l.leaked_date || 'Unknown',
        action: l.description,
        source: l.source,
        user: 'System',
        status:
          l.risk_level === 'high'
            ? 'Alert Sent'
            : l.risk_level === 'moderate'
            ? 'Investigating'
            : 'Monitoring',
      }))
    : fallback_recentActivity;

  const sourceActivity = leaks.length
    ? Object.entries(
        leaks.reduce<Record<string, number>>((acc, l) => {
          acc[l.source] = (acc[l.source] || 0) + 1;
          return acc;
        }, {})
      ).map(([source, detections]) => ({ source, detections }))
    : fallback_sourceActivity;

  return (
    <div className="px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-cyan-400" />
        <div>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Activity Monitoring
          </h2>
          <p className="text-sm text-gray-500">Real-time threat detection activity and system logs</p>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Scans</p>
              <p className="text-cyan-400">{summary ? summary.total_leaks : 28}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Threats/Hour</p>
              <p className="text-red-400">{summary ? summary.high_risk : 8.3}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg Response Time</p>
              <p className="text-amber-400">2.4s</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Uptime</p>
              <p className="text-green-400">99.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Logs */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* 24-Hour Activity Timeline */}
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-cyan-400">24-HOUR ACTIVITY TIMELINE</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={activityTimeline}>
              <defs>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#0f172a',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="threats"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorThreats)"
                name="Threats"
              />
              <Area
                type="monotone"
                dataKey="scans"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorScans)"
                name="Scans"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Severity by Hour */}
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-amber-500 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-red-400">SEVERITY BY HOUR</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#0f172a',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
              <Bar dataKey="high" stackId="a" fill="#f97316" name="High" />
              <Bar dataKey="medium" stackId="a" fill="#eab308" name="Medium" />
              <Bar dataKey="low" stackId="a" fill="#22c55e" name="Low" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity Log */}
        <div className="col-span-2 bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
              <h3 className="text-sm tracking-wider text-cyan-400">RECENT ACTIVITY</h3>
            </div>
          </div>
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-900/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <div>
                    <p className="text-sm text-gray-100">{item.action}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.user}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{item.time}</p>
                  <p
                    className={`text-xs ${
                      item.status.includes('Alert')
                        ? 'text-red-400'
                        : item.status.includes('Investigating')
                        ? 'text-amber-400'
                        : 'text-cyan-400'
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Activity */}
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-purple-400">SOURCE ACTIVITY</h3>
          </div>
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
            {sourceActivity.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-gray-300">{source.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{source.detections} detections</span>
                  <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                      style={{
                        width: `${(source.detections / sourceActivity[0].detections) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
