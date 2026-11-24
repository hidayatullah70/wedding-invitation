import { Section } from '../components/Section.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';

export function StorySection({ story }) {
  return (
    <Section id="story" tone="ivory" labelledBy="story-heading">
      <SectionHeading
        id="story-heading"
        eyebrow={story.eyebrow}
        title={story.title}
        subtitle={story.subtitle}
      />

      <ol className="relative mx-auto max-w-2xl space-y-10 sm:space-y-12">
        <span
          className="pointer-events-none absolute top-2 bottom-2 left-2 w-px bg-champagne"
          aria-hidden="true"
        />
        {story.items.map((item, index) => (
          <li key={item.id} className="relative min-w-0 pl-8 sm:pl-12">
            <span
              className="absolute top-2 left-[2.5px] h-3 w-3 rounded-full border-2 border-rose bg-ivory"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className="font-display text-2xl italic text-champagne sm:text-3xl"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <p className="text-xs font-semibold tracking-[0.18em] text-rose-dark uppercase">
                {item.date}
              </p>
            </div>
            <h3 className="mt-1.5 font-display text-2xl font-medium text-ink break-words sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted break-words sm:text-base">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
