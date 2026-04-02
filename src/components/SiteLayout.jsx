import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function SiteLayout() {
  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/story-map', label: 'Story map' },
    { to: '/learn', label: 'Key lessons' },
    { to: '/communities', label: 'For communities' },
  ];

  return (
    <div className="site-shell">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="site-header">
        <div className="container py-3 py-lg-4">
          <div className="d-flex flex-column flex-xl-row align-items-xl-center justify-content-between gap-3">
            <Link to="/" className="brand-link d-flex align-items-center gap-3 text-decoration-none">
              <div className="brand-mark">MA</div>
              <div>
                <div className="brand-title">Mutual Aid Story Atlas</div>
                <div className="brand-subtitle">A five-stop story about how digital tools support care, trust, and reciprocity.</div>
              </div>
            </Link>

            <div className="site-nav-row">
              <nav className="site-nav" aria-label="Primary">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <Link to="/story/toronto" className="primary-link-button header-cta">
                Start the story
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="site-main">
        <div className="container py-4 py-lg-5">
          <Outlet />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container py-4 py-lg-5">
          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <p className="small-label mb-2">About the project</p>
              <p className="mb-0 text-body-secondary">
                This website uses a story-map structure to explain how digital technologies can support civic participation, community building, learning, and positive social change through mutual aid.
              </p>
            </div>
            <div className="col-lg-4">
              <p className="small-label mb-2">Go next</p>
              <div className="footer-links d-flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} end={item.end} className="footer-link">
                    {item.label}
                  </NavLink>
                ))}
                <Link to="/story/toronto" className="footer-link">Open chapter 1</Link>
              </div>
            </div>
            <div className="col-lg-3">
              <p className="small-label mb-2">Use note</p>
              <p className="mb-0 text-body-secondary">
                Every route marker, chapter card, and next-step link is connected so the website can be explored visually, linearly, or by theme without losing the story.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
