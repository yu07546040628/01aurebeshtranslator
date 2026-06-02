import type { Metadata } from 'next'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Terms of Service - Aurebesh Translator',
  description: 'Terms of service for freeaurebesh.com.',
  alternates: { canonical: 'https://www.freeaurebesh.com/terms-of-service' },
}

export default function TermsOfServicePage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--gold)' }}>Terms of Service</h1>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Last updated: June 2, 2026</p>
          </header>

          <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>1. Agreement</h2>
              <p>By using freeaurebesh.com, you agree to these terms. If you do not agree, please do not use the website.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>2. Service Description</h2>
              <p>freeaurebesh.com provides free, fan-made Star Wars language tools and sells digital SVG asset packs for design use.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>3. Digital Purchases</h2>
              <p>Digital asset packs are sold through Creem, our third-party payment provider, not directly by us.</p>
              <p className="mt-2">After checkout, files are delivered electronically through the payment provider or download flow shown at purchase.</p>
              <p className="mt-2">Because digital asset packs are delivered electronically, all sales are final unless a refund is required by law or the item cannot be delivered as described.</p>
              <p className="mt-2">If you have a delivery issue or believe a purchase was made in error, contact us at <a href="mailto:support@freeaurebesh.com" style={{ color: 'var(--gold)' }}>support@freeaurebesh.com</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>4. Acceptable Use</h2>
              <p>You agree not to misuse the site, attempt to disrupt service, or use automated methods that overload infrastructure.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>5. Intellectual Property Notice</h2>
              <p>This is a fan-made project. Star Wars, Aurebesh, and related names are trademarks of Lucasfilm Ltd. and/or Disney. This site is not affiliated with or endorsed by Lucasfilm or Disney.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>6. No Warranty</h2>
              <p>The service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability or error-free output.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from use of the site.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>8. Changes to Terms</h2>
              <p>We may update these terms from time to time. Continued use of the site after updates means you accept the revised terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>9. Contact</h2>
              <p>Questions about these terms can be sent to <a href="mailto:support@freeaurebesh.com" style={{ color: 'var(--gold)' }}>support@freeaurebesh.com</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
