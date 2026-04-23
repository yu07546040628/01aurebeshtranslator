import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'

const BASE_URL = 'https://www.freeaurebesh.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Aurebesh Translator – Star Wars Font & Language Converter',
    template: '%s | Aurebesh Translator',
  },
  description: 'Free Aurebesh Translator — Convert English to Star Wars Aurebesh script instantly. Also includes Sith Alphabet, Huttese, Droidspeak Binary, and Death Trooper Cipher. Download as PNG/SVG.',
  keywords: [
    'Aurebesh translator',
    'Star Wars font converter',
    'Aurebesh alphabet',
    'Star Wars language translator',
    'Sith alphabet translator',
    'Ur-Kittât script',
    'Huttese translator',
    'Jabba language',
    'R2-D2 droidspeak',
    'Death Trooper cipher',
    'Star Wars script generator',
    'aurebesh to english',
    'galactic basic',
  ],
  authors: [{ name: 'Aurebesh Translator' }],
  creator: 'Aurebesh Translator',
  publisher: 'Aurebesh Translator',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Aurebesh Translator',
    title: 'Aurebesh Translator – Star Wars Font & Language Converter',
    description: 'Free English ↔ Aurebesh translator with dipthong support. Includes Sith, Huttese, Droidspeak & Death Trooper Cipher. Download as PNG/SVG.',
    images: [
      {
        url: '/pic/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aurebesh Translator – Star Wars Language Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurebesh Translator – Star Wars Font & Language Converter',
    description: 'Free English ↔ Aurebesh translator. Also includes Sith, Huttese, Droidspeak & Death Trooper Cipher.',
    images: ['/pic/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'entertainment',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1GECH7Y7PR" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1GECH7Y7PR');
            `,
          }}
        />
        {/* JSON-LD Structured Data — WebSite + SearchAction for Google Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: 'Aurebesh Translator',
                  description: 'Free Star Wars language translator — Aurebesh, Sith, Huttese, Droidspeak, Death Trooper Cipher.',
                  inLanguage: 'en-US',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': `${BASE_URL}/#app`,
                  name: 'Aurebesh Translator',
                  url: BASE_URL,
                  applicationCategory: 'UtilitiesApplication',
                  operatingSystem: 'Any',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                    url: BASE_URL,
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5',
                    ratingCount: '1',
                  },
                  featureList: [
                    'English to Aurebesh conversion',
                    'Sith Alphabet (Ur-Kittât) translator',
                    'Huttese language translator',
                    'R2-D2 Droidspeak binary encoder',
                    'Death Trooper Cipher (Atbash + Caesar)',
                    'PNG and SVG export',
                    'Audio playback for Droidspeak',
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}<Footer /></body>
    </html>
  )
}
