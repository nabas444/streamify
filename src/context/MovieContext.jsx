import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem('cinestream_watchlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    localStorage.setItem('cinestream_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  const toggleWatchlist = useCallback(
    (movie) => {
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id);
      } else {
        addToWatchlist(movie);
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  );

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toggleWatchlist,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error('useMovie must be used within MovieProvider');
  return ctx;
};

export default MovieContext;
