import { Container } from '../components/Container.jsx';
import { applyGuestPronoun } from '../utils/url.js';

export function FooterSection({ footer, guestPronoun }) {
  const closingMessage = applyGuestPronoun(footer.closingMessage, guestPronoun);

  return (
    <footer className="w-full max-w-full overflow-x-clip border-t border-champagne/70 bg-blue-soft pt-16 pb-24 text-center sm:pb-20">
      <Container className="max-w-2xl">
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          {closingMessage}
        </p>

        <p className="mt-6 font-display text-3xl font-medium text-ink sm:text-4xl">
          {footer.coupleSignature}
        </p>

        {Array.isArray(footer.socials) && footer.socials.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {footer.socials.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-rose-dark underline underline-offset-4 hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div
          className="mx-auto my-8 h-px w-16 bg-champagne"
          aria-hidden="true"
        />

        <p className="text-xs text-muted">{footer.credit}</p>
      </Container>
    </footer>
  );
}
