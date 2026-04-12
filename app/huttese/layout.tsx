import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Huttese Translator – Jabba\'s Language | Star Wars',
  description: 'Translate English to Huttese — Jabba the Hutt\'s language from Star Wars. Vocabulary replacement engine with 200+ words, famous phrases, and partial-match highlighting. Free online tool.',
  keywords: [
    'Huttese translator',
    'Jabba language',
    'Star Wars Huttese',
    'Huttese words',
    'Jabba the Hutt language',
    'Huttese phrases',
  ],
  alternates: {
    canonical: 'https://www.freeaurebesh.com/huttese',
  },
  openGraph: {
    title: 'Huttese Translator – Jabba\'s Star Wars Language',
    description: 'Free English to Huttese translator with 200+ vocabulary words. Famous phrases and partial-match highlighting included.',
    url: 'https://www.freeaurebesh.com/huttese',
    type: 'website',
  },
};

export default function HutteseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
