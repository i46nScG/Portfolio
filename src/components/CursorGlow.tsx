import { useEffect } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from "framer-motion";
import { useFinePointer } from "../hooks/useMediaQuery";

export function CursorGlow() {
    const reduced = useReducedMotion();
    const finePointer = useFinePointer();
    const enabled = finePointer && !reduced;

    const x = useMotionValue(innerWidth * 0.5);
    const y = useMotionValue(innerHeight * 0.3);
    const sx = useSpring(x, { stiffness: 260, damping: 40, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 260, damping: 40, mass: 0.6 });
    const background = useMotionTemplate`radial-gradient(480px circle at ${sx}px ${sy}px, rgb(var(--accent) / 0.1), transparent 65%)`;

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        addEventListener("pointermove", onMove, { passive: true });
        return () => removeEventListener("pointermove", onMove);
    }, [enabled, x, y]);

    return (
        <motion.div
            aria-hidden="true"
            className="cursor-glow pointer-events-none fixed inset-0 z-0"
            style={{ background }}
        />
    );
}
