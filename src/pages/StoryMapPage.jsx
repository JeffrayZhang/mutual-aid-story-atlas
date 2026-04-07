import { motion } from 'framer-motion';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import JourneyPath from '../components/JourneyPath';
import PageIntro from '../components/PageIntro';
import ProgressBar from '../components/ProgressBar';
import ScoreBadge from '../components/ScoreBadge';
import { storyChapters } from '../data/siteData';
import { useProgress } from '../hooks/useProgress';

function StoryMapPage() {
  const { visited, completed, scores, reset } = useProgress();
  const totalCompleted = completed.length;

  return (
    <div>
      <PageIntro
        eyebrow="Story map"
        title="Follow the full route before you dive into the chapters"
        intro="This atlas shows Mina's five-stop journey at a glance. Click any stop to enter the chapter, or scroll down for more detail about what each city teaches."
        note="Each chapter keeps the same structure: context first, interaction second, then a direct link to the next step in the story."
        noteTitle="How to use this page"
        actions={[
          { to: '/story/toronto', label: 'Begin with chapter 1' },
          { to: '/learn', label: 'Jump to the key lessons', variant: 'secondary' },
        ]}
        stats={[
          { value: '5', label: 'connected stops' },
          { value: `${totalCompleted}/5`, label: 'completed' },
          { value: '3', label: 'guiding questions' },
        ]}
      />

      <section className="section-spacing">
        <div className="paper-card">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <p className="eyebrow mb-2">The journey</p>
              <h2 className="section-title mb-0">Click a stop to enter the chapter</h2>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {totalCompleted > 0 && (
                <button type="button" className="subtle-button" onClick={reset}>
                  <RotateCcw size={14} /> Reset progress
                </button>
              )}
              <Link to="/story/toronto" className="primary-link-button">
                Begin with chapter 1
              </Link>
            </div>
          </div>
          <ProgressBar visited={visited} completed={completed} />
          <div className="mt-4">
            <JourneyPath visited={visited} completed={completed} />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="row g-4">
          {storyChapters.map((chapter, index) => {
            const isDone = completed.includes(chapter.slug);
            const isSeen = visited.includes(chapter.slug);
            return (
              <div className="col-lg-6" key={chapter.slug}>
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`paper-card h-100 story-card ${isDone ? 'card-completed' : ''}`}
                >
                  <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <p className="small-label mb-0">Chapter {chapter.step} · {chapter.city}, {chapter.country}</p>
                        <ScoreBadge score={scores[chapter.slug]} />
                        {isDone && <span className="done-badge"><Check size={12} /> Done</span>}
                        {!isDone && isSeen && <span className="seen-badge">Visited</span>}
                      </div>
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
                    {isDone ? 'Revisit' : 'Enter'} chapter {chapter.step} <ArrowRight size={14} />
                  </Link>
                </motion.article>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default StoryMapPage;
