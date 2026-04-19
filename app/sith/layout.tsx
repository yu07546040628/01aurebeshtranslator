import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sith Alphabet Translator – Ur-Kittât Dark Side Script',
  description: 'Translate English to the Sith Alphabet (Ur-Kittât) — the ancient dark side script from Star Wars. Free converter with all 26 Sith letters and instant visual output.',
  keywords: [
    'Sith alphabet translator',
    'Ur-Kittât',
    'Sith script',
    'Star Wars dark side language',
    'Sith writing system',
    'Korriban script',
  ],
  alternates: {
    canonical: 'https://www.freeaurebesh.com/sith',
  },
  openGraph: {
    title: 'Sith Alphabet Translator – Ur-Kittât Script',
    description: 'Convert English to the ancient Sith script Ur-Kittât from Star Wars. Free online translator with all 26 glyphs.',
    url: 'https://www.freeaurebesh.com/sith',
    type: 'website',
  },
};

export default function SithLayout({ children }: { children: React.ReactNode }) {
  return children;
}
