import { Award, Compass, Crown, Footprints, Globe, Lock, Star, Zap } from 'lucide-react';
import { achievements as allAchievements } from '../data/achievements';

const iconMap = { Footprints, Compass, Star, Globe, Zap, Award, Crown };

function AchievementPanel({ earned = [] }) {
  if (earned.length === 0) return null;

  return (
    <section className="section-spacing">
      <div className="paper-card">
        <p className="eyebrow mb-3">Achievements</p>
        <div className="achievement-grid">
          {allAchievements.map((a) => {
            const isEarned = earned.includes(a.id);
            const Icon = iconMap[a.icon] || Star;

            return (
              <div key={a.id} className={`achievement-tile ${isEarned ? 'earned' : 'locked'}`}>
                <div className="achievement-tile-icon">
                  {isEarned ? <Icon size={20} /> : <Lock size={16} />}
                </div>
                <p className="achievement-tile-title">{a.title}</p>
                <p className="achievement-tile-desc">{a.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AchievementPanel;
