import { useReducedMotion } from "framer-motion";
import { ReadyContext, useSiteReadyState } from "./hooks/useSiteReady";
import { ThemeProvider } from "./hooks/useTheme";
import { useSectionNavigation } from "./hooks/useSectionNavigation";
import { CursorGlow } from "./components/CursorGlow";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { ScrollProgress } from "./components/ScrollProgress";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Showcase } from "./components/sections/Showcase";
import { Stack } from "./components/sections/Stack";
import { TooltipProvider } from "./components/ui/Tip";

function Site() {
    const reduced = !!useReducedMotion();
    const activeIndex = useSectionNavigation(reduced);

    return (
        <>
            <ScrollProgress />
            <CursorGlow />
            <Header activeIndex={activeIndex} />
            <main id="top" className="relative z-10 w-full max-w-full overflow-x-hidden">
                <Hero />
                <About />
                <Projects />
                <Stack />
                <Showcase />
                <Contact />
            </main>
        </>
    );
}

export default function App() {
    const ready = useSiteReadyState();

    return (
        <ThemeProvider>
            <ReadyContext.Provider value={ready}>
                <TooltipProvider>
                    <Loader />
                    <Site />
                </TooltipProvider>
            </ReadyContext.Provider>
        </ThemeProvider>
    );
}
