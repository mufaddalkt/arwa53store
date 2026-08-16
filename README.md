# ✨ Arwa 53 Collection — Luxury Fine Jewellery Web App

[![Status](https://img.shields.io/badge/Status-Live%20Ready-gold.svg)](https://github.com/mufaddalkt/arwa53store)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Serverless%20Ready-black?logo=vercel&logoColor=white)](https://vercel.com/)

A modern, high-performance, single-page luxury jewellery web application showcasing the exclusive **Arwa 53 Collection** of gold bangles, bracelets, and bespoke jewellery pieces. Complete with physical boutique location details, embedded map frame, 8-item catalog pagination, interactive concierge actions, live wishlist drawer, direct WhatsApp / phone contact integration, and a **password-protected hidden admin panel**.

---

## 🌟 Key Features

- **💎 Curated Jewellery Showcase & 8-Item Pagination**:
  - Luxury catalog display with 8 products per page and intuitive page navigation controls.
  - Interactive product visual modals with shimmer typography and tilt-card hover micro-interactions.
- **📍 Physical Boutique Integration & Embedded Map Frame**:
  - Full store address: *HC2W+PRQ, Near Mewad Hospital, Opposite Vaibhav Opticals, Najmi Bagh, Nai Abadi, Banswara, Rajasthan 327001, India*.
  - Embedded Google Map frame pinpointing the boutique near Mewad Hospital & Vaibhav Opticals.
  - Interactive Google Maps direct route & navigation links.
  - Visiting hours & timings (Mon–Sat: 10:30 AM – 8:30 PM | Sun: 11:00 AM – 6:00 PM).
  - One-click **Copy Full Address** with gold toast notifications.
- **📞 Direct Concierge & Orders**:
  - **Primary Concierge:** `+91 8949540902` (Tap to Call / WhatsApp)
  - **Boutique Support:** `+91 8619338794` (Tap to Call / WhatsApp)
  - One-click copy phone numbers.
- **🔐 Hidden Admin Management Console**:
  - Master password protection powered by a Vercel Serverless Function (`api/admin.js`) reading `process.env.ADMIN_PASSWORD`.
  - Add new jewellery items with image upload (Base64) or external URL.
  - Edit existing pieces (name, price, category, promo badges, description, image).
  - Delete items with confirmation.
  - Live Store Settings editor (update store name, address, coordinates, and contact numbers).
  - JSON backup export and catalog reset controls.
- **💬 WhatsApp Concierge**: Pre-formatted WhatsApp inquiry messages with piece names, prices, and try-on requests.
- **❤️ Interactive Wishlist Drawer**: Slide-over drawer to save pieces, compute estimated total values, and inquire for all items in a single WhatsApp tap.
- **🔍 Instant Search & Category Filters**: Real-time filtering across bangles, bracelets, kada, chuda, bestsellers, and new arrivals.
- **📱 Fully Responsive & Mobile-First**: Tailored luxury UI for smartphones, tablets, and desktop displays.

---

## 🔐 Hidden Admin Panel Access & Configuration

### Secret Access Triggers
The admin console is concealed from ordinary customers and can be opened in 4 ways:
1. **Keyboard Shortcut**: Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac).
2. **URL Hash**: Add `#admin` to the website URL (e.g., `https://your-store.vercel.app/#admin`).
3. **Triple-Click Logo**: Tap or click the circular boutique logo 3 times rapidly.
4. **Footer Lock Icon**: Click the subtle **"Staff Login"** button at the bottom of the page footer.

### Configuring the Master Password in Vercel
1. Go to your **Vercel Dashboard** → Select the `arwa53store` project.
2. Navigate to **Settings** → **Environment Variables**.
3. Add a new variable:
   - **Key**: `ADMIN_PASSWORD`
   - **Value**: `YourChosenStrongPassword123!`
4. Redeploy or trigger a new deployment.

*(Note: During local preview development without Vercel serverless execution, the fallback development password is `arwa53admin`).*

---

## 🏬 Boutique Location & Hours

| Attribute | Details |
| :--- | :--- |
| **Store Listing** | Arwa53 collection - Imitation Jewellery |
| **Address** | HC2W+PRQ, Near Mewad Hospital, Opposite Vaibhav Opticals, Najmi Bagh, Nai Abadi, Banswara, Rajasthan 327001, India |
| **Coordinates** | `23.551843, 74.447071` |
| **Plus Code** | `HC2W+PRQ, Banswara` |
| **Primary Phone** | [+91 8949540902](tel:+918949540902) |
| **Secondary Phone**| [+91 8619338794](tel:+918619338794) |
| **Mon – Sat Hours**| 10:30 AM – 8:30 PM |
| **Sunday Hours** | 11:00 AM – 6:00 PM |

---

## 🚀 Quick Start (Run Locally)

### Option 1: Python HTTP Server (Zero Dependencies)
```bash
# Clone the repository
git clone https://github.com/mufaddalkt/arwa53store.git
cd arwa53store

# Run local web server
python -m http.server 5173
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Option 2: Node.js / Vercel CLI
```bash
# Run with Vercel CLI for live serverless API support
npx vercel dev
```

---

## 🛠️ Technology Stack

- **Frontend**: React 18 (Browser Standalone), Babel
- **Backend / API**: Vercel Serverless Function (`api/admin.js`)
- **Styling**: Tailwind CSS, Custom Gold Luxury Design Tokens
- **Icons**: Lucide Icons
- **Typography**: Playfair Display & Manrope (Google Fonts)

---

## 📦 Project Structure

```
arwa53store/
├── api/
│   └── admin.js       # Vercel serverless function for password validation
├── .env.example       # Example environment variables template
├── index.html         # Main luxury web application
├── package.json       # Node package configuration & scripts
├── vercel.json        # Vercel deployment & routing configuration
├── netlify.toml       # Netlify deployment configuration
├── README.md          # Comprehensive documentation
├── LICENSE            # MIT License
└── .gitignore         # Git ignore rules
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

© 2026 Arwa 53 Collection. All Rights Reserved.
