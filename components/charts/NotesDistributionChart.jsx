'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { INK, CHART_STYLE } from '@/lib/utils/chartConfig';

export default function NotesDistributionChart({ books }) {
  const chartData = books.map(b => ({
    name: (b.book?.title || '未知').slice(0, 10),
    划线: b.noteCount     || 0,
    想法: b.reviewCount   || 0,
    书签: b.bookmarkCount || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={INK.gridColor} />
        <XAxis dataKey="name" tick={{ fill: INK.tickColor, ...CHART_STYLE }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: INK.tickColor, ...CHART_STYLE }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ fontFamily: CHART_STYLE.fontFamily, fontSize: 12, border: '1px solid var(--border)', borderRadius: 0, background: 'var(--surface)' }} />
        <Legend wrapperStyle={{ fontFamily: CHART_STYLE.fontFamily, fontSize: 12, color: INK.tickColor }} />
        <Bar dataKey="划线" stackId="a" fill={INK.highlight}  radius={[0, 0, 0, 0]} />
        <Bar dataKey="想法" stackId="a" fill={INK.review}     radius={[0, 0, 0, 0]} />
        <Bar dataKey="书签" stackId="a" fill={INK.bookmark}   radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
