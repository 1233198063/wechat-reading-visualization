import { NextResponse } from 'next/server';
import { searchOpenLibrary } from '@/lib/api/openLibrary';
import { searchGoogleBooks } from '@/lib/api/googleBooks';

/* Unified book search: merges Open Library + Google Books results.
   GET /api/books?q=<title>&limit=10 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q     = searchParams.get('q')?.trim();
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 40);

  if (!q) {
    return NextResponse.json({ error: 'Missing query param: q' }, { status: 400 });
  }

  const [olResults, gbResults] = await Promise.allSettled([
    searchOpenLibrary(q, limit),
    searchGoogleBooks(q, limit),
  ]);

  const books = [
    ...(olResults.status === 'fulfilled' ? olResults.value : []),
    ...(gbResults.status === 'fulfilled' ? gbResults.value : []),
  ].slice(0, limit);

  return NextResponse.json({ books });
}
