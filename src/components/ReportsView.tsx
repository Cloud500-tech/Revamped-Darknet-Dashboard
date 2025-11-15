import { FileText, Download, Calendar, Filter, TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const reports = [
  {
    id: 'RPT-2025-001',
    title: 'Weekly Threat Intelligence Summary',
    date: '2025-11-08',
    type: 'Weekly',
    threats: 156,
    critical: 12,
    status: 'Completed',
    size: '2.4 MB'
  },
  {
    id: 'RPT-2025-002',
    title: 'Critical Credential Leaks - Q1 2025',
    date: '2025-11-01',
    type: 'Quarterly',
    threats: 487,
    critical: 45,
    status: 'Completed',
    size: '8.7 MB'
  },
  {
    id: 'RPT-2025-003',
    title: 'Darknet Market Activity Analysis',
    date: '2025-10-28',
    type: 'Custom',
    threats: 234,
    critical: 23,
    status: 'Completed',
    size: '5.2 MB'
  },
  {
    id: 'RPT-2025-004',
    title: 'API Key Exposure Assessment',
    date: '2025-10-21',
    type: 'Monthly',
    threats: 98,
    critical: 8,
    status: 'Completed',
    size: '1.8 MB'
  },
  {
    id: 'RPT-2025-005',
    title: 'PII Leak Detection Report',
    date: '2025-10-15',
    type: 'Weekly',
    threats: 145,
    critical: 15,
    status: 'Completed',
    size: '3.1 MB'
  },
  {
    id: 'RPT-2025-006',
    title: 'Financial Data Breach Analysis',
    date: '2025-10-08',
    type: 'Custom',
    threats: 67,
    critical: 19,
    status: 'Archived',
    size: '4.5 MB'
  },
];

const quickStats = [
  { label: 'Total Reports', value: '124', icon: FileText, color: 'cyan' },
  { label: 'This Month', value: '18', icon: Calendar, color: 'amber' },
  { label: 'Total Threats Analyzed', value: '12,487', icon: AlertTriangle, color: 'red' },
  { label: 'Avg. Response Time', value: '3.2h', icon: TrendingUp, color: 'green' },
];

export function ReportsView() {
  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-cyan-400" />
          <div>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Reports & Analytics
            </h2>
            <p className="text-sm text-gray-500">Generate and download threat intelligence reports</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/20">
          <Download className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorMap = {
            cyan: 'from-cyan-500 to-cyan-600',
            amber: 'from-amber-500 to-amber-600',
            red: 'from-red-500 to-red-600',
            green: 'from-green-500 to-green-600',
          };
          return (
            <div key={index} className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-cyan-400">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-4 shadow-xl mb-6">
        <div className="flex items-center gap-4">
          <Filter className="w-4 h-4 text-cyan-400" />
          <div className="flex-1 grid grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Report Type</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-cyan-500 focus:ring-cyan-500/20 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Status</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-cyan-500 focus:ring-cyan-500/20 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Date Range</label>
              <Select defaultValue="30">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-cyan-500 focus:ring-cyan-500/20 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Sort By</label>
              <Select defaultValue="date">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-cyan-500 focus:ring-cyan-500/20 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest)</SelectItem>
                  <SelectItem value="threats">Threat Count</SelectItem>
                  <SelectItem value="critical">Critical Severity</SelectItem>
                  <SelectItem value="size">File Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full"></div>
          <h3 className="text-sm tracking-wider text-cyan-400">GENERATED REPORTS</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/10">
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Report ID</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Title</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Date</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Type</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Threats</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Critical</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Status</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Size</th>
                <th className="text-left py-3 px-4 text-xs tracking-wider text-cyan-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr 
                  key={index} 
                  className="border-b border-cyan-500/5 hover:bg-cyan-500/5 transition-colors"
                >
                  <td className="py-3 px-4 text-xs text-cyan-400">{report.id}</td>
                  <td className="py-3 px-4 text-xs text-gray-300">{report.title}</td>
                  <td className="py-3 px-4 text-xs text-gray-400">{report.date}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">{report.threats}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-red-400">{report.critical}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs border ${
                      report.status === 'Completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      report.status === 'Processing' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                      'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">{report.size}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-cyan-400 hover:text-cyan-300 transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-300 transition-colors" title="View Details">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Templates */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm text-red-400">Critical Threats</h4>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs border-red-500/20 text-red-400 hover:bg-red-500/10">
            Generate Report
          </Button>
        </div>

        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm text-cyan-400">Security Overview</h4>
              <p className="text-xs text-gray-500">Monthly summary</p>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10">
            Generate Report
          </Button>
        </div>

        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm text-amber-400">Trend Analysis</h4>
              <p className="text-xs text-gray-500">Quarterly review</p>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs border-amber-500/20 text-amber-400 hover:bg-amber-500/10">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}
