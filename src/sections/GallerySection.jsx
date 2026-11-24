import { useState } from 'react';
import { Lightbox } from '../components/Lightbox.jsx';
import { Section } from '../components/Section.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';

export function GallerySection({ gallery }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Section id="gallery" tone="white" labelledBy="gallery-heading">
      <SectionHeading
        id="gallery-heading"
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        subtitle={gallery.subtitle}
      />

      <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-4">
        {gallery.items.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Perbesar ${photo.alt}`}
            className={`group relative min-w-0 overflow-hidden rounded-2xl border border-champagne/80 bg-blush-soft text-left transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose ${
              photo.aspect || 'aspect-[4/5]'
            }`}
          >
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center p-2.5 text-center sm:p-4"
                style={{
                  background:
                    index % 2 === 0
                      ? 'linear-gradient(155deg, rgba(253, 242, 245, 1) 0%, rgba(255, 249, 245, 1) 100%)'
                      : 'linear-gradient(155deg, rgba(242, 247, 252, 1) 0%, rgba(255, 249, 245, 1) 100%)',
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-champagne/60 p-3">
                  <span className="font-display text-2xl italic text-rose-dark">
                    0{index + 1}
                  </span>
                  <span className="mt-1 text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
                    Momen
                  </span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        items={gallery.items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </Section>
  );
}
