import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Death Trooper Cipher – Imperial Encryption | Star Wars',
  description: 'Encode messages using the Death Trooper Cipher — the Imperial encryption system from Star Wars Rogue One. Atbash mirror + Caesar shift, rendered as Aurebesh glyphs. Free online tool.',
  keywords: [
    'Death Trooper cipher',
    'Imperial encryption',
    'Star Wars cipher',
    'Rogue One cipher',
    'Star Wars secret code',
    'Atbash Caesar cipher',
  ],
  alternates: {
    canonical: 'https://www.freeaurebesh.com/deathtrooper',
  },
  openGraph: {
    title: 'Death Trooper Cipher – Star Wars Imperial Encryption',
    description: 'Encode messages with the Death Trooper Cipher — Atbash + Caesar shift encryption from Star Wars Rogue One.',
    url: 'https://www.freeaurebesh.com/deathtrooper',
    type: 'website',
  },
};

export default function DeathTrooperLayout({ children }: { children: React.ReactNode }) {
  return children;
}
