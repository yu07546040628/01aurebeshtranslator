import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aurebesh Alphabet Chart – Complete Glyph Reference | Star Wars',
  description: 'Complete Aurebesh alphabet chart — all 26 letters and 12 dipthongs with English equivalents, Aurebesh names, and pronunciation guide. Printable Star Wars script reference.',
  keywords: [
    'Aurebesh alphabet chart',
    'Aurebesh letters',
    'Star Wars font chart',
    'Aurebesh dipthongs',
    'aurebesh reference',
    'aurebesh glyph guide',
    'Star Wars writing system',
  ],
  alternates: {
    canonical: 'https://www.freeaurebesh.com/alphabet',
  },
  openGraph: {
    title: 'Aurebesh Alphabet Chart – Complete Glyph Reference',
    description: 'All 26 Aurebesh letters + 12 dipthongs with names and pronunciations. Free printable Star Wars script chart.',
    url: 'https://www.freeaurebesh.com/alphabet',
    type: 'website',
  },
};

export default function AlphabetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
