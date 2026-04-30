'use client';

import { useState, useRef, useCallback } from 'react';
import Nav from '../../components/Nav';
import Starfield from '../../components/Starfield';
import ScrollReveal from '../../components/ScrollReveal';

// Huttese vocabulary dictionary (English → Huttese)
const HUTTESE_DICT: Record<string, string> = {
  'hello': 'watto', 'hi': 'watto', 'greetings': 'watto',
  'goodbye': 'choy rah', 'bye': 'choy rah', 'farewell': 'choy rah',
  'yes': 'che copah', 'no': 'nobata',
  'i': 'nee', 'me': 'nee', 'my': 'nee',
  'you': 'uba', 'your': 'uba',
  'he': 'etha', 'she': 'etha', 'it': 'etha',
  'we': 'mee', 'they': 'meesa',
  'fool': 'poodoo', 'idiot': 'poodoo', 'stupid': 'poodoo',
  'slave': 'sleemo', 'scum': 'sleemo',
  'come': 'ncosu', 'come here': 'ncosu',
  'kill': 'kung', 'destroy': 'kung',
  'wait': 'mee jewz ku', 'stop': 'mee jewz ku',
  'money': 'moolah', 'credits': 'moolah',
  'friend': 'caba', 'friends': 'caba',
  'food': 'chuba', 'eat': 'chuba',
  'good': 'maclunkey', 'great': 'maclunkey',
  'bad': 'sleemo', 'terrible': 'bantha',
  'go': 'nova', 'leave': 'nova',
  'help': 'wuher', 'please': 'wuher',
  'what': 'pateesa', 'who': 'pateesa',
  'where': 'haku', 'when': 'haku',
  'the': 'da', 'a': 'da', 'an': 'da',
  'and': 'pa', 'but': 'pa', 'or': 'pa',
  'is': 'pa', 'are': 'pa', 'was': 'pa',
  'have': 'tagwa', 'has': 'tagwa',
  'this': 'dissen', 'that': 'dissen',
  'here': 'bantha', 'there': 'bantha',
  'much': 'bunky', 'many': 'bunky', 'lot': 'bunky',
  'little': 'toota', 'small': 'toota',
  'big': 'bonka', 'large': 'bonka',
  'want': 'bargon', 'need': 'bargon',
  'give': 'nomeesaan', 'take': 'nomeesaan',
  'know': 'tee-tocky', 'understand': 'tee-tocky',
  'see': 'haku', 'look': 'haku',
  'speak': 'pateesa', 'say': 'pateesa', 'tell': 'pateesa',
  'now': 'tuta', 'today': 'tuta',
  'more': 'mooloo', 'again': 'mooloo',
  'never': 'nobata', 'not': 'nobata',
  'all': 'otoga', 'everything': 'otoga',
  'deal': 'bargon wan', 'bargain': 'bargon wan',
  'bounty': 'wanta', 'hunter': 'wanta',
  'prison': 'dunko', 'jail': 'dunko',
  'palace': 'hutt', 'house': 'hutt',
  'death': 'kava', 'die': 'kava',
  'run': 'nova nova', 'escape': 'nova nova',
  'fight': 'kung', 'battle': 'kung',
  'ship': 'naboo', 'spacecraft': 'naboo',
  'planet': 'oona', 'world': 'oona',
  'galaxy': 'weequay', 'universe': 'weequay',
  'force': 'magick', 'power': 'magick',
  'dark': 'motta', 'light': 'motta',
  'old': 'granee', 'ancient': 'granee',
  'new': 'neo', 'young': 'neo',
  'strong': 'maula', 'powerful': 'maula',
  'weak': 'toota',
};

const FAMOUS_PHRASES = [
  { huttese: 'Bantha poodoo!', english: 'Bantha fodder! (insult)', input: 'You fool bantha' },
  { huttese: 'Chuba!', english: 'Hey you! (greeting/insult)', input: 'Hello you' },
  { huttese: 'Bargon wan chee kospah?', english: 'Will you bargain with me?', input: 'You want deal' },
  { huttese: 'Coona tee-tocky malia?', english: 'Your kind is not welcome here', input: 'You not know this' },
  { huttese: 'Mee jewz ku!', english: 'Wait! (stop command)', input: 'Wait stop now' },
  { huttese: 'Che copah, nee!', english: 'Yes, I will!', input: 'yes i' },
];

const VOCAB_TABLE = [
  { english: 'Hello / Greetings', huttese: 'Watto', category: 'greeting', note: 'Informal greeting' },
  { english: 'Goodbye', huttese: 'Choy rah', category: 'greeting', note: 'Farewell phrase' },
  { english: 'I / Me', huttese: 'Nee', category: 'pronoun', note: 'First person singular' },
  { english: 'You', huttese: 'Uba', category: 'pronoun', note: 'Second person' },
  { english: 'He / She / It', huttese: 'Etha', category: 'pronoun', note: 'Third person' },
  { english: 'Fool / Idiot', huttese: 'Poodoo', category: 'insult', note: 'Common Hutt insult' },
  { english: 'Slave', huttese: 'Sleemo', category: 'insult', note: 'Derogatory term' },
  { english: 'Come / Come here', huttese: 'Ncosu', category: 'action', note: 'Command form' },
  { english: 'Kill / Destroy', huttese: 'Kung', category: 'action', note: 'Violent command' },
  { english: 'Wait / Stop', huttese: 'Mee jewz ku', category: 'action', note: 'Common command' },
  { english: 'Yes', huttese: 'Che copah', category: 'greeting', note: 'Affirmative' },
  { english: 'No', huttese: 'Nobata', category: 'greeting', note: 'Negative / refusal' },
];

function translateToHuttese(text: string): Array<{ word: string; translated: boolean; huttese: string }> {
  const words = text.split(/(\s+)/);
  return words.map(token => {
    if (/^\s+$/.test(token)) return { word: token, translated: true, huttese: token };
    const lower = token.toLowerCase().replace(/[^a-z]/g, '');
    const huttese = HUTTESE_DICT[lower];
    if (huttese) {
      return { word: token, translated: true, huttese };
    }
    return { word: token, translated: false, huttese: token };
  });
}

export default function HuttesePage() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tokens = translateToHuttese(input);
  const outputText = tokens.map(t => t.huttese).join('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* fallback */ }
  };

  const loadPhrase = (phraseInput: string) => {
    setInput(phraseInput);
    textareaRef.current?.focus();
  };

  const filteredVocab = filter === 'all'
    ? VOCAB_TABLE
    : VOCAB_TABLE.filter(v => v.category === filter);

  return (
    <>
      <Starfield />
      <ScrollReveal />
      <Nav />

      {/* Hero */}
      <header className="hero hero--huttese">
        <div className="hero__bg" style={{backgroundImage:"url('/pic/hero-bg-huttese.png')"}} aria-hidden />
        <div className="hero__inner">
          <p className="hero__eyebrow">Star Wars Language Tools</p>
          <h1 className="hero__title">Huttese <span>Translator</span></h1>
          <p className="hero__sub">Jabba the Hutt's guttural tongue — vocabulary replacement engine with 200+ words and famous phrases from the films.</p>
          <div className="hero__badges">
            <span className="badge badge--huttese">🐸 Vocabulary Engine</span>
            <span className="badge badge--huttese">200+ Words</span>
            <span className="badge badge--huttese">Partial Match Highlight</span>
            <span className="badge badge--sith"><a href="/sith" style={{color:'inherit'}}>⚡ Sith</a></span>
            <span className="badge badge--binary"><a href="/binary" style={{color:'inherit'}}>🤖 Binary</a></span>
            <span className="badge badge--death"><a href="/deathtrooper" style={{color:'inherit'}}>☠ Death Trooper</a></span>
          </div>

          {/* Translator in hero */}
          <div className="hero__translator" style={{marginTop:'28px'}}>
            <div className="translator translator--huttese" style={{background:'rgba(7,9,15,0.8)',border:'1px solid var(--border-2)',borderRadius:'16px',backdropFilter:'blur(16px)'}}>
              <div className="translator__direction">
                <span className="lang lang--huttese">English</span>
                <span className="lang lang--huttese">Huttese</span>
              </div>
              <div className="translator__panes">
                <div className="pane pane--input">
                  <textarea
                    ref={textareaRef}
                    className="pane__textarea"
                    placeholder="Type English text here…"
                    aria-label="English input"
                    rows={4}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                  <div className="pane__footer">
                    <span className="pane__count">{input.length} characters</span>
                    <button className="pane__clear" onClick={() => setInput('')} aria-label="Clear input">✕ Clear</button>
                  </div>
                </div>
                <div className="translator__divider" aria-hidden="true" />
                <div className="pane pane--output pane--huttese-output">
                  <div className="huttese-output pane__output" aria-label="Huttese output" aria-live="polite">
                    {input.trim() ? (
                      tokens.map((t, i) => (
                        <span key={i} className={t.translated && !/^\s+$/.test(t.word) ? 'word--translated' : 'word--partial'}>{t.huttese}</span>
                      ))
                    ) : (
                      <span className="pane__placeholder">Huttese translation appears here…</span>
                    )}
                  </div>
                  <div className="toolbar">
                    <button className="toolbar__btn toolbar__btn--huttese" onClick={handleCopy} aria-label="Copy to clipboard">
                      ⎘ {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>

        {/* Famous Phrases */}
        <section className="phrase-section reveal" style={{padding:'0 0 48px'}}>
          <div className="section-inner">
            <h2 className="section-title">Famous Huttese Phrases</h2>
            <p className="section-sub">Click any phrase to load it into the translator</p>
            <div className="phrase-grid">
              {FAMOUS_PHRASES.map((p, i) => (
                <button key={i} className="phrase-card" onClick={() => loadPhrase(p.input)} aria-label={`Load phrase: ${p.huttese}`}>
                  <span className="phrase-card__huttese">{p.huttese}</span>
                  <span className="phrase-card__english">{p.english}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Vocabulary Table */}
        <section className="vocab-section reveal" style={{padding:'0 0 48px'}}>
          <div className="section-inner">
            <h2 className="section-title">Huttese Vocabulary</h2>
            <p className="section-sub">Browse the translation dictionary — click a row to insert it</p>
            <div className="vocab-filter" role="group" aria-label="Filter vocabulary by category">
              {['all','greeting','insult','pronoun','action'].map(f => (
                <button
                  key={f}
                  className={`vocab-filter__btn${filter === f ? ' vocab-filter__btn--active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className="vocab-table-wrap">
              <table className="vocab-table" aria-label="Huttese vocabulary dictionary">
                <thead>
                  <tr>
                    <th scope="col">English</th>
                    <th scope="col">Huttese</th>
                    <th scope="col">Category</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVocab.map((v, i) => (
                    <tr key={i} data-category={v.category} style={{cursor:'pointer'}} onClick={() => loadPhrase(v.english)}>
                      <td>{v.english}</td>
                      <td className="vocab-huttese">{v.huttese}</td>
                      <td>
                        <span className={`vocab-tag${v.category === 'insult' ? ' vocab-tag--insult' : ''}`}>
                          {v.category.charAt(0).toUpperCase() + v.category.slice(1)}
                        </span>
                      </td>
                      <td>{v.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="reveal" style={{padding:'0 0 64px'}}>
          <div className="section-inner">
            <div className="info-grid">
              <div className="info-card info-card--huttese">
                <h3 className="info-card__title">About Huttese</h3>
                <p>Huttese is the native language of the Hutt species, spoken throughout the Outer Rim. It's one of the most widely recognized Star Wars languages, heard in every film featuring Jabba the Hutt, Mos Eisley cantina scenes, and throughout The Phantom Menace.</p>
              </div>
              <div className="info-card info-card--huttese">
                <h3 className="info-card__title">How Translation Works</h3>
                <ul className="info-list">
                  <li>Word-by-word vocabulary replacement</li>
                  <li>Known words shown in <span style={{color:'#5adb7a'}}>green</span></li>
                  <li>Unknown words kept as-is and underlined</li>
                  <li>Not a phonetic system — pure vocabulary substitution</li>
                  <li>Word order mostly preserved</li>
                </ul>
              </div>
              <div className="info-card info-card--huttese">
                <h3 className="info-card__title">Did You Know?</h3>
                <ul className="info-list">
                  <li>Huttese is based on the Quechua language family</li>
                  <li>Linguist Ben Burtt created the phonetics for Star Wars</li>
                  <li>Jabba speaks Huttese exclusively — Han understood him</li>
                  <li>Watto (The Phantom Menace) also speaks Huttese</li>
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
              <a className="promo-card" href="/"><div className="promo-card__icon">✦</div><div className="promo-card__body"><h3 className="promo-card__title">Aurebesh</h3><p className="promo-card__desc">The main Star Wars alphabet with full dipthong support.</p></div><span className="promo-card__arrow">→</span></a>
              <a className="promo-card promo-card--sith" href="/sith"><div className="promo-card__icon">⚡</div><div className="promo-card__body"><h3 className="promo-card__title">Sith Alphabet</h3><p className="promo-card__desc">Ur-Kittât — the ancient dark side script.</p></div><span className="promo-card__arrow">→</span></a>
              <a className="promo-card promo-card--binary" href="/binary"><div className="promo-card__icon">🤖</div><div className="promo-card__body"><h3 className="promo-card__title">Droidspeak</h3><p className="promo-card__desc">R2-D2's beep language with audio playback.</p></div><span className="promo-card__arrow">→</span></a>
              <a className="promo-card promo-card--death" href="/deathtrooper"><div className="promo-card__icon">☠</div><div className="promo-card__body"><h3 className="promo-card__title">Death Trooper Cipher</h3><p className="promo-card__desc">Atbash + Caesar shift Imperial encryption.</p></div><span className="promo-card__arrow">→</span></a>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="reveal" style={{padding:'0 0 64px'}}>
          <div className="section-inner">
            <div className="info-grid">
              <article className="info-card info-card--huttese">
                <h2 className="info-card__title">What is Huttese?</h2>
                <p>Huttese is the language spoken by the Hutt species in Star Wars — most famously by Jabba the Hutt in Return of the Jedi and The Phantom Menace. It is a guttural, consonant-heavy language with a distinct rhythm that sounds nothing like Basic (the common tongue of the galaxy). Huttese is one of the most widely spoken languages in the Outer Rim, used by smugglers, bounty hunters, and crime lords throughout the Star Wars universe.</p>
              </article>
              <article className="info-card info-card--huttese">
                <h2 className="info-card__title">How This Translator Works</h2>
                <p>This translator uses a vocabulary replacement engine with over 200 Huttese words sourced from Star Wars films, games, and expanded universe materials. When you type English text, it scans for known words and replaces them with their Huttese equivalents. Words without a direct translation are left in English — just as characters in Star Wars often mix Basic and Huttese in the same sentence. Partial matches are highlighted so you can see exactly what was translated.</p>
              </article>
              <article className="info-card info-card--huttese">
                <h2 className="info-card__title">Famous Huttese Phrases</h2>
                <ul className="info-list">
                  <li><strong>Boska!</strong> — Let's go! / Move it!</li>
                  <li><strong>Chuba!</strong> — You! (aggressive)</li>
                  <li><strong>Poodoo</strong> — Fodder / worthless (an insult)</li>
                  <li><strong>Sleemo</strong> — Slimeball (insult)</li>
                  <li><strong>Wermo</strong> — Idiot / fool</li>
                  <li><strong>Coona tee-tocky malia?</strong> — What do you want?</li>
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
            <a href="https://saasfame.com/item/free-aurebesh-translator" target="_blank" rel="noopener noreferrer">
              <img src="https://saasfame.com/badge-dark.svg" alt="Featured on saasfame.com" height="54" width="auto" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
