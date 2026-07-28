import { useState, useCallback } from 'react';
import { Download, CheckCircle2, X } from 'lucide-react';

interface ToastState {
  visible: boolean;
  title: string;
  status: 'downloading' | 'done';
}

function triggerDownload(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function useDownload() {
  const [toast, setToast] = useState<ToastState>({ visible: false, title: '', status: 'downloading' });
  const [busyId, setBusyId] = useState<string | null>(null);

  const download = useCallback((opts: {
    id: string;
    title: string;
    desc: string;
    type: string;
    subject?: string;
    size?: string;
    duration?: string;
    due?: string;
  }) => {
    if (busyId === opts.id) return;
    setBusyId(opts.id);
    setToast({ visible: true, title: opts.title, status: 'downloading' });

    const filename = `${opts.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40)}.txt`;
    const content = [
      `MATERI PELAJARAN${opts.subject ? ` - ${opts.subject}` : ''}`,
      '='.repeat(40),
      ``,
      `Judul   : ${opts.title}`,
      `Jenis   : ${opts.type}`,
      `Deskripsi: ${opts.desc}`,
      opts.size ? `Ukuran  : ${opts.size}` : '',
      opts.duration ? `Durasi  : ${opts.duration}` : '',
      opts.due ? `Tenggat : ${opts.due}` : '',
      ``,
      `Diunduh pada: ${new Date().toLocaleString('id-ID')}`,
    ].filter(Boolean).join('\n');

    setTimeout(() => {
      triggerDownload(filename, content);
      setToast({ visible: true, title: opts.title, status: 'done' });
      setBusyId(null);
      setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
    }, 900);
  }, [busyId]);

  const DownloadToast = toast.visible ? (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] rounded-2xl px-4 py-3 flex items-center gap-3 animate-fadeInUp"
      style={{
        background: '#1e293b',
        boxShadow: '0 10px 30px rgba(15,23,42,0.3)',
        minWidth: 240,
        maxWidth: 300,
      }}
    >
      {toast.status === 'downloading' ? (
        <>
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Download size={16} className="text-blue-400 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Mengunduh...</p>
            <p className="text-slate-400 text-[10px] truncate">{toast.title}</p>
          </div>
          <div className="w-4 h-4 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin flex-shrink-0" />
        </>
      ) : (
        <>
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={16} className="text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold">Download selesai</p>
            <p className="text-slate-400 text-[10px] truncate">{toast.title}</p>
          </div>
          <button
            onClick={() => setToast((t) => ({ ...t, visible: false }))}
            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <X size={14} className="text-slate-400" />
          </button>
        </>
      )}
    </div>
  ) : null;

  return { download, DownloadToast, busyId };
}
