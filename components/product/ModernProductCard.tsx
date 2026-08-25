'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Sparkles, Check, Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { createWhatsAppInquiryLink } from '@/lib/whatsapp';
import { formatINR } from '@/lib/utils';

interface ModernProductCardProps {
  product: Product;
  index: number;
}

export function ModernProductCard({ product, index }: ModernProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [saved, setSaved] = useState(false);

  const displayImage = isHovered && product.hoverImageUrl ? product.hoverImageUrl : product.imageUrl;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-gradient-to-b from-obsidian-850 to-obsidian-800 border border-white/5 hover:border-gold-primary/40 transition-all duration-500 shadow-luxury-card hover:shadow-gold-glow flex flex-col justify-between overflow-hidden"
    >
      {/* 4:5 Editorial Image Frame */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-obsidian-900/60 p-4 flex items-center justify-center">
        {/* Ambient Top Light Beam */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-radial-glow opacity-60 pointer-events-none" />

        {/* Absolute Micro-Tags */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-gold-primary/40 text-[9px] font-mono uppercase tracking-wider text-gold-light">
              {product.badge}
            </span>
          )}
          {product.tag && (
            <span className="px-2 py-0.5 rounded-full bg-obsidian-950/60 backdrop-blur-sm border border-white/10 text-[8px] font-mono uppercase tracking-widest text-luxury-subtle">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Action */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-obsidian-950/70 border border-white/10 flex items-center justify-center text-luxury-subtle hover:text-gold-light hover:border-gold-primary/40 transition-all"
          aria-label="Save piece"
        >
          <Heart size={13} className={saved ? 'text-gold-light fill-gold-light' : ''} />
        </button>

        {/* Product Image with Hover Cross-Fade */}
        <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl transition-opacity duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-obsidian-800 border border-gold-primary/20 flex items-center justify-center font-serif text-gold-primary text-xl">
              53
            </div>
          )}
        </div>

        {/* Desktop Hover Slide-Up: WhatsApp Reservation Pill */}
        <div className="absolute bottom-3 inset-x-3 z-20 hidden md:block translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <a
            href={createWhatsAppInquiryLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient text-obsidian-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-105 transition-all"
          >
            <MessageCircle size={14} className="fill-obsidian-950" />
            <span>Reserve on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Editorial Information Area */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3 bg-obsidian-850/80">
        <div>
          {/* Micro-Mono Category & SKU */}
          <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-gold-primary mb-1">
            <span>{product.category}</span>
            <span className="text-luxury-muted font-normal">{product.sku}</span>
          </div>

          {/* Cormorant Display Title */}
          <h3 className="font-serif text-lg sm:text-xl font-medium text-luxury-white line-clamp-1 group-hover:text-gold-light transition-colors">
            {product.name}
          </h3>

          {/* Spec Chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.specs.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-obsidian-900 border border-white/5 text-[9px] font-sans text-luxury-subtle"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Mobile Touch Booking Row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl sm:text-2xl font-bold text-luxury-white">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-luxury-muted line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Standalone WhatsApp Booking Trigger */}
          <a
            href={createWhatsAppInquiryLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden w-8 h-8 rounded-full bg-gold-gradient text-obsidian-950 flex items-center justify-center shadow-gold-glow active:scale-95 transition-transform"
            aria-label="Book on WhatsApp"
          >
            <MessageCircle size={15} className="fill-obsidian-950" />
          </a>
        </div>
      </div>
    </div>
  );
}
