import { useRef, type ComponentProps } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useFinePointer } from "../../hooks/useMediaQuery";

const spring = { stiffness: 220, damping: 20, mass: 0.5 };

export function TiltCard({ className, children, ...rest }: ComponentProps<typeof motion.article>) {
    const ref = useRef<HTMLElement>(null);
    const reduced = useReducedMotion();
    const finePointer = useFinePointer();
    const enabled = finePointer && !reduced;

    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(py, [0, 1], [3, -3]), spring);
    const rotateY = useSpring(useTransform(px, [0, 1], [-3, 3]), spring);

    const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
        if (!enabled || !ref.current) return;
        const b = ref.current.getBoundingClientRect();
        const x = e.clientX - b.left;
        const y = e.clientY - b.top;
        px.set(x / b.width);
        py.set(y / b.height);
        ref.current.style.setProperty("--gx", `${x}px`);
        ref.current.style.setProperty("--gy", `${y}px`);
    };

    const onPointerLeave = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return (
        <motion.article
            ref={ref}
            className={className}
            style={enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
            whileHover={enabled ? { y: -3 } : undefined}
            whileTap={enabled ? { scale: 0.985 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            {...rest}
        >
            {children}
        </motion.article>
    );
}
