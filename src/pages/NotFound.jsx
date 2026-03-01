import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-page__code">404</div>
      <h1 className="not-found-page__title">Lost in the Cinemaverse</h1>
      <p className="not-found-page__text">
        The page you're looking for doesn't exist. It might have been moved,
        deleted, or you may have typed the wrong address.
      </p>
      <div className="not-found-page__actions">
        <Link to="/" className="btn-primary">
          🏠 Go Home
        </Link>
        <button className="btn-secondary" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
        <Link to="/search" className="btn-red">
          🔍 Search Movies
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
