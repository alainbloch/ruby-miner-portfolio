/**
 * Portfolio catalog — Alain Bloch's own public GitHub repositories.
 *
 * Forks, empty stubs, and generated starters are left out. Copy is taken
 * from each repo's description or README, and `link` is that repo's URL.
 */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  kind: "open source" | "tooling";
  stat?: string;
  image?: string;
  terminal?: string;
  link: string;
};

const github = (repo: string) => `https://github.com/alainbloch/${repo}`;

export const featuredProjects: Project[] = [
  {
    slug: "formscaler",
    name: "Formscaler",
    tagline: "An open-core, AI-ready CMS for dynamic data.",
    description:
      "Formscaler is the open-core, AI-ready CMS for dynamic data. Define collections and permissions as data, publish pages, and let agents work through the same rules as your editors.",
    tags: ["Rails", "PostgreSQL", "JSON Schema", "MCP"],
    year: "2026",
    kind: "tooling",
    image: "/projects/formscaler.png",
    terminal: "formscaler.com",
    link: "https://formscaler.com/",
  },
  {
    slug: "doctransit",
    name: "DocTransit",
    tagline: "E-signatures that just work.",
    description:
      "DocTransit is e-signatures that just work. Send, sign, and track documents with clear monthly limits and a free plan that actually works.",
    tags: ["SaaS", "Docs"],
    year: "2026",
    kind: "tooling",
    image: "/projects/doctransit.png",
    terminal: "doctransit.com",
    link: "https://doctransit.com/",
  },
];

export const moreProjects: Project[] = [
  {
    slug: "openward",
    name: "Openward",
    tagline: "An open-source CMS and social networking platform.",
    description:
      "An experiment in metamedia: an open-source CMS and social networking platform. The app is a full Rails project with themes, specs, and its own required-gems list.",
    tags: ["Rails", "JavaScript"],
    year: "2010",
    kind: "open source",
    stat: "1 ★",
    terminal: "github.com/alainbloch/openward",
    link: github("openward"),
  },
  {
    slug: "vertical-response",
    name: "Vertical Response",
    tagline: "A Rails wrapper for the Vertical Response email API.",
    description:
      "A module that pushes members and newsletters onto pre-created lists in Vertical Response. It talks to the SOAP API (soap4r), can recreate the WSDL client, and supports an optional client certificate.",
    tags: ["Ruby", "Rails", "SOAP"],
    year: "2009",
    kind: "tooling",
    stat: "3 ★",
    terminal: "github.com/alainbloch/vertical-response",
    link: github("vertical-response"),
  },
    {
    slug: "uploadify-rails",
    name: "Uploadify Rails",
    tagline: "A Rails plugin that drops Uploadify in without the session headaches.",
    description:
      "Uploadify is a JavaScript library for uploading multiple files with progress bars. Uploadify Rails gets it running in a Rails app: it passes the authenticity token and session id through the Flash request, and sets the response format to JSON so the app can answer when a file lands.",
    tags: ["Rails", "JavaScript", "jQuery"],
    year: "2010",
    kind: "tooling",
    stat: "16 ★",
    terminal: "rake uploadify_rails:install",
    link: github("uploadify_rails"),
  },
  {
    slug: "twittest",
    name: "Twittest",
    tagline: "A Twitter-like app built as a 24-hour Rails exercise.",
    description:
      "A test to develop a Twitter-like application in 24 hours. Not on par with Twitter, and a demonstration of how Rails can produce a rich application in a short time. Released by RubyMiner LLC under the MIT license.",
    tags: ["Ruby", "Rails"],
    year: "2009",
    kind: "open source",
    stat: "1 ★",
    terminal: "github.com/alainbloch/twittest",
    link: github("twittest"),
  },
  {
    slug: "yellfire",
    name: "Yellfire",
    tagline: "Emergency message dissemination from the Podio Work 2.0 hackday.",
    description:
      "Emergency message dissemination, created for the Work 2.0 hackday at Podio. A Rails application built over that hackday.",
    tags: ["Ruby", "Rails"],
    year: "2011",
    kind: "open source",
    stat: "1 ★",
    terminal: "github.com/alainbloch/yellfire",
    link: github("yellfire"),
  },
  {
    slug: "fathom-audio-demo",
    name: "Fathom Audio Demo",
    tagline: "A demo app for a local Wave.js audio visualizer.",
    description:
      "A JavaScript demo that runs a wave visualizer. It can point its wave-visualizer dependency at a local clone of Wave.js so changes to the library can be tried in the app.",
    tags: ["JavaScript"],
    year: "2021",
    kind: "open source",
    terminal: "npm run dev",
    link: github("fathom-audio-demo"),
  },
  {
    slug: "unreal-browser",
    name: "Unreal Browser",
    tagline: "A browser implementation in Unreal.",
    description:
      "An Unreal project (Browser2.uproject) for a browser implementation inside the engine.",
    tags: ["Unreal"],
    year: "2022",
    kind: "open source",
    terminal: "Browser2.uproject",
    link: github("unrealbrowser"),
  },
  {
    slug: "refactor-pets",
    name: "Refactor Pets",
    tagline: "An abandoned Rails app used as an interview exercise.",
    description:
      "An interview prompt: the previous developer left, and the app lets users list their cats. The README scores candidates on ownership, data modeling, migrations, routing, object-oriented design, and whether they run the tests.",
    tags: ["Ruby", "Rails"],
    year: "2017",
    kind: "open source",
    stat: "1 ★",
    terminal: "github.com/alainbloch/refactor_pets",
    link: github("refactor_pets"),
  },
  {
    slug: "html-sanitizer",
    name: "HTML Sanitizer",
    tagline: "Sanitize chosen model attributes before save.",
    description:
      "A Rails plugin that wraps the sanitize gem. Declaring html_sanitizer on a model runs sanitization in a before_save callback, with an optional Sanitize config.",
    tags: ["Ruby", "Rails"],
    year: "2009",
    kind: "tooling",
    stat: "2 ★",
    terminal: "html_sanitizer :sanitize => [:name, :description]",
    link: github("html_sanitizer"),
  },
  {
    slug: "simple-search",
    name: "Simple Search",
    tagline: "Search a model's fields until a real search engine is in place.",
    description:
      "A Rails plugin that queries chosen columns with find_by_sql and sanitizes the term. Meant as a stopgap, not a search engine. Calling User.simple_search_query(\"foo\") returns matching records, with an optional order.",
    tags: ["Ruby", "Rails"],
    year: "2009",
    kind: "tooling",
    stat: "1 ★",
    terminal: 'User.simple_search_query("foo")',
    link: github("simple_search"),
  },
  {
    slug: "acts-as-flaggable",
    name: "Acts As Flaggable",
    tagline: "A Rails plugin for flagging records on different models.",
    description:
      "A simple way to add flags to different models. A Rails plugin released by Alain Bloch under the MIT license.",
    tags: ["Ruby", "Rails"],
    year: "2010",
    kind: "tooling",
    stat: "2 ★",
    terminal: "github.com/alainbloch/Acts-As-Flaggable",
    link: github("Acts-As-Flaggable"),
  },
  {
    slug: "noredink-quiz",
    name: "NoRedInk Quiz",
    tagline: "A Ruby quiz generator that skips questions a student has already seen.",
    description:
      "A small Ruby quiz. It loads questions and prior usage from CSV, drops questions the student has already been assigned, draws a quiz of the requested length, and returns the question ids sorted by difficulty.",
    tags: ["Ruby"],
    year: "2015",
    kind: "open source",
    terminal: "Quiz.new(length).generate",
    link: github("noredink"),
  },
];

export const allProjects: Project[] = [...featuredProjects, ...moreProjects];

/** Look up a portfolio project by its URL slug. Unknown slugs return undefined. */
export function findProject(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}
