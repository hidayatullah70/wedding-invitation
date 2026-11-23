import { Button } from '../components/Button.jsx';

export function CoverSection({ cover, guestName, onOpen }) {
  return (
    <section
      aria-label="Sampul Undangan"
      className="relative flex min-h-dvh w-full max-w-full items-center justify-center overflow-hidden bg-ivory px-4 py-12 sm:px-6 sm:py-16"
    >
      {cover.coverImage ? (
        <>
          <img
            src={cover.coverImage}
            alt={cover.coverImageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-ivory/80 backdrop-blur-[2px]"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 18% 20%, rgba(244, 182, 194, 0.35), transparent 52%), radial-gradient(circle at 82% 80%, rgba(169, 199, 232, 0.35), transparent 52%)',
          }}
        />
      )}

      <div
        className="pointer-events-none absolute inset-4 rounded-[2rem] border border-champagne/60 sm:inset-8"
        aria-hidden="true"
      />

      <div className="editorial-enter relative z-10 mx-auto flex w-full max-w-xl flex-col items-center px-2 text-center">
        <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-champagne bg-white/90 font-display text-xl font-medium tracking-wide text-rose-dark shadow-xs">
          {cover.monogram}
        </span>

        <p className="text-xs font-semibold tracking-[0.28em] text-rose-dark uppercase">
          {cover.eyebrow}
        </p>

        <h1 className="mt-4 font-display text-5xl font-medium tracking-tight text-ink sm:text-7xl">
          <span>{cover.partnerOneShort}</span>
          <span className="mx-3 font-normal italic text-rose-dark">&amp;</span>
          <span>{cover.partnerTwoShort}</span>
        </h1>

        <p className="mt-4 text-sm font-medium tracking-[0.14em] text-muted uppercase sm:text-base">
          {cover.dateLabel}
        </p>

        <div
          className="my-8 flex items-center gap-2.5"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-champagne" />
          <span className="h-1.5 w-1.5 rounded-full bg-rose/70" />
          <span className="h-px w-10 bg-champagne" />
        </div>

        <div className="w-full max-w-sm border-y border-champagne/70 bg-white/65 px-6 py-5 backdrop-blur-xs">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-muted uppercase">
            {cover.greetingPrefix}
          </p>
          <p className="mt-1.5 font-display text-2xl font-medium text-ink break-words sm:text-3xl">
            {guestName}
          </p>
        </div>

        <Button
          size="lg"
          onClick={onOpen}
          className="mt-8 w-full max-w-xs shadow-xs"
        >
          {cover.openButtonLabel}
        </Button>

        <p className="mt-4 text-xs text-muted">
          Musik tidak diputar otomatis; kontrol audio tersedia setelah undangan
          dibuka.
        </p>
      </div>
    </section>
  );
}
