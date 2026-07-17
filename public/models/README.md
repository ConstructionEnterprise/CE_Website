# /public/models

Drop exported .glb files here — they're served statically at `/models/<filename>.glb`.

## Garden Lofts — export checklist

**Target filename — must match exactly, including case, hyphens, no spaces: `garden-lofts.glb`**
Blender's default export name (e.g. `Garden Lofts Exterior.glb`) will NOT work — the site fetches the exact path `/models/garden-lofts.glb`, so rename the exported file before or after export.

In Blender, on the canonical massing model built from `garden_lofts_params.json`:

1. Select all objects that belong to the Garden Lofts massing (podium, residential floors, penthouse, rooftop pergola).
2. `Ctrl+A` → **Apply All Transforms** (Location, Rotation, Scale) if not already applied. Unapplied transforms are the most common cause of a model importing sideways or off-origin on the web.
3. Confirm origin is still bottom-SW-corner at 0,0,0 per CE coordinate discipline, after applying transforms.
4. `File → Export → glTF 2.0 (.glb/.gltf)`
   - Format: **glTF Binary (.glb)** — single file, easiest to serve
   - Include: Selected Objects only (don't export the whole scene if other CE assets share the file)
   - Transform: +Y Up (glTF standard; Three.js expects this — Blender's exporter handles the axis conversion automatically)
   - Geometry: Apply Modifiers = on
5. Save as `garden-lofts.glb`, place it in this folder.
6. Restart the dev server (or just refresh — Vite serves `public/` as static assets, no rebuild needed) and toggle to "3D" on the Garden Lofts card at `/#projects`.

## Notes

- Keep triangle count reasonable for a web viewer — if the massing model has dense procedural detail (e.g. window mullions modeled as real geometry rather than a material/texture), consider a decimated/simplified export for the web version. The desktop Blender file stays the source of truth; the .glb is a lightweight derivative.
- If the model doesn't appear after export, the two most common causes are (a) unapplied transforms per above, or (b) materials referencing external texture paths that don't get packed — use "Embed Textures" or convert to `.glb` (binary) which packs everything into one file automatically.
