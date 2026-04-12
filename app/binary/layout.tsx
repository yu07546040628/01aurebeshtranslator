import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Droidspeak / Binary Translator – R2-D2 Language | Star Wars',
  description: 'Translate text to R2-D2\'s Droidspeak Binary language from Star Wars. Morse-style beep encoding with optional audio playback. Includes BB-8 and C-3PO droid sound reference.',
  keywords: [
    'R2-D2 language translator',
    'droidspeak',
    'Star Wars binary',
    'droid beeps',
    'R2D2 translator',
    'BB-8 language',
    'droid morse code',
  ],
  alternates: {
    canonical: 'https://www.freeaurebesh.com/binary',
  },
  openGraph: {
    title: 'Droidspeak Binary Translator – R2-D2 Language',
    description: 'Convert English to R2-D2 droidspeak binary. Morse-style encoding with audio playback.',
    url: 'https://www.freeaurebesh.com/binary',
    type: 'website',
  },
};

export default function BinaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
