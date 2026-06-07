'use client';

import { useState } from 'react';
import SectionHead from '@/components/common/SectionHead';
import PeriodSelector from '@/components/common/PeriodSelector';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StatCard from '@/components/dashboard/StatCard';
import ReadingTimeChart from '@/components/charts/ReadingTimeChart';
import TimePreferenceChart from '@/components/charts/TimePreferenceChart';
import CategoryProgressList from '@/components/charts/CategoryProgressList';
import BookItem from '@/components/dashboard/BookItem';
import { useReadingData } from '@/hooks/useReadingData';

export default function OverviewPage() {
  const [period, setPeriod] = useState('monthly');
  const { data, isLoading, error } = useReadingData(period);

  return (
    <>
      <SectionHead zh="读书概览" en="READING · OVERVIEW" />
      <PeriodSelector value={period} onChange={setPeriod} />

      {isLoading && <LoadingSpinner text="正在翻阅书页…" />}

      {error && (
        <p className="text-center py-16 text-[var(--rust)] tracking-widest">
          加载失败：{error}
        </p>
      )}

      {data && !isLoading && (
        <>
          <StatCards data={data} period={period} />

          <div className="grid gap-[clamp(14px,1.4vw,24px)] grid-cols-1 lg:grid-cols-2 mb-7">
            <ChartCard title="阅读时长分布" badge={timeBadge(period)}>
              <ReadingTimeChart data={data} period={period} />
            </ChartCard>
            <ChartCard title="阅读时段偏好" badge={data.preferTimeWord}>
              <TimePreferenceChart data={data} />
            </ChartCard>
          </div>

          <div className="grid gap-[clamp(14px,1.4vw,24px)] grid-cols-1 lg:grid-cols-2">
            <ChartCard title="偏好分类" badge={data.preferCategoryWord}>
              <CategoryProgressList categories={data.preferCategory} />
            </ChartCard>
            <ChartCard title="阅读时长排行" badge="Top 5">
              <div className="flex flex-col gap-2">
                {(data.readLongest || []).slice(0, 5).map((item, i) => (
                  <BookItem key={i} item={item} rank={i + 1} />
                ))}
              </div>
            </ChartCard>
          </div>
        </>
      )}
    </>
  );
}

function StatCards({ data, period }) {
  const { fmtSec } = require('@/lib/utils/format');

  const totalSec  = data.totalReadTime || 0;
  const days      = data.readDays || 0;
  const avgSec    = data.dayAverageReadTime || 0;
  const readStat  = data.readStat || [];
  const compare   = data.compare;

  const readDone = readStat.find(s => s.stat === '读完')?.counts ?? '--';
  const readOver = readStat.find(s => s.stat === '读过')?.counts ?? '--';
  const noteVal  = readStat.find(s => s.stat === '笔记')?.counts ?? '--';

  const compareEl = compare !== undefined && compare !== null
    ? <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.72em] ${compare >= 0 ? 'bg-[rgba(107,156,114,0.12)] text-[var(--accent2)]' : 'bg-[rgba(158,90,58,0.10)] text-[var(--rust)]'}`}>
        {compare >= 0 ? '↑' : '↓'} {Math.abs(Math.round(compare * 100))}% 较上期
      </span>
    : null;

  const cards = [
    { value: fmtSec(totalSec), label: '总阅读时长', sub: compareEl, accent: '#6b9c72', color: '#4a7a54', char: '時' },
    { value: `${days} 天`,     label: '有效阅读天数', sub: period !== 'overall' ? `日均 ${fmtSec(avgSec)}` : '', accent: '#8aac72', color: '#4a7a54', char: '日' },
    { value: readOver,          label: '读过书籍',  sub: `已读完 ${readDone}`, accent: '#a8803a', color: '#a8803a', char: '書' },
    { value: noteVal,           label: '笔记总数',  sub: '',                   accent: '#9e5a3a', color: '#9e5a3a', char: '記' },
  ];

  return (
    <div className="grid gap-[clamp(12px,1.3vw,20px)] mb-[clamp(24px,2.4vw,40px)]"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px,16vw,260px),1fr))' }}>
      {cards.map((c, i) => (
        <StatCard key={i} {...c} animDelay={i * 90} />
      ))}
    </div>
  );
}

function ChartCard({ title, badge, children }) {
  return (
    <div className="relative border border-[var(--border-hair)] p-[clamp(22px,2.2vw,38px)_clamp(24px,2.4vw,44px)]"
      style={{ background: 'rgba(250,248,242,0.78)', backdropFilter: 'blur(10px)' }}>
      {/* 四角窗棂装饰 */}
      <span className="absolute top-2.5 left-2.5 w-5 h-5 border-t border-l border-[rgba(107,156,114,0.4)] pointer-events-none" />
      <span className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b border-r border-[rgba(107,156,114,0.4)] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 pb-3.5 border-b border-[var(--border-hair)]">
        <h3 className="font-display tracking-[0.25em] text-[var(--ink)]" style={{ fontSize: 'clamp(1.05rem,1.2vw,1.4rem)' }}>{title}</h3>
        {badge && <span className="text-[0.66em] text-[var(--text-dim)] tracking-[0.18em] bg-[rgba(234,229,223,0.70)] px-3 py-0.5 rounded-full border border-[var(--border-hair)]">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

function timeBadge(period) {
  return { monthly: '按天', weekly: '按天（分钟）', annually: '按月', overall: '按年' }[period] || '按天';
}
