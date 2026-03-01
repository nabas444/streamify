import { useMovie } from '../context/MovieContext';

const useWatchlist = (movie) => {
  const { isInWatchlist, toggleWatchlist } = useMovie();
  const inList = movie ? isInWatchlist(movie.id) : false;

  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (movie) toggleWatchlist(movie);
  };

  return { inList, handleToggle };
};

export default useWatchlist;
