import React from 'react';
import { MapPin, Navigation, Phone, Clock, Compass, Building2 } from 'lucide-react';
import { STORE_DETAILS, PRIMARY_WHATSAPP_NUMBER, SECONDARY_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function BoutiqueSection() {
  return (
    <section id="boutique" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-primary block">
          PHYSICAL SHOWROOM & VISITS
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-luxury-white">
          Visit Our <span className="text-gold-gradient font-normal">Banswara Boutique</span>
        </h2>
        <p className="text-xs sm:text-sm text-luxury-subtle">
          Experience our high jewellery collections in person at our flagship atelier.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Map Embed */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-gold-primary/30 bg-obsidian-900 min-h-[350px] shadow-luxury-card relative">
          <iframe
            src="https://maps.google.com/maps?q=23.551843,74.447071&hl=en&z=18&t=m&output=embed"
            title="Arwa 53 Store Location"
            className="w-full h-full min-h-[350px] border-0 filter invert contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        </div>

        {/* Address Card */}
        <div className="lg:col-span-5 rounded-2xl border border-gold-primary/20 bg-obsidian-850 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-primary font-semibold block mb-2">
              FLAGSHIP ATELIER
            </span>
            <h3 className="font-serif text-2xl font-semibold text-luxury-white mb-2">
              {STORE_DETAILS.name}
            </h3>
            <p className="text-xs text-luxury-subtle leading-relaxed mb-6 font-light">
              {STORE_DETAILS.address}
            </p>

            {/* Hours */}
            <div className="space-y-2 mb-6 text-xs">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gold-primary block">
                ATELIER HOURS
              </span>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-luxury-white">Monday – Saturday</span>
                <span className="text-gold-light">10:30 AM – 8:30 PM</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-luxury-white">Sunday</span>
                <span className="text-gold-light">11:00 AM – 6:00 PM</span>
              </div>
            </div>

            {/* Landmarks */}
            <div className="space-y-2 text-xs text-luxury-subtle">
              <div className="flex items-center gap-2">
                <Building2 size={13} className="text-gold-primary" />
                <span>Opposite Vaibhav Opticals</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass size={13} className="text-gold-primary" />
                <span>Near Mewad Multispeciality Hospital</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
            <a
              href={STORE_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-gold-glow"
            >
              <Navigation size={13} />
              <span>Directions</span>
            </a>
            <a
              href={`tel:${PRIMARY_WHATSAPP_NUMBER}`}
              className="px-4 py-2.5 rounded-full bg-obsidian-900 border border-gold-primary/40 text-luxury-white font-medium text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 hover:border-gold-light"
            >
              <Phone size={13} className="text-gold-primary" />
              <span>Call Store</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
