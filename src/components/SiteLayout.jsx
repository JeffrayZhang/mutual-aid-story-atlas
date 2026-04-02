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
    { to: '/', label: 'Prelude', end: true },
    { to: '/story-map', label: 'Story map' },
    { to: '/learn', label: 'What it teaches' },
    { to: '/communities', label: 'For communities' },
  ];

  return (
    <div className="site-shell">
      <ScrollToTop />
      <header className="site-header">
        <div className="container py-3 py-lg-4">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <Link to="/" className="brand-link d-flex align-items-center gap-3 text-decoration-none">
              <div className="brand-mark">MA</div>
              <div>
                <div className="brand-title">Mutual Aid Story Atlas</div>
                <div className="brand-subtitle">Following one request for care across global digital mutual aid</div>
              </div>
            </Link>

            <nav className="site-nav d-flex flex-wrap gap-2">
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
          </div>
        </div>
      </header>

      <main className="site-main">
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
                This website uses a story-map format to teach how digital technologies support civic participation, community building, learning, creativity, and positive social change through mutual aid.
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
                <Link to="/story/toronto" className="footer-link">Start chapter 1</Link>
              </div>
            </div>
            <div className="col-lg-3">
              <p className="small-label mb-2">Use note</p>
              <p className="mb-0 text-body-secondary">
                All chapter links, route nodes, and navigation buttons are wired together so the story reads as one continuous journey.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
