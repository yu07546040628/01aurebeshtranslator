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

        {/* SEO Content */}
        <section className="reveal" style={{padding:'0 0 64px'}}>
          <div className="section-inner">
            <div className="info-grid">
              <article className="info-card info-card--sith">
                <h2 className="info-card__title">What is the Sith Alphabet?</h2>
                <p>The Sith Alphabet, known as Ur-Kittât, is the ancient writing system of the Sith Order in Star Wars. Unlike Aurebesh — the common Galactic script — Ur-Kittât was used exclusively by Sith Lords and their followers. Its angular, geometric forms were carved into the walls of Sith tombs on Korriban and Moraband, inscribed on holocrons, and etched into ancient weapons and armor.</p>
                <p style={{marginTop:'0.75rem'}}>The script appears throughout Star Wars Legends material, The Old Republic game, and various canon sources. It reflects the Sith philosophy: sharp, aggressive, and built for power rather than elegance.</p>
              </article>
              <article className="info-card info-card--sith">
                <h2 className="info-card__title">How to Use This Translator</h2>
                <p>Type any English text into the input box and it converts instantly to Ur-Kittât glyphs. The cipher is a straightforward 1:1 letter substitution — each of the 26 English letters maps to a unique Sith glyph. Unlike Aurebesh, there are no dipthongs to worry about.</p>
                <p style={{marginTop:'0.75rem'}}>Use the glyph chart below the translator to click individual letters into the input. The reverse direction lets you paste Sith glyphs and decode them back to English.</p>
              </article>
              <article className="info-card info-card--sith">
                <h2 className="info-card__title">Sith Alphabet vs. Aurebesh</h2>
                <ul className="info-list">
                  <li><strong>Aurebesh</strong> is the standard Galactic script — readable by most citizens of the Republic and Empire</li>
                  <li><strong>Ur-Kittât</strong> is ancient and secret — used by Sith to hide knowledge from outsiders</li>
                  <li>Aurebesh has 12 dipthong glyphs; Ur-Kittât uses pure 1:1 substitution</li>
                  <li>Aurebesh appears on ship displays and signage; Sith script appears on tombs and artifacts</li>
                  <li>Both are used in Star Wars tattoos and cosplay props</li>
                </ul>
              </article>
              <article className="info-card info-card--sith">
                <h2 className="info-card__title">Common Uses</h2>
                <ul className="info-list">
                  <li><strong>Tattoos</strong> — Sith script tattoos are popular among Star Wars fans who prefer the dark side aesthetic</li>
                  <li><strong>Cosplay</strong> — screen-accurate Sith Lord armor, robes, and props</li>
                  <li><strong>Fan art</strong> — add authentic Sith inscriptions to artwork and illustrations</li>
                  <li><strong>Secret messages</strong> — encode text that only other fans can read</li>
                  <li><strong>Game props</strong> — TTRPG and LARP Star Wars campaigns</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="reveal" style={{padding:'0 0 64px'}}>
          <div className="section-inner">
            <div className="info-grid">
              <article className="info-card info-card--sith">
                <h2 className="info-card__title">What is the Sith Alphabet?</h2>
                <p>The Sith Alphabet, known as Ur-Kittât, is the ancient writing system of the Sith Order in Star Wars. It appears carved into the walls of Sith tombs on Korriban and Moraband, etched into Sith holocrons, and inscribed on artifacts from the Old Republic era. Unlike Aurebesh — the common Galactic script — Ur-Kittât was used exclusively by Sith Lords and their followers, making it a symbol of dark side power and forbidden knowledge.</p>
              </article>
              <article className="info-card info-card--sith">
                <h2 className="info-card__title">Sith Alphabet vs Aurebesh</h2>
                <p>Both scripts map to the same 26 English letters, but they work differently. Aurebesh has 12 dipthong glyphs (CH, SH, TH, OO, etc.) that combine two letters into one symbol. Ur-Kittât is a pure 1:1 cipher — every letter gets exactly one glyph, no exceptions. Aurebesh is the everyday script of the galaxy; Ur-Kittât is ancient, secretive, and tied to the dark side. If you want the standard Star Wars script, use the <a href="/" style={{color:'inherit',textDecoration:'underline'}}>Aurebesh Translator</a> instead.</p>
              </article>
              <article className="info-card info-card--sith">
                <h2 className="info-card__title">Common Uses for Sith Script</h2>
                <ul className="info-list">
                  <li>Tattoos — dark side-themed Star Wars ink</li>
                  <li>Cosplay props — Sith holocrons, lightsaber hilts, armor</li>
                  <li>Fan art — authentic inscriptions on Sith-themed artwork</li>
                  <li>Secret messages — encode text only Star Wars fans can read</li>
                  <li>Game design — lore-accurate text for Star Wars tabletop or video games</li>
                </ul>
              </article>
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
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center',marginTop:'12px'}}>
            <a href="https://newtool.site/item/free-aurebesh-translator" target="_blank" rel="noopener noreferrer">
              <img src="https://newtool.site/badges/newtool-dark.svg" alt="Featured on NewTool.site" height="44" width="auto" />
            </a>
            <a href="https://aidirs.best" target="_blank" rel="noopener" style={{background:'#1a1a2e',borderRadius:'8px',display:'inline-flex',alignItems:'center'}}>
              <img src="https://aidirs.best/dark.svg" alt="Featured on Aidirs" width="200" height="56" style={{borderRadius:'8px'}} />
            </a>
            <a href="https://www.justsimple.tools" target="_blank" rel="noopener">
              <img src="https://www.justsimple.tools/badge.svg" alt="Listed on JustSimple Tools" height="44" width="auto" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
