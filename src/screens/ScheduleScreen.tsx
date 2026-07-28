import { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, AlertTriangle, Bell, X, BookOpen, FileText, PlayCircle, ClipboardList, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Screen } from '@/App';
import { ANNOUNCEMENTS, ANNOUNCEMENT_META } from '@/data/subjects';
import type { Announcement, LessonMaterial } from '@/data/subjects';
import { useDownload } from '@/components/useDownload';

const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const todayIdx = 1;

type Lesson = { name: string; time: string; room: string; color: string; icon: LucideIcon; teacher: string; topic: string; materials: LessonMaterial[] };

const schedule: Record<number, Lesson[]> = {
  0: [
    { name: 'Matematika', time: '08:00 – 09:30', room: 'Ruang 301', color: '#3b82f6', icon: BookOpen, teacher: 'Pak Andi', topic: 'Sistem Persamaan Linear',
      materials: [
        { type: 'modul', title: 'Bab 3 — SPLDV', desc: 'Konsep & penyelesaian', size: '2.4 MB' },
        { type: 'tugas', title: 'Latihan Soal SPLDV', desc: '20 soal + pembahasan', due: 'Jumat, 18 Jul' },
      ] },
    { name: 'Bahasa Indonesia', time: '09:45 – 11:15', room: 'Ruang 205', color: '#f59e0b', icon: BookOpen, teacher: 'Bu Sari', topic: 'Teks Berita',
      materials: [
        { type: 'modul', title: 'Teks Berita & Strukturnya', desc: 'Modul membaca', size: '1.8 MB' },
      ] },
    { name: 'Istirahat', time: '11:15 – 12:45', room: 'Kantin', color: '#94a3b8', icon: Clock, teacher: '', topic: '', materials: [] },
    { name: 'Ilmu Pengetahuan Alam', time: '12:45 – 14:15', room: 'Ruang 102', color: '#22c55e', icon: BookOpen, teacher: 'Pak Budi', topic: 'Sistem Pernapasan',
      materials: [
        { type: 'modul', title: 'Sistem Pernapasan Manusia', desc: 'Modul organ pernapasan', size: '3.1 MB' },
        { type: 'video', title: 'Video Proses Fotosintesis', desc: 'Animasi 8 menit', size: '' },
      ] },
  ],
  1: [
    { name: 'Bahasa Inggris', time: '08:00 – 09:30', room: 'Ruang 208', color: '#a855f7', icon: BookOpen, teacher: 'Ms. Lina', topic: 'Narrative Text',
      materials: [
        { type: 'modul', title: 'Narrative Text: Folk Tales', desc: 'Modul teks naratif', size: '1.5 MB' },
        { type: 'tugas', title: 'Reading Folk Tale', desc: 'Baca & rangkum', due: 'Rabu, 16 Jul' },
      ] },
    { name: 'Matematika', time: '09:45 – 11:15', room: 'Ruang 302', color: '#3b82f6', icon: BookOpen, teacher: 'Pak Andi', topic: 'Sistem Persamaan Linear',
      materials: [
        { type: 'modul', title: 'Bab 3 — SPLDV', desc: 'Konsep & penyelesaian', size: '2.4 MB' },
        { type: 'video', title: 'Cara Eliminasi & Substitusi', desc: 'Video 12 menit' },
      ] },
    { name: 'Istirahat', time: '11:15 – 12:45', room: 'Kantin', color: '#94a3b8', icon: Clock, teacher: '', topic: '', materials: [] },
    { name: 'Pendidikan Jasmani', time: '12:45 – 14:15', room: 'Lapangan', color: '#ef4444', icon: BookOpen, teacher: 'Pak Doni', topic: 'Teknik Dasar Voli',
      materials: [
        { type: 'modul', title: 'Panduan Voli & Sepak Bola', desc: 'Modul teknik dasar', size: '1.2 MB' },
      ] },
  ],
  2: [
    { name: 'Ilmu Pengetahuan Sosial', time: '08:00 – 09:30', room: 'Ruang 104', color: '#0ea5e9', icon: BookOpen, teacher: 'Bu Rini', topic: 'Kerajaan Hindu-Buddha',
      materials: [
        { type: 'modul', title: 'Kerajaan Hindu-Buddha di Nusantara', desc: 'Modul sejarah', size: '2.7 MB' },
      ] },
    { name: 'Matematika', time: '09:45 – 11:15', room: 'Ruang 301', color: '#3b82f6', icon: BookOpen, teacher: 'Pak Andi', topic: 'Sistem Persamaan Linear',
      materials: [
        { type: 'modul', title: 'Bab 3 — SPLDV', desc: 'Konsep & penyelesaian', size: '2.4 MB' },
      ] },
    { name: 'Istirahat', time: '11:15 – 12:45', room: 'Kantin', color: '#94a3b8', icon: Clock, teacher: '', topic: '', materials: [] },
    { name: 'Seni Budaya', time: '12:45 – 14:15', room: 'Ruang 110', color: '#ec4899', icon: BookOpen, teacher: 'Bu Maya', topic: 'Motif Batik',
      materials: [
        { type: 'modul', title: 'Seni Rupa: Nggambar Pola', desc: 'Modul motif batik', size: '2.0 MB' },
        { type: 'tugas', title: 'Buat Motif Batik Sendiri', desc: 'Tugas menggambar', due: 'Kamis, 17 Jul' },
      ] },
  ],
  3: [
    { name: 'Bahasa Indonesia', time: '08:00 – 09:30', room: 'Ruang 205', color: '#f59e0b', icon: BookOpen, teacher: 'Bu Sari', topic: 'Tulis Berita',
      materials: [
        { type: 'tugas', title: 'Tulis Berita Sekolah', desc: '200 kata', due: 'Senin, 21 Jul' },
      ] },
    { name: 'Ilmu Pengetahuan Alam', time: '09:45 – 11:15', room: 'Ruang 102', color: '#22c55e', icon: BookOpen, teacher: 'Pak Budi', topic: 'Fotosintesis',
      materials: [
        { type: 'tugas', title: 'Praktikum Fotosintesis', desc: 'Panduan praktikum daun', due: 'Jumat, 18 Jul' },
        { type: 'video', title: 'Video: Proses Fotosintesis', desc: 'Animasi 8 menit' },
      ] },
    { name: 'Istirahat', time: '11:15 – 12:45', room: 'Kantin', color: '#94a3b8', icon: Clock, teacher: '', topic: '', materials: [] },
    { name: 'Bahasa Inggris', time: '12:45 – 14:15', room: 'Ruang 208', color: '#a855f7', icon: BookOpen, teacher: 'Ms. Lina', topic: 'Narrative Text',
      materials: [
        { type: 'modul', title: 'Narrative Text: Folk Tales', desc: 'Modul teks naratif', size: '1.5 MB' },
      ] },
  ],
  4: [
    { name: 'Pendidikan Agama', time: '08:00 – 09:30', room: 'Ruang 106', color: '#14b8a6', icon: BookOpen, teacher: 'Pak Yusuf', topic: 'Akhlak Terpuji',
      materials: [
        { type: 'modul', title: 'Nilai-nilai Akhlak', desc: 'Modul akhlak', size: '1.6 MB' },
      ] },
    { name: 'Matematika', time: '09:45 – 11:15', room: 'Ruang 301', color: '#3b82f6', icon: BookOpen, teacher: 'Pak Andi', topic: 'Latihan SPLDV',
      materials: [
        { type: 'tugas', title: 'Latihan Soal SPLDV', desc: '20 soal + pembahasan', due: 'Jumat, 18 Jul' },
      ] },
    { name: 'Istirahat', time: '11:15 – 12:45', room: 'Kantin', color: '#94a3b8', icon: Clock, teacher: '', topic: '', materials: [] },
    { name: 'Prakarya', time: '12:45 – 14:15', room: 'Ruang 110', color: '#f59e0b', icon: BookOpen, teacher: 'Bu Dewi', topic: 'Kerajinan Tangan',
      materials: [
        { type: 'modul', title: 'Panduan Kerajinan', desc: 'Modul prakarya', size: '1.0 MB' },
      ] },
  ],
  5: [
    { name: 'Pengembangan Diri', time: '08:00 – 10:00', room: 'Aula', color: '#a855f7', icon: BookOpen, teacher: 'Wali Kelas', topic: 'Evaluasi Mingguan',
      materials: [] },
  ],
};

const MAT_ICON: Record<LessonMaterial['type'], LucideIcon> = {
  buku: BookOpen,
  modul: FileText,
  video: PlayCircle,
  tugas: ClipboardList,
  presentasi: FileText,
};

const MAT_COLOR: Record<LessonMaterial['type'], string> = {
  buku: '#3b82f6',
  modul: '#f59e0b',
  video: '#ef4444',
  tugas: '#d97706',
  presentasi: '#a855f7',
};

type SubTab = 'harian' | 'kalender';

interface Props { navigate: (s: Screen) => void; }

export default function ScheduleScreen({ navigate: _navigate }: Props) {
  const [subTab, setSubTab] = useState<SubTab>('harian');
  const [selectedDay, setSelectedDay] = useState(todayIdx);
  const [openLesson, setOpenLesson] = useState<Lesson | null>(null);
  const [openAnnouncement, setOpenAnnouncement] = useState<Announcement | null>(null);
  const { download, DownloadToast, busyId } = useDownload();

  const lessons = schedule[selectedDay] || [];
  const scheduleAnnouncements = ANNOUNCEMENTS.filter((a) => a.type === 'jadwal' || a.type === 'umum');

  return (
    <div className="px-5 pt-4 pb-24 space-y-5">
      <div className="animate-fadeInUp">
        <p className="text-slate-500 text-xs">Senin – Sabtu</p>
        <h1 className="text-slate-800 font-bold text-2xl">Jadwal Pelajaran</h1>
      </div>

      {/* Announcement banner */}
      {scheduleAnnouncements.length > 0 && (
        <div className="animate-fadeInUp delay-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Bell size={14} className="text-blue-600" />
              <h2 className="text-slate-800 font-bold text-sm">Pengumuman</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">{scheduleAnnouncements.filter(a => a.urgent).length} baru</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
            {scheduleAnnouncements.map((a) => {
              const meta = ANNOUNCEMENT_META[a.type];
              return (
                <button
                  key={a.id}
                  onClick={() => setOpenAnnouncement(a)}
                  className="card-press flex-shrink-0 w-64 rounded-2xl p-3.5 text-left relative"
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

      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 rounded-2xl bg-slate-100 animate-fadeInUp delay-150">
        {(['harian', 'kalender'] as SubTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold nav-pill"
            style={{
              background: subTab === t ? '#ffffff' : 'transparent',
              color: subTab === t ? '#2563eb' : 'rgba(15,23,42,0.5)',
              boxShadow: subTab === t ? '0 2px 6px rgba(15,23,42,0.08)' : 'none',
            }}
          >
            {t === 'harian' ? 'Harian' : 'Kalender'}
          </button>
        ))}
      </div>

      {subTab === 'harian' ? (
        <>
          {/* Day selector */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar animate-fadeInUp delay-200">
            {days.map((d, i) => {
              const isToday = i === selectedDay;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className="flex-shrink-0 w-12 h-16 rounded-2xl flex flex-col items-center justify-center nav-pill"
                  style={{
                    background: isToday ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : '#ffffff',
                    border: isToday ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(15,23,42,0.08)',
                    boxShadow: isToday ? '0 4px 12px rgba(59,130,246,0.3)' : '0 2px 8px rgba(15,23,42,0.04)',
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: isToday ? 'white' : 'rgba(15,23,42,0.45)' }}>{d}</span>
                  <span className="text-base font-bold mt-1" style={{ color: isToday ? 'white' : 'rgba(15,23,42,0.75)' }}>{14 + i}</span>
                  {i === todayIdx && <div className="w-1 h-1 bg-white rounded-full mt-1" />}
                </button>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="space-y-3 animate-fadeInUp delay-250">
            {lessons.map((lesson, i) => {
              const Icon = lesson.icon;
              const isBreak = lesson.name === 'Istirahat';
              const hasMaterials = lesson.materials.length > 0;
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center pt-1 flex-shrink-0 w-14">
                    <span className="text-slate-400 text-[10px] font-semibold">{lesson.time.split(' ')[0]}</span>
                    <div className="w-px flex-1 mt-1" style={{ background: isBreak ? 'rgba(15,23,42,0.1)' : `${lesson.color}50` }} />
                  </div>
                  <button
                    onClick={() => !isBreak && setOpenLesson(lesson)}
                    className={`card-press flex-1 rounded-2xl p-3.5 mb-1 text-left ${isBreak ? 'opacity-60 cursor-default' : ''}`}
                    style={{
                      background: isBreak ? '#f1f5f9' : '#ffffff',
                      border: isBreak ? '1px dashed rgba(15,23,42,0.15)' : `1px solid ${lesson.color}30`,
                      boxShadow: isBreak ? 'none' : '0 2px 8px rgba(15,23,42,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${lesson.color}18` }}>
                        <Icon size={16} color={lesson.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-800 font-semibold text-sm">{lesson.name}</p>
                        <p className="text-slate-400 text-xs">{lesson.time}</p>
                        {lesson.teacher && <p className="text-slate-400 text-xs mt-0.5">{lesson.teacher} · {lesson.room}</p>}
                        {!isBreak && lesson.topic && (
                          <p className="text-xs font-semibold mt-1" style={{ color: lesson.color }}>Topik: {lesson.topic}</p>
                        )}
                      </div>
                      {!isBreak && hasMaterials && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg" style={{ background: `${lesson.color}12` }}>
                          <BookOpen size={10} color={lesson.color} />
                          <span className="text-[9px] font-bold" style={{ color: lesson.color }}>{lesson.materials.length}</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <CalendarView />
      )}

      {/* Lesson material modal */}
      {openLesson && (
        <LessonModal lesson={openLesson} onClose={() => setOpenLesson(null)} download={download} busyId={busyId} />
      )}

      {/* Announcement modal */}
      {openAnnouncement && (
        <AnnouncementModal announcement={openAnnouncement} onClose={() => setOpenAnnouncement(null)} />
      )}
      {DownloadToast}
    </div>
  );
}

function CalendarView() {
  const month = 'Juli 2025';
  const weeks = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
  ];
  const events: Record<number, { label: string; color: string }> = {
    15: { label: 'Matematika', color: '#3b82f6' },
    17: { label: 'Tugas Seni', color: '#ec4899' },
    18: { label: 'Tugas IPA', color: '#22c55e' },
    20: { label: 'Libur Raya', color: '#ef4444' },
    21: { label: 'Tugas BIN', color: '#f59e0b' },
    23: { label: 'Kembali Sekolah', color: '#a855f7' },
  };

  return (
    <div className="animate-fadeInUp delay-200">
      <div className="flex items-center justify-between mb-3">
        <button className="w-8 h-8 rounded-xl glass flex items-center justify-center"><ChevronLeft size={16} className="text-slate-500" /></button>
        <h2 className="text-slate-800 font-bold text-base">{month}</h2>
        <button className="w-8 h-8 rounded-xl glass flex items-center justify-center"><ChevronRight size={16} className="text-slate-500" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, i) => {
          const event = day ? events[day] : null;
          const isToday = day === 15;
          return (
            <div
              key={i}
              className="aspect-square rounded-xl flex flex-col items-center justify-center text-xs relative"
              style={{
                background: day ? (event ? `${event.color}15` : '#ffffff') : 'transparent',
                border: day ? `1px solid ${event ? event.color + '30' : 'rgba(15,23,42,0.06)'}` : 'none',
                boxShadow: day && !event ? '0 1px 4px rgba(15,23,42,0.03)' : 'none',
              }}
            >
              {day && (
                <span className={`font-semibold ${isToday ? 'text-white' : 'text-slate-700'}`}
                  style={isToday ? { background: '#2563eb', width: 22, height: 22, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' } : undefined}
                >
                  {day}
                </span>
              )}
              {event && <div className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ background: event.color }} />}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="mt-4 space-y-2">
        <h3 className="text-slate-800 font-bold text-sm">Acara Bulan Ini</h3>
        {Object.entries(events).map(([day, ev]) => (
          <div key={day} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: `${ev.color}10`, border: `1px solid ${ev.color}25` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${ev.color}20`, color: ev.color }}>{day}</div>
            <span className="text-slate-700 text-sm font-medium">{ev.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LessonModal({ lesson, onClose, download, busyId }: { lesson: Lesson; onClose: () => void; download: ReturnType<typeof useDownload>['download']; busyId: string | null }) {
  const Icon = lesson.icon;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(15,23,42,0.4)' }} onClick={onClose}>
      <div
        className="w-full rounded-t-3xl p-5 animate-fadeInUp"
        style={{ background: '#ffffff', maxHeight: '80%', overflowY: 'auto', boxShadow: '0 -10px 40px rgba(15,23,42,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-4" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${lesson.color}18` }}>
            <Icon size={24} color={lesson.color} />
          </div>
          <div className="flex-1">
            <h2 className="text-slate-800 font-bold text-lg">{lesson.name}</h2>
            <p className="text-slate-400 text-xs">{lesson.time} · {lesson.room}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        <div className="rounded-2xl p-3 mb-4" style={{ background: `${lesson.color}10`, border: `1px solid ${lesson.color}25` }}>
          <p className="text-slate-400 text-xs">Topik hari ini</p>
          <p className="text-slate-800 font-semibold text-sm">{lesson.topic}</p>
          <p className="text-slate-400 text-xs mt-1">Pengajar: {lesson.teacher}</p>
        </div>

        <h3 className="text-slate-800 font-bold text-sm mb-3">Materi & Tugas Pelajaran</h3>
        {lesson.materials.length > 0 ? (
          <div className="space-y-2.5">
            {lesson.materials.map((mat, i) => {
              const MatIcon = MAT_ICON[mat.type];
              const matColor = MAT_COLOR[mat.type];
              return (
                <div key={i} className="card-press rounded-2xl p-3.5 flex items-center gap-3" style={{ background: '#f8fafc', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${matColor}18` }}>
                    <MatIcon size={18} color={matColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 font-semibold text-sm leading-tight">{mat.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{mat.desc}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {mat.size && <span className="text-slate-400 text-[10px]">{mat.size}</span>}
                      {mat.due && <span className="text-amber-600 text-[10px] font-semibold">Tenggat: {mat.due}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => download({ id: `${lesson.name}-${i}`, title: mat.title, desc: mat.desc, type: mat.type, subject: lesson.name, size: mat.size, due: mat.due })}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${matColor}15` }}
                  >
                    {mat.type === 'video' ? <PlayCircle size={16} color={matColor} /> : <Download size={16} color={matColor} />}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-400 text-sm text-center py-6">Belum ada materi untuk pelajaran ini.</p>
        )}
      </div>
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
