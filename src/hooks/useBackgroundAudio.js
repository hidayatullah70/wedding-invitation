import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Mengelola musik latar berbasis interaksi pengguna (tidak autoplay saat load).
 * Pemanggilan `play()` dirancang untuk dipanggil langsung di dalam handler klik
 * tombol "Buka Undangan" agar diizinkan oleh kebijakan audio Chrome & Safari iOS.
 */
export function useBackgroundAudio(audioConfig) {
  const audioRef = useRef(null);
  const src = audioConfig?.enabled ? audioConfig?.src || '' : '';

  const [status, setStatus] = useState(src ? 'paused' : 'unavailable');
  const [notice, setNotice] = useState('');

  const ensureAudio = useCallback(() => {
    if (!src || typeof window === 'undefined') return null;

    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = 'none';

      audio.addEventListener('playing', () => {
        setStatus('playing');
        setNotice('');
      });

      audio.addEventListener('pause', () => {
        setStatus((prev) => (prev === 'unavailable' ? prev : 'paused'));
      });

      audio.addEventListener('error', () => {
        setStatus('unavailable');
        setNotice('File audio tidak dapat dimuat. Undangan tetap dapat digunakan.');
      });

      audioRef.current = audio;
    }

    return audioRef.current;
  }, [src]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  const play = useCallback(async () => {
    if (!src) {
      setStatus('unavailable');
      setNotice('File audio latar belum ditambahkan di konfigurasi.');
      return;
    }

    const audio = ensureAudio();
    if (!audio) return;

    try {
      setStatus('playing');
      setNotice('');
      await audio.play();
    } catch {
      setStatus('paused');
      setNotice('Ketuk tombol musik untuk memulai lagu latar.');
    }
  }, [ensureAudio, src]);

  const toggle = useCallback(async () => {
    if (!src) {
      setStatus('unavailable');
      setNotice('File audio latar belum ditambahkan di konfigurasi.');
      return;
    }

    const audio = ensureAudio();
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setStatus('paused');
      setNotice('');
      return;
    }

    await play();
  }, [ensureAudio, play, src]);

  return {
    status,
    notice,
    play,
    toggle,
  };
}
