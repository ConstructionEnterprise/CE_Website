import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Bounds, useGLTF } from "@react-three/drei";

const MONO = "'DM Mono', monospace";

// Place the exported Blender model here: public/models/garden-lofts.glb
export const GARDEN_LOFTS_MODEL_PATH = "/models/garden-lofts.glb";

function Model() {
  const { scene } = useGLTF(GARDEN_LOFTS_MODEL_PATH);
  return <primitive object={scene} />;
}

// Local, self-contained lighting rig — no external HDRI/CDN fetch, so it can
// never fail or hang due to network issues, firewalls, or ad blockers.
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[30, 40, 20]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-25, 15, -20]} intensity={0.5} />
      <hemisphereLight args={["#8fa8c9", "#1a1f2b", 0.6]} />
    </>
  );
}

function ViewerLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-primary text-[10px] tracking-[0.25em] uppercase animate-pulse" style={{ fontFamily: MONO }}>
        Loading model…
      </div>
    </div>
  );
}

function ModelMissing() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 border border-white/[0.08] bg-[#0a0f18] text-center p-8">
      <div className="text-[10px] text-primary tracking-[0.25em] uppercase" style={{ fontFamily: MONO }}>3D Viewer</div>
      <p className="text-muted-foreground text-xs max-w-xs leading-relaxed">
        No model found at <span className="text-foreground/70">{GARDEN_LOFTS_MODEL_PATH}</span>.
        Export the Garden Lofts massing from Blender as glTF Binary (.glb) and place it at{" "}
        <span className="text-foreground/70">public/models/garden-lofts.glb</span>.
      </p>
    </div>
  );
}

function ViewerError({ message }: { message: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 border border-white/[0.08] bg-[#0a0f18] text-center p-8">
      <div className="text-[10px] text-red-400 tracking-[0.25em] uppercase" style={{ fontFamily: MONO }}>3D Viewer Error</div>
      <p className="text-muted-foreground text-xs max-w-xs leading-relaxed">{message}</p>
      <p className="text-muted-foreground/60 text-[10px] max-w-xs leading-relaxed">
        Check the browser console (F12) for the full error.
      </p>
    </div>
  );
}

// Catches runtime errors thrown while loading/rendering the model (bad glTF,
// unsupported geometry, etc.) so a failure shows a message instead of a
// silent black canvas.
class ViewerErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(err: unknown) {
    return { error: err instanceof Error ? err.message : "Unknown error loading model." };
  }
  componentDidCatch(err: unknown) {
    console.error("GardenLoftsViewer failed:", err);
  }
  render() {
    if (this.state.error) return <ViewerError message={this.state.error} />;
    return this.props.children;
  }
}

export function GardenLoftsViewer() {
  // null = checking, true = found, false = missing
  const [modelExists, setModelExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(GARDEN_LOFTS_MODEL_PATH, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        // Vite's dev server can return 200 + index.html for a missing static
        // file (SPA fallback) instead of a clean 404 — guard against that by
        // rejecting anything that isn't actually binary glb content.
        const contentType = res.headers.get("content-type") || "";
        const looksLikeHtml = contentType.includes("html");
        setModelExists(res.ok && !looksLikeHtml);
      })
      .catch(() => { if (!cancelled) setModelExists(false); });
    return () => { cancelled = true; };
  }, []);

  if (modelExists === false) {
    return <ModelMissing />;
  }

  return (
    <div className="w-full h-full relative bg-[#070b12]">
      {modelExists && (
        <ViewerErrorBoundary>
          <Canvas camera={{ position: [40, 30, 40], fov: 45 }} shadows dpr={[1, 2]}>
            <color attach="background" args={["#070b12"]} />
            <Lighting />
            <Suspense fallback={null}>
              <Bounds fit clip observe margin={1.3}>
                <Model />
              </Bounds>
              <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={80} blur={2} far={40} />
            </Suspense>
            <OrbitControls enablePan makeDefault minDistance={10} maxDistance={150} />
          </Canvas>
        </ViewerErrorBoundary>
      )}
      {modelExists === null && <ViewerLoading />}
    </div>
  );
}

// Preload once the model is confirmed to exist; safe no-op if not yet checked.
useGLTF.preload(GARDEN_LOFTS_MODEL_PATH);
