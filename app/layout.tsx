import type { Metadata } from 'next';
import './globals.css';
import { cormorant, jakarta, mono } from './fonts';
import { LuxuryNavbar } from '@/components/ui/LuxuryNavbar';

export const metadata: Metadata = {
  title: 'ARWA 53 — Digital Luxury Jewellery Flagship & Banswara Atelier',
  description: 'Enter the world of ARWA 53. High-end anti-tarnish kadas, luxury bangles, solitaire mangalsutra and bridal jewellery. Crafted in Banswara, Rajasthan.',
  keywords: ['Arwa 53', 'Jewellery', 'Anti Tarnish', 'Kada', 'Bangles', 'Mangalsutra', 'Banswara Jewellery', 'Luxury Gold'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${mono.variable} dark`}>
      <body className="bg-obsidian-900 text-luxury-white min-h-screen antialiased selection:bg-gold-primary selection:text-obsidian-950">
        <LuxuryNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
