# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences, confirmed by the owner (2026-11-21), all served by the same site:

- **Private customers buying a gift or a personalised piece** in Praia, e.g. keychains, the national-team mascot, desk objects.
- **Local businesses and brands** wanting giveaways, display pieces or prototypes.
- **Students and makers** who arrive with an STL file or an idea and need someone to print it.
- **Tourists** looking for a Cabo Verdean souvenir made on the island.

*Assumption (not confirmed by the owner):* most arrive on a phone, often from a WhatsApp or social link, and decide by looking at real pieces.

## Product Purpose

PrintCV is a small 3D-printing workshop in Praia, Santiago, Cabo Verde. The site shows real printed work, sells a small catalogue of ready-made pieces, and turns custom ideas into a quote conversation on WhatsApp. Success = a visitor sends a WhatsApp message (product order or quote request).

## Positioning

Local production on Santiago, with every step visible: the printer arriving, first setup, timelapses of the nozzle laying layers, hand-painting. The proof is the workshop itself, not claims.

## Operating Context

- Printer: Bambu Lab A1 with AMS (multicolour). Material in use: PLA.
- Orders and quotes close on WhatsApp (`lib/site.ts`); the quote form opens WhatsApp with a prefilled message and can attach one image uploaded to Vercel Blob.
- Content is edited in code (`frontend/lib/conteudo.ts`), images and videos in `frontend/public/`. Deployed on Vercel from `main`.
- Prices in ECV (escudos cabo-verdianos).

## Capabilities and Constraints

- Routes: home, `/loja` (category filter), `/loja/[slug]`, `/galeria` (lightbox, filters, timelapse videos), `/orcamento` (form → WhatsApp), `/sobre`.
- Portfolio pieces (`portfolio: true`) reproduce real brands or people: they are shown but are **not for sale** (owner decision, 2026-10-23).
- Two products have no photo yet (vaso geométrico, suporte de telemóvel); the design must hold an honest no-photo state.
- No payments online yet (planned phase 4: Vinti4/SISP or Stripe). No CMS: Strapi was retired.
- Domain undecided (`printcv.vercel.app` belongs to someone else; `printcv.cv` does not resolve yet).
- Language: Portuguese (European/Cabo Verdean variety, not Brazilian).

## Brand Commitments

The owner left the whole visual identity open for redesign (2026-11-21): logo, colour, the 3D mascot hero and the theme toggle may all change. Name stays **PrintCV**.

## Evidence on Hand

- 21 real gallery items with dates (`lib/conteudo.ts`), photos in `public/galeria/`, `public/produtos/`.
- 4 timelapse videos with posters in `public/videos/` (multicolour, Benchy, first setup, nozzle).
- 3D model of the mascot: `public/modelos/mascote.glb`.
- **Removed by the owner, must not be reintroduced without confirmation:** "primeiro serviço de impressão 3D profissional em Cabo Verde", "respondemos em até 24 horas", "entrega rápida no arquipélago", and the stats "24h Resposta" / "100% Local". No testimonials, customer counts or delivery promises exist.

## Product Principles

1. Show the workshop, don't describe it: real photos, real timelapses, real dates.
2. Every path ends in one WhatsApp message, short and prefilled.
3. Honest about what exists: no invented claims, an empty photo slot stays visibly empty.
4. Built for a phone on a mobile connection first (follows the assumption under Users).
