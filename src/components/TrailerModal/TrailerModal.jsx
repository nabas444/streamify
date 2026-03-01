import { useEffect } from 'react';
import './TrailerModal.css';

const TrailerModal = ({ videoKey, title, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="trailer-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Movie Trailer"
    >
      <div className="trailer-modal">
        <div className="trailer-modal__header">
          <h2 className="trailer-modal__title">
            🎬 {title ? `${title} – Official Trailer` : 'Official Trailer'}
          </h2>
          <button
            className="trailer-modal__close"
            onClick={onClose}
            aria-label="Close trailer"
          >
            ✕
          </button>
        </div>

        <div className="trailer-modal__player">
          {videoKey ? (
            <iframe
              className="trailer-modal__iframe"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="trailer-modal__no-trailer">
              <span>🎬</span>
              <p>No trailer available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
