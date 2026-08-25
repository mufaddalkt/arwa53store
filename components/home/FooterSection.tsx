import React from 'react';
import Link from 'next/link';
import { STORE_DETAILS, PRIMARY_WHATSAPP_NUMBER, SECONDARY_WHATSAPP_NUMBER, createGeneralConciergeLink } from '@/lib/whatsapp';
import { LOGO_DATA_URL } from '@/data/products';

export function FooterSection() {
  return (
    <footer className="relative w-full bg-obsidian-950 border-t border-gold-primary/20 pt-16 pb-12 px-4 sm:px-8 text-luxury-subtle text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-gold-primary p-0.5 overflow-hidden bg-obsidian-900">
              {LOGO_DATA_URL && (
                <img src={LOGO_DATA_URL} alt="Arwa 53" className="w-full h-full object-cover rounded-full" />
              )}
            </div>
            <div>
              <span className="font-serif text-lg font-semibold tracking-[0.2em] text-luxury-white block leading-none">
                ARWA <span className="text-gold-light">53</span>
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-gold-primary block mt-0.5">
                Banswara Atelier
              </span>
            </div>
          </div>
          <p className="text-luxury-subtle leading-relaxed font-light">
            Fine anti-tarnish jewellery house based in Banswara, Rajasthan. Imagined for the moment, crafted for the memory.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-luxury-white block font-bold">
            Collections
          </span>
          <ul className="space-y-2">
            <li><a href="#catalog?category=Kada" className="hover:text-gold-light transition-colors">Anti-Tarnish Kadas</a></li>
            <li><a href="#catalog?category=Bangle" className="hover:text-gold-light transition-colors">Classic Bangles</a></li>
            <li><a href="#catalog?category=Mangalsutra" className="hover:text-gold-light transition-colors">Solitaire Mangalsutra</a></li>
            <li><a href="#catalog?category=Bracelet" className="hover:text-gold-light transition-colors">Charm Bracelets</a></li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="md:col-span-3 space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-luxury-white block font-bold">
            Direct Concierge
          </span>
          <div className="space-y-2">
            <p>
              <span className="text-[9px] font-mono text-gold-primary block uppercase">Orders & Bespoke</span>
              <a href={`tel:${PRIMARY_WHATSAPP_NUMBER}`} className="text-luxury-white hover:text-gold-light font-medium">{STORE_DETAILS.phone1}</a>
            </p>
            <p>
              <span className="text-[9px] font-mono text-gold-primary block uppercase">Store Support</span>
              <a href={`tel:${SECONDARY_WHATSAPP_NUMBER}`} className="text-luxury-white hover:text-gold-light font-medium">{STORE_DETAILS.phone2}</a>
            </p>
          </div>
        </div>

        {/* Atelier Location */}
        <div className="md:col-span-3 space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-luxury-white block font-bold">
            Boutique Atelier
          </span>
          <p className="leading-relaxed">
            {STORE_DETAILS.address}
          </p>
          <a
            href={STORE_DETAILS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-gold-light hover:underline mt-1 font-mono text-[10px] uppercase tracking-wider"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p className="text-luxury-muted">
          © {new Date().getFullYear()} Arwa 53 Collection (arwa53.com). All Rights Reserved. Nai Abadi, Banswara.
        </p>
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-obsidian-900 border border-gold-primary/20 text-[10px] font-mono">
          <span className="text-luxury-muted">Concierge Desk:</span>
          <a href={createGeneralConciergeLink()} target="_blank" rel="noopener noreferrer" className="text-gold-light hover:underline">
            +91 8619338794
          </a>
        </div>
      </div>
    </footer>
  );
}
