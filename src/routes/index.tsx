import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { cvContact, resumeDownload } from "@/data/cv";
import { featuredProjects, type Project } from "@/data/projects";
import type { PixelBlastProps } from "@/components/pixel-blast";

/**
 * sRGB hex of `--primary` (`oklch(0.62 0.21 25)`).
 *
 * The shader takes a hex color, not a CSS variable, so the brand red is
 * inlined here. Update both if the primary token changes.
 */
const HERO_BLAST_RED = "#ea3c3f";

/**
 * Homepage marketing copy.
 *
 * Claims stay inside the public resume: twenty years of Rails, the
 * platforms he actually led, and the companies named on the CV.
 */
const services = [
  {
    index: "01",
    title: "Rails platforms",
    body: "Twenty years of Rails, from 1.8 through 7.2. I modernize large legacy apps, stand up multi-tenant systems, and rebuild the admin tools teams actually use.",
  },
  {
    index: "02",
    title: "APIs & identity",
    body: "REST, GraphQL, and webhooks, plus enterprise SSO with OAuth2, SAML, and JWTs. Contracts stay versioned so partner apps do not break when the core moves.",
  },
  {
    index: "03",
    title: "Applied AI",
    body: "RAG pipelines, tool-calling agents, and the production details around them: safety, latency, and cost. Built on OpenAI, Gemini, LangChain, and Qdrant.",
  },
] as const;

const shippedWith = ["ScopeAR", "Vineti", "Change.org", "Yammer", "Grand Rounds", "LearnUp"] as const;

const principles = [
  {
    title: "On the floor",
    body: "I want to be in the work with a mission-driven team, not handing specs over a wall.",
  },
  {
    title: "Teams that learn",
    body: "Mentoring, pair programming, and writing the thing down so the next person is not guessing.",
  },
  {
    title: "Short, accurate deadlines",
    body: "I do well when the date is real and the scope is honest. Humor helps. So does shipping.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alain Bloch — Ruby Miner · Backend Engineer" },
      {
        name: "description",
        content:
          "Alain Bloch, aka Ruby Miner — a backend engineer digging deep into Ruby, Rails and Postgres to carve fast, dependable services.",
      },
      { property: "og:title", content: "Alain Bloch — Ruby Miner · Backend Engineer" },
      {
        property: "og:description",
        content:
          "I dig deep into Ruby, Rails and Postgres — carving fast, boring, dependable services out of messy legacy rock.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group block overflow-hidden rounded-2xl border border-glass-border transition-colors hover:border-primary/40 animate-rise"
      style={{ animationDelay: `${delay}ms` }}
    >
      {project.image ? (
        <div className="w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            width={1088}
            height={608}
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="grid aspect-[16/9] w-full place-items-center px-6 outline-1 -outline-offset-1 outline-glass-border">
          <code className="text-center font-mono text-xs text-muted-foreground sm:text-sm">
            {project.terminal}
          </code>
        </div>
      )}
      <div className="p-5">
        <div className="font-display text-3xl leading-none">{project.name}</div>
        <p className="mt-2 text-pretty text-sm text-muted-foreground">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-glass-border px-3 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/**
 * Red pixel field behind the hero copy.
 *
 * The WebGL module is imported after mount so the server render never
 * touches a canvas. The field fills the hero; copy sits above it and
 * ignores pointer events so clicks in the open space still spawn ripples.
 */
function HeroPixelField({
  className = "absolute inset-0 z-0",
  edgeFade = 0.35,
}: {
  className?: string;
  edgeFade?: number;
}) {
  const [Blast, setBlast] = useState<ComponentType<PixelBlastProps> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("@/components/pixel-blast").then((mod) => {
      if (!cancelled) setBlast(() => mod.PixelBlast);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={className}>
      {Blast ? <Blast color={HERO_BLAST_RED} className="h-full w-full" edgeFade={edgeFade} /> : null}
    </div>
  );
}

function HomePage() {
  return (
    <main className="relative">
      {/* Hero */}
      <section className="relative">
        <HeroPixelField />
        <div className="pointer-events-none relative z-10 mx-auto max-w-[80rem] px-6 pb-20 pt-16 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary animate-rise">
            Alain Bloch — Backend Engineer
          </p>
          <h1 className="mt-5 font-display text-[2.15rem] leading-[0.88] tracking-tight animate-rise sm:text-[4.25rem] md:text-[5rem] lg:text-[6.75rem] xl:text-[8.5rem]">
            Ship the next product
            <br />
            on a backend that holds.
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg text-pretty text-foreground animate-rise">
            I dig deep into Ruby, Rails and Postgres — carving fast, boring, dependable services out
            of messy legacy rock.
          </p>
          <div className="pointer-events-auto mt-8 flex items-center gap-3 animate-rise">
            <a
              href={resumeDownload.href}
              download={resumeDownload.filename}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Download CV
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-foreground px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10"
            >
              View projects
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs text-foreground animate-rise">
            <span>San Diego, CA</span>
            <span>/</span>
            <span>alainbloch@gmail.com</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-6 pb-20 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">What I build</p>
        <h2 className="mt-4 max-w-[16ch] font-display text-5xl tracking-wide sm:text-6xl">
          Platforms that stay up, and APIs people can ship against
        </h2>
        <div className="mt-10 grid grid-cols-1 border border-glass-border md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.index}
              className="border-t border-glass-border p-6 first:border-t-0 md:border-t-0 md:border-l md:first:border-l-0"
            >
              <p className="font-mono text-xs text-primary">{service.index}</p>
              <h3 className="mt-4 font-display text-3xl tracking-wide">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                {service.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-6 pb-20 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Where I have shipped</p>
        <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {shippedWith.map((name) => (
            <li key={name} className="font-display text-4xl tracking-wide sm:text-5xl">
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[80rem] px-6 pb-20 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">How I work</p>
            <h2 className="mt-4 font-display text-5xl tracking-wide">
              A teammate, not a ticket queue
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {principles.map((item, index) => (
              <li key={item.title} className="grid grid-cols-12 gap-4 border-t border-glass-border py-6">
                <span className="col-span-2 font-mono text-xs text-primary sm:col-span-1">
                  0{index + 1}
                </span>
                <div className="col-span-10 sm:col-span-11">
                  <h3 className="font-display text-3xl tracking-wide">{item.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-[80rem] px-6 pb-20 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-5xl tracking-wide">
            Featured <span className="text-primary">projects</span>
          </h2>
          <Link
            to="/projects"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
          >
            All projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={i * 80} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-6 pb-24 md:px-8">
        <div className="relative overflow-hidden border border-glass-border px-6 py-12 md:px-10">
          <HeroPixelField className="absolute inset-y-0 right-0 z-0 w-1/2" edgeFade={0} />
          <div className="pointer-events-none relative z-10">
            <h2 className="max-w-[16ch] font-display text-5xl tracking-wide sm:text-7xl">
              Let’s build your next big thing
            </h2>
            <p className="mt-4 max-w-[48ch] text-pretty text-foreground">
              Have a product, a platform, or a system your team has outgrown? Write me. I’ll help you
              design it and ship it — Rails, APIs, and the hard parts in between.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${cvContact.email}?subject=${encodeURIComponent("Let's build the next thing")}`}
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Start a project
            </a>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10"
            >
              Read the CV
            </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
