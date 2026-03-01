import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-logo">
              Cine<span>Stream</span>
            </div>
            <p className="footer__brand-desc">
              Your cinematic universe. Discover trending movies, explore genres,
              watch trailers, and build your personal watchlist.
            </p>
          </div>

          <div>
            <p className="footer__col-title">Navigate</p>
            <div className="footer__links">
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/search" className="footer__link">Search</Link>
              <Link to="/watchlist" className="footer__link">Watchlist</Link>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Genres</p>
            <div className="footer__links">
              <Link to="/genre/28" className="footer__link">Action</Link>
              <Link to="/genre/35" className="footer__link">Comedy</Link>
              <Link to="/genre/27" className="footer__link">Horror</Link>
              <Link to="/genre/10749" className="footer__link">Romance</Link>
              <Link to="/genre/16" className="footer__link">Animation</Link>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Info</p>
            <div className="footer__links">
              <span className="footer__link">Data by TMDB</span>
              <span className="footer__link">Trailers via YouTube</span>
              <span className="footer__link">React App</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {year} CineStream. Built with ❤️ for movie lovers.
          </p>
          <p className="footer__api-credit">
            Movie data provided by{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TMDB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
