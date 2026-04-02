import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import StoryRouteMap from '../components/StoryRouteMap';
import { coreQuestions, storyChapters, storyIntro } from '../data/siteData';

function HomePage() {
  return (
    <div>
      <PageIntro
        eyebrow="Mutual Aid Story Atlas"
        title="How digital mutual aid turns simple tools into community care"
        intro="Follow Mina, a fictional composite character, across five cities to see how chats, maps, volunteer sheets, and low-bandwidth communication can support care, trust, and participation. Each stop is a chapter with an interactive scene, and together they answer the project’s three research questions."
        note={storyIntro.note}
        noteTitle="Why Mina is fictional"
        actions={[
          { to: '/story/toronto', label: 'Start Mina’s journey' },
          { to: '/story-map', label: 'Explore the full route', variant: 'secondary' },
        ]}
        stats={[
          { value: '5', label: 'city chapters' },
          { value: '5', label: 'interactive scenes' },
          { value: '3', label: 'research questions' },
        ]}
      />

      <section className="section-spacing">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="paper-card h-100 atlas-panel">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                  <p className="eyebrow mb-2">The route</p>
                  <h2 className="section-title mb-0">Five stops, one connected lesson</h2>
                </div>
                <Link to="/story/toronto" className="primary-link-button">
                  Start Mina’s journey
                </Link>
              </div>
              <StoryRouteMap />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="paper-card h-100 subdued-panel">
              <p className="eyebrow mb-3">What to do next</p>
              <div className="journey-checklist mb-4">
                <div className="checklist-item">
                  <span className="checklist-number">1</span>
                  <div>
                    <p className="mb-1"><strong>Scan the route first.</strong></p>
                    <p>Use the map to see the full journey and understand how the chapters connect.</p>
                  </div>
                </div>
                <div className="checklist-item">
                  <span className="checklist-number">2</span>
                  <div>
                    <p className="mb-1"><strong>Open each city in order.</strong></p>
                    <p>Every chapter adds one new idea about mutual aid, platform trust, or reciprocity.</p>
                  </div>
                </div>
                <div className="checklist-item">
                  <span className="checklist-number">3</span>
                  <div>
                    <p className="mb-1"><strong>Finish with the analysis pages.</strong></p>
                    <p>The learning and community sections turn the journey into clear takeaways you can reuse.</p>
                  </div>
                </div>
              </div>
              <Link to="/story-map" className="secondary-link-button">
                View the full story map
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow mb-2">Guiding questions</p>
            <h2 className="section-title mb-0">What the journey is trying to teach</h2>
          </div>
        </div>

        <div className="row g-4">
          {coreQuestions.map((question, index) => (
            <div className="col-lg-4" key={question.id}>
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="paper-card h-100"
              >
                <div className="question-number mb-3">0{index + 1}</div>
                <h3 className="card-title mb-2">{question.short}</h3>
                <p className="mb-0 text-body-secondary">{question.title}</p>
              </motion.article>
            </div>
          ))}
        </div>
      </section>

      <section className="section-spacing">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow mb-2">Chapter preview</p>
            <h2 className="section-title mb-0">What happens at each stop</h2>
          </div>
        </div>
        <div className="row g-4">
          {storyChapters.map((chapter, index) => (
            <div className="col-md-6 col-xl-4" key={chapter.slug}>
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="paper-card h-100 route-card"
              >
                <p className="small-label mb-2">Chapter {chapter.step} · {chapter.city}</p>
                <h3 className="card-title mb-2">{chapter.title}</h3>
                <p className="text-body-secondary mb-3">{chapter.subtitle}</p>
                <p className="mb-3"><strong>Need:</strong> {chapter.need}</p>
                <Link to={`/story/${chapter.slug}`} className="text-link">
                  Open this chapter
                </Link>
              </motion.article>
            </div>
          ))}
        </div>
      </section>

      <section className="section-spacing">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-8">
            <div className="paper-card h-100">
              <p className="eyebrow mb-3">Why this format works for the assignment</p>
              <div className="reading-width">
                <p>
                  A story map solves the problem of being too open-ended. It gives the project a concrete structure: the user follows one journey, moves through chapters in sequence, completes interactive tasks, and then arrives at a final interpretation. That makes the research questions visible in action instead of leaving them as separate abstract prompts.
                </p>
                <p className="mb-0">
                  It also fits the course theme well. Digital citizenship becomes something the user witnesses and practices through the interface: noticing needs, understanding trust and accessibility, and recognizing the difference between reciprocal care and top-down support.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="paper-card h-100 accent-panel">
              <p className="eyebrow mb-3">Quick path</p>
              <ul className="plain-list mb-4">
                <li>Read the route</li>
                <li>Play the chapter interactions</li>
                <li>Visit the learning page</li>
                <li>End on the audience page</li>
              </ul>
              <Link to="/story-map" className="primary-link-button">Go to the full story map</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
