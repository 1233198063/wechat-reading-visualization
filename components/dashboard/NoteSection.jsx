'use client';

import BookCover from '@/components/common/BookCover';
import NotesDistributionChart from '@/components/charts/NotesDistributionChart';

export default function NoteSection({ books }) {
  let total = 0, highlights = 0, reviews = 0, bookmarks = 0;
  books.forEach(b => {
    highlights += b.noteCount     || 0;
    reviews    += b.reviewCount   || 0;
    bookmarks  += b.bookmarkCount || 0;
    total      += (b.noteCount || 0) + (b.reviewCount || 0) + (b.bookmarkCount || 0);
  });

  const stats = [
    [total,        '笔记总数'],
    [highlights,   '划线数'],
    [reviews,      '想法 / 点评'],
    [bookmarks,    '书签数'],
    [books.length, '有笔记书籍'],
  ];

  const sorted = [...books].sort((a, b) =>
    ((b.reviewCount || 0) + (b.noteCount || 0) + (b.bookmarkCount || 0)) -
    ((a.reviewCount || 0) + (a.noteCount || 0) + (a.bookmarkCount || 0))
  );

  return (
    <>
      {/* 概览统计 */}
      <div className="grid gap-3.5 mb-6"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))' }}>
        {stats.map(([v, l], i) => (
          <div key={i} className="relative text-center overflow-hidden border border-[var(--border-hair)] p-[clamp(18px,1.8vw,28px)_clamp(16px,1.6vw,24px)] transition-all duration-300 hover:-translate-y-0.5 animate-ink-fade-up"
            style={{ background: 'rgba(250,248,242,0.82)', backdropFilter: 'blur(10px)', animationDelay: `${i * 65}ms` }}>
            <span className="absolute bottom-0 left-0 right-0 h-0.5 opacity-70 bg-gradient-to-r from-transparent via-[var(--accent2)] to-transparent" />
            <div className="font-display text-[var(--accent2)] leading-none" style={{ fontSize: 'clamp(1.8rem,2.2vw,2.8rem)' }}>{v}</div>
            <div className="text-[var(--text-dim)] font-light mt-2 tracking-[0.28em]" style={{ fontSize: 'clamp(0.60rem,0.66vw,0.72rem)' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Top 10 分布图 */}
      <div className="relative border border-[var(--border-hair)] p-[clamp(22px,2.2vw,38px)_clamp(24px,2.4vw,44px)] mb-5"
        style={{ background: 'rgba(250,248,242,0.78)', backdropFilter: 'blur(10px)' }}>
        <span className="absolute top-2.5 left-2.5 w-5 h-5 border-t border-l border-[rgba(107,156,114,0.4)] pointer-events-none" />
        <span className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b border-r border-[rgba(107,156,114,0.4)] pointer-events-none" />
        <div className="flex justify-between items-center mb-6 pb-3.5 border-b border-[var(--border-hair)]">
          <h3 className="font-display tracking-[0.25em] text-[var(--ink)]" style={{ fontSize: 'clamp(1.05rem,1.2vw,1.4rem)' }}>笔记分布</h3>
          <span className="text-[0.66em] text-[var(--text-dim)] tracking-[0.18em] bg-[rgba(234,229,223,0.70)] px-3 py-0.5 rounded-full border border-[var(--border-hair)]">Top 10 书籍</span>
        </div>
        <div style={{ height: 260 }}>
          <NotesDistributionChart books={sorted.slice(0, 10)} />
        </div>
      </div>

      {/* 书籍列表 */}
      <div className="flex flex-col gap-2">
        {sorted.slice(0, 20).map((b, i) => {
          const info = b.book || {};
          return (
            <div key={i} className="flex items-center gap-3.5 border border-[var(--border-hair)] px-5 py-3.5 transition-all duration-300 hover:translate-x-1 hover:border-[rgba(107,156,114,0.38)] animate-ink-slide-right"
              style={{ background: 'rgba(250,248,242,0.75)', animationDelay: `${i * 40}ms` }}>
              {info.cover && (
                <div className="flex-shrink-0 border border-[var(--border)] overflow-hidden" style={{ width: 36, height: 48 }}>
                  <BookCover src={info.cover} alt={info.title || ''} className="w-full h-full" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate" style={{ fontSize: 'clamp(0.82rem,0.92vw,1rem)' }}>{info.title || '未知'}</div>
                <div className="text-[var(--text-dim)] mt-0.5" style={{ fontSize: 'clamp(0.73rem,0.8vw,0.88rem)' }}>{info.author || ''}</div>
              </div>
              <div className="flex gap-[clamp(12px,1.2vw,20px)] flex-shrink-0">
                <NoteCount val={b.noteCount     || 0} label="划线" color="#4a7a54" />
                <NoteCount val={b.reviewCount   || 0} label="想法" color="#a8803a" />
                <NoteCount val={b.bookmarkCount || 0} label="书签" color="#9e5a3a" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function NoteCount({ val, label, color }) {
  return (
    <div className="text-center text-[var(--text-dim)] tracking-[0.08em]" style={{ fontSize: 'clamp(0.7rem,0.78vw,0.86rem)' }}>
      <span className="block font-display" style={{ fontSize: 'clamp(1rem,1.2vw,1.4rem)', color }}>{val}</span>
      {label}
    </div>
  );
}
