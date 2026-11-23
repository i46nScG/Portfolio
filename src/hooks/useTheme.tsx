import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface ThemeContextValue {
    dark: boolean;
    toggle: () => boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

    const toggle = useCallback(() => {
        const next = document.documentElement.classList.toggle("dark");
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        } catch {}
        setDark(next);
        return next;
    }, []);

    const value = useMemo(() => ({ dark, toggle }), [dark, toggle]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
    return ctx;
}
