'use client';

import { fmtTs } from '@/lib/utils/format';

/* colorStyle → left-border color */
const COLOR_MAP = { 1: '#f0d94a', 2: '#e88a8a', 3: '#7ab8e8', 4: '#d9a0d9' };

function groupHighlightsByChapter(highlights, chapterMap) {
  const groups = {};
  const order = [];
  highlights.forEach(h => {
    const uid = h.chapterUid;
    if (!groups[uid]) {
      groups[uid] = { title: chapterMap[uid] || '未知章节', items: [] };
      order.push(uid);
    }
    groups[uid].items.push(h);
  });
  return order.map(uid => groups[uid]);
}

function groupReviewsByChapter(reviews) {
  const groups = {};
  const order = [];
  reviews.forEach(r => {
    const rv = r.review || {};
    const key = rv.chapterName || '__book__';
    if (!groups[key]) { groups[key] = []; order.push(key); }
    groups[key].push(rv);
  });
  return { groups, order };
}

export default function BookNotesContent({ bmData, reviews, error }) {
  if (error) {
    return (
      <p className="py-6 text-center text-[var(--rust)] text-xs tracking-widest">
        加载失败：{error}
      </p>
    );
  }

  const highlights = bmData?.updated || [];
  const chapters   = bmData?.chapters || [];
  const chapterMap = Object.fromEntries(chapters.map(c => [c.chapterUid, c.title]));
  const hlGroups   = groupHighlightsByChapter(highlights, chapterMap);
  const { groups: rvGroups, order: rvOrder } = groupReviewsByChapter(reviews || []);

  if (hlGroups.length === 0 && rvOrder.length === 0) {
    return (
      <p className="py-6 text-center text-[var(--text-dim)] text-xs tracking-[0.24em]">
        暂无笔记内容
      </p>
    );
  }

  return (
    <div className="py-5 space-y-7">

      {/* ── 划线 ── */}
      {hlGroups.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.64rem] tracking-[0.28em] text-[var(--text-dim)] uppercase">
              划 线
            </span>
            <span className="text-[0.62rem] text-[var(--text-dim)] bg-[rgba(74,122,84,0.10)] px-2 py-0.5 rounded-full">
              {highlights.length} 条
            </span>
          </div>

          <div className="space-y-5">
            {hlGroups.map((g, gi) => (
              <div key={gi}>
                <div className="text-[0.70rem] tracking-[0.16em] text-[var(--ink)] opacity-60 mb-2 font-medium">
                  {g.title}
                </div>
                <div className="space-y-2.5 pl-1">
                  {g.items.map((h, hi) => (
                    <div
                      key={hi}
                      className="border-l-[3px] pl-3.5 py-0.5"
                      style={{ borderColor: COLOR_MAP[h.colorStyle] || '#c8bfa8' }}
                    >
                      <p className="text-[0.84rem] leading-relaxed text-[var(--ink)] font-light">
                        {h.markText}
                      </p>
                      <time className="text-[0.60rem] text-[var(--text-dim)] mt-1 block">
                        {fmtTs(h.createTime)}
                      </time>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 想法 / 点评 ── */}
      {rvOrder.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.64rem] tracking-[0.28em] text-[var(--text-dim)] uppercase">
              想法 · 点评
            </span>
            <span className="text-[0.62rem] text-[var(--text-dim)] bg-[rgba(168,128,58,0.12)] px-2 py-0.5 rounded-full">
              {(reviews || []).length} 条
            </span>
          </div>

          <div className="space-y-5">
            {rvOrder.map((key, ki) => (
              <div key={ki}>
                {key !== '__book__' && (
                  <div className="text-[0.70rem] tracking-[0.16em] text-[var(--ink)] opacity-60 mb-2 font-medium">
                    {key}
                  </div>
                )}
                {key === '__book__' && rvOrder.length > 1 && (
                  <div className="text-[0.70rem] tracking-[0.16em] text-[var(--ink)] opacity-60 mb-2 font-medium">
                    整本书评
                  </div>
                )}
                <div className="space-y-2.5 pl-1">
                  {rvGroups[key].map((rv, ri) => (
                    <div
                      key={ri}
                      className="border-l-[3px] border-[rgba(168,128,58,0.45)] pl-3.5 py-0.5"
                    >
                      {rv.star > 0 && (
                        <div className="text-[0.64rem] text-[#a8803a] mb-1 tracking-widest">
                          {'★'.repeat(rv.star)}{'☆'.repeat(5 - rv.star)}
                        </div>
                      )}
                      <p className="text-[0.84rem] leading-relaxed text-[var(--ink)] font-light">
                        {rv.content}
                      </p>
                      <time className="text-[0.60rem] text-[var(--text-dim)] mt-1 block">
                        {fmtTs(rv.createTime)}
                      </time>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
