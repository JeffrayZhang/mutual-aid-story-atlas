import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import StoryRouteMap from '../components/StoryRouteMap';
import { storyChapters } from '../data/siteData';

function StoryMapPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Story map"
        title="The route Mina follows"
        intro="This page acts as the atlas for the whole website. Each chapter is a stop in Mina’s journey and a lesson about digital mutual aid. The map and cards are linked, so the user can move visually, linearly, or by topic without breaking the story."
        note="Every stop includes a different interactive mode: chat simulation, response timeline, trust-building game, power sorter, and outreach planner."
      />

      <section className="section-spacing">
        <div className="paper-card atlas-panel">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <p className="eyebrow mb-2">Global route</p>
              <h2 className="section-title mb-0">Click a stop to enter the chapter</h2>
            </div>
            <Link to="/story/toronto" className="primary-link-button">
              Begin with chapter 1
            </Link>
          </div>
          <StoryRouteMap />
        </div>
      </section>

      <section className="section-spacing">
        <div className="row g-4">
          {storyChapters.map((chapter, index) => (
            <div className="col-lg-6" key={chapter.slug}>
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="paper-card h-100 story-card"
              >
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                  <div>
                    <p className="small-label mb-2">Chapter {chapter.step} · {chapter.city}, {chapter.country}</p>
                    <h3 className="card-title mb-2">{chapter.title}</h3>
                    <p className="text-body-secondary mb-0">{chapter.subtitle}</p>
                  </div>
                  <div className="chapter-stamp">Stop {chapter.step}</div>
                </div>

                <div className="chapter-summary-grid mb-4">
                  <div>
                    <p className="small-label mb-1">Need</p>
                    <p className="mb-0">{chapter.need}</p>
                  </div>
                  <div>
                    <p className="small-label mb-1">Interactive mode</p>
                    <p className="mb-0">{chapter.module.title}</p>
                  </div>
                </div>

                <p className="mb-4 text-body-secondary">{chapter.hook}</p>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  {chapter.chapterLinks.map((tag) => (
                    <span key={tag} className="chapter-chip">{tag.toUpperCase()}</span>
                  ))}
                </div>

                <Link to={`/story/${chapter.slug}`} className="text-link">
                  Enter chapter {chapter.step}
                </Link>
              </motion.article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StoryMapPage;
