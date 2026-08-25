'use client';

import React from 'react';
import { Sparkles, ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { createGeneralConciergeLink } from '@/lib/whatsapp';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-8 pt-28 pb-16 overflow-hidden text-center">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-radial-glow blur-2xl pointer-events-none" />

      {/* Editorial Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-850 border border-gold-primary/30 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-gold-light mb-6">
        <Sparkles size={11} className="text-gold-primary" />
        <span>Banswara Haute Atelier & Digital Flagship</span>
      </div>

      {/* Master Display Typography */}
      <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-luxury-white tracking-tight leading-none mb-6">
        ARWA <span className="text-gold-gradient font-normal">53</span>
      </h1>

      <p className="font-serif italic text-xl sm:text-3xl md:text-4xl text-luxury-white/90 max-w-2xl mx-auto leading-relaxed mb-6 font-light">
        "Jewellery that speaks without words."
      </p>

      <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-luxury-subtle max-w-xl mx-auto mb-10 leading-loose">
        ANTI-TARNISH KADAS • LUXURY BANGLES • SOLITAIRE MANGALSUTRA
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a
          href="#catalog"
          className="px-8 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-[0.2em] shadow-gold-glow hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span>Explore 2026 Collection</span>
          <ChevronRight size={14} />
        </a>

        <a
          href={createGeneralConciergeLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 rounded-full bg-obsidian-850 hover:bg-obsidian-800 border border-gold-primary/40 text-luxury-white font-medium text-xs uppercase tracking-[0.2em] transition-all hover:border-gold-light flex items-center gap-2"
        >
          <MessageCircle size={14} className="text-gold-light" />
          <span>Consult Concierge</span>
        </a>
      </div>

      {/* Pillar Trust Badges */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left w-full">
        <div className="p-3.5 rounded-xl bg-obsidian-850/60 border border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gold-primary block">CRAFT</span>
          <span className="font-serif text-sm font-semibold text-luxury-white block mt-0.5">Anti-Tarnish 316L</span>
          <span className="text-[10px] text-luxury-muted">Waterproof & Sweat-proof</span>
        </div>
        <div className="p-3.5 rounded-xl bg-obsidian-850/60 border border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gold-primary block">FINISH</span>
          <span className="font-serif text-sm font-semibold text-luxury-white block mt-0.5">18K PVD Plating</span>
          <span className="text-[10px] text-luxury-muted">Deep gold mirror sheen</span>
        </div>
        <div className="p-3.5 rounded-xl bg-obsidian-850/60 border border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gold-primary block">LOCATION</span>
          <span className="font-serif text-sm font-semibold text-luxury-white block mt-0.5">Banswara Flagship</span>
          <span className="text-[10px] text-luxury-muted">Nai Abadi, Najmi Bagh</span>
        </div>
        <div className="p-3.5 rounded-xl bg-obsidian-850/60 border border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gold-primary block">DELIVERY</span>
          <span className="font-serif text-sm font-semibold text-luxury-white block mt-0.5">Insured Shipping</span>
          <span className="text-[10px] text-luxury-muted">Discreet luxury unboxing</span>
        </div>
      </div>
    </section>
  );
}
