import { useCallback, useEffect, useState } from 'react';
import { fetchAll } from '../api/swapi';

export default function useSwapiList(resource) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (signal) => {
      setLoading(true);
      setError(null);

      try {
        const results = await fetchAll(resource, signal);
        if (!signal?.aborted) {
          setItems(results);
        }
      } catch (loadError) {
        if (loadError.name === 'AbortError' || signal?.aborted) {
          return;
        }
        setError('Could not load this list. Check your connection and try again.');
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [resource]
  );

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return {
    items,
    loading,
    error,
    reload: () => load(),
  };
}
