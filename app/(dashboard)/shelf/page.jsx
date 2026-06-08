'use client';

import SectionHead from '@/components/common/SectionHead';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StatCard from '@/components/dashboard/StatCard';
import ShelfGrid from '@/components/dashboard/ShelfGrid';
import { useShelf } from '@/hooks/useShelf';

export default function ShelfPage() {
  const { data, isLoading, error } = useShelf();

  return (
    <>
      <SectionHead zh="我的书架" en="MY · BOOKSHELF" />

      {isLoading && <LoadingSpinner text="正在整理书架…" />}

      {error && (
        <p className="text-center py-16 text-[var(--rust)] tracking-widest">
          加载失败：{error}
        </p>
      )}

      {data && !isLoading && (
        <>
          <ShelfStatCards data={data} />
          <ShelfGrid books={data.books || []} albums={data.albums || []} />
        </>
      )}
    </>
  );
}

function ShelfStatCards({ data }) {
  const books    = data.books   || [];
  const albums   = data.albums  || [];
  const mp       = data.mp;
  const total    = books.length + albums.length + (mp ? 1 : 0);
  const finished = books.filter(b => b.finishReading === 1).length;

  const categories = {};
  books.forEach(b => {
    const info = b.book || b;
    const cat = info.category || b.category || '其他';
    categories[cat] = (categories[cat] || 0) + 1;
  });
  const topCat  = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
  const catCount = Object.keys(categories).length;

  const cards = [
    { value: String(total),    label: '书架总数',   sub: `电子书 ${books.length} · 有声书 ${albums.length}${mp ? ' · 文章1' : ''}`, accent: '#6b9c72', color: '#4a7a54', char: '架', countTo: total },
    { value: String(finished), label: '已读完',     sub: `完成率 ${books.length ? Math.round(finished / books.length * 100) : 0}%`, accent: '#8aac72', color: '#4a7a54', char: '完', countTo: finished },
    { value: String(catCount), label: '书籍分类数', sub: `最多：${topCat ? topCat[0] : '--'}`, accent: '#a8803a', color: '#a8803a', char: '类', countTo: catCount },
  ];

  return (
    <div className="grid grid-cols-3 gap-[clamp(10px,1.3vw,20px)] mb-[clamp(24px,2.4vw,40px)]">
      {cards.map((c, i) => <StatCard key={i} {...c} animDelay={i * 90} />)}
    </div>
  );
}
