import { Container } from './Container.jsx';

const TONE_CLASSES = {
  ivory: 'bg-ivory',
  white: 'bg-white',
  blush: 'bg-blush-soft',
  blue: 'bg-blue-soft',
};

export function Section({
  id,
  tone = 'ivory',
  labelledBy,
  className = '',
  containerClassName = '',
  children,
}) {
  const toneClass = TONE_CLASSES[tone] || TONE_CLASSES.ivory;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-20 py-16 sm:py-24 ${toneClass} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
