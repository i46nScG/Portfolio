import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
    const { toggle } = useTheme();

    return (
        <motion.button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark and light mode"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface transition-colors hover:border-accent"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
            <svg
                className="h-5 w-5 dark:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
            <svg
                className="hidden h-5 w-5 dark:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="12" r="4" />
                <path
                    strokeLinecap="round"
                    d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                />
            </svg>
        </motion.button>
    );
}
