import { Link } from 'react-router-dom';
import { Home, Map, MapPinOff } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found-icon" aria-hidden="true">
        <MapPinOff size={48} strokeWidth={1.5} />
      </div>
      <h1 className="not-found-title">Page not found</h1>
      <p className="not-found-text">
        This stop is not on Mina's route. The page you are looking for does not exist or may have been moved.
      </p>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        <Link to="/" className="primary-link-button">
          <Home size={16} /> Go home
        </Link>
        <Link to="/story-map" className="secondary-link-button">
          <Map size={16} /> View the story map
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
