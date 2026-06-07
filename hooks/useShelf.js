'use client';

import { useState, useEffect } from 'react';
import { fetchShelf } from '@/lib/api/weread';

export function useShelf() {
  const [data, setData]         = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const apiKey = localStorage.getItem('wrk') || '';
        setData(await fetchShelf(apiKey));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, isLoading, error };
}
