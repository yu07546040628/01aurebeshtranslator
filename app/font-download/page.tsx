import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Download Aurebesh Font – Free Star Wars Font',
  description: 'Download the Aurebesh font for free (personal use). Step-by-step guide to install the Star Wars galaxy script font on Windows and Mac.',
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

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-3)' }}>
              Star Wars Language Tools
            </p>
            <h1 className="text-4xl font-black mb-4" style={{ color: 'var(--gold)' }}>
              Download Aurebesh Font
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-2)' }}>
              Install the Aurebesh font on your device to use Star Wars galaxy script in any app.
            </p>
          </div>

          {/* License notice */}
          <div className="mb-8 p-4 rounded-xl border flex gap-3" style={{ background: 'var(--warn-bg)', borderColor: 'var(--warn-border)' }}>
            <span style={{ color: 'var(--warn)', fontSize: '18px' }}>⚠</span>
            <p className="text-sm" style={{ color: 'var(--warn)' }}>
              <strong>Free for personal use only.</strong> Commercial use requires a separate license from the font author.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">

            {/* Step 1 */}
            <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'var(--gold)' }}>1</span>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Go to dafont.com</h2>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>
                Visit the Aurebesh font page on dafont.com — the most popular free font repository.
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

            {/* Step 2 */}
            <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'var(--gold)' }}>2</span>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Click Download</h2>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>
                Click the orange <strong>Download</strong> button on the right side of the page.
              </p>
              <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-2)' }}>
                <Image
                  src="/click-download.png"
                  alt="Click the Download button on dafont.com"
                  width={640}
                  height={360}
                  className="w-full"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'var(--gold)' }}>3</span>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Install the Font</h2>
              </div>
              <div className="space-y-3 text-sm" style={{ color: 'var(--text-2)' }}>
                <div className="flex gap-2">
                  <span style={{ color: 'var(--gold)' }}>🪟</span>
                  <span><strong style={{ color: 'var(--text)' }}>Windows:</strong> Unzip the file → right-click the .ttf file → <em>Install</em></span>
                </div>
                <div className="flex gap-2">
                  <span style={{ color: 'var(--gold)' }}>🍎</span>
                  <span><strong style={{ color: 'var(--text)' }}>Mac:</strong> Unzip the file → double-click the .ttf file → <em>Install Font</em></span>
                </div>
              </div>
            </div>

          </div>

          {/* CTA back */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--gold)' }}
            >
              ← Back to Translator
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
