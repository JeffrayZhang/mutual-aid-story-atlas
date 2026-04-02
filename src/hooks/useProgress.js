import { useCallback, useEffect, useState } from 'react';

const KEY = 'mutual-aid-atlas-progress';
const EVENT = 'atlas-progress';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { visited: [], completed: [] };
  } catch {
    return { visited: [], completed: [] };
  }
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(EVENT));
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

  const reset = useCallback(() => {
    write({ visited: [], completed: [] });
  }, []);

  return { visited: data.visited, completed: data.completed, markVisited, markCompleted, reset };
}
