import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ClippedAreaChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  dataKey: string;
  color?: string;
  valueFormatter?: (value: number) => string;
}

/** A single-metric area chart with a gradient fill that clips to transparent
 * toward the bottom — the "hero chart" look used across modern SaaS
 * dashboards, built on the recharts primitives already used elsewhere here. */
export const ClippedAreaChart = ({
  data,
  xKey,
  dataKey,
  color = "#E10600",
  valueFormatter,
}: ClippedAreaChartProps) => (
  <div className="h-72 w-full sm:h-80">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="clippedAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey={xKey}
          stroke="rgba(255,255,255,0.3)"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          stroke="rgba(255,255,255,0.3)"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
          formatter={(value: number) => (valueFormatter ? valueFormatter(value) : value)}
        />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} fill="url(#clippedAreaFill)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
