'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} id="nav">
      <div className="nav__inner">
        <Link className="nav__logo" href="/">
          <svg className="nav__logo-star" viewBox="0 0 20 20" fill="none" aria-hidden>
            <polygon points="10,1 12.9,7 19.5,7.6 14.8,11.8 16.2,18.3 10,14.8 3.8,18.3 5.2,11.8 0.5,7.6 7.1,7" fill="currentColor"/>
          </svg>
          Aurebesh
        </Link>

        <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
          <li><Link href="/"           className={`nav__link${isActive('/') ? ' nav__link--active' : ''}`}>Aurebesh</Link></li>
          <li><Link href="/sith"       className={`nav__link nav__link--sith${isActive('/sith') ? ' nav__link--active' : ''}`}>Sith</Link></li>
          <li><Link href="/huttese"    className={`nav__link nav__link--huttese${isActive('/huttese') ? ' nav__link--active' : ''}`}>Huttese</Link></li>
          <li><Link href="/binary"     className={`nav__link nav__link--binary${isActive('/binary') ? ' nav__link--active' : ''}`}>Binary</Link></li>
          <li><Link href="/deathtrooper" className={`nav__link nav__link--death${isActive('/deathtrooper') ? ' nav__link--active' : ''}`}>Death Trooper</Link></li>
          <li><Link href="/alphabet"   className={`nav__link nav__link--chart${isActive('/alphabet') ? ' nav__link--active' : ''}`}>Alphabet Chart</Link></li>
        </ul>

        <button
          className={`nav__menu-btn${menuOpen ? ' nav__menu-btn--open' : ''}`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
