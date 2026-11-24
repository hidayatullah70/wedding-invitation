import { PauseIcon, PlayIcon } from './Icons.jsx';

export function AudioControl({ audioConfig, status, notice, onToggle }) {
  if (!audioConfig?.enabled) return null;

  const isPlaying = status === 'playing';
  const label = isPlaying
    ? `Jeda musik latar: ${audioConfig.title}`
    : `Putar musik latar: ${audioConfig.title}`;

  return (
    <div
      className="fixed right-4 z-30 flex flex-col items-end gap-2"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {notice && (
        <p
          role="status"
          className="max-w-60 rounded-xl border border-champagne bg-white px-3 py-2 text-xs text-muted shadow-sm"
        >
          {notice}
        </p>
      )}

      <div className="relative inline-flex h-[58px] w-[58px] items-center justify-center rounded-full">
        <span
          aria-hidden="true"
          data-playing={isPlaying ? 'true' : 'false'}
          className={`audio-ring-spinner pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-45'
          }`}
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={label}
          aria-pressed={isPlaying}
          title={label}
          className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-champagne bg-white/95 text-rose-dark shadow-md backdrop-blur-sm transition-all active:scale-95 hover:border-rose hover:bg-blush-soft"
        >
          {isPlaying ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="ml-0.5 h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
