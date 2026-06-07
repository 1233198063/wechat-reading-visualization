'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { INK, CHART_STYLE } from '@/lib/utils/chartConfig';
import { fmtSec } from '@/lib/utils/format';

export default function ReadingTimeChart({ data, period }) {
  const rt      = data.readTimes || {};
  const entries = Object.entries(rt).sort((a, b) => +a[0] - +b[0]);
  if (!entries.length) return null;

  const chartData = entries.map(([ts, v]) => ({
    label: formatLabel(ts, period),
    minutes: Math.round(v / 60),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={INK.gridColor} />
        <XAxis dataKey="label" tick={{ fill: INK.tickColor, ...CHART_STYLE }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: INK.tickColor, ...CHART_STYLE }} axisLine={false} tickLine={false} tickFormatter={v => `${v}m`} />
        <Tooltip
          formatter={(v) => [fmtSec(v * 60), '阅读时长']}
          contentStyle={{ fontFamily: CHART_STYLE.fontFamily, fontSize: 12, border: '1px solid var(--border)', borderRadius: 0, background: 'var(--surface)' }}
        />
        <Bar dataKey="minutes" fill={INK.bar} stroke={INK.barBorder} strokeWidth={1.5} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function formatLabel(ts, period) {
  const d = new Date(+ts * 1000);
  if (period === 'overall')  return String(d.getFullYear());
  if (period === 'annually') return `${d.getMonth() + 1}月`;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
