'use client';

import { useState, useEffect } from 'react';
import { fetchAllNotebooks } from '@/lib/api/weread';

export function useNotes() {
  const [books, setBooks]       = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const apiKey = localStorage.getItem('wrk') || '';
        setBooks(await fetchAllNotebooks(apiKey));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { books, isLoading, error };
}
