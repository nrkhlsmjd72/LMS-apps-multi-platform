import { useState, useEffect } from 'react';
import { Bell, Search, Zap, BookOpen, FlaskConical, Globe, Calculator, ChevronRight, AlertTriangle, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Screen } from '@/App';
import { ANNOUNCEMENTS, ANNOUNCEMENT_META } from '@/data/subjects';
import type { Announcement } from '@/data/subjects';

type Subject = { name: string; time: string; room: string; color: string; light: string; icon: LucideIcon };

const subjects: Subject[] = [
  { name: 'Matematika',           time: '08:00 – 09:30', room: 'Ruang 301', color: '#3b82f6', light: 'rgba(59,130,246,0.10)', icon: Calculator },
  { name: 'Bahasa Indonesia',     time: '09:45 – 11:15', room: 'Ruang 205', color: '#f59e0b', light: 'rgba(245,158,11,0.10)',  icon: BookOpen },
  { name: 'Ilmu Pengetahuan Alam', time: '11:30 – 13:00', room: 'Ruang 102', color: '#22c55e', light: 'rgba(34,197,94,0.10)',   icon: FlaskConical },
  { name: 'Bahasa Inggris',       time: '13:30 – 15:00', room: 'Ruang 208', color: '#a855f7', light: 'rgba(168,85,247,0.10)',  icon: Globe },
];

interface Props { navigate: (s: Screen) => void; }

export default function HomeScreen({ navigate }: Props) {
  const [waveDone, setWaveDone] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const [openAnnouncement, setOpenAnnouncement] = useState<Announcement | null>(null);
  const topAnnouncements = ANNOUNCEMENTS.slice(0, 3);

  useEffect(() => {
    const t = setTimeout(() => setWaveDone(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const hour = currentTime.getHours();
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam';
  const greetingEmoji = hour < 12 ? '☀️' : hour < 15 ? '🌤️' : hour < 18 ? '🌅' : '🌙';

  return (
    <div className="px-5 pt-4 pb-24 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between animate-fadeInUp">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
            >
              🧑‍🎓
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-[#f4f7fb]" />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium">Siswa · Kelas 8A</p>
            <h1 className="text-slate-800 font-bold text-lg leading-tight">
              Halo, Aisyah! <span className={waveDone ? '' : 'animate-wave inline-block'}>{greetingEmoji}</span>
            </h1>
            <p className="text-slate-400 text-xs">{greeting}, siap belajar hari ini?</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="glass w-9 h-9 rounded-xl flex items-center justify-center">
            <Search size={16} className="text-slate-500" />
          </button>
          <button className="glass w-9 h-9 rounded-xl flex items-center justify-center relative">
            <Bell size={16} className="text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div className="animate-fadeInUp delay-150">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-800 font-bold text-base">Menu Cepat</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Jadwal', gradient: 'linear-gradient(135deg,#3b82f6,#0ea5e9)', emoji: '📅', desc: '4 pelajaran',     screen: 'schedule'  as Screen },
            { label: 'Materi',  gradient: 'linear-gradient(135deg,#22c55e,#16a34a)', emoji: '📚', desc: 'Buku & modul',   screen: 'materials' as Screen },
            { label: 'Nilai',   gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)', emoji: '📊', desc: 'Rata-rata 87.5', screen: 'grades'    as Screen },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.screen)}
              className="card-press rounded-2xl p-3 text-left relative overflow-hidden"
              style={{ background: item.gradient, minHeight: 96 }}
            >
              <div className="absolute -bottom-2 -right-2 text-3xl opacity-25">{item.emoji}</div>
              <div className="text-2xl mb-1.5">{item.emoji}</div>
              <p className="text-white font-semibold text-xs leading-tight">{item.label}</p>
              <p className="text-white/80 text-[10px] mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Announcement banner */}
      {topAnnouncements.length > 0 && (
        <div className="animate-fadeInUp delay-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Bell size={14} className="text-blue-600" />
              <h2 className="text-slate-800 font-bold text-sm">Pengumuman</h2>
            </div>
            <button onClick={() => navigate('schedule')} className="text-blue-600 text-xs font-semibold flex items-center gap-0.5">
              Semua <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
            {topAnnouncements.map((a) => {
              const meta = ANNOUNCEMENT_META[a.type];
              return (
                <button
                  key={a.id}
                  onClick={() => setOpenAnnouncement(a)}
                  className="card-press flex-shrink-0 w-60 rounded-2xl p-3.5 text-left relative"
                  style={{ background: meta.bg, border: `1px solid ${meta.color}30` }}
                >
                  {a.urgent && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-white">
                      <AlertTriangle size={10} className="text-white" />
                    </div>
                  )}
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${meta.color}20`, color: meta.color }}>{meta.label}</span>
                  <p className="text-slate-800 font-semibold text-sm mt-2 leading-tight">{a.title}</p>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{a.body}</p>
                  <p className="text-slate-400 text-[10px] mt-2">{a.date}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Today's Schedule */}
      <div className="animate-fadeInUp delay-300">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-800 font-bold text-base">Jadwal Hari Ini</h2>
          <button onClick={() => navigate('schedule')} className="text-blue-600 text-xs font-semibold flex items-center gap-0.5">
            Lihat Semua <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2.5">
          {subjects.map((s, i) => {
            const Icon = s.icon;
            const isTapped = tappedIdx === i;
            return (
              <div
                key={i}
                className="card-press rounded-2xl p-3.5 flex items-center gap-3 animate-fadeInUp"
                style={{ background: '#ffffff', border: `1px solid ${s.color}30`, boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}
                onClick={() => setTappedIdx(isTapped ? null : i)}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-semibold text-sm">{s.name}</p>
                  <p className="text-slate-400 text-xs">{s.time}</p>
                  {isTapped && (
                    <p className="text-slate-400 text-xs mt-1 animate-fadeIn">{s.room} · Klik untuk detail</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-lg"
                    style={{ background: `${s.color}18`, color: s.color }}
                  >
                    {s.room}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily tip */}
      <div
        className="animate-fadeInUp delay-400 rounded-2xl p-4 flex gap-3 items-start"
        style={{ background: '#f3e8ff', border: '1px solid rgba(168,85,247,0.2)' }}
      >
        <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-purple-600" />
        </div>
        <div>
          <p className="text-purple-700 font-semibold text-sm">Tip Belajar Hari Ini</p>
          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">Istirahat 5 menit setiap 25 menit belajar bisa meningkatkan fokus dan daya ingat kamu secara signifikan! 🧠</p>
        </div>
      </div>

      {/* Announcement modal */}
      {openAnnouncement && (
        <AnnouncementModal announcement={openAnnouncement} onClose={() => setOpenAnnouncement(null)} />
      )}

    </div>
  );
}

function AnnouncementModal({ announcement, onClose }: { announcement: Announcement; onClose: () => void }) {
  const meta = ANNOUNCEMENT_META[announcement.type];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5" style={{ background: 'rgba(15,23,42,0.4)' }} onClick={onClose}>
      <div
        className="w-full rounded-3xl p-5 animate-bounce-in"
        style={{ background: '#ffffff', boxShadow: '0 20px 60px rgba(15,23,42,0.25)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: `${meta.color}18`, color: meta.color }}>{meta.label}</span>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
            <X size={16} className="text-slate-500" />
          </button>
        </div>
        {announcement.urgent && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl bg-red-50 border border-red-200">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-red-600 text-xs font-semibold">Penting — perlu perhatian kamu</span>
          </div>
        )}
        <h2 className="text-slate-800 font-bold text-lg mb-2">{announcement.title}</h2>
        <p className="text-slate-600 text-sm leading-relaxed">{announcement.body}</p>
        <p className="text-slate-400 text-xs mt-4">{announcement.date}</p>
      </div>
    </div>
  );
}
