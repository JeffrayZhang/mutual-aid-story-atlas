import { useEffect, useState } from 'react';

const COLORS = ['#5cb9cd', '#cc9060', '#82a684', '#8e74ab', '#dca070', '#214d57', '#a16642'];
const COUNT = 40;

function makeParticles() {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.6 + Math.random() * 1.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 4 + Math.random() * 5,
    drift: -30 + Math.random() * 60,
    rotation: Math.random() * 720,
    shape: Math.random() > 0.5 ? '50%' : `${1 + Math.random() * 2}px`,
  }));
}

function Confetti({ onDone }) {
  const [particles] = useState(makeParticles);

  useEffect(() => {
    const timer = setTimeout(() => onDone?.(), 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="confetti-overlay" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            '--drift': `${p.drift}px`,
            '--rot': `${p.rotation}deg`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * (Math.random() > 0.5 ? 1.6 : 1)}px`,
            borderRadius: p.shape,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
