import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import { insightPanels } from '../data/siteData';

function InsightsPage() {
  const [activeId, setActiveId] = useState(insightPanels[0].id);
  const panel = useMemo(
    () => insightPanels.find((item) => item.id === activeId) ?? insightPanels[0],
    [activeId]
  );

  return (
    <div>
      <PageIntro
        eyebrow="What it teaches"
        title="How the story answers the three research questions"
        intro="This page turns the chapters into direct answers. Instead of leaving the user to infer the meaning of the story map alone, it gathers the evidence from each stop and explains what the project reveals about digital mutual aid, platform design, and reciprocity."
        note="Use this page if you want the website to read clearly as both a creative artifact and a research-based course project."
      />

      <section className="section-spacing">
        <div className="paper-card">
          <div className="d-flex flex-wrap gap-2 mb-4">
            {insightPanels.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`filter-button secondary ${activeId === item.id ? 'active' : ''}`}
              >
                {item.id.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <h2 className="section-title mb-3">{panel.title}</h2>
              <p className="mb-4 text-body-secondary">{panel.answer}</p>
              <div className="vstack gap-3">
                {panel.implications.map((item) => (
                  <div key={item} className="lesson-strip">
                    <p className="mb-0">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="paper-card inset-card h-100">
                <p className="eyebrow mb-3">Evidence from the route</p>
                <div className="vstack gap-3">
                  {panel.evidence.map((item) => (
                    <div key={item.slug} className="evidence-card">
                      <p className="small-label mb-1">{item.title}</p>
                      <p className="mb-2 text-body-secondary">{item.text}</p>
                      <Link to={`/story/${item.slug}`} className="text-link">Revisit this chapter</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-6">
            <div className="paper-card h-100 accent-panel">
              <p className="eyebrow mb-3">Core argument</p>
              <p className="mb-0">
                The project argues that digital citizenship should be understood not only through safety, surveillance, or responsible posting, but also through the collective design of care. Digital tools matter because they can help communities organize support, widen participation, and make local knowledge visible.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="paper-card h-100 subdued-panel">
              <p className="eyebrow mb-3">Why the story format helps</p>
              <p className="mb-0">
                The story map makes the questions easier to learn because the user does not only read answers. They move through scenes, make choices, test platform features, compare models of support, and then see those interactions translated into analysis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InsightsPage;
