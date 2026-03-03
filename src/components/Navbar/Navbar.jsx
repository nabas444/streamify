import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useMovie } from '../../context/MovieContext';
import './Navbar.css';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M10.5 3a7.5 7.5 0 0 1 5.86 12.18l4.23 4.23-1.41 1.41-4.23-4.23A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-3.8L5 21V4a1 1 0 0 1 1-1Zm1 2v12.65l5-2.72 5 2.72V5H7Z" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { watchlist } = useMovie();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchVal.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
        setSearchVal('');
      }
    },
    [searchVal, navigate]
  );

  const handleMobileSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchVal.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
        setSearchVal('');
        setMenuOpen(false);
      }
    },
    [searchVal, navigate]
  );

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/genre/trending', label: 'Trending' },
    { to: '/genre/now_playing', label: 'Now Playing' },
    { to: '/genre/top_rated', label: 'Top Rated' },
  ];

  const categoryLinks = [
    { to: '/genre/popular', label: 'Popular' },
    { to: '/genre/28', label: 'Action' },
    { to: '/genre/35', label: 'Comedy' },
    { to: '/genre/27', label: 'Horror' },
    { to: '/genre/10749', label: 'Romance' },
    { to: '/genre/878', label: 'Sci-Fi' },
    { to: '/genre/16', label: 'Animation' },
    { to: '/genre/18', label: 'Drama' },
    { to: '/genre/53', label: 'Thriller' },
    { to: '/genre/80', label: 'Crime' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}>
        <div className="navbar__inner">
          <div className="navbar__main">
            <div className="navbar__left">
              <Link to="/" className="navbar__logo">
                Cine<span>Stream</span>
              </Link>
              <div className="navbar__nav">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="navbar__right">
              <form onSubmit={handleSearch} className="navbar__search">
                <span className="navbar__search-icon">
                  <SearchIcon />
                </span>
                <input
                  className="navbar__search-input"
                  type="text"
                  placeholder="Search movies, cast, genres..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  aria-label="Search movies"
                />
              </form>

              <Link to="/watchlist" className="navbar__watchlist-btn">
                <span className="navbar__watchlist-icon">
                  <BookmarkIcon />
                </span>
                <span className="watchlist-label">Watchlist</span>
                {watchlist.length > 0 && (
                  <span className="navbar__badge">{watchlist.length}</span>
                )}
              </Link>

              <button
                className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <div className="navbar__categories">
            {categoryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `navbar__category-link ${isActive ? 'navbar__category-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          {[...navLinks, ...categoryLinks].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
            }
          >
            Watchlist{watchlist.length > 0 && ` (${watchlist.length})`}
          </NavLink>
          <form onSubmit={handleMobileSearch} className="navbar__mobile-search">
            <span className="navbar__mobile-search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
