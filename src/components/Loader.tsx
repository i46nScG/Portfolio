import { AnimatePresence, motion } from "framer-motion";
import { useSiteReady } from "../hooks/useSiteReady";

export function Loader() {
    const ready = useSiteReady();

    return (
        <AnimatePresence>
            {!ready && (
                <motion.div
                    id="loader"
                    className="site-loader"
                    role="status"
                    aria-live="polite"
                    exit={{ opacity: 0, pointerEvents: "none" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <div className="loader-content">
                        <span className="loader-indicator" aria-hidden="true" />
                        <span>Getting your personal information secretly...</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
