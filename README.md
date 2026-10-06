# Arwa 53 Collection

Fashion jewellery catalogue for the Banswara store, built with React 18, Vite, Tailwind CSS and Leaflet. Customers can search, filter by category and price, sort products, save a wishlist locally, and send product enquiries through WhatsApp.

## Development

Use Node.js 22.12+ (or 24) and run:

```sh
npm ci
npm run dev
```

## Verification and production build

```sh
npm test
npm run build
npm run preview
```

Vercel and Netlify build with `npm run build` and publish `dist`. Vercel also serves the existing `api/` functions. The Vite development/preview server does not run these functions; verify staff authentication and analytics on Vercel. The storefront does not require these APIs for browsing or wishlists.

## Structure

- `src/main.jsx`: catalogue, product/wishlist dialogs, store map and existing staff interface.
- `src/storefront.jsx`: editorial hero, category shortcuts, shopping guidance and FAQs.
- `src/catalog.js`: pure search, filter and sort logic with regression tests.
- `src/styles.css`: compiled Tailwind plus responsive brand styling.
- `public/`: optimised product images, original image paths for cached catalogues, and existing showcase videos.
- `api/`: existing Vercel serverless handlers.

The main catalogue retains the existing 59 products and prices. Staff customisations and wishlists currently use browser local storage; staff catalogue edits are not a shared inventory database. Confirm availability, sizing and policies with the store. No payments or orders are processed by the website.

## Staff access

Use the footer Staff Login, `#admin`, or Ctrl/Cmd+Shift+A. Configure `ADMIN_PASSWORD` in Vercel's environment settings. No authentication credentials belong in this repository.

## October 2026 storefront update

- Always-visible whitespace-tolerant search, price filtering, sorting and clear filters.
- Editorial product-first homepage, category shortcuts and mobile layouts.
- Accessible product controls and dialogs with Escape dismissal, focus trapping and focus restoration.
- Removed fabricated public visitor counter and runtime warning suppression.
- Replaced browser-side Babel/Tailwind compilation with a Vite production bundle.
- Extracted embedded artwork and added WebP product images, lazy loading and metadata.

MIT license. Website by Mufaddal KT.
