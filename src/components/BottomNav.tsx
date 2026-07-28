import { Home, Calendar, BookMarked, BarChart2, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Screen } from '@/App';

interface Props {
  active: Screen;
  navigate: (s: Screen) => void;
}

const tabs: { id: Screen; icon: LucideIcon; label: string }[] = [
  { id: 'home',     icon: Home,       label: 'Beranda' },
  { id: 'schedule', icon: Calendar,   label: 'Jadwal' },
  { id: 'materials', icon: BookMarked, label: 'Materi' },
  { id: 'grades',   icon: BarChart2,  label: 'Nilai' },
  { id: 'profile',  icon: User,       label: 'Profil' },
];

export default function BottomNav({ active, navigate }: Props) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{
        background: 'rgba(255,255,255,0.94)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(15,23,42,0.08)',
        height: 72,
      }}
    >
      <div className="flex items-center justify-around h-full px-2">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              className="flex flex-col items-center gap-1 px-2.5 py-2 rounded-2xl nav-pill"
              style={{
                background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
              }}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 1.8}
                style={{ color: isActive ? '#2563eb' : 'rgba(15,23,42,0.4)' }}
              />
              <span
                className="text-[9px] font-semibold"
                style={{ color: isActive ? '#2563eb' : 'rgba(15,23,42,0.4)' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
