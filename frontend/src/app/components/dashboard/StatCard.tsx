import { type LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  suffix?: string;
  trend?: string;
  trendPositive?: boolean;
}

export const StatCard = ({ icon: Icon, label, value, suffix, trend, trendPositive }: StatCardProps) => (
  <div className="rounded-2xl border border-complexo-light/10 bg-complexo-surface p-5">
    <div className="flex items-center justify-between">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-complexo-red/10 text-complexo-red">
        <Icon className="h-5 w-5" />
      </span>
      {trend && (
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            trendPositive ? "text-emerald-500" : "text-red-400"
          }`}
        >
          {trendPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}
        </span>
      )}
    </div>
    <p className="mt-4 text-sm text-complexo-muted">{label}</p>
    <div className="mt-1 flex items-baseline gap-1">
      <span className="font-rajdhani text-3xl font-bold text-complexo-light">{value}</span>
      {suffix && <span className="text-sm font-semibold text-complexo-muted">{suffix}</span>}
    </div>
  </div>
);
