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

/*
  Continent SVG paths — viewBox 0 0 100 55
  Coordinate mapping (equirectangular-ish):
    x = (longitude + 170) / 360 * 100
    y = (80 - latitude) / 145 * 55
  Traced from a standard political world map reference.
*/

const continents = [
  // ── North America (Alaska → Arctic → East coast → Florida → Gulf → Mexico → Central America → Pacific coast → back) ──
  `M 2.8 10
   C 1.5 9, 1 8, 2 7 C 3 6, 3.5 5, 5 4.5
   L 7 4 C 8 3.5, 10 3, 12 2.8 L 15 2.5 C 17 2.5, 19 2, 21 2.5
   C 23 3, 24 2.5, 26 3.5 C 27 4, 28 4.5, 29 5.5
   C 30 6.5, 31 7.5, 31.5 9 C 32 10, 31.5 11, 30.5 12
   C 29.5 13, 29 13.5, 28.5 14.5 C 28 15.5, 27.5 16.5, 27 17.5
   C 26.5 18.5, 26 19.5, 25.5 20.5 C 25 21.5, 24.5 22, 24 22.5
   C 23.5 23, 23 22.5, 22.5 22 C 22 21.5, 21 21, 20.5 21
   C 20 21.5, 19.5 22, 19.5 22.5 C 19.5 23, 20 23.5, 20.5 24
   L 21 24.5 C 21 25, 20.5 25.5, 20 26 C 19.5 26.5, 19 27, 18.5 27.5
   C 18 27, 17.5 26.5, 17 25.5 C 16.5 24.5, 16 23, 15.5 21.5
   C 15 20, 14.5 18.5, 14 17 C 13.5 15.5, 12.5 14, 12 12.5
   C 11.5 11, 10.5 10, 9 9 C 7.5 8, 6 7.5, 4.5 7.5
   C 3.5 7.5, 3 8, 2.8 9 Z`,

  // ── Greenland ──
  `M 34 2 C 35 1.5, 37 1.5, 38 2.5 C 39 3.5, 39 5, 38.5 6.5
   C 38 7.5, 37 8, 36 8 C 35 8, 34 7, 33.5 6
   C 33 5, 33 3.5, 34 2 Z`,

  // ── South America ──
  `M 23 28.5
   C 24 28, 25.5 28, 27 28.5 C 28.5 29, 30 29.5, 31 30
   C 32 30.5, 33 31.5, 34 33 C 34.5 34, 35 35.5, 35 37
   C 34.5 38.5, 34 40, 33 41.5 C 32 43, 31 44.5, 30 46
   C 29 47.5, 28 49, 27 50.5 C 26.5 51, 26 51, 25.5 50.5
   C 25 49.5, 24.5 48, 24 46 C 23.5 44, 23 42, 22.5 39.5
   C 22 37, 22 34.5, 22 32.5 C 22 31, 22 29.5, 23 28.5 Z`,

  // ── Europe (Iberia → France → Scandinavia → Russia west → Black Sea → Italy → back) ──
  `M 44 15.5
   C 44 14.5, 44 13.5, 44.5 12.5 C 45 11.5, 45.5 10.5, 46 10
   C 46.5 9.5, 47 9, 48 8.5 C 49 8, 50 8, 51 7.5
   C 52 7, 52.5 6.5, 53 5.5 C 53.5 5, 54 4.5, 55 4
   C 55.5 4, 56 4.5, 56.5 5 C 57 6, 57 7, 57.5 8
   C 58 9, 58.5 10, 58.5 11 C 58.5 12, 58 13, 57.5 13.5
   C 57 14, 56 14.5, 55 15 C 54 15.5, 53.5 16, 53 16.5
   C 52.5 16, 52.5 15.5, 52 15 C 51.5 14.8, 51 15, 50.5 15.5
   C 50 16, 49.5 16, 49 15.5 C 48.5 15.5, 47.5 15.5, 47 16
   C 46 16, 45 16, 44.5 15.8 C 44 15.8, 44 15.5, 44 15.5 Z`,

  // ── British Isles ──
  `M 46 8 C 46.5 7.5, 47.5 7.5, 47.5 8.5 C 47.5 9.5, 47 10, 46 9.5 C 45.5 9, 45.5 8.5, 46 8 Z`,

  // ── Iceland ──
  `M 42 5.5 C 42.5 5, 43.5 5, 44 5.5 C 44 6, 43.5 6.5, 43 6.5 C 42 6.5, 42 6, 42 5.5 Z`,

  // ── Africa ──
  `M 44 17
   C 45 17, 46.5 17, 48 17 C 50 17, 52 17, 54 17.5
   C 55 18, 56 18.5, 57 19.5 C 57.5 20, 58 21, 58 22
   C 58.5 23, 59 23.5, 60 24.5 C 60.5 25, 60 26, 59 27
   C 58 28, 57.5 29, 57 30.5 C 56.5 32, 56 33.5, 55.5 35
   C 55 37, 54.5 38.5, 54 40 C 53.5 41.5, 52.5 43, 51.5 44
   C 50.5 45, 50 45.5, 49 45 C 48.5 44.5, 48 44, 48 42.5
   C 48 41, 47.5 39, 47 37 C 46.5 35, 46 33, 46 31
   C 46 29, 45.5 27, 45 25 C 44.5 23, 44 21, 44 19
   C 44 18, 44 17.5, 44 17 Z`,

  // ── Madagascar ──
  `M 60 37 C 60.5 36.5, 61.5 37, 62 38.5 C 62 40, 61.5 41, 61 41
   C 60 41, 59.5 39.5, 60 37 Z`,

  // ── Asia (Middle East → Central Asia → Siberia → Kamchatka → China coast → SE Asia → India → Arabia → back) ──
  `M 58.5 11
   C 59 10, 60 9, 62 8 C 64 7, 67 6, 70 5.5
   C 73 5, 76 4.5, 79 4 C 82 3.5, 85 3, 88 3.5
   C 91 4, 93 5, 94.5 6 C 95.5 7, 96 8, 96 9.5
   C 96 11, 95 12, 93 13 C 91 14, 90 14.5, 88.5 15.5
   C 87.5 16, 86.5 17, 85.5 18 C 84.5 19, 83.5 19.5, 82.5 20.5
   C 81.5 21, 80.5 22, 79.5 23 C 78.5 24, 78 25, 77 26
   C 76.5 26.5, 76 26, 75 25.5 C 74.5 25, 74 24.5, 73 25
   C 72.5 25.5, 72 26, 71.5 27 C 71 28, 70 29, 69.5 29.5
   C 69 29, 68.5 28, 68 27 C 67 26, 66.5 25, 66 24
   C 65 23, 64 22.5, 63 22 C 62 21.5, 61 20.5, 60.5 19.5
   C 60 18.5, 59.5 17, 59 15.5 C 58.5 14, 58.5 12.5, 58.5 11 Z`,

  // ── Arabian Peninsula ──
  `M 59 20
   C 60 19.5, 61 20, 62 21 C 63 22, 63.5 23, 63.5 24.5
   C 63.5 25.5, 63 26.5, 62 27 C 61 27, 60 26.5, 59.5 25.5
   C 59 24, 59 22, 58.5 21 C 58.5 20.5, 59 20, 59 20 Z`,

  // ── Sri Lanka ──
  `M 71 30 C 71.5 29.5, 72 30, 72 31 C 72 31.5, 71.5 32, 71 31.5 C 70.5 31, 71 30, 71 30 Z`,

  // ── Japan ──
  `M 90 12 C 90.5 11, 91.5 11, 92 12 C 92 13, 92 14, 91.5 15
   C 91 15.5, 90 15, 90 14 C 89.5 13, 89.5 12.5, 90 12 Z`,

  // ── Philippines ──
  `M 84 22 C 85 21.5, 85.5 22, 85.5 23.5 C 85.5 25, 85 26, 84 25.5
   C 83.5 24.5, 83.5 23, 84 22 Z`,

  // ── Borneo ──
  `M 80 27 C 81 26.5, 82 27, 83 28 C 83 29, 82.5 30, 81.5 30
   C 80.5 30, 80 29, 80 28 C 80 27.5, 80 27, 80 27 Z`,

  // ── Sumatra ──
  `M 77 27.5 C 78 27, 79 28, 79 29.5 C 79 30.5, 78 31, 77.5 30.5
   C 77 30, 77 28.5, 77 27.5 Z`,

  // ── Papua New Guinea + New Guinea ──
  `M 87 28 C 88 27.5, 90 28, 91 29 C 91 30, 90.5 31, 89 31
   C 88 31, 87 30, 87 29 C 87 28.5, 87 28, 87 28 Z`,

  // ── Australia ──
  `M 83 37
   C 85 36, 87 36, 89 36.5 C 91 37, 93 38, 94 39.5
   C 94.5 41, 94.5 42.5, 94 44 C 93 45.5, 92 46.5, 90.5 47
   C 89 47.5, 87 47.5, 85 47 C 83.5 46.5, 82 45.5, 81 44
   C 80 42.5, 79.5 41, 80 39.5 C 80.5 38, 81.5 37, 83 37 Z`,

  // ── New Zealand ──
  `M 96.5 42 C 97 41, 97.5 42, 97.5 43.5 C 97.5 44.5, 97 45, 96.5 44.5 C 96 43.5, 96 42.5, 96.5 42 Z
   M 96 45.5 C 96.5 45, 97 46, 97 47.5 C 97 48, 96 47.5, 96 46.5 C 96 46, 96 45.5, 96 45.5 Z`,
];

const regionLabels = [
  { text: 'North America', x: 13, y: 10 },
  { text: 'South America', x: 25, y: 42 },
  { text: 'Europe', x: 49, y: 8 },
  { text: 'Africa', x: 50, y: 32 },
  { text: 'Asia', x: 74, y: 8 },
  { text: 'Oceania', x: 86, y: 50 },
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
          <g transform="translate(0.35, 0.45)">
            {continents.map((d, i) => (
              <path key={`s${i}`} className="continent-shadow" d={d} />
            ))}
          </g>

          {/* continent fills */}
          {continents.map((d, i) => (
            <path key={`f${i}`} className="continent-shape" d={d} />
          ))}

          {/* continent outlines */}
          {continents.map((d, i) => (
            <path key={`o${i}`} className="continent-outline" d={d} />
          ))}

          {/* route */}
          <path d={routePath} className="route-line-shadow" />
          <path d={routePath} className="route-line" />
          <path d={routePath} className="route-line route-line-main route-draw" />
          <path d={routePath} className="route-line route-line-main route-march" />

          {/* traveler dot */}
          <circle r="1.2" className="route-traveler">
            <animateMotion dur="10s" repeatCount="indefinite" path={routePath} />
          </circle>

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
