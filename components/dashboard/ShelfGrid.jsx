import BookCover from '@/components/common/BookCover';

export default function ShelfGrid({ books, albums }) {
  const sorted = [...books].sort((a, b) => (b.readUpdateTime || 0) - (a.readUpdateTime || 0));

  return (
    <div className="grid gap-[clamp(16px,1.6vw,28px)]"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(110px,10vw,160px),1fr))' }}>
      {sorted.map((b, i) => (
        <BookTile key={b.bookId || i} title={b.title} author={b.author} cover={b.cover} finished={b.finishReading === 1} delay={i * 28} />
      ))}
      {albums.map((a, i) => {
        const info = a.albumInfo || {};
        return (
          <BookTile key={a.albumId || i} title={info.name} author={`🎧 ${info.authorName || ''}`} cover={info.cover} delay={(sorted.length + i) * 28} />
        );
      })}
    </div>
  );
}

function BookTile({ title, author, cover, finished, delay }) {
  return (
    <div className="cursor-pointer text-center transition-transform duration-300 ease-spring hover:-translate-y-1.5 animate-shelf-reveal"
      style={{ animationDelay: `${delay}ms` }}
      title={title}>
      <div className="w-full border border-[var(--border)]" style={{ aspectRatio: '2/3', boxShadow: '3px 5px 16px rgba(26,40,24,0.13), 1px 2px 0 rgba(255,255,255,0.5)', background: 'var(--surface2)' }}>
        <BookCover src={cover} alt={title} className="w-full h-full" />
      </div>
      <div className="mt-1.5 truncate" style={{ fontSize: 'clamp(0.72rem,0.82vw,0.92rem)' }}>{title}</div>
      <div className="text-[var(--text-dim)] mt-0.5 truncate" style={{ fontSize: 'clamp(0.65rem,0.72vw,0.8rem)' }}>{author}</div>
      {finished && (
        <span className="inline-block mt-1 px-2.5 py-0.5 border border-[var(--accent)] text-[var(--accent2)] rounded-full tracking-[0.08em]"
          style={{ background: 'rgba(107,156,114,0.09)', fontSize: 'clamp(0.6rem,0.65vw,0.75rem)' }}>
          已读完
        </span>
      )}
    </div>
  );
}
