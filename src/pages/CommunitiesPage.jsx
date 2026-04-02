import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import { audienceGuides, responsiblePractice, storyChapters } from '../data/siteData';

function CommunitiesPage() {
  const [activeId, setActiveId] = useState(audienceGuides[0].id);
  const activeGuide = useMemo(
    () => audienceGuides.find((guide) => guide.id === activeId) ?? audienceGuides[0],
    [activeId]
  );

  const relatedChapters = storyChapters.filter((chapter) => activeGuide.related.includes(chapter.slug));

  return (
    <div>
      <PageIntro
        eyebrow="For communities"
        title="Who this project can help and how"
        intro="The story map is meant to be useful, not only expressive. This page translates the journey into practical takeaways for student organizations, community organizers, small nonprofits, and individuals looking for support or ways to contribute."
        note="The site can be shared as a link on eClass, in a showcase setting, or through student and community networks because each page stands on its own while still linking back into the full story."
      />

      <section className="section-spacing">
        <div className="paper-card">
          <div className="d-flex flex-wrap gap-2 mb-4">
            {audienceGuides.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => setActiveId(guide.id)}
                className={`filter-button secondary ${activeId === guide.id ? 'active' : ''}`}
              >
                {guide.title}
              </button>
            ))}
          </div>

          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <h2 className="section-title mb-3">{activeGuide.title}</h2>
              <p className="text-body-secondary mb-4">{activeGuide.why}</p>
              <div className="vstack gap-3">
                {activeGuide.useCases.map((item) => (
                  <div key={item} className="lesson-strip">
                    <p className="mb-0">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="paper-card inset-card h-100">
                <p className="eyebrow mb-3">Related stops in the story</p>
                <div className="vstack gap-3">
                  {relatedChapters.map((chapter) => (
                    <div key={chapter.slug} className="evidence-card">
                      <p className="small-label mb-1">Chapter {chapter.step} · {chapter.city}</p>
                      <p className="mb-2 text-body-secondary">{chapter.subtitle}</p>
                      <Link to={`/story/${chapter.slug}`} className="text-link">Open this chapter</Link>
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
            <div className="paper-card h-100">
              <p className="eyebrow mb-3">Contribute responsibly</p>
              <ul className="plain-list mb-0">
                {responsiblePractice.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="paper-card h-100 accent-panel">
              <p className="eyebrow mb-3">Suggested ending for presentation</p>
              <p>
                This project shows that digital citizenship is not only about how individuals behave online. It is also about how people use digital tools to notice needs, share responsibility, and build more participatory forms of care.
              </p>
              <p className="mb-0">
                If you want to keep exploring, return to the story map and follow the chapters again with the three questions in mind.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CommunitiesPage;
