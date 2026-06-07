'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { INK, CHART_STYLE } from '@/lib/utils/chartConfig';
import { fmtSec } from '@/lib/utils/format';

export default function TimePreferenceChart({ data }) {
  const pt = data.preferTime;
  if (!pt?.length) {
    return (
      <div className="flex items-center justify-center h-[220px] text-[var(--text-dim)] text-center"
        style={{ fontSize: 'clamp(0.72rem,0.82vw,0.9rem)' }}>
        <span>
          时段偏好仅在「全部」模式下可用<br />
          <span className="opacity-60 text-[0.88em]">切换至全部即可查看</span>
        </span>
      </div>
    );
  }

  const hours     = Array.from({ length: 24 }, (_, i) => (i + 6) % 24);
  const chartData = hours.map((h, i) => ({
    label: `${String(h).padStart(2, '0')}:00`,
    minutes: Math.round((pt[i] || 0) / 60),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#6b9c72" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#6b9c72" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={INK.gridColor} />
        <XAxis dataKey="label" tick={{ fill: INK.tickColor, ...CHART_STYLE }} axisLine={false} tickLine={false}
          interval={2} />
        <YAxis tick={{ fill: INK.tickColor, ...CHART_STYLE }} axisLine={false} tickLine={false} tickFormatter={v => `${v}m`} />
        <Tooltip
          formatter={(v) => [fmtSec(v * 60), '阅读时长']}
          contentStyle={{ fontFamily: CHART_STYLE.fontFamily, fontSize: 12, border: '1px solid var(--border)', borderRadius: 0, background: 'var(--surface)' }}
        />
        <Area type="monotone" dataKey="minutes" stroke={INK.line} strokeWidth={2} fill="url(#lineFill)" dot={false} activeDot={{ r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
