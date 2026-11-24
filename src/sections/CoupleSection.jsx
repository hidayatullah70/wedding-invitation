import { Section } from '../components/Section.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { useCountdown } from '../hooks/useCountdown.js';
import { applyGuestPronoun } from '../utils/url.js';

function CountdownBlock({ event }) {
  const { isPast, days, hours, minutes, seconds } = useCountdown(
    event.targetDateIso
  );

  if (isPast) {
    return (
      <div
        role="status"
        className="mx-auto mb-14 max-w-xl rounded-2xl border border-champagne bg-blush-soft px-6 py-4 text-center text-sm text-ink"
      >
        {event.passedMessage}
      </div>
    );
  }

  const units = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ];

  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
        Menuju Hari Bahagia • {event.timezoneLabel}
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-5">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="min-w-0 rounded-2xl border border-champagne/80 bg-ivory px-1 py-3 sm:px-2 sm:py-5"
          >
            <p className="font-display text-2xl font-semibold tabular-nums text-rose-dark sm:text-4xl">
              {String(unit.value).padStart(2, '0')}
            </p>
            <p className="mt-1 truncate text-[11px] font-medium text-muted sm:text-xs">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CoupleSection({ intro, couple, event, guestPronoun }) {
  const introDescription = applyGuestPronoun(intro.description, guestPronoun);

  return (
    <Section id="couple" tone="white" labelledBy="couple-heading">
      <SectionHeading
        id="couple-heading"
        eyebrow={intro.eyebrow}
        title="Mempelai"
        subtitle={introDescription}
      />

      <blockquote className="relative mx-auto mb-14 max-w-2xl border-y border-champagne/70 py-7 text-center font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
        <span
          className="mb-1 block font-display text-4xl leading-none text-champagne select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        {intro.quote}
      </blockquote>

      <CountdownBlock event={event} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
        {couple.map((person) => (
          <article
            key={person.id}
            className="group flex min-w-0 flex-col items-center text-center"
          >
            <div className="mb-6 aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-t-[8rem] rounded-b-3xl border border-champagne/80 bg-blush-soft p-2 transition-transform duration-300 group-hover:-translate-y-0.5 sm:max-w-xs sm:rounded-t-[9rem] sm:p-2.5">
              <div className="h-full w-full overflow-hidden rounded-t-[7.5rem] rounded-b-2xl bg-ivory sm:rounded-t-[8.4rem]">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.photoAlt}
                    width="320"
                    height="400"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
                    style={{
                      background:
                        'linear-gradient(160deg, rgba(253, 242, 245, 0.95) 0%, rgba(255, 249, 245, 1) 55%, rgba(242, 247, 252, 0.95) 100%)',
                    }}
                  >
                    <span className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-rose-dark/80 uppercase">
                      Potret 4:5
                    </span>
                    <span className="font-display text-2xl italic text-ink">
                      {person.role}
                    </span>
                    <span className="mt-3 h-px w-10 bg-champagne" />
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs font-semibold tracking-[0.2em] text-rose-dark uppercase">
              {person.role}
            </p>
            <h3 className="mt-2 max-w-full font-display text-2xl font-medium text-ink break-words sm:text-3xl">
              {person.fullName}
            </h3>
            <p className="mt-2 max-w-full text-sm text-muted break-words">
              {person.parents}
            </p>
            {person.bio && (
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                {person.bio}
              </p>
            )}
            {person.instagram && (
              <a
                href={person.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs font-medium text-rose-dark underline underline-offset-4 hover:text-ink"
              >
                Instagram
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
