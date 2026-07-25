import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import pfp from "./assets/pfp.jpg";

const nav = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
];

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  image?: string;
  video?: string;
  url?: string;
};

const projects: Project[] = [
  {
    title: "Sappire Legacy",
    blurb:
      "A migration engine that automates the translation of legacy codebases into modern software architectures using Generative AI. Backend features an ingestion pipeline that parses and maps complex directories into Cloud Storage and a SQL persistence layer under federated security. Code is broken down into logical dependencies, and modules are passed to LLM for translation. Generates synthetic unit test suites to validate code.",
    tags: [
      "Next.js",
      "Python",
      "Gemini API",
      "Google Cloud Storage",
      "SQL",
      "Google OAuth 2.0",
      "REST APIs",
      "CI/CD",
      "React",
      "Tailwindcss",
      "Flask",
      "Langgraph",
    ],
    video: "./SapphireLegacy.mp4",
  },
  {
    title: "Phishing Detection Suite",
    blurb:
      "Collaborated on a university research project exploring phishing detection through multi-model detector across URL, HTML, and email text. Combined via a variety of voting policies with a focus on creating a unified testing framework.",
    tags: ["Python", "HuggingFace", "numpy", "scikit-learn", "matplotlib"],
    image: "./detection.png",
  },
  {
    title: "POS System",
    blurb:
      "Simulated a full point-of-sale system with itemized ordering, totals, and logic for menu navigation, including SQL backend and frontend views for managers, employees, and customers. Themed after Panda Express.",
    tags: ["React", "Tailwindcss", "Javascript", "PostgreSQL"],
    video: "./POSDemo.mp4",
  },
  {
    title: "Fractals Visualizer",
    blurb:
      "Animated fractal generator built with a focus on clean visuals and interactivity.",
    tags: ["Java", "JavaFX", "UI", "Graphics"],
    video: "./fractals.mp4",
  },
  {
    title: "Parallel Sample Sort",
    blurb:
      "Implemented parallel sample sort using MPI with performance benchmarks and scaling studies. Written in C++ for HPC coursework.",
    tags: ["C++", "MPI", "pandas", "thicket"],
    image: "./sampleSort.png",
  },
  {
    title: "Golfing Coach",
    blurb:
      "Ongoing project aiming to provide feedback on golf swings using pose estimation. Built with MediaPipe and Python to prototype motion tracking and gesture analysis.",
    tags: ["Python", "MediaPipe", "Computer Vision"],
    video: "./golf.gif",
  },
];

const skills = ["Python", "C++", "Java", "Git", "Azure", "AWS", "CC", "... and more"];

const HeaderRow = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="border-b border-[var(--color-line)] pb-4">
    <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-paper)] md:text-3xl">
      {title}
    </h2>
    <p className="mt-1 text-sm text-[var(--color-muted)]">{subtitle}</p>
  </div>
);

const NavLink = ({ id, label }: { id: string; label: string }) => (
  <a
    href={`#${id}`}
    data-scroll
    className="relative py-1 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-paper)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--color-accent)] after:transition-transform after:duration-200 hover:after:scale-x-100"
  >
    {label}
  </a>
);

const CTA = ({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) => (
  <a
    href={href}
    data-scroll
    className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium transition-colors ${
      primary
        ? "bg-[var(--color-accent)] text-[var(--color-paper)] hover:bg-[var(--color-accent-hover)]"
        : "border border-[var(--color-line-strong)] text-[var(--color-paper)] hover:border-[var(--color-muted)]"
    }`}
  >
    {label}
  </a>
);

const ProjectMedia = ({ p }: { p: Project }) => {
  if (p.image) {
    return (
      <div className="mb-4 aspect-video w-full overflow-hidden border border-[var(--color-line)] bg-[var(--color-ink-soft)]">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (p.video?.endsWith(".gif")) {
    return (
      <div className="mb-4 aspect-video w-full overflow-hidden border border-[var(--color-line)] bg-[var(--color-ink-soft)]">
        <img
          src={p.video}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (p.video) {
    return (
      <div className="mb-4 aspect-video w-full overflow-hidden border border-[var(--color-line)] bg-[var(--color-ink-soft)]">
        <video
          src={p.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return null;
};

const ProjectCard = ({ p, i }: { p: Project; i: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  const Wrapper = p.url ? motion.a : motion.div;
  const linkProps = p.url
    ? { href: p.url, target: "_blank" as const, rel: "noreferrer" }
    : {};

  return (
    <Wrapper
      ref={ref}
      {...linkProps}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group block border border-[var(--color-line)] bg-[var(--color-ink-raised)] p-5 transition-colors hover:border-[var(--color-line-strong)]"
    >
      <ProjectMedia p={p} />
      <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--color-paper)]">
        {p.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{p.blurb}</p>
      <p className="mt-4 text-xs tracking-wide text-[var(--color-faint)]">
        {p.tags.join(" · ")}
      </p>
    </Wrapper>
  );
};

const Projects = () => (
  <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
    <HeaderRow title="Projects" subtitle="Some of the interesting projects I have worked on" />
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectCard key={p.title} p={p} i={i} />
      ))}
    </div>
  </section>
);

const Header = () => (
  <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-ink)_85%,transparent)] backdrop-blur-md">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
      <a
        href="#home"
        data-scroll
        className="font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-[var(--color-paper)]"
      >
        <span className="sr-only">Home</span>
        Fady Seha
      </a>
      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((item) => (
          <NavLink key={item.id} id={item.id} label={item.label} />
        ))}
      </nav>
      <a
        href="#contact"
        data-scroll
        className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] md:inline-flex"
      >
        Contact
      </a>
    </div>
  </header>
);

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section id="home" className="relative mx-auto max-w-6xl px-6 pt-16 md:pt-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14"
      >
        <img
          src={pfp}
          alt="image of a very handsome and hirable guy"
          width={160}
          height={160}
          className="h-36 w-36 shrink-0 object-cover md:h-40 md:w-40"
          style={{ borderRadius: "2px" }}
        />

        <div className="flex max-w-xl flex-col gap-5 text-center md:text-left">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-muted)]">
              Class of 2026
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight text-[var(--color-paper)] md:text-5xl lg:text-6xl">
              Fady Seha
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
            <a
              href="https://github.com/TreeWoper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              GitHub
            </a>
            <span className="text-[var(--color-faint)]" aria-hidden>
              |
            </span>
            <a
              href="https://www.linkedin.com/in/fady-seha/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              LinkedIn
            </a>
          </div>

          <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
            Computer Science Graduate from Texas A&amp;M University with a passion for problem solving through technology and exploring new opportunities in software engineering.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <CTA href="#projects" label="View Projects" />
            <CTA href="#resume" label="Get Resume" primary />
          </div>

          <p className="text-sm text-[var(--color-faint)]">
            {skills.join(" · ")}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <motion.section
      ref={ref}
      id="resume"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-6 py-20 md:py-28"
    >
      <HeaderRow title="Resume" subtitle="Explore my resume" />
      <div className="mt-8 space-y-5">
        <div className="h-[36rem] w-full overflow-auto border border-[var(--color-line)] bg-[var(--color-ink-raised)] md:h-[42rem]">
          <iframe
            src="./FadySehaResume.pdf"
            className="h-[1100px] w-full"
            loading="lazy"
            title="Resume Preview"
          >
            Your browser does not support embedded PDFs.{" "}
            <a href="./FadySehaResume.pdf">Download here.</a>
          </iframe>
        </div>
        <p className="text-sm text-[var(--color-muted)]">
          View a preview above or download my full resume below.
        </p>
        <a
          href="./FadySehaResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-paper)] transition-colors hover:bg-[var(--color-accent-hover)]"
        >
          Download Resume
        </a>
      </div>
    </motion.section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mkgknbgz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "mt-1.5 w-full border border-[var(--color-line)] bg-[var(--color-ink)] px-3 py-2.5 text-sm text-[var(--color-paper)] placeholder:text-[var(--color-faint)] outline-none transition-colors focus:border-[var(--color-accent)]";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <h3 className="mb-4 text-lg font-semibold text-[var(--color-paper)]">Get in touch below</h3>

      <label className="mb-4 block text-sm text-[var(--color-muted)]">
        Name
        <input
          type="text"
          name="name"
          required
          className={fieldClass}
          placeholder="Your name"
        />
      </label>

      <label className="mb-4 block text-sm text-[var(--color-muted)]">
        Email
        <input
          type="email"
          name="_replyto"
          required
          className={fieldClass}
          placeholder="you@example.com"
        />
      </label>

      <label className="mb-4 block text-sm text-[var(--color-muted)]">
        Message
        <textarea
          name="message"
          rows={4}
          required
          className={fieldClass}
          placeholder="Say hello or ask about my projects..."
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 inline-flex items-center justify-center bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-paper)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="mt-3 text-sm font-medium text-[var(--color-accent)]">
          Message sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">Something went wrong. Try again later.</p>
      )}
    </form>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <motion.footer
      ref={ref}
      id="contact"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-6 py-20 md:py-28"
    >
      <HeaderRow title="Contact" subtitle="Open to roles in software" />

      <div className="mt-8 grid gap-10 border-t border-[var(--color-line)] pt-8 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-2 text-sm text-[var(--color-muted)]">
          <p>
            Email:{" "}
            <a
              className="text-[var(--color-paper)] underline decoration-[var(--color-line-strong)] underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
              href="mailto:sehafady3@gmail.com"
            >
              sehafady3@gmail.com
            </a>
          </p>
          <p>Phone: 346 218 9681</p>
        </div>
        <ContactForm />
      </div>

      <div className="mt-16 border-t border-[var(--color-line)] pt-6 text-center text-xs text-[var(--color-faint)]">
        © Fady Seha
      </div>
    </motion.footer>
  );
};

export default function PersonalSite() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[data-scroll]");
      if (target) {
        e.preventDefault();
        const id = target.getAttribute("href")?.replace("#", "");
        const el = id ? document.getElementById(id) : null;
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative min-h-screen text-[var(--color-paper)]">
      <div className="site-atmosphere" aria-hidden />
      {/* One cached SVG — scrolls with the page, not redrawn by React */}
      <div
        className="site-cubes"
        aria-hidden
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}cubes-backdrop.svg)` }}
      />

      <Header />

      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[40] h-[2px] origin-left bg-[var(--color-accent)]"
      />

      <main className="relative z-10">
        <Hero />
        <Projects />
        <Resume />
        <Contact />
      </main>
    </div>
  );
}
