import { useState } from "react";

const NAV = [
  ["Home", "#hero"],
  ["About", "#about"],
  ["Work", "#work"],
  ["Stack", "#stack"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

const ROLES = [
  {
    company: "Amazon",
    title: "Business Data Engineer Intern",
    dates: "May 2025 — Aug 2025",
    place: "Seattle",
    text: "Worked on a marketing attribution platform that scored 200M+ prospects from 87M+ touchpoints and 72+ signals. Rewrote the slow SQL so the same reads ran about 40% faster, and added a path for people who would rather ask a question than write the query.",
    skills: ["AWS", "Redshift", "Spark", "SQL"],
  },
  {
    company: "San Jose State University",
    title: "Graduate Student Assistant Analyst",
    dates: "Jan 2025 — Present",
    place: "San Jose",
    text: "Keeps the EdD program site, its databases, and the dashboards that sit on them in working order, and automated the newsletter so it does not depend on someone remembering to send it.",
    skills: ["SQL", "Dashboards", "Python", "Web"],
  },
  {
    company: "Spartan Analytics",
    title: "VP of Programs",
    dates: "Sep 2024 — Present",
    place: "San Jose",
    text: "Runs the program side of the student analytics club: data literacy sessions and mentorship in Python, SQL, Tableau, and machine learning.",
    skills: ["Python", "SQL", "Tableau", "Mentorship"],
  },
  {
    company: "Epsilon",
    title: "Data Engineer 2",
    dates: "Mar 2021 — Nov 2023",
    place: "Bengaluru",
    text: "Three roles in one seat: BI developer, data engineer, then data engineer 2. Pipelines on 15+ TB a day. Snowflake work that cut query latency about 40%. Kafka, Flink, Glue, dbt, and the reporting layer underneath.",
    skills: ["Snowflake", "Kafka", "dbt", "Spark"],
  },
  {
    company: "EY",
    title: "Data Analyst Intern",
    dates: "Apr 2018 — Jun 2018",
    place: "Kochi",
    text: "A first seat in a real data shop: Hadoop, Spark, and the dashboards that sat on top of them.",
    skills: ["Hadoop", "Spark", "Dashboards"],
  },
];

const PROJECTS = [
  {
    n: "01",
    name: "Uplift modeling",
    output: "Who to treat, not who looks likely",
    text: "A causal-ML walkthrough on the Hillstrom email experiment. Two-model and S/T/X learners, a doubly robust learner, Qini curves, and a budget curve that turns a score into a send decision.",
    tags: ["Causal ML", "Qini", "Policy"],
    live: null,
    source: "https://github.com/pranav-revee/uplift-modeling-causal-ml",
  },
  {
    n: "02",
    name: "Bandit experimentation",
    output: "A listing test that can stop",
    text: "An Airbnb-style listing test with four variants. A bandit against a fixed A/B split, with the directional read kept separate from the causal one, and a small dashboard on top.",
    tags: ["Bandits", "Experimentation", "Streamlit"],
    live: null,
    source: "https://github.com/pranav-revee/ai-bandit-experimentation-airbnb",
  },
  {
    n: "03",
    name: "Tabular Arena",
    output: "Same tables, same metric, different models",
    text: "LightGBM, CatBoost, XGBoost, AutoGluon, TabPFN, and an FT-Transformer on churn, Home Credit, and IEEE fraud. Primary metric is AUC-ROC. The comparison has a public page.",
    tags: ["Tabular ML", "AUC", "Benchmarks"],
    live: "https://pranav-revee.github.io/tabular-arena/",
    source: "https://github.com/pranav-revee/tabular-arena",
  },
  {
    n: "04",
    name: "Transit demand",
    output: "Feeds in, a forecast out",
    text: "Citi Bike, MTA, NJ Transit, PATH, ferry, and HRRR weather, ingested on a schedule, landed in Snowflake, modeled in dbt, and scored with an LSTM plus random-forest ensemble.",
    tags: ["Airflow", "Snowflake", "dbt"],
    live: null,
    source: "https://github.com/pranav-revee/Real-time-transit-demand-forecasting",
  },
  {
    n: "05",
    name: "Urban perception",
    output: "Pedestrians the baseline missed",
    text: "An attention U-Net for street scenes. Pedestrian mIoU moved from 55.4% to 71.4%. The gain is largest past 50 meters, which is the part of the frame planning actually needs.",
    tags: ["Segmentation", "Attention", "Planning"],
    live: null,
    source: "https://github.com/pranav-revee/safe-urban-perception-planning",
  },
  {
    n: "06",
    name: "DSPy, experiment calls",
    output: "Ship, iterate, or stop",
    text: "A fork of DSPy with one addition. The call is decided from the treatment effect and its interval. The model may explain the call. It does not make it.",
    tags: ["DSPy", "LLMs", "Causal"],
    live: null,
    source: "https://github.com/pranav-revee/dspy",
  },
];

const STACK = [
  "PYTHON  SQL   ",
  "  Y    N      ",
  "  T   SPARK   ",
  "  H      A    ",
  "  O     KAFKA ",
  "  N       F   ",
  " CAUSAL  L    ",
  "    A    AWS  ",
  "    L   DBT   ",
  " AIRFLOW K    ",
];

const STAMPS = [
  { kicker: "SEA_2025", title: "Amazon", detail: "Attribution for 200M+ prospects" },
  { kicker: "SJSU", title: "Graduate analyst", detail: "EdD site, data, dashboards" },
  { kicker: "CLUB", title: "Spartan Analytics", detail: "Programs and mentorship" },
  { kicker: "BLR", title: "Epsilon", detail: "15+ TB/day, three roles" },
];

function StampCell({ ch, mark }: { ch: string; mark: boolean }) {
  const filled = ch !== " ";
  return (
    <div
      className={`relative flex aspect-square items-center justify-center border-[0.5px] border-black/20 ${
        filled ? "bg-white" : "bg-black"
      }`}
    >
      {filled ? (
        <span className="font-display text-[clamp(10px,1.3vw,18px)] leading-none text-black">{ch}</span>
      ) : mark ? (
        <span className="block h-1/2 w-1/2 rounded-full border border-white/25 opacity-40" />
      ) : null}
    </div>
  );
}

export default function Studio() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#hero" className="flex items-center gap-3 text-lg font-black tracking-tight">
            Portfolio
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-green-700">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              Open to work
            </span>
          </a>
          <ul className="hidden items-center gap-6 lg:flex">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-sm font-medium hover:text-[#ff5500]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-0.5 w-6 bg-black transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-black transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-black transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
        {open && (
          <ul className="border-t border-black/10 bg-white px-5 py-3 lg:hidden">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="block py-2 text-sm font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <main>
        <section
          id="hero"
          className="relative flex h-[100svh] min-h-[560px] flex-col justify-end overflow-hidden bg-white px-6 pb-14 pt-24 lg:px-12"
        >
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-2 flex w-full max-w-5xl justify-between px-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#ff5500] sm:text-xs md:text-sm">
              <span>Causal ML</span>
              <span>Experimentation</span>
              <span>Data platforms</span>
            </div>
            <h1
              className="font-display text-[22vw] leading-none tracking-tighter text-[#ff5500] md:text-[18vw]"
              style={{ WebkitTextStroke: "2px #ff5500" }}
            >
              PRANAV
            </h1>
          </div>
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-xl font-bold leading-snug tracking-tight text-[#ff5500] sm:text-2xl md:text-3xl">
              “A model that cannot name the decision is not finished.”
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:pranav.reveendran@sjsu.edu"
                className="blob border-[3px] border-black bg-[#ff5500] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-[3px_3px_0_#000] hover:shadow-[1px_1px_0_#000]"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/pranav-reveendran/"
                aria-label="LinkedIn"
                className="blob flex h-12 w-12 -rotate-3 items-center justify-center border-[3px] border-[#0A66C2] text-[#0A66C2] hover:bg-white"
              >
                in
              </a>
              <a
                href="https://github.com/pranav-revee"
                aria-label="GitHub"
                className="blob flex h-12 w-12 rotate-2 items-center justify-center border-[3px] border-black text-sm font-black hover:bg-white"
              >
                gh
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="border-t-[3px] border-black px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="mx-auto w-full max-w-[260px] -rotate-3 border border-neutral-200 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
              <p className="font-serif text-2xl italic leading-none text-[#ff5500]">
                Causal
                <br />
                <span className="ml-6 text-3xl">Studio</span>
              </p>
              <div className="my-5 flex aspect-[3/4] items-end border-[3px] border-neutral-300 bg-neutral-100 p-4">
                <p className="font-display text-5xl leading-none text-black/80">P.R.</p>
              </div>
              <p className="text-center font-display text-lg tracking-[0.18em]">PRANAV R.</p>
              <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-widest text-neutral-500">
                Data scientist · San Jose
              </p>
              <div
                className="h-8 w-full opacity-80"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #ff5500, #ff5500 3px, transparent 3px, transparent 6px, #ff5500 6px, #ff5500 8px, transparent 8px, transparent 14px)",
                }}
              />
            </div>

            <div className="border-[3px] border-black bg-white shadow-[10px_10px_0_#000]">
              <div className="grid grid-cols-3 border-b-[3px] border-black bg-[#0cae67] text-white">
                {[
                  ["4+", "Years"],
                  ["MS", "Data science"],
                  ["15+", "Projects"],
                ].map(([n, l], i) => (
                  <div
                    key={l}
                    className={`px-3 py-6 text-center ${i < 2 ? "border-r-[3px] border-black" : ""}`}
                  >
                    <div className="font-display text-4xl leading-none">{n}</div>
                    <div className="mt-1 text-[8px] font-black uppercase tracking-widest text-white/80">{l}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-8 p-7 md:p-10">
                <div>
                  <h2 className="font-display text-4xl uppercase leading-none tracking-tight md:text-5xl">About me</h2>
                  <div className="mt-4 space-y-3 text-sm font-bold leading-relaxed md:text-base">
                    <p>
                      I work on <span className="font-black text-[#0cae67]">decisions</span>, not dashboards that
                      stop at a chart. Uplift, bandits, and the pipelines that feed them. The question is who to
                      treat, which variant to keep, and when the interval is wide enough that the honest call is to
                      keep testing.
                    </p>
                    <p>
                      Most recently that was a summer at <span className="font-black text-[#0cae67]">Amazon</span> on
                      marketing attribution, and before that three years at Epsilon moving 15+ TB a day. I am in the
                      MS Data Science program at San Jose State.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Causal", "Uplift and policy"],
                    ["Platforms", "Spark to Snowflake"],
                    ["Models", "Tabular, then LLMs"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-2 border-black bg-neutral-50 p-3 shadow-[3px_3px_0_#0cae67]">
                      <div className="text-[8px] font-black uppercase tracking-widest text-[#0cae67]">{k}</div>
                      <div className="text-[11px] font-bold uppercase">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="relative overflow-hidden border-t-[3px] border-black">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <svg width="100%" height="100%">
              <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
                <path d="M 72 0 L 0 0 0 72" fill="none" stroke="black" strokeWidth="2" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <div className="flex flex-col justify-between gap-8 border-b-[3px] border-black pb-10 md:flex-row md:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 border-[2.5px] border-black bg-white px-3 py-1 shadow-[4px_4px_0_#000]">
                  <span className="h-2 w-2 animate-pulse bg-[#ff5500]" />
                  <span className="text-[11px] font-black uppercase tracking-[0.35em]">Work.log / 2021 — 2025</span>
                </div>
                <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
                  Selected
                  <br />
                  <span className="text-[#ff5500]">work</span>
                </h2>
              </div>
              <div className="rotate-1 border-[3px] border-black bg-white p-5 shadow-[8px_8px_0_#000]">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="font-display text-4xl leading-none">04</div>
                    <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-black/40">Seats</div>
                  </div>
                  <div className="h-10 w-0.5 bg-black/10" />
                  <div>
                    <div className="text-xs font-black italic">Amazon → SJSU</div>
                    <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-black/40">Now</div>
                  </div>
                </div>
              </div>
            </div>

            <article className="mt-10 border-[3px] border-black bg-white shadow-[10px_10px_0_#000]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-black bg-[#1a1a1a] px-5 py-3">
                <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-white">
                  <span className="h-3 w-3 animate-pulse rounded-full border border-black bg-[#ff5500]" />
                  Featured // Amazon Business
                </div>
                <span className="border border-black bg-[#ff5500] px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-[2px_2px_0_#000]">
                  Summer 2025
                </span>
              </div>
              <div className="grid items-center gap-8 p-6 md:p-10 lg:grid-cols-12">
                <div className="flex aspect-[4/3] flex-col justify-between border-[3px] border-black bg-[#ff5500] p-6 text-white shadow-[8px_8px_0_#000] lg:col-span-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Seattle</p>
                  <p className="font-display text-6xl leading-none md:text-7xl">200M</p>
                  <p className="text-sm font-bold">prospects scored from 87M+ touchpoints</p>
                </div>
                <div className="space-y-3 text-sm font-bold leading-relaxed lg:col-span-7">
                  <h3 className="font-display text-3xl uppercase leading-none md:text-4xl">
                    Marketing attribution, with a question box
                  </h3>
                  <p>
                    The platform scored who to reach. The part I owned was making that score usable: SQL that ran
                    about 40% faster on the same reads, and a language path so an analyst could ask instead of
                    assembling the join.
                  </p>
                  <p className="border-l-4 border-[#ff5500] bg-[#fffbeb] p-3">
                    72+ signals in, a prospect score out. The interesting failure mode is a confident score with no
                    decision attached. I have been building the decision half in public since.
                  </p>
                </div>
              </div>
            </article>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STAMPS.map((s) => (
                <div
                  key={s.title}
                  className="border-[2.5px] border-black bg-neutral-950 p-4 text-white shadow-[6px_6px_0_#000] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#ff5500]">{s.kicker}</p>
                  <p className="mt-6 font-black">{s.title}</p>
                  <p className="mt-1 text-xs text-white/70">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="bg-[#EAEAEA] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]">Technical archive</p>
                <h2 className="font-display text-5xl uppercase leading-none md:text-7xl">Tech stack.</h2>
              </div>
              <p className="hidden text-sm font-black tracking-tight md:block">#2026.V1</p>
            </div>
            <div
              className="grid border-2 border-black bg-black p-[2px] shadow-[12px_12px_0_#000]"
              style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}
            >
              {STACK.join("").split("").map((ch, i) => (
                <StampCell key={i} ch={ch} mark={i % 17 === 0} />
              ))}
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-black/50">
              Read across and down. Python, SQL, Spark, Kafka, causal, Airflow, AWS, dbt.
            </p>
          </div>
        </section>

        <section id="experience" className="border-t-[3px] border-black px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#ff5500]">Career_chronicle</p>
              <h2 className="mt-2 font-display text-5xl uppercase leading-none md:text-6xl">Experience</h2>
              <ol className="mt-8 space-y-4">
                {ROLES.map((role) => (
                  <li key={role.company + role.dates} className="border-[3px] border-black p-5 shadow-[6px_6px_0_#000]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-black uppercase tracking-tight">{role.company}</h3>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-black/50">{role.dates}</span>
                    </div>
                    <p className="mt-1 text-sm font-bold text-[#ff5500]">
                      {role.title} · {role.place}
                    </p>
                    <p className="mt-3 text-sm font-medium leading-relaxed">{role.text}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.skills.map((s) => (
                        <span key={s} className="border border-black px-2 py-0.5 text-[10px] font-black uppercase">
                          {s}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <aside className="h-fit border-[3px] border-black bg-black p-6 text-white shadow-[8px_8px_0_#ff5500] lg:sticky lg:top-24">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#ff5500]">Impact_metrics</p>
              <ul className="mt-6 space-y-5">
                {[
                  ["200M+", "Prospects on the Amazon attribution platform"],
                  ["87M+", "Touchpoints feeding that score"],
                  ["~40%", "Faster SQL on the same reads, and again at Epsilon on Snowflake"],
                  ["15+ TB", "Daily volume on the Epsilon pipelines"],
                ].map(([n, l]) => (
                  <li key={n}>
                    <div className="font-display text-4xl leading-none">{n}</div>
                    <p className="mt-1 text-xs font-medium text-white/70">{l}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="projects" className="border-t-[3px] border-black bg-[#fafafa] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#ff5500]">Selected projects</p>
            <h2 className="mt-2 font-display text-5xl uppercase leading-none md:text-7xl">The work in public</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {PROJECTS.map((p) => (
                <article key={p.n} className="flex flex-col border-[3px] border-black bg-white p-6 shadow-[8px_8px_0_#000]">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40">Project_info_{p.n}</p>
                  <h3 className="mt-2 font-display text-3xl uppercase leading-none">{p.name}</h3>
                  <p className="mt-3 text-sm font-black text-[#ff5500]">Output — {p.output}</p>
                  <p className="mt-3 flex-1 text-sm font-medium leading-relaxed">{p.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="bg-black px-2 py-0.5 text-[10px] font-black uppercase text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    {p.live && (
                      <a
                        href={p.live}
                        className="border-[3px] border-black bg-[#ff5500] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-[3px_3px_0_#000]"
                      >
                        Live
                      </a>
                    )}
                    <a
                      href={p.source}
                      className="border-[3px] border-black bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_#000]"
                    >
                      Source
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t-[3px] border-black px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-5xl uppercase leading-none md:text-7xl">Get in touch</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Email", "pranav.reveendran@sjsu.edu", "mailto:pranav.reveendran@sjsu.edu"],
                ["Phone", "+1 669 335 7762", "tel:+16693357762"],
                ["LinkedIn", "pranav-reveendran", "https://www.linkedin.com/in/pranav-reveendran/"],
                ["GitHub", "pranav-revee", "https://github.com/pranav-revee"],
              ].map(([label, value, href]) => (
                <a
                  key={label}
                  href={href}
                  className="block border-[3px] border-black p-5 shadow-[6px_6px_0_#000] hover:bg-[#fffbeb]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff5500]">{label}</p>
                  <p className="mt-3 break-words text-sm font-black">{value}</p>
                </a>
              ))}
            </div>
            <p className="mt-8 text-sm font-bold text-black/60">San Jose, California · Pacific time</p>
          </div>
        </section>
      </main>
    </div>
  );
}
