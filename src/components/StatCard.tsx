import { LucideIcon } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Info } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: 'red' | 'amber' | 'cyan' | 'green';
  trend?: string;
  tooltip?: string;
}

const colorMap = {
  red: {
    gradient: 'from-red-500 to-red-600',
    glow: 'shadow-red-500/20',
    border: 'border-red-500/20',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  amber: {
    gradient: 'from-amber-500 to-amber-600',
    glow: 'shadow-amber-500/20',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  cyan: {
    gradient: 'from-cyan-500 to-cyan-600',
    glow: 'shadow-cyan-500/20',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  green: {
    gradient: 'from-green-500 to-green-600',
    glow: 'shadow-green-500/20',
    border: 'border-green-500/20',
    text: 'text-green-400',
    bg: 'bg-green-500/10',
  },
};

export function StatCard({ label, value, icon: Icon, color, trend, tooltip }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div className={`relative bg-gradient-to-br from-[#0f1420] to-[#0a0e1a] rounded-xl border ${colors.border} p-6 shadow-xl ${colors.glow} hover:border-opacity-50 transition-all group`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg ${colors.glow}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {tooltip && (
          <UITooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-500 hover:text-cyan-400 transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#0a0e1a] border-cyan-500/20">
              <p className="text-xs max-w-xs">{tooltip}</p>
            </TooltipContent>
          </UITooltip>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 tracking-wider">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className={`${colors.text}`}>{value}</span>
          {trend && (
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
              {trend}
            </span>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
}
