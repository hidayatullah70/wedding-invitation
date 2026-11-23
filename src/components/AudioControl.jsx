import { useEffect, useRef, useState } from 'react';
import { PauseIcon, PlayIcon } from './Icons.jsx';

export function AudioControl({ audioConfig }) {
  const audioRef = useRef(null);
  const [status, setStatus] = useState(
    audioConfig?.src ? 'paused' : 'unavailable'
  );
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  if (!audioConfig?.enabled) return null;

  const handleToggle = async () => {
    if (!audioConfig.src || !audioRef.current) {
      setStatus('unavailable');
      setNotice('File audio latar belum ditambahkan di konfigurasi.');
      return;
    }

    if (status === 'playing') {
      audioRef.current.pause();
      setStatus('paused');
      setNotice('');
      return;
    }

    try {
      await audioRef.current.play();
      setStatus('playing');
      setNotice('');
    } catch {
      setStatus('unavailable');
      setNotice('Audio gagal diputar. Undangan tetap dapat digunakan.');
    }
  };

  const isPlaying = status === 'playing';
  const label = isPlaying
    ? `Jeda musik latar: ${audioConfig.title}`
    : `Putar musik latar: ${audioConfig.title}`;

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col items-end gap-2">
      {notice && (
        <p
          role="status"
          className="max-w-60 rounded-xl border border-champagne bg-white px-3 py-2 text-xs text-muted shadow-sm"
        >
          {notice}
        </p>
      )}

      {audioConfig.src && (
        <audio
          ref={audioRef}
          src={audioConfig.src}
          loop
          preload="none"
          onError={() => {
            setStatus('unavailable');
            setNotice('File audio tidak dapat dimuat.');
          }}
        />
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={label}
        aria-pressed={isPlaying}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-champagne bg-white/95 px-4 py-2 text-xs font-medium text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-rose hover:text-rose-dark"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blush-soft text-rose-dark">
          {isPlaying ? (
            <PauseIcon className="h-3.5 w-3.5" />
          ) : (
            <PlayIcon className="h-3.5 w-3.5" />
          )}
        </span>
        <span>
          {status === 'playing'
            ? 'Musik Aktif'
            : status === 'unavailable'
              ? 'Musik Belum Siap'
              : 'Putar Musik'}
        </span>
      </button>
    </div>
  );
}
