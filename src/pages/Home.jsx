import { lazy, Suspense } from 'react';
import useFetch from '../hooks/useFetch';
import {
  getTrending,
  getPopular,
  getTopRated,
  getNowPlaying,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getAnimationMovies,
} from '../services/api';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import MovieRow from '../components/MovieRow/MovieRow';
import './Home.css';

const Home = () => {
  const trending = useFetch(getTrending, []);
  const popular = useFetch(getPopular, []);
  const topRated = useFetch(getTopRated, []);
  const nowPlaying = useFetch(getNowPlaying, []);
  const action = useFetch(getActionMovies, []);
  const comedy = useFetch(getComedyMovies, []);
  const horror = useFetch(getHorrorMovies, []);
  const romance = useFetch(getRomanceMovies, []);
  const animation = useFetch(getAnimationMovies, []);

  const heroMovies = trending.data?.results || popular.data?.results || [];

  const rows = [
    {
      title: 'Trending Now',
      data: trending,
      seeAll: '/genre/trending',
    },
    {
      title: 'Now Playing',
      data: nowPlaying,
      seeAll: '/genre/now_playing',
    },
    {
      title: 'Top Rated',
      data: topRated,
      seeAll: '/genre/top_rated',
    },
    {
      title: 'Popular',
      data: popular,
      seeAll: '/genre/popular',
    },
    {
      title: 'Action',
      data: action,
      seeAll: '/genre/28',
    },
    {
      title: 'Comedy',
      data: comedy,
      seeAll: '/genre/35',
    },
    {
      title: 'Horror',
      data: horror,
      seeAll: '/genre/27',
    },
    {
      title: 'Romance',
      data: romance,
      seeAll: '/genre/10749',
    },
    {
      title: 'Animation',
      data: animation,
      seeAll: '/genre/16',
    },
  ];

  return (
    <div className="home">
      <HeroBanner
        movies={heroMovies}
        loading={trending.loading && !trending.data}
      />
      <div className="home__rows">
        {rows.map((row) => (
          <MovieRow
            key={row.title}
            title={row.title}
            movies={row.data.data?.results}
            loading={row.data.loading && !row.data.data}
            seeAllLink={row.seeAll}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
