import { useState, useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (fetchFn) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);

  const fetchItems = useCallback(async (pageNum) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetchFn(pageNum);
      const results = res.data.results || [];
      const totalPages = res.data.total_pages || 1;
      setItems((prev) =>
        pageNum === 1 ? results : [...prev, ...results]
      );
      setHasMore(pageNum < totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    fetchItems(1);
  }, [fetchFn]);

  useEffect(() => {
    if (page > 1) fetchItems(page);
  }, [page, fetchItems]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  const reset = useCallback(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, []);

  return { items, loading, error, hasMore, lastItemRef, reset };
};

export default useInfiniteScroll;
