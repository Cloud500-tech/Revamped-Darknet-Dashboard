import { Shield } from 'lucide-react';

const riskData = [
  { domain: 'corporate.example.com', numLeaks: 3, riskScore: 92, riskLevel: 'Critical', lastSeen: '2025-11-08 09:23:14 (UTC)' },
  { domain: 'staging.testsite.com', numLeaks: 2, riskScore: 85, riskLevel: 'High', lastSeen: '2025-11-08 08:45:22 (UTC)' },
  { domain: 'api.service.io', numLeaks: 1, riskScore: 78, riskLevel: 'High', lastSeen: '2025-11-08 07:12:33 (UTC)' },
  { domain: 'dev.internal.net', numLeaks: 4, riskScore: 73, riskLevel: 'Medium', lastSeen: '2025-11-08 06:58:11 (UTC)' },
  { domain: 'prod.application.com', numLeaks: 2, riskScore: 68, riskLevel: 'Medium', lastSeen: '2025-11-07 23:45:09 (UTC)' },
  { domain: 'backup.storage.cloud', numLeaks: 1, riskScore: 52, riskLevel: 'Low', lastSeen: '2025-11-07 18:22:47 (UTC)' },
  { domain: 'test.playground.dev', numLeaks: 1, riskScore: 45, riskLevel: 'Low', lastSeen: '2025-11-07 15:30:18 (UTC)' },
  { domain: 'demo.sample.online', numLeaks: 1, riskScore: 38, riskLevel: 'Low', lastSeen: '2025-11-07 12:11:55 (UTC)' },
];

const getRiskLevelColor = (riskLevel: string) => {
  switch (riskLevel) {
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

const getRiskBg = (riskLevel: string) => {
  switch (riskLevel) {
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

const getRiskScoreColor = (score: number) => {
  if (score >= 80) return 'text-red-400';
  if (score >= 60) return 'text-amber-400';
  if (score >= 40) return 'text-yellow-400';
  return 'text-green-400';
};

export function RiskAssessment() {
  return (
    <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl shadow-black/20 mb-6 hover:border-cyan-500/30 transition-all">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
        <h3 className="text-sm tracking-wider text-purple-400">AFFECTED DOMAINS & RISK ASSESSMENT</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/10">
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Domain</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Number of Leaks</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Risk Score</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Risk Level</th>
              <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {riskData.map((risk, index) => (
              <tr 
                key={index} 
                className={`border-b border-cyan-500/5 hover:bg-cyan-500/5 transition-colors ${getRiskBg(risk.riskLevel)}`}
              >
                <td className="py-3 px-4 text-xs text-gray-300">{risk.domain}</td>
                <td className="py-3 px-4 text-xs text-gray-400">{risk.numLeaks}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getRiskScoreColor(risk.riskScore)}`}
                        style={{ 
                          width: `${risk.riskScore}%`,
                          background: risk.riskScore >= 80 ? '#f87171' : risk.riskScore >= 60 ? '#fbbf24' : risk.riskScore >= 40 ? '#fde047' : '#4ade80'
                        }}
                      ></div>
                    </div>
                    <span className={`text-xs ${getRiskScoreColor(risk.riskScore)}`}>{risk.riskScore}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs border ${getRiskLevelColor(risk.riskLevel)}`}>
                    {risk.riskLevel}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-gray-400">{risk.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-cyan-500/10">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded bg-purple-500/10 text-purple-400 text-xs hover:bg-purple-500/20 transition-colors border border-purple-500/20">
            ← Prev
          </button>
          <span className="text-xs text-gray-500">Page 1 of 2</span>
          <button className="px-3 py-1 rounded bg-purple-500/10 text-purple-400 text-xs hover:bg-purple-500/20 transition-colors border border-purple-500/20">
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
