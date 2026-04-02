import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Compass, Crown, Footprints, Globe, Star, Zap } from 'lucide-react';

const iconMap = {
  Footprints,
  Compass,
  Star,
  Globe,
  Zap,
  Award,
  Crown,
};

function AchievementToast({ achievement, onDismiss }) {
  const Icon = iconMap[achievement.icon] || Star;

  useEffect(() => {
    const timer = setTimeout(onDismiss, 3500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      className="achievement-toast"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      role="status"
      aria-live="polite"
    >
      <div className="achievement-toast-icon">
        <Icon size={20} />
      </div>
      <div>
        <p className="achievement-toast-label">Achievement unlocked</p>
        <p className="achievement-toast-title">{achievement.title}</p>
        <p className="achievement-toast-desc">{achievement.description}</p>
      </div>
    </motion.div>
  );
}

function AchievementToastHost({ newAchievements, onAcknowledge, allAchievements }) {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!current && newAchievements.length > 0) {
      const def = allAchievements.find((a) => a.id === newAchievements[0]);
      if (def) setCurrent(def);
    }
  }, [newAchievements, current, allAchievements]);

  const handleDismiss = () => {
    if (current) {
      onAcknowledge(current.id);
      setCurrent(null);
    }
  };

  return (
    <AnimatePresence>
      {current && <AchievementToast key={current.id} achievement={current} onDismiss={handleDismiss} />}
    </AnimatePresence>
  );
}

export default AchievementToastHost;
