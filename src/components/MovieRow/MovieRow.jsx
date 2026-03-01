import { useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import MovieCard, { MovieCardSkeleton } from '../MovieCard/MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies, loading, seeAllLink }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'right' ? 600 : -600;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const skeletons = Array.from({ length: 8 }, (_, i) => (
    <MovieCardSkeleton key={i} size="large" />
  ));

  return (
    <section className="movie-row">
      <div className="movie-row__header">
        <h2 className="movie-row__title">{title}</h2>
        {seeAllLink && (
          <Link to={seeAllLink} className="movie-row__see-all">
            See All →
          </Link>
        )}
      </div>

      <div className="movie-row__scroll-wrapper">
        {showLeft && (
          <button
            className="movie-row__arrow movie-row__arrow--left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            ❮
          </button>
        )}

        <div
          ref={scrollRef}
          className="movie-row__scroll"
          onScroll={handleScroll}
        >
          {loading
            ? skeletons
            : movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} size="large" />
              ))}
        </div>

        {showRight && (movies?.length > 0 || loading) && (
          <button
            className="movie-row__arrow movie-row__arrow--right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            ❯
          </button>
        )}
      </div>
    </section>
  );
};

export default memo(MovieRow);
