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
              A premium movie discovery experience with curated collections, real-time trends,
              and your personal watchlist in one place.
            </p>
            <div className="footer__status">
              <span className="footer__status-dot" />
              Live catalog updates daily
            </div>
          </div>

          <div>
            <p className="footer__col-title">Platform</p>
            <div className="footer__links">
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/search" className="footer__link">Search</Link>
              <Link to="/watchlist" className="footer__link">Watchlist</Link>
              <Link to="/genre/trending" className="footer__link">Trending</Link>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Categories</p>
            <div className="footer__links">
              <Link to="/genre/28" className="footer__link">Action</Link>
              <Link to="/genre/35" className="footer__link">Comedy</Link>
              <Link to="/genre/27" className="footer__link">Horror</Link>
              <Link to="/genre/878" className="footer__link">Sci-Fi</Link>
              <Link to="/genre/53" className="footer__link">Thriller</Link>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Data</p>
            <div className="footer__links">
              <span className="footer__link">TMDB movie metadata</span>
              <span className="footer__link">YouTube trailer embeds</span>
              <span className="footer__link">Responsive React interface</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            Copyright {year} CineStream. All rights reserved.
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
