'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MessageCircle, MapPin, Sparkles, ChevronRight, Phone } from 'lucide-react';
import { createGeneralConciergeLink, PRIMARY_WHATSAPP_NUMBER, SECONDARY_WHATSAPP_NUMBER, STORE_DETAILS } from '@/lib/whatsapp';
import { LOGO_DATA_URL } from '@/data/products';

export function LuxuryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Anti-Tarnish Kadas', href: '#catalog?category=Kada' },
    { name: 'Bangles', href: '#catalog?category=Bangle' },
    { name: 'Mangalsutra', href: '#catalog?category=Mangalsutra' },
    { name: 'Store Location', href: '#boutique' },
  ];

  return (
    <>
      <header className="fixed top-4 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 max-w-6xl mx-auto pointer-events-none transition-all duration-300">
        <nav
          className={`w-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full pointer-events-auto transition-all duration-500 ${
            scrolled
              ? 'luxury-glass shadow-luxury-card border-gold-primary/20'
              : 'luxury-glass-subtle'
          }`}
        >
          {/* Brand Logo & Editorial Atelier Typography */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gold-primary/40 p-0.5 transition-transform duration-500 group-hover:scale-105 group-hover:border-gold-light bg-obsidian-950 flex-shrink-0">
              {LOGO_DATA_URL ? (
                <img
                  src={LOGO_DATA_URL}
                  alt="Arwa 53 Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-serif text-gold-light text-xs font-bold">
                  53
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-semibold tracking-[0.2em] text-luxury-white leading-none">
                ARWA <span className="text-gold-light">53</span>
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-gold-primary mt-0.5">
                Banswara Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Editorial Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.18em] font-medium text-luxury-subtle hover:text-gold-light transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-light to-gold-dark transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action Icons & Live Indicator */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Live Boutique Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-950/80 border border-gold-primary/20 text-[10px] font-mono text-luxury-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider">Boutique Open</span>
            </div>

            {/* Magnetic WhatsApp Concierge Button */}
            <a
              href={createGeneralConciergeLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gold-gradient text-obsidian-950 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={13} className="text-obsidian-950 fill-obsidian-950" />
              <span className="hidden xs:inline font-sans font-bold">Concierge</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-obsidian-800 border border-gold-primary/30 flex items-center justify-center text-luxury-white hover:text-gold-light transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-obsidian-950/90 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-6">
            <div className="border-b border-gold-primary/20 pb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-primary block mb-2">
                Haute Joaillerie Navigation
              </span>
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl text-luxury-white hover:text-gold-light transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={16} className="text-gold-primary/50" />
                  </a>
                ))}
              </div>
            </div>

            {/* Store & Direct Contacts */}
            <div className="space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-primary block">
                Flagship Boutique
              </span>
              <p className="text-xs text-luxury-subtle leading-relaxed">
                {STORE_DETAILS.address}
              </p>
              <div className="flex flex-col gap-2 pt-2 text-xs">
                <a
                  href={`tel:${PRIMARY_WHATSAPP_NUMBER}`}
                  className="flex items-center gap-2 text-luxury-white hover:text-gold-light"
                >
                  <Phone size={13} className="text-gold-primary" />
                  <span>{STORE_DETAILS.phone1} (Direct Orders)</span>
                </a>
                <a
                  href={`tel:${SECONDARY_WHATSAPP_NUMBER}`}
                  className="flex items-center gap-2 text-luxury-white hover:text-gold-light"
                >
                  <Phone size={13} className="text-gold-primary" />
                  <span>{STORE_DETAILS.phone2} (Store Support)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Direct Actions */}
          <div className="space-y-3 pt-6 border-t border-gold-primary/20">
            <a
              href={createGeneralConciergeLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-gold-glow"
            >
              <MessageCircle size={15} />
              <span>Connect on WhatsApp</span>
            </a>
            <a
              href={STORE_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full border border-gold-primary/40 text-luxury-white text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2"
            >
              <MapPin size={14} className="text-gold-primary" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
