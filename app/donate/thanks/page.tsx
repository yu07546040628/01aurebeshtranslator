import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Thank You for Your Support - Aurebesh Translator',
  description: 'Thank you for supporting Free Aurebesh Translator. Your support helps keep this fan-made project online and maintained.',
  alternates: {
    canonical: 'https://www.freeaurebesh.com/donate/thanks',
  },
}

export default function DonateThanksPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <section
            className="rounded-2xl border p-8 sm:p-10 text-center"
            style={{
              background: 'linear-gradient(180deg, rgba(201,168,76,0.08), rgba(23,29,48,0.7))',
              borderColor: 'var(--border-2)',
            }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: 'var(--text-3)' }}
            >
              Support Complete
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--gold)' }}>
              Thank You
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>
              Your support helps keep Free Aurebesh Translator online, free to use, and continuously improved.
              We truly appreciate it.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/translator"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold w-full sm:w-auto"
                style={{ background: 'var(--gold)', color: '#111' }}
              >
                Continue Translating
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border w-full sm:w-auto"
                style={{ borderColor: 'var(--border-2)', color: 'var(--text)' }}
              >
                Back to Home
              </Link>
            </div>
          </section>

          <section
            className="rounded-xl border p-5 mt-6 text-sm"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <p style={{ color: 'var(--text-2)' }}>
              Need help or have feedback? Contact us at{' '}
              <a href="mailto:support@freeaurebesh.com" style={{ color: 'var(--gold)' }}>
                support@freeaurebesh.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
