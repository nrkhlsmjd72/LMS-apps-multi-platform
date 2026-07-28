import type { LucideIcon } from 'lucide-react';
import { Calculator, BookOpen, FlaskConical, Globe, Dumbbell, Palette, Heart } from 'lucide-react';

export type SubjectIcon = LucideIcon;

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  icon: SubjectIcon;
  teacher: string;
}

export interface Lesson {
  name: string;
  time: string;
  room: string;
  color: string;
  icon: SubjectIcon;
  teacher: string;
  topic?: string;
  materials?: LessonMaterial[];
}

export interface LessonMaterial {
  type: 'buku' | 'modul' | 'video' | 'tugas' | 'presentasi';
  title: string;
  desc: string;
  size?: string;
  due?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: 'jadwal' | 'umum' | 'tugas' | 'acara';
  date: string;
  urgent?: boolean;
}

export const SUBJECTS: Subject[] = [
  { id: 'mtk', name: 'Matematika',            code: 'MTK', color: '#3b82f6', icon: Calculator,    teacher: 'Pak Andi' },
  { id: 'bin', name: 'Bahasa Indonesia',      code: 'BIN', color: '#f59e0b', icon: BookOpen,      teacher: 'Bu Sari' },
  { id: 'ipa', name: 'Ilmu Pengetahuan Alam', code: 'IPA', color: '#22c55e', icon: FlaskConical,  teacher: 'Pak Budi' },
  { id: 'big', name: 'Bahasa Inggris',        code: 'BIG', color: '#a855f7', icon: Globe,         teacher: 'Ms. Lina' },
  { id: 'ips', name: 'Ilmu Pengetahuan Sosial', code: 'IPS', color: '#0ea5e9', icon: BookOpen,    teacher: 'Bu Rini' },
  { id: 'ork', name: 'Pendidikan Jasmani',    code: 'ORK', color: '#ef4444', icon: Dumbbell,      teacher: 'Pak Doni' },
  { id: 'sen', name: 'Seni Budaya',           code: 'SEN', color: '#ec4899', icon: Palette,       teacher: 'Bu Maya' },
  { id: 'agm', name: 'Pendidikan Agama',      code: 'AGM', color: '#14b8a6', icon: Heart,         teacher: 'Pak Yusuf' },
];

export function subjectByCode(code: string): Subject | undefined {
  return SUBJECTS.find((s) => s.code === code);
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Perubahan Jadwal Matematika',
    body: 'Pelajaran Matematika hari Selasa pukul 09:45 dipindah ke Ruang 302 karena ruang 301 digunakan ujian kelas 9.',
    type: 'jadwal',
    date: 'Hari ini',
    urgent: true,
  },
  {
    id: 'a2',
    title: 'Pengumpulan Tugas IPA',
    body: 'Tugas praktikum "Pengamatan Fotosintesis" dikumpulkan paling lambat Jumat, 18 Juli pukul 23:59.',
    type: 'tugas',
    date: '2 hari lalu',
    urgent: true,
  },
  {
    id: 'a3',
    title: 'Libur Hari Raya',
    body: 'Sekolah libur tanggal 20–22 Juli dalam rangka Hari Raya. Pelajaran dilanjutkan Rabu, 23 Juli.',
    type: 'umum',
    date: '3 hari lalu',
  },
  {
    id: 'a4',
    title: 'Lomba Cerdas Cermat Antar Kelas',
    body: 'Pendaftaran lomba Cerdas Cermat dibuka. Hubungi wali kelas untuk ikut serta mewakili kelas 8A.',
    type: 'acara',
    date: '5 hari lalu',
  },
];

export const ANNOUNCEMENT_META: Record<Announcement['type'], { label: string; color: string; bg: string }> = {
  jadwal: { label: 'Jadwal',  color: '#2563eb', bg: 'rgba(59,130,246,0.10)' },
  umum:   { label: 'Umum',    color: '#64748b', bg: 'rgba(100,116,139,0.10)' },
  tugas:  { label: 'Tugas',   color: '#d97706', bg: 'rgba(245,158,11,0.12)' },
  acara:  { label: 'Acara',   color: '#9333ea', bg: 'rgba(168,85,247,0.12)' },
};
