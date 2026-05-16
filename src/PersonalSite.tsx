import { motion, useAnimation, useInView, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";


import pfp from './assets/pfp.jpg';
// import { video } from "framer-motion/client";

const nav = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  // { id: "contact", label: "Contact" },
];

const projects = [
  {
    title: "Sappire Legacy",
    blurb: "A migration engine that automates the translation of legacy codebases into modern software architectures using Generative AI. Backend features an ingestion pipeline that parses and maps complex directories into Cloud Storage and a SQL persistence layer under federated security. Code is broken down into logical dependencies, and modules are passed to LLM for translation. Generates synthetic unit test suites to validate code.",
    tags: ["Next.js", "Python", "Gemini API", "Google Cloud Storage", "SQL", "Google OAuth 2.0", "REST APIs", "CI/CD", "React", "Tailwindcss", "Flask", "Langgraph"],
    video: "./SapphireLegacy.mp4"
  },
  {
    title: "Phishing Detection Suite",
    blurb: "Collaborated on a university research project exploring phishing detection through multi-model detector across URL, HTML, and email text. Combined via a variety of voting policies with a focus on creating a unified testing framework.",
    tags: ["Python", "HuggingFace", "numpy", "scikit-learn", "matplotlib"],
    image: "./detection.png"
  },
  {
    title: "POS System",
    blurb: "Simulated a full point-of-sale system with itemized ordering, totals, and logic for menu navigation, including SQL backend and frontend views for managers, employees, and customers. Themed after Panda Express.",
    tags: ["React", "Tailwindcss", "Javascript", "PostgreSQL"],
    video: "./POSDemo.mp4"

  },
  {
    title: "Fractals Visualizer",
    blurb: "Animated fractal generator built with a focus on clean visuals and interactivity.",
    tags: ["Java", "JavaFX", "UI", "Graphics"],
    video: "./fractals.mp4"
  },
  {
    title: "Parallel Sample Sort",
    blurb: "Implemented parallel sample sort using MPI with performance benchmarks and scaling studies. Written in C++ for HPC coursework.",
    tags: ["C++", "MPI", "pandas", "thicket"],
    image: "./sampleSort.png"
  },
  {
    title: "Golfing Coach",
    blurb: "Ongoing project aiming to provide feedback on golf swings using pose estimation. Built with MediaPipe and Python to prototype motion tracking and gesture analysis.",
    tags: ["Python", "MediaPipe", "Computer Vision"],
    video: "./golf.gif"
  },
];

const HeaderRow = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="flex items-end justify-between gap-4">
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-neutral-400">{subtitle}</p>
    </div>
  </div>
);

const NavLink = ({ id, label }: { id: string; label: string }) => (
  <a
    href={`#${id}`}
    data-scroll
    className="relative inline-block px-1 py-2 text-neutral-300 hover:text-white transition"
  >
    <span className="relative z-10">{label}</span>
    <span className="absolute inset-x-1 -bottom-0.5 h-px overflow-hidden">
      <span className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-fuchsia-500 via-sky-400 to-violet-500 transition-all duration-300 group-hover:w-full" />
    </span>
    <style>{`
      a[href="#${id}"]:hover span>span { width: 100%; }
    `}</style>
  </a>
);


const CTA = ({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) => (
  <a
    href={href}
    data-scroll
    className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm transition ${
      primary ? "bg-white text-neutral-900 hover:opacity-90" : "border border-white/10 hover:border-white/20"
    }`}
  >
    {label}
  </a>
);

const ProjectCard = ({ p, i }: { p: any; i: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 8, opacity: 0 }); // Reset when out of view
    }
  }, [isInView, controls]);

  return (
    <motion.a
      ref={ref}
      animate={controls}
      initial={{ y: 8, opacity: 0 }}
      transition={{ delay: i * 0.05, type: "spring", stiffness: 120, damping: 18 }}
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block rounded-2xl border border-white/5 bg-neutral-900/40 p-5 hover:border-white/10"
    >
      {p.image && (
        <img
          src={p.image}
          alt={p.title}
          className="mb-4 w-full rounded-lg border border-white/10 object-cover"
        />
      )}

      {p.video && p.video.endsWith(".gif") ? (
        <img
          src={p.video}
          alt={p.title}
          className="mb-4 w-full rounded-lg border border-white/10 object-cover"
        />
      ) : p.video ? (
        <video
          src={p.video}
          autoPlay
          loop
          muted
          playsInline
          className="mb-4 w-full rounded-lg border border-white/10 object-cover"
        />
      ) : null}

      <div className="mb-2 text-lg font-medium text-white">{p.title}</div>
      <p className="text-sm text-neutral-400">{p.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((t: string) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-neutral-300"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
};


const Projects = () => (
  <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
    <HeaderRow title="Projects" subtitle="Some of the interesting projects I have worked on" />
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {projects.map((p, i) => (
        <div className="hover:scale-[1.01] transition-transform">
        <ProjectCard key={p.title} p={p} i={i} />
        </div>
      ))}
    </div>
  </section>
);

const Header = () => (
  <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/5">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex h-16 items-center justify-between">
        <a href="#home" data-scroll className="font-semibold tracking-tight text-neutral-200">
          <span className="sr-only">Home</span>
          Fady<span className="text-neutral-400">.Seha</span>
        </a>
        <nav className="hidden md:flex gap-6 text-sm">
          {nav.map((item) => (
            <NavLink key={item.id} id={item.id} label={item.label} />
          ))}
        </nav>
        <a
          href="#contact"
          data-scroll
          className="md:inline-flex hidden items-center rounded-xl border border-white/10 px-3 py-1.5 text-xs hover:border-white/20 transition"
        >
          Contact
        </a>
      </div>
    </div>
  </header>
);



const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 12 });
    }
  }, [isInView, controls]);

  return (
    <section id="home" className="relative mx-auto max-w-7xl px-6 pt-20 md:pt-28">
      <motion.div
        ref={ref}
        animate={controls}
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 18 }}
        className="mx-auto max-w-4xl rounded-3xl p-[1px] bg-gradient-to-r from-fuchsia-500/40 via-sky-400/40 to-violet-500/40"
      >
        <div className="rounded-3xl bg-neutral-950/60 p-8 md:p-12 border border-white/5">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img
              src={pfp}
              alt="image of a very handsome and hirable guy"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border border-white/10 shadow-lg"
            />
            <div className="flex flex-col gap-6 text-center md:text-left">
              <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">Class of 2026</div>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Fady Seha</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300">
                <a
                  href="https://github.com/TreeWoper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-fuchsia-500 hover:via-sky-400 hover:to-violet-500"
                >
                  <img src="./github.png" width={20} height={20} alt="GitHub" />
                  <span>GitHub</span>
                </a>

                <span className="text-neutral-500">|</span>

                <a
                  href="https://www.linkedin.com/in/fady-seha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition group hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-fuchsia-500 hover:via-sky-400 hover:to-violet-500"
                >
                  <img src="./linkedIn.png" width={20} height={20} alt="LinkedIn" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <p className="text-neutral-400 max-w-2xl">
                Computer Science student at Texas A&M University with a passion for problem solving through technology and exploring new opportunities in software engineering..
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <CTA href="#projects" label="View Projects" />
                <CTA href="#resume" label="Get Resume" primary />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex flex-wrap items-center gap-2 opacity-90">
            {["Python", "C++", "Java", "Git", "Azure", "AWS", "CC", "... and more"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};


const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 30 });
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      id="resume"
      animate={controls}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 20 }}
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <HeaderRow title="Resume" subtitle="Explore my resume" />
      <div className="mt-6 flex flex-col items-start gap-6 rounded-3xl border border-white/5 bg-neutral-900/40 p-6">
        {/* Scrollable PDF Preview Widget */}
        <div className="w-full h-72 overflow-auto rounded-xl border border-white/10 shadow-lg">
          <iframe
            src="./FadySehaResume.pdf"
            className="w-full h-[1000px]"
            loading="lazy"
            title="Resume Preview"
            allowFullScreen
          >
            Your browser does not support embedded PDFs.{" "}
            <a href="./FadySehaResume.pdf">Download here.</a>
          </iframe>
        </div>

        <p className="text-neutral-300 text-sm max-w-2xl">
          View a preview above or download my full resume below.
        </p>
        <a
          href="./FadySehaResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm text-neutral-900 hover:opacity-90"
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

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h3 className="text-lg font-semibold mb-4">Get in touch below</h3>

      <label className="block text-sm mb-4 text-neutral-300 w-full">
        Name
        <input
          type="text"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-violet-500"
          placeholder="Your name"
        />
      </label>

      <label className="block text-sm mb-4 text-neutral-300 w-full">
        Email
        <input
          type="email"
          name="_replyto"
          required
          className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          placeholder="you@example.com"
        />
      </label>

      <label className="block text-sm mb-4 text-neutral-300 w-full">
        Message
        <textarea
          name="message"
          rows={4}
          required
          className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Say hello or ask about my projects..."
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm text-neutral-900 hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "sent" && (
<p className="mt-3 text-sm font-medium bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
  Message sent successfully!
</p>      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">Something went wrong. Try again later.</p>
      )}
    </form>
  );
};


const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 30 });
    }
  }, [isInView, controls]);

  return (
    <motion.footer
      ref={ref}
      id="contact"
      animate={controls}
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 20 }}
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <HeaderRow title="Contact" subtitle="Open to roles in software" />

      <div className="mt-6 rounded-3xl border border-white/5 bg-neutral-900/40 p-6">
        {/* Contact Info */}
        <div className="mb-8">
          <p className="text-neutral-400 text-sm mb-1">
            Email:{" "}
            <a
              className="underline decoration-dotted"
              href="mailto:sehafady3@gmail.com"
            >
              sehafady3@gmail.com
            </a>
          </p>
          <p className="text-neutral-400 text-sm">Phone: 346 218 9681</p>
        </div>

        <ContactForm/>
      </div>

      <div className="mt-10 text-center text-xs text-neutral-500">© Fady Seha</div>
    </motion.footer>
  );
};



export default function PersonalSite() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x, { stiffness: 120, damping: 20, mass: 0.2 });
    const ySpring = useSpring(y, { stiffness: 120, damping: 20, mass: 0.2 });
    const { scrollYProgress } = useScroll();
    const hue = useTransform(scrollYProgress, [0, 1], [180, 300]);


    const backgroundGradient = useTransform(hue, (h) =>
    `linear-gradient(90deg,
        hsl(${h}, 100%, 70%),
        hsl(${(h + 60) % 360}, 100%, 65%),
        hsl(${(h + 120) % 360}, 100%, 70%)
    )`
    );

    useEffect(() => {
    const move = (e: MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
    }, [x, y]);


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
        <div className="min-h-screen text-neutral-100 selection:bg-fuchsia-500/20 selection:text-fuchsia-200">
          <link rel="icon" href="./favicon.ico" />
          <title>Fady Seha</title>
            {/* Subtle RGB background animation with black tones */}
            <motion.div
                className="fixed inset-0 -z-20"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{
                backgroundImage:
                'linear-gradient(270deg, rgba(40,0,60,0.15), rgba(0,10,40,0.1), rgba(20,0,50,0.15))',
                backgroundSize: '400% 400%',
                backgroundColor: '#0a0a0a'
                }}
            />


            {/* Mouse-following radial glow */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-[-10]"
                style={{
                background: useTransform(
                [xSpring, ySpring],
                ([x, y]) =>
                `radial-gradient(900px circle at ${x}px ${y}px,
                rgba(236, 72, 154, 0.29),
                rgba(56, 191, 248, 0.22),
                rgba(138, 92, 246, 0.31),
                transparent 60%)`
                ),
                filter: "blur(120px) saturate(160%)"
                }}
            />

            <Header />
            
            {/* Scroll-based hue gradient bar */}
            <motion.div
            style={{ background: backgroundGradient }}
            className="sticky top-16 fixed inset-x-0 top-0 h-[2px] z-[9999] opacity-90 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
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