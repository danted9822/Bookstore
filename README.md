# Bookstore (Next.js + Sanity + Stripe)

A modern bookstore web app built with **Next.js**, powered by **Sanity CMS** for product and banner content, and **Stripe Checkout** for payments.

## Features

- Product listing page with featured banners
- Product detail pages (dynamic routes)
- Cart management (add/remove/update quantity)
- Stripe Checkout integration
- Sanity-backed content (books, hero banner, footer banner)
- Responsive UI

## Tech Stack

- Next.js 12
- React 17
- Sanity (headless CMS)
- Stripe (Checkout)
- react-hot-toast
- react-icons

## Project Structure

- `pages/` - Next.js routes and API endpoints
- `components/` - UI components (Product, Cart, Navbar, Banners, etc.)
- `context/` - Global cart state (`StateContext`)
- `lib/` - Sanity and Stripe helper clients
- `sanity-ecommerce/` - Sanity Studio project and schemas
- `styles/` - Global and responsive stylesheets

## Prerequisites

- Node.js 16+ (recommended for this project)
- npm (or yarn)
- A Sanity project
- A Stripe account (test mode is enough for local development)

## Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2022-03-10

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Notes:
- `NEXT_PUBLIC_*` variables are exposed to the browser.
- `STRIPE_SECRET_KEY` must stay server-side only.

## Local Development

1. Install dependencies in the frontend:

```bash
npm install --legacy-peer-deps
```

2. Install dependencies in Sanity Studio:

```bash
cd sanity-ecommerce
npm install --legacy-peer-deps
cd ..
```

3. Start the Next.js app:

```bash
npm run dev
```

4. (Optional) Start Sanity Studio in a second terminal:

```bash
cd sanity-ecommerce
npm run start
```

5. Open:

- Storefront: [http://localhost:3000](http://localhost:3000)
- Sanity Studio (default): [http://localhost:3333](http://localhost:3333)

## Sanity Content Model

The Studio includes schemas for:

- `product`
- `banner`
- `footerBanner`

Define products and upload book images in Sanity. The storefront fetches this content at runtime/build-time depending on the page.

## Stripe Checkout Flow

- Client posts cart items to `POST /api/stripe`
- API route creates a Stripe Checkout Session
- User is redirected to Stripe-hosted checkout
- On success, user lands on `/success`

## Available Scripts

From the root:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

From `sanity-ecommerce/`:

```bash
npm run start
```

## Deployment

You can deploy the storefront to Vercel.

Before deploying, make sure all required environment variables are configured in your hosting platform.

## Current Limitations / TODO

- Improve server-side validation for checkout line items
- Improve cart persistence strategy
- Add a dedicated cancel page for aborted Stripe checkout
- Add unit/integration tests

## License

This project is for educational and portfolio purposes. Add your preferred license if needed.
