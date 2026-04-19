'use client';

import { useState, useCallback } from 'react';
import Nav from '../../components/Nav';
import Starfield from '../../components/Starfield';
import ScrollReveal from '../../components/ScrollReveal';

// Aurebesh map for Death Trooper output rendering
const AUR_MAP: Record<string, string> = {
  'a':'𐤀','b':'𐤁','c':'𐤂','d':'𐤃','e':'𐤄',
  'f':'𐤅','g':'𐤆','h':'𐤇','i':'𐤈','j':'𐤉',
  'k':'𐤊','l':'𐤋','m':'𐤌','n':'𐤍','o':'𐤎',
  'p':'𐤏','q':'𐤐','r':'𐤑','s':'𐤒','t':'𐤓',
  'u':'𐤔','v':'𐤕','w':'𐤖','x':'𐤗','y':'𐤘',
  'z':'𐤙',
};

function atbash(ch: string): string {
  const lower = ch.toLowerCase();
  if (lower >= 'a' && lower <= 'z') {
    const code = 'z'.charCodeAt(0) - (lower.charCodeAt(0) - 'a'.charCodeAt(0));
    return String.fromCharCode(code);
  }
  return ch;
}

function caesarShift(ch: string, shift: number): string {
  const lower = ch.toLowerCase();
  if (lower >= 'a' && lower <= 'z') {
    const code = ((lower.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0);
    return String.fromCharCode(code);
  }
  return ch;
}

function caesarUnshift(ch: string, shift: number): string {
  const lower = ch.toLowerCase();
  if (lower >= 'a' && lower <= 'z') {
    const code = ((lower.charCodeAt(0) - 'a'.charCodeAt(0) - shift + 26) % 26) + 'a'.charCodeAt(0);
    return String.fromCharCode(code);
  }
  return ch;
}

type CipherMode = 'both' | 'atbash' | 'caesar';

function encrypt(text: string, mode: CipherMode, shift: number): string {
  return text.split('').map(ch => {
    if (!/[a-zA-Z]/.test(ch)) return ch;
    let result = ch.toLowerCase();
    if (mode === 'both' || mode === 'atbash') result = atbash(result);
    if (mode === 'both' || mode === 'caesar') result = caesarShift(result, shift);
    return result;
  }).join('');
}

function decrypt(text: string, mode: CipherMode, shift: number): string {
  return text.split('').map(ch => {
    if (!/[a-zA-Z]/.test(ch)) return ch;
    let result = ch.toLowerCase();
    if (mode === 'both' || mode === 'caesar') result = caesarUnshift(result, shift);
    if (mode === 'both' || mode === 'atbash') result = atbash(result);
    return result;
  }).join('');
}

function renderAsAurebesh(text: string): string {
  return text.split('').map(ch => AUR_MAP[ch.toLowerCase()] ?? ch).join('');
}

export default function DeathTrooperPage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<CipherMode>('both');
  const [shift, setShift] = useState(5);
  const [decryptMode, setDecryptMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const encryptedText = decryptMode
    ? decrypt(input, mode, shift)
    : encrypt(input, mode, shift);

  const aurebeshOutput = decryptMode ? encryptedText : renderAsAurebesh(encryptedText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aurebeshOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* fallback */ }
  };

  return (
    <>
      <Starfield />
      <ScrollReveal />
      <Nav />

      {/* Hero */}
      <header className="hero hero--death">
        <div className="hero__bg" style={{backgroundImage:"url('/pic/hero-bg-dark.png')"}} aria-hidden />
        <div className="hero__hud" aria-hidden="true">
          <div className="hud-line"></div>
          <div className="hud-line"></div>
          <div className="hud-corner hud-corner--tl"></div>
          <div className="hud-corner hud-corner--tr"></div>
        </div>
        <div className="hero__inner">
          <p className="hero__eyebrow">Imperial Special Forces Encryption</p>
          <h1 className="hero__title">Death Trooper <span>Cipher</span></h1>
          <p className="hero__sub">The classified encryption system used by the Empire's elite Death Troopers. Atbash mirror combined with Caesar shift — rendered in Aurebesh.</p>
          <div className="hero__badges">
            <span className="badge badge--death">☠ Atbash Mirror</span>
            <span className="badge badge--death">+ Caesar Shift</span>
            <span className="badge badge--death">Aurebesh Output</span>
            <span className="badge badge--sith"><a href="/sith" style={{color:'inherit'}}>⚡ Sith</a></span>
            <span className="badge badge--huttese"><a href="/huttese" style={{color:'inherit'}}>🐸 Huttese</a></span>
            <span className="badge badge--binary"><a href="/binary" style={{color:'inherit'}}>🤖 Binary</a></span>
          </div>
        </div>
      </header>

      {/* Cipher Mode Bar */}
      <div className="cipher-mode-bar">
        <div className="cipher-mode-bar__inner">
          <span className="cipher-mode-bar__label">Cipher Mode:</span>
          <div className="cipher-tabs" role="group" aria-label="Cipher mode selection">
            {(['both', 'atbash', 'caesar'] as CipherMode[]).map(m => (
              <button
                key={m}
                className={`cipher-tab${mode === m ? ' cipher-tab--active' : ''}`}
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
              >
                <span className="cipher-tab__name">
                  {m === 'both' ? 'Atbash + Caesar' : m === 'atbash' ? 'Atbash Only' : 'Caesar Only'}
                </span>
                <span className="cipher-tab__desc">
                  {m === 'both' ? 'Full Death Trooper cipher' : m === 'atbash' ? 'A↔Z mirror only' : 'Shift only'}
                </span>
              </button>
            ))}
          </div>
          <div className="caesar-control" aria-label="Caesar shift amount">
            <span>Shift:</span>
            <input
              type="range" min={1} max={25} value={shift}
              onChange={e => setShift(Number(e.target.value))}
              aria-label="Caesar shift value"
            />
            <strong>+{shift}</strong>
          </div>
        </div>
      </div>

      <main>
        {/* Translator */}
        <section className="translator-section reveal">
          <div className="section-inner">
            <div className="translator translator--death">
              <div className="translator__direction">
                <span className="lang lang--death">{decryptMode ? 'Cipher Text' : 'Plaintext'}</span>
                <button
                  className="translator__swap translator__swap--death"
                  onClick={() => { setDecryptMode(d => !d); setInput(''); }}
                  aria-label="Toggle encrypt/decrypt"
                >
                  ⇄ {decryptMode ? 'Encrypt Mode' : 'Decrypt Mode'}
                </button>
                <span className="lang lang--death">{decryptMode ? 'Decrypted' : 'Encrypted Aurebesh'}</span>
              </div>
              <div className="translator__panes">
                <div className="pane pane--input">
                  <textarea
                    className="pane__textarea"
                    placeholder={decryptMode ? 'Paste cipher text here…' : 'Type your secret message here…'}
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
                <div className="pane pane--output pane--death-output">
                  <div className="death-output pane__output" aria-label="Encrypted output" aria-live="polite">
                    {aurebeshOutput || <span className="pane__placeholder">Encrypted cipher output appears here…</span>}
                  </div>
                  <div className="decode-bar">
                    <span className="decode-bar__label">Show intermediate (letters only)</span>
                    <span className="cipher-badge">CLASSIFIED</span>
                    {!decryptMode && encryptedText && (
                      <span style={{fontSize:'12px',color:'var(--clr-text-3)',fontFamily:'var(--font-mono)',marginLeft:'8px'}}>{encryptedText}</span>
                    )}
                  </div>
                  <div className="toolbar">
                    <button className="toolbar__btn toolbar__btn--death" onClick={handleCopy} aria-label="Copy to clipboard">
                      ⎘ {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cipher Steps Diagram */}
        <section className="cipher-explain-section reveal" style={{padding:'0 0 48px'}}>
          <div className="section-inner">
            <h2 className="section-title">How the Death Trooper Cipher Works</h2>
            <p className="section-sub">A two-stage encryption process used by Imperial special forces</p>
            <div className="cipher-steps">
              <div className="cipher-step">
                <div className="cipher-step__num">STEP 01</div>
                <h3>Input Plaintext</h3>
                <div className="cipher-step__example">ROGUE ONE</div>
                <div className="cipher-step__note">Your original English message</div>
              </div>
              <div className="cipher-step__arrow" aria-hidden="true">→</div>
              <div className="cipher-step">
                <div className="cipher-step__num">STEP 02</div>
                <h3>Atbash Mirror</h3>
                <div className="cipher-step__example">ILFTV LMV</div>
                <div className="cipher-step__note">A↔Z, B↔Y, C↔X … each letter flipped</div>
              </div>
              <div className="cipher-step__arrow" aria-hidden="true">→</div>
              <div className="cipher-step">
                <div className="cipher-step__num">STEP 03</div>
                <h3>Caesar Shift (+5)</h3>
                <div className="cipher-step__example">NQKYA QRА</div>
                <div className="cipher-step__note">Shift each letter forward by the set amount</div>
              </div>
              <div className="cipher-step__arrow" aria-hidden="true">→</div>
              <div className="cipher-step">
                <div className="cipher-step__num">STEP 04</div>
                <h3>Aurebesh Render</h3>
                <div className="cipher-step__example death-glyph-preview">
                  {['N','Q','K','Y','A'].map(l => (
                    <span key={l} className="glyph-placeholder">{l}</span>
                  ))}
                </div>
                <div className="cipher-step__note">Encrypted letters rendered as Aurebesh glyphs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="reveal" style={{padding:'0 0 64px'}}>
          <div className="section-inner">
            <div className="info-grid">
              <div className="info-card info-card--death">
                <h3 className="info-card__title">About Death Troopers</h3>
                <p>Death Troopers are the Imperial Security Bureau's elite special forces, first appearing in Rogue One. Their communications are scrambled using a proprietary encryption cipher to prevent interception by the Rebel Alliance.</p>
              </div>
              <div className="info-card info-card--death">
                <h3 className="info-card__title">Cipher Breakdown</h3>
                <ul className="info-list">
                  <li><strong>Atbash:</strong> Ancient Hebrew mirror cipher — A↔Z</li>
                  <li><strong>Caesar:</strong> Shift all letters by N positions</li>
                  <li><strong>Default shift:</strong> +5 (customizable)</li>
                  <li><strong>Output:</strong> Rendered as Aurebesh script</li>
                  <li>Decrypt by reversing both operations</li>
                </ul>
              </div>
              <div className="info-card info-card--death">
                <h3 className="info-card__title">Security Level</h3>
                <ul className="info-list">
                  <li>Atbash alone — trivially reversible</li>
                  <li>Caesar alone — 25 possible keys</li>
                  <li>Combined — significantly harder to crack</li>
                  <li>Add Aurebesh layer — visually unrecognizable</li>
                  <li>Best used for fun, not real security!</li>
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
              <a className="promo-card" href="/"><div className="promo-card__icon">✦</div><div className="promo-card__body"><h3 className="promo-card__title">Aurebesh</h3><p className="promo-card__desc">The main Star Wars script with full dipthong support.</p></div><span className="promo-card__arrow">→</span></a>
              <a className="promo-card promo-card--sith" href="/sith"><div className="promo-card__icon">⚡</div><div className="promo-card__body"><h3 className="promo-card__title">Sith Alphabet</h3><p className="promo-card__desc">Ur-Kittât — the ancient dark side script.</p></div><span className="promo-card__arrow">→</span></a>
              <a className="promo-card promo-card--huttese" href="/huttese"><div className="promo-card__icon">🐸</div><div className="promo-card__body"><h3 className="promo-card__title">Huttese</h3><p className="promo-card__desc">Jabba's vocabulary replacement engine.</p></div><span className="promo-card__arrow">→</span></a>
              <a className="promo-card promo-card--binary" href="/binary"><div className="promo-card__icon">🤖</div><div className="promo-card__body"><h3 className="promo-card__title">Droidspeak</h3><p className="promo-card__desc">R2-D2's beep language with audio playback.</p></div><span className="promo-card__arrow">→</span></a>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="reveal" style={{padding:'0 0 64px'}}>
          <div className="section-inner">
            <div className="info-grid">
              <article className="info-card info-card--death">
                <h2 className="info-card__title">What is the Death Trooper Cipher?</h2>
                <p>The Death Trooper Cipher is an Imperial encryption system referenced in Star Wars Rogue One lore. It combines two classical ciphers — Atbash and Caesar shift — to encode messages that are then rendered as Aurebesh glyphs, making them visually unrecognizable to anyone without the key.</p>
                <p style={{marginTop:'0.75rem'}}>Death Troopers were elite Imperial soldiers who served as bodyguards and enforcers for high-ranking officers. Their encrypted communications were designed to be unreadable even if intercepted by Rebel forces.</p>
              </article>
              <article className="info-card info-card--death">
                <h2 className="info-card__title">How Atbash + Caesar Works</h2>
                <p>The cipher runs in two stages. First, Atbash mirrors every letter — A becomes Z, B becomes Y, and so on. Then a Caesar shift moves each letter forward by a set number of positions (default: 5). The result is then converted to Aurebesh glyphs. To decrypt, reverse both operations: undo the Caesar shift, then apply Atbash again.</p>
              </article>
              <article className="info-card info-card--death">
                <h2 className="info-card__title">Common Uses</h2>
                <ul className="info-list">
                  <li>Cosplay — encode prop documents and datapads</li>
                  <li>Fan fiction — add authentic Imperial communications</li>
                  <li>Escape rooms — Star Wars-themed puzzle design</li>
                  <li>Secret messages — encode text for other fans to crack</li>
                  <li>Party games — Star Wars-themed cipher challenges</li>
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
          <a href="https://newtool.site/item/free-aurebesh-translator" target="_blank" rel="noopener noreferrer">
            <img src="https://newtool.site/badges/newtool-dark.svg" alt="Featured on NewTool.site" height="54" width="auto" style={{marginTop:'12px'}} />
          </a>
        </div>
      </footer>
    </>
  );
}
