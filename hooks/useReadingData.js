'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchReadingData } from '@/lib/api/weread';

/* Fetches reading overview data for a given period.
   Caches responses in a ref so tab switches don't refetch. */
export function useReadingData(period) {
  const [data, setData]       = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const cache = useRef({});

  const load = useCallback(async (mode) => {
    if (cache.current[mode]) {
      setData(cache.current[mode]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const apiKey = localStorage.getItem('wrk') || '';
      const result = await fetchReadingData(apiKey, mode);
      cache.current[mode] = result;
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(period); }, [period, load]);

  return { data, isLoading, error };
}
