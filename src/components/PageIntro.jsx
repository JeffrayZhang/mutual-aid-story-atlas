import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function PageIntro({
  eyebrow,
  title,
  intro,
  note,
  noteTitle = 'Story note',
  actions = [],
  stats = [],
}) {
  const copyColumnClass = note ? 'col-lg-8' : 'col-lg-12';

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="page-hero paper-card"
    >
      <div className="row g-4 align-items-start">
        <div className={copyColumnClass}>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-intro mb-0">{intro}</p>

          {actions.length > 0 ? (
            <div className="hero-actions">
              {actions.map((action) => (
                <Link
                  key={`${action.to}-${action.label}`}
                  to={action.to}
                  className={action.variant === 'secondary' ? 'secondary-link-button' : 'primary-link-button'}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}

          {stats.length > 0 ? (
            <div className="hero-stat-grid" aria-label="Page highlights">
              {stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="hero-stat-card">
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {note ? (
          <div className="col-lg-4">
            <aside className="hero-note h-100">
              <p className="hero-note-title mb-2">{noteTitle}</p>
              <p className="hero-note-body">{note}</p>
            </aside>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}

export default PageIntro;
