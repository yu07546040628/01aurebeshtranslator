import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Aurebesh in Star Wars: Where the Script Actually Appears',
  description: 'Aurebesh shows up across every era of Star Wars — and a lot of it is actually readable. Here\'s where to find it and what it says.',
  alternates: { canonical: 'https://www.freeaurebesh.com/blog/aurebesh-in-star-wars' },
}

export default function AurebeshInStarWarsPage() {
  return (
    <>
    <Nav />
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link href="/blog" className="text-sm hover:opacity-80" style={{ color: 'var(--text-3)' }}>← Blog</Link>
        </div>

        <header className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-3)' }}>Star Wars Lore</p>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--gold)' }}>
            Aurebesh in Star Wars: Where the Script Actually Appears
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Once you learn to read Aurebesh, rewatching Star Wars becomes a different experience. The script is everywhere — and a surprising amount of it contains actual readable text that most viewers walk right past.
          </p>
        </header>

        <div className="space-y-8 leading-relaxed" style={{ color: 'var(--text-2)' }}>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>The Original Trilogy (1977–1983)</h2>
            <p className="mb-3">Aurebesh first appeared on screen in <strong style={{ color: 'var(--text)' }}>Return of the Jedi</strong> (1983) on Death Star II control panels. At that point it was purely decorative — the script hadn't been fully standardized yet, so the glyphs don't decode to anything meaningful.</p>
            <p>The original trilogy props used a mix of made-up symbols and early Aurebesh. If you try to decode the displays in the original films, most of it is gibberish. That changed with the prequels.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>The Prequel Trilogy (1999–2005)</h2>
            <p className="mb-3">By the time the prequels were in production, Lucasfilm had adopted the full Aurebesh alphabet as the official in-universe script. Republic starship displays, Senate terminals, Jedi Temple signage, and Coruscant street signs all use proper Aurebesh — and most of it decodes to real English text.</p>
            <p>Fans have decoded Jedi Temple corridor signs that read things like "Jedi Archives" and "Training Room." The prop department was clearly having fun with it by this point.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>The Sequel Trilogy (2015–2019)</h2>
            <p className="mb-3">The sequel era is where Aurebesh gets really interesting for fans who can read it. Resistance base screens, First Order terminals, and background signage on planets like Jakku and Canto Bight all contain readable Aurebesh — some of it lore, some of it jokes hidden by the prop team.</p>
            <p><strong style={{ color: 'var(--text)' }}>The Last Jedi</strong> has a notable example: the Resistance evacuation countdown timer on D'Qar is written in Aurebesh and actually counts down correctly in real time. It's one of those details that rewards fans who took the time to learn the script.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>The Mandalorian & Disney+ Shows</h2>
            <p className="mb-3">The Disney+ era has more readable Aurebesh than any previous Star Wars content. <strong style={{ color: 'var(--text)' }}>Andor</strong> is the standout — the show's production design team put actual readable Aurebesh text on Imperial terminals, prison facility displays, and Ferrix street signs throughout the series. Some of it contains in-universe lore that doesn't appear anywhere else.</p>
            <p className="mb-3">In <strong style={{ color: 'var(--text)' }}>The Mandalorian</strong>, the Nevarro cantina signs, Imperial remnant terminals, and bounty puck displays all use accurate Aurebesh. Fans have decoded Easter eggs hidden in background signage across multiple episodes.</p>
            <p><strong style={{ color: 'var(--text)' }}>The Book of Boba Fett</strong> and <strong style={{ color: 'var(--text)' }}>Obi-Wan Kenobi</strong> continue the same approach — Aurebesh is treated as a real language by the prop departments, not just decoration.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>Clone Wars & Rebels</h2>
            <p className="mb-3">Both animated series use Aurebesh extensively. <strong style={{ color: 'var(--text)' }}>Star Wars Rebels</strong> is particularly notable — the show's creators hid readable Aurebesh messages throughout the series as rewards for fans who could decode them. Some of these messages foreshadow plot points or contain character-specific jokes.</p>
            <p>The Clone Wars uses Aurebesh on Republic gunship displays, mission briefing screens, and Coruscant signage. Most of it is readable and consistent with the established alphabet.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>How to Decode Aurebesh Yourself</h2>
            <p>The easiest way is to screenshot a frame, zoom in on the Aurebesh text, and use the <Link href="/" style={{ color: 'var(--gold)' }}>reverse translation feature</Link> on this site — paste in the Aurebesh characters and it converts back to English. The <Link href="/alphabet" style={{ color: 'var(--gold)' }}>Alphabet Chart</Link> is also useful for manual decoding if you want to learn the glyphs yourself.</p>
          </section>

          <div className="pt-4 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-lg font-bold transition-opacity hover:opacity-80"
              style={{ background: 'var(--gold)', color: '#000' }}
            >
              Decode Aurebesh →
            </Link>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
