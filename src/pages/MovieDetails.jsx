import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getMovieDetails, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, SMALL_POSTER_SIZE } from '../services/api';
import useWatchlist from '../hooks/useWatchlist';
import TrailerModal from '../components/TrailerModal/TrailerModal';
import MovieCard from '../components/MovieCard/MovieCard';
import './MovieDetails.css';

const formatRuntime = (mins) => {
  if (!mins) return 'N/A';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
};

const formatMoney = (amount) => {
  if (!amount || amount === 0) return 'N/A';
  if (amount >= 1000000000) return `$${(amount / 1e9).toFixed(1)}B`;
  if (amount >= 1000000) return `$${(amount / 1e6).toFixed(0)}M`;
  return `$${amount.toLocaleString()}`;
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trailerOpen, setTrailerOpen] = useState(false);

  const { data, loading, error } = useFetch(
    useCallback(() => getMovieDetails(id), [id]),
    [id]
  );

  const movie = data;
  const { inList, handleToggle } = useWatchlist(movie);

  if (loading) {
    return (
      <div className="page-content details-page">
        <div className="details-hero">
          <div className="details-hero__placeholder">🎬</div>
          <div className="details-hero__gradient" />
        </div>
        <div className="details-content">
          <div className="details-skeleton">
            <p style={{ color: 'var(--text-muted)' }}>Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="page-content">
        <div className="error-state" style={{ paddingTop: 120 }}>
          <h2>😕 Movie Not Found</h2>
          <p>{error || 'Could not load movie details.'}</p>
          <button className="btn-red" onClick={() => navigate('/')} style={{ marginTop: 16 }}>
            ← Go Home
          </button>
        </div>
      </div>
    );
  }

  // Get trailer key
  const trailerVideo = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || movie.videos?.results?.[0];

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const similar = movie.similar?.results?.slice(0, 12) || [];

  return (
    <div className="page-content details-page">
      {/* Backdrop */}
      <div className="details-hero">
        {backdropUrl ? (
          <img
            className="details-hero__backdrop"
            src={backdropUrl}
            alt={movie.title}
          />
        ) : (
          <div className="details-hero__placeholder">🎬</div>
        )}
        <div className="details-hero__gradient" />
      </div>

      {/* Main Content */}
      <div className="details-content">
        <div className="details-main">
          {/* Poster */}
          <div className="details-poster">
            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} />
            ) : (
              <div className="details-poster-placeholder">🎬</div>
            )}
          </div>

          {/* Info */}
          <div className="details-info">
            <h1 className="details-info__title">{movie.title}</h1>
            {movie.tagline && (
              <p className="details-info__tagline">"{movie.tagline}"</p>
            )}

            <div className="details-info__meta">
              {movie.vote_average > 0 && (
                <span className="details-info__rating">
                  ⭐ {movie.vote_average.toFixed(1)}/10
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,215,0,0.7)' }}>
                    ({movie.vote_count?.toLocaleString()} votes)
                  </span>
                </span>
              )}
              <span className="details-info__year">📅 {releaseYear}</span>
              <span className="details-info__runtime">⏱ {formatRuntime(movie.runtime)}</span>
              {movie.status && (
                <span className="details-info__status">● {movie.status}</span>
              )}
            </div>

            {movie.genres?.length > 0 && (
              <div className="details-info__genres">
                {movie.genres.map((g) => (
                  <button
                    key={g.id}
                    className="details-info__genre"
                    onClick={() => navigate(`/genre/${g.id}`)}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            )}

            {movie.overview && (
              <>
                <p className="details-info__overview-title">Synopsis</p>
                <p className="details-info__overview">{movie.overview}</p>
              </>
            )}

            <div className="details-info__actions">
              {trailerVideo && (
                <button
                  className="btn-primary"
                  onClick={() => setTrailerOpen(true)}
                >
                  ▶ Watch Trailer
                </button>
              )}
              <button
                className={inList ? 'btn-secondary' : 'btn-red'}
                onClick={handleToggle}
              >
                {inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
            </div>

            {/* Stats */}
            <div className="details-stats">
              {movie.budget > 0 && (
                <div className="details-stat">
                  <div className="details-stat__label">Budget</div>
                  <div className="details-stat__value">{formatMoney(movie.budget)}</div>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="details-stat">
                  <div className="details-stat__label">Revenue</div>
                  <div className="details-stat__value">{formatMoney(movie.revenue)}</div>
                </div>
              )}
              {movie.original_language && (
                <div className="details-stat">
                  <div className="details-stat__label">Language</div>
                  <div className="details-stat__value">
                    {movie.original_language.toUpperCase()}
                  </div>
                </div>
              )}
              {movie.popularity && (
                <div className="details-stat">
                  <div className="details-stat__label">Popularity</div>
                  <div className="details-stat__value">
                    {Math.round(movie.popularity)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <div className="details-section">
            <h2 className="details-section__title">🎭 Cast</h2>
            <div className="cast-grid">
              {cast.map((actor) => {
                const photoUrl = actor.profile_path
                  ? `${IMAGE_BASE_URL}${SMALL_POSTER_SIZE}${actor.profile_path}`
                  : null;
                return (
                  <div key={actor.id} className="cast-card">
                    {photoUrl ? (
                      <img
                        className="cast-card__photo"
                        src={photoUrl}
                        alt={actor.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="cast-card__photo-placeholder">👤</div>
                    )}
                    <div className="cast-card__name">{actor.name}</div>
                    <div className="cast-card__character">{actor.character}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="details-section">
            <h2 className="details-section__title">🎬 Similar Movies</h2>
            <div className="similar-grid">
              {similar.map((m) => (
                <MovieCard key={m.id} movie={m} size="grid" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {trailerOpen && (
        <TrailerModal
          videoKey={trailerVideo?.key}
          title={movie.title}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieDetails;
