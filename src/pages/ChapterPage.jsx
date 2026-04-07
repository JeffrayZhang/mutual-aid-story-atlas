import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Confetti from '../components/Confetti';
import InteractiveModule from '../components/InteractiveModule';
import PageIntro from '../components/PageIntro';
import ProgressBar from '../components/ProgressBar';
import ScoreBadge from '../components/ScoreBadge';
import JourneyPath from '../components/JourneyPath';
import { coreQuestions, storyChapters } from '../data/siteData';
import { useProgress } from '../hooks/useProgress';

function ChapterPage() {
  const { slug } = useParams();
  const chapterIndex = storyChapters.findIndex((chapter) => chapter.slug === slug);
  const { visited, completed, scores, markVisited, markScore } = useProgress();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (slug && chapterIndex !== -1) markVisited(slug);
  }, [slug, chapterIndex, markVisited]);

  const handleModuleComplete = useCallback(
    (score) => {
      if (slug) {
        markScore(slug, score ?? 100);
        setShowConfetti(true);
      }
    },
    [slug, markScore],
  );

  if (chapterIndex === -1) return <Navigate to="/story-map" replace />;

  const chapter = storyChapters[chapterIndex];
  const previousChapter = storyChapters[chapterIndex - 1] ?? null;
  const nextChapter = storyChapters[chapterIndex + 1] ?? null;
  const isCompleted = completed.includes(chapter.slug);
  const chapterScore = scores[chapter.slug];
  const moduleTypeLabels = {
    chat: 'Chat scene',
    timeline: 'Timeline build',
    trust: 'Trust signals',
    power: 'Power sort',
    planner: 'Outreach stack',
  };

  return (
    <div>
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}

      <PageIntro
        eyebrow={`Chapter ${chapter.step} · ${chapter.city}, ${chapter.country}`}
        title={chapter.title}
        intro={chapter.hook}
        note={chapter.need}
        noteTitle="Immediate need"
        actions={[
          { to: '/story-map', label: 'View the full route', variant: 'secondary' },
          nextChapter
            ? { to: `/story/${nextChapter.slug}`, label: `Next: ${nextChapter.city}` }
            : { to: '/learn', label: 'Finish with the key lessons' },
        ]}
        stats={[
          { value: chapter.region, label: 'region' },
          { value: moduleTypeLabels[chapter.module.type], label: 'interactive mode' },
          { value: isCompleted ? 'Completed' : 'In progress', label: 'status' },
        ]}
      />

      <section className="section-spacing">
        <div className="paper-card">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <p className="eyebrow mb-2">Story progress</p>
              <h2 className="section-title mb-0">Where Mina is in the journey</h2>
            </div>
            <Link to="/story-map" className="text-link">
              <ArrowLeft size={14} /> Back to full route
            </Link>
          </div>
          <JourneyPath activeSlug={chapter.slug} compact visited={visited} completed={completed} />
          <div className="mt-3">
            <ProgressBar visited={visited} completed={completed} />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="paper-card mb-4">
              <p className="eyebrow mb-3">Narrative stop</p>
              <div className="reading-width chapter-reading">
                {chapter.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <div className="paper-card">
              <p className="eyebrow mb-3">What this stop teaches</p>
              <div className="vstack gap-3">
                {chapter.takeawayCards.map((item) => (
                  <div key={item.label} className="lesson-strip">
                    <p className="small-label mb-1">{item.label}</p>
                    <p className="mb-0 text-body-secondary">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }} className="paper-card h-100">
              <div className="d-flex justify-content-between align-items-center mb-0">
                <p className="eyebrow mb-3">Interactive chapter</p>
                <div className="d-flex gap-2 mb-3">
                  <ScoreBadge score={chapterScore} />
                  {isCompleted && <span className="done-badge"><Check size={12} /> Completed</span>}
                </div>
              </div>
              <InteractiveModule key={chapter.slug} module={chapter.module} onComplete={handleModuleComplete} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="paper-card">
          <p className="eyebrow mb-3">Question connections</p>
          <div className="row g-4">
            {coreQuestions
              .filter((question) => chapter.chapterLinks.includes(question.id))
              .map((question) => (
                <div className="col-md-6 col-xl-4" key={question.id}>
                  <div className="question-link-card h-100">
                    <p className="small-label mb-2">{question.id.toUpperCase()}</p>
                    <h3 className="card-title mb-2">{question.short}</h3>
                    <p className="mb-0 text-body-secondary">This chapter contributes evidence for this question.</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="paper-card navigator-card">
          <div className="row g-4 align-items-center">
            <div className="col-md-4">
              {previousChapter ? (
                <Link to={`/story/${previousChapter.slug}`} className="nav-arrow-link">
                  <span className="small-label d-block mb-1"><ArrowLeft size={12} /> Previous</span>
                  <strong>Chapter {previousChapter.step}: {previousChapter.city}</strong>
                </Link>
              ) : (
                <Link to="/" className="nav-arrow-link muted">
                  <span className="small-label d-block mb-1"><ArrowLeft size={12} /> Previous</span>
                  <strong>Return to prelude</strong>
                </Link>
              )}
            </div>
            <div className="col-md-4 text-md-center">
              <Link to="/learn" className="text-link">Go to the learning page</Link>
            </div>
            <div className="col-md-4 text-md-end">
              {nextChapter ? (
                <Link to={`/story/${nextChapter.slug}`} className="nav-arrow-link text-md-end">
                  <span className="small-label d-block mb-1">Next <ArrowRight size={12} /></span>
                  <strong>Chapter {nextChapter.step}: {nextChapter.city}</strong>
                </Link>
              ) : (
                <Link to="/communities" className="nav-arrow-link text-md-end">
                  <span className="small-label d-block mb-1">Next <ArrowRight size={12} /></span>
                  <strong>Finish with community uses</strong>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChapterPage;
