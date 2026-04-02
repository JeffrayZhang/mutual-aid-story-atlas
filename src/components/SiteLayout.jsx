import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ChevronUp, Menu, Moon, Sun, X } from 'lucide-react';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}

function SiteLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('atlas-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch { /* ignore */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const location = useLocation();

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('atlas-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

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
          <div className="header-bar">
            <Link to="/" className="brand-link d-flex align-items-center gap-3 text-decoration-none">
              <div className="brand-mark">MA</div>
              <div>
                <div className="brand-title">Mutual Aid Story Atlas</div>
                <div className="brand-subtitle d-none d-md-block">A five-stop story about how digital tools support care, trust, and reciprocity.</div>
              </div>
            </Link>

            <div className="header-controls">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                className="nav-toggle"
                onClick={() => setNavOpen((o) => !o)}
                aria-expanded={navOpen}
                aria-controls="mobile-nav"
                aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
              >
                {navOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            <div className={`site-nav-row ${navOpen ? 'open' : ''}`} id="mobile-nav">
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

      {navOpen && (
        <div className="nav-overlay" onClick={() => setNavOpen(false)} aria-hidden="true" />
      )}

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

      <BackToTop />
    </div>
  );
}

export default SiteLayout;
