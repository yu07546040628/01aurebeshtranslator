'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Nav from '../../components/Nav';
import Starfield from '../../components/Starfield';
import ScrollReveal from '../../components/ScrollReveal';

// Morse code map for droidspeak
const MORSE_MAP: Record<string, string> = {
  'a':'·—','b':'—···','c':'—·—·','d':'—··','e':'·',
  'f':'··—·','g':'——·','h':'····','i':'··','j':'·———',
  'k':'—·—','l':'·—··','m':'——','n':'—·','o':'———',
  'p':'·——·','q':'——·—','r':'·—·','s':'···','t':'—',
  'u':'··—','v':'···—','w':'·——','x':'—··—','y':'—·——',
  'z':'——··',
  '0':'—————','1':'·————','2':'··———','3':'···——','4':'····—',
  '5':'·····','6':'—····','7':'——···','8':'———··','9':'————·',
};

const BINARY_MAP: Record<string, string> = {};
for (const ch of 'abcdefghijklmnopqrstuvwxyz') {
  BINARY_MAP[ch] = ch.charCodeAt(0).toString(2).padStart(8, '0');
}

function translateToDroidspeak(text: string, mode: 'morse' | 'binary' | 'text'): string {
  if (mode === 'text') return text;
  if (mode === 'binary') {
    return text.split('').map(ch => {
      const lower = ch.toLowerCase();
      if (BINARY_MAP[lower]) return BINARY_MAP[lower];
      if (ch === ' ') return '00100000';
      return ch;
    }).join(' ');
  }
  // morse
  return text.split('').map(ch => {
    const lower = ch.toLowerCase();
    if (MORSE_MAP[lower]) return MORSE_MAP[lower];
    if (ch === ' ') return '/';
    return ch;
  }).join(' ');
}

const BEEP_CARDS = [
  { symbol: '·', name: 'Short Beep (Dit)', desc: 'Quick high-pitched tone representing 0 or dot in Morse', freq: '440 Hz · 100ms' },
  { symbol: '—', name: 'Long Beep (Dah)', desc: 'Extended tone representing 1 or dash in Morse encoding', freq: '440 Hz · 300ms' },
  { symbol: '↗', name: 'Rising Whistle', desc: 'Frequency sweep from low to high — often indicates question or excitement', freq: '220 → 880 Hz' },
  { symbol: '↘', name: 'Falling Tone', desc: 'Frequency descending — agreement, acknowledgment, or sadness', freq: '880 → 220 Hz' },
  { symbol: '~', name: 'Warble / Trill', desc: 'Rapid frequency oscillation — alarm, warning, or strong emotion', freq: '660 Hz ± 200' },
  { symbol: '∅', name: 'Silence', desc: 'Gap between characters or words — spacing and phrasing separator', freq: '0 Hz · 200ms' },
];

export default function BinaryPage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'morse' | 'binary' | 'text'>('morse');
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef(false);

  const output = translateToDroidspeak(input, mode);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* fallback */ }
  };

  const playBeeps = useCallback(async () => {
    if (!input.trim()) return;
    stopRef.current = false;
    setIsPlaying(true);

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    const morseText = translateToDroidspeak(input, 'morse');
    const symbols = morseText.split('');
    let time = ctx.currentTime;

    for (const sym of symbols) {
      if (stopRef.current) break;
      if (sym === '·') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 440;
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        osc.start(time);
        osc.stop(time + 0.1);
        time += 0.15;
      } else if (sym === '—') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 440;
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
        osc.start(time);
        osc.stop(time + 0.3);
        time += 0.35;
      } else if (sym === ' ') {
        time += 0.2;
      } else if (sym === '/') {
        time += 0.4;
      }
    }

    setTimeout(() => {
      setIsPlaying(false);
      ctx.close();
    }, (time - ctx.currentTime) * 1000 + 200);
  }, [input]);

  const stopBeeps = () => {
    stopRef.current = true;
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
    setIsPlaying(false);
  };

  return (
    <>
      <Starfield />
      <ScrollReveal />
      <Nav />

      {/* Hero */}
      <header className="hero hero--binary">
        <div className="hero__bg" style={{backgroundImage:"url('/pic/hero-bg-dark.png')"}} aria-hidden />
        <div className="hero__scanlines" aria-hidden="true" />
        <div className="hero__inner">
          <p className="hero__eyebrow">Star Wars Droid Language</p>
          <h1 className="hero__title">Droidspeak <span>Binary</span></h1>
          <p className="hero__sub">R2-D2's beep-boop language, encoded as Morse-style binary sequences. Optional audio playback included.</p>
          <div className="hero__badges">
            <span className="badge badge--binary">🤖 Morse Encoding</span>
            <span className="badge badge--binary">🔊 Audio Playback</span>
            <span className="badge badge--binary">Text &amp; Binary Modes</span>
            <span className="badge badge--sith"><a href="/sith" style={{color:'inherit'}}>⚡ Sith</a></span>
            <span className="badge badge--huttese"><a href="/huttese" style={{color:'inherit'}}>🐸 Huttese</a></span>
            <span className="badge badge--death"><a href="/deathtrooper" style={{color:'inherit'}}>☠ Death Trooper</a></span>
          </div>
        </div>
      </header>

      <main>
        {/* Translator */}
        <section className="translator-section reveal">
          <div className="section-inner">
            <div className="translator translator--binary">
              <div className="translator__direction">
                <span className="lang lang--binary">English</span>
                <button className="translator__swap translator__swap--binary" aria-label="Swap direction">⇄ Swap</button>
                <span className="lang lang--binary">Droidspeak</span>
              </div>
              <div className="translator__panes">
                <div className="pane pane--input">
                  <textarea
                    className="pane__textarea"
                    placeholder="Type English text here…"
                    aria-label="English input"
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
                <div className="pane pane--output pane--binary-output">
                  {/* Mode toggle */}
                  <div className="binary-mode-toggle" role="group" aria-label="Output mode">
                    <button
                      className={`mode-btn${mode === 'morse' ? ' mode-btn--active' : ''}`}
                      onClick={() => setMode('morse')}
                      aria-pressed={mode === 'morse'}
                    >· — Morse</button>
                    <button
                      className={`mode-btn${mode === 'binary' ? ' mode-btn--active' : ''}`}
                      onClick={() => setMode('binary')}
                      aria-pressed={mode === 'binary'}
                    >01 Binary</button>
                    <button
                      className={`mode-btn${mode === 'text' ? ' mode-btn--active' : ''}`}
                      onClick={() => setMode('text')}
                      aria-pressed={mode === 'text'}
                    >Text</button>
                  </div>

                  <div className="binary-output pane__output" aria-label="Droidspeak output" aria-live="polite">
                    {output || <span className="pane__placeholder">Droidspeak output appears here…</span>}
                  </div>

                  {/* Audio controls */}
                  <div className="audio-controls">
                    <button
                      className="audio-btn audio-btn--play"
                      aria-label="Play droidspeak audio"
                      onClick={playBeeps}
                      disabled={isPlaying}
                    >▶ Play Beeps</button>
                    <button
                      className="audio-btn audio-btn--stop"
                      aria-label="Stop audio"
                      onClick={stopBeeps}
                    >■ Stop</button>
                    <div className="audio-visualizer" aria-hidden="true">
                      {Array.from({length: 12}).map((_, i) => (
                        <div
                          key={i}
                          className="bar"
                          style={isPlaying ? {height: `${4 + Math.random() * 20}px`, transition: 'height 0.1s ease'} : {}}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="toolbar">
                    <button className="toolbar__btn toolbar__btn--binary" onClick={handleCopy} aria-label="Copy to clipboard">
                      ⎘ {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beep Legend */}
        <section className="beep-section reveal" style={{padding:'0 0 48px'}}>
          <div className="section-inner">
            <h2 className="section-title">Droid Sound Reference</h2>
            <p className="section-sub">How different sounds map to meaning in droidspeak</p>
            <div className="beep-grid">
              {BEEP_CARDS.map(card => (
                <div key={card.name} className="beep-card">
                  <div className="beep-card__symbol">{card.symbol}</div>
                  <div className="beep-card__name">{card.name}</div>
                  <div className="beep-card__desc">{card.desc}</div>
                  <div className="beep-card__freq">{card.freq}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="reveal" style={{padding:'0 0 64px'}}>
          <div className="section-inner">
            <div className="info-grid">
              <div className="info-card info-card--binary">
                <h3 className="info-card__title">About Droidspeak</h3>
                <p>Droidspeak (also called Binary) is the communication language used by astromech droids like R2-D2 and BB-8. While humans hear only beeps and whistles, droids and protocol droids like C-3PO can fully understand and translate these sequences.</p>
              </div>
              <div className="info-card info-card--binary">
                <h3 className="info-card__title">Encoding Method</h3>
                <ul className="info-list">
                  <li>Each letter maps to a Morse-style beep pattern</li>
                  <li>Short beep (·) = dot, Long beep (—) = dash</li>
                  <li>Word gaps represented by extended silence</li>
                  <li>Optionally rendered as 8-bit binary (ASCII)</li>
                  <li>Audio uses Web Audio API oscillators</li>
                </ul>
              </div>
              <div className="info-card info-card--binary">
                <h3 className="info-card__title">Famous Droid Voices</h3>
                <ul className="info-list">
                  <li>R2-D2 — Kenny Baker, then digital (all films)</li>
                  <li>BB-8 — Bill Hader + Ben Schwartz (vocal consultant)</li>
                  <li>R5-D4 — brief cameo, A New Hope</li>
                  <li>D-O — The Rise of Skywalker</li>
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
                  <p className="promo-card__desc">The main Star Wars script with full dipthong support.</p>
                </div>
                <span className="promo-card__arrow">→</span>
              </a>
              <a className="promo-card promo-card--sith" href="/sith">
                <div className="promo-card__icon">⚡</div>
                <div className="promo-card__body">
                  <h3 className="promo-card__title">Sith Alphabet</h3>
                  <p className="promo-card__desc">Ur-Kittât — the ancient dark side script.</p>
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
              <article className="info-card info-card--binary">
                <h2 className="info-card__title">What is Droidspeak?</h2>
                <p>Droidspeak — also called Binary — is the communication language used by astromech droids throughout the Star Wars galaxy. R2-D2, BB-8, and other droids communicate entirely through sequences of beeps, whistles, and electronic tones. While most humans hear only noise, protocol droids like C-3PO can translate these sounds into full sentences. This translator converts English text into a Morse-style beep pattern that mimics droid communication, with optional audio playback.</p>
              </article>
              <article className="info-card info-card--binary">
                <h2 className="info-card__title">R2-D2 and BB-8</h2>
                <p>R2-D2 is the most iconic droidspeak communicator in Star Wars, appearing in all nine Skywalker Saga films. His voice was created by sound designer Ben Burtt using electronic synthesizers and his own voice. BB-8 from the sequel trilogy uses a similar beep language, with vocal consultant Ben Schwartz contributing to the character's personality. Both droids are understood by C-3PO, who acts as a translator for human characters throughout the films.</p>
              </article>
              <article className="info-card info-card--binary">
                <h2 className="info-card__title">Common Uses</h2>
                <ul className="info-list">
                  <li>Cosplay — encode messages on R2-D2 or BB-8 props</li>
                  <li>Fan projects — add droid dialogue to Star Wars fan films</li>
                  <li>Secret messages — communicate in droidspeak with other fans</li>
                  <li>Sound design — reference for droid sound patterns</li>
                  <li>Education — learn about Morse code through Star Wars</li>
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
          <a href="https://aidirs.best" target="_blank" rel="noopener">
            <img src="https://aidirs.best/dark.svg" alt="Featured on Aidirs" width="200" height="56" style={{marginTop:'12px'}} />
          </a>
          <a href="https://www.justsimple.tools" target="_blank" rel="noopener">
            <img src="https://www.justsimple.tools/badge.svg" width="150" alt="Listed on JustSimple Tools" style={{marginTop:'12px'}} />
          </a>
        </div>
      </footer>
    </>
  );
}
