'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductCategory } from '@/types/product';
import { ModernProductCard } from './ModernProductCard';
import { Sparkles, Filter, Gem } from 'lucide-react';

interface ProductSectionProps {
  products: Product[];
}

export function ProductSection({ products }: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Handle URL hash parameters (e.g. #catalog?category=Kada)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes('category=')) {
        const cat = hash.split('category=')[1];
        if (cat) setSelectedCategory(decodeURIComponent(cat));
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const categories = ['All', 'Kada', 'Bangle', 'Mangalsutra', 'Bracelet'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  const progressPercentage = Math.round((filteredProducts.length / products.length) * 100);

  return (
    <section id="catalog" className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-obsidian-850 border border-gold-primary/30 text-[10px] font-mono uppercase tracking-[0.25em] text-gold-light">
          <Sparkles size={11} className="text-gold-primary" />
          <span>Curated Flagship Collection</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-luxury-white leading-tight">
          Strict Editorial <span className="italic text-gold-gradient font-normal">Hierarchy.</span>
        </h2>

        <p className="text-xs sm:text-sm text-luxury-subtle leading-relaxed max-w-xl mx-auto font-sans">
          Hypoallergenic 316L anti-tarnish steel forged with multi-layer PVD gold plating. Designed for everyday poise and generational durability.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-gold-gradient text-obsidian-950 font-bold shadow-gold-glow scale-105'
                  : 'bg-obsidian-850/80 border border-white/5 text-luxury-subtle hover:border-gold-primary/40 hover:text-luxury-white'
              }`}
            >
              {cat === 'All' ? 'All Pieces' : cat + 's'}
            </button>
          );
        })}
      </div>

      {/* Live Counter Bar & Progress Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 px-2 py-3 rounded-xl bg-obsidian-850/40 border border-white/5">
        <div className="text-xs font-mono text-luxury-subtle flex items-center gap-2">
          <span>SHOWING</span>
          <span className="text-gold-light font-bold">{filteredProducts.length}</span>
          <span>OF</span>
          <span className="text-luxury-white font-bold">{products.length}</span>
          <span>CURATED PIECES</span>
        </div>

        {/* Progress bar */}
        <div className="w-full sm:w-48 h-1.5 bg-obsidian-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-gradient rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Reactive 4-Column Editorial Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gold-primary/20 rounded-3xl p-8 bg-obsidian-900/40">
          <Gem size={32} className="text-gold-primary mx-auto mb-3 opacity-60" />
          <p className="font-serif text-2xl text-luxury-white">No creations found in this category</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-4 px-6 py-2 rounded-full border border-gold-primary text-xs uppercase tracking-widest text-gold-light hover:bg-gold-gradient hover:text-obsidian-950 transition-all font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <ModernProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
