import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';

const ChapterPage = lazy(() => import('./pages/ChapterPage'));
const CommunitiesPage = lazy(() => import('./pages/CommunitiesPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const StoryMapPage = lazy(() => import('./pages/StoryMapPage'));

function RouteLoadingFallback() {
  return (
    <section className="route-loading paper-card" role="status" aria-live="polite">
      <p className="eyebrow mb-0">Loading next section</p>
      <h1 className="section-title mb-0">Preparing the story atlas…</h1>
      <p className="text-body-secondary mb-0 reading-width">
        This project loads pages in smaller chunks so the first visit stays faster on slower connections.
      </p>
      <div className="loading-pulse" aria-hidden="true" />
    </section>
  );
}

function withSuspense(element) {
  return <Suspense fallback={<RouteLoadingFallback />}>{element}</Suspense>;
}

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={withSuspense(<HomePage />)} />
        <Route path="/story-map" element={withSuspense(<StoryMapPage />)} />
        <Route path="/story/:slug" element={withSuspense(<ChapterPage />)} />
        <Route path="/learn" element={withSuspense(<InsightsPage />)} />
        <Route path="/communities" element={withSuspense(<CommunitiesPage />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
