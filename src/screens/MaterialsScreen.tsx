import { useState } from 'react';
import { BookOpen, FileText, Video, ClipboardList, Presentation, Search, ChevronRight, Download, PlayCircle, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SUBJECTS } from '@/data/subjects';
import type { Subject } from '@/data/subjects';
import { useDownload } from '@/components/useDownload';

type MaterialType = 'buku' | 'modul' | 'video' | 'tugas' | 'presentasi';

interface Material {
  id: string;
  title: string;
  desc: string;
  type: MaterialType;
  size?: string;
  duration?: string;
  due?: string;
  done?: boolean;
}

const MATERIALS: Record<string, Material[]> = {
  mtk: [
    { id: 'm1', title: 'Bab 3 — Sistem Persamaan Linear', desc: 'Konsep & penyelesaian SPL dua variabel', type: 'modul', size: '2.4 MB' },
    { id: 'm2', title: 'Latihan Soal SPLDV', desc: '20 soal latihan dengan pembahasan', type: 'tugas', due: 'Jumat, 18 Jul' },
    { id: 'm3', title: 'Video: Cara Eliminasi & Substitusi', desc: 'Penjelasan visual metode eliminasi', type: 'video', duration: '12 mnt' },
    { id: 'm4', title: 'Matematika SMP Kelas 8', desc: 'Buku teks resma Kurikulum Merdeka', type: 'buku', size: '18 MB' },
  ],
  bin: [
    { id: 'b1', title: 'Teks Berita & Strukturnya', desc: 'Modul membaca teks berita', type: 'modul', size: '1.8 MB' },
    { id: 'b2', title: 'Tulis Berita Sekolah', desc: 'Tugas menulis berita 200 kata', type: 'tugas', due: 'Senin, 21 Jul' },
    { id: 'b3', title: 'Buku Bahasa Indonesia Kelas 8', desc: 'Buku teks resma', type: 'buku', size: '14 MB' },
  ],
  ipa: [
    { id: 'i1', title: 'Sistem Pernapasan Manusia', desc: 'Modul organ pernapasan', type: 'modul', size: '3.1 MB' },
    { id: 'i2', title: 'Praktikum Fotosintesis', desc: 'Panduan praktikum daun', type: 'tugas', due: 'Jumat, 18 Jul' },
    { id: 'i3', title: 'Video: Proses Fotosintesis', desc: 'Animasi proses fotosintesis', type: 'video', duration: '8 mnt' },
    { id: 'i4', title: 'IPA SMP Kelas 8', desc: 'Buku teks resma', type: 'buku', size: '22 MB' },
    { id: 'i5', title: 'Slide Sistem Pernapasan', desc: 'Presentasi kelas', type: 'presentasi', size: '5.2 MB' },
  ],
  big: [
    { id: 'g1', title: 'Narrative Text: Folk Tales', desc: 'Modul teks naratif', type: 'modul', size: '1.5 MB' },
    { id: 'g2', title: 'Reading Folk Tale', desc: 'Tugas membaca & merangkum', type: 'tugas', due: 'Rabu, 16 Jul' },
    { id: 'g3', title: 'Video: Narrative Text', desc: 'Penjelasan struktur narrative', type: 'video', duration: '10 mnt' },
  ],
  ips: [
    { id: 's1', title: 'Kerajaan Hindu-Buddha di Nusantara', desc: 'Modul sejarah Nusantara', type: 'modul', size: '2.7 MB' },
    { id: 's2', title: 'IPS SMP Kelas 8', desc: 'Buku teks resma', type: 'buku', size: '16 MB' },
  ],
  ork: [
    { id: 'o1', title: 'Panduan Voli & Sepak Bola', desc: 'Modul teknik dasar', type: 'modul', size: '1.2 MB' },
  ],
  sen: [
    { id: 'n1', title: 'Seni Rupa: Nggambar Pola', desc: 'Modul motif batik', type: 'modul', size: '2.0 MB' },
    { id: 'n2', title: 'Buat Motif Batik Sendiri', desc: 'Tugas menggambar motif', type: 'tugas', due: 'Kamis, 17 Jul' },
  ],
  agm: [
    { id: 'a1', title: 'Nilai-nilai Akhlak', desc: 'Modul akhlak terpuji', type: 'modul', size: '1.6 MB' },
    { id: 'a2', title: 'Pendidikan Agama Kelas 8', desc: 'Buku teks resma', type: 'buku', size: '11 MB' },
  ],
};

const TYPE_META: Record<MaterialType, { icon: LucideIcon; label: string; color: string; bg: string }> = {
  buku:       { icon: BookOpen,      label: 'Buku',        color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  modul:      { icon: FileText,      label: 'Modul',       color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  video:      { icon: PlayCircle,    label: 'Video',       color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  tugas:      { icon: ClipboardList, label: 'Tugas',       color: '#d97706', bg: 'rgba(217,119,6,0.12)' },
  presentasi: { icon: Presentation,  label: 'Presentasi',  color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
};

export default function MaterialsScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const { download, DownloadToast, busyId } = useDownload();

  const selected = selectedId ? SUBJECTS.find((s) => s.id === selectedId) : null;
  const filteredSubjects = query
    ? SUBJECTS.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : SUBJECTS;

  return (
    <div className="px-5 pt-4 pb-24 space-y-5">
      <div className="animate-fadeInUp">
        <p className="text-slate-500 text-xs">Pelajaran & Buku</p>
        <h1 className="text-slate-800 font-bold text-2xl">Materi Pelajaran</h1>
      </div>

      {/* Search */}
      <div className="relative animate-fadeInUp delay-100">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari mata pelajaran..."
          className="w-full bg-white rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          style={{ border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}
        />
      </div>

      {selected ? (
        <SubjectDetail subject={selected} onBack={() => setSelectedId(null)} download={download} busyId={busyId} />
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 animate-fadeInUp delay-150">
            <div className="glass rounded-2xl p-3 text-center">
              <p className="text-slate-800 font-bold text-lg">{SUBJECTS.length}</p>
              <p className="text-slate-400 text-[10px]">Mapel</p>
            </div>
            <div className="glass rounded-2xl p-3 text-center">
              <p className="text-slate-800 font-bold text-lg">
                {Object.values(MATERIALS).reduce((n, arr) => n + arr.length, 0)}
              </p>
              <p className="text-slate-400 text-[10px]">Materi</p>
            </div>
            <div className="glass rounded-2xl p-3 text-center">
              <p className="text-slate-800 font-bold text-lg">3</p>
              <p className="text-slate-400 text-[10px]">Tugas</p>
            </div>
          </div>

          {/* Subject grid */}
          <div className="animate-fadeInUp delay-200">
            <h2 className="text-slate-800 font-bold text-base mb-3">Pilih Mata Pelajaran</h2>
            <div className="grid grid-cols-2 gap-3">
              {filteredSubjects.map((s) => {
                const Icon = s.icon;
                const count = (MATERIALS[s.id] || []).length;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    className="card-press rounded-2xl p-4 text-left relative overflow-hidden"
                    style={{ background: '#ffffff', border: `1px solid ${s.color}25`, boxShadow: '0 2px 8px rgba(15,23,42,0.05)' }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: `${s.color}18` }}>
                      <Icon size={20} color={s.color} />
                    </div>
                    <p className="text-slate-800 font-semibold text-sm leading-tight">{s.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{s.teacher}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${s.color}18`, color: s.color }}>{s.code}</span>
                      <span className="text-slate-400 text-[10px]">{count} materi</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
      {DownloadToast}
    </div>
  );
}

function SubjectDetail({ subject, onBack, download, busyId }: { subject: Subject; onBack: () => void; download: ReturnType<typeof useDownload>['download']; busyId: string | null }) {
  const Icon = subject.icon;
  const items = MATERIALS[subject.id] || [];
  const tasks = items.filter((m) => m.type === 'tugas');
  const bookCount = items.filter((m) => m.type === 'buku').length;
  const videoCount = items.filter((m) => m.type === 'video').length;

  return (
    <div className="animate-fadeInUp space-y-4">
      {/* Header */}
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}cc)`, boxShadow: `0 6px 18px ${subject.color}40` }}
      >
        <button onClick={onBack} className="text-white/80 text-xs font-semibold mb-3 flex items-center gap-1">
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Kembali
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">{subject.name}</h2>
            <p className="text-white/80 text-xs">{subject.teacher} · {items.length} materi tersedia</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/20 rounded-xl p-2 text-center">
            <p className="text-white font-bold text-sm">{bookCount}</p>
            <p className="text-white/70 text-[10px]">Buku</p>
          </div>
          <div className="bg-white/20 rounded-xl p-2 text-center">
            <p className="text-white font-bold text-sm">{videoCount}</p>
            <p className="text-white/70 text-[10px]">Video</p>
          </div>
          <div className="bg-white/20 rounded-xl p-2 text-center">
            <p className="text-white font-bold text-sm">{tasks.length}</p>
            <p className="text-white/70 text-[10px]">Tugas</p>
          </div>
        </div>
      </div>

      {/* Materials list */}
      <div className="space-y-2.5">
        {items.map((item, i) => {
          const meta = TYPE_META[item.type];
          const ItemIcon = meta.icon;
          return (
            <div
              key={item.id}
              className="card-press rounded-2xl p-3.5 flex items-center gap-3 animate-fadeInUp"
              style={{ background: '#ffffff', border: `1px solid ${subject.color}20`, boxShadow: '0 2px 8px rgba(15,23,42,0.05)', animationDelay: `${0.05 * i}s` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: meta.bg }}>
                <ItemIcon size={18} color={meta.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-semibold text-sm leading-tight">{item.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: meta.bg, color: meta.color }}>{meta.label}</span>
                  {item.size && <span className="text-slate-400 text-[10px]">{item.size}</span>}
                  {item.duration && (
                    <span className="text-slate-400 text-[10px] flex items-center gap-0.5"><Clock size={9} />{item.duration}</span>
                  )}
                  {item.due && (
                    <span className="text-amber-600 text-[10px] font-semibold flex items-center gap-0.5"><Clock size={9} />{item.due}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => download({ id: item.id, title: item.title, desc: item.desc, type: meta.label, subject: subject.name, size: item.size, duration: item.duration, due: item.due })}
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${subject.color}12` }}
              >
                {item.type === 'video' ? <PlayCircle size={16} color={subject.color} /> : <Download size={16} color={subject.color} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
