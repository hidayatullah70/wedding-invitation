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

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {gallery.items.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Perbesar ${photo.alt}`}
            className={`group relative overflow-hidden rounded-2xl border border-champagne/80 bg-blush-soft text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose ${
              photo.aspect || 'aspect-[4/5]'
            }`}
          >
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                <span className="font-display text-lg text-rose-dark sm:text-xl">
                  Galeri {index + 1}
                </span>
                <span className="mt-1 text-xs text-muted">
                  Placeholder Foto
                </span>
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
