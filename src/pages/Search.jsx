import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies, getTrending } from '../services/api';
import useDebounce from '../hooks/useDebounce';
import MovieCard, { MovieCardSkeleton } from '../components/MovieCard/MovieCard';
import './Search.css';

const TRENDING_TERMS = [
  'Marvel', 'Star Wars', 'Batman', 'Avengers', 'Spider-Man',
  'Fast & Furious', 'Harry Potter', 'James Bond', 'Disney', 'Horror',
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const debouncedQuery = useDebounce(query, 500);

  // Load trending when no query
  useEffect(() => {
    if (!debouncedQuery) {
      getTrending()
        .then((res) => setTrendingMovies(res.data.results || []))
        .catch(() => {});
    }
  }, [debouncedQuery]);

  // Search on debounced query change
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    searchMovies(debouncedQuery)
      .then((res) => {
        setResults(res.data.results || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const handleTermClick = (term) => {
    setQuery(term);
  };

  const skeletons = Array.from({ length: 12 }, (_, i) => (
    <MovieCardSkeleton key={i} size="grid" />
  ));

  const displayMovies = debouncedQuery ? results : trendingMovies;

  return (
    <div className="page-content search-page">
      <div className="search-bar">
        <span className="search-bar__icon">🔍</span>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search for movies, genres, directors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          aria-label="Search movies"
        />
        {query && (
          <button
            className="search-bar__clear"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="search-page__header">
        <h1 className="search-page__title">
          {debouncedQuery ? (
            <>Results for <span>"{debouncedQuery}"</span></>
          ) : (
            '🔥 Trending Movies'
          )}
        </h1>
        {!loading && displayMovies.length > 0 && (
          <p className="search-page__count">
            {debouncedQuery
              ? `${results.length} movie${results.length !== 1 ? 's' : ''} found`
              : 'What are people watching right now?'}
          </p>
        )}
      </div>

      {error && (
        <div className="error-state">
          <h2>😕 Oops!</h2>
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="search-grid">{skeletons}</div>
      ) : displayMovies.length > 0 ? (
        <div className="search-grid">
          {displayMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} size="grid" />
          ))}
        </div>
      ) : debouncedQuery && !loading ? (
        <div className="empty-state">
          <div className="empty-icon">🎬</div>
          <h2>No results found</h2>
          <p>Try a different search term or browse by genre</p>
          <button
            className="btn-red"
            onClick={() => navigate('/')}
            style={{ marginTop: 8 }}
          >
            Browse Home
          </button>
        </div>
      ) : null}

      {!debouncedQuery && (
        <div className="search-trending">
          <p className="search-trending__title">🔎 Popular Searches</p>
          <div className="search-trending__tags">
            {TRENDING_TERMS.map((term) => (
              <button
                key={term}
                className="search-trending__tag"
                onClick={() => handleTermClick(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
