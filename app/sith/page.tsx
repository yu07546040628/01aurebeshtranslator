'use client';

import { useState, useRef, useCallback } from 'react';
import Nav from '../../components/Nav';
import Starfield from '../../components/Starfield';
import ScrollReveal from '../../components/ScrollReveal';

// Sith alphabet map (Ur-Kittât) - using cuneiform Unicode as visual stand-in
const SITH_MAP: Record<string, string> = {
  'a':'𒀭','b':'𒀸','c':'𒁀','d':'𒁹','e':'𒂗',
  'f':'𒃰','g':'𒄑','h':'𒄿','i':'𒅅','j':'𒅗',
  'k':'𒆍','l':'𒆳','m':'𒇻','n':'𒉺','o':'𒊕',
  'p':'𒊩','q':'𒊺','r':'𒋙','s':'𒌀','t':'𒌝',
  'u':'𒍀','v':'𒍝','w':'𒎎','x':'𒏀','y':'𒐈',
  'z':'𒐷',
};

const SITH_TO_ENG: Record<string, string> = {};
for (const [eng, sith] of Object.entries(SITH_MAP)) {
  SITH_TO_ENG[sith] = eng;
}

function translateToSith(text: string): string {
  return text.split('').map(ch => {
    const lower = ch.toLowerCase();
    if (SITH_MAP[lower]) return SITH_MAP[lower];
    return ch;
  }).join('');
}

function translateFromSith(text: string): string {
  return text.split('').map(ch => SITH_TO_ENG[ch] ?? ch).join('');
}

const SITH_CHARS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function SithPage() {
  const [input, setInput] = useState('');
  const [direction, setDirection] = useState<'eng2sith' | 'sith2eng'>('eng2sith');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const output = direction === 'eng2sith'
    ? translateToSith(input)
    : translateFromSith(input);

  const handleSwap = () => {
    setDirection(d => d === 'eng2sith' ? 'sith2eng' : 'eng2sith');
    setInput('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* fallback */
    }
  };

  const insertChar = useCallback((ch: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newVal = input.slice(0, start) + ch + input.slice(end);
    setInput(newVal);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + ch.length;
      ta.focus();
    });
  }, [input]);

  return (
    <>
      <Starfield />
      <ScrollReveal />
      <Nav />

      {/* Hero */}
      <header className="hero hero--sith">
        <div className="hero__bg" style={{backgroundImage:"url('/pic/hero-bg-dark.png')"}} aria-hidden />
        <div className="hero__runes" aria-hidden="true">
          <span>⚡</span><span>☽</span><span>⚡</span><span>☽</span><span>⚡</span>
        </div>
        <div className="hero__inner">
          <p className="hero__eyebrow">Star Wars Dark Side Script</p>
          <h1 className="hero__title">Sith <span>Alphabet</span></h1>
          <p className="hero__sub">Ur-Kittât — the ancient writing system of the Sith Order. Angular, menacing, and etched into the walls of tombs across the galaxy.</p>
          <div className="hero__badges">
            <span className="badge badge--sith">⚡ Ur-Kittât Script</span>
            <span className="badge badge--sith">26 Letters</span>
            <span className="badge badge--sith">PNG / SVG Export</span>
            <span className="badge badge--huttese"><a href="/huttese" style={{color:'inherit'}}>🐸 Huttese</a></span>
            <span className="badge badge--binary"><a href="/binary" style={{color:'inherit'}}>🤖 Binary</a></span>
            <span className="badge badge--death"><a href="/deathtrooper" style={{color:'inherit'}}>☠ Death Trooper</a></span>
          </div>
        </div>
      </header>

      <main>
        {/* Translator */}
        <section className="translator-section reveal">
          <div className="section-inner">
            <div className="translator translator--sith">
              <div className="translator__direction">
                <span className="lang lang--sith">{direction === 'eng2sith' ? 'English' : 'Sith Alphabet'}</span>
                <button className="translator__swap translator__swap--sith" onClick={handleSwap} aria-label="Swap direction">⇄ Swap</button>
                <span className="lang lang--sith">{direction === 'eng2sith' ? 'Sith Alphabet' : 'English'}</span>
              </div>
              <div className="translator__panes">
                <div className="pane pane--input">
                  <textarea
                    ref={textareaRef}
                    className="pane__textarea"
                    placeholder={direction === 'eng2sith' ? 'Type English text here…' : 'Paste Sith glyphs here…'}
                    aria-label="Input"
                    rows={6}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                  <div className="pane__footer">
                    <span className="pane__count">{input.length} characters</span>
                    <button className="pane__clear" onClick={() => setInput('')} aria-label="Clear input">✕ Clear</button>
                  </div>
                </div>
                <div className="translator__divider" aria-hidden="true" />
                <div className="pane pane--output pane--sith-output">
                  <div className="sith-output pane__output" aria-label="Sith alphabet output" aria-live="polite">
                    {output || <span className="pane__placeholder">Ur-Kittât translation appears here…</span>}
                  </div>
                  <div className="toolbar">
                    <button className="toolbar__btn toolbar__btn--sith" onClick={handleCopy} aria-label="Copy to clipboard">
                      ⎘ {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alphabet Chips */}
        <section className="reveal" style={{padding:'0 0 48px'}}>
          <div className="section-inner">
            <h2 className="section-title">All 26 Sith Glyphs</h2>
            <p className="section-sub">Click to insert. Pure 1:1 cipher — no dipthongs.</p>
            <div className="alpha-chips">
              {SITH_CHARS.map(ch => (
                <button
                  key={ch}
                  className="alpha-chip alpha-chip--sith"
                  data-char={ch}
                  aria-label={`Sith ${ch.toUpperCase()}`}
                  onClick={() => insertChar(ch)}
                >
                  <span className="alpha-chip__glyph">{SITH_MAP[ch]}</span>
                  <span className="alpha-chip__label">{ch.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="reveal" style={{padding:'0 0 64px'}}>
          <div className="section-inner">
            <div className="info-grid">
              <div className="info-card info-card--sith">
                <h3 className="info-card__title">About Ur-Kittât</h3>
                <p>Ur-Kittât is the ancient script of the Sith, appearing in tombs on Korriban and Moraband. Its angular geometric forms reflect the Sith philosophy of sharp power over flowing harmony.</p>
              </div>
              <div className="info-card info-card--sith">
                <h3 className="info-card__title">How the Cipher Works</h3>
                <ul className="info-list">
                  <li>Pure 1:1 letter substitution — A through Z</li>
                  <li>No dipthongs unlike Aurebesh</li>
                  <li>Case-insensitive: same glyph for upper and lower</li>
                  <li>Punctuation and spaces preserved</li>
                </ul>
              </div>
              <div className="info-card info-card--sith">
                <h3 className="info-card__title">Sith vs. Aurebesh</h3>
                <ul className="info-list">
                  <li>Aurebesh = Galactic Standard (read by everyone)</li>
                  <li>Ur-Kittât = Sith exclusive, secret, ancient</li>
                  <li>Aurebesh has 12 dipthong glyphs; Sith has none</li>
                  <li>Often found carved in stone, not on datapads</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* More Languages */}
        <section className="promo-section reveal">
          <div className="section-inner">
            <h2 className="section-title">More Star Wars Languages</h2>
            <div className="promo-grid">
              <a className="promo-card" href="/">
                <div className="promo-card__icon">✦</div>
                <div className="promo-card__body">
                  <h3 className="promo-card__title">Aurebesh</h3>
                  <p className="promo-card__desc">The main Star Wars alphabet with full dipthong support.</p>
                </div>
                <span className="promo-card__arrow">→</span>
              </a>
              <a className="promo-card promo-card--huttese" href="/huttese">
                <div className="promo-card__icon">🐸</div>
                <div className="promo-card__body">
                  <h3 className="promo-card__title">Huttese</h3>
                  <p className="promo-card__desc">Jabba's vocabulary replacement engine.</p>
                </div>
                <span className="promo-card__arrow">→</span>
              </a>
              <a className="promo-card promo-card--binary" href="/binary">
                <div className="promo-card__icon">🤖</div>
                <div className="promo-card__body">
                  <h3 className="promo-card__title">Droidspeak</h3>
                  <p className="promo-card__desc">R2-D2's beep language with audio playback.</p>
                </div>
                <span className="promo-card__arrow">→</span>
              </a>
              <a className="promo-card promo-card--death" href="/deathtrooper">
                <div className="promo-card__icon">☠</div>
                <div className="promo-card__body">
                  <h3 className="promo-card__title">Death Trooper Cipher</h3>
                  <p className="promo-card__desc">Atbash + Caesar shift Imperial encryption.</p>
                </div>
                <span className="promo-card__arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" width="16" height="16">
              <polygon points="10,1 12.9,7 19.5,7.6 14.8,11.8 16.2,18.3 10,14.8 3.8,18.3 5.2,11.8 0.5,7.6 7.1,7"/>
            </svg>
            Aurebesh Translator
          </div>
          <nav className="footer__links" aria-label="Footer navigation">
            <a href="/">Aurebesh</a>
            <a href="/sith">Sith Alphabet</a>
            <a href="/huttese">Huttese</a>
            <a href="/binary">Droidspeak</a>
            <a href="/deathtrooper">Death Trooper</a>
            <a href="/alphabet">Alphabet Chart</a>
          </nav>
          <p className="footer__note">Fan project. Star Wars and all related trademarks are property of Lucasfilm Ltd. / Disney. Not affiliated with or endorsed by Disney.</p>
        </div>
      </footer>
    </>
  );
}
