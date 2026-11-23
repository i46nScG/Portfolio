import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useSiteReady } from "../../hooks/useSiteReady";

const tags = {
    div: motion.div,
    p: motion.p,
    h1: motion.h1,
    h2: motion.h2,
    article: motion.article,
} as const;

type Tag = keyof typeof tags;
const pick = (as: Tag) => tags[as] as typeof motion.div;

type RevealVariant = "up" | "left" | "scale";
const hidden = {
    up: { opacity: 0, y: 18 },
    left: { opacity: 0, x: -24 },
    scale: { opacity: 0, y: 14, scale: 0.97 },
} as const;
const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

interface CommonProps {
    as?: Tag;
    className?: string;
    children: ReactNode;
}

export function Reveal({
    as = "div",
    variant = "up",
    delay = 0,
    className,
    children,
}: CommonProps & { variant?: RevealVariant; delay?: number }) {
    const reduced = useReducedMotion();
    const Comp = pick(as);
    return (
        <Comp
            className={className}
            initial={reduced ? false : hidden[variant]}
            whileInView={shown}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
        >
            {children}
        </Comp>
    );
}

export function Rise({
    as = "div",
    delay = 0,
    className,
    children,
}: CommonProps & { delay?: number }) {
    const reduced = useReducedMotion();
    const ready = useSiteReady();
    const Comp = pick(as);
    return (
        <Comp
            className={className}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={ready || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay }}
        >
            {children}
        </Comp>
    );
}

const staggerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Stagger({ className, children }: { className?: string; children: ReactNode }) {
    const reduced = useReducedMotion();
    return (
        <motion.div
            className={className}
            variants={staggerVariants}
            initial={reduced ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ as = "div", className, children }: CommonProps) {
    const Comp = pick(as);
    return (
        <Comp
            className={className}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
            {children}
        </Comp>
    );
}
