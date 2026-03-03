import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!TMDB_API_KEY) {
  console.warn(
    'Missing VITE_TMDB_API_KEY. Add it to your .env file and deployment environment variables.'
  );
}

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const BACKDROP_SIZE = '/original';
export const POSTER_SIZE = '/w500';
export const SMALL_POSTER_SIZE = '/w185';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

// Movies
export const getTrending = (page = 1) =>
  tmdb.get('/trending/movie/week', { params: { page } });

export const getPopular = (page = 1) =>
  tmdb.get('/movie/popular', { params: { page } });

export const getTopRated = (page = 1) =>
  tmdb.get('/movie/top_rated', { params: { page } });

export const getNowPlaying = (page = 1) =>
  tmdb.get('/movie/now_playing', { params: { page } });

export const getUpcoming = (page = 1) =>
  tmdb.get('/movie/upcoming', { params: { page } });

// Movie Details
export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar,images' },
  });

// Videos / Trailers
export const getMovieVideos = (id) =>
  tmdb.get(`/movie/${id}/videos`);

// Search
export const searchMovies = (query, page = 1) =>
  tmdb.get('/search/movie', { params: { query, page } });

// Genres
export const getGenres = () =>
  tmdb.get('/genre/movie/list');

export const getMoviesByGenre = (genreId, page = 1) =>
  tmdb.get('/discover/movie', {
    params: { with_genres: genreId, page, sort_by: 'popularity.desc' },
  });

// By Genre shortcut
export const getActionMovies = (page = 1) =>
  getMoviesByGenre(28, page);

export const getComedyMovies = (page = 1) =>
  getMoviesByGenre(35, page);

export const getHorrorMovies = (page = 1) =>
  getMoviesByGenre(27, page);

export const getRomanceMovies = (page = 1) =>
  getMoviesByGenre(10749, page);

export const getDocumentaries = (page = 1) =>
  getMoviesByGenre(99, page);

export const getAnimationMovies = (page = 1) =>
  getMoviesByGenre(16, page);

export default tmdb;
