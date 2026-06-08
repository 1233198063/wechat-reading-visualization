const SKILL_VERSION = '2.0.0';

/* WeRead API client — calls our local Next.js proxy at /api/weread */
export async function wereadCall(apiKey, body) {
  const res = await fetch('/api/weread', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ ...body, skill_version: SKILL_VERSION }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  if (data.errcode && data.errcode !== 0) {
    throw new Error(data.errmsg || `errcode ${data.errcode}`);
  }
  return data;
}

export async function fetchReadingData(apiKey, mode) {
  return wereadCall(apiKey, { api_name: '/readdata/detail', mode });
}

export async function fetchShelf(apiKey) {
  return wereadCall(apiKey, { api_name: '/shelf/sync' });
}

export async function fetchNotebooks(apiKey, lastSort) {
  const params = { api_name: '/user/notebooks', count: 50 };
  if (lastSort) params.lastSort = lastSort;
  return wereadCall(apiKey, params);
}

export async function fetchAllNotebooks(apiKey) {
  let allBooks = [], hasMore = 1, lastSort;
  while (hasMore) {
    const data = await fetchNotebooks(apiKey, lastSort);
    const page = data.books || [];
    allBooks = allBooks.concat(page);
    hasMore = data.hasMore || 0;
    if (page.length) lastSort = page[page.length - 1].sort;
    else break;
  }
  return allBooks;
}

export async function fetchBookmarks(apiKey, bookId) {
  return wereadCall(apiKey, { api_name: '/book/bookmarklist', bookId });
}

export async function fetchMyReviews(apiKey, bookId) {
  let allReviews = [], synckey = 0, hasMore = 1;
  while (hasMore) {
    const data = await wereadCall(apiKey, {
      api_name: '/review/list/mine',
      bookid: bookId,
      count: 100,
      synckey,
    });
    const page = data.reviews || [];
    allReviews = allReviews.concat(page);
    hasMore = data.hasMore || 0;
    if (!page.length) break;
    synckey = data.synckey || 0;
  }
  return allReviews;
}
