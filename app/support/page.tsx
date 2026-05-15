import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { getDonateConfig } from '@/lib/donate'

export const metadata: Metadata = {
  title: 'Support This Project - Aurebesh Translator',
  description: 'Support Aurebesh Translator with a voluntary donation.',
  alternates: { canonical: 'https://www.freeaurebesh.com/support' },
}

export default function SupportPage() {
  const donate = getDonateConfig()
  const hasLiveCheckout = donate.provider !== 'none'

  return (
    <>
      <Nav />
      <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--gold)' }}>Support This Project</h1>
            <p style={{ color: 'var(--text-2)' }}>
              Aurebesh Translator is a free fan-made tool. Optional donations help cover hosting and maintenance.
            </p>
          </header>

          <section className="rounded-xl p-6 border mb-6" style={{ borderColor: 'var(--border-2)', background: 'var(--panel)' }}>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>Donation Checkout</h2>
            <p className="mb-4" style={{ color: 'var(--text-2)' }}>
              {hasLiveCheckout
                ? `Current provider: ${donate.providerLabel}.`
                : 'Checkout provider is being configured. The support entry point is active for compliance review.'}
            </p>

            {hasLiveCheckout ? (
              <a
                href={donate.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold"
                style={{ background: 'var(--gold)', color: '#111' }}
              >
                {`Open ${donate.providerLabel} Checkout`}
              </a>
            ) : (
              <p style={{ color: 'var(--text-3)' }}>
                To enable live checkout, set <code>NEXT_PUBLIC_CREEM_DONATE_URL</code> in environment variables and redeploy.
              </p>
            )}
          </section>

          <section className="space-y-2 text-sm" style={{ color: 'var(--text-2)' }}>
            <p>Policy pages:</p>
            <p><Link href="/privacy-policy" style={{ color: 'var(--gold)' }}>Privacy Policy</Link></p>
            <p><Link href="/terms-of-service" style={{ color: 'var(--gold)' }}>Terms of Service</Link></p>
          </section>
        </div>
      </div>
    </>
  )
}
