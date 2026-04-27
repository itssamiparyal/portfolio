import { motion } from "framer-motion";
import character from "@/assets/character.png";

interface CharacterProps {
  size?: number;
  speech?: string;
}

const Character = ({ size = 280, speech }: CharacterProps) => {
  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      {speech && (
        <motion.div
          key={speech}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="glass mb-4 rounded-2xl px-4 py-2 text-sm text-foreground/90 shadow-glow-sm"
        >
          {speech}
        </motion.div>
      )}

      {/* Glow ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-primary opacity-40 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-primary/30" />
        <div
          className="absolute inset-2 animate-spin-slow rounded-full border border-dashed border-primary/20"
          style={{ animationDirection: "reverse" }}
        />

        {/* Floating character */}
        <motion.div
          className="absolute inset-4 overflow-hidden rounded-full border-2 border-primary/40 shadow-glow"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={character}
            alt="Samip's animated avatar"
            className="h-full w-full object-cover"
            draggable={false}
          />
          {/* Blink overlay */}
          <motion.div
            className="pointer-events-none absolute left-0 right-0"
            style={{ top: "32%", height: "6%", background: "hsl(var(--background))" }}
            animate={{ scaleY: [0, 0, 1, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.93, 0.96, 0.99, 1] }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Character;
