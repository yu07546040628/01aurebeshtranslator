import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Download Aurebesh Font – Free Star Wars Font for Windows & Mac',
  description: 'Download the free Aurebesh font for personal use. Step-by-step install guide for Windows and Mac. Use the Star Wars galaxy script in Word, Photoshop, Canva, and more.',
  alternates: {
    canonical: 'https://www.freeaurebesh.com/font-download',
  },
}

export default function FontDownloadPage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen pt-24 pb-16 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto">

          <header className="mb-10 text-center">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-3)' }}>
              Star Wars Language Tools
            </p>
            <h1 className="text-4xl font-black mb-4" style={{ color: 'var(--gold)' }}>
              Download Aurebesh Font
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-2)' }}>
              Install the Aurebesh font on your device and type Star Wars script directly in any app — Word, Photoshop, Canva, Illustrator, or your phone keyboard.
            </p>
          </header>

          {/* License notice */}
          <div className="mb-8 p-4 rounded-xl border flex gap-3" style={{ background: 'var(--warn-bg)', borderColor: 'var(--warn-border)' }}>
            <span style={{ color: 'var(--warn)', fontSize: '18px' }}>⚠</span>
            <p className="text-sm" style={{ color: 'var(--warn)' }}>
              <strong>Free for personal use only.</strong> Commercial use — print runs, merchandise, client work — requires a separate license from the font author.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6 mb-12">

            <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'var(--gold)' }}>1</span>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Go to dafont.com</h2>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>
                Head to the Aurebesh font page on dafont.com — the largest free font repository on the web. The font has been downloaded millions of times and is safe to use.
              </p>
              <a
                href="https://www.dafont.com/aurebesh.font"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--gold-dim)' }}
              >
                Open dafont.com →
              </a>
            </div>

            <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'var(--gold)' }}>2</span>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Click Download</h2>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>
                Click the orange <strong>Download</strong> button on the right side of the page. You'll get a .zip file containing the .ttf font file.
              </p>
              <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-2)' }}>
                <Image
                  src="/click-download.png"
                  alt="Screenshot showing the Download button on dafont.com for the Aurebesh font"
                  width={640}
                  height={360}
                  className="w-full"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'var(--gold)' }}>3</span>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Install the Font</h2>
              </div>
              <div className="space-y-4 text-sm" style={{ color: 'var(--text-2)' }}>
                <div className="p-4 rounded-lg" style={{ background: 'var(--bg)' }}>
                  <div className="flex gap-2 mb-2">
                    <span>🪟</span>
                    <strong style={{ color: 'var(--text)' }}>Windows</strong>
                  </div>
                  <ol className="space-y-1 pl-4 list-decimal">
                    <li>Unzip the downloaded file</li>
                    <li>Right-click the <code>.ttf</code> file</li>
                    <li>Select <em>Install</em> or <em>Install for all users</em></li>
                    <li>Restart any open apps to see the font</li>
                  </ol>
                </div>
                <div className="p-4 rounded-lg" style={{ background: 'var(--bg)' }}>
                  <div className="flex gap-2 mb-2">
                    <span>🍎</span>
                    <strong style={{ color: 'var(--text)' }}>Mac</strong>
                  </div>
                  <ol className="space-y-1 pl-4 list-decimal">
                    <li>Unzip the downloaded file</li>
                    <li>Double-click the <code>.ttf</code> file</li>
                    <li>Click <em>Install Font</em> in Font Book</li>
                    <li>Restart any open apps to see the font</li>
                  </ol>
                </div>
              </div>
            </div>

          </div>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I use the Aurebesh font for a tattoo?',
                  a: "Yes — but use our online translator first to verify your text, especially for words with dipthongs like TH, SH, CH, or OO. A wrong glyph is permanent. Check the Alphabet Chart before you commit.",
                },
                {
                  q: 'Does the font handle dipthongs automatically?',
                  a: "No. A font just maps individual keystrokes to glyphs — it has no awareness of dipthongs. That's why this translator exists. Use it to get the correct glyph sequence, then copy the output.",
                },
                {
                  q: 'What apps work with the Aurebesh font?',
                  a: "Any app that lets you choose a font: Microsoft Word, Google Docs, Photoshop, Illustrator, Canva, Figma, Procreate, and most design tools. Once installed, just select 'Aurebesh' from the font list.",
                },
                {
                  q: 'Is the font free for commercial use?',
                  a: "The font is free for personal use. Commercial use — merchandise, client projects, print runs — requires a license from the original author. Check the readme file included in the download for details.",
                },
              ].map(item => (
                <details key={item.q} className="p-5 rounded-xl border group" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
                  <summary className="font-semibold cursor-pointer" style={{ color: 'var(--text)' }}>{item.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related links */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Link href="/" className="p-4 rounded-xl border hover:opacity-80 transition-opacity" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
                <div className="font-bold mb-1" style={{ color: 'var(--gold)' }}>Aurebesh Translator</div>
                <div style={{ color: 'var(--text-3)' }}>Convert English to Aurebesh script online — no font needed.</div>
              </Link>
              <Link href="/alphabet" className="p-4 rounded-xl border hover:opacity-80 transition-opacity" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
                <div className="font-bold mb-1" style={{ color: 'var(--gold)' }}>Alphabet Chart</div>
                <div style={{ color: 'var(--text-3)' }}>All 26 letters and 12 dipthongs with names and pronunciation notes.</div>
              </Link>
            </div>
          </section>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
              ← Back to Translator
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
