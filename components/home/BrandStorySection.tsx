import React from 'react';
import { Crown, Sparkles, ShieldCheck } from 'lucide-react';
import { LOGO_DATA_URL } from '@/data/products';

export function BrandStorySection() {
  return (
    <section className="relative w-full py-24 px-4 sm:px-8 border-y border-gold-primary/15 bg-obsidian-900/60">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Atelier Seal */}
        <div className="lg:col-span-4 text-center lg:text-left">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gold-primary p-1 mx-auto lg:mx-0 mb-6 shadow-gold-glow bg-obsidian-950">
            {LOGO_DATA_URL && (
              <img src={LOGO_DATA_URL} alt="Arwa 53" className="w-full h-full object-cover rounded-full" />
            )}
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-primary block mb-2">
            HERITAGE & CRAFTSMANSHIP
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-luxury-white">
            THE HOUSE OF ARWA <span className="text-gold-light">53</span>
          </h3>
        </div>

        {/* Right Column: Editorial Narrative */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="font-serif italic text-2xl sm:text-3xl text-luxury-white/90 font-light leading-snug">
            "Conceived for life's defining milestones. Engineered with radical durability and subtle poise."
          </h2>
          <p className="text-xs sm:text-sm text-luxury-subtle leading-relaxed font-sans font-light">
            Rooted in Banswara, Rajasthan, Arwa 53 fuses regal Rajasthani court aesthetics with cutting-edge 316L metallurgical PVD gold plating. Our anti-tarnish collections allow you to wear fine statement jewellery daily without fading, tarnishing, or sensitivity.
          </p>

          {/* 3 Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-obsidian-850/80 border border-white/5">
              <ShieldCheck size={18} className="text-gold-primary mb-2" />
              <h4 className="font-serif text-sm font-semibold text-luxury-white">Anti-Tarnish Guarantee</h4>
              <p className="text-[11px] text-luxury-muted mt-1">Resistant to water, sweat, and perfumes.</p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-850/80 border border-white/5">
              <Crown size={18} className="text-gold-primary mb-2" />
              <h4 className="font-serif text-sm font-semibold text-luxury-white">Bespoke Sizing</h4>
              <p className="text-[11px] text-luxury-muted mt-1">Complimentary sizing assistance at showroom.</p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-850/80 border border-white/5">
              <Sparkles size={18} className="text-gold-primary mb-2" />
              <h4 className="font-serif text-sm font-semibold text-luxury-white">Banswara Atelier</h4>
              <p className="text-[11px] text-luxury-muted mt-1">Direct boutique pickup & try-on available.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
