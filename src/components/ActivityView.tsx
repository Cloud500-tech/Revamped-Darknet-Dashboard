import { Activity, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const activityTimeline = [
  { time: '00:00', threats: 2, scans: 15 },
  { time: '03:00', threats: 1, scans: 12 },
  { time: '06:00', threats: 4, scans: 18 },
  { time: '09:00', threats: 7, scans: 25 },
  { time: '12:00', threats: 5, scans: 22 },
  { time: '15:00', threats: 6, scans: 20 },
  { time: '18:00', threats: 8, scans: 28 },
  { time: '21:00', threats: 4, scans: 19 },
];

const hourlyActivity = [
  { hour: '00:00', critical: 1, high: 2, medium: 3, low: 1 },
  { hour: '03:00', critical: 0, high: 1, medium: 2, low: 1 },
  { hour: '06:00', critical: 2, high: 3, medium: 4, low: 2 },
  { hour: '09:00', critical: 3, high: 4, medium: 5, low: 3 },
  { hour: '12:00', critical: 2, high: 3, medium: 3, low: 2 },
  { hour: '15:00', critical: 2, high: 4, medium: 4, low: 2 },
  { hour: '18:00', critical: 4, high: 5, medium: 6, low: 3 },
  { hour: '21:00', critical: 2, high: 3, medium: 3, low: 2 },
];

const recentActivity = [
  { time: '09:23:14', action: 'Critical leak detected', source: 'pastebin.com', user: 'System', status: 'Alert Sent' },
  { time: '09:18:42', action: 'API key exposure found', source: 'github.com', user: 'System', status: 'Investigating' },
  { time: '09:15:33', action: 'Financial data leak', source: 'darknet market', user: 'System', status: 'Alert Sent' },
  { time: '09:12:11', action: 'PII exposure detected', source: 'raidforums.com', user: 'Admin', status: 'Mitigated' },
  { time: '09:08:59', action: 'Medical records found', source: 'telegram', user: 'System', status: 'Reviewing' },
  { time: '09:05:27', action: 'Credit card data leak', source: 'onion site', user: 'Admin', status: 'Alert Sent' },
  { time: '09:02:15', action: 'Email list exposed', source: 'discord', user: 'System', status: 'Monitoring' },
  { time: '08:58:44', action: 'Public data indexed', source: 'pastebin.com', user: 'System', status: 'Archived' },
];

const sourceActivity = [
  { source: 'pastebin.com', detections: 145 },
  { source: 'github.com', detections: 98 },
  { source: 'darknet markets', detections: 87 },
  { source: 'raidforums', detections: 76 },
  { source: 'telegram', detections: 65 },
  { source: 'onion sites', detections: 54 },
];

export function ActivityView() {
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
              <p className="text-cyan-400">28</p>
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
              <p className="text-red-400">8.3</p>
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

      {/* Charts */}
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
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '11px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0e1a', 
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={2} />
              <Area type="monotone" dataKey="scans" stroke="#06b6d4" fillOpacity={1} fill="url(#colorScans)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Severity Distribution */}
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-red-400">HOURLY SEVERITY DISTRIBUTION</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" style={{ fontSize: '11px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0e1a', 
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="critical" stackId="a" fill="#dc2626" radius={[0, 0, 0, 0]} />
              <Bar dataKey="high" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
              <Bar dataKey="medium" stackId="a" fill="#eab308" radius={[0, 0, 0, 0]} />
              <Bar dataKey="low" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Source Activity */}
      <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
          <h3 className="text-sm tracking-wider text-amber-400">SOURCE ACTIVITY (24H)</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sourceActivity} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="source" stroke="#64748b" style={{ fontSize: '11px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0a0e1a', 
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="detections" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
          <h3 className="text-sm tracking-wider text-purple-400">RECENT ACTIVITY LOG</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/10">
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Time</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Action</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Source</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">User</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr 
                  key={index} 
                  className="border-b border-cyan-500/5 hover:bg-cyan-500/5 transition-colors"
                >
                  <td className="py-3 px-4 text-xs text-gray-400">{activity.time}</td>
                  <td className="py-3 px-4 text-xs text-gray-300">{activity.action}</td>
                  <td className="py-3 px-4 text-xs text-gray-400">{activity.source}</td>
                  <td className="py-3 px-4 text-xs text-gray-400">{activity.user}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      activity.status === 'Alert Sent' ? 'bg-red-500/20 text-red-400' :
                      activity.status === 'Investigating' ? 'bg-amber-500/20 text-amber-400' :
                      activity.status === 'Mitigated' ? 'bg-green-500/20 text-green-400' :
                      'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
