import { useEffect, useState } from 'react';
import { Container } from './Container.jsx';
import { CloseIcon, MenuIcon } from './Icons.jsx';

export function Navbar({ monogram, items }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id || '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.4] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleLinkClick = (id) => {
    setActiveId(id);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-champagne/60 bg-ivory/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#couple"
          className="font-display text-xl font-semibold tracking-wide text-ink transition-colors hover:text-rose-dark"
        >
          {monogram}
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => handleLinkClick(item.id)}
                    className={`nav-link-draw text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-rose-dark'
                        : 'text-ink hover:text-rose-dark'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-champagne bg-white text-ink transition-all active:scale-95 hover:border-rose hover:text-rose-dark md:hidden"
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
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={() => handleLinkClick(item.id)}
                      className={`block min-h-11 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blush-soft text-rose-dark'
                          : 'text-ink hover:bg-blush-soft hover:text-rose-dark'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
