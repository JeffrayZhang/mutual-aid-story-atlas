import { motion } from 'framer-motion';

function PageIntro({ eyebrow, title, intro, note }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="page-hero paper-card"
    >
      <div className="row g-4 align-items-start">
        <div className="col-lg-8">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="page-title mb-3">{title}</h1>
          <p className="page-intro mb-0">{intro}</p>
        </div>
        {note ? (
          <div className="col-lg-4">
            <aside className="hero-note h-100">
              <p className="small-label mb-2">Story note</p>
              <p className="mb-0">{note}</p>
            </aside>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}

export default PageIntro;
