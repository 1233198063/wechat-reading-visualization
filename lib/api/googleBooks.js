const BASE = 'https://www.googleapis.com/books/v1';

export async function searchGoogleBooks(query, limit = 10) {
  const key = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `${BASE}/volumes?q=${encodeURIComponent(query)}&maxResults=${limit}${key ? `&key=${key}` : ''}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GoogleBooks ${res.status}`);

  const json = await res.json();
  return (json.items || []).map(item => {
    const info = item.volumeInfo || {};
    return {
      source: 'googlebooks',
      id: item.id,
      title: info.title,
      authors: info.authors || [],
      year: info.publishedDate?.slice(0, 4),
      cover: info.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
      subjects: info.categories || [],
      description: info.description,
    };
  });
}
