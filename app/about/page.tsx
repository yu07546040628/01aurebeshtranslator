import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Aurebesh Translator – Star Wars Language Tools',
  description: 'Learn about the free Aurebesh Translator — how it works, which Star Wars languages it supports, and why dipthong accuracy matters for tattoos and props.',
  alternates: {
    canonical: 'https://www.freeaurebesh.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">

        <header className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-3)' }}>
            Star Wars Language Tools
          </p>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--gold)' }}>
            About This Project
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
            A free, fan-made toolkit for translating English into the writing systems of the Star Wars galaxy — built for accuracy, not just aesthetics.
          </p>
        </header>

        <div className="space-y-8">

          <section className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>What is Aurebesh?</h2>
            <p className="leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
              Aurebesh is the standard writing system of the Galactic Republic and Empire in Star Wars. It shows up on ship displays, signage, helmets, and props throughout all nine Skywalker Saga films, The Mandalorian, Andor, and dozens of other productions.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
              The name comes from its first two letters: <strong style={{ color: 'var(--text)' }}>Aurek</strong> (A) and <strong style={{ color: 'var(--text)' }}>Besh</strong> (B) — the same way "alphabet" comes from Greek Alpha and Beta. Each of the 26 letters maps directly to an English letter, plus 12 two-letter combinations called dipthongs that map to a single glyph.
            </p>
          </section>

          <section className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>Why Dipthong Accuracy Matters</h2>
            <p className="leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
              Most Aurebesh translators online get dipthongs wrong. A dipthong is a two-letter combo — like CH, SH, TH, OO, EE — that maps to a <em>single</em> Aurebesh glyph, not two separate ones. If a translator ignores dipthongs, words like <em>the</em>, <em>cheese</em>, <em>shield</em>, and <em>night</em> all come out wrong.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
              This translator handles all 12 canonical dipthongs correctly: <strong style={{ color: 'var(--text)' }}>CH, EE, EO, KH, NG, OO, SH, TH, YA, BL, KR, ZH</strong>. Dipthongs are matched before single letters, which is the only way to get accurate output — especially important for tattoos and screen-accurate props.
            </p>
          </section>

          <section className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>Supported Languages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Aurebesh', href: '/', desc: 'The main Star Wars script. Full dipthong support, PNG/SVG export, reverse translation.', color: 'var(--gold)' },
                { name: 'Sith Alphabet (Ur-Kittât)', href: '/sith', desc: 'The ancient dark side script. 26 angular glyphs rendered from cuneiform Unicode.', color: 'var(--sith, #c0392b)' },
                { name: 'Huttese', href: '/huttese', desc: "Jabba's guttural tongue. Vocabulary replacement engine with 200+ words and partial-match highlighting.", color: 'var(--huttese, #27ae60)' },
                { name: 'Droidspeak', href: '/binary', desc: "R2-D2's Morse-style beep language. Optional audio playback included.", color: 'var(--binary, #2980b9)' },
                { name: 'Death Trooper Cipher', href: '/deathtrooper', desc: 'Imperial Atbash + Caesar shift encryption from Rogue One, rendered as Aurebesh glyphs.', color: '#888' },
              ].map(lang => (
                <Link key={lang.name} href={lang.href} className="p-4 rounded-lg border block hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--border)' }}>
                  <div className="font-bold mb-1" style={{ color: lang.color }}>{lang.name}</div>
                  <div className="text-sm" style={{ color: 'var(--text-3)' }}>{lang.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>How It Works</h2>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-2)' }}>
              <li>• <strong style={{ color: 'var(--text)' }}>Next.js 15</strong> — App Router, server-rendered pages for fast load and full SEO indexing</li>
              <li>• <strong style={{ color: 'var(--text)' }}>Aurebesh engine</strong> — dipthong-first tokeniser scans for two-letter combos before single letters</li>
              <li>• <strong style={{ color: 'var(--text)' }}>Glyph rendering</strong> — Phoenician Unicode block used as a visual stand-in (no font licensing issues)</li>
              <li>• <strong style={{ color: 'var(--text)' }}>PNG export</strong> — html2canvas loaded on demand to avoid SSR conflicts</li>
              <li>• <strong style={{ color: 'var(--text)' }}>SVG export</strong> — pure JavaScript SVG generator, no dependencies</li>
              <li>• <strong style={{ color: 'var(--text)' }}>Share links</strong> — translation state encoded in URL query params</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>Common Uses</h2>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-2)' }}>
              <li>• <strong style={{ color: 'var(--text)' }}>Tattoos</strong> — one of the most searched Star Wars tattoo styles; dipthong accuracy is critical</li>
              <li>• <strong style={{ color: 'var(--text)' }}>Cosplay props</strong> — screen-accurate helmets, datapads, and signage</li>
              <li>• <strong style={{ color: 'var(--text)' }}>Fan art</strong> — add authentic script to Star Wars-themed artwork</li>
              <li>• <strong style={{ color: 'var(--text)' }}>Secret messages</strong> — encode text for other fans to decipher</li>
              <li>• <strong style={{ color: 'var(--text)' }}>Party decorations</strong> — themed banners, invitations, and signage</li>
            </ul>
          </section>

          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-lg font-bold transition-all"
              style={{ background: 'var(--gold)', color: '#000' }}
            >
              Start Translating →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
