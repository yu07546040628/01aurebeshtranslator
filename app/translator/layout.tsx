import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Wars Language Translator – All Scripts in One Place',
  description: 'Translate English to Aurebesh, Sith Alphabet, Huttese, and Droidspeak in one tool. Free Star Wars language converter with PNG/SVG export.',
  alternates: {
    canonical: 'https://www.freeaurebesh.com/translator',
  },
  openGraph: {
    title: 'Star Wars Language Translator – All Scripts in One Place',
    description: 'Translate English to Aurebesh, Sith, Huttese, and Droidspeak. Free online Star Wars language converter.',
    url: 'https://www.freeaurebesh.com/translator',
    type: 'website',
  },
};

export default function TranslatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
