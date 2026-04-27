import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Character from "@/components/portfolio/Character";
import NavOrbit, { type SectionId } from "@/components/portfolio/NavOrbit";
import SectionPanel from "@/components/portfolio/SectionPanel";
import { profile } from "@/components/portfolio/data";
import { Github, Linkedin, Menu } from "lucide-react";

const speeches: Record<SectionId | "idle", string> = {
  idle: "Hi, I'm Samip 👋 Pick a section!",
  about: "Want to know more about me?",
  skills: "Here's what I work with.",
  projects: "Check out what I've built!",
  experience: "My journey so far.",
  contact: "Let's get in touch!",
};

const Index = () => {
  const [active, setActive] = useState<SectionId | null>(null);
  const [hover, setHover] = useState<SectionId | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`;
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      `${profile.name} — ${profile.role} based in ${profile.location}. Portfolio of projects, skills and experience.`
    );
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);

  const speech = active ? speeches[active] : hover ? speeches[hover] : speeches.idle;

  const navItems: SectionId[] = ["about", "skills", "projects", "experience", "contact"];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-accent-cyan/10 blur-[140px]" style={{ background: "radial-gradient(circle, hsl(190 95% 45% / 0.2), transparent 70%)" }} />

      {/* Top bar */}
      <header className="relative z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow-sm">
            S
          </div>
          <span className="font-semibold tracking-wide">Samip Aryal</span>
        </motion.div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((id) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`capitalize transition hover:text-foreground ${active === id ? "text-primary" : ""}`}
            >
              {id}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary hover:text-primary sm:flex"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary hover:text-primary sm:flex"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-6 pb-20 text-center sm:pt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Available for collaborations
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
        >
          Hi, I'm <span className="text-gradient">Samip Aryal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          {profile.role} · {profile.tagline}
        </motion.p>

        {/* Character + Orbit */}
        <div className="relative mt-12 flex h-[560px] w-full items-center justify-center sm:h-[600px]">
          <NavOrbit
            active={active ?? hover}
            onSelect={setActive}
            onHover={setHover}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 140, damping: 18 }}
            className="relative z-10"
          >
            <Character size={280} speech={speech} />
          </motion.div>
        </div>

        {/* Mobile section buttons */}
        <div className="mt-2 grid w-full max-w-md grid-cols-2 gap-3 md:hidden">
          {navItems.map((id) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="glass rounded-xl px-4 py-3 text-sm font-medium capitalize text-foreground transition hover:border-primary/60"
            >
              {id}
            </button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-xs text-muted-foreground"
        >
          Tip: hover or tap an icon around me to explore.
        </motion.p>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name} · Built with React & Framer Motion
      </footer>

      {/* Mobile slide-out nav */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-md md:hidden"
          onClick={() => setMobileNavOpen(false)}
        >
          <div className="absolute right-4 top-20 glass flex flex-col gap-1 rounded-2xl p-3" onClick={(e) => e.stopPropagation()}>
            {navItems.map((id) => (
              <button
                key={id}
                onClick={() => {
                  setActive(id);
                  setMobileNavOpen(false);
                }}
                className="rounded-lg px-5 py-2 text-left text-sm capitalize text-foreground hover:bg-primary/15"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      )}

      <SectionPanel active={active} onClose={() => setActive(null)} />
    </main>
  );
};

export default Index;
