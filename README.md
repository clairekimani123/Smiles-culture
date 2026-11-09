# Smiles Culture — Storefront

Customer-facing storefront for **Smiles Culture**, a made-to-order fashion brand
based in Kenya. Browse the collection, add items to your cart, and check out with
**MPesa STK Push**. Made-to-order pieces trigger a deposit request so our designer
can purchase materials before crafting begins.

**Live:** https://smiles-culture.vercel.app
**API:** https://github.com/clairekimani123/Smiles-culture-backend

---

## Why this project exists

Smiles Culture sells both ready-to-wear and made-to-order pieces. Off-the-shelf
e-commerce can't handle the made-to-order flow, so this storefront integrates
directly with the designer's production pipeline — including **deposit collection
before crafting begins** when items aren't in stock.

## Features

- 🛍️ Product catalog with categories and search
- 🛒 Persistent cart (survives refresh; merges across devices on login)
- 💳 MPesa STK Push checkout (Daraja API)
- 👗 Made-to-order workflow — customer pays deposit, designer sets a timeframe
- 📦 Order status tracking (`pending → paid → in_production → shipped → delivered`)
- 📊 GA4 e-commerce events (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`)

## Tech stack

| Layer      | Tool                                          |
|------------|-----------------------------------------------|
| Framework  | React 18 + Vite                               |
| Styling    | [Tailwind / CSS Modules — fill in]            |
| State      | Context API + localStorage                    |
| Payments   | MPesa Daraja (via backend)                    |
| Analytics  | Google Analytics 4 (`react-ga4`)              |
| Hosting    | Vercel                                        |
| Errors     | Sentry                                        |

## Architecture

┌──────────────────┐ HTTPS ┌────────────────────┐ Daraja ┌────────────┐
│ React (Vercel) │ ──────────► │ Django API (Render)│ ─────────► │ Safaricom │
└──────────────────┘ REST/JSON └────────────────────┘ STK Push └────────────┘
│ │
▼ ▼
localStorage PostgreSQL
(cart cache) (orders, stock)

text

## Running locally

```bash
# 1. Clone
git clone https://github.com/clairekimani123/Smiles-culture.git
cd Smiles-culture

# 2. Install
npm install

# 3. Configure
cp .env.example .env
# Edit .env — point VITE_API_URL at your local backend

# 4. Run
npm run dev
Open http://localhost:5173. Backend must be running (see backend README).

Deployment
Push to main → Vercel auto-deploys. Set VITE_API_URL and VITE_GA4_ID in
Vercel → Project → Settings → Environment Variables.

Roadmap
□ Product variants (size / color) with per-variant stock
□ Order history page for returning customers
□ Reviews with verified-purchase badges
□ Playwright end-to-end test for the checkout flow
Author
Claire Kimani — GitHub