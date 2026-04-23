import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Contact – Aurebesh Translator',
  description: 'Get in touch with the Aurebesh Translator team. Questions, bug reports, or just want to share your Star Wars tattoo.',
  alternates: { canonical: 'https://www.freeaurebesh.com/contact' },
}

export default function ContactPage() {
  return (
    <>
    <Nav />
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto">
        <header className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-3)' }}>
            Get In Touch
          </p>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--gold)' }}>Contact</h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Questions, bug reports, feature suggestions, or just want to share your Aurebesh tattoo? We'd love to hear from you.
          </p>
        </header>

        <div className="space-y-6">
          <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>Email</h2>
            <p className="text-sm mb-3" style={{ color: 'var(--text-2)' }}>
              The best way to reach us. We typically respond within 48 hours.
            </p>
            <a
              href="mailto:yu07546040628@gmail.com"
              className="inline-block px-6 py-3 rounded-lg font-bold transition-opacity hover:opacity-80"
              style={{ background: 'var(--gold)', color: '#000' }}
            >
              yu07546040628@gmail.com
            </a>
          </div>

          <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>Common Questions</h2>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-2)' }}>
              <li><strong style={{ color: 'var(--text)' }}>Found a translation bug?</strong> — Include the input text and which language you were using.</li>
              <li><strong style={{ color: 'var(--text)' }}>Want a new feature?</strong> — Describe what you'd like and why it would be useful.</li>
              <li><strong style={{ color: 'var(--text)' }}>Sharing your tattoo or cosplay?</strong> — We love seeing the translator in the wild!</li>
              <li><strong style={{ color: 'var(--text)' }}>Advertising or partnership?</strong> — Reach out with details about your proposal.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
