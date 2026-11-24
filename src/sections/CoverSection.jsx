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
        className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-champagne/60 sm:inset-8 sm:rounded-[2rem]"
        aria-hidden="true"
      />

      <div className="editorial-enter relative z-10 mx-auto flex w-full max-w-xl min-w-0 flex-col items-center px-2 text-center">
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border border-champagne bg-white/90 font-display text-lg font-medium tracking-wide text-rose-dark shadow-xs sm:mb-6 sm:h-16 sm:w-16 sm:text-xl">
          {cover.monogram}
        </span>

        <p className="text-[11px] font-semibold tracking-[0.24em] text-rose-dark uppercase sm:text-xs sm:tracking-[0.28em]">
          {cover.eyebrow}
        </p>

        <h1 className="mt-3 max-w-full font-display text-4xl leading-tight font-medium tracking-tight text-ink break-words sm:mt-4 sm:text-7xl">
          <span>{cover.partnerOneShort}</span>
          <span className="mx-2 font-normal italic text-rose-dark sm:mx-3">
            &amp;
          </span>
          <span>{cover.partnerTwoShort}</span>
        </h1>

        <p className="mt-3 text-xs font-medium tracking-[0.14em] text-muted uppercase sm:mt-4 sm:text-base">
          {cover.dateLabel}
        </p>

        <div
          className="my-6 flex items-center gap-2.5 sm:my-8"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-champagne" />
          <span className="h-1.5 w-1.5 rounded-full bg-rose/70" />
          <span className="h-px w-10 bg-champagne" />
        </div>

        <div className="w-full max-w-sm border-y border-champagne/70 bg-white/65 px-4 py-4 backdrop-blur-xs sm:px-6 sm:py-5">
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
          className="mt-7 w-full max-w-xs shadow-xs sm:mt-8"
        >
          {cover.openButtonLabel}
        </Button>

        <p className="mt-4 text-xs text-muted">
          Musik latar mulai diputar saat undangan dibuka dan dapat dijeda kapan
          saja.
        </p>
      </div>
    </section>
  );
}
