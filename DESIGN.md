# Portfolio Design System

## 1. Visual Theme & Atmosphere

Dark editorial engineering portfolio: precise, calm, assured, tactile, and spatial. The page should feel like a well-typeset technical journal moving through a living systems model rather than a neon developer template.

## 2. Color Palette & Roles

```css
--bg: #070a12;
--surface: #111827;
--surface-raised: #172033;
--text: #f8fafc;
--text-soft: #cbd5e1;
--line: rgba(226, 232, 240, .18);
--accent: #67e8f9;
--scene: #6366f1;
```

Cyan is reserved for status, links, focus, and key data. Indigo belongs to the 3D scene, keeping decorative depth visually separate from readable interface signals. Primary and secondary text use opaque near-white values rather than low-opacity white.

## 3. Typography Rules

Display: `Instrument Serif`, Georgia fallback. UI/body: `Manrope`, Arial fallback. Hero uses fluid 64–124px type; section headings 44–76px; body copy 16–19px. Labels are uppercase, compact, and tracked.

## 4. Component Styling

Buttons use pill geometry, visible borders, and inverse hover fills. Cards use thin rules, modest 12–20px radii, no heavy glass blur, and acid focus rings. Disabled controls reduce opacity. Links receive underline or color feedback; every interactive target is at least 44px.

## 5. Layout Principles

Maximum content width is 1240px. The hero is a 7/5 asymmetric split. Projects form an editorial alternating grid rather than equal tiles. Sections use generous 120–160px vertical rhythm and visible numeric labels.

## 6. Depth & Elevation

Depth comes from layered borders, restrained gradients, and one soft shadow tier. Moving elements never use blur. Surfaces remain legible against the near-black canvas.

## 7. Animation & Interaction

Interaction tier L3: one persistent Three.js WebGL system core transforms across five scroll chapters, supported by hero reveals, pointer parallax, CSS marquee, and restrained 3D card lift. The canvas is decorative, never intercepts input, caps pixel ratio, pauses in background tabs, and becomes a lightweight static composition under `prefers-reduced-motion`.

## 8. Do's and Don'ts

- Do lead with outcomes and quantified evidence.
- Do keep hierarchy obvious within a three-second scan.
- Do use acid green sparingly.
- Do preserve keyboard focus and reduced-motion support.
- Don't use gradients on every headline.
- Don't stack translucent glass panels.
- Don't describe the visual design in portfolio copy.
- Don't use equal-card grids when hierarchy is useful.
- Don't animate decorative elements at the cost of reading.
- Don't hide contact details or the resume action.

## 9. Responsive Behavior

Desktop uses asymmetric grids and generous whitespace. Below 860px content becomes one column and decorative rails disappear. Below 640px type scales down, cards lose nonessential offsets, CTAs stack, and all content stays within the viewport.
