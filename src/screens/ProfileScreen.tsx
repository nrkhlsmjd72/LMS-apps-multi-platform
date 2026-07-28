import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Edit3, BookOpen, Calendar } from 'lucide-react';
import type { Screen } from '@/App';

const stats = [
  { label: 'Mata Pelajaran', value: '12', icon: BookOpen, color: '#3b82f6' },
  { label: 'Kehadiran', value: '96%', icon: Calendar, color: '#22c55e' },
  { label: 'Tugas Selesai', value: '8', icon: Shield, color: '#a855f7' },
];

const menu = [
  { label: 'Pengaturan',         icon: Settings,    color: '#64748b' },
  { label: 'Notifikasi',         icon: Bell,        color: '#3b82f6' },
  { label: 'Keamanan Akun',      icon: Shield,      color: '#22c55e' },
  { label: 'Bantuan & Dukungan', icon: HelpCircle,  color: '#a855f7' },
];

interface Props { navigate: (s: Screen) => void; }

export default function ProfileScreen({ navigate: _navigate }: Props) {
  return (
    <div className="px-5 pt-4 pb-24 space-y-5">
      {/* Header with avatar */}
      <div className="animate-fadeInUp flex flex-col items-center text-center pt-2">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl animate-float"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', boxShadow: '0 10px 30px rgba(59,130,246,0.3)' }}
          >
            🧑‍🎓
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-[#f4f7fb]">
            <Edit3 size={14} className="text-white" />
          </button>
        </div>
        <h1 className="text-slate-800 font-bold text-xl mt-3">Aisyah Putri Nuraini</h1>
        <p className="text-slate-400 text-xs mt-0.5">NISN 2024110087 · Kelas 8A</p>
        <span
          className="mt-2 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: 'rgba(59,130,246,0.12)', color: '#2563eb', border: '1px solid rgba(59,130,246,0.25)' }}
        >
          Siswa Aktif
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 animate-fadeInUp delay-100">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass rounded-2xl p-3 text-center">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-1.5" style={{ background: `${s.color}18` }}>
                <Icon size={14} color={s.color} />
              </div>
              <p className="text-slate-800 font-bold text-base">{s.value}</p>
              <p className="text-slate-400 text-[10px] mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Menu */}
      <div className="animate-fadeInUp delay-150 space-y-2">
        {menu.map((m, i) => {
          const Icon = m.icon;
          return (
            <button key={i} className="w-full glass rounded-2xl p-3.5 flex items-center gap-3 card-press">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${m.color}18` }}>
                <Icon size={16} color={m.color} />
              </div>
              <span className="text-slate-700 text-sm font-medium flex-1 text-left">{m.label}</span>
              <ChevronRight size={16} className="text-slate-300" />
            </button>
          );
        })}
        <button
          className="w-full rounded-2xl p-3.5 flex items-center gap-3 card-press"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.15)' }}>
            <LogOut size={16} color="#dc2626" />
          </div>
          <span className="text-red-600 text-sm font-semibold flex-1 text-left">Keluar</span>
        </button>
      </div>

      <p className="text-center text-slate-300 text-[10px]">SekolahKu v2.0 · Dibuat dengan ❤️</p>
    </div>
  );
}
