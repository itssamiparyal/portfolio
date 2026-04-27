import { motion } from "framer-motion";
import { User, Code2, Briefcase, GraduationCap, Mail, type LucideIcon } from "lucide-react";

export type SectionId = "about" | "skills" | "projects" | "experience" | "contact";

const items: { id: SectionId; label: string; Icon: LucideIcon; angle: number }[] = [
  { id: "about", label: "About", Icon: User, angle: -90 },
  { id: "skills", label: "Skills", Icon: Code2, angle: -18 },
  { id: "projects", label: "Projects", Icon: Briefcase, angle: 54 },
  { id: "experience", label: "Experience", Icon: GraduationCap, angle: 126 },
  { id: "contact", label: "Contact", Icon: Mail, angle: 198 },
];

interface NavOrbitProps {
  radius?: number;
  active: SectionId | null;
  onSelect: (id: SectionId) => void;
  onHover: (id: SectionId | null) => void;
}

const NavOrbit = ({ radius = 230, active, onSelect, onHover }: NavOrbitProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      {items.map(({ id, label, Icon, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const isActive = active === id;
        return (
          <motion.button
            key={id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 180, damping: 16 }}
            onClick={() => onSelect(id)}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            className="pointer-events-auto group absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                isActive
                  ? "border-primary bg-primary/20 shadow-glow"
                  : "glass border-border hover:border-primary/60 hover:bg-primary/10 hover:shadow-glow-sm"
              }`}
            >
              <Icon className={`h-6 w-6 transition-colors ${isActive ? "text-primary" : "text-foreground/80 group-hover:text-primary"}`} />
            </span>
            <span className={`text-xs font-medium tracking-wide transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
              {label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default NavOrbit;
