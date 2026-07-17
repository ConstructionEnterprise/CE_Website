import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { GardenLoftsViewer } from "@/app/components/three/GardenLoftsViewer";
import { OpeningSequence } from "@/app/scenes/OpeningSequence";
import { Menu, X, ArrowRight, ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

import heroImg from "@/imports/9652-1.png";
import facilityFloorImg from "@/imports/1736.png";
import facilityLogisticsImg from "@/imports/1735-1.png";
import roboticsDetailImg from "@/imports/4815.png";
import installationImg from "@/imports/5472.png";
import cedarwoodScheduleImg from "@/imports/7031.png";
import gardenLoftsImg from "@/imports/9775.png";
import cedarwoodSiteImg from "@/imports/756845e6-d780-42af-b677-0fea406d0514-1_all_3222.jpg";
import platformDashboardImg from "@/imports/file_00000000fecc71fb996dd600b0d22756.png";

const DISPLAY = "'Barlow Condensed', system-ui, sans-serif";
const BODY = "'Barlow', system-ui, sans-serif";
const MONO = "'DM Mono', monospace";

const METRICS = [
  { value: "500K", unit: "SQ FT", label: "Manufacturing Campus" },
  { value: "85%", unit: "", label: "Automated Production" },
  { value: "2,400", unit: "UNITS/YR", label: "Production Capacity" },
  { value: "3", unit: "ACTIVE", label: "Development Pipeline" },
];

const NAV_LINKS = [
  { id: "company", label: "Company" },
  { id: "products", label: "Products" },
  { id: "facility", label: "Facility" },
  { id: "process", label: "Process" },
  { id: "technology", label: "Technology" },
  { id: "projects", label: "Projects" },
  { id: "investors", label: "Investors" },
];

const PRODUCTS = [
  { num: "01", name: "Light-Gauge Steel Wall Panels", spec: "16–24 ga · R-20 insul · pre-wired", desc: "Factory-fabricated exterior and interior wall assemblies with integrated MEP rough-in and continuous insulation." },
  { num: "02", name: "Floor Systems", spec: "CFS joists · composite deck · STC 54+", desc: "Engineered floor assemblies with sub-flooring, insulation, and structural integration completed off-site." },
  { num: "03", name: "Roof Systems", spec: "Truss assemblies · TPO/EPDM ready", desc: "Pre-engineered roof structures with integrated drainage, mechanical penetrations, and waterproofing substrate." },
  { num: "04", name: "Bathroom Pods", spec: "Full MEP · tile · fixtures · 99% complete", desc: "Fully finished bathroom modules craned into position and connected — eliminating finish trades on site." },
  { num: "05", name: "Kitchen Pods", spec: "Cabinetry · countertops · appliance-ready", desc: "Complete kitchen modules with cabinetry, countertops, and appliance rough-in. Install and connect." },
  { num: "06", name: "Volumetric Modules", spec: "Up to 14′ × 60′ · 3-story stack-ready", desc: "Full-room-volume steel-framed modules completed to 90%+ finish in the factory before delivery." },
  { num: "07", name: "Complete Multifamily Buildings", spec: "3–30 stories · Type III / V · turnkey", desc: "End-to-end — from design through manufacturing, logistics, crane placement, and occupancy." },
];

const PROCESS_STEPS = [
  { num: "01", phase: "Design", desc: "Architectural design integrated with manufacturing constraints from day one. BIM-native, factory-constrained from the first line." },
  { num: "02", phase: "Engineering", desc: "Structural, MEP, and manufacturing engineering unified in one model. Clash detection and code compliance resolved before production." },
  { num: "03", phase: "Digital Twin", desc: "Full factory-to-field digital twin created before production begins. Every module, every component, tracked from steel to site." },
  { num: "04", phase: "Manufacturing", desc: "500,000 sq ft of automated production. Steel processing, panel assembly, pod finishing, and volumetric integration." },
  { num: "05", phase: "Quality Assurance", desc: "47-checkpoint inspection on every module. Dimensional verification, pressure testing, and photographic documentation." },
  { num: "06", phase: "Transportation", desc: "Precision logistics. Route planning, permitting, sequenced delivery timed to the crane pick schedule." },
  { num: "07", phase: "Installation", desc: "Crane placement engineered to the hour. Site and factory teams fully integrated through the F→F platform." },
  { num: "08", phase: "Completed Development", desc: "Turnkey multifamily development — delivered faster, more precisely, and with less site waste than any conventional method." },
];

const FACILITY_AREAS = [
  { code: "F-01", name: "Manufacturing Campus", detail: "500,000 sq ft · Saginaw, TX" },
  { code: "F-02", name: "Steel Processing", detail: "Automated CNC cutting, roll forming" },
  { code: "F-03", name: "Panel Assembly Lines", detail: "4 parallel wall panel production lines" },
  { code: "F-04", name: "Pod Production", detail: "Bath, kitchen, utility pods" },
  { code: "F-05", name: "Module Integration", detail: "Volumetric module final assembly" },
  { code: "F-06", name: "Quality Control", detail: "47-point inspection protocol" },
  { code: "F-07", name: "Material Handling", detail: "Automated conveyor + overhead crane network" },
  { code: "F-08", name: "Logistics & Dispatch", detail: "On-site transport staging + route planning" },
];

const TECH_MODULES = [
  { code: "OS-01", name: "BIM Integration", desc: "Live Revit / IFC sync — design model drives factory floor programming directly." },
  { code: "OS-02", name: "Production Scheduling", desc: "AI-assisted line balancing and production planning tied to project delivery milestones." },
  { code: "OS-03", name: "Digital Twin", desc: "Every component tracked from steel coil to installed module with full genealogy tracing." },
  { code: "OS-04", name: "Robotics Control", desc: "Chappell Robotics integration across 14 automated work cells." },
  { code: "OS-05", name: "Quality Management", desc: "IoT sensor data, photogrammetry, and inspection records tied to each module serial number." },
  { code: "OS-06", name: "Construction Management", desc: "Site scheduling, crane pick sequences, and field team coordination in one platform." },
];

const PARTNER_CATEGORIES = [
  { name: "Steel Suppliers", partners: ["Nucor Steel", "Commercial Metals Company", "Steel Technologies"] },
  { name: "Engineering Firms", partners: ["Walter P Moore", "Magnusson Klemencic Associates", "Arup"] },
  { name: "Technology Partners", partners: ["Chappell Robotics", "Autodesk", "Trimble"] },
  { name: "General Contractors", partners: ["McCarthy Building Companies", "Hensel Phelps", "JE Dunn"] },
  { name: "Developers", partners: ["Greystar", "AvalonBay Communities", "MAA"] },
  { name: "Municipal Clients", partners: ["City of Waxahachie", "Ellis County", "Tarrant County"] },
];

const CAREER_TRACKS = [
  { track: "Manufacturing", roles: ["Production Technician", "CNC Operator", "Welding Specialist", "Quality Inspector"], count: 24 },
  { track: "Construction", roles: ["Site Superintendent", "Installation Foreman", "Crane Operator", "Safety Officer"], count: 18 },
  { track: "Engineering", roles: ["Structural Engineer", "MEP Designer", "Manufacturing Engineer", "BIM Coordinator"], count: 15 },
  { track: "Software", roles: ["Platform Engineer", "Robotics Developer", "Data Scientist", "DevOps Engineer"], count: 12 },
  { track: "Corporate", roles: ["Project Manager", "Operations Analyst", "Finance", "Business Development"], count: 10 },
];

// ─── Helper components ───────────────────────────────────────────────────────

function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-primary text-[10px] tracking-[0.3em]" style={{ fontFamily: MONO }}>{num}</span>
      <div className="w-8 h-px bg-primary/50" />
      <span className="text-muted-foreground text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: MONO }}>{text}</span>
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-border/50" />;
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", type: "developer", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  const inputCls = "w-full bg-[#0a0f18] border border-white/10 px-4 py-3 text-foreground text-sm focus:border-primary/50 outline-none transition-colors placeholder:text-muted-foreground/40";

  if (sent) {
    return (
      <div className="border border-primary/30 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: MONO }}>Transmission Received</div>
        <h3 className="text-3xl font-black text-foreground uppercase" style={{ fontFamily: DISPLAY }}>We Will Be In Touch</h3>
        <p className="text-muted-foreground text-sm mt-4 leading-relaxed">Our team responds within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2" style={{ fontFamily: MONO }}>Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Full name" required />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2" style={{ fontFamily: MONO }}>Company</label>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} placeholder="Organization" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2" style={{ fontFamily: MONO }}>Email</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="your@company.com" required />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2" style={{ fontFamily: MONO }}>Inquiry Type</label>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputCls}>
          <option value="developer">Developer / Client</option>
          <option value="gc">General Contractor</option>
          <option value="investor">Investor</option>
          <option value="partner">Partner / Supplier</option>
          <option value="career">Careers</option>
          <option value="media">Media</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2" style={{ fontFamily: MONO }}>Message</label>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className={`${inputCls} resize-none`} placeholder="Tell us about your project or inquiry..." required />
      </div>
      <button type="submit" className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.15em] uppercase font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2" style={{ fontFamily: DISPLAY }}>
        Send Message <ArrowRight size={14} />
      </button>
    </form>
  );
}

// ─── Reveal (scroll-triggered section animation) ───────────────────────────────

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Intro Loader (factory boot sequence, plays once on landing) ──────────────

const INTRO_DURATION_MS = 1600;
const INTRO_EXIT_MS = 700;

function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / INTRO_DURATION_MS, 1);
      setProgress(Math.floor(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(onComplete, INTRO_EXIT_MS);
      return () => clearTimeout(t);
    }
  }, [exiting, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#050810] flex flex-col items-center justify-center overflow-hidden"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: INTRO_EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-14 h-14 bg-primary flex items-center justify-center mb-7 relative z-10"
          >
            <span className="text-primary-foreground font-black text-xl" style={{ fontFamily: DISPLAY }}>CE</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground/60 text-[10px] tracking-[0.35em] uppercase mb-8 relative z-10"
            style={{ fontFamily: MONO }}
          >
            Factory → Foundation
          </motion.div>
          <div className="w-56 h-px bg-white/10 relative overflow-hidden z-10">
            <div className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 text-primary text-[10px] tracking-[0.2em] relative z-10" style={{ fontFamily: MONO }}>
            {progress.toString().padStart(2, "0")}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [gardenLoftsView, setGardenLoftsView] = useState<"2d" | "3d">("2d");
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [introDone]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="bg-background text-foreground" style={{ fontFamily: BODY }}>
      <IntroLoader onComplete={() => setIntroDone(true)} />

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#070b12]/96 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-black text-sm tracking-wider" style={{ fontFamily: DISPLAY }}>CE</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-bold tracking-[0.18em] text-foreground/90 leading-none" style={{ fontFamily: DISPLAY }}>CONSTRUCTION ENTERPRISES</div>
              <div className="text-[9px] tracking-[0.15em] text-muted-foreground mt-0.5" style={{ fontFamily: MONO }}>DFW, TX · EST. 2020</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className={`relative pb-1 text-[11px] tracking-[0.15em] transition-colors uppercase font-bold ${activeSection === link.id ? "text-primary" : "text-foreground/50 hover:text-foreground/90"}`}
                style={{ fontFamily: DISPLAY }}>
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo("contact")}
              className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-[11px] tracking-[0.12em] uppercase font-bold hover:bg-primary/90 transition-colors"
              style={{ fontFamily: DISPLAY }}>
              Contact <ArrowRight size={12} />
            </button>
            <button className="lg:hidden text-foreground/60 hover:text-foreground p-1.5 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-[#070b12] border-t border-white/[0.06] px-6 py-3">
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-3 text-sm tracking-[0.15em] uppercase text-foreground/60 hover:text-primary border-b border-white/[0.05] last:border-0 transition-colors font-bold"
                style={{ fontFamily: DISPLAY }}>
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")}
              className="mt-4 mb-2 w-full bg-primary text-primary-foreground py-3 text-xs tracking-[0.15em] uppercase font-bold"
              style={{ fontFamily: DISPLAY }}>
              Contact Us
            </button>
          </div>
        )}
      </header>

      {/* ── OPENING SEQUENCE (scroll-driven Factory → Foundation story) ────── */}
      <OpeningSequence />

      {/* ── HOME / HERO ────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0">
          <ImageWithFallback src={heroImg} alt="Construction Enterprises manufacturing campus — aerial view, DFW metro, TX" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b12]/75 via-[#070b12]/50 to-[#070b12]/92" />
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }} />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-screen-xl mx-auto px-6 pt-28 pb-8">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-6 h-px bg-primary" />
            <span className="text-primary text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: MONO }}>Construction Enterprises</span>
          </motion.div>
          <motion.h1
            className="text-[clamp(52px,9.5vw,118px)] font-black text-foreground leading-[0.9] uppercase tracking-tight"
            style={{ fontFamily: DISPLAY }}
            initial={{ opacity: 0, y: 24 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            From Factory
            <br />
            <span className="text-primary">To Foundation.</span>
          </motion.h1>
          <motion.p
            className="mt-7 max-w-lg text-foreground/55 text-base leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            We design, engineer, manufacture, and assemble complete multifamily buildings through an integrated industrial process — delivering faster, more precise, and more durable housing.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button onClick={() => scrollTo("facility")}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-[0.1em] uppercase font-bold hover:bg-primary/90 transition-colors"
              style={{ fontFamily: DISPLAY }}>
              Explore Facility <ArrowRight size={14} />
            </button>
            <button onClick={() => scrollTo("projects")}
              className="flex items-center gap-2 border border-foreground/25 text-foreground/70 px-6 py-3 text-sm tracking-[0.1em] uppercase font-bold hover:border-foreground/50 hover:text-foreground transition-colors"
              style={{ fontFamily: DISPLAY }}>
              View Projects <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>

        {/* Metrics bar */}
        <div className="relative z-10 border-t border-white/[0.08] bg-[#070b12]/85 backdrop-blur-sm">
          <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {METRICS.map((m) => (
              <div key={m.label} className="px-6 py-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[clamp(28px,3.5vw,36px)] font-black text-foreground leading-none" style={{ fontFamily: DISPLAY }}>{m.value}</span>
                  {m.unit && <span className="text-[10px] text-primary tracking-wider" style={{ fontFamily: MONO }}>{m.unit}</span>}
                </div>
                <div className="text-[10px] text-muted-foreground tracking-[0.12em] uppercase mt-1" style={{ fontFamily: MONO }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR COMPANY ────────────────────────────────────────────────────── */}
      <section id="company" className="py-24 bg-[#0a0f18]">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel num="01" text="Our Company" />
              <h2 className="text-[clamp(38px,5.5vw,70px)] font-black text-foreground leading-none uppercase mt-5" style={{ fontFamily: DISPLAY }}>
                The Industrial Answer
                <br />
                to the
                <br />
                <span className="text-primary">Housing Crisis.</span>
              </h2>
              <p className="mt-6 text-foreground/55 leading-relaxed max-w-md text-[15px]">
                Construction Enterprises is a vertically integrated advanced manufacturer and developer. We don't just build — we industrialize the entire process, from raw steel to finished building.
              </p>
              <p className="mt-4 text-foreground/55 leading-relaxed max-w-md text-[15px]">
                Founded in 2020 and headquartered in the Dallas-Fort Worth metro, we operate a 500,000 square foot manufacturing campus in Saginaw, TX producing light-gauge steel panels, pods, and complete volumetric modules.
              </p>

              <div className="mt-10">
                <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-4" style={{ fontFamily: MONO }}>Timeline</div>
                <div className="space-y-0">
                  {[
                    { year: "2020", event: "Company founded. Site acquisition and 500,000 sq ft facility designed." },
                    { year: "2021", event: "Manufacturing campus commissioned. First production lines operational." },
                    { year: "2022", event: "Cedarwood Flats groundbreaking. 280 units, 5-building modular campus." },
                    { year: "2023", event: "Robotics integration. Chappell Robotics partnership — 14 automated work cells." },
                    { year: "2024", event: "Garden Lofts approved. 20-story volumetric modular high-rise." },
                    { year: "2025", event: "Factory → Foundation platform launched. BIM-to-factory automation live." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 py-3.5 border-b border-white/[0.06] last:border-0">
                      <span className="text-primary text-sm w-11 shrink-0" style={{ fontFamily: MONO }}>{item.year}</span>
                      <span className="text-foreground/60 text-sm leading-relaxed">{item.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-white/[0.08] p-8">
                <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-4" style={{ fontFamily: MONO }}>Mission</div>
                <blockquote className="text-xl font-medium text-foreground leading-relaxed" style={{ fontFamily: DISPLAY }}>
                  "To industrialize construction — building faster, more precisely, and at lower cost — so that high-quality multifamily housing is accessible to every community."
                </blockquote>
              </div>

              <div>
                <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-4" style={{ fontFamily: MONO }}>Leadership</div>
                <div className="bg-white/[0.06] p-px">
                  <div className="bg-[#0a0f18] p-5">
                    <div className="text-foreground font-medium text-sm">Joshua Chappell</div>
                    <div className="text-primary text-[10px] tracking-wide mt-1" style={{ fontFamily: MONO }}>Founder & President</div>
                    <div className="text-muted-foreground text-[11px] mt-1">Design · Engineer · Manufacture · Build · Manage — integration and execution across the full CE build stack.</div>
                  </div>
                </div>
              </div>

              <div className="border border-white/[0.08] p-6">
                <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-4" style={{ fontFamily: MONO }}>CE Ecosystem</div>
                <div className="space-y-3">
                  {[
                    { name: "Stonepine Residences", sub: "Single-Family Modular" },
                    { name: "Cedarwood Flats", sub: "Low-Rise Multifamily · Waxahachie" },
                    { name: "Garden Lofts", sub: "Mid-Rise Multifamily · Lewisville" },
                    { name: "Skyline Towers", sub: "High-Rise Mixed-Use" },
                    { name: "Chappell International", sub: "LGS Manufacturing · Saginaw" },
                    { name: "Chappell Robotics", sub: "R&D Division" },
                  ].map((e) => (
                    <div key={e.name} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-primary rounded-full shrink-0 mt-2" />
                      <div>
                        <div className="text-foreground/90 text-sm font-medium">{e.name}</div>
                        <div className="text-muted-foreground text-xs">{e.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── PRODUCTS ───────────────────────────────────────────────────────── */}
      <section id="products" className="py-24 bg-background">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel num="02" text="Our Products" />
              <h2 className="text-[clamp(36px,5vw,64px)] font-black text-foreground leading-none uppercase mt-5" style={{ fontFamily: DISPLAY }}>
                Manufactured
                <br />
                Building Systems
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed md:text-right">
              Every product fabricated to specification in our Saginaw, TX facility and delivered installation-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.05]">
            {PRODUCTS.map((p) => (
              <div key={p.num} className="bg-background p-6 transition-all duration-300 hover:bg-[#0d1520] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(234,179,8,0.35),0_12px_24px_-8px_rgba(0,0,0,0.5)]">
                <div className="text-primary text-[10px] tracking-[0.25em] mb-4" style={{ fontFamily: MONO }}>{p.num}</div>
                <h3 className="text-[18px] font-bold text-foreground uppercase leading-tight mb-3" style={{ fontFamily: DISPLAY }}>{p.name}</h3>
                <div className="text-[10px] text-primary/70 mb-3 tracking-wide" style={{ fontFamily: MONO }}>{p.spec}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
            <div className="bg-primary p-6 flex flex-col justify-between">
              <div className="text-2xl font-black text-primary-foreground uppercase leading-tight" style={{ fontFamily: DISPLAY }}>
                Full Product
                <br />
                Catalog
              </div>
              <div>
                <p className="text-primary-foreground/60 text-sm leading-relaxed mt-4">Detailed specs, tolerances, and integration guides for every system.</p>
                <button className="mt-6 flex items-center gap-2 text-primary-foreground text-sm tracking-wide hover:gap-3 transition-all" style={{ fontFamily: MONO }}>
                  Request specs <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── FACILITY ───────────────────────────────────────────────────────── */}
      <section id="facility" className="py-24 bg-[#0a0f18]">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="03" text="Our Facility" />
          <h2 className="text-[clamp(36px,5vw,64px)] font-black text-foreground leading-none uppercase mt-5 mb-14" style={{ fontFamily: DISPLAY }}>
            500,000 Sq Ft.
            <br />
            <span className="text-primary">Built for Volume.</span>
          </h2>
        </div>

        <div className="relative h-[52vh] min-h-[340px] mb-16">
          <ImageWithFallback src={facilityFloorImg} alt="CE manufacturing floor — overhead crane and steel stud racking system" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f18]/80 via-[#0a0f18]/20 to-[#0a0f18]/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-screen-xl mx-auto px-6">
              <div className="text-[10px] text-primary tracking-[0.3em] uppercase mb-2" style={{ fontFamily: MONO }}>Manufacturing Floor — Saginaw, TX</div>
              <div className="text-4xl font-black text-foreground uppercase leading-tight" style={{ fontFamily: DISPLAY }}>
                Steel Processing
                <br />& Panel Assembly
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative h-[420px]">
            <ImageWithFallback src={facilityLogisticsImg} alt="CE material handling — steel coil delivery and forklift logistics" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0f18] to-transparent h-28" />
            <div className="absolute bottom-4 left-4">
              <div className="text-[10px] text-primary tracking-[0.2em] uppercase" style={{ fontFamily: MONO }}>Material Handling · F-07</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/[0.05]">
            {FACILITY_AREAS.map((area) => (
              <div key={area.code} className="bg-[#0a0f18] p-5 hover:bg-[#0f1620] transition-colors">
                <div className="text-primary text-[10px] tracking-[0.2em] uppercase mb-2" style={{ fontFamily: MONO }}>{area.code}</div>
                <div className="text-foreground font-bold text-sm uppercase mb-1" style={{ fontFamily: DISPLAY }}>{area.name}</div>
                <div className="text-muted-foreground text-xs leading-relaxed">{area.detail}</div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────────── */}
      <section id="process" className="py-24 bg-background">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel num="04" text="Our Process" />
              <h2 className="text-[clamp(36px,5vw,64px)] font-black text-foreground leading-none uppercase mt-5 mb-12" style={{ fontFamily: DISPLAY }}>
                From First Line
                <br />
                <span className="text-primary">to Final Inspection.</span>
              </h2>

              <div className="relative pl-12">
                <div className="absolute left-[17px] top-2 bottom-2 w-px bg-white/[0.08]" />
                {PROCESS_STEPS.map((step) => (
                  <div key={step.num} className="flex gap-0 pb-8 last:pb-0 relative -ml-12">
                    <div className="shrink-0 w-[36px] h-[36px] border border-white/10 bg-background flex items-center justify-center relative z-10 mr-6">
                      <span className="text-[10px] text-primary" style={{ fontFamily: MONO }}>{step.num}</span>
                    </div>
                    <div className="pt-1.5">
                      <div className="text-foreground font-bold text-lg uppercase leading-none" style={{ fontFamily: DISPLAY }}>{step.phase}</div>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-2">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:pt-14">
              <div className="relative h-[360px]">
                <ImageWithFallback src={installationImg} alt="Phase 9B — ground floor module installation with crane" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] text-primary tracking-[0.2em] uppercase mb-1" style={{ fontFamily: MONO }}>Factory → Foundation Digital Twin</div>
                  <div className="text-white text-xl font-bold uppercase leading-tight" style={{ fontFamily: DISPLAY }}>Phase 9B — Ground Floor Completion</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-px bg-white/[0.05]">
                {[
                  { label: "20 Months", sub: "Cedarwood Flats total schedule" },
                  { label: "47 Points", sub: "QA inspection protocol per module" },
                  { label: "±3mm", sub: "Module dimensional tolerance target" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background p-5">
                    <div className="text-2xl font-black text-foreground" style={{ fontFamily: DISPLAY }}>{stat.label}</div>
                    <div className="text-muted-foreground text-xs mt-1.5 leading-relaxed">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── TECHNOLOGY ─────────────────────────────────────────────────────── */}
      <section id="technology" className="py-24 bg-[#070b12]">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="05" text="Technology" />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 mt-5">
            <h2 className="text-[clamp(40px,6vw,82px)] font-black text-foreground leading-none uppercase" style={{ fontFamily: DISPLAY }}>
              Factory <span className="text-primary">→</span>
              <br />
              Foundation
              <br />
              <span className="text-foreground/20">Operating System</span>
            </h2>
            <p className="text-muted-foreground max-w-sm leading-relaxed lg:text-right text-[15px]">
              The integrated technology stack connecting design intent to manufactured reality — every module, every component, every workflow — in one platform.
            </p>
          </div>

          <div className="border border-white/[0.08] mb-10">
            <div className="h-9 bg-[#0c1320] border-b border-white/[0.06] flex items-center px-5 gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="ml-2 text-[10px] text-muted-foreground tracking-[0.15em]" style={{ fontFamily: MONO }}>
                FACTORY → FOUNDATION · GENEALOGY EXPLORER · LIVE
              </span>
            </div>
            <ImageWithFallback src={platformDashboardImg} alt="Factory to Foundation platform — genealogy explorer showing end-to-end component traceability" className="w-full object-contain" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] mb-0">
            {TECH_MODULES.map((mod) => (
              <div key={mod.code} className="bg-[#070b12] p-6 hover:bg-[#0c1320] transition-colors">
                <div className="text-primary text-[10px] tracking-[0.25em] uppercase mb-3" style={{ fontFamily: MONO }}>{mod.code}</div>
                <div className="text-foreground font-bold uppercase text-lg leading-tight mb-2" style={{ fontFamily: DISPLAY }}>{mod.name}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{mod.desc}</p>
              </div>
            ))}
            <div className="relative overflow-hidden">
              <ImageWithFallback src={roboticsDetailImg} alt="Chappell Robotics — wall panel roller transfer table, Subsystem 4" className="w-full h-full object-cover min-h-[220px]" />
              <div className="absolute inset-0 bg-[#070b12]/65" />
              <div className="absolute bottom-5 left-5">
                <div className="text-[10px] text-primary tracking-[0.2em] uppercase mb-1" style={{ fontFamily: MONO }}>Chappell Robotics · OS-04</div>
                <div className="text-white font-bold uppercase leading-tight" style={{ fontFamily: DISPLAY }}>
                  14 Robotic
                  <br />
                  Work Cells
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 bg-background">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="06" text="Projects" />
          <h2 className="text-[clamp(36px,5vw,64px)] font-black text-foreground leading-none uppercase mt-5 mb-16" style={{ fontFamily: DISPLAY }}>
            Built. In Progress.
            <br />
            <span className="text-primary">Coming Next.</span>
          </h2>

          {/* Cedarwood Flats */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-[10px] text-primary tracking-[0.25em] uppercase" style={{ fontFamily: MONO }}>Project · 01</div>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <div className="text-[10px] text-muted-foreground tracking-wide" style={{ fontFamily: MONO }}>In Construction</div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-4xl font-black text-foreground uppercase mb-2" style={{ fontFamily: DISPLAY }}>Cedarwood Flats</h3>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mb-5 text-[10px] text-muted-foreground" style={{ fontFamily: MONO }}>
                  <span>280 UNITS</span><span>·</span><span>5 BUILDINGS</span><span>·</span><span>5 STORIES</span><span>·</span><span>LIGHT-GAUGE STEEL</span><span>·</span><span>20 MONTHS</span>
                </div>
                <p className="text-foreground/55 text-sm leading-relaxed mb-6">
                  Five-building modular residential campus using Type V light-gauge steel framing. CE provides full manufacturing, transportation, and installation services.
                </p>
                <div className="relative h-[280px]">
                  <ImageWithFallback src={cedarwoodSiteImg} alt="Cedarwood Flats earthwork plan — five building footprints and site layout" className="w-full h-full object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16" />
                </div>
              </div>
              <div className="bg-[#f5f2ed] h-[400px] flex items-center justify-center">
                <ImageWithFallback src={cedarwoodScheduleImg} alt="Cedarwood Flats modular construction master schedule Gantt chart — 20 months" className="w-full h-full object-contain p-2" />
              </div>
            </div>
          </div>

          <Divider />

          {/* Garden Lofts */}
          <div className="pt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-[10px] text-primary tracking-[0.25em] uppercase" style={{ fontFamily: MONO }}>Project · 02</div>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <div className="text-[10px] text-muted-foreground tracking-wide" style={{ fontFamily: MONO }}>Approved · Pre-Production</div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="relative h-[520px]">
                {gardenLoftsView === "3d" ? (
                  <GardenLoftsViewer />
                ) : (
                  <ImageWithFallback src={gardenLoftsImg} alt="Garden Lofts — 20-story modular multifamily high-rise with rooftop sky garden" className="w-full h-full object-cover object-top" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent lg:hidden pointer-events-none" />
                <div className="absolute top-3 right-3 flex bg-[#070b12]/90 backdrop-blur-sm border border-white/[0.1] overflow-hidden">
                  <button
                    onClick={() => setGardenLoftsView("2d")}
                    className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-bold transition-colors ${gardenLoftsView === "2d" ? "bg-primary text-primary-foreground" : "text-foreground/50 hover:text-foreground/80"}`}
                    style={{ fontFamily: DISPLAY }}>
                    2D
                  </button>
                  <button
                    onClick={() => setGardenLoftsView("3d")}
                    className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-bold transition-colors ${gardenLoftsView === "3d" ? "bg-primary text-primary-foreground" : "text-foreground/50 hover:text-foreground/80"}`}
                    style={{ fontFamily: DISPLAY }}>
                    3D
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-black text-foreground uppercase mb-2" style={{ fontFamily: DISPLAY }}>Garden Lofts</h3>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mb-5 text-[10px] text-muted-foreground" style={{ fontFamily: MONO }}>
                  <span>340 UNITS</span><span>·</span><span>20 STORIES</span><span>·</span><span>VOLUMETRIC MODULAR</span>
                </div>
                <p className="text-foreground/55 text-sm leading-relaxed mb-6">
                  20-story volumetric modular high-rise with rooftop sky garden, fitness center, co-working lounge, and outdoor amenity deck. Full vertical integration — CE manufactures every module.
                </p>
                <div className="grid grid-cols-2 gap-px bg-white/[0.05] mb-6">
                  {[
                    { label: "Structure", val: "Light-gauge steel" },
                    { label: "Construction", val: "Volumetric modular" },
                    { label: "Amenities", val: "Sky garden, gym, cowork" },
                    { label: "Module Types", val: "Studio, 1BR, 2BR, amenity" },
                  ].map((item) => (
                    <div key={item.label} className="bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(234,179,8,0.3)]">
                      <div className="text-[10px] text-muted-foreground tracking-wide" style={{ fontFamily: MONO }}>{item.label}</div>
                      <div className="text-foreground text-sm font-medium mt-1">{item.val}</div>
                    </div>
                  ))}
                </div>
                <div className="border border-white/[0.08] p-5">
                  <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-3" style={{ fontFamily: MONO }}>Modular Construction Process</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {["Factory Built", "Transport", "Crane Set", "Complete"].map((step, i, arr) => (
                      <div key={step} className="flex items-center gap-2">
                        <div className="text-xs text-foreground/70 font-medium">{step}</div>
                        {i < arr.length - 1 && <ArrowRight size={10} className="text-primary shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── PARTNERS ───────────────────────────────────────────────────────── */}
      <section id="partners" className="py-24 bg-[#0a0f18]">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="07" text="Partners" />
          <h2 className="text-[clamp(36px,5vw,64px)] font-black text-foreground leading-none uppercase mt-5 mb-12" style={{ fontFamily: DISPLAY }}>
            An Integrated
            <br />
            <span className="text-primary">Supply Chain.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {PARTNER_CATEGORIES.map((cat) => (
              <div key={cat.name} className="bg-[#0a0f18] p-6 hover:bg-[#0f1620] transition-colors">
                <div className="text-foreground font-bold uppercase text-lg mb-5" style={{ fontFamily: DISPLAY }}>{cat.name}</div>
                <div className="space-y-2.5">
                  {cat.partners.map((p) => (
                    <div key={p} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1 h-1 bg-primary/60 rounded-full shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── INVESTORS ──────────────────────────────────────────────────────── */}
      <section id="investors" className="py-24 bg-background">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="08" text="Investors" />
          <div className="grid lg:grid-cols-2 gap-16 mt-6">
            <div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-black text-foreground leading-none uppercase" style={{ fontFamily: DISPLAY }}>
                Manufacturing Scale
                <br />
                Meets Development
                <br />
                <span className="text-primary">Return.</span>
              </h2>
              <p className="mt-6 text-foreground/55 leading-relaxed text-[15px]">
                Construction Enterprises combines a capital-efficient manufacturing model with a vertically integrated development pipeline — compressing timelines and improving margin through industrial process control.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-px bg-white/[0.05]">
                {[
                  { val: "30–40%", label: "Cost reduction vs. traditional stick frame" },
                  { val: "2×", label: "Faster delivery vs. conventional schedule" },
                  { val: "$2.4B", label: "Projected development pipeline value" },
                  { val: "18mo", label: "Average project delivery duration" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background p-6">
                    <div className="text-[clamp(28px,4vw,38px)] font-black text-primary leading-none" style={{ fontFamily: DISPLAY }}>{stat.val}</div>
                    <div className="text-muted-foreground text-xs mt-2.5 leading-relaxed">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {[
                { title: "Manufacturing Model", body: "Factory-based production eliminates weather delays, labor variability, and site inefficiencies. Fixed asset base generates operating leverage at scale." },
                { title: "Growth Strategy", body: "Grow the development pipeline and third-party panel/module supply simultaneously. DFW Phase 1 → regional expansion → national platform." },
                { title: "Competitive Moat", body: "Vertical integration from manufacturing through development creates a margin stack unavailable to standalone builders or developers. The Factory → Foundation OS builds a proprietary data and technology advantage." },
                { title: "Development Pipeline", body: "Current pipeline: Cedarwood Flats (280 units) and Garden Lofts (340 units), with 3 projects in pre-development totaling 800+ additional units." },
              ].map((item) => (
                <div key={item.title} className="border border-white/[0.08] p-6">
                  <div className="text-foreground font-bold uppercase text-lg mb-3" style={{ fontFamily: DISPLAY }}>{item.title}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
              <button
                className="flex items-center gap-2 border border-primary text-primary px-6 py-3.5 text-sm tracking-[0.1em] uppercase font-bold hover:bg-primary hover:text-primary-foreground transition-colors w-full justify-center"
                style={{ fontFamily: DISPLAY }}>
                Request Investor Deck <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── CAREERS ────────────────────────────────────────────────────────── */}
      <section id="careers" className="py-24 bg-[#0a0f18]">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="09" text="Careers" />
          <h2 className="text-[clamp(36px,5vw,64px)] font-black text-foreground leading-none uppercase mt-5 mb-12" style={{ fontFamily: DISPLAY }}>
            Build the Future
            <br />
            <span className="text-primary">of Construction.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {CAREER_TRACKS.map((track) => (
              <div key={track.track} className="bg-[#0a0f18] p-6 hover:bg-[#0f1620] transition-colors group">
                <div className="flex items-start justify-between mb-5">
                  <div className="text-foreground font-bold uppercase text-xl" style={{ fontFamily: DISPLAY }}>{track.track}</div>
                  <div className="text-primary text-sm" style={{ fontFamily: MONO }}>{track.count} open</div>
                </div>
                <div className="space-y-2.5">
                  {track.roles.map((role) => (
                    <div key={role} className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{role}</span>
                      <ArrowRight size={11} className="text-primary/0 group-hover:text-primary/50 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="bg-primary p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-primary-foreground/60 tracking-[0.25em] uppercase mb-3" style={{ fontFamily: MONO }}>Now Hiring</div>
                <div className="text-3xl font-black text-primary-foreground uppercase leading-tight" style={{ fontFamily: DISPLAY }}>
                  79 Open
                  <br />
                  Positions
                </div>
                <p className="text-primary-foreground/60 text-sm mt-4 leading-relaxed">
                  We're growing fast. Join the team building tomorrow's housing industry.
                </p>
              </div>
              <button className="mt-8 flex items-center gap-2 text-primary-foreground text-sm tracking-wide hover:gap-3 transition-all" style={{ fontFamily: MONO }}>
                View all roles <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-background">
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-6">
          <SectionLabel num="10" text="Contact" />
          <div className="grid lg:grid-cols-2 gap-16 mt-6">
            <div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-black text-foreground leading-none uppercase" style={{ fontFamily: DISPLAY }}>
                Work With
                <br />
                <span className="text-primary">Construction Enterprises.</span>
              </h2>
              <p className="mt-6 text-foreground/55 leading-relaxed max-w-sm text-[15px]">
                Whether you're a developer, general contractor, municipality, or investor — we'd like to hear from you.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  { Icon: MapPin, label: "Address", value: "Chappell International Facility, Saginaw, TX 76179" },
                  { Icon: Phone, label: "Phone", value: "+1 (817) 555-0140" },
                  { Icon: Mail, label: "Email", value: "contact@constructionenterprises.com" },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 border border-white/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase" style={{ fontFamily: MONO }}>{label}</div>
                      <div className="text-foreground/80 text-sm mt-0.5">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 border border-white/[0.08] p-6">
                <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-4" style={{ fontFamily: MONO }}>Inquiry Categories</div>
                <div className="grid grid-cols-2 gap-2">
                  {["Developers & Owners", "General Contractors", "Investors", "Partner Suppliers", "Media & Press", "Careers"].map((cat) => (
                    <div key={cat} className="flex items-center gap-2 text-sm text-foreground/60">
                      <div className="w-1 h-1 bg-primary/50 rounded-full shrink-0" />
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
        </Reveal>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-[#070b12] py-14">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-black text-xs" style={{ fontFamily: DISPLAY }}>CE</span>
                </div>
                <span className="text-[11px] tracking-[0.15em] text-foreground/80 font-bold uppercase" style={{ fontFamily: DISPLAY }}>Construction Enterprises</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">Advanced manufacturer of modular building systems. DFW, TX. Est. 2020.</p>
            </div>
            {[
              { title: "Company", links: ["About", "Leadership", "History", "Careers", "Contact"] },
              { title: "Products", links: ["Wall Panels", "Floor Systems", "Bathroom Pods", "Volumetric Modules", "Full Buildings"] },
              { title: "Platform", links: ["Factory → Foundation", "BIM Integration", "Digital Twin", "Robotics", "Investors"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-4" style={{ fontFamily: MONO }}>{col.title}</div>
                <div className="space-y-2">
                  {col.links.map((link) => (
                    <div key={link} className="text-muted-foreground/70 text-xs hover:text-muted-foreground transition-colors cursor-pointer">{link}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-muted-foreground/50 text-[11px]" style={{ fontFamily: MONO }}>© 2025 Construction Enterprises, LLC. All rights reserved.</div>
            <div className="text-muted-foreground/50 text-[11px]" style={{ fontFamily: MONO }}>EST. 2020 · DFW, TX · FACTORY → FOUNDATION</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
