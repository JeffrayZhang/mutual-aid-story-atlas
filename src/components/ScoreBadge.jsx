function ScoreBadge({ score }) {
  if (score == null) return null;
  return <span className="score-badge">Score: {score}%</span>;
}

export default ScoreBadge;
