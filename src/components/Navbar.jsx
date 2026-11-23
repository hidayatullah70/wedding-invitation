import { useState } from 'react';
import { Container } from './Container.jsx';
import { CloseIcon, MenuIcon } from './Icons.jsx';

export function Navbar({ monogram, items }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-champagne/60 bg-ivory/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#couple"
          className="font-display text-xl font-semibold tracking-wide text-ink hover:text-rose-dark"
        >
          {monogram}
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm font-medium text-ink transition-colors hover:text-rose-dark"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne bg-white text-ink hover:border-rose hover:text-rose-dark md:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Navigasi mobile"
          className="border-t border-champagne/60 bg-ivory md:hidden"
        >
          <Container className="py-3">
            <ul className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={handleLinkClick}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-blush-soft hover:text-rose-dark"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
