import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../services/api';
import useWatchlist from '../../hooks/useWatchlist';
import './MovieCard.css';

const MovieCard = ({ movie, size = 'large', showActions = true }) => {
  const navigate = useNavigate();
  const { inList, handleToggle } = useWatchlist(movie);

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : 'N/A';

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className={`movie-card movie-card--${size}`}
      onClick={handleClick}
      title={movie.title}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {posterUrl ? (
        <img
          className="movie-card__poster"
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <div className="movie-card__poster-placeholder">🎬</div>
      )}

      <div className="movie-card__overlay" />

      <div className="movie-card__info">
        <div className="movie-card__title">{movie.title}</div>
        <div className="movie-card__meta">
          <span className="movie-card__year">{releaseYear}</span>
          <span className="movie-card__rating">⭐ {rating}</span>
        </div>
        {showActions && (
          <div className="movie-card__actions">
            <button
              className="movie-card__btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movie/${movie.id}`);
              }}
            >
              ▶ Details
            </button>
            <button
              className={`movie-card__btn movie-card__btn--watchlist ${inList ? 'in-list' : ''}`}
              onClick={handleToggle}
              title={inList ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              {inList ? '✓ Saved' : '+ Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const MovieCardSkeleton = ({ size = 'large' }) => (
  <div className={`movie-card movie-card--skeleton movie-card--${size}`}>
    <div className="skeleton-poster" />
  </div>
);

export default memo(MovieCard);
