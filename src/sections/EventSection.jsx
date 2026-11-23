import { Button } from '../components/Button.jsx';
import { CalendarIcon, MapPinIcon } from '../components/Icons.jsx';
import { Section } from '../components/Section.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';

export function EventSection({ event }) {
  return (
    <Section id="event" tone="blue" labelledBy="event-heading">
      <SectionHeading
        id="event-heading"
        eyebrow="Rangkaian Acara"
        title="Waktu & Lokasi"
        subtitle={`Seluruh jadwal ditampilkan dalam zona waktu ${event.timezoneLabel}.`}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {event.schedules.map((schedule, index) => (
          <article
            key={schedule.id}
            className="flex flex-col justify-between rounded-3xl border border-champagne/80 bg-white/95 p-7 transition-transform duration-200 hover:-translate-y-0.5 sm:p-9"
          >
            <div>
              <div className="flex items-center justify-between gap-3 border-b border-champagne/60 pb-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-rose-dark uppercase">
                  {schedule.label}
                </p>
                <span className="font-display text-2xl italic text-champagne">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-ink">
                <p className="flex items-start gap-2.5">
                  <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-rose-dark" />
                  <span>
                    <strong className="font-semibold">
                      {schedule.dateText}
                    </strong>
                    <span className="block text-muted">
                      {schedule.timeText}
                    </span>
                  </span>
                </p>

                <p className="flex items-start gap-2.5">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-rose-dark" />
                  <span>
                    <strong className="font-semibold">
                      {schedule.venueName}
                    </strong>
                    <span className="block text-muted">{schedule.address}</span>
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-champagne/50">
              {schedule.mapUrl ? (
                <Button
                  as="a"
                  href={schedule.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <MapPinIcon className="h-4 w-4" />
                  Buka Google Maps
                </Button>
              ) : (
                <p className="text-xs text-muted">
                  Tautan Google Maps belum diisi di{' '}
                  <code className="rounded bg-ivory px-1.5 py-0.5">
                    src/data/invitation.js
                  </code>
                  .
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
