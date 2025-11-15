import { Settings, Bell, Database, Shield, Scan, Globe, Clock, AlertCircle } from 'lucide-react';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

export function SettingsView() {
  return (
    <div className="px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-cyan-400" />
        <div>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            System Settings
          </h2>
          <p className="text-sm text-gray-500">Configure monitoring sources, alerts, and system preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Alert Configuration */}
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-red-400">ALERT CONFIGURATION</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive alerts via email</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Critical Alerts Only</p>
                <p className="text-xs text-gray-500">Filter non-critical notifications</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">SMS Alerts</p>
                <p className="text-xs text-gray-500">Send urgent alerts via SMS</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Slack Integration</p>
                <p className="text-xs text-gray-500">Post alerts to Slack channel</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="pt-4 border-t border-cyan-500/10">
              <label className="text-xs text-gray-500 mb-2 block">Alert Threshold</label>
              <div className="space-y-2">
                <Slider defaultValue={[7]} max={10} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low (1)</span>
                  <span>Current: 7</span>
                  <span>Critical (10)</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">Email Recipients</label>
              <Input 
                placeholder="admin@example.com, security@example.com" 
                className="bg-[#0a0e1a] border-gray-700/50 focus:border-red-500 focus:ring-red-500/20 text-gray-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Monitoring Sources */}
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-cyan-400">MONITORING SOURCES</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0e1a] border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-300">Pastebin.com</p>
                  <p className="text-xs text-gray-500">145 detections/day</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0e1a] border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-300">GitHub.com</p>
                  <p className="text-xs text-gray-500">98 detections/day</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0e1a] border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-300">Darknet Markets</p>
                  <p className="text-xs text-gray-500">87 detections/day</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0e1a] border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-300">Telegram Channels</p>
                  <p className="text-xs text-gray-500">65 detections/day</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0e1a] border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-300">Discord Servers</p>
                  <p className="text-xs text-gray-500">54 detections/day</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0a0e1a] border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-300">Onion Sites</p>
                  <p className="text-xs text-gray-500">43 detections/day</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Button className="w-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 mt-4">
              <Globe className="w-4 h-4 mr-2" />
              Add Custom Source
            </Button>
          </div>
        </div>

        {/* Scan Settings */}
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-amber-400">SCAN SETTINGS</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Scan Frequency</label>
              <Select defaultValue="15">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-amber-500 focus:ring-amber-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">Scan Depth</label>
              <Select defaultValue="medium">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-amber-500 focus:ring-amber-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Quick Scan</SelectItem>
                  <SelectItem value="medium">Medium Depth</SelectItem>
                  <SelectItem value="deep">Deep Scan</SelectItem>
                  <SelectItem value="exhaustive">Exhaustive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Auto-Quarantine</p>
                <p className="text-xs text-gray-500">Isolate critical threats automatically</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Pattern Learning</p>
                <p className="text-xs text-gray-500">AI-based threat detection</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">False Positive Filter</p>
                <p className="text-xs text-gray-500">Reduce noise in detections</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="pt-4 border-t border-cyan-500/10">
              <label className="text-xs text-gray-500 mb-2 block">Concurrent Scans</label>
              <div className="space-y-2">
                <Slider defaultValue={[8]} max={20} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>Current: 8</span>
                  <span>20</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Configuration */}
        <div className="bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-purple-400">SYSTEM CONFIGURATION</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Data Retention</label>
              <Select defaultValue="90">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-purple-500 focus:ring-purple-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="180">180 Days</SelectItem>
                  <SelectItem value="365">1 Year</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">Log Level</label>
              <Select defaultValue="info">
                <SelectTrigger className="bg-[#0a0e1a] border-gray-700/50 focus:border-purple-500 focus:ring-purple-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Auto-Backup</p>
                <p className="text-xs text-gray-500">Daily automated backups</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Enhanced security login</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">API Access</p>
                <p className="text-xs text-gray-500">Enable REST API endpoints</p>
              </div>
              <Switch />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">API Key</label>
              <div className="flex gap-2">
                <Input 
                  value="••••••••••••••••••••••••••••••" 
                  readOnly
                  className="bg-[#0a0e1a] border-gray-700/50 text-gray-400 text-sm"
                />
                <Button variant="outline" className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10">
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="col-span-2 bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border border-cyan-500/10 p-6 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
            <h3 className="text-sm tracking-wider text-green-400">DATABASE & PERFORMANCE</h3>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-[#0a0e1a] border border-cyan-500/10">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <p className="text-xs text-gray-500">Database Size</p>
              </div>
              <p className="text-cyan-400">47.8 GB</p>
              <div className="mt-2 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '47.8%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">47.8% of 100 GB</p>
            </div>

            <div className="p-4 rounded-lg bg-[#0a0e1a] border border-cyan-500/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-green-400" />
                <p className="text-xs text-gray-500">Query Performance</p>
              </div>
              <p className="text-green-400">42ms avg</p>
              <p className="text-xs text-gray-500 mt-2">Last 24 hours</p>
              <p className="text-xs text-green-400">↓ 12% faster</p>
            </div>

            <div className="p-4 rounded-lg bg-[#0a0e1a] border border-cyan-500/10">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <p className="text-xs text-gray-500">Cache Hit Rate</p>
              </div>
              <p className="text-amber-400">94.2%</p>
              <p className="text-xs text-gray-500 mt-2">Optimal performance</p>
              <p className="text-xs text-green-400">↑ 3.1% improvement</p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button className="flex-1 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20">
              <Database className="w-4 h-4 mr-2" />
              Optimize Database
            </Button>
            <Button className="flex-1 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20">
              <Clock className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            <Button className="flex-1 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20">
              <Shield className="w-4 h-4 mr-2" />
              Run Diagnostics
            </Button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" className="border-gray-700/50 text-gray-400 hover:bg-gray-700/20">
          Reset to Defaults
        </Button>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/20">
          <Settings className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
