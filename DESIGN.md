# Portfolio Design System

## 1. Visual Theme & Atmosphere

Light, spatial product portfolio: precise, warm, assured, and interactive. The page combines a pale editorial canvas with one flowing glass sculpture, creating the feeling of a refined product story rather than a conventional developer template.

## 2. Color Palette & Roles

```css
--bg: #efedf6;
--surface: rgba(255, 255, 255, .70);
--surface-raised: rgba(255, 255, 255, .92);
--text: #10113d;
--text-soft: #5d5b76;
--line: rgba(18, 18, 62, .11);
--accent: #6c367f;
--scene: #f8f4fb;
```

Deep aubergine is used for links, focus, and key data. Pearl, blush, and gold belong to the 3D sculpture, keeping decorative depth distinct from interface signals. Body copy uses opaque slate-purple values that remain readable on glass and lavender surfaces.

## 3. Typography Rules

Display and UI: `Manrope`, Arial fallback, with `Instrument Serif` reserved for oversized chapter numerals. Hero uses fluid 64–112px type; section headings 44–96px; body copy 16–19px. Labels are uppercase, compact, and tracked.

## 4. Component Styling

Buttons use pill geometry, visible borders, and decisive inverse fills. Cards use thin rules, 16–28px radii, restrained glass blur, and aubergine focus rings. Disabled controls reduce opacity. Links receive color or border feedback; every interactive target is at least 44px.

## 5. Layout Principles

Maximum content width is 1240px. The hero is an asymmetric copy/sculpture split with generous negative space. Projects form an editorial alternating grid rather than equal tiles. Sections use generous 96–144px vertical rhythm and visible numeric labels.

## 6. Depth & Elevation

Depth comes from layered pale gradients, translucent surfaces, quiet shadows, and the persistent Three.js sculpture. Moving elements never blur readable content. Copy receives a subtle light shield wherever it overlaps the scene.

## 7. Animation & Interaction

Interaction tier L3: one persistent Three.js glass ribbon transforms across five scroll chapters, supported by hero reveals, pointer parallax, a CSS marquee, and restrained card lift. The canvas is decorative, never intercepts input, caps pixel ratio, pauses in background tabs, and becomes a lightweight static composition under `prefers-reduced-motion`.

## 8. Do's and Don'ts

- Do lead with outcomes and quantified evidence.
- Do keep hierarchy obvious within a three-second scan.
- Do reserve saturated purple and gold for meaningful emphasis.
- Do preserve keyboard focus and reduced-motion support.
- Don't use gradients on every headline.
- Don't let decorative transparency reduce text contrast.
- Don't describe the visual design in portfolio copy.
- Don't use equal-card grids when hierarchy is useful.
- Don't animate decorative elements at the cost of reading.
- Don't hide contact details or the resume action.

## 9. Responsive Behavior

Desktop uses asymmetric grids and generous whitespace. Below 860px content becomes one column, the sculpture recenters, and decorative rails disappear. Below 640px type scales down, cards lose nonessential offsets, CTAs stack, and all content stays within the viewport.
