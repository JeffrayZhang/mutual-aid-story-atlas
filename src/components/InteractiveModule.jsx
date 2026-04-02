import { useMemo, useState } from 'react';

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function ModuleFrame({ title, description, children }) {
  return (
    <div className="interactive-module">
      <div className="interactive-head mb-4">
        <h3 className="module-title mb-2">{title}</h3>
        <p className="text-body-secondary mb-0">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ChatSimulation({ module }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [log, setLog] = useState([{ speaker: 'Narration', kind: 'narration', text: module.intro }]);
  const [complete, setComplete] = useState(false);

  const round = module.rounds[roundIndex];

  const handleChoice = (choice) => {
    setLog((current) => [
      ...current,
      { speaker: 'Mina', kind: 'choice', text: choice.label },
      { speaker: 'Network', kind: 'response', text: choice.response },
      { speaker: 'What this shows', kind: 'insight', text: choice.insight },
    ]);

    if (roundIndex < module.rounds.length - 1) {
      setRoundIndex((value) => value + 1);
    } else {
      setComplete(true);
    }
  };

  const reset = () => {
    setRoundIndex(0);
    setLog([{ speaker: 'Narration', kind: 'narration', text: module.intro }]);
    setComplete(false);
  };

  return (
    <ModuleFrame title={module.title} description={module.description}>
      <div className="message-log mb-4">
        {log.map((entry, index) => (
          <div key={`${entry.speaker}-${index}`} className={`message-row ${entry.kind}`}>
            <span className="message-speaker">{entry.speaker}</span>
            <div className={`message-bubble ${entry.kind}`}>{entry.text}</div>
          </div>
        ))}
      </div>

      {!complete ? (
        <div className="choice-panel">
          <p className="small-label mb-2">Prompt</p>
          <p className="mb-3">{round.prompt}</p>
          <div className="choice-grid">
            {round.choices.map((choice) => (
              <button key={choice.label} type="button" className="module-choice" onClick={() => handleChoice(choice)}>
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result-panel success">
          <p className="small-label mb-2">Chapter takeaway</p>
          <p className="mb-3">{module.completion}</p>
          <button type="button" className="subtle-button" onClick={reset}>
            Play the scene again
          </button>
        </div>
      )}
    </ModuleFrame>
  );
}

function TrustBuilder({ module }) {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const selectedOptions = module.options.filter((option) => selected.includes(option.id));
  const coveredThemes = Array.from(new Set(selectedOptions.flatMap((option) => option.themes))).filter((theme) =>
    Object.keys(module.themeLabels).includes(theme)
  );
  const missingThemes = Object.keys(module.themeLabels).filter((theme) => !coveredThemes.includes(theme));
  const score = selectedOptions.reduce((sum, option) => sum + option.points, 0);

  const summary = useMemo(() => {
    if (!submitted) return '';
    if (score >= 7 && missingThemes.length <= 1) {
      return 'Strong set. You chose features that make the platform legible, safer, and easier to enter for different users.';
    }
    if (score >= 4) {
      return 'Good start. The platform would be more inclusive if it covered a few more kinds of access and safety at once.';
    }
    return 'This selection leans more toward presentation than usability. Try choosing features that help people understand, trust, and safely use the resource.';
  }, [submitted, score, missingThemes.length]);

  const toggle = (id) => {
    setSubmitted(false);
    setSelected((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      if (current.length >= module.maxSelect) return current;
      return [...current, id];
    });
  };

  const reset = () => {
    setSelected([]);
    setSubmitted(false);
  };

  return (
    <ModuleFrame title={module.title} description={module.description}>
      <p className="small-label mb-2">Choose up to {module.maxSelect}</p>
      <div className="option-grid mb-4">
        {module.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`option-tile ${selected.includes(option.id) ? 'active' : ''}`}
            onClick={() => toggle(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button type="button" className="filter-button active-action" onClick={() => setSubmitted(true)}>
          Evaluate selection
        </button>
        <button type="button" className="subtle-button" onClick={reset}>
          Reset
        </button>
      </div>

      {submitted ? (
        <div className="result-panel">
          <p className="mb-2"><strong>Result:</strong> {summary}</p>
          <p className="mb-3 text-body-secondary">
            {missingThemes.length > 0
              ? `You are still missing: ${missingThemes.map((theme) => module.themeLabels[theme]).join(', ')}.`
              : 'You covered the main design themes: clarity, access, safety, and inclusion.'}
          </p>
          <div className="explanation-list">
            {selectedOptions.map((option) => (
              <div key={option.id} className="explanation-item">
                <p className="small-label mb-1">Selected feature</p>
                <p className="mb-1"><strong>{option.label}</strong></p>
                <p className="mb-0 text-body-secondary">{option.explanation}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 mb-0">{module.completion}</p>
        </div>
      ) : null}
    </ModuleFrame>
  );
}

function TimelineBuilder({ module }) {
  const [pool, setPool] = useState(() => shuffle(module.events));
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const correct =
    checked &&
    selected.length === module.events.length &&
    selected.every((event, index) => event.id === module.events[index].id);

  const pick = (event) => {
    if (selected.find((item) => item.id === event.id)) return;
    setChecked(false);
    setShowAnswer(false);
    setSelected((current) => [...current, event]);
  };

  const reset = () => {
    setPool(shuffle(module.events));
    setSelected([]);
    setChecked(false);
    setShowAnswer(false);
  };

  return (
    <ModuleFrame title={module.title} description={module.description}>
      <p className="small-label mb-2">Step 1: build the order</p>
      <div className="timeline-pool mb-4">
        {pool.map((event) => (
          <button
            key={event.id}
            type="button"
            className={`timeline-card ${selected.find((item) => item.id === event.id) ? 'used' : ''}`}
            onClick={() => pick(event)}
            disabled={Boolean(selected.find((item) => item.id === event.id))}
          >
            {event.label}
          </button>
        ))}
      </div>

      <p className="small-label mb-2">Step 2: review your timeline</p>
      <div className="timeline-build mb-4">
        {module.events.map((event, index) => {
          const chosen = selected[index];
          const isRight = checked && chosen && chosen.id === event.id;
          const isWrong = checked && chosen && chosen.id !== event.id;
          return (
            <div key={event.id} className={`timeline-slot ${isRight ? 'right' : ''} ${isWrong ? 'wrong' : ''}`}>
              <span className="slot-index">{index + 1}</span>
              <div>
                <p className="mb-1">{chosen ? chosen.label : 'Choose the next event from the pool above.'}</p>
                {checked && (isRight || isWrong) ? (
                  <p className="mb-0 text-body-secondary">
                    {(showAnswer || isRight) ? event.explanation : 'Reconsider what the community needs to know first.'}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="filter-button active-action" onClick={() => setChecked(true)}>
          Check order
        </button>
        <button type="button" className="subtle-button" onClick={() => setShowAnswer(true)}>
          Reveal suggested order
        </button>
        <button type="button" className="subtle-button" onClick={reset}>
          Reset
        </button>
      </div>

      {checked ? (
        <div className={`result-panel mt-4 ${correct ? 'success' : ''}`}>
          <p className="mb-2">
            <strong>{correct ? 'Nicely sequenced.' : 'Almost there.'}</strong>{' '}
            {correct
              ? module.completion
              : 'Think about why visibility usually comes before logistics, and why reflection happens after the response.'}
          </p>
        </div>
      ) : null}
    </ModuleFrame>
  );
}

function PowerSorter({ module }) {
  const [responses, setResponses] = useState({});
  const answeredCount = Object.keys(responses).length;
  const score = module.cards.filter((card) => responses[card.id] === card.answer).length;

  const choose = (cardId, value) => {
    setResponses((current) => ({ ...current, [cardId]: value }));
  };

  const reset = () => setResponses({});

  return (
    <ModuleFrame title={module.title} description={module.description}>
      <div className="classify-list mb-4">
        {module.cards.map((card) => {
          const picked = responses[card.id];
          const showFeedback = Boolean(picked);
          const correct = picked === card.answer;
          return (
            <div key={card.id} className="classify-card">
              <p className="mb-3">{card.prompt}</p>
              <div className="choice-set mb-3">
                {module.choices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    className={`mini-choice ${picked === choice.id ? 'active' : ''}`}
                    onClick={() => choose(card.id, choice.id)}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
              {showFeedback ? (
                <div className={`feedback-inline ${correct ? 'success' : 'warning'}`}>
                  <p className="small-label mb-1">{correct ? 'Why this fits' : 'Look again'}</p>
                  <p className="mb-0 text-body-secondary">{card.explanation}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="d-flex flex-wrap gap-2 align-items-center">
        <button type="button" className="subtle-button" onClick={reset}>
          Reset
        </button>
        <span className="result-chip">Answered {answeredCount}/{module.cards.length}</span>
        {answeredCount === module.cards.length ? (
          <span className="result-chip strong">Score {score}/{module.cards.length}</span>
        ) : null}
      </div>

      {answeredCount === module.cards.length ? (
        <div className="result-panel mt-4 success">
          <p className="mb-0">{module.completion}</p>
        </div>
      ) : null}
    </ModuleFrame>
  );
}

function ChannelPlanner({ module }) {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const selectedOptions = module.options.filter((option) => selected.includes(option.id));
  const covered = Array.from(new Set(selectedOptions.flatMap((option) => option.tags)));
  const missing = module.idealTags.filter((tag) => !covered.includes(tag));
  const score = selectedOptions.reduce((sum, option) => sum + option.points, 0);

  const summary = useMemo(() => {
    if (!submitted) return '';
    if (missing.length === 0 && score >= 5) {
      return 'Excellent mix. You built a stack that reaches people quickly and allows more than one kind of user to stay connected.';
    }
    if (missing.length <= 1 && score >= 3) {
      return 'Solid plan. It covers most needs, but one more accessibility layer would make the network stronger.';
    }
    return 'This plan reaches some people, but not enough kinds of people. Inclusive outreach usually depends on several complementary channels.';
  }, [submitted, missing.length, score]);

  const toggle = (id) => {
    setSubmitted(false);
    setSelected((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      if (current.length >= module.maxSelect) return current;
      return [...current, id];
    });
  };

  const reset = () => {
    setSelected([]);
    setSubmitted(false);
  };

  return (
    <ModuleFrame title={module.title} description={module.description}>
      <p className="small-label mb-2">Choose {module.maxSelect} channels</p>
      <div className="option-grid mb-4">
        {module.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`option-tile ${selected.includes(option.id) ? 'active' : ''}`}
            onClick={() => toggle(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button type="button" className="filter-button active-action" onClick={() => setSubmitted(true)}>
          Evaluate outreach stack
        </button>
        <button type="button" className="subtle-button" onClick={reset}>
          Reset
        </button>
      </div>

      {submitted ? (
        <div className="result-panel">
          <p className="mb-2"><strong>Result:</strong> {summary}</p>
          <p className="mb-3 text-body-secondary">
            {missing.length > 0
              ? `Still missing: ${missing.map((tag) => module.tagLabels[tag]).join(', ')}.`
              : 'Your selection covers speed, low-bandwidth access, translation, and two-way feedback.'}
          </p>
          <div className="explanation-list">
            {selectedOptions.map((option) => (
              <div key={option.id} className="explanation-item">
                <p className="mb-1"><strong>{option.label}</strong></p>
                <p className="mb-0 text-body-secondary">{option.explanation}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 mb-0">{module.completion}</p>
        </div>
      ) : null}
    </ModuleFrame>
  );
}

function InteractiveModule({ module }) {
  if (module.type === 'chat') return <ChatSimulation module={module} />;
  if (module.type === 'trust') return <TrustBuilder module={module} />;
  if (module.type === 'timeline') return <TimelineBuilder module={module} />;
  if (module.type === 'power') return <PowerSorter module={module} />;
  if (module.type === 'planner') return <ChannelPlanner module={module} />;
  return null;
}

export default InteractiveModule;
