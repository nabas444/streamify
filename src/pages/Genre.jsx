import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesByGenre, getGenres, getTrending, getPopular, getTopRated, getNowPlaying } from '../services/api';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import MovieCard, { MovieCardSkeleton } from '../components/MovieCard/MovieCard';
import './Genre.css';

const GENRE_MAP = {
  28: 'Action',
  35: 'Comedy',
  27: 'Horror',
  10749: 'Romance',
  878: 'Sci-Fi',
  16: 'Animation',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  trending: 'Trending',
  popular: 'Popular',
  top_rated: 'Top Rated',
  now_playing: 'Now Playing',
};

const getSpecialFetch = (genreId) => {
  switch (genreId) {
    case 'trending':
      return getTrending;
    case 'popular':
      return getPopular;
    case 'top_rated':
      return getTopRated;
    case 'now_playing':
      return getNowPlaying;
    default:
      return (page) => getMoviesByGenre(genreId, page);
  }
};

const Genre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres()
      .then((res) => setGenres(res.data.genres || []))
      .catch(() => {});
  }, []);

  const fetchFn = useCallback(getSpecialFetch(id), [id]);
  const { items, loading, hasMore, lastItemRef } = useInfiniteScroll(fetchFn);

  const genreName = GENRE_MAP[id] || genres.find((g) => String(g.id) === id)?.name || 'Movies';

  const skeletons = Array.from({ length: 12 }, (_, i) => (
    <MovieCardSkeleton key={i} size="grid" />
  ));

  const popularGenres = [
    { id: 'trending', name: 'Trending' },
    { id: 'popular', name: 'Popular' },
    { id: 'top_rated', name: 'Top Rated' },
    { id: 'now_playing', name: 'Now Playing' },
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 16, name: 'Animation' },
    { id: 18, name: 'Drama' },
    { id: 53, name: 'Thriller' },
    { id: 80, name: 'Crime' },
  ];

  return (
    <div className="page-content genre-page">
      <div className="genre-page__header">
        <p className="genre-page__eyebrow">Curated Collections</p>
        <h1 className="genre-page__title">
          Explore <span>{genreName}</span> Movies
        </h1>
      </div>

      <div className="genre-filter">
        {popularGenres.map((g) => (
          <button
            key={g.id}
            className={`genre-filter__btn ${String(id) === String(g.id) ? 'genre-filter__btn--active' : ''}`}
            onClick={() => navigate(`/genre/${g.id}`)}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="genre-grid">
        {items.map((movie, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <div key={`${movie.id}-${idx}`} ref={isLast ? lastItemRef : null}>
              <MovieCard movie={movie} size="grid" />
            </div>
          );
        })}
        {loading && skeletons}
      </div>

      {loading && items.length > 0 && (
        <div className="load-more-indicator">
          <div className="spinner" />
          <span>Loading more movies...</span>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <p className="end-of-results">You have reached the end of this collection.</p>
      )}

      {!loading && items.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">Cinema</div>
          <h2>No movies found</h2>
          <p>Try another category from the filter above.</p>
        </div>
      )}
    </div>
  );
};

export default Genre;
