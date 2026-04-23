import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'What Is Aurebesh? The Star Wars Alphabet Explained',
  description: 'Aurebesh is the writing system used throughout Star Wars — on ship displays, helmets, and props. Learn the Aurebesh alphabet, how dipthongs work, and how to read it yourself.',
  alternates: { canonical: 'https://www.freeaurebesh.com/blog/what-is-aurebesh' },
}

export default function WhatIsAurebeshPage() {
  return (
    <>
    <Nav />
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link href="/blog" className="text-sm hover:opacity-80" style={{ color: 'var(--text-3)' }}>← Blog</Link>
        </div>

        <header className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-3)' }}>Aurebesh Guide</p>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--gold)' }}>
            What Is Aurebesh? The Star Wars Alphabet Explained
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
            If you've ever paused a Star Wars scene to squint at the text on a ship display or stormtrooper helmet, you were looking at Aurebesh — the official writing system of the Star Wars galaxy. Here's what it is, where it came from, and how to read it.
          </p>
        </header>

        <div className="space-y-8 leading-relaxed" style={{ color: 'var(--text-2)' }}>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>What is Aurebesh?</h2>
            <p className="mb-3">Aurebesh is the standard alphabet of the Galactic Republic, the Empire, and the New Republic in Star Wars. It's not a separate language — it's a writing system for Galactic Basic, which is essentially English in the Star Wars universe. Every letter in the English alphabet has a direct Aurebesh equivalent.</p>
            <p className="mb-3">The name comes from the first two letters: <strong style={{ color: 'var(--text)' }}>Aurek</strong> (A) and <strong style={{ color: 'var(--text)' }}>Besh</strong> (B). Same logic as "alphabet" coming from Alpha and Beta in Greek.</p>
            <p>You'll find Aurebesh on X-wing cockpit displays, Death Star control panels, Mandalorian bounty pucks, Imperial terminals in Andor, and hundreds of other props across the entire Star Wars franchise.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>The Aurebesh Alphabet: 26 Letters + 12 Dipthongs</h2>
            <p className="mb-3">The Aurebesh alphabet has 26 letters, one for each letter in English. But it also has 12 <strong style={{ color: 'var(--text)' }}>dipthongs</strong> — two-letter combinations that map to a single Aurebesh glyph. This is where most Aurebesh translators get it wrong.</p>
            <p className="mb-3">The 12 Aurebesh dipthongs are:</p>
            <div className="p-4 rounded-lg font-mono text-sm mb-3" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
              CH · EE · EO · KH · NG · OO · SH · TH · YA · BL · KR · ZH
            </div>
            <p>When you write "the" in Aurebesh, it should be two glyphs: TH (one glyph) + E. Not three separate letters. Same with "cheese" — CH + EE + S + E, four glyphs total. If a translator ignores dipthongs, every word containing those letter pairs comes out wrong. That's a big deal if you're getting an Aurebesh tattoo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>Where Did Aurebesh Come From?</h2>
            <p className="mb-3">Aurebesh was designed by graphic artist <strong style={{ color: 'var(--text)' }}>Stephen Crane</strong> for the 1993 West End Games <em>Star Wars Roleplaying Game</em> sourcebook. Lucasfilm liked it enough to adopt it as the official in-universe script, and it's been used consistently ever since.</p>
            <p>The script first appeared on screen in <em>Return of the Jedi</em> (1983) on Death Star displays, though it wasn't fully standardized yet. By the prequel era, Lucasfilm's prop department was using the complete Aurebesh alphabet on everything — and in the Disney+ era, shows like Andor use fully readable Aurebesh text that fans can actually decode.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>How to Read and Write Aurebesh</h2>
            <p className="mb-3">Reading Aurebesh is a straight letter-for-letter substitution. Once you memorize the 26 glyphs (and the 12 dipthongs), you can read any Aurebesh text in Star Wars. Most fans learn it in a few hours.</p>
            <p className="mb-3">The fastest way to start is with our <Link href="/alphabet" style={{ color: 'var(--gold)' }}>Aurebesh Alphabet Chart</Link> — every glyph with its English equivalent and letter name. Or just use the <Link href="/" style={{ color: 'var(--gold)' }}>Aurebesh Translator</Link> to convert any text instantly.</p>
            <p>Common uses: Aurebesh tattoos, cosplay props, fan art, secret messages, Star Wars party decorations. The translator exports PNG and SVG so you can take the output straight to a tattoo artist or print shop.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>Aurebesh vs Other Star Wars Scripts</h2>
            <p className="mb-3">Aurebesh is the most common Star Wars writing system, but it's not the only one. The site also supports:</p>
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li><Link href="/sith" style={{ color: 'var(--gold)' }}>Sith Alphabet (Ur-Kittât)</Link> — the ancient dark side script, angular and aggressive-looking</li>
              <li><Link href="/huttese" style={{ color: 'var(--gold)' }}>Huttese</Link> — Jabba's spoken language, with 200+ vocabulary words</li>
              <li><Link href="/binary" style={{ color: 'var(--gold)' }}>Droidspeak</Link> — R2-D2's beep language encoded as Morse/binary</li>
              <li><Link href="/deathtrooper" style={{ color: 'var(--gold)' }}>Death Trooper Cipher</Link> — the Imperial encryption from Rogue One</li>
            </ul>
          </section>

          <div className="pt-4 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-lg font-bold transition-opacity hover:opacity-80"
              style={{ background: 'var(--gold)', color: '#000' }}
            >
              Try the Aurebesh Translator →
            </Link>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
