import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useMovie } from '../../context/MovieContext';
import './Navbar.css';

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
    { to: '/genre/28', label: 'Action' },
    { to: '/genre/35', label: 'Comedy' },
    { to: '/genre/27', label: 'Horror' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}>
        <div className="navbar__inner">
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
              <span className="navbar__search-icon">🔍</span>
              <input
                className="navbar__search-input"
                type="text"
                placeholder="Search movies..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                aria-label="Search movies"
              />
            </form>

            <Link to="/watchlist" className="navbar__watchlist-btn">
              <span>🔖</span>
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
      </nav>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          {navLinks.map((link) => (
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
            🔖 Watchlist{watchlist.length > 0 && ` (${watchlist.length})`}
          </NavLink>
          <form onSubmit={handleMobileSearch} className="navbar__mobile-search">
            <span>🔍</span>
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
