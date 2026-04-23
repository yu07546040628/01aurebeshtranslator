import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Privacy Policy – Aurebesh Translator',
  description: 'Privacy policy for freeaurebesh.com — how we handle data, cookies, and advertising.',
  alternates: { canonical: 'https://www.freeaurebesh.com/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <>
    <Nav />
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--gold)' }}>Privacy Policy</h1>
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>Last updated: April 2025</p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Overview</h2>
            <p>freeaurebesh.com ("we", "us") is a free fan-made Star Wars language tool. This policy explains what data we collect and how it is used. We do not sell your data.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Data We Collect</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong style={{ color: 'var(--text)' }}>Usage analytics</strong> — page views, session duration, and referral source via Google Analytics (GA4). This data is anonymized and aggregated.</li>
              <li><strong style={{ color: 'var(--text)' }}>Translation input</strong> — text you type into the translator is processed entirely in your browser. It is never sent to our servers.</li>
              <li><strong style={{ color: 'var(--text)' }}>Local storage</strong> — your theme preference (light/dark) is saved in your browser's local storage only.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Advertising (Google AdSense)</h2>
            <p className="mb-2">We use Google AdSense to display advertisements. Google may use cookies and similar technologies to serve ads based on your prior visits to this site and other sites on the internet.</p>
            <p className="mb-2">Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Google Ads Settings</a>.</p>
            <p>For more information on how Google uses data, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>How Google uses data when you use our partners' sites or apps</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Cookies</h2>
            <p>We use cookies for analytics (Google Analytics) and advertising (Google AdSense). You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Third-Party Services</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>Google Analytics — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Privacy Policy</a></li>
              <li>Google AdSense — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Children's Privacy</h2>
            <p>This site is not directed at children under 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Contact</h2>
            <p>Questions about this policy? Email us at <a href="mailto:yu07546040628@gmail.com" style={{ color: 'var(--gold)' }}>yu07546040628@gmail.com</a></p>
          </section>

        </div>
      </div>
    </div>
    </>
  )
}
