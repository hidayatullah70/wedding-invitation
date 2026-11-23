export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center mx-auto';

  return (
    <header className={`max-w-2xl ${alignClass} mb-10 sm:mb-14`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-rose-dark uppercase">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-display text-3xl font-medium tracking-tight text-ink sm:text-5xl"
      >
        {title}
      </h2>
      <div
        className={`mt-4 flex items-center gap-2 ${
          align === 'center' ? 'justify-center' : ''
        }`}
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-champagne" />
        <span className="h-1.5 w-1.5 rounded-full bg-rose/70" />
        <span className="h-px w-8 bg-champagne" />
      </div>
      {subtitle && (
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </header>
  );
}
