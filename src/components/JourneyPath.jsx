import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storyChapters } from '../data/siteData';

const cityAccents = {
  toronto: { gradient: 'linear-gradient(135deg, #1a5c6b, #2d8a9e)', bg: 'rgba(26, 92, 107, 0.08)' },
  'sao-paulo': { gradient: 'linear-gradient(135deg, #3d7a4a, #5aad6a)', bg: 'rgba(61, 122, 74, 0.08)' },
  warsaw: { gradient: 'linear-gradient(135deg, #4a5090, #7078c0)', bg: 'rgba(74, 80, 144, 0.08)' },
  nairobi: { gradient: 'linear-gradient(135deg, #a16642, #cc8e5e)', bg: 'rgba(161, 102, 66, 0.08)' },
  manila: { gradient: 'linear-gradient(135deg, #7a4a80, #a572ac)', bg: 'rgba(122, 74, 128, 0.08)' },
};

const nodeVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function CompactPath({ activeSlug, visited, completed }) {
  return (
    <div className="compact-journey">
      {storyChapters.map((ch, i) => {
        const isDone = completed.includes(ch.slug);
        const isSeen = visited.includes(ch.slug);
        const isActive = activeSlug === ch.slug;
        const accent = cityAccents[ch.slug];

        return (
          <Fragment key={ch.slug}>
            {i > 0 && <div className={`compact-line ${isDone || isSeen ? 'filled' : ''}`} />}
            <Link
              to={`/story/${ch.slug}`}
              className={`compact-dot ${isActive ? 'active' : ''} ${isDone ? 'done' : isSeen ? 'seen' : ''}`}
              style={isActive || isDone ? { background: accent.gradient } : undefined}
              aria-label={`Chapter ${ch.step}: ${ch.city}`}
            >
              {isDone ? <Check size={11} strokeWidth={3} /> : ch.step}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}

function JourneyPath({ activeSlug = null, compact = false, visited = [], completed = [] }) {
  if (compact) {
    return <CompactPath activeSlug={activeSlug} visited={visited} completed={completed} />;
  }

  return (
    <div className="journey-path">
      <div className="journey-track" aria-hidden="true" />
      {storyChapters.map((chapter, index) => {
        const isDone = completed.includes(chapter.slug);
        const isSeen = visited.includes(chapter.slug);
        const isActive = activeSlug === chapter.slug;
        const accent = cityAccents[chapter.slug];
        const isNext =
          !isDone &&
          !isSeen &&
          (index === 0 || completed.includes(storyChapters[index - 1]?.slug) || visited.includes(storyChapters[index - 1]?.slug));

        let nodeClass = 'journey-node';
        if (isActive) nodeClass += ' active';
        if (isDone) nodeClass += ' done';
        else if (isSeen) nodeClass += ' seen';
        if (isNext) nodeClass += ' next';

        return (
          <motion.div
            key={chapter.slug}
            custom={index}
            variants={nodeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={nodeClass}
          >
            {/* Connector dot on the track */}
            <div className="journey-marker" style={{ background: isDone || isActive ? accent.gradient : undefined }}>
              {isDone ? <Check size={16} strokeWidth={3} /> : <span>{chapter.step}</span>}
            </div>

            {/* City card */}
            <Link
              to={`/story/${chapter.slug}`}
              className="journey-card"
              style={{ '--node-bg': accent.bg, '--node-accent': accent.gradient }}
            >
              <div className="journey-card-head">
                <span className="journey-card-step">Chapter {chapter.step}</span>
                <span className="journey-card-region">{chapter.region}</span>
              </div>

              <h3 className="journey-card-city">{chapter.city}</h3>
              <p className="journey-card-country">{chapter.country}</p>
              <p className="journey-card-subtitle">{chapter.subtitle}</p>

              <div className="journey-card-footer">
                {isDone && <span className="done-badge"><Check size={12} /> Done</span>}
                {!isDone && isSeen && <span className="seen-badge">Visited</span>}
                <span className="journey-card-cta">
                  {isDone ? 'Revisit' : 'Open chapter'} <ArrowRight size={14} />
                </span>
              </div>

              {/* Colored accent bar */}
              <div className="journey-card-accent" style={{ background: accent.gradient }} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default JourneyPath;
