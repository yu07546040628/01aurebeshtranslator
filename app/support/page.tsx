import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'SVG Asset Packs - Aurebesh Translator',
  description:
    'Purchase digital SVG asset packs for Aurebesh, Sith, and Death Trooper. Files are delivered instantly after checkout for design projects.',
  alternates: { canonical: 'https://www.freeaurebesh.com/support' },
}

const BASIC_URL =
  process.env.NEXT_PUBLIC_CREEM_BASIC_PACK_URL ||
  'https://www.creem.io/payment/prod_UwJKhwsIFKqosClFSc0C2'
const FULL_URL =
  process.env.NEXT_PUBLIC_CREEM_FULL_PACK_URL ||
  'https://www.creem.io/payment/prod_1OMg0MKRMa9blqiHu9RTXJ'

export default function SupportPage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--gold)' }}>
              SVG Asset Packs
            </h1>
            <p style={{ color: 'var(--text-2)' }}>
              Ready-to-use digital SVG files for Canva, Figma, Illustrator, and web projects.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div
              className="rounded-xl p-6 border flex flex-col"
              style={{ borderColor: 'var(--border-2)', background: 'var(--panel)' }}
            >
              <div className="mb-4">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'var(--text-3)' }}
                >
                  Basic Pack
                </p>
                <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                  Aurebesh SVG Pack
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg line-through" style={{ color: 'var(--text-3)' }}>
                    $3.99
                  </span>
                  <span className="text-3xl font-bold" style={{ color: 'var(--gold)' }}>
                    $1.99
                  </span>
                </div>
              </div>

              <ul className="text-sm space-y-1 mb-6 flex-1" style={{ color: 'var(--text-2)' }}>
                <li>26 Aurebesh letter SVGs</li>
                <li>12 dipthong SVGs, including CH, EE, and TH</li>
                <li>200 x 200px files with dark backgrounds</li>
                <li>Personal and commercial use subject to the pack license included with your files</li>
              </ul>

              <a
                href={BASIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-3 rounded-lg font-semibold"
                style={{ background: 'var(--gold)', color: '#111' }}
              >
                Buy Basic Pack - $1.99
              </a>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--text-3)' }}>
                Secure checkout is handled by Creem.
              </p>
            </div>

            <div
              className="rounded-xl p-6 border flex flex-col"
              style={{ borderColor: 'var(--gold)', background: 'var(--panel)' }}
            >
              <div className="mb-4">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'var(--gold)' }}
                >
                  Full Pack
                </p>
                <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                  All Languages SVG Pack
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg line-through" style={{ color: 'var(--text-3)' }}>
                    $7.99
                  </span>
                  <span className="text-3xl font-bold" style={{ color: 'var(--gold)' }}>
                    $2.00
                  </span>
                </div>
              </div>

              <ul className="text-sm space-y-1 mb-6 flex-1" style={{ color: 'var(--text-2)' }}>
                <li>Everything in Basic Pack</li>
                <li>26 Sith alphabet SVGs</li>
                <li>26 Death Trooper cipher SVGs</li>
                <li>114 files total</li>
                <li>Personal and commercial use subject to the pack license included with your files</li>
              </ul>

              <a
                href={FULL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-3 rounded-lg font-semibold"
                style={{ background: 'var(--gold)', color: '#111' }}
              >
                Buy Full Pack - $2.00
              </a>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--text-3)' }}>
                Secure checkout is handled by Creem.
              </p>
            </div>
          </div>

          <section
            className="rounded-xl p-5 border mb-8 text-sm space-y-2"
            style={{ borderColor: 'var(--border-2)', background: 'var(--panel)', color: 'var(--text-2)' }}
          >
            <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
              Delivery and Refunds
            </h2>
            <p>
              These are digital products delivered electronically after checkout. If you do not receive your files or
              something is not as described, contact us at{' '}
              <a href="mailto:support@freeaurebesh.com" style={{ color: 'var(--gold)' }}>
                support@freeaurebesh.com
              </a>
              .
            </p>
            <p>
              Digital purchases are generally final once delivered, unless a refund is required by law or the item
              cannot be delivered as described.
            </p>
          </section>

          <section className="space-y-2 text-sm text-center" style={{ color: 'var(--text-3)' }}>
            <p>
              Questions?{' '}
              <a href="mailto:support@freeaurebesh.com" style={{ color: 'var(--gold)' }}>
                support@freeaurebesh.com
              </a>
            </p>
            <p>
              <Link href="/privacy-policy" style={{ color: 'var(--gold)' }}>
                Privacy Policy
              </Link>
              {' | '}
              <Link href="/terms-of-service" style={{ color: 'var(--gold)' }}>
                Terms of Service
              </Link>
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
