import { useState } from 'react';
import { Calculator, BookOpen, FlaskConical, Globe, TrendingUp, TrendingDown, Award, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Subject = {
  name: string;
  code: string;
  scores: { label: string; value: number }[];
  average: number;
  trend: 'up' | 'down' | 'same';
  color: string;
  icon: LucideIcon;
};

const subjects: Subject[] = [
  {
    name: 'Matematika', code: 'MTK', color: '#3b82f6', icon: Calculator, average: 92, trend: 'up',
    scores: [
      { label: 'Tugas', value: 90 },
      { label: 'UH 1', value: 88 },
      { label: 'UH 2', value: 95 },
      { label: 'Ujian', value: 95 },
    ],
  },
  {
    name: 'Bahasa Indonesia', code: 'BIN', color: '#f59e0b', icon: BookOpen, average: 85, trend: 'up',
    scores: [
      { label: 'Tugas', value: 82 },
      { label: 'UH 1', value: 84 },
      { label: 'UH 2', value: 87 },
      { label: 'Ujian', value: 87 },
    ],
  },
  {
    name: 'Ilmu Pengetahuan Alam', code: 'IPA', color: '#22c55e', icon: FlaskConical, average: 88, trend: 'down',
    scores: [
      { label: 'Tugas', value: 90 },
      { label: 'UH 1', value: 91 },
      { label: 'UH 2', value: 85 },
      { label: 'Ujian', value: 86 },
    ],
  },
  {
    name: 'Bahasa Inggris', code: 'BIG', color: '#a855f7', icon: Globe, average: 79, trend: 'up',
    scores: [
      { label: 'Tugas', value: 75 },
      { label: 'UH 1', value: 78 },
      { label: 'UH 2', value: 82 },
      { label: 'Ujian', value: 81 },
    ],
  },
];

function gradeLetter(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'E';
}

function gradeColor(score: number): string {
  if (score >= 90) return '#16a34a';
  if (score >= 80) return '#2563eb';
  if (score >= 70) return '#d97706';
  return '#dc2626';
}

export default function GradesScreen() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const overallAvg = Math.round(subjects.reduce((sum, s) => sum + s.average, 0) / subjects.length);

  return (
    <div className="px-5 pt-4 pb-24 space-y-5">
      <div className="animate-fadeInUp">
        <p className="text-slate-500 text-xs">Semester Genap 2024/2025</p>
        <h1 className="text-slate-800 font-bold text-2xl">Nilai Pelajaran</h1>
      </div>

      {/* Overall summary card */}
      <div
        className="animate-fadeInUp delay-100 rounded-2xl p-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#dbeafe 0%,#e0e7ff 100%)', border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 4px 16px rgba(59,130,246,0.12)' }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle,#60a5fa,transparent)' }} />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs">Rata-rata Keseluruhan</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-slate-800 font-bold text-4xl">{overallAvg}</span>
              <span className="text-slate-400 text-sm">/ 100</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-green-600" />
              <span className="text-green-600 text-xs font-semibold">+2.3 dari semester lalu</span>
            </div>
          </div>
          <div className="relative w-20 h-20">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(15,23,42,0.1)" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="34" fill="none" stroke="url(#gradOverall)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - overallAvg / 100)}`}
                transform="rotate(-90 40 40)"
              />
              <defs>
                <linearGradient id="gradOverall" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-slate-800 font-bold text-lg">{gradeLetter(overallAvg)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/70 rounded-xl p-2.5 text-center" style={{ border: '1px solid rgba(15,23,42,0.06)' }}>
            <p className="text-slate-400 text-[10px]">Peringkat</p>
            <p className="text-slate-800 font-bold text-sm">#3</p>
          </div>
          <div className="bg-white/70 rounded-xl p-2.5 text-center" style={{ border: '1px solid rgba(15,23,42,0.06)' }}>
            <p className="text-slate-400 text-[10px]">Hadir</p>
            <p className="text-slate-800 font-bold text-sm">96%</p>
          </div>
          <div className="bg-white/70 rounded-xl p-2.5 text-center" style={{ border: '1px solid rgba(15,23,42,0.06)' }}>
            <p className="text-slate-400 text-[10px]">Tugas</p>
            <p className="text-slate-800 font-bold text-sm">28/30</p>
          </div>
        </div>
      </div>

      {/* Subject list */}
      <div className="space-y-3">
        {subjects.map((s, i) => {
          const Icon = s.icon;
          const isOpen = expanded === i;
          const TrendIcon = s.trend === 'up' ? TrendingUp : s.trend === 'down' ? TrendingDown : Target;
          return (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-fadeInUp"
              style={{ background: '#ffffff', border: `1px solid ${s.color}25`, boxShadow: '0 2px 8px rgba(15,23,42,0.05)', animationDelay: `${0.15 + i * 0.05}s` }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full p-4 flex items-center gap-3 text-left card-press"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18` }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-800 font-semibold text-sm">{s.name}</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${s.color}18`, color: s.color }}>{s.code}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <TrendIcon size={11} color={s.trend === 'up' ? '#16a34a' : s.trend === 'down' ? '#dc2626' : '#d97706'} />
                    <span className="text-slate-400 text-xs">Rata-rata {s.average}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-2xl font-bold" style={{ color: gradeColor(s.average) }}>{s.average}</span>
                  <p className="text-slate-400 text-[10px]">Grade {gradeLetter(s.average)}</p>
                </div>
                <div className="text-slate-300 text-xs ml-1" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 animate-fadeIn">
                  <div className="space-y-2.5">
                    {s.scores.map((score, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs w-12">{score.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full progress-bar"
                            style={{
                              ['--target-w' as string]: `${score.value}%`,
                              width: `${score.value}%`,
                              background: `linear-gradient(90deg, ${s.color}, ${s.color}cc)`,
                            } as React.CSSProperties}
                          />
                        </div>
                        <span className="text-slate-800 font-semibold text-sm w-8 text-right">{score.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Award size={12} color={s.color} />
                      <span className="text-slate-500 text-xs">Prediksi Raport</span>
                    </div>
                    <span className="font-bold text-sm" style={{ color: gradeColor(s.average) }}>{gradeLetter(s.average)} ({s.average})</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
