import { fmtSec } from '@/lib/utils/format';

export default function CategoryProgressList({ categories = [] }) {
  if (!categories.length) {
    return <p className="text-[var(--text-dim)] text-[13px] tracking-[2px]">暂无数据</p>;
  }

  const maxVal = Math.max(...categories.map(c => c.val || 0), 1);

  return (
    <div className="flex flex-col gap-3.5">
      {categories.slice(0, 8).map((c, i) => {
        const pct = Math.round((c.val || 0) / maxVal * 100);
        return (
          <div key={i}>
            <div className="flex justify-between items-center mb-1.5 text-[0.78em] font-light tracking-[0.10em]"
              style={{ fontSize: 'clamp(0.78rem,0.86vw,0.94rem)' }}>
              <span>{c.categoryTitle}</span>
              <span className="text-[var(--text-dim)] text-[0.6em] tracking-[0.12em]">
                {c.readingCount}本 · {fmtSec(c.readingTime || 0)}
              </span>
            </div>
            <div className="relative h-[3px] overflow-hidden shimmer-bar" style={{ background: 'rgba(202,212,198,0.28)' }}>
              <div
                className="h-full transition-[width] duration-[1s] ease-ink"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, var(--accent2), var(--accent))',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
