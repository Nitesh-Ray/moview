import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset states when URL changes (new fetch)
    setLoading(true);
    setError(null);

    const controller = new AbortController(); // for cleanup
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // cancel request on unmount or URL change
  }, [url]);

  return { data, loading, error };
}