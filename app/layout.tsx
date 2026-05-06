import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Elara — Boutique Mode Genève',
  description: 'Boutique de mode haut de gamme à Genève. Collections femme, accessoires, lookbook. Rue du Rhône, Genève.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#faf9f7] text-[#1a1a1a]">{children}</body>
    </html>
  );
}
