'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDonateConfig } from '@/lib/donate';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);

  /* 初始化：读取本地存储的主题 */
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.classList.add('light');
      setLight(true);
    }
  }, []);

  /* 滚动监听 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* 切换亮暗模式 */
  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  const isActive = (href: string) => pathname === href;
  const donate = getDonateConfig();

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
          <li><Link href="/font-download" className={`nav__link${isActive('/font-download') ? ' nav__link--active' : ''}`}>Font Download</Link></li>
          <li><Link href="/blog"          className={`nav__link${isActive('/blog') ? ' nav__link--active' : ''}`}>Blog</Link></li>
          <li><Link href="/about"        className={`nav__link${isActive('/about') ? ' nav__link--active' : ''}`}>About</Link></li>
          {donate.enabled && (
            <li>
              <a
                href={donate.href}
                className="nav__link nav__link--donate"
                target={donate.opensInNewTab ? '_blank' : undefined}
                rel={donate.opensInNewTab ? 'noopener noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {donate.provider === 'none' ? 'Support' : `Donate with ${donate.providerLabel}`}
              </a>
            </li>
          )}
        </ul>

        {/* 亮暗切换按钮 */}
        <button
          onClick={toggleTheme}
          aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
          className="nav__theme-btn"
          title={light ? 'Dark mode' : 'Light mode'}
        >
          {light ? '🌙' : '☀️'}
        </button>

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
