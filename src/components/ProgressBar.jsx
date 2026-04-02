import { storyChapters } from '../data/siteData';

function ProgressBar({ visited = [], completed = [] }) {
  return (
    <div className="journey-progress-track" aria-label={`${completed.length} of ${storyChapters.length} chapters completed`}>
      {storyChapters.map((chapter) => {
        const isDone = completed.includes(chapter.slug);
        const isSeen = visited.includes(chapter.slug);
        let cls = 'journey-progress-segment';
        if (isDone) cls += ' completed';
        else if (isSeen) cls += ' visited';
        else cls += ' empty';

        return <div key={chapter.slug} className={cls} title={`${chapter.city}${isDone ? ' (completed)' : isSeen ? ' (visited)' : ''}`} />;
      })}
    </div>
  );
}

export default ProgressBar;
