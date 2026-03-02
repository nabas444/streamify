import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './styles/global.css';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Search = lazy(() => import('./pages/Search'));
const Genre = lazy(() => import('./pages/Genre'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#141414',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <div
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '2rem',
        color: '#e50914',
        letterSpacing: '0.05em',
      }}
    >
      Cine<span style={{ color: '#fff' }}>Stream</span>
    </div>
    <div
      style={{
        width: 40,
        height: 40,
        border: '3px solid rgba(255,255,255,0.1)',
        borderTopColor: '#e50914',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  </div>
);

const App = () => (
  <MovieProvider>
    <BrowserRouter>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/genre/:id" element={<Genre />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  </MovieProvider>
);

export default App;
