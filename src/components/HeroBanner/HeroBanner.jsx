import { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL, BACKDROP_SIZE } from '../../services/api';
import useWatchlist from '../../hooks/useWatchlist';
import './HeroBanner.css';

const HeroBanner = ({ movies, loading }) => {
  const [current, setCurrent] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();
  const featured = movies?.[current];
  const { inList, handleToggle } = useWatchlist(featured);

  // Auto-rotate
  useEffect(() => {
    if (!movies?.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.min(movies.length, 5));
      setImgLoaded(false);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies]);

  const handleDotClick = useCallback((idx) => {
    setCurrent(idx);
    setImgLoaded(false);
  }, []);

  if (loading) {
    return (
      <div className="hero hero--skeleton">
        <div className="hero__backdrop-placeholder">🎬</div>
        <div className="hero__gradient-bottom" />
        <div className="hero__gradient-left" />
        <div className="hero__content">
          <div className="skeleton-text skeleton-title" />
          <div className="skeleton-text skeleton-meta" />
          <div className="skeleton-text skeleton-overview" />
          <div className="skeleton-text skeleton-actions" />
        </div>
      </div>
    );
  }

  if (!featured) return null;

  const backdropUrl = featured.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${featured.backdrop_path}`
    : null;

  const releaseYear = featured.release_date
    ? new Date(featured.release_date).getFullYear()
    : '';

  const rating = featured.vote_average
    ? featured.vote_average.toFixed(1)
    : '';

  return (
    <div className="hero">
      {backdropUrl ? (
        <img
          className={`hero__backdrop ${imgLoaded ? 'hero__backdrop--loaded' : ''}`}
          src={backdropUrl}
          alt={featured.title}
          onLoad={() => setImgLoaded(true)}
        />
      ) : (
        <div className="hero__backdrop-placeholder">🎬</div>
      )}

      <div className="hero__gradient-bottom" />
      <div className="hero__gradient-left" />

      <div className="hero__content">
        <div className="hero__badge">🔥 Featured</div>

        <h1 className="hero__title">{featured.title}</h1>

        <div className="hero__meta">
          {rating && (
            <span className="hero__rating">⭐ {rating} / 10</span>
          )}
          {releaseYear && (
            <span className="hero__year">{releaseYear}</span>
          )}
        </div>

        {featured.overview && (
          <p className="hero__overview">{featured.overview}</p>
        )}

        <div className="hero__actions">
          <button
            className="btn-primary"
            onClick={() => navigate(`/movie/${featured.id}`)}
          >
            ▶ Play
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate(`/movie/${featured.id}`)}
          >
            ℹ More Info
          </button>
          <button
            className="btn-red"
            onClick={handleToggle}
          >
            {inList ? '✓ In Watchlist' : '+ Watchlist'}
          </button>
        </div>
      </div>

      {/* Navigation dots */}
      {movies?.length > 1 && (
        <div className="hero__dots">
          {movies.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              className={`hero__dot ${idx === current ? 'hero__dot--active' : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to movie ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(HeroBanner);
