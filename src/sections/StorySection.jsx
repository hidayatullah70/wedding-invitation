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

      <ol className="relative mx-auto max-w-2xl space-y-12 border-l border-champagne pl-7 sm:pl-11">
        {story.items.map((item, index) => (
          <li key={item.id} className="relative">
            <span
              className="absolute -left-[33px] top-2 h-3 w-3 rounded-full border-2 border-rose bg-ivory sm:-left-[49px]"
              aria-hidden="true"
            />
            <div className="flex items-baseline gap-3">
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
            <h3 className="mt-1.5 font-display text-2xl font-medium text-ink sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
