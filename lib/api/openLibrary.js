const BASE = 'https://openlibrary.org';

export async function searchOpenLibrary(query, limit = 10) {
  const url = `${BASE}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,cover_i,first_publish_year,subject`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`OpenLibrary ${res.status}`);

  const json = await res.json();
  return (json.docs || []).map(doc => ({
    source: 'openlibrary',
    id: doc.key,
    title: doc.title,
    authors: doc.author_name || [],
    year: doc.first_publish_year,
    cover: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    subjects: (doc.subject || []).slice(0, 5),
  }));
}
