import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const DISPLAY = "'Anton', sans-serif";
const MONO = "'DM Mono', monospace";

/**
 * A single "camera move" over one image (or placeholder) driven by scroll.
 *
 * The image starts at `from` transform state and animates to `to` as the user
 * scrolls the scene's viewport past. Transform values are simple numbers:
 *   scale: 1 = original size, >1 pushes in, <1 pulls back
 *   x, y: percentage translation (e.g. -20 = shift 20% left/up)
 *   rotate: degrees
 *
 * Height controls how much scroll travel the move takes — a taller scene
 * means the camera moves slower. Default (200vh) gives the move a full
 * viewport of scroll travel plus a full viewport of settle at start and end.
 */

export type CameraState = {
  scale?: number;
  x?: number;
  y?: number;
  rotate?: number;
};

export type SceneProps = {
  id: string;
  eyebrow?: string;   // "01 · SCENE ONE"
  title?: string;     // "IT STARTS HERE."
  body?: string;      // one-line overlay copy
  detail?: string;    // smaller supporting line
  image?: string;     // path in /public — e.g. "/scenes/studio.jpg"
  objectPosition?: string; // CSS object-position for the image, e.g. "top", "20% 30%" — matters for tall/dense composites where center-crop hides the focal content
  placeholderLabel?: string; // shown if no image yet — e.g. "SCENE 01 — STUDIO"
  from?: CameraState; // starting transform
  to?: CameraState;   // ending transform
  height?: string;    // scene scroll length (default "200vh")
  overlayPosition?: "center" | "bottom-left" | "bottom-right";
};

const DEFAULT_FROM: Required<CameraState> = { scale: 1, x: 0, y: 0, rotate: 0 };
const DEFAULT_TO: Required<CameraState> = { scale: 1.15, x: 0, y: 0, rotate: 0 };

function useCameraValues(
  progress: MotionValue<number>,
  from: CameraState = {},
  to: CameraState = {}
) {
  const f = { ...DEFAULT_FROM, ...from };
  const t = { ...DEFAULT_TO, ...to };
  return {
    scale: useTransform(progress, [0, 1], [f.scale, t.scale]),
    // x/y are percentages of the element's own size (framer's %-of-self behavior
    // for translate) — interpolating as unit strings so a value like 10 actually
    // reads as a real, visible pan rather than 10 raw pixels.
    x: useTransform(progress, [0, 1], [`${f.x}%`, `${t.x}%`]),
    y: useTransform(progress, [0, 1], [`${f.y}%`, `${t.y}%`]),
    rotate: useTransform(progress, [0, 1], [f.rotate, t.rotate]),
  };
}

export function Scene({
  id,
  eyebrow,
  title,
  body,
  detail,
  image,
  objectPosition = "center",
  placeholderLabel,
  from,
  to,
  height = "200vh",
  overlayPosition = "bottom-left",
}: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  // scrollYProgress: 0 when the scene's top hits the viewport bottom,
  // 1 when the scene's bottom hits the viewport top. Perfect for a "sticky"
  // camera that moves through its full arc as you scroll past the section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const { scale, x, y, rotate } = useCameraValues(scrollYProgress, from, to);

  // Text overlay fades in during the middle 60% of scroll, so it appears
  // *after* the camera move has started but *before* it finishes.
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.7, 0.9], [0, 1, 1, 0]);
  const overlayY = useTransform(scrollYProgress, [0.15, 0.35], [24, 0]);

  const overlayClass =
    overlayPosition === "center" ? "inset-0 flex items-center justify-center text-center px-8"
    : overlayPosition === "bottom-right" ? "inset-0 flex items-end justify-end p-12 md:p-20 text-right"
    : "inset-0 flex items-end justify-start p-12 md:p-20";

  return (
    <section id={id} ref={ref} className="relative w-full" style={{ height }}>
      {/* Sticky viewport-sized frame: the image sits in this while its section scrolls past. */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#050810]">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale, x, y, rotate }}
        >
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover" style={{ objectPosition }} draggable={false} />
          ) : (
            // Placeholder: dark navy with a diagonal-line grain so the "camera move"
            // is visible even without a real render loaded yet.
            <div className="w-full h-full flex items-center justify-center relative" style={{
              background: "linear-gradient(135deg, #0a1220 0%, #050810 100%)",
            }}>
              <div className="absolute inset-0 opacity-[0.08]" style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.4) 40px, rgba(255,255,255,0.4) 41px)",
              }} />
              <div className="text-primary/40 text-[10px] tracking-[0.35em] uppercase relative z-10" style={{ fontFamily: MONO }}>
                {placeholderLabel || "SCENE — RENDER PENDING"}
              </div>
            </div>
          )}
          {/* Vignette to keep the overlay text legible over any image. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40 pointer-events-none" />
        </motion.div>

        {/* Overlay text — appears mid-scroll, fades before the scene ends */}
        <motion.div
          className={`absolute ${overlayClass} pointer-events-none`}
          style={{ opacity: overlayOpacity, y: overlayY }}
        >
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="text-primary text-[10px] tracking-[0.35em] uppercase mb-3" style={{ fontFamily: MONO }}>
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-[clamp(38px,6vw,84px)] font-black text-foreground leading-[0.95] uppercase tracking-tight" style={{ fontFamily: DISPLAY }}>
                {title}
              </h2>
            )}
            {body && <p className="text-foreground/85 text-base md:text-lg mt-4 leading-relaxed">{body}</p>}
            {detail && (
              <p className="text-muted-foreground text-xs mt-3 tracking-wide" style={{ fontFamily: MONO }}>
                {detail}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// A pass-through for children that share the sticky-scroll pattern — useful
// for a scene that needs custom layers (multiple stacked images, numbers, etc.)
// that we'll build later.
export function SceneShell({ id, height = "200vh", children }: { id: string; height?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative w-full" style={{ height }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#050810]">{children}</div>
    </section>
  );
}
