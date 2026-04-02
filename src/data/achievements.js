export const achievements = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Visit your first chapter',
    icon: 'Footprints',
    check: (p) => p.visited.length >= 1,
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit all five city chapters',
    icon: 'Compass',
    check: (p) => p.visited.length >= 5,
  },
  {
    id: 'first-win',
    title: 'First Win',
    description: 'Complete any interactive module',
    icon: 'Star',
    check: (p) => p.completed.length >= 1,
  },
  {
    id: 'globe-trotter',
    title: 'Globe Trotter',
    description: 'Complete all five interactive modules',
    icon: 'Globe',
    check: (p) => p.completed.length >= 5,
  },
  {
    id: 'sharp-mind',
    title: 'Sharp Mind',
    description: 'Score 100% on any module',
    icon: 'Zap',
    check: (p) => Object.values(p.scores || {}).some((s) => s === 100),
  },
  {
    id: 'high-achiever',
    title: 'High Achiever',
    description: 'Average 80%+ across all completed modules',
    icon: 'Award',
    check: (p) => {
      const scores = Object.values(p.scores || {});
      if (scores.length < 2) return false;
      return scores.reduce((a, b) => a + b, 0) / scores.length >= 80;
    },
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Score 100% on all five modules',
    icon: 'Crown',
    check: (p) => {
      const scores = Object.values(p.scores || {});
      return scores.length >= 5 && scores.every((s) => s === 100);
    },
  },
];
