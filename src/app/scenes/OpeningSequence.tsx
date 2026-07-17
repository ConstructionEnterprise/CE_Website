import { Scene } from "./Scene";

/**
 * The CE scroll-driven opening sequence. Ten scenes, built directly from
 * CE Universe renders, playing the full Factory → Foundation story before
 * the site "unlocks" into the existing scroll site (Company, Products,
 * Facility, etc.).
 *
 * Images live in public/scenes/ — see public/scenes/README.md for the
 * filename convention if new renders are swapped in later.
 */

export function OpeningSequence() {
  return (
    <>
      {/* Scene 1 — Site Selection: GIS / drone ops room, push toward the site map */}
      <Scene
        id="scene-gis"
        eyebrow="01 · IT STARTS WITH THE LAND"
        title="Every project starts with a site."
        body="Drone survey, topography, orthomosaic mapping — before a single module is designed, CE knows the ground it's building on."
        image="/scenes/01-gis.png"
        objectPosition="center 30%"
        from={{ scale: 1.0, x: -2 }}
        to={{ scale: 1.28, x: 6, y: -3 }}
      />

      {/* Scene 2 — Studio: push toward the Garden Lofts model on screen */}
      <Scene
        id="scene-studio"
        eyebrow="02 · THE STUDIO"
        title="Design begins."
        body="Design · Engineer · Manufacture · Build · Manage — the full process starts here, on screen, before it's ever steel."
        image="/scenes/02-studio.png"
        objectPosition="center 35%"
        from={{ scale: 1.0 }}
        to={{ scale: 1.3, x: 5, y: -2 }}
      />

      {/* Scene 3 — Module Design: Cedarwood typical module elevation, push toward the spec block */}
      <Scene
        id="scene-module"
        eyebrow="03 · THE BUILDING SYSTEM"
        title="One module, fully defined."
        body="12' wide. 30' long. Structural steel frame, factory-installed windows, MEP rough-in complete — before it ever leaves the shop."
        image="/scenes/03-module.png"
        objectPosition="center"
        from={{ scale: 1.05, y: 3 }}
        to={{ scale: 1.2, y: -3 }}
        height="170vh"
      />

      {/* Scene 4 — Building Design: Cedarwood Building B, pan across the full 180' facade */}
      <Scene
        id="scene-building"
        eyebrow="04 · SCALED UP"
        title="56 units. 5 stories. 28 modules per floor."
        body="The same module, repeated and stacked — a full building assembled from a known, repeatable system."
        detail="Cedarwood Flats · Building B"
        image="/scenes/04-cedarwood-building.png"
        objectPosition="center"
        from={{ scale: 1.15, x: -8 }}
        to={{ scale: 1.15, x: 8 }}
        height="180vh"
      />

      {/* Scene 5 — Elevator: hold, subtle push toward the doors */}
      <Scene
        id="scene-elevator"
        eyebrow="Descent"
        title="From the design floor to the shop floor."
        image="/scenes/05-elevator.png"
        objectPosition="center 20%"
        from={{ scale: 1.05, y: -3 }}
        to={{ scale: 1.22, y: 4 }}
        height="150vh"
      />

      {/* Scene 6 — Steel Intake: raw coil arriving, push toward the coil being lifted */}
      <Scene
        id="scene-steel"
        eyebrow="05 · THE FACTORY"
        title="Raw steel arrives."
        body="Coil stock, staged and tracked before it's ever rolled or cut."
        image="/scenes/06-steel-intake.png"
        objectPosition="center 40%"
        from={{ scale: 1.0, x: 4 }}
        to={{ scale: 1.25, x: -4, y: -2 }}
      />

      {/* Scene 7 — Sorting & Robotics: pan across the full production line */}
      <Scene
        id="scene-sorting"
        eyebrow="Sorted. Staged. Tracked."
        title="500,000 sq ft. 14 automated cells."
        body="Every piece of stock barcoded and routed to its destination station — panels to pods to full modules, under one roof."
        image="/scenes/07-sorting.png"
        objectPosition="center 45%"
        from={{ scale: 1.18, x: -9 }}
        to={{ scale: 1.18, x: 7 }}
        height="190vh"
      />

      {/* Scene 8 — Automated Cell: the roller table in action, push into the mechanism */}
      <Scene
        id="scene-cell"
        eyebrow="06 · CHAPPELL ROBOTICS"
        title="Wall panels move themselves."
        body="The Wall Panel Roller Transfer Table — automated handoff between fixed and tilt stations, holding alignment at every step."
        image="/scenes/08-automated-cell.png"
        objectPosition="center 35%"
        from={{ scale: 1.0, y: 2 }}
        to={{ scale: 1.3, y: -4 }}
      />

      {/* Scene 9 — The System: clean schematic view, slow push toward center */}
      <Scene
        id="scene-system"
        eyebrow="Engineered, not improvised"
        title="Every subsystem, specified."
        body="Roller count, transfer speed, drive location, travel position — logged and monitored in real time."
        detail="Subsystem 4 · Wall Panel Roller Transfer Table"
        image="/scenes/09-system-spec.png"
        objectPosition="center"
        from={{ scale: 1.0 }}
        to={{ scale: 1.22, y: -2 }}
        height="170vh"
      />

      {/* Scene 10 — Garden Lofts: the payoff. Start wide, settle on the hero tower. */}
      <Scene
        id="scene-garden-lofts"
        eyebrow="07 · GARDEN LOFTS"
        title="340 units. 20 stories. One integrated process."
        body="Designed, engineered, manufactured, and built by Construction Enterprises — factory build to crane set to complete."
        detail="Lewisville, TX"
        image="/scenes/10-garden-lofts.png"
        objectPosition="top center"
        from={{ scale: 1.02, y: 1 }}
        to={{ scale: 1.18, y: -2 }}
        height="230vh"
        overlayPosition="center"
      />
    </>
  );
}
