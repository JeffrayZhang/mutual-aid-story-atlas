import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storyChapters } from '../data/siteData';

function buildRoutePath(chapters) {
  return chapters
    .map((chapter, index) => {
      const { x, y } = chapter.map;
      if (index === 0) return `M ${x} ${y}`;
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

/* ── continent SVG paths (viewBox 0 0 100 55) ── */

const northAmerica = 'M 3 7.5 C 2.5 6, 4.5 4, 7 3.5 C 10 3, 14 2.5, 18 3 C 21 3, 24 2.8, 27 4.5 C 29 5.5, 31 7.5, 32 9.5 C 32.5 11, 31 12.5, 29.5 13.5 L 28 14.5 C 27 15.5, 26.5 17, 26 18.5 C 25.5 20, 25 21, 24 22.5 C 23.5 23.5, 22.5 22.5, 21 21.5 C 20 21, 19.5 21.5, 19 22.5 C 18.5 24, 19 25, 18 26.5 C 17 27, 16.5 26, 16 24.5 C 15.5 23, 15 21, 14 19 C 13 17, 12 14.5, 11.5 13 C 11 11.5, 9.5 10, 7.5 8.5 C 5.5 7, 4 7.5, 3 7.5 Z';

const greenland = 'M 33 3 C 34 2, 36 2.5, 37 4 C 37.5 5.5, 36.5 7, 35 7 C 33.5 7, 32.5 5, 33 3 Z';

const southAmerica = 'M 22 28 C 24 27.5, 26 27.5, 28 28.5 C 30 29, 32 30, 33.5 31.5 C 34.5 33, 34.5 34.5, 34 36.5 C 33.5 38.5, 32.5 40, 31 42 C 29.5 44, 28 46, 26.5 49 C 25.5 51, 25 50.5, 25 50.5 C 24.5 49, 24 47, 23 44 C 22.5 41, 22 38, 21.5 35.5 C 21 33, 21 31, 21.5 30 C 22 29, 22 28.5, 22 28 Z';

const europe = 'M 43 14 C 43 12.5, 43.5 11, 44.5 10 C 45.5 9, 46.5 8.5, 48 8 C 49 7.8, 50 8, 52 7.5 C 53 6.5, 53.5 5.5, 54.5 4.5 C 55.5 4, 56 4.5, 56.5 5.5 C 57 6.5, 57.5 7.5, 58 9 C 58.3 10, 58.5 11, 58 12 C 57.5 13, 56.5 14, 55 14.5 C 54 15, 53 15.5, 52.5 15.5 C 52 15, 51.5 14.5, 51 14.8 C 50 15, 49 15.5, 48 15.5 C 47 15.5, 45.5 15, 44.5 14.8 C 44 14.5, 43 14.2, 43 14 Z';

const britishIsles = 'M 45.5 8 C 46 7.3, 47 7.5, 47 8.5 C 47 9.5, 46 10, 45.5 9.5 C 45 9, 45 8.5, 45.5 8 Z';

const iceland = 'M 40.5 4.5 C 41.5 4, 42.5 4.2, 43 5 C 43 5.5, 42.5 6, 41.5 5.8 C 40.5 5.5, 40.5 5, 40.5 4.5 Z';

const africa = 'M 44.5 17 C 46 16.5, 48 16.5, 50 17 C 52 17.5, 54 18, 55.5 19 C 56.5 19.5, 57 20.5, 57.5 22 C 58 23, 59 24, 59.5 25 C 59 26, 58 27, 57 28.5 C 56 30, 55.5 32, 55 34 C 54.5 36, 54 38, 53 40 C 52 42, 51 43.5, 49.5 44.5 C 48.5 44.5, 48 43.5, 47.5 41 C 47 38.5, 46.5 36, 46 33.5 C 45.5 31, 45 28, 44.5 25.5 C 44 23, 43.5 21, 43.5 19 C 43.5 17.5, 44 17, 44.5 17 Z';

const madagascar = 'M 59.5 36.5 C 60.5 36, 61 37.5, 61 39 C 61 40.5, 60 41, 59.5 40 C 59 39, 59 37.5, 59.5 36.5 Z';

const asia = 'M 58 12 C 59 10, 61 8, 64 7 C 67 6, 71 5.5, 75 5 C 80 4.5, 85 4, 90 4.5 C 93 5, 95 6, 95 8 C 95 10, 93 11, 91 12 C 89 13.5, 88 15.5, 86.5 17 C 85 18.5, 83.5 19, 82 20.5 C 80 22, 78.5 24, 77 26 C 78 24.5, 76 23, 74 24 C 73 25, 72 26, 71 27.5 C 70 29, 69 30, 68 29 C 67 27.5, 66 25, 64 23 C 63 22, 62 21, 61 19.5 C 60 18, 59 15.5, 58.5 14 C 58 13, 58 12.5, 58 12 Z';

const arabianPeninsula = 'M 58 19.5 C 59 19, 60 19, 61 20 C 62 21, 62.5 22, 63 24 C 63 25, 62 26, 61 26.5 C 60 26, 59 25, 58.5 23 C 58 21.5, 58 20, 58 19.5 Z';

const japan = 'M 89 11 C 90 10, 91 11, 91 13 C 91 14.5, 90.5 15.5, 89.5 14.5 C 89 13.5, 89 12, 89 11 Z';

const philippines = 'M 83 22 C 84 21.5, 84.5 22.5, 84.5 24 C 84.5 25, 84 26, 83 25.5 C 82.5 24.5, 82.5 22.5, 83 22 Z';

const indonesia = 'M 78 28 C 79 27.5, 81 28, 82 29 C 82.5 30, 82 31, 80 31 C 79 30.5, 78 29, 78 28 Z M 83 29 C 84 28.5, 86 29.5, 86 31 C 86 32, 85 32.5, 84 32 C 83 31.5, 83 30, 83 29 Z';

const sriLanka = 'M 70.5 30.5 C 71 30, 71.5 30.5, 71.5 31.5 C 71.5 32, 71 32, 70.5 31.5 C 70 31, 70.5 30.5, 70.5 30.5 Z';

const australia = 'M 81 38 C 83 37, 86 37, 89 38 C 91 39, 92 40.5, 92 42 C 92 43.5, 91 45, 89.5 46 C 88 47, 85.5 47.5, 83 47 C 81 46.5, 79.5 45, 79 43 C 78.5 41, 79 39.5, 80 38.5 C 80.5 38, 81 38, 81 38 Z';

const newZealand = 'M 95 42 C 95.5 41.5, 96 42.5, 96 44 C 96 45, 95.5 45, 95 44 C 94.5 43, 95 42, 95 42 Z M 94.5 45.5 C 95 45, 96 46, 95.5 47.5 C 95 48, 94.5 47, 94.5 45.5 Z';

const continentPaths = [
  northAmerica, greenland, southAmerica,
  europe, britishIsles, iceland,
  africa, madagascar,
  asia, arabianPeninsula, japan, philippines, sriLanka,
  australia, newZealand,
];

const regionLabels = [
  { text: 'North America', x: 12, y: 10 },
  { text: 'South America', x: 24, y: 46 },
  { text: 'Europe', x: 47, y: 8 },
  { text: 'Africa', x: 48, y: 35 },
  { text: 'Asia', x: 72, y: 11 },
  { text: 'Oceania', x: 84, y: 50 },
];

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
          {/* graticule grid */}
          <g>
            {[11, 22, 33, 44].map((y) => (
              <line key={`h${y}`} className="map-graticule" x1="0" y1={y} x2="100" y2={y} />
            ))}
            {[16.5, 33, 49.5, 66, 82.5].map((x) => (
              <line key={`v${x}`} className="map-graticule" x1={x} y1="0" x2={x} y2="55" />
            ))}
          </g>

          {/* continent shadows */}
          <g transform="translate(0.4, 0.5)">
            {continentPaths.map((d, i) => (
              <path key={`shadow-${i}`} className="continent-shadow" d={d} />
            ))}
          </g>

          {/* continent fills */}
          {continentPaths.map((d, i) => (
            <path key={`shape-${i}`} className="continent-shape" d={d} />
          ))}

          {/* continent outlines */}
          {continentPaths.map((d, i) => (
            <path key={`outline-${i}`} className="continent-outline" d={d} />
          ))}

          {/* route */}
          <path d={routePath} className="route-line-shadow" />
          <path d={routePath} className="route-line" />
          <path d={routePath} className="route-line route-line-main route-animated" />

          {/* region labels */}
          {regionLabels.map((label) => (
            <text key={label.text} className="map-region-label" x={label.x} y={label.y}>
              {label.text}
            </text>
          ))}
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
              <Link key={`${chapter.slug}-list`} to={`/story/${chapter.slug}`} className={linkClass}>
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
