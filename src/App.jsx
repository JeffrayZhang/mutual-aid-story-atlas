import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import ChapterPage from './pages/ChapterPage';
import CommunitiesPage from './pages/CommunitiesPage';
import HomePage from './pages/HomePage';
import InsightsPage from './pages/InsightsPage';
import StoryMapPage from './pages/StoryMapPage';

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/story-map" element={<StoryMapPage />} />
        <Route path="/story/:slug" element={<ChapterPage />} />
        <Route path="/learn" element={<InsightsPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
