import BookCover from '@/components/common/BookCover';
import { fmtSec } from '@/lib/utils/format';

const RANK_STYLES = {
  1: 'bg-[#c8a84b] text-white',
  2: 'bg-[#9aacb8] text-white',
  3: 'bg-[#b07848] text-white',
};

export default function BookItem({ item, rank }) {
  const info   = item.book || item.albumInfo || {};
  const title  = info.title || info.name || '未知书籍';
  const author = info.author || info.authorName || '';
  const cover  = info.cover || '';
  const tags   = item.tags || [];

  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5 border border-transparent transition-all duration-300 hover:border-[var(--border-hair)] hover:translate-x-1"
      style={{ background: 'rgba(236,233,223,0.55)' }}>
      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-display text-[13px] flex-shrink-0 ${RANK_STYLES[rank] || 'bg-[var(--surface)] text-[var(--text-dim)] border border-[var(--border)]'}`}>
        {rank}
      </span>

      {cover && (
        <div className="flex-shrink-0 border border-[var(--border)] overflow-hidden" style={{ width: 'clamp(36px,3vw,52px)', height: 'clamp(48px,4vw,68px)' }}>
          <BookCover src={cover} alt={title} className="w-full h-full" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate" style={{ fontSize: 'clamp(0.82rem,0.92vw,1rem)' }}>{title}</div>
        <div className="text-[var(--text-dim)] mt-0.5 truncate" style={{ fontSize: 'clamp(0.73rem,0.8vw,0.88rem)' }}>{author}</div>
        {tags.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {tags.map((t, i) => (
              <span key={i} className="text-[0.64em] px-2 py-0.5 border border-[var(--border)] text-[var(--text-dim)] rounded-full" style={{ background: 'var(--surface)' }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-[var(--accent2)] font-semibold" style={{ fontSize: 'clamp(0.82rem,0.92vw,1rem)' }}>
          {fmtSec(item.readTime)}
        </div>
        <div className="text-[var(--text-dim)] mt-0.5 tracking-[0.08em]" style={{ fontSize: 'clamp(0.68rem,0.73vw,0.8rem)' }}>
          阅读时长
        </div>
      </div>
    </div>
  );
}
