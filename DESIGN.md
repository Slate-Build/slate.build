---
name: SLATE
description: A two-ink print world for an independent digital design and technology studio — bone paper, solid ink, one signal vermilion.
colors:
  bone-paper:
    value: "#e9e9e4"
    role: neutral
    displayName: Cool Bone Paper
    description: The ground of the entire site. A printed sheet, not a screen backdrop.
  deep-paper:
    value: "#deded7"
    role: neutral
    displayName: Pressed Sheet
    description: The slightly heavier stock used behind project plates so they read as objects on the page.
  solid-ink:
    value: "#101010"
    role: primary
    displayName: Solid Ink
    description: All typography and rules on paper; the ground of the inverted closing section.
  signal-vermilion:
    value: "#e0401a"
    role: accent
    displayName: Signal Vermilion
    description: Reserved for live, active and required marks — the accent period, the active rail, the concept-study tag.
typography:
  display:
    family: Archivo
    fallback: Helvetica Neue, Helvetica, Arial, sans-serif
    weight: 800
  body:
    family: Archivo
    fallback: Helvetica Neue, Helvetica, Arial, sans-serif
    weight: 400
  label:
    family: Martian Mono
    fallback: SFMono-Regular, Consolas, monospace
    weight: 500
rounded:
  none:
    value: 0px
    description: Every corner in the system is square. Radius is never used as a softener.
spacing:
  gutter:
    value: "clamp(1.25rem, 4vw, 4.5rem)"
    description: The page margin. All sections align to this edge.
---

# Design System: SLATE

## Overview

**Creative North Star: "The Drafting Table"**

SLATE's identity is a working sheet, not a showcase. The site behaves like an architect's or engineer's drawing: a hairline column grid stays visible, figures carry dimension lines and captions, coordinates are live in the corner, and every element sits on a measured baseline. The studio's claim is that design and engineering are the same job, so the visual system shows its working rather than hiding it.

The palette is deliberately two-ink. Bone paper carries the majority of the surface, solid ink carries type and the inverted closing section, and a single vermilion appears only where something is live, active, or required — the accent period on the hero headline, the filled rail in the process section, the "concept study" tag, the availability marker. Its rarity is the point; the accent is never used decoratively.

Density is low and rhythm is long: oversized display type at one end, hairline-ruled editorial lists at the other, with generous whitespace between. Corners are square, shadows do not exist, and depth is conveyed through tonal layering (ink at 10–17% opacity behind hairlines) and by overlap between type and figure.

**Key Characteristics:**
- Hairline column grid (12 columns desktop, 6 tablet and mobile) visible as a construction field.
- Oversized Archivo 800 display type with tight tracking, set flush left and staggered rather than centred.
- Martian Mono for every index, coordinate, caption and status — the technical voice.
- One accent colour, used for state and emphasis only.
- Motion that is measured: line masks, rail scrubs, slow drift — never zoom, never bounce.

## Colors

A two-ink print palette: one cool bone ground, one solid ink, one signal vermilion reserved for live marks.

### Primary
- **Solid Ink** (#101010): All headlines, body copy, rules and registration marks on paper. Also the ground of the inverted closing section, where type flips to bone paper at 45–75% opacity.

### Secondary
- **Signal Vermilion** (#e0401a): The only chromatic element in the system. Used for the accent period in the hero headline, the active process rail and station markers, the "concept study" label on every project, the availability square, focus rings and the filled hover state of the primary CTA.

### Neutral
- **Cool Bone Paper** (#e9e9e4): The page ground everywhere except the closing section.
- **Pressed Sheet** (#deded7): The slightly heavier stock behind project plates, so each work visual reads as an object laid on the page.
- **Hairline Rule** (ink at 16% opacity): All dividers, table rules and column guides.
- **Faint Rule** (ink at 35% opacity): Registration ticks and secondary structure inside plates.

### Named Rules
**The One Ink Rule.** Vermilion appears at most twice per screen, and never as a background wash, gradient or large fill. If a screen needs more accent than that, the composition is wrong.

**The Two-Ink Rule.** Nothing on the site uses a third hue. No blues, purples, greys-with-a-tint or decorative gradients.

## Typography

**Display Font:** Archivo (variable 100–900), fallback Helvetica Neue, Helvetica, Arial, sans-serif
**Body Font:** Archivo (variable 100–900), fallback Helvetica Neue, Helvetica, Arial, sans-serif
**Label/Mono Font:** Martian Mono (variable), fallback SFMono-Regular, Consolas, monospace

**Character:** One industrial grotesk does all the reading, at three weights, so headlines and body copy come from the same voice. Martian Mono handles every label, index, coordinate and caption — the engineering register that sits against the editorial one.

### Hierarchy
- **Display** (800, `clamp(3rem, 13.2vw, 12rem)`, line-height 0.84, tracking -0.035em, uppercase): Hero headline and the closing "Have something in mind?" — used only where a statement must fill a viewport.
- **Headline** (800, `clamp(2rem, 5vw, 4.25rem)`, line-height 0.88, tracking -0.04em): Section statements ("Five capabilities, one team.", "Design and engineering are the same job.").
- **Title** (800, `clamp(1.75rem, 3.6vw, 3.25rem)`): Project names, service names, process phases.
- **Body** (400, `clamp(0.9375rem, 0.9rem + 0.2vw, 1.0625rem)`, line-height 1.5): Paragraph copy, capped at 46–52ch per measure.
- **Label** (Martian Mono 500, 0.55–0.68rem, tracking 0.06em, uppercase): Section indices, coordinates, captions, tags, navigation, footer meta.

### Named Rules
**The Mono Means Technical Rule.** Mono type is only ever used for things that are measured, indexed or infrastructural — never for a sentence a visitor is meant to read as prose.

## Layout

A 12-column grid on desktop, collapsing to 6 columns below 900px, with a single page gutter (`clamp(1.25rem, 4vw, 4.5rem)`) that every section aligns to. Sections are separated by whitespace rather than by containers; the only full-bleed inversions are the closing contact section.

Layout behaviour is deliberately asymmetric: display type is flush left and staggered (the second hero line is indented `8vw`), while figures and metadata occupy the trailing columns and alternate sides down the work section. Sections open with a hairline rule carrying a section index on the left and a qualifier on the right — the same rail pattern repeats in every section so the page has one grammar.

**Breakpoints:** 1440 / 1280 large desktop, 834 tablet, 390 mobile. Between them, the type scale, gutters, grid columns and the hero's composition are recomputed — the hero slab becomes an in-flow figure on mobile instead of an overlapping one, and the process rail becomes a vertical sequence.

## Elevation & Depth

No shadows anywhere. Depth is carried by three devices only: tonal layering (ink at 10–17% opacity behind hairlines forms the faces of the hero plate), overlap (the plate passes behind the headline, the headline passes in front of the plate), and inversion (the closing section flips ground from bone paper to solid ink).

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. There are no drop shadows, no glow, no glass and no blur except a 6px backdrop blur on the scrolled navigation bar, which exists to keep the masthead legible over passing content.

## Shapes

Every corner is square (radius 0). Structure is drawn with 1px hairlines rather than filled panels; project plates carry 12px corner registration ticks that mark them as printed sheets. Recurring geometry is the axonometric slab: a hexagonal prism drawn in isometric projection with construction ellipses, dimension lines and a vermilion marker at its front edge — the hero's signature figure, repeated as the favicon.

## Components

### Buttons
- **Shape:** Square corners (0px), 1px border, no fill at rest.
- **Primary:** Transparent ground, ink border, mono label at 0.62rem uppercase, `px-6 py-4`; the hero's CTA sits at `px-7 py-5`.
- **Hover / Focus:** The primary fills with vermilion and its label flips to bone paper over 500ms; focus shows a 2px vermilion outline offset 3px.
- **Secondary:** Text-only links with a 1px underline that draws from left to right over 500ms (`background-size` 0% → 100%).

### Chips
- **Style:** Not used as components. Status is expressed as a 7px vermilion square followed by a mono label.

### Cards / Containers
- **Corner Style:** 0px radius.
- **Background:** Pressed sheet (#deded7) for project plates; paper for text blocks.
- **Shadow Strategy:** None — see Elevation.
- **Border:** 1px hairline in ink at 16%.
- **Internal Padding:** Project plates are flush to their frame; metadata columns carry 2rem of horizontal gutter.

### Navigation
- **Style:** Fixed masthead, 72px on mobile and 84px on desktop, wordmark in display weight at the left, mono section links centred, availability square and status at the right. A hairline rule appears under the bar once the page scrolls past 24px.
- **States:** Links underline on hover; the wordmark's registration mark turns vermilion.
- **Mobile treatment:** A full-screen ink panel wipes down over 700ms with staggered display-size links, a scroll lock, Escape-to-close and focus returned to the toggle.

### The Plate (signature component)
The hero's axonometric slab: an SVG construction with three tonal faces, a dashed construction ellipse, two dimension lines with end ticks, a surface inset and a vermilion marker on the front edge, captioned "Fig. 01 — slab study, 1200 × 640". It drifts 96px slower than the page on scroll and tilts up to 14° toward the pointer. The same geometry becomes the site icon at 32px.

## Do's and Don'ts

### Do:
- **Do** keep the accent to state and emphasis — the hero period, the active rail, the live status, the focus ring.
- **Do** set headlines flush left with tight tracking (0.84–0.88 line-height) and stagger indentations rather than centring them.
- **Do** use Martian Mono for indices, coordinates, captions, tags and navigation only.
- **Do** build structure with 1px hairlines and whitespace instead of panels and shadows.
- **Do** label conceptual work as conceptual, everywhere it appears.

### Don't:
- **Don't** add a third hue, a gradient, a glow or a shadow.
- **Don't** round a corner, or place a container where whitespace would do.
- **Don't** centre display type or stack primary actions vertically in the middle of a screen.
- **Don't** animate with zoom, bounce or scale — motion is measured, masked and eased.
- **Don't** let scroll reveals hide content permanently: a no-JS path and a runtime fallback both force content visible.
