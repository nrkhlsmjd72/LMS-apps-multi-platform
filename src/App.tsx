import { useState, useEffect } from 'react';
import HomeScreen from '@/screens/HomeScreen';
import ScheduleScreen from '@/screens/ScheduleScreen';
import GradesScreen from '@/screens/GradesScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import MaterialsScreen from '@/screens/MaterialsScreen';
import BottomNav from '@/components/BottomNav';

export type Screen = 'home' | 'schedule' | 'materials' | 'grades' | 'profile';

export default function App() {
  const [active, setActive] = useState<Screen>('home');

  const navigate = (screen: Screen) => {
    setActive(screen);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eef2f7]">
      {/* Phone shell */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 390,
          height: 780,
          borderRadius: 40,
          boxShadow: '0 40px 80px rgba(15,23,42,0.18), 0 0 0 1px rgba(15,23,42,0.05)',
          background: '#f4f7fb',
        }}
      >
        {/* Ambient gradient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <div
            className="absolute rounded-full opacity-40"
            style={{
              width: 340, height: 340, top: -80, left: -60,
              background: 'radial-gradient(circle, #93c5fd 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute rounded-full opacity-30"
            style={{
              width: 300, height: 300, bottom: 60, right: -80,
              background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute rounded-full opacity-25"
            style={{
              width: 200, height: 200, top: '40%', left: '20%',
              background: 'radial-gradient(circle, #67e8f9 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        {/* Status bar */}
        <div className="relative z-10 flex items-center justify-between px-7 pt-5 pb-0">
          <span className="text-slate-500 text-xs font-semibold tracking-wide">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 items-end">
              {[3,5,7].map((h, i) => (
                <div key={i} className="w-1 bg-slate-500 rounded-sm" style={{ height: h }} />
              ))}
            </div>
            <svg className="w-3.5 h-3.5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" opacity="0.3"/>
              <path d="M10 5a5 5 0 100 10A5 5 0 0010 5z" opacity="0.6"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-6 h-3 rounded-sm border border-slate-400 p-px flex items-center">
                <div className="w-4 h-full bg-green-500 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div key={active} className="relative z-10 animate-fadeIn" style={{ height: 700, overflowY: 'auto', overflowX: 'hidden' }}>
          {active === 'home'      && <HomeScreen navigate={navigate} />}
          {active === 'schedule'  && <ScheduleScreen navigate={navigate} />}
          {active === 'materials' && <MaterialsScreen />}
          {active === 'grades'    && <GradesScreen />}
          {active === 'profile'   && <ProfileScreen navigate={navigate} />}
        </div>

        {/* Bottom nav */}
        <BottomNav active={active} navigate={navigate} />
      </div>
    </div>
  );
}
