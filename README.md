# GS Fast Juice

A mobile-first juice menu and WhatsApp ordering site for GS Fast Juice in Kigamboni, Dar es Salaam, Tanzania.

## Local preview

Because the menu loads `data/products.json` with `fetch`, serve this folder through a local web server rather than opening `index.html` as a `file://` URL. For example, with Python installed:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Product data

Edit `data/products.json`. Product IDs must be unique. Each product uses `id`, `name`, `nameSw`, `desc`, `price`, `category`, `emoji`, `color1`, `color2`, and `available`; `image` is optional. Supported categories: `single`, `blend`, `healthy`, `creamy`.

## Deploy on Vercel

Import this repository into Vercel and deploy as a static site with the project root set to the repository root. No build command is required for the static storefront. If adding API routes later, configure and test those serverless functions and their environment variables separately. Never commit secrets or `.env` files.

## Business details

- Location: Kwa Stivin, near Dady's Pub, Kigamboni, Dar es Salaam
- Phone / WhatsApp: +255 626 035 075
- Order flow: menu → cart → WhatsApp message

## QA checklist

- [ ] Test at 360px, 390px, 768px and desktop widths.
- [ ] Confirm all product images load and replace any stock images with real GS Fast Juice photography.
- [ ] Test category filters, add/remove quantity, cart total and WhatsApp checkout.
- [ ] Test Swahili/English toggle and persistence after refresh.
- [ ] Confirm location and opening hours with the business owner before launch.
- [ ] If using admin/API routes, verify the implementation and configure secrets only in Vercel Environment Variables.
