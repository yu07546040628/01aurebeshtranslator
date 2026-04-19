'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import Comments from '../components/Comments';
import { tokeniseEnglish, ENG_TO_AUR, aurToEng, DIPTHONGS } from '@/lib/aurebesh';

/* ── Aurebesh letter names ── */
const LETTER_NAMES: Record<string, string> = {
  a:'Aurek', b:'Besh', c:'Cresh', d:'Dorn', e:'Esk', f:'Forn', g:'Grek',
  h:'Herf', i:'Isk', j:'Jenth', k:'Krill', l:'Leth', m:'Mern', n:'Nern',
  o:'Orn', p:'Peth', q:'Qek', r:'Resh', s:'Senth', t:'Trill', u:'Usk',
  v:'Vev', w:'Wesk', x:'Xesh', y:'Yirt', z:'Zerek',
  ch:'Cherek', ee:'Eek', eo:'Eoek', kh:'Kherev', ng:'Nen-Grek',
  oo:'Onith', sh:'Shen', th:'Thesh', ya:'Yaret', bl:'Blek', kr:'Kret', zh:'Zerek-Herf',
};

/* ── Starfield canvas ── */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let stars: { x: number; y: number; r: number; a: number; da: number; speed: number }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    function initStars() {
      const W = canvas!.width, H = canvas!.height;
      const n = Math.floor((W * H) / 4000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2, a: Math.random(),
        da: (Math.random() - 0.5) * 0.005, speed: Math.random() * 0.06 + 0.01,
      }));
    }
    function draw() {
      const W = canvas!.width, H = canvas!.height;
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da *= -1;
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,210,255,${s.a * 0.7})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }
    resize(); initStars(); draw();
    window.addEventListener('resize', () => { resize(); initStars(); });
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.5 }} aria-hidden />;
}

/* ── Main page ── */
export default function Home() {
  const [input, setInput] = useState('');
  const [dir, setDir] = useState<'eng2aur' | 'aur2eng'>('eng2aur');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* translate */
  const result = useCallback(() => {
    if (!input.trim()) return '';
    if (dir === 'eng2aur') {
      const tokens = tokeniseEnglish(input);
      return tokens.map(t => {
        if (!t.key) return t.raw;
        const g = ENG_TO_AUR[t.key] || t.raw;
        return g;
      }).join('');
    } else {
      return aurToEng(input);
    }
  }, [input, dir]);

  const translated = result();

  /* render aurebesh glyphs with uppercase mirror */
  const renderGlyphs = () => {
    if (dir !== 'eng2aur' || !input.trim()) return null;
    const tokens = tokeniseEnglish(input);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', alignContent: 'flex-start', lineHeight: 1.2 }}>
        {tokens.map((t, i) => {
          if (!t.key) {
            if (t.raw === '\n') return <br key={i} />;
            return <span key={i} style={{ color: 'var(--text-3)', fontSize: '15px' }}>{t.raw}</span>;
          }
          const g = ENG_TO_AUR[t.key] || t.raw;
          return (
            <span key={i} title={t.raw} style={{
              fontSize: '28px', lineHeight: 1, color: 'var(--gold)',
              fontFamily: "'Noto Sans Phoenician', serif",
              display: 'inline-block',
              transform: t.upper ? 'scaleX(-1)' : 'none',
            }}>{g}</span>
          );
        })}
      </div>
    );
  };

  const handleCopy = async () => {
    if (!translated) return;
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleSwap = () => {
    setDir(d => d === 'eng2aur' ? 'aur2eng' : 'eng2aur');
    setInput('');
  };

  const handleDownloadSVG = () => {
    if (!input.trim()) return;
    const tokens = tokeniseEnglish(input);
    const CHAR_W = 50, CHAR_H = 64, PAD = 20;
    let x = PAD, y = PAD + CHAR_H, lines = '';
    for (const t of tokens) {
      if (t.raw === '\n') { x = PAD; y += CHAR_H + 10; continue; }
      if (t.raw === ' ')  { x += 25; continue; }
      const g = t.key ? (ENG_TO_AUR[t.key] || t.raw) : t.raw;
      if (t.upper) {
        lines += `<text x="${x+25}" y="${y}" text-anchor="middle" transform="scale(-1,1) translate(${-(x*2+50)},0)">${g}</text>\n`;
      } else {
        lines += `<text x="${x+25}" y="${y}" text-anchor="middle">${g}</text>\n`;
      }
      x += CHAR_W;
      if (x > 1180) { x = PAD; y += CHAR_H + 10; }
    }
    const W = 1200, H = y + PAD;
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n  <rect width="100%" height="100%" fill="#07090f"/>\n  <style>text{font-family:'Noto Sans Phoenician',serif;font-size:40px;fill:#c9a84c;}</style>\n  ${lines}\n</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.download = 'aurebesh.svg'; a.href = URL.createObjectURL(blob); a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 8000);
  };

  const handleDownloadPNG = () => {
    const el = document.querySelector('.tx__output') as HTMLElement;
    if (!el) return;
    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(el, { backgroundColor: '#0d1020', scale: 2 }).then(canvas => {
        const a = document.createElement('a');
        a.download = 'aurebesh.png'; a.href = canvas.toDataURL(); a.click();
      });
    });
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('t', input);
    url.searchParams.set('dir', dir);
    navigator.clipboard.writeText(url.toString()).catch(() => {
      prompt('Share link:', url.toString());
    });
  };

  const insertChar = (ch: string) => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      const start = el.selectionStart, end = el.selectionEnd;
      const newVal = input.slice(0, start) + ch + input.slice(end);
      setInput(newVal);
      setTimeout(() => { el.setSelectionRange(start + ch.length, start + ch.length); el.focus(); }, 0);
    } else {
      setInput(v => v + ch);
    }
  };

  /* URL param restore */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get('t'), d = p.get('dir');
    if (t) setInput(t);
    if (d === 'aur2eng') setDir('aur2eng');
  }, []);

  return (
    <>
      <Starfield />
      <Nav />
      <header className="hero">
        <div className="hero__bg" style={{backgroundImage:"url('/pic/hero-bg-dark.png')"}} aria-hidden />
        <div className="hero__overlay" aria-hidden />
        <img className="hero__deco" src="/pic/hero-deco.png" alt="" aria-hidden />
        <div className="hero__orb hero__orb--1" aria-hidden />
        <div className="hero__orb hero__orb--2" aria-hidden />
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-line" />
            Star Wars Language Tools
            <span className="hero__eyebrow-line" />
          </p>
          <h1 className="hero__title">
            <span className="hero__title-word hero__title-word--1">Aurebesh</span>
            <span className="hero__title-word hero__title-word--2 hero__title-word--gold">Translator</span>
          </h1>
          <p className="hero__sub">
            The most accurate English ↔ Aurebesh converter —<br />
            full dipthong support, PNG&thinsp;/&thinsp;SVG export, reverse translation.
          </p>
          <div className="hero__pills">
            <span className="pill">✓ 12 Dipthongs</span>
            <span className="pill">✓ PNG / SVG Export</span>
            <span className="pill">✓ Reverse Translation</span>
            <span className="pill">✓ Tattoo Safe</span>
          </div>
          <a href="#translator" className="hero__cta">
            Start Translating
            <svg viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        <div className="hero__scroll-hint" aria-hidden>
          <div className="hero__scroll-line" />
        </div>
      </header>

      {/* ── WARNING STRIP ── */}
      <div className="warn-strip">
        <div className="warn-strip__inner">
          <span className="warn-strip__icon">⚠</span>
          <p><strong>Uppercase = Mirror Image.</strong> In canon Aurebesh, capital letters are the horizontal mirror of lowercase — intentional, film-accurate. <strong>Double-check before tattoos or props!</strong></p>
        </div>
      </div>

      <main>

        {/* ── SHOWCASE IMAGE ── */}
        <section className="showcase reveal">
          <div className="wrap">
            <div className="showcase__frame">
              <img
                className="showcase__img"
                src="/pic/showcase.png"
                alt="Holographic Aurebesh translation interface showing glowing Star Wars script characters"
              />
              <div className="showcase__glow" aria-hidden />
            </div>
          </div>
        </section>

        {/* ── TRANSLATOR ── */}
        <section className="tx-section reveal" id="translator">
          <div className="wrap">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="section-label__text">Translator</span>
              <span className="section-label__line" />
            </div>

            <div className="tx">
              {/* Direction bar */}
              <div className="tx__bar">
                <span className="tx__lang" style={{ color: dir === 'eng2aur' ? 'var(--text)' : 'var(--text-3)' }}>English</span>
                <button className="tx__swap" onClick={handleSwap} aria-label="Swap direction">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Swap
                </button>
                <span className="tx__lang tx__lang--right" style={{ color: dir === 'aur2eng' ? 'var(--text)' : 'var(--gold)', opacity: 0.7 }}>Aurebesh</span>
              </div>

              {/* Panes */}
              <div className="tx__panes">
                <div className="tx__pane tx__pane--in">
                  <textarea
                    ref={textareaRef}
                    className="tx__textarea"
                    placeholder={dir === 'eng2aur' ? 'Type English text here…' : 'Paste Aurebesh here…'}
                    aria-label="Input"
                    spellCheck={false}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                  <div className="tx__pane-foot">
                    <span className="tx__count">{input.length} / ∞</span>
                    <button className="tx__clear" onClick={() => setInput('')}>✕ Clear</button>
                  </div>
                </div>

                <div className="tx__divider" aria-hidden>
                  <div className="tx__divider-line" />
                </div>

                <div className="tx__pane tx__pane--out">
                  <div className="tx__output" aria-label="Aurebesh output" aria-live="polite">
                    {input.trim()
                      ? (dir === 'eng2aur'
                          ? (renderGlyphs() || <span style={{ color: 'var(--gold)', fontSize: '15px' }}>{translated}</span>)
                          : <span style={{ color: 'var(--text)', fontSize: '15px' }}>{translated}</span>)
                      : <span className="tx__placeholder">Aurebesh translation will appear here…</span>
                    }
                  </div>
                  <div className="tx__toolbar">
                    <button className="tx__btn" onClick={handleCopy} disabled={!translated} aria-label="Copy">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M3 11H2.5A1.5 1.5 0 0 1 1 9.5v-7A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button className="tx__btn" onClick={handleDownloadPNG} disabled={!translated} aria-label="Download PNG">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 2v8m0 0-3-3m3 3 3-3M2 12v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      PNG
                    </button>
                    <button className="tx__btn" onClick={handleDownloadSVG} disabled={!translated} aria-label="Download SVG">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 2v8m0 0-3-3m3 3 3-3M2 12v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      SVG
                    </button>
                    <button className="tx__btn tx__btn--gold" onClick={handleShare} disabled={!input} aria-label="Share link">
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden><circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="4" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10.5 3.7 5.5 7.3M5.5 8.7l5 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ALPHABET CHART ── */}
        <section className="alpha-section reveal" id="alphabet">
          <div className="wrap">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="section-label__text">Alphabet Chart</span>
              <span className="section-label__line" />
            </div>

            <div className="alpha-header">
              <div className="alpha-header__text">
                <h2 className="alpha-header__title">Aurebesh Alphabet Chart</h2>
                <p className="alpha-header__sub">Click any letter or dipthong to insert it into the translator above</p>
              </div>
            </div>

            {/* Letters */}
            <div className="alpha-group">
              <h3 className="alpha-group__label">Letters <span className="alpha-group__count">26</span></h3>
              <div className="alpha-chips">
                {Object.entries(ENG_TO_AUR).filter(([k]) => k.length === 1).map(([eng, aur]) => (
                  <button key={eng} className="chip" onClick={() => insertChar(eng)} aria-label={`${LETTER_NAMES[eng]} ${eng.toUpperCase()}`}>
                    <span className="chip__g" style={{ fontFamily: "'Noto Sans Phoenician', serif" }}>{aur}</span>
                    <span className="chip__l">{eng.toUpperCase()} · {LETTER_NAMES[eng]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dipthongs */}
            <div className="alpha-group">
              <h3 className="alpha-group__label">Dipthongs <span className="alpha-group__count alpha-group__count--blue">12</span> <span className="alpha-group__note">matched before single letters</span></h3>
              <div className="alpha-chips">
                {DIPTHONGS.map(dip => (
                  <button key={dip} className="chip chip--dip" onClick={() => insertChar(dip)} aria-label={`${dip.toUpperCase()} ${LETTER_NAMES[dip]}`}>
                    <span className="chip__g" style={{ fontFamily: "'Noto Sans Phoenician', serif" }}>{ENG_TO_AUR[dip]}</span>
                    <span className="chip__l">{dip.toUpperCase()} · {LETTER_NAMES[dip]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── OTHER LANGUAGES ── */}
        <section className="langs-section reveal">
          <div className="wrap">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="section-label__text">More Star Wars Languages</span>
              <span className="section-label__line" />
            </div>
            <div className="langs-grid">
              <Link className="lang-card lang-card--sith" href="/sith">
                <div className="lang-card__glow" aria-hidden />
                <div className="lang-card__icon">⚡</div>
                <div className="lang-card__body">
                  <h3 className="lang-card__title">Sith Alphabet</h3>
                  <p className="lang-card__desc">Ur-Kittât — the ancient dark side script. 26-letter angular cipher.</p>
                </div>
                <div className="lang-card__arrow">→</div>
              </Link>
              <Link className="lang-card lang-card--huttese" href="/huttese">
                <div className="lang-card__glow" aria-hidden />
                <div className="lang-card__icon">🐸</div>
                <div className="lang-card__body">
                  <h3 className="lang-card__title">Huttese</h3>
                  <p className="lang-card__desc">Jabba&apos;s guttural tongue. Vocabulary replacement with partial-match highlighting.</p>
                </div>
                <div className="lang-card__arrow">→</div>
              </Link>
              <Link className="lang-card lang-card--binary" href="/binary">
                <div className="lang-card__glow" aria-hidden />
                <div className="lang-card__icon">🤖</div>
                <div className="lang-card__body">
                  <h3 className="lang-card__title">Droidspeak / Binary</h3>
                  <p className="lang-card__desc">R2-D2&apos;s beep-boop language. Morse-style encoding + optional audio.</p>
                </div>
                <div className="lang-card__arrow">→</div>
              </Link>
              <Link className="lang-card lang-card--death" href="/deathtrooper">
                <div className="lang-card__glow" aria-hidden />
                <div className="lang-card__icon">☠</div>
                <div className="lang-card__body">
                  <h3 className="lang-card__title">Death Trooper Cipher</h3>
                  <p className="lang-card__desc">Imperial Atbash + Caesar shift — rendered as Aurebesh glyphs.</p>
                </div>
                <div className="lang-card__arrow">→</div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SEO CONTENT ── */}
        <section className="seo-section reveal">
          <div className="wrap">
            <div className="seo-inner">
              <article className="seo-block">
                <h2>What is Aurebesh?</h2>
                <p>Aurebesh is the most common writing system in the Star Wars galaxy, appearing throughout all nine Skywalker Saga films, The Mandalorian, Andor, and countless expanded universe materials. The name derives from its first two letters: <strong>Aurek</strong> (A) and <strong>Besh</strong> (B) — the same way &ldquo;alphabet&rdquo; comes from Greek Alpha and Beta.</p>
              </article>
              <article className="seo-block">
                <h2>What Are Aurebesh Dipthongs?</h2>
                <p>Dipthongs are two-letter combinations mapped to a <em>single</em> Aurebesh glyph. This translator correctly handles all 12 canonical dipthongs: <strong>CH, EE, EO, KH, NG, OO, SH, TH, YA, BL, KR, ZH</strong>. Most other translators miss these entirely — producing wrong results for words like <em>the</em>, <em>cheese</em>, <em>shield</em>, or <em>night</em>.</p>
              </article>
              <article className="seo-block">
                <h2>Uppercase = Mirror Image</h2>
                <p>In canonical Aurebesh, <strong>capital letters are the horizontal mirror</strong> of their lowercase forms. This is intentional and verifiable in film props and official merchandise. Always confirm the case before commissioning a tattoo or building a screen-accurate prop!</p>
              </article>
              <article className="seo-block">
                <h2>Use Cases</h2>
                <ul>
                  <li><strong>Tattoos</strong> — one of the most-searched Star Wars tattoo styles</li>
                  <li><strong>Cosplay props</strong> — screen-accurate helmets, datapads, and signage</li>
                  <li><strong>Fan art</strong> — add authentic script to Star Wars-themed artwork</li>
                  <li><strong>Secret messages</strong> — encode text for fans to decipher</li>
                  <li><strong>Party decorations</strong> — themed banners and invitations</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ── COMMENTS ── */}
        <Comments />

      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden width="16" height="16">
              <polygon points="10,1 12.9,7 19.5,7.6 14.8,11.8 16.2,18.3 10,14.8 3.8,18.3 5.2,11.8 0.5,7.6 7.1,7"/>
            </svg>
            Aurebesh Translator
          </div>
          <nav className="footer__links" aria-label="Footer navigation">
            <Link href="/">Aurebesh</Link>
            <Link href="/sith">Sith Alphabet</Link>
            <Link href="/huttese">Huttese</Link>
            <Link href="/binary">Droidspeak</Link>
            <Link href="/deathtrooper">Death Trooper</Link>
            <Link href="/alphabet">Alphabet Chart</Link>
            <Link href="/font-download">Font Download</Link>
            <Link href="/about">About</Link>
          </nav>
          <p className="footer__note">Fan project. Star Wars and Aurebesh are trademarks of Lucasfilm Ltd. / Disney. Not affiliated with or endorsed by Disney.</p>
          <a href="https://newtool.site/item/free-aurebesh-translator" target="_blank" rel="noopener noreferrer">
            <img src="https://newtool.site/badges/newtool-dark.svg" alt="Featured on NewTool.site" height="54" width="auto" style={{marginTop:'12px'}} />
          </a>
        </div>
      </footer>

      {/* Scroll reveal script */}
      <ScrollReveal />
    </>
  );
}

function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
