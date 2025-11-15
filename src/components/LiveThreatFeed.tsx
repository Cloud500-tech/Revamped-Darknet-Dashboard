import { AlertTriangle } from 'lucide-react';

const threatData = [
  { timestamp: '2025-11-08 09:23:14', ipAddress: '192.168.1.100', severity: 'Critical', source: 'pastebin.com', type: 'Credential Leak', size: '2.3GB', alert: 10 },
  { timestamp: '2025-11-08 09:18:42', ipAddress: '10.0.0.25', severity: 'High', source: 'github.com', type: 'API Key', size: '45MB', alert: 9 },
  { timestamp: '2025-11-08 09:15:33', ipAddress: '172.16.0.50', severity: 'Critical', source: 'darknet market', type: 'Financial Data', size: '1.8GB', alert: 10 },
  { timestamp: '2025-11-08 09:12:11', ipAddress: '203.0.113.78', severity: 'High', source: 'raidforums.com', type: 'PII', size: '890MB', alert: 8 },
  { timestamp: '2025-11-08 09:08:59', ipAddress: '198.51.100.42', severity: 'Medium', source: 'telegram', type: 'Medical Records', size: '340MB', alert: 6 },
  { timestamp: '2025-11-08 09:05:27', ipAddress: '192.0.2.156', severity: 'High', source: 'onion site', type: 'Credit Cards', size: '156MB', alert: 9 },
  { timestamp: '2025-11-08 09:02:15', ipAddress: '203.0.113.201', severity: 'Medium', source: 'discord', type: 'Email List', size: '78MB', alert: 5 },
  { timestamp: '2025-11-08 08:58:44', ipAddress: '198.51.100.89', severity: 'Low', source: 'pastebin.com', type: 'Public Data', size: '23MB', alert: 3 },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'High':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Low':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getSeverityBg = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-500/5 border-red-500/10';
    case 'High':
      return 'bg-amber-500/5 border-amber-500/10';
    case 'Medium':
      return 'bg-yellow-500/5 border-yellow-500/10';
    case 'Low':
      return 'bg-green-500/5 border-green-500/10';
    default:
      return 'bg-gray-500/5 border-gray-500/10';
  }
};

export function LiveThreatFeed() {
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
            {threatData.map((threat, index) => (
              <tr 
                key={index} 
                className={`border-b border-cyan-500/5 hover:bg-cyan-500/5 transition-colors ${getSeverityBg(threat.severity)}`}
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
                    {threat.alert >= 9 && (
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                    )}
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
          <span className="text-xs text-gray-500">Page 1 of 3</span>
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
