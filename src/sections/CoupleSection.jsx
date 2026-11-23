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
      <div className="grid grid-cols-4 gap-3 sm:gap-5">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-2xl border border-champagne/80 bg-ivory px-2 py-4 sm:py-5"
          >
            <p className="font-display text-3xl font-semibold tabular-nums text-rose-dark sm:text-4xl">
              {String(unit.value).padStart(2, '0')}
            </p>
            <p className="mt-1 text-xs font-medium text-muted">{unit.label}</p>
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

      <blockquote className="mx-auto mb-14 max-w-2xl border-l-2 border-champagne pl-5 text-left font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
        {intro.quote}
      </blockquote>

      <CountdownBlock event={event} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
        {couple.map((person) => (
          <article
            key={person.id}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border border-champagne/80 bg-blush-soft">
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={person.photoAlt}
                  width="320"
                  height="400"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                  <span className="font-display text-2xl text-rose-dark">
                    Foto {person.role}
                  </span>
                  <span className="mt-2 text-xs text-muted">
                    Placeholder rasio 4:5
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs font-semibold tracking-[0.2em] text-rose-dark uppercase">
              {person.role}
            </p>
            <h3 className="mt-2 font-display text-3xl font-medium text-ink">
              {person.fullName}
            </h3>
            <p className="mt-2 text-sm text-muted">{person.parents}</p>
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
