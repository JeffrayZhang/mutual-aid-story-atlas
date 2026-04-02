import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storyChapters } from '../data/siteData';

function buildRoutePath(chapters) {
  return chapters
    .map((chapter, index) => {
      const { x, y } = chapter.map;

      if (index === 0) {
        return `M ${x} ${y}`;
      }

      const previous = chapters[index - 1].map;
      const dx = x - previous.x;
      const dy = y - previous.y;
      const controlX = previous.x + dx / 2;
      const curveHeight = Math.max(6, Math.abs(dx) * 0.16 + Math.abs(dy) * 0.08);
      const controlY = Math.max(6, Math.min(previous.y, y) - curveHeight);

      return `Q ${controlX} ${controlY} ${x} ${y}`;
    })
    .join(' ');
}

function StoryRouteMap({ activeSlug = null, compact = false, visited = [], completed = [] }) {
  const routePath = buildRoutePath(storyChapters);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`route-map-figure ${compact ? 'compact' : ''}`}
      aria-label="Stylized world map tracing Mina's route through Toronto, São Paulo, Warsaw, Nairobi, and Manila."
    >
      <div className={`route-map ${compact ? 'compact' : ''}`}>
        <div className="map-compass" aria-hidden="true">N</div>

        <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="route-svg" aria-hidden="true">
          <g>
            <line className="map-graticule" x1="0" y1="11" x2="100" y2="11" />
            <line className="map-graticule" x1="0" y1="22" x2="100" y2="22" />
            <line className="map-graticule" x1="0" y1="33" x2="100" y2="33" />
            <line className="map-graticule" x1="0" y1="44" x2="100" y2="44" />
            <line className="map-graticule" x1="16.5" y1="0" x2="16.5" y2="55" />
            <line className="map-graticule" x1="33" y1="0" x2="33" y2="55" />
            <line className="map-graticule" x1="49.5" y1="0" x2="49.5" y2="55" />
            <line className="map-graticule" x1="66" y1="0" x2="66" y2="55" />
            <line className="map-graticule" x1="82.5" y1="0" x2="82.5" y2="55" />
          </g>

          <path className="continent-shadow" d="M5.8 12.4 C7.4 8.7 13 6.3 18.8 6.2 C24.7 6.1 29.3 8.5 31.2 11.6 C32.6 13.8 32.4 16.9 30.9 18.7 C29.1 20.9 26.7 22.8 23.7 23.7 C21.2 24.4 20 26.4 17.9 26.8 C14.8 25.8 13.6 23.4 10.9 22.3 C8.5 21.2 6.3 18.1 5.3 15.4 C4.8 14.1 5 13.1 5.8 12.4 Z" />
          <path className="continent-shadow" d="M24.5 27.6 C27.4 28.7 30.2 31.6 31.2 35.3 C32.1 38.8 31 42.7 29.9 45.7 C28.7 48.7 27.5 50.7 26.1 52 C24.2 50.8 23.2 48.2 22.3 45.1 C21.4 41.8 20.2 38 20.3 34.7 C20.3 31.3 22 28.7 24.5 27.6 Z" />
          <path className="continent-shadow" d="M42.9 13.1 C45.4 10.9 49 10.3 52.4 11 C55.1 11.5 57.6 12.8 58.3 15.1 C57.7 17 55.7 18.3 53.1 18.5 C50.5 18.8 48.7 18.1 46.9 17.2 C45.2 16.2 43.9 15.1 42.9 13.1 Z" />
          <path className="continent-shadow" d="M49.1 18.4 C52 18.4 54.8 20.1 56.8 22.9 C58.7 25.5 59.8 29 59.1 33.8 C58.5 38.2 56.6 41.8 53.7 44.1 C50.8 43.4 49.6 39.9 48.7 35.8 C47.8 31.8 46.5 26.4 47.1 22.3 C47.3 20.5 47.9 19.3 49.1 18.4 Z" />
          <path className="continent-shadow" d="M57.2 13.3 C60.7 10.4 66.1 9.5 71.4 10.1 C76.7 10.8 82.1 12.5 85.8 15.8 C88.6 18.3 89.9 21.5 89.1 24.8 C87.8 27.4 84.7 28.9 80.7 29 C76.8 29 73.3 28.1 70.3 28 C67.1 27.8 64.4 29.5 61.4 30.9 C59.5 30.4 58.4 28.2 57.5 25.4 C56.6 22.6 56 18.3 57.2 13.3 Z" />
          <path className="continent-shadow" d="M80.8 38.4 C84.1 37.2 88 38 90.7 40.4 C91.9 42.1 91.6 45 88.8 46.8 C85.9 48.1 82.5 47.7 79.7 45.4 C78.7 43.2 79 40.4 80.8 38.4 Z" />

          <path className="continent-shape" d="M5.4 12 C7 8.3 12.6 5.9 18.4 5.8 C24.3 5.7 28.9 8.1 30.8 11.2 C32.2 13.4 32 16.5 30.5 18.3 C28.7 20.5 26.3 22.4 23.3 23.3 C20.8 24 19.6 26 17.5 26.4 C14.4 25.4 13.2 23 10.5 21.9 C8.1 20.8 5.9 17.7 4.9 15 C4.4 13.7 4.6 12.7 5.4 12 Z" />
          <path className="continent-outline" d="M5.4 12 C7 8.3 12.6 5.9 18.4 5.8 C24.3 5.7 28.9 8.1 30.8 11.2 C32.2 13.4 32 16.5 30.5 18.3 C28.7 20.5 26.3 22.4 23.3 23.3 C20.8 24 19.6 26 17.5 26.4 C14.4 25.4 13.2 23 10.5 21.9 C8.1 20.8 5.9 17.7 4.9 15 C4.4 13.7 4.6 12.7 5.4 12 Z" />
          <path className="continent-shape" d="M31.1 6 C32.9 4.1 35.9 3.4 38.7 4.7 C39.7 6.6 38.8 8.9 36.4 9.4 C34 9.7 32.2 8.7 31.1 6 Z" />
          <path className="continent-outline" d="M31.1 6 C32.9 4.1 35.9 3.4 38.7 4.7 C39.7 6.6 38.8 8.9 36.4 9.4 C34 9.7 32.2 8.7 31.1 6 Z" />
          <path className="continent-shape" d="M24.1 27.2 C27 28.3 29.8 31.2 30.8 34.9 C31.7 38.4 30.6 42.3 29.5 45.3 C28.3 48.3 27.1 50.3 25.7 51.6 C23.8 50.4 22.8 47.8 21.9 44.7 C21 41.4 19.8 37.6 19.9 34.3 C19.9 30.9 21.6 28.3 24.1 27.2 Z" />
          <path className="continent-outline" d="M24.1 27.2 C27 28.3 29.8 31.2 30.8 34.9 C31.7 38.4 30.6 42.3 29.5 45.3 C28.3 48.3 27.1 50.3 25.7 51.6 C23.8 50.4 22.8 47.8 21.9 44.7 C21 41.4 19.8 37.6 19.9 34.3 C19.9 30.9 21.6 28.3 24.1 27.2 Z" />
          <path className="continent-shape" d="M42.5 12.7 C45 10.5 48.6 9.9 52 10.6 C54.7 11.1 57.2 12.4 57.9 14.7 C57.3 16.6 55.3 17.9 52.7 18.1 C50.1 18.4 48.3 17.7 46.5 16.8 C44.8 15.8 43.5 14.7 42.5 12.7 Z" />
          <path className="continent-outline" d="M42.5 12.7 C45 10.5 48.6 9.9 52 10.6 C54.7 11.1 57.2 12.4 57.9 14.7 C57.3 16.6 55.3 17.9 52.7 18.1 C50.1 18.4 48.3 17.7 46.5 16.8 C44.8 15.8 43.5 14.7 42.5 12.7 Z" />
          <path className="continent-shape" d="M48.7 18 C51.6 18 54.4 19.7 56.4 22.5 C58.3 25.1 59.4 28.6 58.7 33.4 C58.1 37.8 56.2 41.4 53.3 43.7 C50.4 43 49.2 39.5 48.3 35.4 C47.4 31.4 46.1 26 46.7 21.9 C46.9 20.1 47.5 18.9 48.7 18 Z" />
          <path className="continent-outline" d="M48.7 18 C51.6 18 54.4 19.7 56.4 22.5 C58.3 25.1 59.4 28.6 58.7 33.4 C58.1 37.8 56.2 41.4 53.3 43.7 C50.4 43 49.2 39.5 48.3 35.4 C47.4 31.4 46.1 26 46.7 21.9 C46.9 20.1 47.5 18.9 48.7 18 Z" />
          <path className="continent-shape" d="M56.8 12.9 C60.3 10 65.7 9.1 71 9.7 C76.3 10.4 81.7 12.1 85.4 15.4 C88.2 17.9 89.5 21.1 88.7 24.4 C87.4 27 84.3 28.5 80.3 28.6 C76.4 28.6 72.9 27.7 69.9 27.6 C66.7 27.4 64 29.1 61 30.5 C59.1 30 58 27.8 57.1 25 C56.2 22.2 55.6 17.9 56.8 12.9 Z" />
          <path className="continent-outline" d="M56.8 12.9 C60.3 10 65.7 9.1 71 9.7 C76.3 10.4 81.7 12.1 85.4 15.4 C88.2 17.9 89.5 21.1 88.7 24.4 C87.4 27 84.3 28.5 80.3 28.6 C76.4 28.6 72.9 27.7 69.9 27.6 C66.7 27.4 64 29.1 61 30.5 C59.1 30 58 27.8 57.1 25 C56.2 22.2 55.6 17.9 56.8 12.9 Z" />
          <path className="continent-shape" d="M72.3 31.1 C74.5 30.8 76.5 31.8 77.2 33.7 C76.3 35.1 74.8 35.5 73.3 34.7 C72.4 33.8 72 32.6 72.3 31.1 Z" />
          <path className="continent-outline" d="M72.3 31.1 C74.5 30.8 76.5 31.8 77.2 33.7 C76.3 35.1 74.8 35.5 73.3 34.7 C72.4 33.8 72 32.6 72.3 31.1 Z" />
          <path className="continent-shape" d="M80.4 38 C83.7 36.8 87.6 37.6 90.3 40 C91.5 41.7 91.2 44.6 88.4 46.4 C85.5 47.7 82.1 47.3 79.3 45 C78.3 42.8 78.6 40 80.4 38 Z" />
          <path className="continent-outline" d="M80.4 38 C83.7 36.8 87.6 37.6 90.3 40 C91.5 41.7 91.2 44.6 88.4 46.4 C85.5 47.7 82.1 47.3 79.3 45 C78.3 42.8 78.6 40 80.4 38 Z" />

          <path d={routePath} className="route-line-shadow" />
          <path d={routePath} className="route-line" />
          <path d={routePath} className="route-line route-line-main route-animated" />

          <text className="map-region-label" x="10" y="10">North America</text>
          <text className="map-region-label" x="22" y="47">South America</text>
          <text className="map-region-label" x="45.5" y="11.3">Europe</text>
          <text className="map-region-label" x="51" y="37.8">Africa</text>
          <text className="map-region-label" x="70" y="16.4">Asia</text>
          <text className="map-region-label" x="82" y="50">Australia</text>
        </svg>

        {storyChapters.map((chapter) => {
          const isActive = activeSlug === chapter.slug;
          const isCompleted = completed.includes(chapter.slug);
          const isVisited = visited.includes(chapter.slug);
          let stopClass = 'route-stop';
          if (isActive) stopClass += ' active';
          if (isCompleted) stopClass += ' completed';
          else if (isVisited) stopClass += ' visited';

          return (
            <Link
              key={chapter.slug}
              to={`/story/${chapter.slug}`}
              className={stopClass}
              style={{ left: `${chapter.map.x}%`, top: `${chapter.map.y}%` }}
              aria-label={`Open chapter ${chapter.step}: ${chapter.city}${isCompleted ? ' (completed)' : isVisited ? ' (visited)' : ''}`}
            >
              <span className="route-stop-dot">
                {isCompleted ? <Check size={14} strokeWidth={3} /> : chapter.step}
              </span>
              <span className="route-stop-label">
                <strong>{chapter.city}</strong>
                <small>{chapter.country}</small>
              </span>
            </Link>
          );
        })}
      </div>

      <figcaption className="route-map-caption">
        <div className="route-map-legend">
          <span className="legend-item">
            <span className="legend-swatch route" aria-hidden="true" />
            Connected route
          </span>
          <span className="legend-item">
            <span className="legend-swatch stop" aria-hidden="true" />
            Click or tap any city to open its chapter
          </span>
        </div>

        <div className="route-stop-list">
          {storyChapters.map((chapter) => {
            const isCompleted = completed.includes(chapter.slug);
            const isVisited = visited.includes(chapter.slug);
            let linkClass = 'route-stop-list-link';
            if (activeSlug === chapter.slug) linkClass += ' active';
            if (isCompleted) linkClass += ' completed';
            else if (isVisited) linkClass += ' visited';

            return (
              <Link
                key={`${chapter.slug}-list`}
                to={`/story/${chapter.slug}`}
                className={linkClass}
              >
                <span className="route-stop-list-index">
                  {isCompleted ? <Check size={10} strokeWidth={3} /> : chapter.step}
                </span>
                {chapter.city}
              </Link>
            );
          })}
        </div>
      </figcaption>
    </motion.figure>
  );
}

export default StoryRouteMap;
