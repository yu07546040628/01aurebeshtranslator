import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'How to Write Your Name in Aurebesh — Star Wars Script Guide',
  description: 'Want to write your name in Aurebesh? This guide covers the exact steps, how dipthongs affect your name, and what to check before getting an Aurebesh tattoo.',
  alternates: { canonical: 'https://www.freeaurebesh.com/blog/write-your-name-in-aurebesh' },
}

export default function WriteYourNamePage() {
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
            How to Write Your Name in Aurebesh
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Writing your name in Aurebesh takes about 30 seconds with the right tool — but if you're planning a tattoo or a prop, there's one thing most people miss that will make your translation wrong.
          </p>
        </header>

        <div className="space-y-8 leading-relaxed" style={{ color: 'var(--text-2)' }}>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>The Quick Way: Use the Translator</h2>
            <p className="mb-3">Type your name into the <Link href="/" style={{ color: 'var(--gold)' }}>Aurebesh Translator</Link> and it converts instantly. The translator handles dipthongs automatically, so you get accurate output without needing to know the alphabet.</p>
            <p>Once you have the result, you can download it as a PNG (for sharing) or SVG (for printing or tattoos — SVG scales to any size without losing quality).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>The Thing Most People Get Wrong: Dipthongs</h2>
            <p className="mb-3">Aurebesh has 12 two-letter combinations called dipthongs that each map to a <em>single glyph</em>. If your name contains any of these, they should be one character in Aurebesh — not two:</p>
            <div className="p-4 rounded-lg font-mono text-sm mb-3" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
              CH · EE · EO · KH · NG · OO · SH · TH · YA · BL · KR · ZH
            </div>
            <p className="mb-3">Some examples of how this affects real names:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li><strong style={{ color: 'var(--text)' }}>Ethan</strong> → E + TH + A + N (4 glyphs, not 5)</li>
              <li><strong style={{ color: 'var(--text)' }}>Chelsea</strong> → CH + E + L + S + E + A (6 glyphs, not 7)</li>
              <li><strong style={{ color: 'var(--text)' }}>Shawn</strong> → SH + A + W + N (4 glyphs, not 5)</li>
              <li><strong style={{ color: 'var(--text)' }}>Ngozi</strong> → NG + O + Z + I (4 glyphs, not 5)</li>
            </ul>
            <p className="mt-3">Most Aurebesh translators online skip this step entirely. That's why you'll see Aurebesh tattoos in the wild that are technically wrong — the person used a translator that treated every letter separately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>Tattoo Checklist</h2>
            <p className="mb-3">If you're getting an Aurebesh tattoo, run through this before you commit:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Use a translator that handles dipthongs (this one does)</li>
              <li>Download as SVG — cleaner lines at any size, no pixelation</li>
              <li>Bring the <Link href="/alphabet" style={{ color: 'var(--gold)' }}>Aurebesh Alphabet Chart</Link> to your tattoo artist so they can verify each glyph</li>
              <li>Double-check the glyph count matches what you expect given your name's dipthongs</li>
              <li>Consider adding the English spelling underneath — Aurebesh is readable to other fans, but not everyone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>Writing Other Things in Aurebesh</h2>
            <p className="mb-3">Names are the most popular use, but people also translate:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Star Wars quotes ("May the Force be with you" is a popular tattoo)</li>
              <li>Dates (birthdays, anniversaries) for subtle Star Wars-themed tattoos</li>
              <li>Cosplay prop labels — helmet displays, datapad screens, signage</li>
              <li>Custom Star Wars party invitations and decorations</li>
            </ul>
            <p className="mt-3">The translator works for any English text, not just names. Just type it in and download.</p>
          </section>

          <div className="pt-4 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-lg font-bold transition-opacity hover:opacity-80"
              style={{ background: 'var(--gold)', color: '#000' }}
            >
              Translate Your Name Now →
            </Link>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
