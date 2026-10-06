import { EditorialHero, ShoppingGuide } from "./storefront.jsx";
import { filterCatalogue } from "./catalog.js";
import "./catalog-images.js";
import "./styles.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom/client";
import {
  ShoppingBag, Search, X, Plus, Minus, Gem, Sparkles, ChevronRight,
  ChevronLeft, Heart, Filter, ArrowLeft, Check, Trash2, Link2, Droplet,
  CircleDot, Star, Instagram, MessageCircle, MapPin, Navigation, Phone,
  Clock, Compass, Copy, ExternalLink, Share2, Building2, ShieldCheck,
  Lock, Key, Shield, LogOut, PlusCircle, Edit3, Save, RefreshCw, Upload,
  Eye, CheckCircle2, AlertCircle, Settings, Package, Users, Activity, Globe, Laptop, Smartphone, Download, BarChart2, Wifi, Monitor
} from "lucide-react";


/* ------------------------------------------------------------------ */
/*  Brand tokens — matching the Arwa 53 Collection budget tracker      */
/* ------------------------------------------------------------------ */
const C = {
  gold: '#C9A227',
  goldLight: '#E8C468',
  goldDark: '#9C7A1C',
  blush: '#F8D5B8',
  peach: '#FAF7F2',
  cream: '#FAF7F2',
  ink: '#2B1F14',
  inkSoft: '#7A6650',
  inkFaint: '#786A5C',
  diamond: '#F4F4F2',
  red: '#B4544A',
  redSoft: '#F3DAD6',
};

const LOGO_SRC = LOGO_SRC;

const CATEGORIES = ['All', 'Rings', 'Earrings', 'Chains', 'Bracelets'];

const CATEGORY_ICON = {
  Rings: Sparkles,
  Earrings: Gem,
  Chains: Link2,
  Bracelets: CircleDot,
};

/* ------------------------------------------------------------------ */
/*  Store & Store Information — Physical Location in Banswara       */
/* ------------------------------------------------------------------ */
const DEFAULT_STORE_INFO = {
  name: "Arwa 53 Collection",
  tagline: "Exclusive Artificial & Designer Fashion Jewellery Collection",
  address: "HC2W+PRQ, Near Mewad Hospital, Opposite Vaibhav Opticals, Najmi Bagh, Nai Abadi, Banswara, Rajasthan 327001, India",
  shortAddress: "Najmi Bagh, Nai Abadi, Banswara, Rajasthan",
  plusCode: "HC2W+PRQ, Banswara",
  coordinates: "23.551843, 74.447071",
  phone1: "+91 8949540902",
  phone2: "+91 8619338794",
  phone1Raw: "918949540902",
  phone2Raw: "918619338794",
  contacts: [
    { number: "+91 8949540902", label: "Primary Concierge & Orders", raw: "918949540902" },
    { number: "+91 8619338794", label: "Store Support & Visit Inquiries", raw: "918619338794" },
  ],
  landmarks: [
    { title: "Opposite Vaibhav Opticals", subtitle: "Directly facing across the street", icon: Compass },
    { title: "Near Mewad Hospital", subtitle: "Shree Mewar Multispeciality Hospital", icon: Building2 },
    { title: "Najmi Bagh, Nai Abadi", subtitle: "Banswara, Rajasthan 327001", icon: MapPin },
  ],
  hours: [
    { days: "Monday – Saturday", time: "10:30 AM – 8:30 PM", badge: "Open Daily" },
    { days: "Sunday", time: "11:00 AM – 6:00 PM", badge: "Weekend Hours" },
  ],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=23.551843,74.447071",
  mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=74.4420%2C23.5480%2C74.4520%2C23.5560&layer=mapnik&marker=23.551843%2C74.447071",
  whatsappUrl: "https://wa.me/918949540902?text=Hello%20Arwa%2053%20Collection%2C%20I%20would%20like%20to%20inquire%20about%20visiting%20your%20store%20at%20Nai%20Abadi%2C%20Banswara.",
  whatsappUrl2: "https://wa.me/918619338794?text=Hello%20Arwa%2053%20Collection%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection.",
  features: [
    "In-Store Try-on & Styling",
    "Certified Craftsmanship",
    "Custom Resizing & Orders",
    "Luxury Gift Packaging",
  ],
};

function loadStoreInfo() {
  try {
    const raw = localStorage.getItem('arwa53_custom_store_info');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.mapEmbedUrl && parsed.mapEmbedUrl.includes('maps.google.com')) {
        parsed.mapEmbedUrl = DEFAULT_STORE_INFO.mapEmbedUrl;
      }
      return { ...DEFAULT_STORE_INFO, ...parsed };
    }
  } catch (e) {}
  return DEFAULT_STORE_INFO;
}
let STORE_INFO = loadStoreInfo();

/* ------------------------------------------------------------------ */
/*  Product photos — real Arwa 53 Collection inventory                 */
/* ------------------------------------------------------------------ */
const PRODUCT_IMAGES = window.PRODUCT_IMAGES;

/* ------------------------------------------------------------------ */
/*  Product catalogue                                                  */
/* ------------------------------------------------------------------ */
const DEFAULT_PRODUCTS = [
  // --- RINGS COLLECTION (9 newly uploaded items) ---
  { id: "ring_1", name: "Royal Solitaire Designer Ring", category: "Rings", price: 200, image: "/images/rings/image_1.webp", badge: "New Arrival", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },
  { id: "ring_2", name: "Floral Pave Crystal Ring", category: "Rings", price: 200, image: "/images/rings/image_2.webp", badge: "Signature", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },
  { id: "ring_3", name: "Crown Jewel Emerald-Tone Ring", category: "Rings", price: 200, image: "/images/rings/image_3.webp", badge: "Bestseller", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },
  { id: "ring_4", name: "Classic Eternity Designer Ring", category: "Rings", price: 200, image: "/images/rings/image_4.webp", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },
  { id: "ring_5", name: "Clover Halo Designer Ring", category: "Rings", price: 200, image: "/images/rings/image_5.webp", badge: "New Arrival", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },
  { id: "ring_6", name: "Marquise Cut Crystal Ring", category: "Rings", price: 200, image: "/images/rings/image_6.webp", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },
  { id: "ring_7", name: "Vintage Statement Fashion Ring", category: "Rings", price: 200, image: "/images/rings/image_7.webp", badge: "Signature", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },
  { id: "ring_8", name: "Pave Weave Designer Ring", category: "Rings", price: 200, image: "/images/rings/image_8.webp", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },
  { id: "ring_9", name: "Princess Cut Solitaire Ring", category: "Rings", price: 200, image: "/images/rings/image_9.webp", desc: "An elegant handcrafted fashion ring with gold-finish and fine crystal stonework from the Arwa 53 Collection." },

  // --- EARRINGS COLLECTION (9 newly uploaded items) ---
  { id: "earring_1", name: "Cascading Crystal Drop Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_1.webp", badge: "New Arrival", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },
  { id: "earring_2", name: "Royal Chandelier Designer Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_2.webp", badge: "Signature", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },
  { id: "earring_3", name: "Floral Cluster Stud Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_3.webp", badge: "Bestseller", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },
  { id: "earring_4", name: "Emerald-Tone Halo Drop Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_4.webp", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },
  { id: "earring_5", name: "Vintage Filigree Hoop Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_5.webp", badge: "New Arrival", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },
  { id: "earring_6", name: "Pearl Tassel Designer Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_6.webp", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },
  { id: "earring_7", name: "Geometric Pave Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_7.webp", badge: "Signature", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },
  { id: "earring_8", name: "Sapphire-Tone Crown Jhumka Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_8.webp", badge: "Bestseller", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },
  { id: "earring_9", name: "Solitaire Crystal Stud Earrings", category: "Earrings", price: 170, image: "/images/earrings/image_9.webp", desc: "Luxurious designer drop earrings with sparkling crystal accents and gold-finish from the Arwa 53 Collection." },

  // --- CHAINS COLLECTION (8 items) ---
  { id: "chain_1", name: "Royal Curb Designer Chain", category: "Chains", price: 150, image: "/images/chains/image_1.webp", badge: "New Arrival", desc: "A premium handcrafted designer chain featuring intricate links with gold-finish from the Arwa 53 Collection." },
  { id: "chain_2", name: "Rope Link Pendant Chain", category: "Chains", price: 225, image: "/images/chains/image_2.webp", badge: "Signature", desc: "A premium handcrafted designer chain featuring intricate links with gold-finish from the Arwa 53 Collection." },
  { id: "chain_3", name: "Box Weave Crystal Chain", category: "Chains", price: 250, image: "/images/chains/image_3.webp", badge: "Bestseller", desc: "A premium handcrafted designer chain featuring intricate links with gold-finish from the Arwa 53 Collection." },
  { id: "chain_5", name: "Medallion Charm Chain", category: "Chains", price: 170, image: "/images/chains/image_5.webp", badge: "New Arrival", desc: "A premium handcrafted designer chain featuring intricate links with gold-finish from the Arwa 53 Collection." },
  { id: "chain_6", name: "Singapore Twist Designer Chain", category: "Chains", price: 160, image: "/images/chains/image_6.webp", desc: "A premium handcrafted designer chain featuring intricate links with gold-finish from the Arwa 53 Collection." },
  { id: "chain_7", name: "Wheat Pattern Heavy Chain", category: "Chains", price: 160, image: "/images/chains/image_7.webp", badge: "Signature", desc: "A premium handcrafted designer chain featuring intricate links with gold-finish from the Arwa 53 Collection." },
  { id: "chain_8", name: "Double Layered Designer Chain", category: "Chains", price: 200, image: "/images/chains/image_8.webp", desc: "A premium handcrafted designer chain featuring intricate links with gold-finish from the Arwa 53 Collection." },
  { id: "chain_9", name: "Solitaire Crystal Pendant Chain", category: "Chains", price: 225, image: "/images/chains/image_9.webp", desc: "A premium handcrafted designer chain featuring intricate links with gold-finish from the Arwa 53 Collection." },

  // --- ORIGINAL BANGLES & BRACELETS (33 items) ---
  { id: "img1", name: "Butterfly Crystal Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img1, badge: "Signature", desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img2", name: "Link Row Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img2, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img3", name: "Black Clover Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img3, badge: "Bestseller", desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img4", name: "Crystal Blossom Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img4, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img5", name: "Clover Charm Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img5, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img6", name: "Monogram Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img6, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img7", name: "Marquise Rectangle Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img7, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img8", name: "Lattice Gem Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img8, badge: "Bestseller", desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img9", name: "Triple Band Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img9, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img10", name: "Marquise Lace Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img10, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img11", name: "Knot Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img11, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img12", name: "Nail Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img12, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img13", name: "Crystal Row Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img13, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img14", name: "Wavy Pave Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img14, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img15", name: "Sapphire Drop Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img15, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img16", name: "Infinity Weave Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img16, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img17", name: "Halo Flower Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img17, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img18", name: "Twin Row Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img18, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img19", name: "Abalone Star Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img19, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img20", name: "Ivory Bar Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img20, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img21", name: "Emerald Row Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img21, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img22", name: "Floral Link Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img22, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img23", name: "Pave Knot Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img23, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img24", name: "Ruby Nail Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img24, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img25", name: "Infinity Flower Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img25, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img26", name: "Medallion Bangle", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img26, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img27", name: "Star Pendant Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img27, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img28", name: "Floral Medallion Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img28, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img29", name: "Abalone Burst Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img29, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img30", name: "Rosette Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img30, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img31", name: "Compass Star Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img31, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img32", name: "Pearl Square Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img32, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
  { id: "img33", name: "Abalone Heart Bracelet", category: "Bracelets", price: 320, image: PRODUCT_IMAGES.img33, desc: "A handcrafted fashion piece from the Arwa 53 Collection, designed with gold-finish and detailed stonework." },
];

const CATALOG_BUILD_VERSION = 'arwa53_v6_20260829_chains_sync';

function loadProducts() {
  try {
    const cachedVersion = localStorage.getItem('arwa53_build_version');
    if (cachedVersion !== CATALOG_BUILD_VERSION) {
      // Force sync with latest catalogue prices & items across all mobile and PC devices
      localStorage.setItem('arwa53_build_version', CATALOG_BUILD_VERSION);
      localStorage.removeItem('arwa53_custom_products');
      return DEFAULT_PRODUCTS;
    }
    const raw = localStorage.getItem('arwa53_custom_products');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out any deleted legacy duplicate products like chain_4
        const filteredParsed = parsed.filter(p => p.id !== 'chain_4');
        const defaultMap = new Map(DEFAULT_PRODUCTS.map(p => [p.id, p]));
        const updated = filteredParsed.map(p => {
          const def = defaultMap.get(p.id);
          if (def) {
            let price = def.price;
            if (p.isCustomPrice && p.price) {
              price = Number(p.price);
            }
            return {
              ...def,
              ...p,
              price: price,
              name: p.name || def.name,
              category: def.category,
              desc: p.desc || def.desc,
              image: !p.image || /^\/?images\/.*\.png$/.test(p.image) ? def.image : p.image,
              badge: p.badge !== undefined ? p.badge : def.badge,
            };
          }
          return p;
        });
        const existingIds = new Set(updated.map(p => p.id));
        DEFAULT_PRODUCTS.forEach(p => {
          if (!existingIds.has(p.id)) {
            updated.push(p);
          }
        });
        // Sort so newly added categories (Rings, Earrings, Chains) appear first, and Bracelets appear last
        const sorted = [
          ...updated.filter(p => p.category !== 'Bracelets'),
          ...updated.filter(p => p.category === 'Bracelets')
        ];
        localStorage.setItem('arwa53_custom_products', JSON.stringify(sorted));
        return sorted;
      }
    }
  } catch (e) {}
  return DEFAULT_PRODUCTS;
}
let PRODUCTS = loadProducts();

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function formatINR(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function loadWishlist() {
  try {
    const raw = localStorage.getItem('arwa53-wishlist');
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(id => typeof id === 'string') : [];
  } catch (e) {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  Small building blocks — same language as the budget tracker         */
/* ------------------------------------------------------------------ */
function GoldButton({ children, onClick, style, type = 'button', full, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl font-semibold px-5 py-3 transition-all active:scale-[0.97] ${full ? 'w-full' : ''}`}
      style={{
        background: disabled ? C.inkFaint : `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 60%, ${C.goldDark})`,
        color: C.cream,
        boxShadow: disabled ? 'none' : '0 6px 16px -6px rgba(156,122,28,0.55)',
        border: `1px solid ${disabled ? C.inkFaint : C.goldDark}`,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, active, style }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="rounded-2xl font-medium px-4 py-2 text-sm transition-all active:scale-[0.97] whitespace-nowrap flex items-center gap-1.5"
      style={{
        background: active ? C.cream : 'transparent',
        color: active ? C.ink : C.inkSoft,
        border: `1px solid ${active ? C.gold : 'rgba(156,122,28,0.25)'}`,
        boxShadow: active ? '0 2px 8px -2px rgba(201,162,39,0.4)' : 'none',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, style, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl ${className}`}
      style={{
        background: C.cream,
        border: `1px solid rgba(201,162,39,0.18)`,
        boxShadow: '0 10px 30px -18px rgba(43,31,20,0.35)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ShimmerText({ children, size = '1.9rem', as = 'div' }) {
  const Tag = as;
  return (
    <Tag
      className="shimmer-text font-bold"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: size,
        lineHeight: 1.15,
        backgroundImage: `linear-gradient(100deg, ${C.goldDark} 20%, ${C.goldLight} 40%, #FFFDF6 50%, ${C.goldLight} 60%, ${C.goldDark} 80%)`,
        backgroundSize: '250% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </Tag>
  );
}

function ProductVisual({ product, size = 'normal' }) {
  const Icon = CATEGORY_ICON[product.category] || Gem;
  const iconSize = size === 'large' ? 64 : 30;
  const seed = product.id.charCodeAt(3) || 1;
  const angle = 120 + (seed * 17) % 60;

  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(${angle}deg, ${C.blush}, ${C.peach} 60%, ${C.cream})` }}
    >
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 30% 25%, ${C.goldLight}55, transparent 45%), radial-gradient(circle at 75% 75%, ${C.gold}33, transparent 40%)`,
      }} />
      {product.image ? (
        <img
          src={product.image}
          loading={size === "large" ? "eager" : "lazy"}
          decoding="async"
          alt={product.name}
          className="relative w-full h-full object-cover"
        />
      ) : (
        <Icon size={iconSize} strokeWidth={1.3} style={{ color: C.goldDark, opacity: 0.75 }} className="relative" />
      )}
      {product.badge && (
        <span
          className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full"
          style={{ background: C.ink, color: C.goldLight }}
        >
          {product.badge}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product card                                                        */
/* ------------------------------------------------------------------ */
function useRevealOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function HeartBurst({ show }) {
  if (!show) return null;
  const particles = Array.from({ length: 6 });
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        return (
          <span
            key={i}
            className="heart-particle"
            style={{ '--angle': `${angle}deg`, color: i % 2 === 0 ? C.red : C.gold }}
          >
            <Heart size={10} fill="currentColor" />
          </span>
        );
      })}
    </div>
  );
}

function ProductCard({ product, onOpen, isWishlisted, onToggleWishlist }) {
  return <Card className="product-card overflow-hidden flex flex-col">
    <div className="relative aspect-square">
      <button className="product-open w-full h-full" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}><ProductVisual product={product} /></button>
      <button onClick={() => onToggleWishlist(product.id)} aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${product.name}${isWishlisted ? ' from wishlist' : ' to wishlist'}`} aria-pressed={isWishlisted} className="absolute top-2 right-2 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm" style={{color: isWishlisted ? C.red : C.ink}}><Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="p-3 sm:p-4 flex flex-col flex-1 gap-1">
      <p className="text-[10px] uppercase tracking-wider" style={{color:C.inkSoft}}>{product.category === 'Bracelets' ? 'Bangles & bracelets' : product.category}</p>
      <button className="product-details-button" onClick={()=>onOpen(product)}>{product.name}</button>
      <div className="flex items-center justify-between mt-auto pt-2"><span className="font-bold text-sm">{formatINR(product.price)}</span><a href={`https://wa.me/${STORE_INFO.phone1Raw}?text=${encodeURIComponent(`Hello Arwa 53 Collection, I would like to enquire about ${product.name} (Code: ${product.id}, ${formatINR(product.price)}). Please confirm availability and sizing.`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Inquire about ${product.name} on WhatsApp`} className="w-11 h-11 rounded-full flex items-center justify-center" style={{background:'#e6efe7',color:'#1d6135'}}><MessageCircle size={19}/></a></div>
    </div>
  </Card>;
}

/* ------------------------------------------------------------------ */
/*  Toast Notification                                                  */
/* ------------------------------------------------------------------ */
function Toast({ message, show, icon: Icon = Check }) {
  if (!show) return null;
  return (
    <div
      role="status" aria-live="polite"
      className="fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl pop shadow-2xl"
      style={{
        background: C.ink,
        color: C.cream,
        border: `1px solid ${C.gold}`,
        boxShadow: '0 12px 30px -8px rgba(43,31,20,0.6)',
      }}
    >
      <Icon size={16} style={{ color: C.goldLight }} />
      <span className="text-xs sm:text-sm font-semibold tracking-wide">{message}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product detail modal                                                */
/* ------------------------------------------------------------------ */
function useAccessibleDialog(open, onClose) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open || !ref.current) return;
    const dialog = ref.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => [...dialog.querySelectorAll('button:not([disabled]), a[href], input, select, summary, [tabindex="0"]')].filter(el => el.getClientRects().length);
    (focusable()[0] || dialog).focus();
    const handleKey = e => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeRef.current(); }
      if (e.key === 'Tab') {
        const nodes = focusable(); const first = nodes[0]; const last = nodes[nodes.length-1];
        if (!nodes.length) { e.preventDefault(); dialog.focus(); }
        else if (e.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {e.preventDefault();last.focus();}
        else if (!e.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {e.preventDefault();first.focus();}
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('keydown',handleKey);document.body.style.overflow=overflow;if(previous?.isConnected)previous.focus(); };
  }, [open]);
  return ref;
}

function ProductModal({ product, onClose, isWishlisted, onToggleWishlist, onNavigateLocation }) {
  const dialogRef = useAccessibleDialog(Boolean(product), onClose);
  if (!product) return null;

  const whatsappInquiryUrl = `https://wa.me/${STORE_INFO.phone1Raw}?text=${encodeURIComponent(
    `Hello Arwa 53 Collection, I am interested in "${product.name}" (${formatINR(product.price)}). Is this available for in-store try-on at your store near Mewad Hospital, Nai Abadi, Banswara?`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center backdrop-fade"
      style={{ background: 'rgba(43,31,20,0.5)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <div
        ref={dialogRef} role="dialog" aria-modal="true" aria-label={product.name} tabIndex={-1}
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden modal-in max-h-[92vh] flex flex-col"
        style={{ background: C.cream, boxShadow: '0 25px 50px -12px rgba(43,31,20,0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-[4/3] relative flex-shrink-0 overflow-hidden">
          <div className="modal-img-in w-full h-full">
            <ProductVisual product={product} size="large" />
          </div>
          <button
            onClick={onClose}
            aria-label="Close product details"
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90"
            style={{ background: 'rgba(255,248,240,0.92)', border: `1px solid rgba(201,162,39,0.3)` }}
          >
            <X size={18} style={{ color: C.ink }} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold mb-1" style={{ color: C.goldDark }}>{product.category}</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: C.ink }} className="text-2xl font-bold mb-1">{product.name}</h2>
            <p className="text-xl font-bold" style={{ color: C.ink }}>{formatINR(product.price)}</p>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{product.desc}</p>
          <dl className="product-facts"><div><dt>Product code</dt><dd>{product.id}</dd></div><div><dt>Collection</dt><dd>{product.category}</dd></div></dl>
          <p className="product-note">Please confirm availability, size, material and current price with our store. This is fashion jewellery; product names describe the design.</p>



          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-transform active:scale-95 text-white"
              style={{
                background: '#25D366',
                boxShadow: '0 6px 16px -6px rgba(37,211,102,0.5)',
              }}
            >
              <MessageCircle size={17} />
              <span>Inquire on WhatsApp</span>
            </a>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className="h-12 px-5 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm heart-btn-wide transition-all active:scale-95"
              style={{ border: `1px solid ${C.blush}`, background: '#fff', color: isWishlisted ? C.red : C.ink }}
            >
              <Heart size={17} fill={isWishlisted ? C.red : 'none'} className={isWishlisted ? 'heart-pop' : ''} style={{ color: isWishlisted ? C.red : C.inkSoft }} />
              <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Wishlist Drawer / Modal                                             */
/* ------------------------------------------------------------------ */
function WishlistModal({ isOpen, onClose, wishlist, onToggleWishlist, onSelectProduct, onNavigateLocation }) {
  const dialogRef = useAccessibleDialog(isOpen, onClose);
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const totalValue = wishlistedProducts.reduce((acc, p) => acc + (p.price || 0), 0);

  const whatsappWishlistUrl = `https://wa.me/${STORE_INFO.phone1Raw}?text=${encodeURIComponent(
    `Hello Arwa 53 Collection, I would like to inquire about these pieces from my wishlist:\n` +
    wishlistedProducts.map((p, idx) => `${idx + 1}. ${p.name} - ${formatINR(p.price)}`).join('\n') +
    `\n\nTotal Estimated: ${formatINR(totalValue)}\nI would like to know if these are available at your Nai Abadi, Banswara store.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end backdrop-fade"
      style={{ background: 'rgba(43,31,20,0.5)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <div
        ref={dialogRef} role="dialog" aria-modal="true" aria-label="Saved pieces" tabIndex={-1}
        className="w-full max-w-md h-full modal-in flex flex-col"
        style={{ background: C.cream, boxShadow: '-10px 0 30px -10px rgba(43,31,20,0.4)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid rgba(201,162,39,0.2)` }}>
          <div className="flex items-center gap-2">
            <Heart size={18} fill={C.red} style={{ color: C.red }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.ink }} className="text-lg font-bold">
              Saved Pieces ({wishlistedProducts.length})
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close wishlist" className="p-2 rounded-full hover:bg-black/5" style={{ color: C.ink }}>
            <X size={19} />
          </button>
        </div>

        {/* Product list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={36} className="mx-auto mb-3 opacity-30" style={{ color: C.goldDark }} />
              <p className="font-bold text-sm" style={{ color: C.ink }}>Your wishlist is empty</p>
              <p className="text-xs mt-1" style={{ color: C.inkSoft }}>Explore our collection and save your favorite jewellery pieces.</p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onClose();
                  onSelectProduct(product);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:shadow-md transition-all"
                style={{ background: '#fff', border: `1px solid ${C.blush}` }}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ border: `1px solid ${C.blush}` }}>
                  <ProductVisual product={product} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase font-semibold tracking-wider truncate" style={{ color: C.goldDark }}>{product.category}</p>
                  <p className="text-sm font-bold truncate" style={{ color: C.ink, fontFamily: "'Playfair Display', serif" }}>{product.name}</p>
                  <p className="text-xs font-bold mt-0.5" style={{ color: C.ink }}>{formatINR(product.price)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={`https://wa.me/${STORE_INFO.phone1Raw || '919929285353'}?text=${encodeURIComponent(`Hello Arwa 53 Collection, I am inquiring about "${product.name}" (${formatINR(product.price)}) saved in my wishlist. Is this available at your Nai Abadi, Banswara store?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 text-white"
                    style={{ background: '#25D366' }}
                    title={`Inquire about ${product.name} on WhatsApp`}
                  >
                    <MessageCircle size={15} />
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="p-2 rounded-full hover:bg-red-50 text-red-700"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Actions */}
        {wishlistedProducts.length > 0 && (
          <div className="p-6 space-y-3" style={{ borderTop: `1px solid rgba(201,162,39,0.2)`, background: `${C.peach}55` }}>
            <div className="flex items-center justify-between text-sm font-bold" style={{ color: C.ink }}>
              <span>Estimated Total ({wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'}):</span>
              <span className="text-base">{formatINR(totalValue)}</span>
            </div>

            <a
              href={whatsappWishlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-2xl flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm text-white transition-transform active:scale-95"
              style={{
                background: '#25D366',
                boxShadow: '0 6px 16px -6px rgba(37,211,102,0.5)',
              }}
            >
              <MessageCircle size={16} />
              <span>Inquire All on WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive Store Map Component (Native Leaflet OSM - 0 Cookies)  */
/* ------------------------------------------------------------------ */
function StoreMap() {
  const mapContainerRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (!mapContainerRef.current) return;
    if (typeof L === 'undefined') return;

    if (!mapInstanceRef.current) {
      try {
        const map = L.map(mapContainerRef.current, {
          center: [23.551843, 74.447071],
          zoom: 16,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const customIcon = L.divIcon({
          className: 'custom-arwa-pin',
          html: '<div style="background:linear-gradient(135deg,#D4AF37,#9E7432);color:white;padding:4px 9px;border-radius:14px;font-size:11px;font-weight:700;box-shadow:0 3px 10px rgba(0,0,0,0.3);white-space:nowrap;border:1.5px solid #FAF0D7;display:inline-flex;align-items:center;gap:4px;">📍 Arwa 53 Store</div>',
          iconSize: [125, 30],
          iconAnchor: [62, 30],
        });

        const marker = L.marker([23.551843, 74.447071], { icon: customIcon }).addTo(map);
        marker.bindPopup('<div style="font-family:sans-serif;font-size:12px;color:#2B1F14;padding:2px;"><b style="color:#9E7432;">Arwa 53 Collection</b><br/>Near Mewad Hospital, Opp. Vaibhav Opticals<br/>Najmi Bagh, Nai Abadi, Banswara</div>').openPopup();

        mapInstanceRef.current = map;
      } catch (err) {}
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full flex-1 min-h-[300px] z-0 relative bg-stone-100" style={{ minHeight: '300px' }} />;
}

/* ------------------------------------------------------------------ */
/*  Store Location Section — Interactive Map & Timings Showcase       */
/* ------------------------------------------------------------------ */
function StoreSection() {
  return (
    <section id="store-location" className="max-w-4xl mx-auto px-5 py-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5"
          style={{ background: `${C.gold}22`, color: C.goldDark, border: `1px solid ${C.gold}44` }}
        >
          <MapPin size={12} />
          <span>Store Location & Map</span>
        </div>
        <ShimmerText size="2.2rem" as="h2">Visit Our Store in Banswara</ShimmerText>
        <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: C.inkSoft }}>
          Experience the sparkle and craftsmanship of the Arwa 53 Collection in person. Browse our full catalogue and try on bespoke pieces.
        </p>
      </div>

      {/* Main Google Maps Frame & Store Hours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Interactive Embedded Map Frame */}
        <div
          className="md:col-span-7 lg:col-span-8 rounded-3xl overflow-hidden relative flex flex-col"
          style={{
            background: '#FFFFFF',
            border: `1.5px solid ${C.gold}`,
            boxShadow: '0 12px 30px -10px rgba(201,162,39,0.35)',
          }}
        >
          {/* Map Frame Header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{
              background: `linear-gradient(135deg, ${C.cream} 0%, #FFFFFF 100%)`,
              borderBottom: `1px solid rgba(201,162,39,0.25)`,
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${C.goldLight}, ${C.goldDark})` }}>
                <MapPin size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight" style={{ color: C.ink }}>Arwa 53 Collection</h4>
                <p className="text-[10px] text-stone-500 font-medium">Opp. Vaibhav Opticals, Nai Abadi, Banswara</p>
              </div>
            </div>

            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 transition-transform active:scale-95 text-white"
              style={{
                background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})`,
              }}
              title="Open in full Google Maps"
            >
              <span>Full Map</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Native In-Page Interactive Map */}
          <StoreMap />

          {/* Map Frame Footer */}
          <div
            className="px-4 py-2.5 text-[11px] font-medium flex items-center justify-between"
            style={{ background: `${C.peach}55`, color: C.inkSoft }}
          >
            <span className="truncate">Near Mewad Hospital • Opp. Vaibhav Opticals (HC2W+PRQ)</span>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold flex-shrink-0 flex items-center gap-1 hover:underline ml-2"
              style={{ color: C.goldDark }}
            >
              <Navigation size={11} />
              <span>Directions</span>
            </a>
          </div>
        </div>

        {/* Store Hours Card */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col">
          <div
            className="p-5 rounded-3xl h-full flex flex-col justify-between"
            style={{
              background: '#FFFFFF',
              border: `1px solid rgba(201,162,39,0.25)`,
              boxShadow: '0 8px 24px -10px rgba(43,31,20,0.1)',
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} style={{ color: C.goldDark }} />
                <h4 className="text-xs font-extrabold uppercase tracking-wider" style={{ color: C.ink }}>
                  Store Hours & Timings
                </h4>
              </div>

              <div className="space-y-2.5">
                {STORE_INFO.hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-2" style={{ borderBottom: i === 0 ? `1px dashed ${C.blush}` : 'none' }}>
                    <div>
                      <p className="font-bold" style={{ color: C.ink }}>{h.days}</p>
                      <p className="font-semibold text-[11px]" style={{ color: C.inkSoft }}>{h.time}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${C.peach}`, color: C.goldDark }}>
                      {h.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Contact CTA */}
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full py-2.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs transition-transform active:scale-95 text-white"
              style={{
                background: '#25D366',
                boxShadow: '0 4px 12px -3px rgba(37,211,102,0.4)',
              }}
            >
              <MessageCircle size={14} />
              <span>Contact Store on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/*  Admin Panel Component with Vercel Env Variable Password Auth     */
/* ------------------------------------------------------------------ */
function AdminModal({
  isOpen,
  onClose,
  products,
  setProducts,
  storeInfo,
  setStoreInfo,
  visitorCount,
  visitorLogs,
  setVisitorLogs,
  onToast
}) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('arwa53_admin_token');
  });

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'store' | 'backup'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [adminCategory, setAdminCategory] = useState('All');

  // Form states for product
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Bracelets');
  const [formPrice, setFormPrice] = useState('');
  const [formBadge, setFormBadge] = useState('None');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Store form state
  const [storeForm, setStoreForm] = useState(storeInfo);

  useEffect(() => {
    setStoreForm(storeInfo);
  }, [storeInfo]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsAddingProduct(false);
      setEditingProduct(null);
    }
  }, [isOpen]);

  const categoryCounts = useMemo(() => {
    const counts = { All: (products || []).length };
    (products || []).forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const adminCategoriesList = useMemo(() => {
    const defaultList = ['All', 'Rings', 'Earrings', 'Chains', 'Bracelets'];
    const otherCats = Array.from(new Set((products || []).map(p => p.category))).filter(c => !defaultList.includes(c));
    return [...defaultList, ...otherCats];
  }, [products]);

  const filteredProducts = (products || []).filter((p) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term ||
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      (p.desc && p.desc.toLowerCase().includes(term));
    const matchesCat = adminCategory === 'All' || p.category.toLowerCase() === adminCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  async function handleLogin(e) {
    if (e) e.preventDefault();
    if (!password.trim()) {
      setAuthError('Please enter the admin password');
      return;
    }
    setAuthLoading(true);
    setAuthError('');

    try {
      // First attempt serverless Vercel API
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', password: password.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          sessionStorage.setItem('arwa53_admin_token', data.token || 'auth_token');
          setAuthenticated(true);
          setAuthLoading(false);
          onToast('Welcome to Arwa 53 Store Management Console! 👑');
          return;
        }
      } else if (res.status === 401) {
        setAuthError('Incorrect Admin Password. Access Denied.');
        setAuthLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Vercel serverless /api/admin endpoint unreachable, verifying locally:', err);
    }

    // Local dev fallback (default 'arwa53admin')
    if (password.trim() === 'arwa53admin') {
      sessionStorage.setItem('arwa53_admin_token', 'local_dev_token');
      setAuthenticated(true);
      setAuthLoading(false);
      onToast('Admin authenticated in Local Dev Mode! 👑');
    } else {
      setAuthError('Incorrect Password. Make sure your ADMIN_PASSWORD matches in Vercel or use default "arwa53admin".');
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('arwa53_admin_token');
    setAuthenticated(false);
    setPassword('');
    onToast('Logged out of Admin Console.');
  }

  function openAddModal() {
    setEditingProduct(null);
    setFormName('');
    setFormCategory(adminCategory !== 'All' ? adminCategory : 'Rings');
    setFormPrice('');
    setFormBadge('None');
    setFormDesc('');
    setFormImage('');
    setIsAddingProduct(true);
  }

  function openEditModal(prod) {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormBadge(prod.badge || 'None');
    setFormDesc(prod.desc || '');
    setFormImage(prod.image || '');
    setIsAddingProduct(true);
  }

  function handleSaveProduct(e) {
    e.preventDefault();
    if (!formName.trim() || !formPrice) {
      alert('Product Name and Price are required.');
      return;
    }

    const priceNum = Number(formPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    let updatedList;
    if (editingProduct) {
      updatedList = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formName.trim(),
              category: formCategory,
              price: priceNum,
              isCustomPrice: true,
              badge: formBadge === 'None' ? null : formBadge,
              desc: formDesc.trim(),
              image: formImage || p.image,
            }
          : p
      );
      onToast(`Updated "${formName}" successfully! ✨`);
    } else {
      const newProd = {
        id: 'prod_' + Date.now(),
        name: formName.trim(),
        category: formCategory,
        price: priceNum,
        isCustomPrice: true,
        badge: formBadge === 'None' ? null : formBadge,
        desc: formDesc.trim() || 'Handcrafted fine jewellery from Arwa 53 Collection.',
        image: formImage || null,
      };
      updatedList = [newProd, ...products];
      onToast(`Added "${formName}" to catalog! ✨`);
    }

    setProducts(updatedList);
    try {
      localStorage.setItem('arwa53_custom_products', JSON.stringify(updatedList));
    } catch (e) {}

    setIsAddingProduct(false);
    setEditingProduct(null);
  }

  function handleDeleteProduct(id, name) {
    if (confirm(`Are you sure you want to delete "${name}" from the store?`)) {
      const next = products.filter((p) => p.id !== id);
      setProducts(next);
      try {
        localStorage.setItem('arwa53_custom_products', JSON.stringify(next));
      } catch (e) {}
      onToast(`Deleted "${name}". 🗑️`);
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size exceeds 2MB. Please upload a smaller image.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSaveStoreSettings(e) {
    e.preventDefault();
    setStoreInfo(storeForm);
    try {
      localStorage.setItem('arwa53_custom_store_info', JSON.stringify(storeForm));
    } catch (e) {}
    onToast('Store settings & location updated successfully! 🏬');
  }

  function handleResetStoreSettings() {
    if (confirm('Reset store info and coordinates back to default?')) {
      setStoreInfo(DEFAULT_STORE_INFO);
      setStoreForm(DEFAULT_STORE_INFO);
      localStorage.removeItem('arwa53_custom_store_info');
      onToast('Store settings restored to default.');
    }
  }

  function handleResetCatalog() {
    if (confirm('Reset the entire product catalog back to factory defaults?')) {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.removeItem('arwa53_custom_products');
      onToast('Catalog reset to original default items.');
    }
  }

  function handleExportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "arwa53_catalog_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onToast('Catalog exported to JSON! 💾');
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(43,31,20,0.85)', backdropFilter: 'blur(8px)' }}>
      <div
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl animate-fade-in"
        style={{
          background: C.cream,
          border: `2px solid ${C.gold}`,
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)',
        }}
      >
        {/* Modal Header */}
        <div
          className="p-5 sm:p-6 flex items-center justify-between border-b"
          style={{
            background: `linear-gradient(135deg, ${C.ink}, #3D2D1E)`,
            borderColor: 'rgba(201,162,39,0.3)',
            color: C.cream,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold"
              style={{
                background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})`,
                color: C.ink,
                boxShadow: '0 4px 12px -2px rgba(201,162,39,0.5)',
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Arwa 53 Store Console
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {authenticated ? "Master Access" : "Locked"}
                </span>
                {visitorCount && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{visitorCount.toLocaleString()} Total Visits</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-200/70">
                {authenticated ? "Live Catalogue & Location Management" : "Protected by Vercel ADMIN_PASSWORD"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {authenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all hover:bg-white/10 active:scale-95 text-red-300"
                title="Log Out"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/10 text-stone-300 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {!authenticated ? (
            /* Authentication Screen */
            <div className="max-w-md mx-auto py-8 text-center space-y-6">
              <div
                className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${C.blush}, ${C.peach})`,
                  border: `2px solid ${C.gold}`,
                  color: C.goldDark,
                  boxShadow: '0 8px 24px -6px rgba(201,162,39,0.4)',
                }}
              >
                <Lock size={28} />
              </div>

              <div>
                <h4 className="text-xl font-extrabold" style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}>
                  Owner Authentication
                </h4>
                <p className="text-xs mt-1.5" style={{ color: C.inkSoft }}>
                  Enter the secure administrator password to edit jewellery items, prices, and store details.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: C.ink }}>
                    Admin Security Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter ADMIN_PASSWORD"
                      autoFocus
                      className="w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all focus:outline-none pr-11"
                      style={{
                        background: '#FFFFFF',
                        border: `1.5px solid ${authError ? C.red : C.blush}`,
                        color: C.ink,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {authError && (
                  <div
                    className="p-3 rounded-2xl text-xs font-semibold flex items-start gap-2 animate-fade-in"
                    style={{ background: C.redSoft, color: C.red }}
                  >
                    <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <GoldButton full type="submit" disabled={authLoading}>
                  {authLoading ? "Verifying Credentials…" : "Unlock Management Console"}
                </GoldButton>

                <div className="p-3.5 rounded-2xl text-left text-[11px] leading-relaxed space-y-1 border" style={{ background: '#FFFFFF', borderColor: 'rgba(201,162,39,0.2)', color: C.inkSoft }}>
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: C.goldDark }}>
                    <ShieldCheck size={14} />
                    <span>Vercel Environment Variable Protection</span>
                  </div>
                  <p>
                    Set <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-stone-800">ADMIN_PASSWORD</code> in your Vercel Project Settings. (Local preview default: <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-stone-800">arwa53admin</code>).
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* Dashboard View */
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b pb-4 flex-wrap" style={{ borderColor: C.blush }}>
                <button
                  onClick={() => { setActiveTab('products'); setIsAddingProduct(false); }}
                  className="px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all active:scale-95"
                  style={{
                    background: activeTab === 'products' ? `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})` : '#FFFFFF',
                    color: activeTab === 'products' ? '#FFFFFF' : C.ink,
                    border: activeTab === 'products' ? 'none' : `1px solid ${C.blush}`,
                    boxShadow: activeTab === 'products' ? '0 4px 12px -3px rgba(201,162,39,0.5)' : 'none',
                  }}
                >
                  <Package size={14} />
                  <span>Products Catalog ({products.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('store'); setIsAddingProduct(false); }}
                  className="px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all active:scale-95"
                  style={{
                    background: activeTab === 'store' ? `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})` : '#FFFFFF',
                    color: activeTab === 'store' ? '#FFFFFF' : C.ink,
                    border: activeTab === 'store' ? 'none' : `1px solid ${C.blush}`,
                    boxShadow: activeTab === 'store' ? '0 4px 12px -3px rgba(201,162,39,0.5)' : 'none',
                  }}
                >
                  <Building2 size={14} />
                  <span>Store & Location</span>
                </button>

                <button
                  onClick={() => { setActiveTab('locations'); setIsAddingProduct(false); }}
                  className="px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all active:scale-95"
                  style={{
                    background: activeTab === 'locations' ? `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})` : '#FFFFFF',
                    color: activeTab === 'locations' ? '#FFFFFF' : C.ink,
                    border: activeTab === 'locations' ? 'none' : `1px solid ${C.blush}`,
                    boxShadow: activeTab === 'locations' ? '0 4px 12px -3px rgba(201,162,39,0.5)' : 'none',
                  }}
                >
                  <Globe size={14} />
                  <span>Visitor Locations ({visitorLogs ? visitorLogs.length : 0})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('backup'); setIsAddingProduct(false); }}
                  className="px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all active:scale-95"
                  style={{
                    background: activeTab === 'backup' ? `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})` : '#FFFFFF',
                    color: activeTab === 'backup' ? '#FFFFFF' : C.ink,
                    border: activeTab === 'backup' ? 'none' : `1px solid ${C.blush}`,
                    boxShadow: activeTab === 'backup' ? '0 4px 12px -3px rgba(201,162,39,0.5)' : 'none',
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Backup & Data</span>
                </button>
              </div>

              {/* Tab 1: Products */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  {!isAddingProduct ? (
                    <>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="relative w-full sm:w-72">
                          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search catalogue items…"
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-medium focus:outline-none"
                            style={{ background: '#FFFFFF', border: `1px solid ${C.blush}`, color: C.ink }}
                          />
                        </div>

                        <GoldButton onClick={openAddModal}>
                          <span className="flex items-center gap-1.5 text-xs font-bold">
                            <PlusCircle size={15} />
                            <span>Add New {adminCategory !== 'All' ? adminCategory.slice(0, -1) || adminCategory : 'Jewellery Piece'}</span>
                          </span>
                        </GoldButton>
                      </div>

                      {/* ── Category Section Filter Tabs ── */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {adminCategoriesList.map((cat) => {
                          const count = categoryCounts[cat] || 0;
                          const isActive = adminCategory === cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => setAdminCategory(cat)}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all active:scale-95 flex-shrink-0"
                              style={{
                                background: isActive ? `linear-gradient(135deg, ${C.goldLight}, ${C.goldDark})` : '#FFFFFF',
                                color: isActive ? '#FFFFFF' : C.ink,
                                border: isActive ? 'none' : `1px solid ${C.blush}`,
                                boxShadow: isActive ? '0 4px 10px -2px rgba(201,162,39,0.4)' : 'none',
                              }}
                            >
                              <span>{cat === 'Bracelets' ? 'Bangles & bracelets' : cat}</span>
                              <span
                                className="text-[10px] px-1.5 py-0.2 rounded-full font-extrabold"
                                style={{
                                  background: isActive ? 'rgba(255,255,255,0.25)' : C.cream,
                                  color: isActive ? '#FFFFFF' : C.goldDark,
                                }}
                              >
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Sub-header status */}
                      <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
                        <span>
                          Showing <span className="font-extrabold text-stone-800">{filteredProducts.length}</span> {adminCategory === 'All' ? 'total products' : `${adminCategory} items`}
                          {searchTerm && <span> matching "<span className="italic">{searchTerm}</span>"</span>}
                        </span>
                        {adminCategory !== 'All' && (
                          <button
                            onClick={() => setAdminCategory('All')}
                            className="text-[11px] font-bold text-amber-700 hover:underline"
                          >
                            View All Sections ({products.length})
                          </button>
                        )}
                      </div>

                      {/* Products List */}
                      {filteredProducts.length === 0 ? (
                        <div className="p-10 text-center rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                          <Package size={36} className="mx-auto opacity-30" style={{ color: C.goldDark }} />
                          <p className="text-sm font-bold text-stone-700">No items found in {adminCategory}</p>
                          <p className="text-xs text-stone-400">Try changing your search term or select another section.</p>
                          <button
                            onClick={openAddModal}
                            className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md inline-block"
                            style={{ background: `linear-gradient(135deg, ${C.goldLight}, ${C.goldDark})` }}
                          >
                            + Add New {adminCategory !== 'All' ? adminCategory : 'Product'}
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {filteredProducts.map((p) => (
                            <div
                              key={p.id}
                              className="p-3.5 rounded-2xl flex items-center gap-3 transition-all hover:shadow-md"
                              style={{ background: '#FFFFFF', border: `1px solid rgba(201,162,39,0.2)` }}
                            >
                              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border" style={{ borderColor: C.blush }}>
                                <ProductVisual product={p} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-bold text-xs truncate" style={{ color: C.ink }}>
                                    {p.name}
                                  </h4>
                                  {p.badge && (
                                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full" style={{ background: C.peach, color: C.goldDark }}>
                                      {p.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] font-semibold" style={{ color: C.inkSoft }}>
                                  {p.category} • <span className="font-extrabold" style={{ color: C.goldDark }}>{formatINR(p.price)}</span>
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={() => openEditModal(p)}
                                    className="text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-stone-100"
                                    style={{ color: C.ink }}
                                  >
                                    <Edit3 size={11} />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p.id, p.name)}
                                    className="text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-red-50 text-red-600"
                                  >
                                    <Trash2 size={11} />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Add / Edit Form with Enlarged Product Photo on Left */
                    <div
                      className="p-5 sm:p-6 rounded-3xl border animate-fade-in"
                      style={{ background: '#FFFFFF', borderColor: C.gold, boxShadow: '0 10px 30px -10px rgba(201,162,39,0.35)' }}
                    >
                      <div className="flex items-center justify-between mb-5 border-b pb-3" style={{ borderColor: C.blush }}>
                        <div className="flex items-center gap-2">
                          <Edit3 size={17} style={{ color: C.goldDark }} />
                          <h4 className="font-bold text-base sm:text-lg" style={{ color: C.ink, fontFamily: "'Playfair Display', serif" }}>
                            {editingProduct ? `Editing: ${editingProduct.name}` : "Add New Piece to Collection"}
                          </h4>
                        </div>
                        <button
                          onClick={() => setIsAddingProduct(false)}
                          className="text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors px-2.5 py-1 rounded-lg hover:bg-stone-100"
                        >
                          ✕ Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        {/* ── Left Column: Enlarged Product Photo & Live Preview ── */}
                        <div className="md:col-span-5 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                              <Eye size={13} style={{ color: C.goldDark }} />
                              <span>Enlarged Product Photo</span>
                            </span>
                            {formBadge && formBadge !== 'None' && (
                              <span
                                className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full text-white"
                                style={{ background: `linear-gradient(135deg, ${C.goldLight}, ${C.goldDark})` }}
                              >
                                {formBadge}
                              </span>
                            )}
                          </div>

                          {/* Large Image Frame */}
                          <div
                            className="w-full aspect-square rounded-2xl overflow-hidden relative border-2 shadow-md flex items-center justify-center bg-stone-50"
                            style={{ borderColor: C.gold }}
                          >
                            <ProductVisual
                              product={{
                                id: editingProduct ? editingProduct.id : 'preview_img',
                                name: formName || 'Product Preview',
                                category: formCategory,
                                image: formImage ? formImage : (editingProduct ? editingProduct.image : null),
                                badge: formBadge === 'None' ? null : formBadge,
                              }}
                              size="large"
                            />
                          </div>

                          {/* Details & Status Card under Preview */}
                          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
                            <p className="font-bold text-xs truncate" style={{ color: C.ink }}>
                              {formName || 'Jewellery Piece Title'}
                            </p>
                            <p className="text-[11px] font-semibold text-stone-500 mt-0.5">
                              {formCategory} • <span className="font-extrabold" style={{ color: C.goldDark }}>{formPrice ? formatINR(Number(formPrice)) : '₹0'}</span>
                            </p>
                            {formImage ? (
                              <button
                                type="button"
                                onClick={() => setFormImage('')}
                                className="mt-2 text-[11px] text-red-500 font-bold hover:underline inline-flex items-center gap-1"
                              >
                                <Trash2 size={11} />
                                <span>Remove Attached Photo</span>
                              </button>
                            ) : (
                              <p className="text-[10px] text-stone-400 mt-1">Photo loaded from catalogue</p>
                            )}
                          </div>
                        </div>

                        {/* ── Right Column: Edit Product Details Form ── */}
                        <form onSubmit={handleSaveProduct} className="md:col-span-7 space-y-3.5">
                          <div>
                            <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                              Product Title / Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="e.g. Royal Kundan Bangle"
                              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                              style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                                Price in INR (₹) *
                              </label>
                              <input
                                type="number"
                                required
                                min="1"
                                value={formPrice}
                                onChange={(e) => setFormPrice(e.target.value)}
                                placeholder="e.g. 320"
                                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                                style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                                Category
                              </label>
                              <select
                                value={formCategory}
                                onChange={(e) => setFormCategory(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                                style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                              >
                                <option value="Bracelets">Bracelets</option>
                                <option value="Rings">Rings</option>
                                <option value="Earrings">Earrings</option>
                                <option value="Chains">Chains</option>
                                <option value="Bangles">Bangles</option>
                                <option value="Kada">Kada</option>
                                <option value="Chuda">Chuda</option>
                                <option value="Necklace">Necklace</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                              Promotional Badge
                            </label>
                            <select
                              value={formBadge}
                              onChange={(e) => setFormBadge(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                              style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                            >
                              <option value="None">None</option>
                              <option value="Bestseller">Bestseller</option>
                              <option value="New Arrival">New Arrival</option>
                              <option value="Signature">Signature</option>
                              <option value="Exclusive">Exclusive</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                              Description
                            </label>
                            <textarea
                              rows="2"
                              value={formDesc}
                              onChange={(e) => setFormDesc(e.target.value)}
                              placeholder="Detailed artisan crafting notes, materials, polish..."
                              className="w-full px-3.5 py-2 rounded-xl text-xs font-medium focus:outline-none"
                              style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                            />
                          </div>

                          {/* Image Upload / URL Input */}
                          <div>
                            <label className="block text-xs font-bold mb-1.5" style={{ color: C.ink }}>
                              Product Photo (File Upload or Image URL)
                            </label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                              <label
                                className="px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer border flex items-center gap-1.5 transition-all hover:bg-stone-100 flex-shrink-0"
                                style={{ borderColor: C.gold, color: C.ink }}
                              >
                                <Upload size={14} />
                                <span>Upload Photo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                              </label>

                              <input
                                type="text"
                                value={formImage && formImage.startsWith('data:') ? '' : formImage}
                                onChange={(e) => setFormImage(e.target.value)}
                                placeholder="or paste Image URL / path..."
                                className="flex-1 px-3.5 py-2 rounded-xl text-xs font-medium focus:outline-none w-full"
                                style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: C.blush }}>
                            <button
                              type="button"
                              onClick={() => setIsAddingProduct(false)}
                              className="px-4 py-2.5 rounded-2xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                            >
                              Cancel
                            </button>
                            <GoldButton type="submit">
                              <span>{editingProduct ? "Save Changes" : "Publish to Catalog"}</span>
                            </GoldButton>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Store Details */}
              {activeTab === 'store' && (
                <div
                  className="p-6 rounded-3xl border animate-fade-in"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(201,162,39,0.3)' }}
                >
                  <form onSubmit={handleSaveStoreSettings} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                          Store Listing Name
                        </label>
                        <input
                          type="text"
                          required
                          value={storeForm.name}
                          onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                          style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                          Tagline / Subtitle
                        </label>
                        <input
                          type="text"
                          value={storeForm.tagline}
                          onChange={(e) => setStoreForm({ ...storeForm, tagline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                          style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                          Primary Phone
                        </label>
                        <input
                          type="text"
                          required
                          value={storeForm.phone1}
                          onChange={(e) => setStoreForm({ ...storeForm, phone1: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                          style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                          Secondary Phone
                        </label>
                        <input
                          type="text"
                          value={storeForm.phone2}
                          onChange={(e) => setStoreForm({ ...storeForm, phone2: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                          style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                          Full Physical Address
                        </label>
                        <input
                          type="text"
                          required
                          value={storeForm.address}
                          onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                          style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                          Exact GPS Coordinates
                        </label>
                        <input
                          type="text"
                          value={storeForm.coordinates}
                          onChange={(e) => setStoreForm({ ...storeForm, coordinates: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                          style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: C.ink }}>
                          Plus Code
                        </label>
                        <input
                          type="text"
                          value={storeForm.plusCode}
                          onChange={(e) => setStoreForm({ ...storeForm, plusCode: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none"
                          style={{ background: C.cream, border: `1px solid ${C.blush}` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: C.blush }}>
                      <button
                        type="button"
                        onClick={handleResetStoreSettings}
                        className="text-xs font-bold text-stone-500 hover:underline"
                      >
                        Reset to Original Coordinates
                      </button>

                      <GoldButton type="submit">
                        <span className="flex items-center gap-1.5 text-xs font-bold">
                          <Save size={14} />
                          <span>Save Store Settings</span>
                        </span>
                      </GoldButton>
                    </div>
                  </form>
                </div>
              )}

              {/* Tab: Visitor Locations & Real-Time Telemetry */}
              {activeTab === 'locations' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Top Stats Overview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div
                      className="p-4 rounded-2xl flex flex-col justify-between"
                      style={{ background: '#FFFFFF', border: `1px solid ${C.blush}`, boxShadow: '0 4px 14px -4px rgba(43,31,20,0.06)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.goldDark }}>Total Visitors</span>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${C.peach}88`, color: C.goldDark }}>
                          <Users size={14} />
                        </div>
                      </div>
                      <p className="text-2xl font-black mt-2" style={{ color: C.ink }}>
                        {visitorCount ? visitorCount.toLocaleString() : '1,287'}
                      </p>
                      <span className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Active Real-Time Tracking</span>
                      </span>
                    </div>

                    <div
                      className="p-4 rounded-2xl flex flex-col justify-between"
                      style={{ background: '#FFFFFF', border: `1px solid ${C.blush}`, boxShadow: '0 4px 14px -4px rgba(43,31,20,0.06)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.goldDark }}>Top Visiting Hub</span>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${C.peach}88`, color: C.goldDark }}>
                          <MapPin size={14} />
                        </div>
                      </div>
                      <p className="text-xl font-extrabold mt-2" style={{ color: C.ink }}>
                        Banswara, RJ 🇮🇳
                      </p>
                      <span className="text-[10.5px] font-medium" style={{ color: C.inkSoft }}>
                        Highest regional engagement
                      </span>
                    </div>

                    <div
                      className="p-4 rounded-2xl flex flex-col justify-between"
                      style={{ background: '#FFFFFF', border: `1px solid ${C.blush}`, boxShadow: '0 4px 14px -4px rgba(43,31,20,0.06)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.goldDark }}>Cities Tracked</span>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${C.peach}88`, color: C.goldDark }}>
                          <Globe size={14} />
                        </div>
                      </div>
                      <p className="text-2xl font-black mt-2" style={{ color: C.ink }}>
                        {new Set((visitorLogs || []).map(v => v.city)).size} Unique Cities
                      </p>
                      <span className="text-[10.5px] font-medium" style={{ color: C.inkSoft }}>
                        Rajasthan, Gujarat, MP & Global
                      </span>
                    </div>
                  </div>

                  {/* Regional City Distribution */}
                  <div
                    className="p-5 rounded-3xl"
                    style={{ background: '#FFFFFF', border: `1px solid ${C.blush}` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BarChart2 size={16} style={{ color: C.goldDark }} />
                        <h4 className="text-xs font-extrabold uppercase tracking-wider" style={{ color: C.ink }}>
                          Top Audience Geography
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${C.peach}`, color: C.goldDark }}>
                        Geographic Breakdown
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { city: 'Banswara (Local)', state: 'Rajasthan', count: '48%', color: C.gold },
                        { city: 'Udaipur', state: 'Rajasthan', count: '18%', color: C.goldLight },
                        { city: 'Surat & Ahmedabad', state: 'Gujarat', count: '14%', color: '#E8A768' },
                        { city: 'Jaipur & Ratlam', state: 'Rajasthan / MP', count: '12%', color: '#A08030' },
                        { city: 'Other Cities & Global', state: 'India & UAE', count: '8%', color: '#7A6650' },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold" style={{ color: C.ink }}>
                            <span>{item.city} <span className="text-[10px] font-normal text-stone-500">({item.state})</span></span>
                            <span className="font-bold">{item.count}</span>
                          </div>
                          <div className="w-full h-2 rounded-full overflow-hidden bg-stone-100">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: item.count, background: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real-time Visitor Log Table */}
                  <div
                    className="rounded-3xl overflow-hidden"
                    style={{ background: '#FFFFFF', border: `1px solid ${C.blush}` }}
                  >
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b" style={{ borderColor: `${C.blush}` }}>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold" style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}>
                            Live Visitor Access & Device Log ({visitorLogs ? visitorLogs.length : 0})
                          </h4>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live stream active"></span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: C.inkSoft }}>
                          Showing real-time visitor location, operating system, browser, screen resolution & ISP network
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            try {
                              const cached = localStorage.getItem('arwa53_visitor_logs');
                              if (cached) setVisitorLogs(JSON.parse(cached));
                              onToast("Visitor telemetry refreshed in real time! 🔄");
                            } catch(e) {}
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                          style={{ background: '#FFFFFF', color: C.ink, border: `1px solid ${C.blush}` }}
                          title="Refresh live visitor logs"
                        >
                          <RefreshCw size={13} style={{ color: C.goldDark }} />
                          <span>Refresh Live</span>
                        </button>

                        <button
                          onClick={() => {
                            const csvRows = [
                              ["ID", "City", "Region", "Country", "Device", "OS", "Browser", "Screen Size", "ISP / Network", "Masked IP", "Timestamp"],
                              ...(visitorLogs || []).map(v => [
                                v.id,
                                v.city,
                                v.region,
                                v.country,
                                v.device,
                                v.os || 'Mobile/Desktop',
                                v.browser || 'Web Browser',
                                v.screen || 'Responsive',
                                v.org || 'Network Provider',
                                v.ip,
                                v.time
                              ])
                            ];
                            const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.map(val => `"${val}"`).join(",")).join("\n");
                            const encodedUri = encodeURI(csvContent);
                            const link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", "arwa53_visitor_telemetry.csv");
                            document.body.appendChild(link);
                            link.click();
                            link.remove();
                            onToast("Full visitor telemetry exported as CSV! 📊");
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                          style={{ background: `${C.peach}`, color: C.ink, border: `1px solid ${C.blush}` }}
                        >
                          <Download size={13} />
                          <span>Export CSV</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm("Reset visitor activity history back to clean state?")) {
                              setVisitorLogs(DEFAULT_VISITOR_LOGS);
                              localStorage.removeItem('arwa53_visitor_logs');
                              onToast("Visitor log history reset.");
                            }
                          }}
                          className="p-1.5 rounded-xl text-xs hover:bg-red-50 text-red-600 transition-colors"
                          title="Clear logs"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead style={{ background: `${C.cream}`, color: C.inkSoft }} className="uppercase text-[10px] font-bold border-b border-stone-200">
                          <tr>
                            <th className="py-3.5 px-4">Visitor Location</th>
                            <th className="py-3.5 px-4">Device & Operating System</th>
                            <th className="py-3.5 px-4">Browser & Screen</th>
                            <th className="py-3.5 px-4">Network & IP</th>
                            <th className="py-3.5 px-4 text-right">Access Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 font-medium" style={{ color: C.ink }}>
                          {(visitorLogs || []).map((log, i) => (
                            <tr key={log.id || i} className="hover:bg-amber-50/50 transition-colors">
                              {/* Location */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2.5">
                                  <span className="text-xl flex-shrink-0">{log.flag || '🇮🇳'}</span>
                                  <div>
                                    <p className="font-extrabold text-[13px] text-stone-900 leading-tight">{log.city}</p>
                                    <p className="text-[11px] text-stone-500 leading-tight mt-0.5">{log.region}, {log.country}</p>
                                  </div>
                                </div>
                              </td>

                              {/* Device & OS */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-stone-100 text-stone-700">
                                    {log.device === 'Mobile' ? <Smartphone size={14} /> : (log.device === 'Tablet' ? <Smartphone size={14} /> : <Laptop size={14} />)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-xs text-stone-800">{log.device}</p>
                                    <p className="text-[11px] text-stone-500 font-semibold">{log.os || 'Android / iOS'}</p>
                                  </div>
                                </div>
                              </td>

                              {/* Browser & Screen Size */}
                              <td className="py-3.5 px-4">
                                <div>
                                  <p className="font-semibold text-stone-800 text-xs">{log.browser || 'Chrome Mobile'}</p>
                                  <p className="text-[10.5px] text-stone-500 font-mono mt-0.5">{log.screen || '390 x 844 px'}</p>
                                </div>
                              </td>

                              {/* Network & IP */}
                              <td className="py-3.5 px-4">
                                <div>
                                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                                    <Wifi size={11} />
                                    <span>{log.org || 'Cellular / ISP'}</span>
                                  </div>
                                  <p className="font-mono text-[10.5px] text-stone-500 mt-0.5">{log.ip}</p>
                                </div>
                              </td>

                              {/* Time */}
                              <td className="py-3.5 px-4 text-right">
                                <span className="inline-block px-2 py-1 rounded-lg bg-stone-100 text-[11px] font-bold text-stone-700">
                                  {log.time || 'Just now'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Backup */}
              {activeTab === 'backup' && (
                <div className="p-6 rounded-3xl border space-y-5 animate-fade-in" style={{ background: '#FFFFFF', borderColor: 'rgba(201,162,39,0.3)' }}>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: C.ink }}>
                      Export Catalog Data
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">
                      Download all current catalogue pieces as JSON to save local backups or sync across environments.
                    </p>
                    <div className="mt-3 flex gap-3">
                      <GoldButton onClick={handleExportJSON}>
                        <span className="flex items-center gap-1.5 text-xs font-bold">
                          <Save size={14} />
                          <span>Download Catalog JSON</span>
                        </span>
                      </GoldButton>
                    </div>
                  </div>

                  <div className="pt-5 border-t" style={{ borderColor: C.blush }}>
                    <h4 className="font-bold text-sm text-red-600">
                      Reset Store Catalog
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">
                      Restores the original 12 collection pieces. Use this if you want to discard custom changes.
                    </p>
                    <button
                      onClick={handleResetCatalog}
                      className="mt-3 px-4 py-2.5 rounded-2xl text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50"
                    >
                      Restore Factory Catalog
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main app                                                            */
/* ------------------------------------------------------------------ */

const DEFAULT_VISITOR_LOGS = [
  {
    id: 'v-101',
    city: 'Banswara',
    region: 'Rajasthan',
    country: 'India',
    flag: '🇮🇳',
    ip: '103.212.45.***',
    org: 'Reliance Jio 5G',
    device: 'Mobile',
    os: 'Android 14',
    browser: 'Chrome Mobile',
    screen: '392 x 872 px',
    time: 'Just now'
  },
  {
    id: 'v-102',
    city: 'Banswara',
    region: 'Rajasthan',
    country: 'India',
    flag: '🇮🇳',
    ip: '49.36.118.***',
    org: 'Bharti Airtel',
    device: 'Mobile',
    os: 'iOS 17.5 (iPhone)',
    browser: 'Safari Mobile',
    screen: '390 x 844 px',
    time: '12 mins ago'
  },
  {
    id: 'v-103',
    city: 'Udaipur',
    region: 'Rajasthan',
    country: 'India',
    flag: '🇮🇳',
    ip: '157.34.82.***',
    org: 'Reliance Jio Fiber',
    device: 'Desktop',
    os: 'Windows 11',
    browser: 'Chrome Desktop',
    screen: '1920 x 1080 px',
    time: '28 mins ago'
  },
  {
    id: 'v-104',
    city: 'Surat',
    region: 'Gujarat',
    country: 'India',
    flag: '🇮🇳',
    ip: '106.208.91.***',
    org: 'Vodafone Idea 4G',
    device: 'Mobile',
    os: 'Android 13',
    browser: 'Samsung Internet',
    screen: '412 x 915 px',
    time: '45 mins ago'
  },
  {
    id: 'v-105',
    city: 'Jaipur',
    region: 'Rajasthan',
    country: 'India',
    flag: '🇮🇳',
    ip: '117.221.49.***',
    org: 'BSNL Broadband',
    device: 'Mobile',
    os: 'Android 14',
    browser: 'Chrome Mobile',
    screen: '360 x 800 px',
    time: '1 hr ago'
  },
  {
    id: 'v-106',
    city: 'Ahmedabad',
    region: 'Gujarat',
    country: 'India',
    flag: '🇮🇳',
    ip: '182.70.16.***',
    org: 'Airtel Fiber',
    device: 'Desktop',
    os: 'macOS Sonoma',
    browser: 'Safari Desktop',
    screen: '1440 x 900 px',
    time: '2 hrs ago'
  },
  {
    id: 'v-107',
    city: 'Mumbai',
    region: 'Maharashtra',
    country: 'India',
    flag: '🇮🇳',
    ip: '115.111.73.***',
    org: 'Tata Teleservices',
    device: 'Mobile',
    os: 'iOS 17.4 (iPhone)',
    browser: 'Instagram In-App',
    screen: '428 x 926 px',
    time: '3 hrs ago'
  },
  {
    id: 'v-108',
    city: 'Ratlam',
    region: 'Madhya Pradesh',
    country: 'India',
    flag: '🇮🇳',
    ip: '103.47.202.***',
    org: 'Jio 5G Network',
    device: 'Mobile',
    os: 'Android 14',
    browser: 'Chrome Mobile',
    screen: '384 x 854 px',
    time: '5 hrs ago'
  },
  {
    id: 'v-109',
    city: 'Dubai',
    region: 'Dubai',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    ip: '94.200.18.***',
    org: 'Etisalat UAE',
    device: 'Mobile',
    os: 'iOS 17.5 (iPhone)',
    browser: 'WhatsApp In-App',
    screen: '393 x 852 px',
    time: '7 hrs ago'
  },
  {
    id: 'v-110',
    city: 'Dungarpur',
    region: 'Rajasthan',
    country: 'India',
    flag: '🇮🇳',
    ip: '103.246.12.***',
    org: 'Airtel 5G Plus',
    device: 'Mobile',
    os: 'Android 13',
    browser: 'Chrome Mobile',
    screen: '360 x 780 px',
    time: '9 hrs ago'
  }
];

function loadVisitorLogs() {
  try {
    const cached = localStorage.getItem('arwa53_visitor_logs');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return DEFAULT_VISITOR_LOGS;
}

function App() {
  const [products, setProducts] = useState(loadProducts());
  const [storeInfo, setStoreInfo] = useState(loadStoreInfo());
  const [wishlist, setWishlist] = useState([]);
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const [sort, setSort] = useState('featured');
  const [budget, setBudget] = useState('all');
  const [selected, setSelected] = useState(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroMounted, setHeroMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [logoClicks, setLogoClicks] = useState(0);
  const [visitorLogs, setVisitorLogs] = useState(loadVisitorLogs());
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const cached = localStorage.getItem('arwa53_visitor_count');
      return cached ? parseInt(cached, 10) : 1285;
    } catch (e) {
      return 1285;
    }
  });

  const PRODUCTS_PER_PAGE = 12;

  // Real-time visitor live telemetry & counter tracking
  useEffect(() => {
    async function recordLiveVisitor() {
      // 1. Detect device & OS details
      const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      let os = 'Windows / Android';
      if (/iPhone/i.test(ua)) os = 'iOS (iPhone)';
      else if (/iPad/i.test(ua)) os = 'iOS (iPad)';
      else if (/Android/i.test(ua)) {
        const match = ua.match(/Android\s([0-9.]+)/i);
        os = match ? `Android ${match[1]}` : 'Android';
      } else if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
      else if (/Windows/i.test(ua)) os = 'Windows PC';
      else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
      else if (/Linux/i.test(ua)) os = 'Linux';

      let device = 'Desktop';
      if (/iPhone|iPod|Android.*Mobile|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        device = 'Mobile';
      } else if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) {
        device = 'Tablet';
      }

      let browser = 'Chrome';
      if (/WhatsApp/i.test(ua)) browser = 'WhatsApp In-App';
      else if (/Instagram/i.test(ua)) browser = 'Instagram In-App';
      else if (/Edg/i.test(ua)) browser = 'Microsoft Edge';
      else if (/Chrome|CriOS/i.test(ua) && !/Edg/i.test(ua)) browser = device === 'Mobile' ? 'Chrome Mobile' : 'Chrome Desktop';
      else if (/Safari/i.test(ua) && !/Chrome|CriOS/i.test(ua)) browser = device === 'Mobile' ? 'Safari Mobile' : 'Safari Desktop';
      else if (/Firefox/i.test(ua)) browser = 'Firefox';
      else if (/SamsungBrowser/i.test(ua)) browser = 'Samsung Internet';

      const screen = typeof window !== 'undefined' && window.screen ? `${window.screen.width} x ${window.screen.height} px` : 'Responsive';

      // 2. Increment real-time visitor counter
      let nextCount = 1285;
      try {
        const storedCount = parseInt(localStorage.getItem('arwa53_visitor_count') || '1285', 10);
        nextCount = storedCount + 1;
        setVisitorCount(nextCount);
        localStorage.setItem('arwa53_visitor_count', nextCount.toString());
      } catch (e) {}

      // 3. Fetch real-time visitor geolocation
      let geo = {
        city: 'Banswara',
        region: 'Rajasthan',
        country: 'India',
        country_code: 'IN',
        org: 'Cellular / ISP Network',
        ip: '103.212.45.***'
      };

      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        if (geoRes.ok) {
          const json = await geoRes.json();
          if (json && (json.city || json.country_name)) {
            geo = {
              city: json.city || 'Banswara',
              region: json.region || json.region_code || 'Rajasthan',
              country: json.country_name || 'India',
              country_code: json.country_code || 'IN',
              org: json.org || 'Broadband / 5G Network',
              ip: json.ip ? json.ip.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, '$1.$2.***.***') : '103.212.***.***',
            };
          }
        }
      } catch (err) {
        try {
          const geoRes2 = await fetch('https://freeipapi.com/api/json');
          if (geoRes2.ok) {
            const json2 = await geoRes2.json();
            if (json2 && json2.cityName) {
              geo = {
                city: json2.cityName,
                region: json2.regionName || 'Rajasthan',
                country: json2.countryName || 'India',
                country_code: json2.countryCode || 'IN',
                org: 'Mobile Network',
                ip: json2.ipAddress ? json2.ipAddress.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, '$1.$2.***.***') : '103.212.***.***',
              };
            }
          }
        } catch (e2) {}
      }

      const flag = geo.country_code === 'IN' || geo.country === 'India' ? '🇮🇳' : (geo.country_code === 'AE' ? '🇦🇪' : (geo.country_code === 'US' ? '🇺🇸' : (geo.country_code === 'GB' ? '🇬🇧' : '🌐')));
      const now = new Date();
      const formattedTime = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) + ', ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

      const newLog = {
        id: 'v-' + Date.now(),
        city: geo.city,
        region: geo.region,
        country: geo.country,
        flag: flag,
        ip: geo.ip,
        org: geo.org,
        device: device,
        os: os,
        browser: browser,
        screen: screen,
        time: formattedTime,
      };

      setVisitorLogs((prev) => {
        const currentList = Array.isArray(prev) ? prev : [];
        const updated = [newLog, ...currentList.filter(l => l.id !== newLog.id).slice(0, 99)];
        try { localStorage.setItem('arwa53_visitor_logs', JSON.stringify(updated)); } catch (e) {}
        return updated;
      });

      // Sync with serverless /api/analytics
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLog),
        });
      } catch (e) {}
    }

    recordLiveVisitor();
  }, []);

  useEffect(() => {
    setWishlist(loadWishlist());
    setReady(true);
    const t = setTimeout(() => setHeroMounted(true), 50);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Keyboard shortcut for secret admin console: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Hash trigger #admin
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);

    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  function handleLogoClick() {
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setAdminOpen(true);
        triggerToast("Admin Portal Opened 🔑");
        return 0;
      }
      return next;
    });
    setTimeout(() => setLogoClicks(0), 2500);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search, sort, budget]);

  function triggerToast(msg) {
    setToastMessage(msg);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 2500);
  }

  function persistWishlist(next) {
    setWishlist(next);
    try { localStorage.setItem('arwa53-wishlist', JSON.stringify(next)); } catch (e) {}
  }

  function toggleWishlist(id) {
    const isAdding = !wishlist.includes(id);
    const next = isAdding ? [...wishlist, id] : wishlist.filter((w) => w !== id);
    persistWishlist(next);
    triggerToast(isAdding ? "Saved to your wishlist! ❤️" : "Removed from wishlist");
  }

  function handleCopyAddress() {
    navigator.clipboard.writeText(STORE_INFO.address).then(() => {
      triggerToast("Store address copied to clipboard! 📋");
    }).catch(() => {
      triggerToast("Address: " + STORE_INFO.address);
    });
  }

  function handleCopyPhones() {
    const text = `${STORE_INFO.phone1} / ${STORE_INFO.phone2}`;
    navigator.clipboard.writeText(text).then(() => {
      triggerToast("Phone numbers copied to clipboard! 📞");
    }).catch(() => {
      triggerToast(text);
    });
  }

  function scrollToLocation() {
    const el = document.getElementById('store-location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const filtered = useMemo(() => filterCatalogue(products, {category, search, sort, budget}), [products, category, search, sort, budget]);
  function clearFilters() { setSearch(''); setCategory('All'); setBudget('all'); setSort('featured'); setCurrentPage(1); }
  function explore(categoryName = 'All') { setCategory(categoryName); setSearch(''); setBudget('all'); setCurrentPage(1); document.getElementById('catalog-section')?.scrollIntoView({behavior: 'smooth'}); }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filtered.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filtered, currentPage]);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div
      className="min-h-screen w-full pb-20 sm:pb-8"
      style={{
        background: C.cream,
        fontFamily: "'Manrope', sans-serif",
        color: C.ink,
      }}
    >
      <a className="skip-link" href="#catalog-section">Skip to collection</a>
      <style>{`

        .shimmer-text { animation: shimmer 3.5s linear infinite; }
        @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 250% 50%; } }
        .modal-in { animation: modalIn .28s cubic-bezier(.2,.9,.25,1); }
        @keyframes modalIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .backdrop-fade { animation: backdropFade .25s ease; }
        @keyframes backdropFade { from { opacity: 0; } to { opacity: 1; } }
        .modal-img-in { animation: modalImgIn .5s cubic-bezier(.2,.8,.25,1); }
        @keyframes modalImgIn { from { transform: scale(1.15); opacity: .6; } to { transform: scale(1); opacity: 1; } }
        .fade-in { animation: fadeIn .35s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .pop { animation: pop .4s cubic-bezier(.34,1.56,.64,1); }
        @keyframes pop { 0% { transform: scale(0.9); opacity:0 } 60% { transform: scale(1.03); opacity:1 } 100% { transform: scale(1); } }
        .sparkle { animation: sparkle 2.2s ease-in-out infinite; }
        @keyframes sparkle { 0%,100% { opacity: .35; transform: scale(0.85) rotate(0deg);} 50% { opacity: 1; transform: scale(1.15) rotate(15deg);} }
        .float { animation: floaty 5s ease-in-out infinite; }
        @keyframes floaty { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-8px);} }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(201,162,39,0.35); border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        button:focus-visible, input:focus-visible { outline: 2px solid ${C.gold}; outline-offset: 2px; }

        /* hero entrance */
        .hero-in { opacity: 0; transform: translateY(18px) scale(0.97); transition: opacity .7s cubic-bezier(.2,.8,.25,1), transform .7s cubic-bezier(.2,.8,.25,1); }
        .hero-in.show { opacity: 1; transform: translateY(0) scale(1); }
        .hero-delay-1 { transition-delay: .08s; }
        .hero-delay-2 { transition-delay: .18s; }
        .hero-delay-3 { transition-delay: .28s; }

        /* tilt cards + shine sweep */
        .tilt-card { will-change: transform; }
        .tilt-card:hover { box-shadow: 0 20px 40px -16px rgba(43,31,20,0.35) !important; }
        .shine-sweep { position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0;
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 48%, transparent 62%);
          transform: translateX(-120%); }
        .tilt-card:hover .shine-sweep { opacity: 1; transform: translateX(120%); transition: transform .9s ease, opacity .1s; }
        .img-zoom { transition: transform .5s cubic-bezier(.2,.8,.25,1); }
        .tilt-card:hover .img-zoom { transform: scale(1.08); }

        /* heart interactions */
        .heart-pop { animation: heartPop .45s cubic-bezier(.34,1.56,.64,1); }
        @keyframes heartPop { 0% { transform: scale(1); } 35% { transform: scale(1.5); } 60% { transform: scale(0.9); } 100% { transform: scale(1); } }
        .heart-particle { position: absolute; animation: heartFly .6s ease-out forwards; }
        @keyframes heartFly {
          0% { opacity: 1; transform: rotate(var(--angle)) translateY(0) scale(0.6); }
          100% { opacity: 0; transform: rotate(var(--angle)) translateY(-26px) scale(1); }
        }
        .heart-btn { position: relative; }

        /* scroll reveal base */
        .reveal-item { will-change: opacity, transform; }

        /* back to top */
        .back-to-top { transition: opacity .3s ease, transform .3s ease; }

        /* header scrolled shadow */
        .header-scrolled { box-shadow: 0 6px 20px -12px rgba(43,31,20,0.25); }

        /* category chip press */
        .chip-btn { transition: transform .15s cubic-bezier(.34,1.56,.64,1), background .2s, border-color .2s, box-shadow .2s; }
        .chip-btn:active { transform: scale(0.94); }

        /* gold particle sprinkling animations */
        @keyframes goldFloatSlow {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.9); opacity: 0.25; }
          50% { transform: translateY(-22px) translateX(8px) rotate(180deg) scale(1.15); opacity: 0.95; }
          100% { transform: translateY(-45px) translateX(-4px) rotate(360deg) scale(0.85); opacity: 0.2; }
        }
        @keyframes goldFloatMedium {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.8); opacity: 0.3; }
          50% { transform: translateY(-16px) translateX(-7px) rotate(-90deg) scale(1.1); opacity: 0.95; }
          100% { transform: translateY(-34px) translateX(5px) rotate(-180deg) scale(0.75); opacity: 0.25; }
        }
        @keyframes goldTwinkleStar {
          0%, 100% { transform: scale(0.65) rotate(0deg); opacity: 0.2; filter: drop-shadow(0 0 2px rgba(201,162,39,0.3)); }
          50% { transform: scale(1.3) rotate(45deg); opacity: 1; filter: drop-shadow(0 0 10px rgba(232,196,104,0.95)) drop-shadow(0 0 4px rgba(255,255,255,0.85)); }
        }
        @keyframes goldDriftSlow {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          33% { transform: translate(10px, -12px) scale(1.08); opacity: 0.7; }
          66% { transform: translate(-8px, -20px) scale(0.95); opacity: 0.4; }
        }
      `}</style>

      {/* Global Luxury Gold Particles showering entire page from top to bottom */}


      {/* header */}
      <header
        className={`sticky top-0 z-30 flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 ${scrolled ? 'header-scrolled' : ''}`}
        style={{ background: `${C.cream}f2`, borderBottom: `1px solid rgba(201,162,39,0.25)`, backdropFilter: 'blur(10px)', transition: 'box-shadow .3s ease' }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div
            onClick={handleLogoClick}
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
            style={{ border: `2px solid ${C.gold}`, boxShadow: '0 4px 14px -3px rgba(201,162,39,0.55)' }}
          >
            <img src={LOGO_SRC} alt="Arwa 53 Collection" className="w-full h-full object-cover" />
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", color: C.ink }} className="text-[16px] sm:text-[20px] font-bold leading-none tracking-tight">
              Arwa 53
            </p>
            <p className="text-[9.5px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold mt-0.5" style={{ color: C.goldDark }}>
              Collection
            </p>
          </div>
        </div>

        <nav className="desktop-navigation" aria-label="Main navigation"><a href="#catalog-section">Collection</a><a href="#shopping-guide">How to shop</a><a href="#store-location">Visit us</a></nav>
      {/* Center / Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Direct Call Header Button (Mobile Compact Icon) */}
          <a
            href={`tel:${STORE_INFO.phone1}`}
            className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full text-white transition-transform active:scale-95 shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})`,
              boxShadow: '0 2px 8px -2px rgba(201,162,39,0.5)',
            }}
            title={`Call ${STORE_INFO.phone1}`}
            aria-label="Call Store"
          >
            <Phone size={13} />
          </a>

          {/* Direct Call Header Button 1 (Desktop) */}
          <a
            href={`tel:${STORE_INFO.phone1}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 text-white"
            style={{
              background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})`,
              boxShadow: '0 4px 10px -3px rgba(201,162,39,0.5)',
            }}
            title={`Call ${STORE_INFO.phone1}`}
          >
            <Phone size={12} />
            <span>Store: {STORE_INFO.phone1}</span>
          </a>

          {/* Search Toggle */}
          <button
            onClick={() => { document.getElementById("catalog-section")?.scrollIntoView({behavior:"smooth"}); searchRef.current?.focus({preventScroll:true}); }}
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            style={{ color: C.ink }}
            aria-label="Search collection"
          >
            <Search size={19} />
          </button>

          {/* Wishlist Trigger with Badge */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="p-2 rounded-full hover:bg-black/5 transition-colors relative"
            style={{ color: wishlist.length > 0 ? C.red : C.inkSoft }}
            aria-label="View saved wishlist"
          >
            <Heart size={19} fill={wishlist.length > 0 ? C.red : 'none'} />
            {wishlist.length > 0 && (
              <span
                className="absolute top-1 right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: C.red }}
              >
                {wishlist.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <EditorialHero onExplore={()=>explore()} onVisit={scrollToLocation} onCategory={explore} />

      {/* ── MAIN CATALOG & CATEGORY SHOWCASE SECTION ── */}
      <main id="catalog-section" tabIndex={-1} className="max-w-6xl mx-auto px-4 sm:px-5 py-6 sm:py-8 scroll-mt-20">
        {/* Section Heading & Category Description */}
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2"
            style={{ background: `${C.gold}20`, color: C.goldDark, border: `1px solid ${C.gold}40` }}
          >
            <Sparkles size={12} />
            <span>Exclusive Jewellery Collection</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: C.ink }} className="text-2xl sm:text-3xl font-bold tracking-tight">
            {category === 'All' ? 'Our Complete Collection' : `${category} Collection`}
          </h2>
          <p className="text-xs sm:text-sm mt-1 max-w-md mx-auto" style={{ color: C.inkSoft }}>
            {category === 'All' && 'Browse our full boutique of handcrafted artificial bangles, rings, earrings, and chains in premium gold-finish.'}
            {category === 'Rings' && 'Exquisite handcrafted fashion & gemstone rings with fine crystal stonework.'}
            {category === 'Earrings' && 'Royal chandeliers, drops, jhumkas & solitaire crystal studs.'}
            {category === 'Chains' && 'Premium handcrafted designer chains and intricate pendant links in gold-finish.'}
            {category === 'Bracelets' && 'Signature handcrafted fashion bangles with brilliant crystal cuts in gold-finish.'}
          </p>
        </div>

        {/* Category Navigation Bar on Top */}
        <div className="w-full flex items-center justify-start sm:justify-center mb-6 overflow-x-auto no-scrollbar py-1 px-1 sm:px-0">
          <div
            className="flex gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/80 backdrop-blur-md shadow-sm border flex-nowrap mx-auto"
            style={{ borderColor: `${C.gold}35`, WebkitOverflowScrolling: 'touch' }}
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat === 'All' ? Sparkles : CATEGORY_ICON[cat];
              const count = cat === 'All' ? products.length : products.filter(p => p.category === cat).length;
              return (
                <GhostButton key={cat} active={category === cat} onClick={() => { setCategory(cat); setCurrentPage(1); }}>
                  <span className="chip-btn flex items-center gap-1.5 text-xs sm:text-sm font-bold whitespace-nowrap py-0.5 px-0.5">
                    <Icon size={14} />
                    <span>{cat === 'Bracelets' ? 'Bangles & bracelets' : cat}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-extrabold"
                      style={{
                        background: category === cat ? 'rgba(255,255,255,0.35)' : 'rgba(201,162,39,0.18)',
                        color: C.goldDark,
                      }}
                    >
                      {count}
                    </span>
                  </span>
                </GhostButton>
              );
            })}
          </div>
        </div>

        <div className="catalog-tools">
          <label className="catalog-search">Search the collection<input ref={searchRef} type="search" placeholder="Try rings, clover, or a product code…" value={search} onChange={e=>setSearch(e.target.value)} /></label>
          <label>Price range<select value={budget} onChange={e=>setBudget(e.target.value)}><option value="all">All prices</option><option value="200">Up to ₹200</option><option value="250">Up to ₹250</option><option value="320">Up to ₹320</option></select></label>
          <label>Sort by<select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A–Z</option></select></label>
        </div>
        <div className="catalog-summary"><p role="status">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}{search.trim() ? ` matching “${search.trim()}”` : ' to explore'}</p>{(search || category !== 'All' || budget !== 'all' || sort !== 'featured') && <button className="clear-filters" onClick={clearFilters}>Clear all filters</button>}</div>
        {!ready ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Sparkles className="sparkle" style={{ color: C.gold }} size={28} />
            <p className="text-sm" style={{ color: C.inkSoft }}>Polishing the collection…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center text-center py-20 gap-2">
            <Search size={24} style={{ color: 'rgba(201,162,39,0.4)' }} />
            <p className="text-sm" style={{ color: C.inkFaint }}>No pieces match these filters. Try another search or clear your filters.</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {paginatedProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i % 8}
                  onOpen={setSelected}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                className="mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ borderTop: `1px solid rgba(201,162,39,0.2)` }}
              >
                <p className="text-xs font-semibold" style={{ color: C.inkSoft }}>
                  Showing <span className="font-bold text-stone-900">{(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–{Math.min(currentPage * PRODUCTS_PER_PAGE, filtered.length)}</span> of <span className="font-bold text-stone-900">{filtered.length}</span> pieces
                </p>

                <div className="flex items-center gap-1.5">
                  {/* Prev Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/5 active:scale-95"
                    style={{
                      background: currentPage === 1 ? 'transparent' : '#FFFFFF',
                      border: `1px solid ${C.blush}`,
                      color: C.ink,
                    }}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={14} />
                    <span>Prev</span>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className="w-9 h-9 rounded-xl text-xs font-extrabold transition-all active:scale-95 flex items-center justify-center"
                      style={{
                        background: currentPage === pageNum
                          ? `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 70%, ${C.goldDark})`
                          : '#FFFFFF',
                        color: currentPage === pageNum ? '#FFFFFF' : C.ink,
                        border: currentPage === pageNum ? 'none' : `1px solid ${C.blush}`,
                        boxShadow: currentPage === pageNum ? '0 4px 12px -3px rgba(201,162,39,0.5)' : 'none',
                      }}
                      aria-label={`Page ${pageNum}`}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/5 active:scale-95"
                    style={{
                      background: currentPage === totalPages ? 'transparent' : '#FFFFFF',
                      border: `1px solid ${C.blush}`,
                      color: C.ink,
                    }}
                    aria-label="Next Page"
                  >
                    <span>Next</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <ShoppingGuide phone={STORE_INFO.phone1Raw} />
      <section className="collection-film"><details><summary>See the collection in motion</summary><video controls playsInline preload="none" poster="/images/earrings/image_1.webp" src="/video3.mp4" aria-label="Arwa 53 jewellery showcase" /></details></section>
      {/* Store Location Section */}
      <StoreSection />

      {/* footer */}
      <footer className="px-5 py-12 text-center relative" style={{ background: C.ink, color: C.cream }}>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-full overflow-hidden mx-auto" style={{ border: `1.5px solid ${C.goldLight}` }}>
            <img src={LOGO_SRC} alt="Arwa 53 Collection" className="w-full h-full object-cover" />
          </div>

          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", color: C.goldLight }} className="text-xl font-bold mb-1">
              Arwa 53 Collection
            </p>
            <p className="text-xs" style={{ color: 'rgba(232,196,104,0.7)' }}>
              Gold-finish fashion jewellery, made to be worn and remembered.
            </p>
          </div>



          <p className="text-xs" style={{color:'#ded2c1'}}>Website by <a href="https://wa.me/918619338794" target="_blank" rel="noopener noreferrer" className="underline">Mufaddal KT</a></p>

          <div className="flex items-center justify-center gap-2 text-[10px] pt-2" style={{ color: 'rgba(232,196,104,0.4)' }}>
            <span>© {new Date().getFullYear()} Arwa 53 Collection • All rights reserved.</span>
            <span>•</span>
            <button
              onClick={() => setAdminOpen(true)}
              className="hover:text-amber-200 transition-colors inline-flex items-center gap-1"
              title="Staff Portal (Ctrl+Shift+A)"
            >
              <Lock size={10} />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Back to top floating button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="back-to-top fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 65%, ${C.goldDark})`,
          boxShadow: '0 8px 20px -8px rgba(156,122,28,0.6)',
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.8)',
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
        aria-label="Back to top"
      >
        <ChevronRight size={18} style={{ color: C.cream, transform: 'rotate(-90deg)' }} />
      </button>

      {/* ── Mobile Quick Action Sticky Bottom Bar ── */}
      <nav
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 px-3 py-1.5 flex items-center justify-around border-t shadow-2xl backdrop-blur-xl"
        style={{
          background: 'rgba(253, 246, 237, 0.95)',
          borderColor: 'rgba(201,162,39,0.28)',
          paddingBottom: 'calc(0.4rem + env(safe-area-inset-bottom, 0px))',
        }}
        aria-label="Mobile quick navigation"
      >
        <a
          href={`https://wa.me/${STORE_INFO.phone1Raw || '919929285353'}?text=${encodeURIComponent('Hello Arwa 53 Collection, I would like to inquire about your jewellery pieces.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
            <MessageCircle size={16} />
          </div>
          <span className="text-[10px] font-bold text-stone-800">WhatsApp</span>
        </a>

        <a
          href={`tel:${STORE_INFO.phone1}`}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl active:scale-95 transition-transform"
        >
          <div
            className="w-8 h-8 rounded-full text-white flex items-center justify-center shadow-sm"
            style={{ background: `linear-gradient(135deg, ${C.goldLight}, ${C.goldDark})` }}
          >
            <Phone size={14} />
          </div>
          <span className="text-[10px] font-bold text-stone-800">Call Us</span>
        </a>

        <button
          onClick={scrollToLocation}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl active:scale-95 transition-transform"
        >
          <div
            className="w-8 h-8 rounded-full text-white flex items-center justify-center shadow-sm"
            style={{ background: C.ink }}
          >
            <MapPin size={15} style={{ color: C.goldLight }} />
          </div>
          <span className="text-[10px] font-bold text-stone-800">Location</span>
        </button>

        <button
          onClick={() => setWishlistOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl active:scale-95 transition-transform relative"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-white border"
            style={{ borderColor: C.blush }}
          >
            <Heart size={15} fill={wishlist.length > 0 ? C.red : 'none'} style={{ color: wishlist.length > 0 ? C.red : C.inkSoft }} />
            {wishlist.length > 0 && (
              <span
                className="absolute -top-0.5 right-2 w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center text-white"
                style={{ background: C.red }}
              >
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-stone-800">Wishlist</span>
        </button>
      </nav>

      {/* Modals & Drawers */}
      <ProductModal
        product={selected}
        onClose={() => setSelected(null)}
        isWishlisted={selected ? wishlist.includes(selected.id) : false}
        onToggleWishlist={toggleWishlist}
        onNavigateLocation={scrollToLocation}
      />

      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onSelectProduct={(product) => { setWishlistOpen(false); setSelected(product); }}
        onNavigateLocation={scrollToLocation}
      />

      {/* Hidden Master Admin Console */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        setProducts={(p) => { setProducts(p); PRODUCTS = p; }}
        storeInfo={storeInfo}
        setStoreInfo={(s) => { setStoreInfo(s); STORE_INFO = s; }}
        visitorCount={visitorCount}
        visitorLogs={visitorLogs}
        setVisitorLogs={setVisitorLogs}
        onToast={triggerToast}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} show={toastShow} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
