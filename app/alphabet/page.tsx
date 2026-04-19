'use client';

import Nav from '../../components/Nav';
import Starfield from '../../components/Starfield';

// Aurebesh letter data
const LETTERS = [
  { glyph: '𐤀', english: 'A', name: 'Aurek', note: 'Starts the alphabet — "Aur" like "or"' },
  { glyph: '𐤁', english: 'B', name: 'Besh', note: 'Second letter — "Besh" like "mesh"' },
  { glyph: '𐤂', english: 'C', name: 'Cresh', note: '"Cresh" — soft C sound' },
  { glyph: '𐤃', english: 'D', name: 'Dorn', note: '"Dorn" — like the English word' },
  { glyph: '𐤄', english: 'E', name: 'Esk', note: '"Esk" — short E sound' },
  { glyph: '𐤅', english: 'F', name: 'Forn', note: '"Forn" — F consonant' },
  { glyph: '𐤆', english: 'G', name: 'Grek', note: '"Grek" — hard G' },
  { glyph: '𐤇', english: 'H', name: 'Herf', note: '"Herf" — aspirated H' },
  { glyph: '𐤈', english: 'I', name: 'Isk', note: '"Isk" — short I / also currency' },
  { glyph: '𐤉', english: 'J', name: 'Jenth', note: '"Jenth" — J consonant' },
  { glyph: '𐤊', english: 'K', name: 'Krill', note: '"Krill" — hard K' },
  { glyph: '𐤋', english: 'L', name: 'Leth', note: '"Leth" — lateral L' },
  { glyph: '𐤌', english: 'M', name: 'Mern', note: '"Mern" — nasal M' },
  { glyph: '𐤍', english: 'N', name: 'Nern', note: '"Nern" — nasal N' },
  { glyph: '𐤎', english: 'O', name: 'Orn', note: '"Orn" — short O vowel' },
  { glyph: '𐤏', english: 'P', name: 'Peth', note: '"Peth" — bilabial P' },
  { glyph: '𐤐', english: 'Q', name: 'Qek', note: '"Qek" — rare in Basic text' },
  { glyph: '𐤑', english: 'R', name: 'Resh', note: '"Resh" — rhotic R' },
  { glyph: '𐤒', english: 'S', name: 'Senth', note: '"Senth" — sibilant S' },
  { glyph: '𐤓', english: 'T', name: 'Trill', note: '"Trill" — plosive T' },
  { glyph: '𐤔', english: 'U', name: 'Usk', note: '"Usk" — short U vowel' },
  { glyph: '𐤕', english: 'V', name: 'Vev', note: '"Vev" — labiodental V' },
  { glyph: '𐤖', english: 'W', name: 'Wesk', note: '"Wesk" — approximant W' },
  { glyph: '𐤗', english: 'X', name: 'Xesh', note: '"Xesh" — rare in Basic' },
  { glyph: '𐤘', english: 'Y', name: 'Yirt', note: '"Yirt" — palatal Y' },
  { glyph: '𐤙', english: 'Z', name: 'Zerek', note: '"Zerek" — sibilant Z' },
];

const DIPTHONGS = [
  { glyph: '◈', english: 'CH', name: 'Cherek', note: 'As in "ship", "cheese", "each"' },
  { glyph: '◉', english: 'EE', name: 'Eek', note: 'As in "see", "feet", "queen"' },
  { glyph: '◊', english: 'EO', name: 'Eoek', note: 'As in "people", "jeopardy"' },
  { glyph: '◌', english: 'KH', name: 'Kherev', note: 'Guttural KH as in "Huttese"' },
  { glyph: '◍', english: 'NG', name: 'Nen-Grek', note: 'As in "ring", "thing", "long"' },
  { glyph: '◎', english: 'OO', name: 'Onith', note: 'As in "moon", "boot", "food"' },
  { glyph: '◐', english: 'SH', name: 'Shen', note: 'As in "shield", "flash", "should"' },
  { glyph: '◑', english: 'TH', name: 'Thesh', note: 'As in "the", "this", "thought"' },
  { glyph: '◒', english: 'YA', name: 'Yaret', note: 'As in "yard", "yawn", "kayak"' },
  { glyph: '◓', english: 'BL', name: 'Blek', note: 'As in "blade", "blue", "black"' },
  { glyph: '◔', english: 'KR', name: 'Kret', note: 'As in "Krist", "Krell", cluster' },
  { glyph: '◕', english: 'ZH', name: 'Zerek-Herf', note: 'As in "azure", "measure"' },
];

export default function AlphabetPage() {
  return (
    <>
      <Starfield />
      <Nav />

      {/* Hero */}
      <header className="alpha-hero">
        <div className="alpha-hero__inner">
          <p className="hero__eyebrow">Complete Reference Guide</p>
          <h1 className="hero__title">Aurebesh <span>Alphabet Chart</span></h1>
          <p className="hero__sub">All 26 letters and 12 dipthongs — with Aurebesh names, English equivalents, and pronunciation notes.</p>
          <div className="alpha-hero__actions">
            <a href="/" className="alpha-hero__btn alpha-hero__btn--primary">↗ Open Translator</a>
            <button className="alpha-hero__btn" onClick={() => window.print()}>⎙ Print Chart</button>
          </div>
        </div>
      </header>

      <main className="alpha-main">

        {/* Legend */}
        <div className="alpha-legend">
          <div className="alpha-legend__item">
            <span className="alpha-legend__dot alpha-legend__dot--letter" />
            Single letter (26 total)
          </div>
          <div className="alpha-legend__item">
            <span className="alpha-legend__dot alpha-legend__dot--dipthong" />
            Dipthong — two-letter combo mapped to one glyph (12 total)
          </div>
          <div className="alpha-legend__item">
            <span className="alpha-legend__dot alpha-legend__dot--mirror" />
            Uppercase = horizontal mirror of lowercase
          </div>
        </div>

        {/* Letters A–Z */}
        <section className="alpha-section" id="letters">
          <div className="alpha-section__header">
            <h2 className="alpha-section__title">Letters <span className="alpha-count">26</span></h2>
            <p className="alpha-section__sub">Each English letter maps to a unique Aurebesh glyph. Capital letters are horizontal mirrors of their lowercase forms.</p>
          </div>
          <div className="glyph-grid">
            {LETTERS.map(l => (
              <div key={l.english} className="glyph-card">
                <div className="glyph-card__display">{l.glyph}</div>
                <div className="glyph-card__info">
                  <div className="glyph-card__english">{l.english}</div>
                  <div className="glyph-card__name">{l.name}</div>
                  <div className="glyph-card__note">{l.note}</div>
                </div>
                <div className="glyph-card__mirror">
                  <span className="glyph-card__mirror-label">Uppercase</span>
                  <span className="glyph-card__mirror-glyph" style={{transform:'scaleX(-1)',display:'inline-block'}}>{l.glyph}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dipthongs */}
        <section className="alpha-section" id="dipthongs">
          <div className="alpha-section__header">
            <h2 className="alpha-section__title">Dipthongs <span className="alpha-count alpha-count--dipthong">12</span></h2>
            <p className="alpha-section__sub">Two-letter combinations that map to a single Aurebesh glyph. These are matched <strong>before</strong> single letters — the most common mistake in other translators.</p>
          </div>
          <div className="glyph-grid glyph-grid--dipthong">
            {DIPTHONGS.map(d => (
              <div key={d.english} className="glyph-card glyph-card--dipthong">
                <div className="glyph-card__display">{d.glyph}</div>
                <div className="glyph-card__info">
                  <div className="glyph-card__english">{d.english}</div>
                  <div className="glyph-card__name">{d.name}</div>
                  <div className="glyph-card__note">{d.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Uppercase Note */}
        <section className="alpha-note-section">
          <div className="alpha-note">
            <span className="alpha-note__icon">⚠️</span>
            <div className="alpha-note__body">
              <strong>Uppercase Rule</strong>
              <p>In canonical Aurebesh, every capital letter is the <em>horizontal mirror</em> of its lowercase form. This is not a display bug — it is accurate to the Star Wars source material and appears consistently across all films, props, and official merchandise. Always verify case before using in tattoos or screen-accurate props.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="alpha-cta">
          <h2>Ready to Translate?</h2>
          <p>Use the translator to convert any English text to Aurebesh — dipthongs handled automatically.</p>
          <a href="/#translator" className="alpha-hero__btn alpha-hero__btn--primary">Open Translator →</a>
        </section>

        {/* SEO content */}
        <section className="alpha-section" style={{paddingTop: 0}}>
          <div className="alpha-section__header">
            <h2 className="alpha-section__title">About the Aurebesh Alphabet</h2>
          </div>
          <div className="glyph-grid" style={{display:'block'}}>
            <article style={{marginBottom:'1.5rem'}}>
              <h3 style={{marginBottom:'0.5rem'}}>What is Aurebesh?</h3>
              <p>Aurebesh is the writing system of the Star Wars galaxy, used throughout the Galactic Republic and Empire. It appears on ship displays, signage, helmets, and props in every Star Wars film and series. The name comes from its first two letters — Aurek (A) and Besh (B) — just as "alphabet" comes from Greek Alpha and Beta.</p>
            </article>
            <article style={{marginBottom:'1.5rem'}}>
              <h3 style={{marginBottom:'0.5rem'}}>How Dipthongs Work</h3>
              <p>Dipthongs are two-letter combinations that map to a single Aurebesh glyph. There are 12 canonical dipthongs: CH, EE, EO, KH, NG, OO, SH, TH, YA, BL, KR, and ZH. When translating, dipthongs are matched before single letters — so "the" becomes one TH glyph plus one E glyph, not T + H + E. This is the most common mistake in other Aurebesh translators.</p>
            </article>
            <article style={{marginBottom:'1.5rem'}}>
              <h3 style={{marginBottom:'0.5rem'}}>The Uppercase Mirror Rule</h3>
              <p>In canonical Aurebesh, every capital letter is the horizontal mirror of its lowercase form. This is intentional and film-accurate — verified across props, merchandise, and official Star Wars materials. It is not a font bug. Always check case before using Aurebesh in a tattoo or screen-accurate prop.</p>
            </article>
            <article>
              <h3 style={{marginBottom:'0.5rem'}}>Using This Chart</h3>
              <p>Each card shows the Aurebesh glyph, the English letter it represents, the official Aurebesh letter name, and a pronunciation note. Dipthong cards show the two-letter combination and the single glyph it maps to. Use the <a href="/#translator">Aurebesh Translator</a> to convert full words and sentences automatically.</p>
            </article>
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
            <a href="https://aidirs.best" target="_blank" rel="noopener">
              <img src="https://aidirs.best/dark.svg" alt="Featured on Aidirs" height="44" width="auto" />
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
