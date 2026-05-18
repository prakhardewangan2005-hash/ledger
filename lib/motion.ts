import type { Transition, Variants } from "framer-motion";

/**
 * Easing curves — borrowed from Linear and Vercel's motion language.
 * Use the named exports below; never use raw "ease-in-out".
 */
export const easings = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOutCirc: [0.85, 0, 0.15, 1] as const
};

export const transitions = {
  fast: { duration: 0.12, ease: easings.outExpo } as Transition,
  base: { duration: 0.2, ease: easings.outExpo } as Transition,
  slow: { duration: 0.32, ease: easings.outExpo } as Transition,
  springSnap: { type: "spring", damping: 26, stiffness: 280 } as Transition,
  springSoft: { type: "spring", damping: 32, stiffness: 220 } as Transition
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: transitions.base }
};

export const staggerChildren = (stagger = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } }
});

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: transitions.base }
};
