/** @type {import('tailwindcss').Config} */

export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "rgb(var(--bg) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                ink: "rgb(var(--ink) / <alpha-value>)",
                muted: "rgb(var(--muted) / <alpha-value>)",
                line: "rgb(var(--line) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",
                soft: "rgb(var(--soft) / <alpha-value>)",
            },
            fontFamily: {
                display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
                sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
                mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
            },
        },
    },
    plugins: [],
};
