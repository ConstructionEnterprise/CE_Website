# /public/scenes

Drop render images here for the opening sequence. Files placed here are served at `/scenes/<filename>`.

## Filename conventions

The `OpeningSequence` component (`src/app/scenes/OpeningSequence.tsx`) currently references these paths — either name your files to match, or update the `image` props in that file:

```
/scenes/01-studio.jpg          → Scene 1: Architectural Studio
/scenes/02-elevator.jpg        → Scene 2: Elevator descent
/scenes/03-shop-floor.jpg      → Scene 3: Manufacturing Floor
/scenes/04-yard.jpg            → Scene 4: Module Yard
/scenes/05-crane.jpg           → Scene 5: Crane Set
/scenes/06-garden-lofts.jpg    → Scene 6: Garden Lofts finished
```

Until an image exists, that scene shows a dark navy placeholder with a diagonal-line pattern so the camera-move animation is still visible during scroll.

## Format & size guidance

- **Format**: `.jpg` is fine for renders. Use `.png` only if a scene needs transparency.
- **Dimensions**: aim for 2560×1440 or 1920×1080. Larger than 4K is wasteful for web and will slow first-scroll.
- **Composition**: each render should have enough room around the subject that the camera move (push-in, pan, pull-back) doesn't hit the edge of the frame. The `Scene` component's `from`/`to` transforms determine how far the camera travels — you can always tune those to match how much headroom the render has, but starting with a slightly-wider composition than you think you need gives more room to work with.

## Tuning a scene

Each scene in `OpeningSequence.tsx` has `from` and `to` props controlling the camera state at scroll-start vs. scroll-end:

- `scale: 1.0` = original size · `1.5` = pushed in 50% · `0.8` = pulled back
- `x` / `y`: horizontal / vertical pan, expressed as a small number (units are pixels-ish — start small, ±10 is a strong pan)
- `rotate`: degrees (optional, use sparingly — even 1–2° reads as strong motion)
- `height`: how much scroll travel the scene gets (default `200vh` = 2 viewport heights); taller = slower camera move
