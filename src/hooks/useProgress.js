import { useCallback, useEffect, useMemo, useState } from 'react';
import { achievements as defs } from '../data/achievements';

const KEY = 'mutual-aid-atlas-progress';
const EVENT = 'atlas-progress';

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    return {
      visited: raw?.visited || [],
      completed: raw?.completed || [],
      scores: raw?.scores || {},
      achievements: raw?.achievements || [],
      notified: raw?.notified || [],
    };
  } catch {
    return { visited: [], completed: [], scores: {}, achievements: [], notified: [] };
  }
}

function checkAchievements(data) {
  const earned = defs.filter((a) => a.check(data)).map((a) => a.id);
  return earned;
}

function write(data) {
  const earned = checkAchievements(data);
  const updated = { ...data, achievements: earned };
  localStorage.setItem(KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT));
  return updated;
}

export function useProgress() {
  const [data, setData] = useState(read);

  useEffect(() => {
    const sync = () => setData(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const newAchievements = useMemo(
    () => data.achievements.filter((id) => !data.notified.includes(id)),
    [data.achievements, data.notified],
  );

  const totalXP = useMemo(
    () => Object.values(data.scores).reduce((sum, s) => sum + s, 0),
    [data.scores],
  );

  const markVisited = useCallback((slug) => {
    const current = read();
    if (!current.visited.includes(slug)) {
      write({ ...current, visited: [...current.visited, slug] });
    }
  }, []);

  const markCompleted = useCallback((slug) => {
    const current = read();
    if (!current.completed.includes(slug)) {
      write({ ...current, completed: [...current.completed, slug] });
    }
  }, []);

  const markScore = useCallback((slug, score) => {
    const current = read();
    const best = Math.max(score, current.scores[slug] || 0);
    const updated = { ...current, scores: { ...current.scores, [slug]: best } };
    if (!updated.completed.includes(slug)) {
      updated.completed = [...updated.completed, slug];
    }
    write(updated);
  }, []);

  const acknowledgeAchievement = useCallback((id) => {
    const current = read();
    if (!current.notified.includes(id)) {
      write({ ...current, notified: [...current.notified, id] });
    }
  }, []);

  const reset = useCallback(() => {
    write({ visited: [], completed: [], scores: {}, achievements: [], notified: [] });
  }, []);

  return {
    visited: data.visited,
    completed: data.completed,
    scores: data.scores,
    achievements: data.achievements,
    newAchievements,
    totalXP,
    markVisited,
    markCompleted,
    markScore,
    acknowledgeAchievement,
    reset,
  };
}
