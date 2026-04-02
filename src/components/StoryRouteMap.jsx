import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { storyChapters } from '../data/siteData';

function StoryRouteMap({ activeSlug = null, compact = false }) {
  const points = storyChapters.map((chapter) => `${chapter.map.x},${chapter.map.y}`).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`route-map ${compact ? 'compact' : ''}`}
    >
      <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="route-svg" aria-hidden="true">
        <path className="continent-shape" d="M6 14 L12 8 L22 7 L29 12 L27 19 L20 21 L13 19 L9 17 Z" />
        <path className="continent-shape" d="M27 28 L33 29 L36 36 L33 47 L29 45 L26 38 Z" />
        <path className="continent-shape" d="M45 10 L51 8 L58 10 L60 15 L56 19 L48 17 L44 13 Z" />
        <path className="continent-shape" d="M49 21 L57 22 L61 31 L58 44 L52 45 L48 35 L47 27 Z" />
        <path className="continent-shape" d="M66 16 L73 14 L82 17 L85 23 L80 28 L70 27 L65 22 Z" />
        <path className="continent-shape" d="M79 37 L85 36 L90 39 L88 44 L82 45 L78 41 Z" />
        <polyline points={points} className="route-line" />
      </svg>

      {storyChapters.map((chapter) => (
        <Link
          key={chapter.slug}
          to={`/story/${chapter.slug}`}
          className={`route-stop ${activeSlug === chapter.slug ? 'active' : ''}`}
          style={{ left: `${chapter.map.x}%`, top: `${chapter.map.y}%` }}
          aria-label={`Open chapter ${chapter.step}: ${chapter.city}`}
        >
          <span className="route-stop-dot">{chapter.step}</span>
          <span className="route-stop-label">
            <strong>{chapter.city}</strong>
            <small>{chapter.country}</small>
          </span>
        </Link>
      ))}
    </motion.div>
  );
}

export default StoryRouteMap;
