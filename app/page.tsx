import { PRODUCTS } from '@/data/products';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductSection } from '@/components/product/ProductSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { BoutiqueSection } from '@/components/home/BoutiqueSection';
import { FooterSection } from '@/components/home/FooterSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-obsidian-900 text-luxury-white overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Curated Flagship Product Catalog */}
      <ProductSection products={PRODUCTS} />

      {/* 3. Brand Story & Craftsmanship */}
      <BrandStorySection />

      {/* 4. Flagship Banswara Boutique Showcase */}
      <BoutiqueSection />

      {/* 5. Luxury Footer */}
      <FooterSection />
    </div>
  );
}
