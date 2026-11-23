import { useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './Icons.jsx';

export function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null && items[activeIndex];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onNavigate((activeIndex - 1 + items.length) % items.length);
      } else if (event.key === 'ArrowRight') {
        onNavigate((activeIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const current = items[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau foto ${activeIndex + 1} dari ${items.length}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col items-center rounded-3xl bg-ivory p-4 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex w-full items-center justify-between">
          <p className="text-xs font-medium text-muted">
            {activeIndex + 1} / {items.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau foto"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne bg-white text-ink hover:border-rose hover:text-rose-dark"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl bg-blush-soft">
          {current.src ? (
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[68vh] w-auto object-contain"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full flex-col items-center justify-center p-8 text-center">
              <p className="font-display text-2xl text-ink">
                Placeholder Foto Galeri {activeIndex + 1}
              </p>
              <p className="mt-2 max-w-md text-xs text-muted">
                {current.alt} — Ganti properti{' '}
                <code className="rounded bg-white px-1.5 py-0.5">src</code> di{' '}
                <code className="rounded bg-white px-1.5 py-0.5">
                  src/data/invitation.js
                </code>
                .
              </p>
            </div>
          )}
        </div>

        {current.caption && (
          <p className="mt-3 text-center text-sm text-muted">
            {current.caption}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              onNavigate((activeIndex - 1 + items.length) % items.length)
            }
            aria-label="Foto sebelumnya"
            className="inline-flex h-10 items-center gap-1 rounded-full border border-champagne bg-white px-4 text-xs font-medium text-ink hover:border-rose hover:text-rose-dark"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Sebelumnya
          </button>
          <button
            type="button"
            onClick={() => onNavigate((activeIndex + 1) % items.length)}
            aria-label="Foto berikutnya"
            className="inline-flex h-10 items-center gap-1 rounded-full border border-champagne bg-white px-4 text-xs font-medium text-ink hover:border-rose hover:text-rose-dark"
          >
            Berikutnya
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
