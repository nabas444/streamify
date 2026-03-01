import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovie } from '../context/MovieContext';
import MovieCard from '../components/MovieCard/MovieCard';
import './Watchlist.css';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useMovie();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearAll = () => {
    if (confirmClear) {
      watchlist.forEach((m) => removeFromWatchlist(m.id));
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <div className="page-content watchlist-page">
      <div className="watchlist-page__header">
        <h1 className="watchlist-page__title">🔖 My Watchlist</h1>
        <p className="watchlist-page__count">
          {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {watchlist.length > 0 ? (
        <>
          <div className="watchlist-controls">
            <div />
            <button
              className="watchlist-clear-btn"
              onClick={handleClearAll}
            >
              {confirmClear ? '⚠️ Click again to confirm' : '🗑 Clear All'}
            </button>
          </div>

          <div className="watchlist-grid">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} size="grid" />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔖</div>
          <h2>Your watchlist is empty</h2>
          <p>
            Add movies to your watchlist by clicking the + Save button on any movie
          </p>
          <Link to="/" className="btn-red" style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            🎬 Browse Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
