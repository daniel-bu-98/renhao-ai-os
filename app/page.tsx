import Image from "next/image";

const experiences = [
  {
    company: "Bosch",
    role: "AI data delivery and platform operations",
    highlights: [
      "Zeekr Europe Data Delivery",
      "Parking Static Data Delivery",
      "Data Operation Platform",
    ],
  },
  {
    company: "Zeekr",
    role: "Intelligent driving program execution",
    highlights: ["Intelligent Driving Project Management"],
  },
  {
    company: "Li Auto",
    role: "NOA data delivery and quality workflow",
    highlights: ["NOA Driving Static Data Delivery"],
  },
  {
    company: "Tencent Maps",
    role: "Large-scale map data production operations",
    highlights: ["Map Data Production and Operation"],
  },
];

const projects = [
  {
    title: "AI Data Engine",
    type: "Data platform",
    description:
      "A structured engine for ingesting, organizing, validating, and delivering AI-ready data across autonomous driving workflows.",
    impact:
      "Improved data delivery consistency, traceability, and operational visibility for model and product teams.",
    competency: "AI data architecture, workflow design, platform thinking",
  },
  {
    title: "AI Skills Library",
    type: "Knowledge system",
    description:
      "A reusable library of AI workflows, data skills, templates, and operational practices for production teams.",
    impact:
      "Turned repeated delivery know-how into scalable assets that teams can apply across projects.",
    competency: "AI methodology, documentation, enablement",
  },
  {
    title: "Operation Platform",
    type: "Internal product",
    description:
      "A platform concept for managing task intake, data production progress, quality control, and delivery governance.",
    impact:
      "Reduced coordination friction and gave stakeholders a shared view of production status and risks.",
    competency: "Product management, operations, data governance",
  },
  {
    title: "Spatial Prior Knowledge for Autonomous Driving Data Mining",
    type: "Data mining methodology",
    description:
      "A spatial-prior approach for identifying high-value autonomous driving data scenarios from map and driving context.",
    impact:
      "Helped teams prioritize data mining around scenarios with stronger relevance to perception and planning needs.",
    competency: "Spatial data, autonomous driving, scenario mining",
  },
  {
    title: "Singapore Traffic Light Detection",
    type: "Computer vision data project",
    description:
      "A traffic-light detection data initiative focused on urban signal scenarios and localization-specific complexity.",
    impact:
      "Supported more reliable traffic-light perception data coverage for Singapore road environments.",
    competency: "Annotation strategy, CV data quality, localization",
  },
  {
    title: "Navigation Data Production Overview",
    type: "Production framework",
    description:
      "A clear operating model for navigation data production, covering source intake, processing, QA, and delivery.",
    impact:
      "Created a repeatable production overview for cross-functional alignment and execution tracking.",
    competency: "Map data operations, process design, stakeholder alignment",
  },
];

const resumeItems = [
  "AI data professional with experience across autonomous driving, map data, data delivery, and data operation platforms.",
  "Product-minded builder who translates data production pain points into tools, workflows, and scalable operating methods.",
  "Project management lead comfortable coordinating cross-functional delivery across product, engineering, data, and business teams.",
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="text-lg font-semibold text-slate-950" href="#home">
            Renhao
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 sm:flex">
            <a className="transition hover:text-blue-600" href="#experience">
              Experience
            </a>
            <a className="transition hover:text-blue-600" href="#portfolio">
              Portfolio
            </a>
            <a className="transition hover:text-blue-600" href="#resume">
              Resume
            </a>
          </div>
        </nav>
      </header>

      <section
        id="home"
        className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-24"
      >
        <div>
          <p className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            AI Data | AI Product | Project Management
          </p>
          <h1 className="mt-7 text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">
            Renhao
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-700">
            Building AI-native data systems, platforms and operational
            methodologies.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/resume.pdf"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              View Resume
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700"
            >
              View Portfolio
            </a>
            <a
              href="https://github.com/renhao"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
          <Image
            src="/renhao-ai-data-hero.png"
            alt="Abstract AI data systems visual"
            width={1400}
            height={900}
            priority
            className="aspect-[4/3] h-auto w-full object-cover"
          />
        </div>
      </section>

      <section id="experience" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeader
            eyebrow="Experience"
            title="Data delivery, intelligent driving, and platform operations"
            description="Work spanning autonomous driving data, map production, operation platforms, and cross-functional delivery."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {experiences.map((experience) => (
              <article
                key={experience.company}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">
                      {experience.company}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {experience.role}
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    AI Data
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {experience.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected AI data and product work"
          description="Project themes that combine delivery rigor, product thinking, operational design, and AI-native data systems."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex min-h-[330px] flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                {project.type}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-7 text-slate-950">
                {project.title}
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">
                    Description:
                  </span>{" "}
                  {project.description}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Impact:</span>{" "}
                  {project.impact}
                </p>
              </div>
              <div className="mt-auto pt-6">
                <p className="rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Competency:
                  </span>{" "}
                  {project.competency}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="resume" className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Resume
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              AI data strategy with product and delivery discipline.
            </h2>
            <a
              href="/resume.pdf"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
            >
              Download Resume
            </a>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold">Summary</h3>
            <ul className="mt-5 space-y-4">
              {resumeItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-slate-200">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-blue-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              <div className="rounded-md border border-white/10 p-4">
                <p className="font-semibold text-white">Focus</p>
                <p className="mt-2">AI data systems</p>
              </div>
              <div className="rounded-md border border-white/10 p-4">
                <p className="font-semibold text-white">Strength</p>
                <p className="mt-2">Product operations</p>
              </div>
              <div className="rounded-md border border-white/10 p-4">
                <p className="font-semibold text-white">Domain</p>
                <p className="mt-2">Autonomous driving</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
