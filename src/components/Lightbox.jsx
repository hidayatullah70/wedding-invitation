import { useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './Icons.jsx';

export function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null && items[activeIndex];
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

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
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const current = items[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau foto ${activeIndex + 1} dari ${items.length}`}
      className="mobile-scroll-container fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/85 p-3 backdrop-blur-xs sm:p-6"
      onClick={onClose}
    >
      <div
        className="mt-6 mb-6 flex max-h-[88dvh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-champagne/70 bg-ivory shadow-2xl sm:mt-10 sm:mb-10 sm:max-h-[86dvh]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-champagne/60 bg-white/70 px-4 py-3.5 sm:px-6 sm:py-4">
          <p className="text-xs font-semibold tracking-wide text-muted sm:text-sm">
            Foto {activeIndex + 1} / {items.length}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau foto"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-champagne bg-white text-ink transition-all active:scale-95 hover:border-rose hover:text-rose-dark"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mobile-scroll-container min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl bg-blush-soft">
            {current.src ? (
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[58dvh] w-auto object-contain"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full flex-col items-center justify-center p-6 text-center sm:p-8">
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
            <p className="mt-3 text-center text-sm text-muted break-words">
              {current.caption}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-center gap-3 border-t border-champagne/60 bg-white/70 px-4 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={() =>
              onNavigate((activeIndex - 1 + items.length) % items.length)
            }
            aria-label="Foto sebelumnya"
            className="inline-flex min-h-11 items-center gap-1 rounded-full border border-champagne bg-white px-4 text-xs font-medium text-ink transition-all active:scale-95 hover:border-rose hover:text-rose-dark"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Sebelumnya
          </button>
          <button
            type="button"
            onClick={() => onNavigate((activeIndex + 1) % items.length)}
            aria-label="Foto berikutnya"
            className="inline-flex min-h-11 items-center gap-1 rounded-full border border-champagne bg-white px-4 text-xs font-medium text-ink transition-all active:scale-95 hover:border-rose hover:text-rose-dark"
          >
            Berikutnya
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
