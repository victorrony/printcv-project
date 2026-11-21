---
name: PrintCV
description: A 3D-printing workshop in Praia, laid out as a pano di terra, woven band sewn to woven band.
colors:
  indigo: "#141C44"
  indigo-tinta: "#22327A"
  indigo-claro: "#B9C0E0"
  indigo-fio: "#5A6699"
  algodao: "#F3F2EC"
  algodao-sombra: "#E4E2D8"
  algodao-texto: "#3B4677"
  preto: "#0B0B0F"
  amarelo: "#F2C230"
  amarelo-forte: "#E0AE14"
  erro: "#9B1C1C"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.2vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.375
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    fontVariation: "'wdth' 100"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.625
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 75"
  action:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    fontVariation: "'wdth' 112"
rounded:
  none: "0px"
spacing:
  emenda: "6px"
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "48px"
  heading-gap: "40px"
  band-sm: "80px"
  band-lg: "112px"
  frame: "84rem"
components:
  button-whatsapp:
    backgroundColor: "{colors.amarelo}"
    textColor: "{colors.indigo}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-whatsapp-hover:
    backgroundColor: "{colors.amarelo-forte}"
    textColor: "{colors.indigo}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.indigo}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.algodao}"
  field:
    backgroundColor: "{colors.algodao}"
    textColor: "{colors.indigo}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  field-label:
    textColor: "{colors.indigo}"
    typography: "{typography.label}"
  nav:
    backgroundColor: "{colors.algodao}"
    textColor: "{colors.indigo}"
    height: "64px"
  tira-produto:
    backgroundColor: "{colors.algodao}"
    textColor: "{colors.indigo}"
    rounded: "{rounded.none}"
    padding: "16px 20px 24px"
  tira-produto-hover:
    backgroundColor: "{colors.algodao-sombra}"
---

# Design System: PrintCV

## Overview

**Creative North Star: "Pano di Terra"**

The site is a Cabo Verdean pano di terra. Every section is a full-width woven band, indigo or undyed cotton, sewn to the next by a visible stitched seam and a narrow strip of panu-obra pattern (lozenge, tooth, check, stripe). The cloth is built bottom-up, row on row, the same way the workshop's printer lays down a piece layer on layer; that one analogy drives the pattern, the brand mark, the loom and the only authored motion.

Density is calm and generous: few elements per band, large expanded headlines, wide bands of colour doing the work that cards and shadows do elsewhere. Hierarchy comes from band colour and from the width of one variable typeface, never from added ornaments. Nothing floats, glows or rounds off; the material is flat cloth with square edges and stitched joins.

The page ends the way a cloth ends: in a fringe of loose indigo threads on cotton.

**Key Characteristics:**
- Two inks, no greys: indigo and cotton, with tints of indigo for secondary roles.
- Full-width bands joined by stitched seams and woven pattern strips.
- One variable family; hierarchy by font-stretch (125 / 100 / 75).
- Square corners everywhere; flat surfaces; no card shadows.
- Yellow means "this opens WhatsApp" and nothing else.
- One black band per page, the timelapse climax.
- Motion is stepped and bottom-up, like layers being laid.

## Colors

Two inks, deep indigo and undyed cotton, each with its own family of indigo-derived tints; one reserved warm colour for the single action the site exists for.

### Primary
- **Deep Indigo** (indigo): ground of the dark bands (first viewport, page headers, steps, footer) and the text colour on cotton. Also the brand mark's square and the browser theme colour.
- **Undyed Cotton** (algodao): ground of the light bands, the navbar, the loom frame and the product strips; the text colour on indigo and black.

### Secondary
- **Pattern Indigo** (indigo-tinta): the strong mid indigo. Stitches between strips on cotton, the keyboard focus ring and field focus ring on cotton, text selection, scrollbar thumb, link hover on cotton, dividers in the mobile menu.
- **Washed Indigo** (indigo-claro): secondary text on indigo and on black (support lines, captions, data lines, step numerals).
- **Warp Thread** (indigo-fio): decorative only on indigo: warp threads of the loom, seams on indigo bands, stitches between strips on dark bands. On cotton it is the placeholder colour.
- **Cotton Shade** (algodao-sombra): the weave on cotton: hover ground of product strips and the upload drop zone, empty image ground in the workshop mosaic, scrollbar track.
- **Faded Indigo Ink** (algodao-texto): secondary text on cotton (categories, dates, production time, form hints).

### Tertiary
- **Cotton Yellow** (amarelo), pressed to **Deep Yellow** (amarelo-forte) on hover: the ground of every control that opens WhatsApp, with indigo text. Navbar WhatsApp, the hero quick-quote button, the closing call, the quote-form submit, the floating mobile button.

### Neutral
- **Night Black** (preto): exactly one band per page (the timelapses on the home page) and the full-screen gallery lightbox. Text on it is cotton and washed indigo.
- **Error Red** (erro): form errors only: invalid field border, inline error text, and the bordered alert box.

### Named Rules
**The Two Inks Rule.** There are no greys. Every neutral is indigo, cotton, or a tint mixed from them. A new surface picks indigo or cotton as its ground and takes its secondary colours from that ground's family.

**The WhatsApp Yellow Rule.** Yellow appears only on controls that open WhatsApp. A link that goes to the shop, a filter, a tab or a "send photo" control that does not open WhatsApp is never yellow. On indigo, a link's underline may turn yellow on hover only because it sits in the band that holds the WhatsApp action; it is never a fill.

**The One Black Band Rule.** Night black is the climax, used once per page (the timelapse band) and by the lightbox. It is not a third band colour to alternate with.

## Typography

**Display Font:** Archivo variable (self-hosted, latin subset, wdth 62–125, wght 100–900), with system-ui fallback
**Body Font:** the same Archivo at normal width
**Label/Mono Font:** the same Archivo, condensed, uppercase

**Character:** One family stretched three ways. Expanded heavy for anything that names a band, normal width for reading, condensed caps for facts (material, date, price unit, status). The width change is the hierarchy, so weight and colour stay quiet.

### Hierarchy
- **Display** (800, expanded 125%, clamp 2.6rem to 5.25rem, line-height 0.95, tracking -0.03em): the H1 of the home page and of every inner page header; the closing line of the home page. Balanced wrapping.
- **Headline** (800, expanded 125%, clamp 2rem to 3.75rem, line-height 0.95): the title of each band, kept to 16–18ch. The wordmark "PrintCV" and prices in strips use the same expanded style at fixed sizes (1.35rem nav, 2.25rem footer, 1.4–1.75rem price).
- **Title** (700, normal width, 1.25rem, snug): step titles and product names (1.05–1.2rem), lightbox titles.
- **Body** (400, normal width, 1rem, line-height 1.625): running text, kept to 38–60ch. Lead paragraphs under headers step up to 1.1–1.15rem in washed indigo.
- **Label** (600, condensed 75%, 0.7–0.875rem, tracking 0.06em, uppercase): form labels, product category, dates, "Indisponível", "Foto a caminho", footer column headings, the loom caption. Numbers in labels and prices use tabular lining figures.
- **Action** (700, slightly expanded 112%, 0.95rem): button text.

### Named Rules
**The Stretch Rule.** Hierarchy is made by font-stretch, not by a second family: 125% names, 100% tells, 75% states facts. Never introduce another display face.

**The Data Under the Title Rule.** Facts sit under or beside the thing they describe (category under the product name, date under the photo title, legend beside the loom caption). No small label is ever stacked above a heading as an eyebrow.

## Layout

The page is a vertical stack of full-width bands. Content sits in a centred frame (84rem max) with side gutters of 20px, 32px from 640px and 48px from 1024px. Light and dark bands pad 80px top and bottom, 112px from 768px; inner page headers are shorter (56/48px, 80/64px from 768px). A band's title row sits 40px above its content, with the title on the left and its "see all" link aligned to the baseline on the right, wrapping beneath on phones.

Grids are sewn, not gapped: products, steps, timelapse list and workshop mosaic sit edge to edge, separated only by stitched seams. Products run 2 columns on phones and 5 from 1024px, with the product that has the most photos doubled to a wide strip and the last odd strip stretched to fill its row. The workshop mosaic is a 12-column patchwork from 1024px (one large 7×2 patch, then 5, 5, 4, 4, 4), 2 columns below. The first viewport splits 1.3fr / 1fr at 1024px (title and quick quote left, loom right) and stacks on phones in the order title, quote field, loom.

## Elevation & Depth

The system is flat. Depth comes from band colour (indigo against cotton against black) and from the stitched seams between bands, not from shadows. Product strips and mosaic patches are cloth panels at the same level as the band they sit in; hover darkens the cotton to its shade instead of lifting it.

### Shadow Vocabulary
- **Floating action** (`box-shadow: 0 6px 18px rgba(20,28,68,0.35)`): only the fixed WhatsApp button on phones, which genuinely floats over content after the first screen.
- **Focus ring** (`box-shadow: 0 0 0 3px #F3F2EC, 0 0 0 6px #22327A`): a two-ring outline on fields and the drop zone at focus. A ring, not elevation.

### Named Rules
**The Flat Cloth Rule.** Nothing at rest casts a shadow. The only shadow belongs to the one element that physically floats over the page.

## Shapes

Square corners everywhere (0px): buttons, fields, strips, video frames, the brand mark, the lightbox controls. The only rounded corner in the project is the iPhone home-screen icon, where the platform requires it.

The recurring forms are textile:
- **Stitched seam:** a 2px line of 10px dashes with 8px gaps, drawn in the current text colour. Horizontal under the navbar and above the footer credit; on two edges of each sewn strip.
- **Emenda (band join):** a 6px pad of the upper band's colour, a seam, a woven pattern strip 12–20px tall, another seam.
- **Panu-obra motifs:** lozenge (20px tile, hollow diamond), tooth (16×12 triangles), check (12px), stripe (8px). Each exists in a dark (cotton on indigo) and a light (indigo on cotton) tone.
- **Fringe:** the footer ends in 40px of loose indigo threads on cotton.
- **Brand mark, "P fatiado":** the letter P sliced into eight horizontal layers 3 units tall with 1.4 gaps, on a 48-unit square (indigo ground, cotton layers; inverted on dark bands). The same geometry drives the favicon and app icon.
- **Broken strip (404):** a lozenge strip that stops short, cut on a whole 20px motif.

## Components

### Buttons
Flat, square, confident; 52px tall so they work under a thumb.
- **Shape:** square (0px), padding 0 24px, min height 52px; the navbar variant is 40px tall and 16px padded.
- **WhatsApp action:** cotton yellow ground, indigo text, a speech-bubble icon before the label. Deep yellow on hover, pressed down 1px on active. Disabled state shows a wait cursor at 70% opacity, with a spinner while uploading.
- **Line action:** transparent with a 2px border in the current text colour. On cotton it fills indigo with cotton text on hover; on indigo or black it fills cotton with indigo text.
- **Text link:** bold, 2px underline offset 0.25em. On cotton, hover shifts to pattern indigo; on indigo, the underline turns yellow.
- **Square icon buttons** (video play/pause, lightbox previous/next/close): 44–48px squares, cotton on dark with a 2px cotton border or a solid cotton square, inverting on hover.

### Cards / Containers (Tiras)
There are no cards. Products, steps and timelapse entries are **tiras**, strips of cloth sewn side by side.
- **Corner Style:** square (0px).
- **Background:** the band's own ground (cotton strips on cotton, indigo on indigo); hover shifts cotton to cotton shade.
- **Shadow Strategy:** none (see Flat Cloth Rule).
- **Border:** a stitched seam on the top and left edge of each strip, in pattern indigo on cotton and warp thread on dark bands; the container hides the outer edge so only the seams between strips show.
- **Internal Padding:** 16px sides (20px from 640px), 16px top, 20–24px bottom for products; 24px sides for steps.
- **Product strip:** image at 4:5 (8:5 when doubled), name in title style, category in label style beneath, price in expanded style at the foot with production time beside it. Photo zooms 3% on hover over 500ms. Unavailable pieces carry an indigo "Indisponível" tag in the top-left corner.
- **No-photo state:** the image slot is filled with a woven motif (light tone, varying per product so neighbours differ) and a cotton "Foto a caminho" label in the centre. Never a generic placeholder icon.

### Inputs / Fields
- **Style:** cotton ground, 2px solid indigo border, square, 14px × 16px padding, 1rem text; label in condensed caps above, 8px gap.
- **Focus:** the two-ring outline (cotton then pattern indigo). The hero quick-quote field, which sits inside a cotton tray beside its button, instead shows a 3px pattern-indigo underline.
- **Error:** border turns error red; a semibold error-red line appears 8px below. A failed submit shows a bordered error-red alert.
- **Quick quote (hero):** a cotton tray 6px padded holding the field and the yellow button side by side (stacked on phones). An empty submit still opens WhatsApp with the general message.

### Navigation
- **Style:** sticky cotton bar, 64px tall, closed by a stitched seam in indigo. Brand mark and expanded wordmark on the left, four links in semibold 0.95rem, a compact WhatsApp button on the right.
- **States:** hover and current page show a 3px underline offset 0.45em; current page carries aria-current.
- **Mobile:** a "Menu / Fechar" text-and-icon toggle opens a full-height indigo panel with links in expanded 1.6rem type, pattern-indigo dividers, an "Aqui" condensed tag on the current page, and a full-width WhatsApp action at the foot. Escape closes it; the page behind does not scroll.

### O Tear (signature component)
The loom: the multicolour timelapse in a cotton frame with, under it, an indigo panel 192px tall (240px from 640px) where a cloth weaves itself in step with the video. Twelve pattern rows fill bottom-up, one per twelfth of the video's progress; above the woven rows only the warp shows (1px warp-thread lines on a 7px pitch); a 3px cotton shuttle line marks the row being woven. When the video loops, the cloth restarts. At least one row is always woven. With reduced motion, save-data, or the video paused, the cloth is shown complete. A square cotton play/pause control sits in the video's bottom-left corner; the caption gives the title and, in condensed caps, the date and "vídeo acelerado".

### Banda dos Timelapses
The one black band: a large 16:9 player beside a sewn list of the other timelapses (22rem column from 1024px), each entry a thumbnail, title and condensed date. The selected entry turns to a cotton strip with indigo text.

### Page Header
Inner pages open with a shorter indigo band: display H1, optional lead in washed indigo, then an Emenda in the page's motif.

### Motion
One authored moment: page H1s weave in from the bottom up, a clip reveal in 9 discrete steps over 0.9s. The loom is the second motion, driven by real video progress rather than a timer. Everything else is plain state change (150ms colour transitions, 500ms photo zoom, the mobile WhatsApp button sliding in after the first screen). With reduced motion, every animation and transition completes instantly, headings appear whole and the cloth is complete; only the upload spinner keeps turning, because it carries information.

## Do's and Don'ts

### Do:
- **Do** build every new section as a full-width band in indigo or cotton, and join bands of different ground with an Emenda (seam, pattern strip 12–20px, seam).
- **Do** take secondary text from the ground's own family: washed indigo (#B9C0E0) on indigo and black, faded indigo ink (#3B4677) on cotton.
- **Do** sew grids edge to edge with stitched seams (2px, 10px dashes, 8px gaps) instead of gaps, borders or shadows.
- **Do** name bands in expanded heavy type (125%), and put facts in condensed caps (75%) under the thing they describe.
- **Do** give every WhatsApp control the yellow ground with indigo text and the speech-bubble icon.
- **Do** fill a missing photo with a woven motif and say what is missing in words.
- **Do** keep motion stepped and bottom-up, and show the finished state when motion is reduced.

### Don't:
- **Don't** introduce greys, a second hue, or a colour gradient (the seams' repeating dashes are the only gradient in the code); every neutral is indigo, cotton or a tint of them.
- **Don't** use yellow on anything that does not open WhatsApp.
- **Don't** use night black for more than one band per page.
- **Don't** round corners or use pills; the system is 0px.
- **Don't** put shadows on strips, panels or buttons; the floating mobile WhatsApp button is the only shadow.
- **Don't** stack an eyebrow label above a heading.
- **Don't** add a second typeface or a system display face; stretch Archivo instead.
- **Don't** add floating, glowing or easing-in decorative motion.
