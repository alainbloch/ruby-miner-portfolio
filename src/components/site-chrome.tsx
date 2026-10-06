import { Link, useRouterState } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/projects", label: "Projects", exact: false },
  { to: "/cv", label: "CV", exact: false },
] as const;

/**
 * Red stones of the header mark, in source order.
 *
 * Delay is assigned by sweeping x + y and spread across one 4.8s cycle
 * (the mark-stone animation), so a single wink walks the shape instead
 * of flashing neighbors that only happen to sit together in the SVG.
 */
const markStones = [
  { x: 27.19, y: 3.47, transform: "translate(18.81 -21.69) rotate(45)" },
  { x: 3.47, y: 3.47, transform: "translate(11.86 -4.91) rotate(45)" },
  { x: 15.33, y: 15.33, transform: "translate(23.72 -9.83) rotate(45)" },
  { x: 3.47, y: 27.19, transform: "translate(28.63 2.03) rotate(45)" },
  { x: 50.91, y: 3.47, transform: "translate(25.76 -38.46) rotate(45)" },
  { x: 62.78, y: 15.33, transform: "translate(37.62 -43.37) rotate(45)" },
  { x: 39.05, y: 15.33, transform: "translate(30.67 -26.6) rotate(45)" },
  { x: 50.91, y: 27.19, transform: "translate(42.53 -31.51) rotate(45)" },
  { x: 27.19, y: 27.19, transform: "translate(35.58 -14.74) rotate(45)" },
  { x: 39.05, y: 39.05, transform: "translate(47.44 -19.65) rotate(45)" },
  { x: 15.33, y: 39.05, transform: "translate(40.49 -2.88) rotate(45)" },
  { x: 27.19, y: 50.91, transform: "translate(52.35 -7.79) rotate(45)" },
  { x: 3.47, y: 50.91, transform: "translate(45.41 8.98) rotate(45)" },
  { x: 15.33, y: 62.78, transform: "translate(57.27 4.07) rotate(45)" },
  { x: 3.47, y: 74.64, transform: "translate(62.18 15.93) rotate(45)" },
  { x: 74.64, y: 27.19, transform: "translate(49.48 -48.28) rotate(45)" },
  { x: 86.5, y: 39.05, transform: "translate(61.34 -53.2) rotate(45)" },
  { x: 62.78, y: 39.05, transform: "translate(54.39 -36.42) rotate(45)" },
  { x: 74.64, y: 50.91, transform: "translate(66.25 -41.34) rotate(45)" },
  { x: 50.91, y: 50.91, transform: "translate(59.3 -24.56) rotate(45)" },
  { x: 62.78, y: 62.78, transform: "translate(71.16 -29.48) rotate(45)" },
  { x: 39.05, y: 62.78, transform: "translate(64.21 -12.7) rotate(45)" },
  { x: 50.91, y: 74.64, transform: "translate(76.07 -17.62) rotate(45)" },
  { x: 27.19, y: 74.64, transform: "translate(69.13 -.84) rotate(45)" },
  { x: 39.05, y: 86.5, transform: "translate(80.99 -5.76) rotate(45)" },
  { x: 15.33, y: 86.5, transform: "translate(74.04 11.02) rotate(45)" },
  { x: 27.19, y: 98.36, transform: "translate(85.9 6.1) rotate(45)" },
  { x: 3.47, y: 98.36, transform: "translate(78.95 22.88) rotate(45)" },
  { x: 98.36, y: 50.91, transform: "translate(73.2 -58.11) rotate(45)" },
  { x: 86.5, y: 62.78, transform: "translate(78.11 -46.25) rotate(45)" },
  { x: 98.36, y: 74.64, transform: "translate(89.97 -51.16) rotate(45)" },
  { x: 74.64, y: 74.64, transform: "translate(83.02 -34.39) rotate(45)" },
  { x: 86.5, y: 86.5, transform: "translate(94.88 -39.3) rotate(45)" },
  { x: 62.78, y: 86.5, transform: "translate(87.93 -22.53) rotate(45)" },
  { x: 74.64, y: 98.36, transform: "translate(99.79 -27.44) rotate(45)" },
  { x: 50.91, y: 98.36, transform: "translate(92.85 -10.67) rotate(45)" },
  { x: 74.64, y: 3.47, transform: "translate(32.7 -55.23) rotate(45)" },
  { x: 98.36, y: 3.47, transform: "translate(39.65 -72) rotate(45)" },
  { x: 86.5, y: 15.33, transform: "translate(44.56 -60.14) rotate(45)" },
  { x: 98.36, y: 27.19, transform: "translate(56.42 -65.06) rotate(45)" },
  { x: 98.36, y: 98.36, transform: "translate(106.74 -44.21) rotate(45)" },
] as const;

const markStoneSize = 16.77;

/**
 * Stones meet edge to edge. A hair of overlap hides the dark header in
 * the anti-aliased seam; without it those seams read as faint black lines.
 */
const markStoneOverlap = 1.14;

const markBlinkPeriod = 4.8;

/** Scale a stone around its own center, then apply the source rotation. */
function markStoneTransform(stone: { x: number; y: number; transform: string }) {
  const cx = stone.x + markStoneSize / 2;
  const cy = stone.y + markStoneSize / 2;
  return `${stone.transform} translate(${cx} ${cy}) scale(${markStoneOverlap}) translate(${-cx} ${-cy})`;
}

const markStoneDelay = new Map(
  markStones
    .map((stone, index) => ({ index, sweep: stone.x + stone.y }))
    .sort((a, b) => a.sweep - b.sweep)
    .map((entry, rank) => [entry.index, (rank * markBlinkPeriod) / markStones.length]),
);

/** Header logo: red stones only. Each one winks off for one beat, then returns. */
function SiteMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 118.6 118.6"
      className="size-7 shrink-0"
      aria-hidden="true"
    >
      {markStones.map((stone, index) => (
        <rect
          key={stone.transform}
          className="mark-stone"
          fill="#e81d2a"
          x={stone.x}
          y={stone.y}
          width={markStoneSize}
          height={markStoneSize}
          transform={markStoneTransform(stone)}
          style={{ animationDelay: `-${markStoneDelay.get(index)}s` }}
        />
      ))}
    </svg>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-glass-border bg-background/70 backdrop-blur-xl print:hidden">
      <div className="mx-auto flex h-16 max-w-[80rem] items-center justify-between px-6 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <SiteMark />
          <span className="font-display text-2xl leading-none tracking-wide">
            RUBY<span className="text-primary">MINER</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const active = link.exact
              ? pathname === "/"
              : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <a
          href="mailto:alainbloch@gmail.com"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-glass-border bg-background/60 backdrop-blur-xl print:hidden">
      <div className="mx-auto flex max-w-[80rem] flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center md:px-8">
        <div className="font-display text-3xl tracking-wide">
          Alain <span className="text-primary">Bloch</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground">
          <a
            href="https://github.com/alainbloch"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            GitHub
          </a>
          <a
            href="mailto:alain@rubyminer.dev"
            className="transition-colors hover:text-primary"
          >
            alain@rubyminer.dev
          </a>
          <span>© 2026 · Built with Rails &amp; stubbornness</span>
        </div>
      </div>
    </footer>
  );
}
