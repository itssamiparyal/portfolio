import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { SectionId } from "./NavOrbit";
import { profile, skills, projects, experience } from "./data";
import { Github, Linkedin, Instagram, Mail, ExternalLink, Globe } from "lucide-react";

interface Props {
  active: SectionId | null;
  onClose: () => void;
}

const titles: Record<SectionId, string> = {
  about: "About Me",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience & Education",
  contact: "Get In Touch",
};

const SectionPanel = ({ active, onClose }: Props) => {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-background/70 px-4 py-10 backdrop-blur-md sm:px-6"
          onClick={onClose}
        >
          <motion.section
            key={active}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-6 shadow-elegant sm:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Close section"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>

            <header className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{active}</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                <span className="text-gradient">{titles[active]}</span>
              </h2>
            </header>

            {active === "about" && <AboutContent />}
            {active === "skills" && <SkillsContent />}
            {active === "projects" && <ProjectsContent />}
            {active === "experience" && <ExperienceContent />}
            {active === "contact" && <ContactContent />}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AboutContent = () => (
  <div className="space-y-4 text-foreground/85">
    {profile.about.map((p, i) => (
      <motion.p
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + i * 0.08 }}
        className="text-base leading-relaxed sm:text-lg"
      >
        {p}
      </motion.p>
    ))}
    <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
      <InfoCard label="Location" value={profile.location} />
      <InfoCard label="Status" value="CSIT Student" />
      <InfoCard label="Focus" value="Full-Stack Web" />
    </div>
  </div>
);

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-border bg-secondary/40 p-3">
    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="mt-1 font-medium text-foreground">{value}</p>
  </div>
);

const SkillsContent = () => (
  <div className="space-y-6">
    {(["languages", "frameworks", "tools"] as const).map((cat, idx) => (
      <motion.div
        key={cat}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * idx }}
      >
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary/90">
          {cat}
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills[cat].map((s) => (
            <span
              key={s}
              className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary/20 hover:shadow-glow-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

const ProjectsContent = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    {projects.map((p, i) => (
      <motion.a
        key={p.title}
        href={p.link}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06 }}
        whileHover={{ y: -4 }}
        className="group relative flex flex-col rounded-2xl border border-border bg-secondary/30 p-5 transition hover:border-primary/60 hover:bg-secondary/60 hover:shadow-glow-sm"
      >
        <div className="mb-2 flex items-start justify-between gap-2">
          <h4 className="text-lg font-semibold text-foreground">{p.title}</h4>
          <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
        </div>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
              {t}
            </span>
          ))}
        </div>
      </motion.a>
    ))}
  </div>
);

const ExperienceContent = () => (
  <ol className="relative space-y-6 border-l border-primary/30 pl-6">
    {experience.map((e, i) => (
      <motion.li
        key={e.title}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.08 }}
        className="relative"
      >
        <span className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background ${e.current ? "bg-primary shadow-glow-sm" : "bg-muted-foreground/60"}`} />
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="text-lg font-semibold text-foreground">{e.title}</h4>
          {e.current && (
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Current
            </span>
          )}
        </div>
        <p className="text-sm text-primary/90">{e.place}</p>
        <p className="text-xs text-muted-foreground">
          {e.period} · {e.location}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">{e.desc}</p>
      </motion.li>
    ))}
  </ol>
);

const ContactContent = () => {
  const links = [
    { label: "GitHub", href: profile.github, Icon: Github },
    { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
    { label: "Instagram", href: profile.instagram, Icon: Instagram },
    { label: "Website", href: profile.website, Icon: Globe },
  ];
  return (
    <div className="space-y-6">
      <p className="text-foreground/80">
        I'm open to collaboration, learning opportunities, and building interesting projects. Let's connect!
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4 transition hover:border-primary/60 hover:bg-primary/10 hover:shadow-glow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary transition group-hover:bg-primary/25">
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="truncate text-sm font-medium text-foreground">{href.replace(/^https?:\/\//, "")}</p>
            </div>
          </a>
        ))}
      </div>
      <a
        href={`mailto:${profile.email}`}
        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]"
      >
        <Mail className="h-4 w-4" /> Say Hello
      </a>
    </div>
  );
};

export default SectionPanel;
