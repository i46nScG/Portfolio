import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-accent"
            style={{ scaleX: reduced ? scrollYProgress : smooth }}
        />
    );
}
